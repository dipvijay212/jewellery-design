'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/Button';
import {
  ShoppingBag,
  Heart,
  Check,
  Plus,
  Minus,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, setOpen: openCart } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.availableSizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const isOutOfStock = product.stock === 0;

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(product.stock, prev + 1));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity, selectedSize, product.metal);
    setAdded(true);
    openCart(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleToggleWishlist = () => {
    setHeartAnim(true);
    toggle(product);
    setTimeout(() => setHeartAnim(false), 450);
  };

  return (
    <div className="space-y-6 pt-3">
      {/* Size Selector if available */}
      {product.availableSizes && product.availableSizes.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="uppercase tracking-wider font-semibold text-charcoal-800">
              Select Size / Dimension
            </span>
            <span className="text-champagne-700 hover:text-champagne-900 font-medium">
              Bespoke Fit Standard
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.availableSizes.map((sz) => (
              <motion.button
                key={sz}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setSelectedSize(sz)}
                className={cn(
                  'px-3.5 py-1.5 text-xs rounded-sm border uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500',
                  selectedSize === sz
                    ? 'border-champagne-600 bg-champagne-500/15 text-charcoal-900 font-semibold shadow-2xs'
                    : 'border-ivory-300 text-charcoal-600 hover:border-champagne-400'
                )}
              >
                {sz}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Stock Availability Indicator & Quantity Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        {/* Availability Badge */}
        <div>
          {isOutOfStock ? (
            <div className="flex items-center space-x-2 text-xs text-burgundy-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-burgundy-700" />
              <span>Currently Reserved / Out of Stock in Atelier</span>
            </div>
          ) : product.stock <= 3 ? (
            <div className="flex items-center space-x-2 text-xs text-amber-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span>Only {product.stock} {product.stock === 1 ? 'creation' : 'creations'} left in vault</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs text-emerald-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>In Stock • Ready for Insured Handover</span>
            </div>
          )}
        </div>

        {/* Quantity Controls with Stock Limit Enforcement */}
        {!isOutOfStock && (
          <div className="flex items-center space-x-3">
            <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-medium">
              Quantity:
            </span>
            <div className="flex items-center border border-ivory-300 bg-ivory-50 rounded-sm">
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
                className="p-2 text-charcoal-600 hover:text-charcoal-900 disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={quantity}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="px-3 text-xs font-semibold text-charcoal-900 w-8 text-center select-none"
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={handleIncreaseQuantity}
                disabled={quantity >= product.stock}
                className="p-2 text-charcoal-600 hover:text-charcoal-900 disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {quantity >= product.stock && product.stock > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-[11px] text-amber-800 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-sm border border-amber-200"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Maximum available quantity in vault reached ({product.stock} pieces).</span>
        </motion.div>
      )}

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            variant="gold"
            size="lg"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="w-full transition-shadow duration-300 shadow-md hover:shadow-lg"
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="inline-flex items-center gap-1.5 text-charcoal-950 font-bold"
                >
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Acquisition Added to Bag</span>
                </motion.span>
              ) : isOutOfStock ? (
                <span key="soldout">Currently Out of Stock</span>
              ) : (
                <motion.span
                  key="acquire"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire This Masterpiece</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleWishlist}
          className={cn(
            'inline-flex items-center justify-center px-5 py-3 rounded-sm border transition-all duration-300 text-xs uppercase tracking-wider font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 shadow-xs',
            inWishlist
              ? 'bg-burgundy-900 border-burgundy-900 text-ivory-50 ring-1 ring-champagne-500/40'
              : 'border-champagne-500/40 text-charcoal-800 hover:bg-champagne-50 hover:text-burgundy-800'
          )}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <motion.div
            animate={heartAnim ? { scale: [1, 1.4, 0.9, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Heart
              className={cn(
                'w-4 h-4 mr-2 transition-colors duration-200',
                inWishlist && 'fill-current text-champagne-300'
              )}
            />
          </motion.div>
          <span>{inWishlist ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
        </motion.button>
      </div>

      <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-charcoal-500 uppercase tracking-widest text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
        <span>Complimentary Armored Courier Handover • 30-Day Evaluation Period</span>
      </div>
    </div>
  );
}
