'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { orderService } from '@/services/orderService';
import { LUXURY_EASE } from '@/utils/animations';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Truck,
  FileCheck,
  CreditCard,
  Building,
  AlertTriangle,
  Info,
  Tag,
  Sparkles,
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryNotes: string;
  policyAcknowledged: boolean;
  paymentMethod: 'bank_wire' | 'concierge_delivery' | 'digital_escrow';
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  policyAcknowledged?: string;
}

const STEPS = [
  { id: 1, title: 'Client & Address', subtitle: 'Destination details' },
  { id: 2, title: 'Logistics & Policy', subtitle: 'Delivery terms' },
  { id: 3, title: 'Payment Preview', subtitle: 'Mock simulation' },
  { id: 4, title: 'Review Order', subtitle: 'Final verification' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    count,
    subtotal,
    discount,
    shipping,
    shippingSpeed,
    tax,
    total,
    appliedCoupon,
    promoCode,
    promoError,
    applyPromo,
    removePromo,
    updateShippingSpeed,
    clear,
  } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoInput, setPromoInput] = useState('');

  const [formData, setFormData] = useState<FormData>({
    fullName: 'Lady Eleanor Vance',
    email: 'eleanor.vance@mayfairholdings.co.uk',
    phone: '+44 20 7946 0912',
    addressLine1: '14 Grosvenor Square, Penthouse C',
    addressLine2: 'Mayfair',
    city: 'London',
    state: 'Greater London',
    postalCode: 'W1K 6JA',
    country: 'United Kingdom',
    deliveryNotes: 'Direct private reception handover. Discreet unmarked armored coffer.',
    policyAcknowledged: true,
    paymentMethod: 'bank_wire',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required for bonded delivery.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required for dispatch confirmations.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Contact phone number is required for courier logistics.';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Physical address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.state.trim()) newErrors.state = 'State / Region is required.';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal / Zip code is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.policyAcknowledged) {
      newErrors.policyAcknowledged = 'Please acknowledge our 14-day inspection and return policy to proceed.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    if (currentStep === 2) {
      if (!validateStep2()) return;
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput.trim());
      setPromoInput('');
    }
  };

  const handleSubmitOrder = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      const order = await orderService.createOrder({
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          line1: formData.addressLine1,
          line2: formData.addressLine2 || undefined,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        deliveryNotes: formData.deliveryNotes,
        shippingSpeed,
        paymentMethod: formData.paymentMethod,
        policyAcknowledged: formData.policyAcknowledged,
        items: items.map((i) => ({
          product: {
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            images: i.product.images,
            material: i.product.material,
            sku: i.product.sku,
          },
          quantity: i.quantity,
          selectedSize: i.selectedSize,
          selectedMetal: i.selectedMetal,
        })),
        couponCode: promoCode,
      });

      // Clear cart so duplicate orders cannot be created on refresh
      clear();

      // Redirect to confirmation page
      router.push(`/checkout/confirmation/${order.id}`);
    } catch (err) {
      console.error('Failed to simulate order submission:', err);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="py-24 bg-ivory-100 min-h-[70vh] flex items-center">
        <Container>
          <div className="max-w-md mx-auto text-center bg-white p-8 border border-ivory-300 rounded-sm shadow-sm space-y-4">
            <ShoppingBag className="w-12 h-12 text-champagne-600 mx-auto" />
            <h1 className="font-serif text-2xl text-charcoal-900">Your bag is empty</h1>
            <p className="text-xs text-charcoal-600">
              There are no reserved creations in your shopping bag to check out.
            </p>
            <Link href="/shop" className="block pt-2">
              <Button variant="gold" size="md">
                Discover Collection
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 bg-ivory-100 min-h-screen">
      <Container>
        {/* Breadcrumb / Back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center space-x-1.5 text-xs text-charcoal-600 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Bag</span>
          </Link>
          <div className="flex items-center space-x-2 text-xs text-champagne-800 font-medium">
            <Lock className="w-3.5 h-3.5 text-champagne-600" />
            <span>Simulated Private Checkout Environment</span>
          </div>
        </div>

        {/* Step Indicator Header */}
        <div className="mb-10 bg-white rounded-sm border border-ivory-300 p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STEPS.map((s) => {
              const isActive = currentStep === s.id;
              const isPast = currentStep > s.id;

              return (
                <div
                  key={s.id}
                  className={`flex items-center space-x-3 p-2 rounded-sm transition-all ${
                    isActive
                      ? 'bg-champagne-50/70 border-l-2 border-champagne-600'
                      : isPast
                      ? 'text-charcoal-600'
                      : 'opacity-50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif font-bold shrink-0 ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-burgundy-900 text-champagne-300'
                        : 'bg-ivory-200 text-charcoal-500'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                  </div>
                  <div>
                    <span
                      className={`text-xs block font-medium ${
                        isActive ? 'text-charcoal-900 font-semibold' : 'text-charcoal-700'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="text-[10px] text-charcoal-500 hidden sm:block">
                      {s.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form Body */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-sm border border-ivory-300 p-6 sm:p-8 shadow-sm space-y-6">
              <AnimatePresence mode="wait">
                {/* STEP 1: CLIENT & ADDRESS */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25, ease: LUXURY_EASE }}
                    className="space-y-6"
                  >
                  <div className="border-b border-ivory-200 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-champagne-700 font-bold block mb-1">
                      Step 1 of 4
                    </span>
                    <h2 className="font-serif text-2xl text-charcoal-900 font-light">
                      Client Contact & Delivery Destination
                    </h2>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Every high jewellery piece is dispatched under bonded escort. Accurate recipient credentials are mandatory.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Full Name / Honorific *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Maharani Gayatri / Lady Eleanor Vance"
                        className={`w-full text-xs px-3.5 py-2.5 border rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500 ${
                          errors.fullName ? 'border-burgundy-600' : 'border-ivory-300'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-burgundy-700 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-charcoal-800 mb-1">
                          Email for Secure Vault Dossier *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@sanctuary.com"
                          className={`w-full text-xs px-3.5 py-2.5 border rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500 ${
                            errors.email ? 'border-burgundy-600' : 'border-ivory-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-burgundy-700 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-charcoal-800 mb-1">
                          Telephone for Armored Escort SMS *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+44 20 7946 0912"
                          className={`w-full text-xs px-3.5 py-2.5 border rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500 ${
                            errors.phone ? 'border-burgundy-600' : 'border-ivory-300'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-burgundy-700 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Delivery Address Line 1 *
                      </label>
                      <input
                        type="text"
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        placeholder="Street address, villa number, or estate name"
                        className={`w-full text-xs px-3.5 py-2.5 border rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500 ${
                          errors.addressLine1 ? 'border-burgundy-600' : 'border-ivory-300'
                        }`}
                      />
                      {errors.addressLine1 && (
                        <p className="text-[11px] text-burgundy-700 mt-1">{errors.addressLine1}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Apartment, Suite, or Private Wing (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                        placeholder="Penthouse C / East Wing Salon"
                        className="w-full text-xs px-3.5 py-2.5 border border-ivory-300 rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-charcoal-800 mb-1">
                          City / Borough *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className={`w-full text-xs px-3.5 py-2.5 border rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500 ${
                            errors.city ? 'border-burgundy-600' : 'border-ivory-300'
                          }`}
                        />
                        {errors.city && (
                          <p className="text-[11px] text-burgundy-700 mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-charcoal-800 mb-1">
                          State / County *
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className={`w-full text-xs px-3.5 py-2.5 border rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500 ${
                            errors.state ? 'border-burgundy-600' : 'border-ivory-300'
                          }`}
                        />
                        {errors.state && (
                          <p className="text-[11px] text-burgundy-700 mt-1">{errors.state}</p>
                        )}
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-medium text-charcoal-800 mb-1">
                          Postal / Zip Code *
                        </label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className={`w-full text-xs px-3.5 py-2.5 border rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500 ${
                            errors.postalCode ? 'border-burgundy-600' : 'border-ivory-300'
                          }`}
                        />
                        {errors.postalCode && (
                          <p className="text-[11px] text-burgundy-700 mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Country / Jurisdiction
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 border border-ivory-300 rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500"
                      >
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="France">France</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-charcoal-800 mb-1">
                        Special Courier Instructions (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.deliveryNotes}
                        onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                        placeholder="Gate security code, specific reception concierge, or direct hand-delivery preference"
                        className="w-full text-xs p-3 border border-ivory-300 rounded-sm bg-ivory-50 focus:outline-none focus:border-champagne-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button variant="gold" size="md" onClick={handleNext}>
                      <span>Continue to Logistics & Policy</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: LOGISTICS & POLICY */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease: LUXURY_EASE }}
                  className="space-y-6"
                >
                  <div className="border-b border-ivory-200 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-champagne-700 font-bold block mb-1">
                      Step 2 of 4
                    </span>
                    <h2 className="font-serif text-2xl text-charcoal-900 font-light">
                      Logistics Method & Policy Acknowledgement
                    </h2>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Select delivery speeds and review our signature 14-day vault inspection guarantees.
                    </p>
                  </div>

                  {/* Shipping Speeds */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-charcoal-900 block">
                      Choose Armored Transport Speed:
                    </label>

                    <div
                      onClick={() => updateShippingSpeed('complimentary')}
                      className={`p-4 rounded-sm border cursor-pointer flex items-start space-x-3 transition-all ${
                        shippingSpeed === 'complimentary'
                          ? 'border-champagne-500 bg-champagne-50/40 ring-1 ring-champagne-400'
                          : 'border-ivory-300 hover:border-ivory-400'
                      }`}
                    >
                      <Truck className="w-5 h-5 text-champagne-700 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-charcoal-900">
                            Complimentary Armored Courier (Malca-Amit / Brink&apos;s)
                          </span>
                          <span className="text-xs font-serif font-bold text-emerald-800">
                            FREE
                          </span>
                        </div>
                        <p className="text-[11px] text-charcoal-600 mt-1">
                          Standard secured delivery in 3–5 business days. Encased in tamper-evident sealed wax coffer with 100% full-value Lloyds insurance cover.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => updateShippingSpeed('express')}
                      className={`p-4 rounded-sm border cursor-pointer flex items-start space-x-3 transition-all ${
                        shippingSpeed === 'express'
                          ? 'border-champagne-500 bg-champagne-50/40 ring-1 ring-champagne-400'
                          : 'border-ivory-300 hover:border-ivory-400'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 text-burgundy-700 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-charcoal-900">
                            Priority Atelier Express (24–48 Hours)
                          </span>
                          <span className="text-xs font-serif font-bold text-charcoal-900">
                            {appliedCoupon?.discountType === 'free_shipping' ? 'FREE' : '$35'}
                          </span>
                        </div>
                        <p className="text-[11px] text-charcoal-600 mt-1">
                          High-priority vault dispatch with designated escort driver. Real-time satellite vehicle tracking link provided upon departure.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery & Return Policy */}
                  <div className="p-4 bg-ivory-50 rounded-sm border border-ivory-300 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-serif font-semibold text-charcoal-900">
                      <FileCheck className="w-4 h-4 text-champagne-600" />
                      <span>Atelier Preservation & Return Policy</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 leading-relaxed">
                      All Aurelia creations undergo dual assay scrutiny prior to packing. You are entitled to a 14-day private salon inspection window upon receipt. Returned jewels must maintain the unbroken security seal and original velvet coffer.
                    </p>

                    <label className="flex items-start space-x-3 pt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.policyAcknowledged}
                        onChange={(e) =>
                          setFormData({ ...formData, policyAcknowledged: e.target.checked })
                        }
                        className="mt-0.5 text-champagne-600 focus:ring-champagne-500 rounded-sm"
                      />
                      <span className="text-xs text-charcoal-800">
                        I acknowledge and accept the 14-day inspection window and armored transit terms. *
                      </span>
                    </label>
                    {errors.policyAcknowledged && (
                      <p className="text-[11px] text-burgundy-700 pt-1">
                        {errors.policyAcknowledged}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" size="md" onClick={handleBack}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span>Back to Address</span>
                    </Button>
                    <Button variant="gold" size="md" onClick={handleNext}>
                      <span>Continue to Payment Preview</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT UI PREVIEW */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease: LUXURY_EASE }}
                  className="space-y-6"
                >
                  <div className="border-b border-ivory-200 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-champagne-700 font-bold block mb-1">
                      Step 3 of 4
                    </span>
                    <h2 className="font-serif text-2xl text-charcoal-900 font-light">
                      Payment Gateway Integration Preview
                    </h2>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Select your preferred settlement pathway. In this demonstration environment, all selections simulate an order reservation.
                    </p>
                  </div>

                  {/* Clear Demo Notice */}
                  <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm text-xs text-amber-950 flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">
                        Frontend Simulation Mode Active:
                      </strong>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-amber-900">
                        Real payment processing (Stripe / Bank Wire API) is currently disconnected for safety. 
                        <strong> Absolutely do NOT enter credit card numbers, CVVs, or bank credentials.</strong> Your choice below will record a simulated reservation in the admin demo system.
                      </p>
                    </div>
                  </div>

                  {/* Planned Payment Method Options */}
                  <div className="space-y-3">
                    <label
                      className={`p-4 rounded-sm border cursor-pointer block transition-all ${
                        formData.paymentMethod === 'bank_wire'
                          ? 'border-champagne-500 bg-champagne-50/40 ring-1 ring-champagne-400'
                          : 'border-ivory-300 hover:border-ivory-400'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'bank_wire'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'bank_wire' })}
                          className="mt-1 text-champagne-600 focus:ring-champagne-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Building className="w-4 h-4 text-champagne-700" />
                            <span className="text-xs font-bold text-charcoal-900">
                              Direct Atelier Bank Wire / RTGS (Planned Preview)
                            </span>
                          </div>
                          <p className="text-[11px] text-charcoal-600 mt-1">
                            Simulates an invoice reservation hold. Vault karigars reserve your heirloom for 48 hours awaiting verified wire clearance.
                          </p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={`p-4 rounded-sm border cursor-pointer block transition-all ${
                        formData.paymentMethod === 'concierge_delivery'
                          ? 'border-champagne-500 bg-champagne-50/40 ring-1 ring-champagne-400'
                          : 'border-ivory-300 hover:border-ivory-400'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'concierge_delivery'}
                          onChange={() =>
                            setFormData({ ...formData, paymentMethod: 'concierge_delivery' })
                          }
                          className="mt-1 text-champagne-600 focus:ring-champagne-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <ShieldCheck className="w-4 h-4 text-champagne-700" />
                            <span className="text-xs font-bold text-charcoal-900">
                              Private Concierge Card on Delivery (Planned Preview)
                            </span>
                          </div>
                          <p className="text-[11px] text-charcoal-600 mt-1">
                            Simulates white-glove armed courier arrival with an encrypted portable point-of-sale terminal at your residence or salon.
                          </p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={`p-4 rounded-sm border cursor-pointer block transition-all ${
                        formData.paymentMethod === 'digital_escrow'
                          ? 'border-champagne-500 bg-champagne-50/40 ring-1 ring-champagne-400'
                          : 'border-ivory-300 hover:border-ivory-400'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'digital_escrow'}
                          onChange={() =>
                            setFormData({ ...formData, paymentMethod: 'digital_escrow' })
                          }
                          className="mt-1 text-champagne-600 focus:ring-champagne-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-champagne-700" />
                            <span className="text-xs font-bold text-charcoal-900">
                              Digital Escrow & UPI / Card Gateway (Planned Preview)
                            </span>
                          </div>
                          <p className="text-[11px] text-charcoal-600 mt-1">
                            Simulates funds held in a neutral third-party escrow account, released only after physical inspection approval.
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" size="md" onClick={handleBack}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span>Back to Logistics</span>
                    </Button>
                    <Button variant="gold" size="md" onClick={handleNext}>
                      <span>Review Final Order</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: REVIEW ORDER */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease: LUXURY_EASE }}
                  className="space-y-6"
                >
                  <div className="border-b border-ivory-200 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-champagne-700 font-bold block mb-1">
                      Step 4 of 4
                    </span>
                    <h2 className="font-serif text-2xl text-charcoal-900 font-light">
                      Review & Confirm Simulated Acquisition
                    </h2>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Please verify all dispatch coordinates and reserved items before placing the simulated reservation.
                    </p>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-ivory-50 rounded-sm border border-ivory-300 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-champagne-800 tracking-wider block mb-1">
                        Delivery Recipient & Destination
                      </span>
                      <p className="font-semibold text-charcoal-900">{formData.fullName}</p>
                      <p className="text-charcoal-600">{formData.email}</p>
                      <p className="text-charcoal-600">{formData.phone}</p>
                      <p className="text-charcoal-700 pt-1">
                        {formData.addressLine1}
                        {formData.addressLine2 ? `, ${formData.addressLine2}` : ''}
                      </p>
                      <p className="text-charcoal-700">
                        {formData.city}, {formData.state} {formData.postalCode}, {formData.country}
                      </p>
                    </div>

                    <div className="p-4 bg-ivory-50 rounded-sm border border-ivory-300 space-y-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-champagne-800 tracking-wider block mb-1">
                          Logistics Escort
                        </span>
                        <p className="text-charcoal-800 font-medium capitalize">
                          {shippingSpeed === 'express'
                            ? 'Priority Atelier Express (24-48 Hours)'
                            : 'Insured Armored Courier (Complimentary)'}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-champagne-800 tracking-wider block mb-1">
                          Selected Settlement Preview
                        </span>
                        <p className="text-charcoal-800 font-medium">
                          {formData.paymentMethod === 'bank_wire'
                            ? 'Atelier Bank Wire / RTGS (Simulated)'
                            : formData.paymentMethod === 'concierge_delivery'
                            ? 'Concierge Card on Delivery (Simulated)'
                            : 'Digital Escrow (Simulated)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="border border-ivory-200 rounded-sm divide-y divide-ivory-200">
                    {items.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${idx}`}
                        className="p-4 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-14 bg-ivory-100 rounded-sm overflow-hidden border border-ivory-300 shrink-0">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-serif font-medium text-charcoal-900 block line-clamp-1">
                              {item.product.name}
                            </span>
                            <span className="text-[11px] text-charcoal-500">
                              Qty: {item.quantity} × {formatPrice(item.product.price)}
                            </span>
                          </div>
                        </div>
                        <span className="font-serif font-bold text-charcoal-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Submission Disclaimer */}
                  <div className="p-4 bg-champagne-50 border border-champagne-300 rounded-sm text-xs text-charcoal-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-semibold text-champagne-900">
                      <ShieldCheck className="w-4 h-4 text-champagne-700" />
                      <span>Simulated Order Registration</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 leading-relaxed">
                      By clicking below, a simulated order reference will be generated and instantly made visible in the Aurelia Admin Vault. No real financial transaction will occur.
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleBack}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span>Back to Payment</span>
                    </Button>
                    <Button
                      variant="gold"
                      size="lg"
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Securing Vault Reservation...' : 'Confirm Simulated Order'}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-sm border border-ivory-300 p-6 space-y-6 shadow-sm sticky top-28">
              <div className="border-b border-ivory-200 pb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-charcoal-900 font-light">
                  Order Summary
                </h3>
                <span className="text-xs text-charcoal-500">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items preview */}
              <div className="max-h-56 overflow-y-auto space-y-3 pr-1 text-xs">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="flex items-center justify-between pb-2 border-b border-ivory-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="relative w-10 h-12 bg-ivory-100 rounded-sm overflow-hidden shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="line-clamp-1 max-w-[150px]">
                        <span className="font-medium text-charcoal-900 block truncate">
                          {item.product.name}
                        </span>
                        <span className="text-[10px] text-charcoal-500">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-charcoal-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Privilege Coupon */}
              <div className="border-t border-ivory-200 pt-4 space-y-2">
                {!appliedCoupon ? (
                  <div>
                    <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Privilege Code (AURELIA10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 text-xs px-3 py-2 border border-ivory-300 rounded-sm bg-ivory-50 uppercase tracking-wider font-mono focus:outline-none focus:border-champagne-500"
                      />
                      <Button type="submit" variant="outline-gold" size="sm">
                        Apply
                      </Button>
                    </form>
                    {promoError && (
                      <p className="text-[11px] text-burgundy-700 mt-1 flex items-center gap-1">
                        <Info className="w-3 h-3 shrink-0" />
                        {promoError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-sm text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-emerald-900 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      Code <strong className="font-mono">{promoCode}</strong> Active
                    </span>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-emerald-800 hover:text-burgundy-700 underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-charcoal-600 pt-4 border-t border-ivory-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-burgundy-700 font-medium">
                    <span>Privilege Courtesy ({promoCode})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Armored Transit</span>
                  <span className={shipping === 0 ? 'text-emerald-700 font-medium' : 'text-charcoal-900 font-medium'}>
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Assay Hallmarking & GST (3%)</span>
                  <span className="text-charcoal-800 font-medium">{formatPrice(tax)}</span>
                </div>

                <div className="border-t border-ivory-200 pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-base font-medium text-charcoal-900 block">
                      Total Acquisition
                    </span>
                    <span className="text-[10px] text-charcoal-500">Fully insured & sealed</span>
                  </div>
                  <span className="font-serif text-xl font-bold text-charcoal-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-charcoal-500 space-y-2 border-t border-ivory-200">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                  <span>Dual karigar assay scrutiny before dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                  <span>256-Bit SSL simulated encrypted session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
