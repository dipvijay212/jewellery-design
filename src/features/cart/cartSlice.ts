import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, ShippingSpeed } from '@/types/cart';
import { Product, MetalType } from '@/types/product';
import { couponService, Coupon } from '@/services/couponService';
import type { RootState } from '../store';
import { mockProducts } from '@/data/mockProducts';

const initialState: CartState = {
  items: mockProducts[0]
    ? [
        {
          product: mockProducts[0],
          quantity: 1,
          selectedSize: 'Standard',
          selectedMetal: undefined,
        },
      ]
    : [],
  isOpen: false,
  appliedCoupon: null,
  promoCode: undefined,
  discountPercent: 0,
  shippingSpeed: 'complimentary',
  promoError: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity?: number;
        selectedSize?: string;
        selectedMetal?: MetalType;
      }>
    ) => {
      const { product, quantity = 1, selectedSize, selectedMetal } = action.payload;
      const existing = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedMetal === (selectedMetal || product.metal)
      );

      const maxAvailable = product.stock || 99;

      if (existing) {
        existing.quantity = Math.min(maxAvailable, existing.quantity + quantity);
      } else {
        const initialQty = Math.min(maxAvailable, Math.max(1, quantity));
        state.items.push({
          product,
          quantity: initialQty,
          selectedSize,
          selectedMetal: selectedMetal || product.metal,
        });
      }
      state.isOpen = true; // Auto open drawer to acknowledge addition
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; selectedSize?: string }>
    ) => {
      const { productId, selectedSize } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.product.id === productId && (!selectedSize || item.selectedSize === selectedSize))
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number; selectedSize?: string }>
    ) => {
      const { productId, quantity, selectedSize } = action.payload;
      const target = state.items.find(
        (item) =>
          item.product.id === productId && (!selectedSize || item.selectedSize === selectedSize)
      );

      if (target) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item !== target);
        } else {
          const maxStock = target.product.stock || 99;
          target.quantity = Math.min(maxStock, quantity);
        }
      }
    },

    toggleCart: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpen = action.payload !== undefined ? action.payload : !state.isOpen;
    },

    setShippingSpeed: (state, action: PayloadAction<ShippingSpeed>) => {
      state.shippingSpeed = action.payload;
    },

    applyPromoCode: (state, action: PayloadAction<string>) => {
      const rawCode = action.payload;
      const subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      const validation = couponService.validateCoupon(rawCode, subtotal);
      if (validation.valid && validation.coupon) {
        state.appliedCoupon = validation.coupon;
        state.promoCode = validation.coupon.code;
        state.discountPercent =
          validation.coupon.discountType === 'percentage'
            ? validation.coupon.discountValue
            : 0;
        state.promoError = null;
      } else {
        state.promoError = validation.error || 'Invalid privilege code';
      }
    },

    removePromoCode: (state) => {
      state.appliedCoupon = null;
      state.promoCode = undefined;
      state.discountPercent = 0;
      state.promoError = null;
    },

    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.promoCode = undefined;
      state.discountPercent = 0;
      state.promoError = null;
    },

    hydrateCart: (
      state,
      action: PayloadAction<{
        items: CartItem[];
        appliedCoupon?: Coupon | null;
        shippingSpeed?: ShippingSpeed;
      }>
    ) => {
      state.items = action.payload.items;
      if (action.payload.appliedCoupon !== undefined) {
        state.appliedCoupon = action.payload.appliedCoupon;
        state.promoCode = action.payload.appliedCoupon?.code;
      }
      if (action.payload.shippingSpeed) {
        state.shippingSpeed = action.payload.shippingSpeed;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleCart,
  setShippingSpeed,
  applyPromoCode,
  removePromoCode,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;
export const selectAppliedCoupon = (state: RootState) => state.cart.appliedCoupon;
export const selectPromoError = (state: RootState) => state.cart.promoError;
export const selectShippingSpeed = (state: RootState) => state.cart.shippingSpeed;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

export const selectCartDiscount = (state: RootState) => {
  const subtotal = selectCartSubtotal(state);
  const coupon = state.cart.appliedCoupon;
  if (!coupon) return 0;
  return couponService.calculateDiscount(coupon, subtotal);
};

export const selectCartShipping = (state: RootState) => {
  const coupon = state.cart.appliedCoupon;
  if (coupon?.discountType === 'free_shipping') return 0;
  return state.cart.shippingSpeed === 'express' ? 35 : 0;
};

export const selectCartTax = (state: RootState) => {
  const subtotal = selectCartSubtotal(state);
  const discount = selectCartDiscount(state);
  const net = Math.max(0, subtotal - discount);
  // 3% standard hallmarking & luxury assay GST
  return Math.round(net * 0.03);
};

export const selectCartTotal = (state: RootState) => {
  const subtotal = selectCartSubtotal(state);
  const discount = selectCartDiscount(state);
  const shipping = selectCartShipping(state);
  const tax = selectCartTax(state);
  return Math.max(0, subtotal - discount) + shipping + tax;
};

export default cartSlice.reducer;
