import { Order, OrderStatus, CreateOrderInput, OrderPaymentDetails } from '@/types/order';
import { mockOrders } from '@/data/mockOrders';
import { couponService } from './couponService';

export interface IOrderService {
  getOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
  createOrder(input: CreateOrderInput): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean>;
}

const STORAGE_KEY = 'aurelia_simulated_orders';

class MockOrderService implements IOrderService {
  private inMemoryOrders: Order[] = [...mockOrders];

  private simulateDelay(_ms: number = 0): Promise<void> {
    return Promise.resolve();
  }

  private getStoredOrders(): Order[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored) as Order[];
    } catch {
      return [];
    }
  }

  private saveStoredOrders(orders: Order[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // quota or private browsing fallback
    }
  }

  async getOrders(): Promise<Order[]> {
    await this.simulateDelay();
    const stored = this.getStoredOrders();
    // Merge: stored orders take precedence or appear at the top
    const all = [...stored, ...this.inMemoryOrders];
    // Deduplicate by ID
    const seen = new Set<string>();
    const deduplicated = all.filter((ord) => {
      if (seen.has(ord.id)) return false;
      seen.add(ord.id);
      return true;
    });

    // Sort newest first
    return deduplicated.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getOrderById(id: string): Promise<Order | null> {
    await this.simulateDelay();
    const all = await this.getOrders();
    const order = all.find(
      (o) => o.id.toLowerCase() === id.toLowerCase() || o.orderNumber.toLowerCase() === id.toLowerCase()
    );
    return order || null;
  }

  async createOrder(input: CreateOrderInput): Promise<Order> {
    await this.simulateDelay(120);

    const subtotal = input.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    let discount = 0;
    let appliedPromo: string | undefined = undefined;

    if (input.couponCode) {
      const couponCheck = couponService.validateCoupon(input.couponCode, subtotal);
      if (couponCheck.valid && couponCheck.coupon) {
        discount = couponService.calculateDiscount(couponCheck.coupon, subtotal);
        appliedPromo = couponCheck.coupon.code;
      }
    }

    // Shipping cost: complimentary ($0) or express ($35), waived if FREESHIP
    let shippingCost = input.shippingSpeed === 'express' ? 35 : 0;
    if (appliedPromo === 'FREESHIP') {
      shippingCost = 0;
    }

    // Nominal tax / luxury assay certification fees (e.g. 3% GST standard)
    const taxableBase = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableBase * 0.03);
    const total = taxableBase + tax + shippingCost;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ord-sim-${Date.now().toString(36)}-${randomSuffix}`;
    const orderNumber = `AUR-2026-SIM-${randomSuffix}`;

    const paymentLabels: Record<string, string> = {
      bank_wire: 'Atelier RTGS / Bank Wire (Simulated)',
      concierge_delivery: 'Private Concierge Card on Delivery (Simulated)',
      digital_escrow: 'High-Value Escrow Guarantee (Simulated)',
    };

    const paymentMethod: OrderPaymentDetails = {
      type: input.paymentMethod,
      label: paymentLabels[input.paymentMethod] || 'Simulated Order Reservation',
      isSimulated: true,
    };

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerName: input.customerName.trim(),
      customerEmail: input.customerEmail.trim(),
      customerPhone: input.customerPhone.trim(),
      date: new Date().toISOString(),
      status: 'vault_secured',
      items: input.items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0] || '',
        metal: i.selectedMetal || i.product.material || 'Artisan Plated',
        size: i.selectedSize,
      })),
      subtotal,
      discount,
      appliedPromo,
      tax,
      insuredShipping: shippingCost,
      shippingSpeed: input.shippingSpeed,
      total,
      shippingAddress: {
        line1: input.shippingAddress.line1.trim(),
        line2: input.shippingAddress.line2?.trim() || undefined,
        city: input.shippingAddress.city.trim(),
        state: input.shippingAddress.state.trim(),
        postalCode: input.shippingAddress.postalCode.trim(),
        country: input.shippingAddress.country.trim(),
      },
      deliveryNotes: input.deliveryNotes?.trim() || undefined,
      paymentMethod,
      trackingNumber: `MALCA-SIM-${Math.floor(100000 + Math.random() * 900000)}`,
      insurancePolicyId: `LLOYDS-SIM-POL-${Math.floor(1000 + Math.random() * 9000)}`,
      isSimulated: true,
    };

    // Save to memory
    this.inMemoryOrders.unshift(newOrder);

    // Save to localStorage
    const stored = this.getStoredOrders();
    this.saveStoredOrders([newOrder, ...stored]);

    return newOrder;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    await this.simulateDelay();
    const stored = this.getStoredOrders();
    const storedIndex = stored.findIndex((o) => o.id === orderId);
    if (storedIndex >= 0) {
      stored[storedIndex].status = status;
      this.saveStoredOrders(stored);
      return true;
    }

    const memIndex = this.inMemoryOrders.findIndex((o) => o.id === orderId);
    if (memIndex >= 0) {
      this.inMemoryOrders[memIndex].status = status;
      return true;
    }

    return false;
  }
}

export const orderService: IOrderService = new MockOrderService();
