'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

export function CartSlideover() {
  const {
    items,
    count,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    isOpen,
    setOpen,
    removeItem,
    setQuantity,
    applyPromo,
    removePromo,
    promoCode,
    promoError,
    appliedCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode.trim());
      setInputCode('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop with Fade In / Out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            {/* Slide-over Drawer with Ease-out Physics */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-screen max-w-md bg-ivory-50 border-l border-champagne-300 shadow-2xl flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="p-6 bg-burgundy-950 text-ivory-100 flex items-center justify-between border-b border-champagne-500/20">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-5 h-5 text-champagne-400" />
                  <div>
                    <h2 className="font-serif text-lg tracking-wide">Your Shopping Bag</h2>
                    <span className="text-xs text-champagne-300/80">
                      {count} {count === 1 ? 'Creation' : 'Creations'}
                    </span>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="p-2 text-ivory-300 hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Items List with Staggered & Exit Animations */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-champagne-100 flex items-center justify-center text-champagne-600">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-xl text-charcoal-900 mb-2">
                      Your bag is currently empty
                    </h3>
                    <p className="text-xs text-charcoal-500 max-w-xs mx-auto mb-6">
                      Allow our master karigars to craft your next unforgettable heirloom.
                    </p>
                    <Link href="/shop" onClick={() => setOpen(false)}>
                      <Button variant="gold" size="sm">
                        Discover Collection
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item, idx) => {
                      const isMaxStock = item.quantity >= item.product.stock;

                      return (
                        <motion.div
                          key={`${item.product.id}-${item.selectedSize || ''}-${idx}`}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0, overflow: 'hidden', paddingBottom: 0, marginBottom: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="flex space-x-4 pb-6 border-b border-ivory-300/60"
                        >
                          <div className="relative w-20 h-24 shrink-0 bg-white rounded-sm border border-ivory-300 overflow-hidden">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <Link
                                  href={`/shop/${item.product.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="font-serif text-sm font-medium text-charcoal-900 hover:text-champagne-700 leading-snug line-clamp-1"
                                >
                                  {item.product.name}
                                </Link>
                                <motion.button
                                  type="button"
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => removeItem(item.product.id, item.selectedSize)}
                                  className="text-charcoal-400 hover:text-burgundy-700 p-1 transition-colors"
                                  aria-label={`Remove ${item.product.name}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </motion.button>
                              </div>

                              {item.selectedSize && (
                                <p className="text-[11px] text-charcoal-500 mt-0.5">
                                  Size: {item.selectedSize}
                                </p>
                              )}
                              <p className="text-xs font-semibold text-charcoal-900 mt-1">
                                {formatPrice(item.product.price)}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div>
                                <div className="flex items-center border border-ivory-300 bg-white rounded-sm">
                                  <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() =>
                                      setQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                                    }
                                    className="p-1 text-charcoal-600 hover:bg-ivory-100 transition-colors"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </motion.button>
                                  <span className="px-2 text-xs font-medium text-charcoal-800 min-w-5 text-center">
                                    {item.quantity}
                                  </span>
                                  <motion.button
                                    type="button"
                                    disabled={isMaxStock}
                                    whileTap={!isMaxStock ? { scale: 0.85 } : undefined}
                                    onClick={() =>
                                      setQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                                    }
                                    className={cn(
                                      'p-1 transition-colors',
                                      isMaxStock
                                        ? 'text-charcoal-300 cursor-not-allowed'
                                        : 'text-charcoal-600 hover:bg-ivory-100'
                                    )}
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </motion.button>
                                </div>
                                {isMaxStock && (
                                  <span className="text-[9px] text-burgundy-700 font-medium block mt-1">
                                    Max vault limit ({item.product.stock})
                                  </span>
                                )}
                              </div>

                              <span className="text-xs font-medium text-charcoal-700">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer & Checkout */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-ivory-300 space-y-4">
                  {/* Promo input */}
                  {!appliedCoupon ? (
                    <div>
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Code: AURELIA10 or ROYAL15"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          className="flex-1 text-xs px-3 py-2 border border-ivory-300 rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500 uppercase tracking-wider font-mono"
                        />
                        <Button type="submit" variant="outline-gold" size="sm">
                          Apply
                        </Button>
                      </form>
                      {promoError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[11px] text-burgundy-700 mt-1.5"
                        >
                          {promoError}
                        </motion.p>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[11px] text-emerald-900 bg-emerald-50 px-3 py-2 rounded-sm border border-emerald-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-700" />
                        <span>
                          <strong className="font-mono">{promoCode}</strong> applied ({appliedCoupon.description})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removePromo}
                        className="text-emerald-800 hover:text-burgundy-700 underline text-[10px] ml-2"
                      >
                        Remove
                      </button>
                    </motion.div>
                  )}

                  {/* Summary */}
                  <div className="space-y-1.5 text-xs text-charcoal-600 pt-2 border-t border-ivory-200">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-charcoal-900">{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-burgundy-700 font-medium">
                        <span>Privilege Saving</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Insured Armored Delivery</span>
                      <span className={shipping === 0 ? 'text-emerald-700 font-medium' : 'text-charcoal-900 font-medium'}>
                        {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                      </span>
                    </div>
                    {tax > 0 && (
                      <div className="flex justify-between">
                        <span>Assay & Luxury GST (3%)</span>
                        <span className="text-charcoal-900 font-medium">{formatPrice(tax)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-serif font-semibold text-charcoal-900 pt-2 border-t border-ivory-200">
                      <span>Estimated Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <Link href="/checkout" onClick={() => setOpen(false)}>
                      <Button variant="gold" size="lg" className="w-full">
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>

                    <Link
                      href="/cart"
                      onClick={() => setOpen(false)}
                      className="text-center text-xs text-charcoal-500 hover:text-charcoal-900 underline py-1"
                    >
                      View Full Shopping Bag
                    </Link>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-charcoal-500 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-champagne-600" />
                      <span>Secured with 256-Bit Bank Grade Encryption</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
