import { Product, MetalType } from './product';
import type { Coupon } from '@/services/couponService';

export type ShippingSpeed = 'complimentary' | 'express';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMetal?: MetalType;
  engraving?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon?: Coupon | null;
  promoCode?: string;
  discountPercent: number;
  shippingSpeed: ShippingSpeed;
  promoError?: string | null;
}
