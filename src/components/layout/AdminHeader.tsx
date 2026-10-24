'use client';

import React from 'react';
import { Bell, Search, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AdminHeader({
  title = 'Executive Vault Control',
  subtitle = 'Atelier stock levels, high-value client acquisitions, and armored shipping statuses',
}: AdminHeaderProps) {
  return (
    <header className="h-20 bg-charcoal-900 border-b border-champagne-500/20 px-8 flex items-center justify-between text-ivory-100">
      <div>
        <h1 className="font-serif text-xl sm:text-2xl text-ivory-50 tracking-wide font-light">
          {title}
        </h1>
        <p className="text-xs text-ivory-300 hidden md:block">{subtitle}</p>
      </div>

      <div className="flex items-center space-x-6">
        {/* Quick Search */}
        <div className="relative hidden lg:block">
          <Search className="w-4 h-4 text-champagne-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vault SKU, client, carat..."
            className="w-64 bg-charcoal-800 border border-charcoal-700 text-xs text-ivory-100 pl-9 pr-4 py-2 rounded-sm focus:outline-none focus:border-champagne-500 placeholder:text-charcoal-400"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 text-ivory-300 hover:text-champagne-300 transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-champagne-500" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-charcoal-800">
          <div className="w-9 h-9 rounded-full bg-burgundy-900 border border-champagne-500 flex items-center justify-center text-champagne-300 font-serif text-sm">
            AJ
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-ivory-50">Directeur de Haute</div>
            <div className="text-[10px] text-champagne-400 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
              <span>Full Privileges</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
