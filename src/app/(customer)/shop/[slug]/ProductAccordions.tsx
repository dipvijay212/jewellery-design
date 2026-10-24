'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/types/product';
import {
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Gem,
} from 'lucide-react';
import { accordionVariants } from '@/utils/animations';

interface ProductAccordionsProps {
  product: Product;
}

export function ProductAccordions({ product }: ProductAccordionsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    specs: true,
    care: true,
    shipping: false,
    authenticity: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* 1. Atelier Specifications Accordion */}
      <div className="bg-white rounded-sm border border-ivory-300 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('specs')}
          aria-expanded={openSections.specs}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-ivory-50/70 transition-colors focus:outline-none focus-visible:bg-ivory-100"
        >
          <div className="flex items-center space-x-3">
            <Gem className="w-4 h-4 text-champagne-600 shrink-0" />
            <div>
              <h3 className="font-serif text-lg text-charcoal-900 font-medium">
                Atelier Specifications & Craftsmanship
              </h3>
              <p className="text-[11px] text-charcoal-500">
                Alloy standards, stone cuts, and master goldsmith specifications
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: openSections.specs ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-charcoal-400 p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {openSections.specs && (
            <motion.div
              key="specs-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={accordionVariants}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-ivory-200">
                <div className="divide-y divide-ivory-200 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-charcoal-500 uppercase tracking-wider">Base Material</span>
                    <span className="font-medium text-charcoal-900 text-right">
                      {product.specifications?.baseMaterial || product.material}
                    </span>
                  </div>
                  {product.specifications?.plating && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-charcoal-500 uppercase tracking-wider">Plating Standard</span>
                      <span className="font-medium text-charcoal-900 text-right">
                        {product.specifications.plating}
                      </span>
                    </div>
                  )}
                  {product.specifications?.closureType && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-charcoal-500 uppercase tracking-wider">Closure Mechanism</span>
                      <span className="font-medium text-charcoal-900 text-right">
                        {product.specifications.closureType}
                      </span>
                    </div>
                  )}
                  {product.specifications?.weightGrams && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-charcoal-500 uppercase tracking-wider">Approximate Weight</span>
                      <span className="font-medium text-charcoal-900 text-right">
                        {product.specifications.weightGrams} grams
                      </span>
                    </div>
                  )}
                  {product.specifications?.origin && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-charcoal-500 uppercase tracking-wider">Atelier Origin</span>
                      <span className="font-medium text-charcoal-900 text-right">
                        {product.specifications.origin}
                      </span>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between">
                    <span className="text-charcoal-500 uppercase tracking-wider">Occasion Recommendation</span>
                    <span className="font-medium text-champagne-800 text-right">
                      {product.occasion}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Care & Preservation Guide Accordion */}
      <div className="bg-white rounded-sm border border-ivory-300 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('care')}
          aria-expanded={openSections.care}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-ivory-50/70 transition-colors focus:outline-none focus-visible:bg-ivory-100"
        >
          <div className="flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-champagne-600 shrink-0" />
            <div>
              <h3 className="font-serif text-lg text-charcoal-900 font-medium">
                Care & Preservation Guidelines
              </h3>
              <p className="text-[11px] text-charcoal-500">
                Preserving radiant luster and foil-backed polki radiance
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: openSections.care ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-charcoal-400 p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {openSections.care && (
            <motion.div
              key="care-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={accordionVariants}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-ivory-200 space-y-3">
                <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                  High jewellery and fine kundan pieces retain their radiant lustre when shielded from moisture, chemicals, and abrasive contact.
                </p>
                <ul className="space-y-2.5 text-xs text-charcoal-700">
                  {(
                    product.careInstructions || [
                      'Always apply perfumes, hairsprays, and cosmetics completely before adorning.',
                      'Wipe gently with a soft lint-free chamois cloth after each wear.',
                      'Store in the provided signature velvet coffer away from humidity.',
                      'Do not submerge in water or subject to harsh chemical ultrasonic cleansers.',
                    ]
                  ).map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Armored Shipping & Delivery Accordion */}
      <div className="bg-white rounded-sm border border-ivory-300 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('shipping')}
          aria-expanded={openSections.shipping}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-ivory-50/70 transition-colors focus:outline-none focus-visible:bg-ivory-100"
        >
          <div className="flex items-center space-x-3">
            <Truck className="w-4 h-4 text-champagne-600 shrink-0" />
            <div>
              <h3 className="font-serif text-lg text-charcoal-900 font-medium">
                Insured Armored Courier & Delivery
              </h3>
              <p className="text-[11px] text-charcoal-500">
                Malca-Amit and Brink&apos;s secured transport with Lloyds insurance
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: openSections.shipping ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-charcoal-400 p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {openSections.shipping && (
            <motion.div
              key="shipping-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={accordionVariants}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-ivory-200 space-y-3 text-xs text-charcoal-600 leading-relaxed font-light">
                <p>
                  Every creation is encased in our wax-sealed velvet presentation coffer and dispatched under armed escort. Standard delivery takes 3–5 business days, while Priority Atelier Express delivers within 24–48 hours.
                </p>
                <p>
                  A real-time satellite tracking code is transmitted once the security seal is scanned at the vault threshold.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Authenticity & Return Policy Accordion */}
      <div className="bg-white rounded-sm border border-ivory-300 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection('authenticity')}
          aria-expanded={openSections.authenticity}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-ivory-50/70 transition-colors focus:outline-none focus-visible:bg-ivory-100"
        >
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-4 h-4 text-champagne-600 shrink-0" />
            <div>
              <h3 className="font-serif text-lg text-charcoal-900 font-medium">
                Authenticity Seal & 14-Day Evaluation Period
              </h3>
              <p className="text-[11px] text-charcoal-500">
                Dual karigar assay standards and private salon inspection window
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: openSections.authenticity ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-charcoal-400 p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {openSections.authenticity && (
            <motion.div
              key="authenticity-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={accordionVariants}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-ivory-200 space-y-3 text-xs text-charcoal-600 leading-relaxed font-light">
                <p>
                  We guarantee uncompromised quality on all materials, artisan 22k gold micron plating, and syndicate stone settings. If for any reason the creation does not match your trousseau expectations, return it within 14 days in its original sealed coffer for a full exchange or refund.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
