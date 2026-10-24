'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Gem, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { BRAND } from '@/utils/constants';
import { LUXURY_EASE } from '@/utils/animations';

export function CustomerFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-burgundy-950 text-ivory-100 border-t border-champagne-500/20 pt-16 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: LUXURY_EASE }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Newsletter & Atelier Invitation */}
        <div className="pb-16 border-b border-burgundy-800/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-champagne-400 font-semibold">
              The Atelier Gazette
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-ivory-50">
              Invitations to Private Salon Viewings
            </h3>
            <p className="text-xs text-ivory-300 max-w-lg leading-relaxed">
              Subscribe to receive exclusive access to newly unearthed high-jewellery solitaires, bridal trousseau openings, and curated gemological monographs.
            </p>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="subscribed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-3 bg-burgundy-900/80 border border-champagne-500/40 px-5 py-4 rounded-sm text-champagne-200 text-xs"
                >
                  <Check className="w-4 h-4 text-champagne-400" />
                  <span>
                    Thank you for your acquaintance. A private welcome dossier and privilege courtesy code have been dispatched to your correspondence.
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your private email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-burgundy-900/70 border border-champagne-500/30 text-ivory-50 placeholder:text-ivory-400/60 text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-champagne-400"
                  />
                  <button
                    type="submit"
                    className="bg-champagne-500 hover:bg-champagne-600 text-charcoal-900 px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                  >
                    <span>Receive Gazette</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Brand Pillars & Navigation Links Grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-burgundy-800/80">
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Gem className="w-5 h-5 text-champagne-400" />
              <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-ivory-50">
                Aurelia
              </span>
            </div>
            <p className="text-xs text-ivory-300 max-w-sm leading-relaxed font-light">
              Maison de Haute Joaillerie inspired by centuries of royal Indian and European goldsmith heritage. Every jewel is sculpted by hand with certified stones, natural polki, and sovereign 18k solid gold.
            </p>
          </div>

          {/* Nav: Creations */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-champagne-400">
              Creations
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li>
                <Link href="/shop?category=rings" className="hover:text-champagne-300 transition-colors">
                  Rings & Solitaires
                </Link>
              </li>
              <li>
                <Link href="/shop?category=necklaces" className="hover:text-champagne-300 transition-colors">
                  Necklaces & Colliers
                </Link>
              </li>
              <li>
                <Link href="/bridal" className="hover:text-champagne-300 transition-colors">
                  Bridal & Trousseau Suites
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bracelets" className="hover:text-champagne-300 transition-colors">
                  Bracelets & Cuffs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=high-jewellery" className="hover:text-champagne-300 transition-colors">
                  High Jewellery (Haute)
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav: Maison */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-champagne-400">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li>
                <Link href="/about" className="hover:text-champagne-300 transition-colors">
                  Our Heritage & Savoir-Faire
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-champagne-300 transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-champagne-300 transition-colors">
                  Private Bespoke Commissions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-champagne-300 transition-colors">
                  Ethical Sourcing & Diamonds
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-champagne-300 transition-colors">
                  Armored Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav: Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-champagne-400">
              Concierge Care
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li>
                <Link href="/returns" className="hover:text-champagne-300 transition-colors">
                  Returns & Lifetime Sizing
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-champagne-300 transition-colors">
                  Insured Armored Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-champagne-300 transition-colors">
                  Book Salon Viewing
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-champagne-300 transition-colors">
                  Appraisals & Valuation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-champagne-400 hover:text-champagne-300 font-medium">
                  Vault Administration
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-400 gap-4">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="flex items-center gap-1.5 text-champagne-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GIA, SSEF & Gübelin Verified</span>
            </span>
            <Link href="/privacy" className="hover:text-champagne-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-champagne-300 transition-colors">
              Terms of Acquisition
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
