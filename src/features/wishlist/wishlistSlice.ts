import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistState, WishlistItem } from '@/types/wishlist';
import { Product } from '@/types/product';
import type { RootState } from '../store';
import { mockProducts } from '@/data/mockProducts';

const initialState: WishlistState = {
  items: mockProducts[1]
    ? [
        {
          product: mockProducts[1],
          addedAt: '2026-10-01T10:00:00.000Z',
        },
      ]
    : [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.product.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push({
          product,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    hydrateWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist, hydrateWishlist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) => state.wishlist.items.length;
export const selectIsInWishlist = (productId: string) => (state: RootState) =>
  state.wishlist.items.some((item) => item.product.id === productId);

export default wishlistSlice.reducer;
