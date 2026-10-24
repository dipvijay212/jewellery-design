'use client';

import { useAppDispatch, useAppSelector } from '@/features/hooks';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleCart,
  setShippingSpeed,
  applyPromoCode,
  removePromoCode,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartShipping,
  selectCartTax,
  selectCartTotal,
  selectIsCartOpen,
  selectAppliedCoupon,
  selectPromoError,
  selectShippingSpeed,
} from '@/features/cart/cartSlice';
import { Product, MetalType } from '@/types/product';
import { ShippingSpeed } from '@/types/cart';

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const shipping = useAppSelector(selectCartShipping);
  const shippingSpeed = useAppSelector(selectShippingSpeed);
  const tax = useAppSelector(selectCartTax);
  const total = useAppSelector(selectCartTotal);
  const isOpen = useAppSelector(selectIsCartOpen);
  const appliedCoupon = useAppSelector(selectAppliedCoupon);
  const promoCode = useAppSelector((state) => state.cart.promoCode);
  const promoError = useAppSelector(selectPromoError);

  const addItem = (
    product: Product,
    quantity: number = 1,
    selectedSize?: string,
    selectedMetal?: MetalType
  ) => {
    dispatch(addToCart({ product, quantity, selectedSize, selectedMetal }));
  };

  const removeItem = (productId: string, selectedSize?: string) => {
    dispatch(removeFromCart({ productId, selectedSize }));
  };

  const setQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    dispatch(updateQuantity({ productId, quantity, selectedSize }));
  };

  const setOpen = (open?: boolean) => {
    dispatch(toggleCart(open));
  };

  const applyPromo = (code: string) => {
    dispatch(applyPromoCode(code));
  };

  const removePromo = () => {
    dispatch(removePromoCode());
  };

  const updateShippingSpeed = (speed: ShippingSpeed) => {
    dispatch(setShippingSpeed(speed));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  return {
    items,
    count,
    subtotal,
    discount,
    shipping,
    shippingSpeed,
    tax,
    total,
    isOpen,
    appliedCoupon,
    promoCode,
    promoError,
    addItem,
    removeItem,
    setQuantity,
    setOpen,
    applyPromo,
    removePromo,
    updateShippingSpeed,
    clear,
  };
}
