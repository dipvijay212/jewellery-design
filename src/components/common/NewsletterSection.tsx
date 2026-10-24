'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import { LUXURY_EASE } from '@/utils/animations';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [salutation, setSalutation] = useState('M.');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-20 bg-burgundy-950 text-ivory-50 border-t border-champagne-500/20 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial from-burgundy-900/40 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: LUXURY_EASE }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          <span>The Atelier Gazette</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory-50 tracking-tight leading-tight mb-4">
          Receive Our Private Salon Monographs
        </h2>

        <p className="text-xs sm:text-sm text-ivory-200 font-light max-w-xl mx-auto leading-relaxed mb-8">
          Become part of our inner circle. Patrons receive invitations to private viewing salons, unannounced high-jewellery releases, and our annual gemological journal.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="bg-burgundy-900/90 border border-champagne-500/50 p-6 sm:p-8 rounded-sm max-w-lg mx-auto space-y-3"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-champagne-100 flex items-center justify-center text-champagne-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-ivory-50 font-normal">
                Acquaintance Established
              </h3>
              <p className="text-xs text-ivory-200 leading-relaxed font-light">
                Your formal invitation has been dispatched. As a welcome courtesy, apply code{' '}
                <span className="font-bold text-champagne-300 tracking-wider">AURELIA10</span>{' '}
                at checkout for a 10% privilege courtesies on your inaugural acquisition.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-[11px] text-champagne-400 hover:text-champagne-200 underline uppercase tracking-wider"
                >
                  Register another correspondence
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  className="bg-burgundy-900/80 border border-champagne-500/30 text-ivory-100 text-xs px-3 py-3 rounded-sm focus:outline-none focus:border-champagne-400 sm:w-28 shrink-0"
                >
                  <option value="M.">Mr. / Sir</option>
                  <option value="Mme.">Mrs. / Lady</option>
                  <option value="Mlle.">Ms. / Dr.</option>
                </select>

                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-champagne-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your confidential email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-burgundy-900/80 border border-champagne-500/30 text-ivory-50 placeholder:text-ivory-400/60 text-xs pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-champagne-400"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  isLoading={status === 'loading'}
                  className="shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-ivory-400">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
                <span>Uncompromised Privacy. No promotional commercial spam.</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
