export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number; // e.g. 10 (%) or 50 ($) or 0 (free shipping)
  minSubtotal?: number;
}

export interface CouponValidationResult {
  valid: boolean;
  coupon?: Coupon;
  error?: string;
}

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'AURELIA10',
    description: '10% Maison Welcome Privilege on all creations',
    discountType: 'percentage',
    discountValue: 10,
  },
  {
    code: 'ROYAL15',
    description: '15% Royal Trousseau Courtesy on orders over ₹1,500',
    discountType: 'percentage',
    discountValue: 15,
    minSubtotal: 1500,
  },
  {
    code: 'NOOR50',
    description: '₹50 Festive Celebration Gift on orders over ₹500',
    discountType: 'fixed',
    discountValue: 50,
    minSubtotal: 500,
  },
  {
    code: 'FREESHIP',
    description: 'Complimentary Express Armored Priority Delivery',
    discountType: 'free_shipping',
    discountValue: 35,
  },
];

export class MockCouponService {
  validateCoupon(code: string, subtotal: number): CouponValidationResult {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { valid: false, error: 'Please enter a privilege code.' };
    }

    const coupon = MOCK_COUPONS.find((c) => c.code === cleanCode);
    if (!coupon) {
      return {
        valid: false,
        error: `Code "${cleanCode}" is invalid or expired. Try "AURELIA10", "ROYAL15", or "NOOR50".`,
      };
    }

    if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
      return {
        valid: false,
        error: `Code "${coupon.code}" requires a minimum acquisition subtotal of ₹${coupon.minSubtotal.toLocaleString('en-IN')}.`,
      };
    }

    return {
      valid: true,
      coupon,
    };
  }

  calculateDiscount(coupon: Coupon, subtotal: number): number {
    if (coupon.discountType === 'percentage') {
      return Math.round((subtotal * coupon.discountValue) / 100);
    }
    if (coupon.discountType === 'fixed') {
      return Math.min(coupon.discountValue, subtotal);
    }
    return 0; // free shipping handles shipping cost directly
  }
}

export const couponService = new MockCouponService();
