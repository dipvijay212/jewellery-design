'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/utils/constants';
import { LUXURY_EASE } from '@/utils/animations';
import { Phone, Mail, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    salon: 'Mayfair, London',
    date: '',
    interest: 'Bridal Trousseau Suite',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
            Private Client Relations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 tracking-tight">
            Salon Concierge
          </h1>
          <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
          <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            Schedule a private appointment in our viewing rooms or consult with an atelier gemologist regarding bespoke high jewellery commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Salon Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-burgundy-950 text-ivory-100 p-8 rounded-sm border border-champagne-500/30 space-y-6">
              <h2 className="font-serif text-2xl text-ivory-50 font-light">
                Global Flagship Salons
              </h2>
              <div className="space-y-4 text-xs text-ivory-300">
                {BRAND.flagshipBoutiques.map((b) => (
                  <div key={b.city} className="flex items-start space-x-3 pb-3 border-b border-burgundy-800/80">
                    <MapPin className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-ivory-50">{b.city} Salon</div>
                      <div className="text-[11px] text-ivory-400 mt-0.5">{b.location}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-3 text-xs border-t border-burgundy-800">
                <div className="flex items-center space-x-3 text-champagne-300">
                  <Phone className="w-4 h-4" />
                  <span>{BRAND.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-champagne-300">
                  <Mail className="w-4 h-4" />
                  <span>{BRAND.supportEmail}</span>
                </div>
                <div className="flex items-center space-x-3 text-ivory-400 text-[11px]">
                  <Clock className="w-4 h-4 text-champagne-400" />
                  <span>Monday - Saturday: 10:00 - 19:00 (Private Access Only)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-sm border border-ivory-300 shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: LUXURY_EASE }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-champagne-100 border border-champagne-400 flex items-center justify-center text-champagne-700">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal-900 font-light">
                    Salon Viewing Confirmed
                  </h3>
                  <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-charcoal-900">{formData.name}</span>. Your private dossier has been assigned to Senior Gemologist M. Laurent. We will confirm your salon suite via telephone within 4 business hours.
                  </p>
                  <div className="pt-4">
                    <Button variant="outline-gold" size="sm" onClick={() => setSubmitted(false)}>
                      Submit Another Inquiry
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: LUXURY_EASE }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <h3 className="font-serif text-xl text-charcoal-900 font-normal mb-2">
                  Request an Appointment
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lady Eleanor Vance"
                      className="w-full text-xs px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 rounded-sm focus:outline-none focus:border-champagne-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@domain.com"
                      className="w-full text-xs px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 rounded-sm focus:outline-none focus:border-champagne-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 20 7946 0912"
                      className="w-full text-xs px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 rounded-sm focus:outline-none focus:border-champagne-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                      Preferred Boutique Salon *
                    </label>
                    <select
                      value={formData.salon}
                      onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 bg-ivory-50 border border-ivory-300 rounded-sm focus:outline-none focus:border-champagne-500"
                    >
                      <option value="Mayfair, London">42 Old Bond Street, London</option>
                      <option value="Place Vendome, Paris">12 Place Vendôme, Paris</option>
                      <option value="Fifth Avenue, New York">740 Fifth Avenue, New York</option>
                      <option value="Ginza, Tokyo">Ginza 6-Chome, Tokyo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                    Nature of Commission / Interest *
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-ivory-50 border border-ivory-300 rounded-sm focus:outline-none focus:border-champagne-500"
                  >
                    <option value="Bridal Trousseau Suite">Bridal & Wedding Trousseau Suite</option>
                    <option value="Solitaire Engagement Ring">Natural Solitaire Diamond Ring (2ct+)</option>
                    <option value="High Jewellery Colliers">High Jewellery (Haute Joaillerie)</option>
                    <option value="Custom Karigar Commission">Custom Bespoke Remounting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                    Special Requests or Stone Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specific carat sizes, gemstone origins (Muzo, Ceylon, Mogok), or wedding dates..."
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 rounded-sm focus:outline-none focus:border-champagne-500"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    <span>Reserve Private Salon Viewing</span>
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        </div>
      </Container>
    </div>
  );
}
