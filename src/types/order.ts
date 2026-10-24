export type OrderStatus =
  | 'processing'
  | 'in_atelier'
  | 'vault_secured'
  | 'insured_transit'
  | 'delivered'
  | 'cancelled';

export interface OrderItemSummary {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  metal?: string;
  size?: string;
}

export interface OrderPaymentDetails {
  type: 'bank_wire' | 'concierge_delivery' | 'digital_escrow';
  label: string;
  isSimulated: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  date: string;
  status: OrderStatus;
  items: OrderItemSummary[];
  subtotal: number;
  discount?: number;
  appliedPromo?: string;
  tax: number;
  insuredShipping: number;
  shippingSpeed?: 'complimentary' | 'express';
  total: number;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  deliveryNotes?: string;
  paymentMethod?: OrderPaymentDetails;
  trackingNumber?: string;
  insurancePolicyId: string;
  isSimulated?: boolean;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  deliveryNotes?: string;
  shippingSpeed: 'complimentary' | 'express';
  paymentMethod: 'bank_wire' | 'concierge_delivery' | 'digital_escrow';
  policyAcknowledged: boolean;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      images: string[];
      material?: string;
      sku?: string;
    };
    quantity: number;
    selectedSize?: string;
    selectedMetal?: string;
  }>;
  couponCode?: string;
}
