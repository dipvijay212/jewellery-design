'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { CustomerReview } from '@/data/mockReviews';
import { Star, Quote, ShieldCheck, ChevronLeft, ChevronRight, Gem } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import { LUXURY_EASE } from '@/utils/animations';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeReview = reviews[activeIndex] || reviews[0];

  return (
    <section className="py-24 bg-white border-y border-ivory-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: LUXURY_EASE }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-700 font-semibold">
              Patron Testimonials
            </span>
            <Badge variant="ivory" className="text-[9px] text-charcoal-500 font-mono">
              Sample Content (Dev)
            </Badge>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal-900 tracking-tight">
            Voices of Our Patrons
          </h2>
          <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
          <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            Reflections from collectors, royal wedding trousseaus, and patrons across London, Mumbai, New Delhi, and New York.
          </p>
        </motion.div>

        {/* Featured Testimonial Card with Crossfade Transitions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="max-w-4xl mx-auto bg-ivory-50 rounded-sm border border-champagne-300/60 p-8 sm:p-14 shadow-sm relative overflow-hidden"
        >
          <Quote className="absolute top-6 right-6 w-16 h-16 text-champagne-500/15 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: LUXURY_EASE }}
              className="space-y-6"
            >
              {/* Stars */}
              <div className="flex items-center space-x-1.5 text-champagne-600">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-semibold text-charcoal-800 ml-2">
                  5.0 Sovereign Rating
                </span>
              </div>

              {/* Title & Quote */}
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal leading-snug">
                &ldquo;{activeReview.title}&rdquo;
              </h3>

              <p className="text-sm sm:text-base text-charcoal-700 font-light leading-relaxed italic">
                &ldquo;{activeReview.content}&rdquo;
              </p>

              {/* Author info & piece reference */}
              <div className="pt-6 border-t border-ivory-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-lg font-medium text-charcoal-900">
                      {activeReview.customerName}
                    </span>
                    {activeReview.verifiedBuyer && (
                      <span className="inline-flex items-center text-[10px] uppercase tracking-wider text-emerald-800 font-semibold gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Acquisition</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-charcoal-500 mt-0.5">
                    {activeReview.location} • {activeReview.date}
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-charcoal-400 block text-[10px] uppercase tracking-wider">
                    Acquired Creation:
                  </span>
                  <Link
                    href={`/shop/${activeReview.productSlug}`}
                    className="font-serif font-medium text-champagne-700 hover:text-champagne-900 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Gem className="w-3.5 h-3.5" />
                    <span>{activeReview.productName}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="mt-8 pt-4 flex items-center justify-between border-t border-ivory-300">
            <div className="flex space-x-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'w-8 h-1 rounded-full transition-all duration-300',
                    idx === activeIndex
                      ? 'bg-champagne-600 w-12'
                      : 'bg-ivory-300 hover:bg-champagne-300'
                  )}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
                }
                className="p-2 rounded-full border border-ivory-300 bg-white text-charcoal-700 hover:bg-champagne-50 transition-colors shadow-2xs focus:outline-none"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveIndex((prev) => (prev + 1) % reviews.length)}
                className="p-2 rounded-full border border-ivory-300 bg-white text-charcoal-700 hover:bg-champagne-50 transition-colors shadow-2xs focus:outline-none"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Development identification notice */}
        <div className="mt-6 text-center text-[11px] text-charcoal-400 font-mono">
          Note: Customer reviews above represent curated development sample content for testing editorial styling.
        </div>
      </div>
    </section>
  );
}
