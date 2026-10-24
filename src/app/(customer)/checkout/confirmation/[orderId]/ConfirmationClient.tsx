'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { orderService } from '@/services/orderService';
import { Order } from '@/types/order';
import { formatPrice, formatDate } from '@/utils/formatters';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'motion/react';
import { LUXURY_EASE } from '@/utils/animations';
import {
  CheckCircle2,
  Printer,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface Props {
  initialOrder: Order | null;
  orderId: string;
}

export function ConfirmationClient({ initialOrder, orderId }: Props) {
  const [order, setOrder] = useState<Order | null>(initialOrder);
  const [isLoading, setIsLoading] = useState(!initialOrder);

  useEffect(() => {
    if (order) return;
    let isMounted = true;
    async function fetchClientOrder() {
      try {
        const found = await orderService.getOrderById(orderId);
        if (isMounted) {
          setOrder(found);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load client order:', err);
        if (isMounted) setIsLoading(false);
      }
    }
    fetchClientOrder();
    return () => {
      isMounted = false;
    };
  }, [order, orderId]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-12 h-12 border-2 border-champagne-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="font-serif text-xl text-charcoal-800">
          Retrieving Atelier Dossier...
        </h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center bg-white p-8 border border-ivory-300 rounded-sm shadow-sm space-y-4 my-12">
        <AlertTriangle className="w-12 h-12 text-burgundy-700 mx-auto" />
        <h1 className="font-serif text-2xl text-charcoal-900">Order Reference Not Found</h1>
        <p className="text-xs text-charcoal-600">
          Could not locate order dossier for reference: <code>{orderId}</code>.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/shop">
            <Button variant="gold" size="md">
              Browse Catalogue
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="outline" size="md">
              Admin Vault
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: LUXURY_EASE }}
      className="max-w-3xl mx-auto space-y-8"
    >
      {/* Success Banner */}
      <div className="bg-burgundy-950 text-ivory-100 rounded-sm border border-champagne-500/30 p-8 text-center relative overflow-hidden shadow-lg print:border-charcoal-900 print:bg-white print:text-black">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-champagne-400/20 border border-champagne-400/40 flex items-center justify-center text-champagne-300">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-champagne-300 font-semibold mb-1 block">
          Simulated Acquisition Registered
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ivory-50 font-light mb-2 print:text-charcoal-900">
          Order Reservation Confirmed
        </h1>
        <p className="text-xs text-ivory-300 max-w-lg mx-auto print:text-charcoal-600">
          Your handcrafted jewellery reservation has been logged into our atelier vaults. A simulated dispatch notification has been generated.
        </p>

        <div className="mt-6 inline-flex items-center space-x-2 bg-charcoal-900/60 px-4 py-2 rounded-sm border border-champagne-500/30 text-xs font-mono text-champagne-300 print:text-charcoal-900 print:bg-gray-100">
          <span>Order Reference:</span>
          <strong className="text-sm font-bold tracking-wider">{order.orderNumber}</strong>
        </div>
      </div>

      {/* Simulation Disclaimer Callout */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm text-xs text-amber-950 flex items-start space-x-3 print:hidden">
        <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold">
            Frontend Simulation Notice:
          </strong>
          <p className="mt-0.5 text-[11px] leading-relaxed text-amber-900">
            This is a mock transaction created during your shopping flow preview.{' '}
            <strong>No funds were charged</strong> and no real bank credentials were exchanged. You can view this order in the live{' '}
            <Link href="/admin/orders" className="underline font-semibold text-burgundy-800 hover:text-burgundy-900">
              Admin Vault Dashboard
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Order Details Dossier Card */}
      <div className="bg-white rounded-sm border border-ivory-300 p-6 sm:p-8 space-y-8 shadow-sm">
        {/* Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-ivory-200">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-semibold block">
              Date of Acquisition
            </span>
            <span className="text-xs font-medium text-charcoal-800">
              {formatDate(order.date)}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-semibold block">
              Vault Status
            </span>
            <Badge variant="gold">
              {order.status.replace(/_/g, ' ').toUpperCase()}
            </Badge>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-semibold block">
              Transit Policy ID
            </span>
            <span className="text-xs font-mono text-charcoal-800">
              {order.insurancePolicyId}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-semibold block">
              Simulated Carrier
            </span>
            <span className="text-xs font-mono text-champagne-800 font-semibold">
              {order.trackingNumber || 'MALCA-AMIT-ARMORED'}
            </span>
          </div>
        </div>

        {/* Recipient & Payment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-champagne-800 tracking-wider block mb-2">
              Bonded Recipient & Destination
            </span>
            <p className="font-semibold text-charcoal-900 text-sm">{order.customerName}</p>
            <p className="text-charcoal-600">{order.customerEmail}</p>
            {order.customerPhone && (
              <p className="text-charcoal-600">{order.customerPhone}</p>
            )}
            <p className="text-charcoal-700 pt-1 leading-snug">
              {order.shippingAddress.line1}
              {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ''}
            </p>
            <p className="text-charcoal-700">
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.deliveryNotes && (
              <p className="text-[11px] text-charcoal-500 italic pt-1">
                Escort Notes: {order.deliveryNotes}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-champagne-800 tracking-wider block mb-2">
              Acquisition Logistics & Settlement
            </span>
            <div>
              <span className="text-[11px] text-charcoal-500 block">Armored Logistics Speed:</span>
              <span className="font-medium text-charcoal-800 capitalize">
                {order.shippingSpeed === 'express'
                  ? 'Priority Atelier Express (24-48 Hours)'
                  : 'Insured Armored Courier (3-5 Days)'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-charcoal-500 block">Settlement Method:</span>
              <span className="font-medium text-charcoal-800">
                {order.paymentMethod?.label || 'Direct Atelier Bank Wire (Simulated)'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-charcoal-500 block">Inspection Period:</span>
              <span className="font-medium text-charcoal-800">
                14 Days Private Salon Inspection
              </span>
            </div>
          </div>
        </div>

        {/* Reserved Items Table */}
        <div className="border border-ivory-200 rounded-sm overflow-hidden">
          <div className="bg-ivory-100/70 px-4 py-2.5 text-[10px] uppercase tracking-wider font-semibold text-charcoal-600 flex justify-between">
            <span>Reserved Jewellery Creation</span>
            <span>Acquisition Value</span>
          </div>
          <div className="divide-y divide-ivory-200">
            {order.items.map((item, idx) => (
              <div
                key={`${item.productId}-${idx}`}
                className="p-4 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-4">
                  {item.image && (
                    <div className="relative w-14 h-16 bg-ivory-100 rounded-sm overflow-hidden border border-ivory-300 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <span className="font-serif font-medium text-sm text-charcoal-900 block leading-snug">
                      {item.name}
                    </span>
                    {item.size && (
                      <span className="text-[11px] text-charcoal-500 block">
                        Size / Style: {item.size}
                      </span>
                    )}
                    <span className="text-[11px] text-charcoal-400">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
                <span className="font-serif font-semibold text-charcoal-900 text-sm">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="border-t border-ivory-200 pt-6 space-y-2 text-xs text-charcoal-600 max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-charcoal-900">{formatPrice(order.subtotal)}</span>
          </div>

          {order.discount && order.discount > 0 && (
            <div className="flex justify-between text-burgundy-700 font-medium">
              <span>Privilege Courtesy ({order.appliedPromo || 'Coupon'})</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Armored Logistics</span>
            <span className={order.insuredShipping === 0 ? 'text-emerald-700 font-medium' : 'text-charcoal-900 font-medium'}>
              {order.insuredShipping === 0 ? 'Complimentary' : formatPrice(order.insuredShipping)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Assay Hallmarking & GST (3%)</span>
            <span className="text-charcoal-800 font-medium">{formatPrice(order.tax)}</span>
          </div>

          <div className="border-t border-ivory-200 pt-3 flex justify-between items-baseline">
            <span className="font-serif text-base font-medium text-charcoal-900">
              Total Valuation
            </span>
            <span className="font-serif text-xl font-bold text-charcoal-900">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="border-t border-ivory-200 pt-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              <span>Print Acquisition Receipt</span>
            </Button>
            <Link href="/admin/orders">
              <Button variant="outline-gold" size="sm">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                <span>View in Admin Vault</span>
              </Button>
            </Link>
          </div>

          <Link href="/shop">
            <Button variant="gold" size="sm">
              <span>Continue Browsing Vault</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
