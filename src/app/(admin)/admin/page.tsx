import React from 'react';
import Link from 'next/link';
import { adminService } from '@/services/adminService';
import { orderService } from '@/services/orderService';
import { formatPrice } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  DollarSign,
  Package,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const dashboardData = await adminService.getDashboardData();
  const recentOrders = await orderService.getOrders();
  const alerts = await adminService.getVaultAlerts();

  const kpiIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    DollarSign,
    Sparkles,
    Package,
    ShieldCheck,
  };

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
    <div className="space-y-8">
      {/* Top Banner Alert / Status */}
      <div className="p-4 rounded-sm bg-burgundy-950/70 border border-champagne-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-champagne-500/20 border border-champagne-500/40 flex items-center justify-center text-champagne-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ivory-50">
              Vault Security: Level 5 High-Value Protection Active
            </div>
            <div className="text-[11px] text-ivory-300">
              All 32 inventory pieces synchronized with Lloyd&apos;s Insurance Underwriters.
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/admin/products">
            <Button variant="outline-gold" size="sm">
              Vault Masterpieces
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="gold" size="sm">
              Atelier Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.kpis.map((kpi) => {
          const Icon = kpiIcons[kpi.iconName] || DollarSign;
          return (
            <div
              key={kpi.id}
              className="bg-charcoal-800/80 rounded-sm border border-champagne-500/20 p-6 flex flex-col justify-between hover:border-champagne-500/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase tracking-wider text-charcoal-400 font-medium">
                  {kpi.title}
                </span>
                <div className="p-2 rounded-sm bg-charcoal-700/60 text-champagne-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="font-serif text-3xl font-light text-ivory-50 tracking-tight">
                  {kpi.value}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-champagne-400 font-semibold flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    {kpi.change}
                  </span>
                </div>
                <div className="text-[10px] text-charcoal-400 mt-1">{kpi.timeframe}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Low Stock Vault Alerts & Orders Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Atelier Orders */}
        <div className="lg:col-span-8 bg-charcoal-800/80 rounded-sm border border-champagne-500/20 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-charcoal-700">
              <div>
                <h2 className="font-serif text-lg text-ivory-50 font-normal">
                  Recent High-Value Acquisitions
                </h2>
                <span className="text-xs text-charcoal-400">
                  Active orders queued for bespoke sizing or armored carrier courier
                </span>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs uppercase tracking-wider text-champagne-400 hover:text-champagne-300 flex items-center gap-1 font-semibold"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-charcoal-700 text-[10px] uppercase tracking-widest text-charcoal-400">
                    <th className="pb-3 font-semibold">Ref Number</th>
                    <th className="pb-3 font-semibold">Client Name</th>
                    <th className="pb-3 font-semibold">Pieces</th>
                    <th className="pb-3 font-semibold">Total Value</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-700/60">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-charcoal-700/30 transition-colors">
                      <td className="py-3.5 font-medium text-champagne-300">
                        {order.orderNumber}
                      </td>
                      <td className="py-3.5 text-ivory-100">{order.customerName}</td>
                      <td className="py-3.5 text-charcoal-300">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="py-3.5 font-serif font-medium text-ivory-50">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3.5">{getStatusBadge(order.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-charcoal-800/80 rounded-sm border border-champagne-500/20 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-charcoal-700">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="font-serif text-lg text-ivory-50 font-normal">
                Vault Stock Watch
              </h2>
            </div>
            <p className="text-xs text-charcoal-400 mb-4">
              Masterpieces with single remaining atelier specimens requiring commission replenishment.
            </p>

            <div className="space-y-4">
              {alerts.map((alt) => (
                <div
                  key={alt.id}
                  className="p-3.5 rounded-sm bg-charcoal-900 border border-charcoal-700 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-serif font-medium text-ivory-100">
                        {alt.productName}
                      </h4>
                      <span className="text-[10px] text-charcoal-400">SKU: {alt.sku}</span>
                    </div>
                    <Badge variant={alt.status === 'critical' ? 'burgundy' : 'warning'}>
                      {alt.currentStock} left
                    </Badge>
                  </div>
                  <div className="flex justify-between text-[11px] text-charcoal-400 pt-1 border-t border-charcoal-800">
                    <span>Valuation: {formatPrice(alt.valuation)}</span>
                    <span className="text-champagne-400 font-medium">Reorder Req</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-charcoal-700 mt-6">
            <Link href="/admin/products">
              <Button variant="outline-gold" size="sm" className="w-full">
                Open Full Vault Inventory
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
