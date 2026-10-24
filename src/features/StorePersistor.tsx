'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { hydrateCart, selectCartItems, selectAppliedCoupon, selectShippingSpeed } from './cart/cartSlice';
import { hydrateWishlist, selectWishlistItems } from './wishlist/wishlistSlice';

const CART_STORAGE_KEY = 'aurelia_cart_v1';
const WISHLIST_STORAGE_KEY = 'aurelia_wishlist_v1';

export function StorePersistor() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const appliedCoupon = useAppSelector(selectAppliedCoupon);
  const shippingSpeed = useAppSelector(selectShippingSpeed);
  const wishlistItems = useAppSelector(selectWishlistItems);

  const isHydrated = useRef(false);

  // 1. Initial hydration on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed.items)) {
          dispatch(
            hydrateCart({
              items: parsed.items,
              appliedCoupon: parsed.appliedCoupon,
              shippingSpeed: parsed.shippingSpeed || 'complimentary',
            })
          );
        }
      }

      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        const parsed = JSON.parse(storedWishlist);
        if (Array.isArray(parsed)) {
          dispatch(hydrateWishlist(parsed));
        }
      }
    } catch (err) {
      console.warn('Failed to hydrate store from localStorage:', err);
    } finally {
      isHydrated.current = true;
    }
  }, [dispatch]);

  // 2. Persist cart changes after initial hydration
  useEffect(() => {
    if (!isHydrated.current) return;
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          items: cartItems,
          appliedCoupon,
          shippingSpeed,
        })
      );
    } catch {
      // storage quota or private mode fallback
    }
  }, [cartItems, appliedCoupon, shippingSpeed]);

  // 3. Persist wishlist changes after initial hydration
  useEffect(() => {
    if (!isHydrated.current) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      // storage quota or private mode fallback
    }
  }, [wishlistItems]);

  return null;
}
