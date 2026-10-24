'use client';

import { useAppDispatch, useAppSelector } from '@/features/hooks';
import {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
  selectWishlistItems,
  selectWishlistCount,
} from '@/features/wishlist/wishlistSlice';
import { Product } from '@/types/product';

export function useWishlist() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);
  const count = useAppSelector(selectWishlistCount);

  const toggle = (product: Product) => {
    dispatch(toggleWishlist(product));
  };

  const remove = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const clear = () => {
    dispatch(clearWishlist());
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  return {
    items,
    count,
    toggle,
    remove,
    clear,
    isInWishlist,
  };
}
