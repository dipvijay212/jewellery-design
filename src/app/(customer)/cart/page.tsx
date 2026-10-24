'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TrustBadges } from '@/components/common/TrustBadges';
import { mockCategories } from '@/data/mockCategories';
import { LUXURY_EASE } from '@/utils/animations';
import {
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Gift,
  ArrowRight,
  ShoppingBag,
  Tag,
  AlertCircle,
  Truck,
  Sparkles,
  Info,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    count,
    subtotal,
    discount,
    shipping,
    shippingSpeed,
    tax,
    total,
    removeItem,
    setQuantity,
    applyPromo,
    removePromo,
    updateShippingSpeed,
    promoCode,
    promoError,
    appliedCoupon,
    clear,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput.trim());
      setPromoInput('');
    }
  };

  const handleQuickCode = (code: string) => {
    applyPromo(code);
  };

  if (items.length === 0) {
    return (
      <div className="py-20 bg-ivory-100 min-h-[75vh]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
            className="max-w-2xl mx-auto text-center py-12 px-6 bg-white rounded-sm border border-ivory-300 shadow-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-champagne-50 border border-champagne-200 flex items-center justify-center text-champagne-600">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-700 font-semibold mb-2 block">
              Private Salon Session
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light mb-3">
              Your Shopping Bag is Empty
            </h1>
            <p className="text-sm text-charcoal-600 max-w-md mx-auto mb-8 leading-relaxed">
              Our vaults await your selection. Discover heirloom polki choker sets, handcrafted kundan earrings, and royal bridal suites designed for enduring luxury.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/shop">
                <Button variant="gold" size="lg">
                  <span>Explore Full Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/bridal">
                <Button variant="outline-gold" size="lg">
                  <span>Bridal Trousseau Suites</span>
                </Button>
              </Link>
            </div>

            {/* Recommended Categories */}
            <div className="border-t border-ivory-200 pt-8">
              <h2 className="text-xs uppercase tracking-widest text-charcoal-400 font-semibold mb-4">
                Popular Vault Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {mockCategories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    className="p-3 bg-ivory-50 rounded-sm border border-ivory-300 hover:border-champagne-400 hover:bg-champagne-50/40 transition-all text-left group"
                  >
                    <span className="font-serif text-xs font-medium text-charcoal-900 group-hover:text-champagne-800 block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-charcoal-500 mt-0.5 block">
                      Browse pieces →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-ivory-300 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-700 font-semibold mb-1 block">
              Atelier Acquisition
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light">
              Your Shopping Bag
            </h1>
            <p className="text-xs text-charcoal-500 mt-1">
              Reviewing {count} {count === 1 ? 'creation' : 'creations'} currently reserved in your private session.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/shop" className="text-xs text-charcoal-600 hover:text-champagne-700 underline font-medium">
              Continue Shopping
            </Link>
            <span className="text-charcoal-300">|</span>
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="text-xs text-burgundy-700 hover:text-burgundy-900 underline font-medium"
            >
              Clear Entire Bag
            </button>
          </div>
        </div>

        {/* Clear Confirmation Modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: LUXURY_EASE }}
                className="bg-white rounded-sm border border-ivory-300 max-w-md w-full p-6 shadow-2xl space-y-4"
              >
                <div className="flex items-center space-x-3 text-burgundy-800">
                  <AlertCircle className="w-6 h-6 shrink-0" />
                  <h3 className="font-serif text-lg font-medium">Release Reserved Creations?</h3>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Clearing your shopping bag will release all {count} reserved vault items back into our public salon collection. This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Keep Creations
                  </Button>
                  <Button
                    variant="burgundy"
                    size="sm"
                    onClick={() => {
                      clear();
                      setShowClearConfirm(false);
                    }}
                  >
                    Confirm & Clear Bag
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Items list */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-sm border border-ivory-300 p-6 sm:p-8 space-y-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((item, idx) => {
                  const maxStock = item.product.stock || 99;
                  const isMax = item.quantity >= maxStock;

                  return (
                    <motion.div
                      layout
                      key={`${item.product.id}-${item.selectedSize || ''}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: -20,
                        height: 0,
                        overflow: 'hidden',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                      transition={{ duration: 0.25, ease: LUXURY_EASE }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-ivory-200 last:border-b-0 last:pb-0 gap-6"
                    >
                      <div className="flex items-center space-x-5">
                        <div className="relative w-24 h-28 rounded-sm overflow-hidden bg-ivory-100 border border-ivory-300 shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider text-champagne-700 font-semibold block">
                            {item.product.collection}
                          </span>
                          <Link
                            href={`/shop/${item.product.slug}`}
                            className="font-serif text-base sm:text-lg text-charcoal-900 font-normal hover:text-champagne-700 block leading-snug line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          {item.selectedSize && (
                            <p className="text-xs text-charcoal-500">
                              Size / Style: <span className="text-charcoal-800">{item.selectedSize}</span>
                            </p>
                          )}
                          <p className="text-[11px] text-charcoal-400 font-mono">
                            SKU: {item.product.sku}
                          </p>
                          <div className="sm:hidden font-serif text-base font-semibold text-charcoal-900 pt-1">
                            {formatPrice(item.product.price)}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                        <div className="hidden sm:block font-serif text-lg font-semibold text-charcoal-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>

                        <div className="flex flex-col items-end">
                          <div className="flex items-center space-x-3">
                            {/* Quantity Selector with Stock Boundary */}
                            <div className="flex items-center border border-ivory-300 bg-ivory-50 rounded-sm">
                              <button
                                type="button"
                                onClick={() =>
                                  setQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                                }
                                className="p-1.5 text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 text-xs font-semibold text-charcoal-900 min-w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                disabled={isMax}
                                onClick={() =>
                                  setQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                                }
                                className={`p-1.5 transition-colors ${
                                  isMax
                                    ? 'text-charcoal-300 bg-ivory-100 cursor-not-allowed'
                                    : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200'
                                }`}
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Remove */}
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id, item.selectedSize)}
                              className="p-2 text-charcoal-400 hover:text-burgundy-700 transition-colors"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {isMax && (
                            <span className="text-[10px] text-burgundy-700 font-medium mt-1.5">
                              Max vault stock ({maxStock}) reached
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Shipping Delivery Speed Selection */}
            <div className="bg-white rounded-sm border border-ivory-300 p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-2 border-b border-ivory-200 pb-3">
                <Truck className="w-4 h-4 text-champagne-600" />
                <h3 className="font-serif text-base text-charcoal-900 font-medium">
                  Select Armored Logistics Speed
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start space-x-3 ${
                    shippingSpeed === 'complimentary'
                      ? 'border-champagne-500 bg-champagne-50/30 ring-1 ring-champagne-400'
                      : 'border-ivory-300 hover:border-ivory-400 bg-ivory-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingSpeed"
                    checked={shippingSpeed === 'complimentary'}
                    onChange={() => updateShippingSpeed('complimentary')}
                    className="mt-1 text-champagne-600 focus:ring-champagne-500"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-charcoal-900">
                        Insured Armored Courier
                      </span>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Complimentary
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-500 mt-1 leading-snug">
                      Discreet armored courier delivery via Malca-Amit & Brink&apos;s (3–5 business days). Fully insured up to $100,000.
                    </p>
                  </div>
                </label>

                <label
                  className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start space-x-3 ${
                    shippingSpeed === 'express'
                      ? 'border-champagne-500 bg-champagne-50/30 ring-1 ring-champagne-400'
                      : 'border-ivory-300 hover:border-ivory-400 bg-ivory-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingSpeed"
                    checked={shippingSpeed === 'express'}
                    onChange={() => updateShippingSpeed('express')}
                    className="mt-1 text-champagne-600 focus:ring-champagne-500"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-charcoal-900">
                        Priority Atelier Express
                      </span>
                      <span className="text-xs font-serif font-bold text-charcoal-900">
                        {appliedCoupon?.discountType === 'free_shipping' ? 'FREE' : '$35'}
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-500 mt-1 leading-snug">
                      Dedicated priority escort dispatch within 24–48 hours directly to your residential or salon address.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Packaging guarantee callout */}
            <div className="bg-burgundy-950 text-ivory-100 p-6 rounded-sm border border-champagne-500/30 flex items-center space-x-4">
              <Gift className="w-8 h-8 text-champagne-400 shrink-0" />
              <div className="text-xs">
                <span className="font-serif text-sm font-medium text-champagne-300 block">
                  Complimentary Imperial Presentation Packaging
                </span>
                <p className="text-ivory-300 mt-0.5 leading-relaxed">
                  Every order arrives encased in our signature handcrafted velvet coffer with gold hot-stamped insignia, personalized calligraphy card, and wax seal.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-sm border border-ivory-300 p-6 sm:p-8 space-y-6 shadow-sm sticky top-28">
              <h2 className="font-serif text-xl text-charcoal-900 font-light border-b border-ivory-200 pb-4">
                Acquisition Summary
              </h2>

              <div className="space-y-3 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>Subtotal ({count} items)</span>
                  <span className="font-semibold text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-burgundy-800 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-burgundy-700" />
                      Privilege ({promoCode})
                    </span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Armored Logistics</span>
                  <span className={shipping === 0 ? 'text-emerald-700 font-medium' : 'text-charcoal-900 font-medium'}>
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Assay Hallmarking & GST (3%)</span>
                  <span className="text-charcoal-800 font-medium">{formatPrice(tax)}</span>
                </div>

                <div className="border-t border-ivory-200 pt-4 flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-lg font-light text-charcoal-900 block">
                      Estimated Total
                    </span>
                    <span className="text-[10px] text-charcoal-500">Includes all duties & transit insurance</span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-charcoal-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Promo code form */}
              <div className="border-t border-ivory-200 pt-4 space-y-3">
                <span className="text-xs font-medium text-charcoal-800 block">
                  Have a Privilege Code?
                </span>

                {!appliedCoupon ? (
                  <div>
                    <form onSubmit={handleApplyCode} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. AURELIA10"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 text-xs px-3 py-2.5 border border-ivory-300 rounded-sm bg-ivory-50 uppercase tracking-wider font-mono focus:outline-none focus:border-champagne-500"
                      />
                      <Button type="submit" variant="outline-gold" size="sm">
                        Apply
                      </Button>
                    </form>
                    {promoError && (
                      <p className="text-[11px] text-burgundy-700 mt-1.5 flex items-center gap-1">
                        <Info className="w-3 h-3 shrink-0" />
                        {promoError}
                      </p>
                    )}
                    {/* Suggested codes pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <button
                        type="button"
                        onClick={() => handleQuickCode('AURELIA10')}
                        className="text-[10px] bg-ivory-100 hover:bg-champagne-100 text-charcoal-700 px-2 py-0.5 rounded border border-ivory-300 transition-colors font-mono"
                      >
                        AURELIA10 (-10%)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickCode('ROYAL15')}
                        className="text-[10px] bg-ivory-100 hover:bg-champagne-100 text-charcoal-700 px-2 py-0.5 rounded border border-ivory-300 transition-colors font-mono"
                      >
                        ROYAL15 (-15%)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickCode('NOOR50')}
                        className="text-[10px] bg-ivory-100 hover:bg-champagne-100 text-charcoal-700 px-2 py-0.5 rounded border border-ivory-300 transition-colors font-mono"
                      >
                        NOOR50 (-$50)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm space-y-1">
                    <div className="flex items-center justify-between text-xs text-emerald-900 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        Code <strong className="font-mono">{promoCode}</strong> Active
                      </span>
                      <button
                        type="button"
                        onClick={removePromo}
                        className="text-emerald-800 hover:text-burgundy-700 underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      {appliedCoupon.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Checkout Action Button */}
              <div className="space-y-3 pt-2">
                <Link href="/checkout" className="block">
                  <Button variant="gold" size="lg" className="w-full">
                    <span>Proceed to Private Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-charcoal-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-champagne-600" />
                  <span>256-Bit SSL Encrypted High-Value Transaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TrustBadges />
      </Container>
    </div>
  );
}
