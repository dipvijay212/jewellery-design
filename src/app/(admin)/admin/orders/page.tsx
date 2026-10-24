'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { orderService } from '@/services/orderService';
import { Order } from '@/types/order';
import { formatPrice, formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadOrders() {
      try {
        const data = await orderService.getOrders();
        if (isMounted) {
          setOrders(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load admin orders:', err);
        if (isMounted) setIsLoading(false);
      }
    }
    loadOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'vault_secured':
        return <Badge variant="gold">Vault Secured</Badge>;
      case 'in_atelier':
        return <Badge variant="burgundy">In Atelier</Badge>;
      case 'insured_transit':
        return <Badge variant="warning">Insured Transit</Badge>;
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      default:
        return <Badge variant="ivory">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-charcoal-700 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-charcoal-400 mb-1">
            <Link href="/admin" className="hover:text-champagne-400 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-ivory-50">
            Atelier Client Orders & Commissions
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Managing client bespoke acquisitions, simulation orders, and discreet armored logistics.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-champagne-400 bg-charcoal-800 px-3 py-2 rounded-sm border border-champagne-500/20">
          <Truck className="w-4 h-4" />
          <span>Malca-Amit & Brink&apos;s Armored Transit Active</span>
        </div>
      </div>

      <div className="bg-charcoal-800/80 rounded-sm border border-champagne-500/20 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-charcoal-700 text-[10px] uppercase tracking-widest text-charcoal-400 bg-charcoal-900/50">
                <th className="py-3.5 px-4 font-semibold">Order Ref</th>
                <th className="py-3.5 px-4 font-semibold">Client Name</th>
                <th className="py-3.5 px-4 font-semibold">Acquisition Details</th>
                <th className="py-3.5 px-4 font-semibold">Destination</th>
                <th className="py-3.5 px-4 font-semibold">Insurance & Carrier</th>
                <th className="py-3.5 px-4 font-semibold">Total (INR)</th>
                <th className="py-3.5 px-4 font-semibold">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-700/60">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-charcoal-400">
                    Loading vault order dossiers...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-charcoal-400">
                    No orders recorded in vault yet.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-charcoal-700/30 transition-colors">
                    <td className="py-4 px-4 font-medium text-champagne-300">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/checkout/confirmation/${ord.id}`}
                          className="hover:text-champagne-100 hover:underline"
                        >
                          {ord.orderNumber}
                        </Link>
                        {ord.isSimulated && (
                          <span className="text-[9px] bg-burgundy-900/80 text-champagne-300 px-1.5 py-0.2 rounded border border-champagne-500/30 font-sans">
                            Simulated
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-charcoal-400">{formatDate(ord.date)}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-ivory-100">{ord.customerName}</div>
                      <div className="text-[10px] text-charcoal-400 truncate max-w-xs">
                        {ord.customerEmail}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-charcoal-200">
                        {ord.items.map((i) => (
                          <div key={i.productId} className="truncate max-w-xs">
                            {i.quantity}x {i.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-charcoal-300">
                      <div>
                        {ord.shippingAddress.city}, {ord.shippingAddress.country}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-[11px] text-champagne-400 flex items-center gap-1 font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-champagne-500" />
                        <span>{ord.insurancePolicyId}</span>
                      </div>
                      {ord.trackingNumber && (
                        <div className="text-[10px] text-charcoal-400 font-mono">
                          {ord.trackingNumber}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-serif font-bold text-ivory-50 text-sm">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(ord.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
