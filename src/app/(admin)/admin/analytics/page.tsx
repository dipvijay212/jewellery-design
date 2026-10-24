import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, BarChart3 } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-charcoal-700 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-charcoal-400 mb-1">
            <Link href="/admin" className="hover:text-champagne-400 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-ivory-50">
            Vault Fiscal Analytics & Demand Index
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Performance metrics across high jewellery suites, bridal commissions, and solitaire demand.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-charcoal-800/80 rounded-sm border border-champagne-500/20 p-6 space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-semibold">
            Average High Jewellery Yield
          </span>
          <div className="font-serif text-3xl text-ivory-50">₹46,200</div>
          <p className="text-xs text-champagne-400 font-medium">
            +14% margin over precious metal bullion index
          </p>
        </div>

        <div className="bg-charcoal-800/80 rounded-sm border border-champagne-500/20 p-6 space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-semibold">
            Solitaire Diamond Reorder Velocity
          </span>
          <div className="font-serif text-3xl text-ivory-50">18.4 Days</div>
          <p className="text-xs text-champagne-400 font-medium">
            Highest turnover: 2.0+ Carat Oval Brilliant cuts
          </p>
        </div>

        <div className="bg-charcoal-800/80 rounded-sm border border-champagne-500/20 p-6 space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-semibold">
            Private Client Repeat Commission
          </span>
          <div className="font-serif text-3xl text-ivory-50">42.8%</div>
          <p className="text-xs text-champagne-400 font-medium">
            Mayfair & Vendôme private salons
          </p>
        </div>
      </div>

      <div className="bg-charcoal-800/80 rounded-sm border border-champagne-500/20 p-8 text-center space-y-4 max-w-xl mx-auto my-12">
        <div className="w-14 h-14 mx-auto rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-400">
          <BarChart3 className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl text-ivory-50 font-light">
          Real-Time Fiscal Telemetry Foundation
        </h3>
        <p className="text-xs text-charcoal-300 leading-relaxed">
          The analytics architecture is primed for integration with warehouse ERPs, live gold/platinum bullion pricing APIs, and accounting software.
        </p>
        <div className="pt-2">
          <Link href="/admin">
            <Button variant="gold" size="sm">
              Return to Vault Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
