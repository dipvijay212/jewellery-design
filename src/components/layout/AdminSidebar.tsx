'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gem,
  PackageCheck,
  BarChart3,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export function AdminSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Vault Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Jewellery Inventory', href: '/admin/products', icon: Gem },
    { name: 'Atelier Orders', href: '/admin/orders', icon: PackageCheck },
    { name: 'Revenue & Analytics', href: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-charcoal-900 border-r border-champagne-500/20 flex flex-col shrink-0 min-h-screen text-ivory-100">
      {/* Brand Header */}
      <div className="p-6 border-b border-charcoal-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-sm bg-champagne-500/10 border border-champagne-500/40 flex items-center justify-center text-champagne-400">
            <Gem className="w-4 h-4" />
          </div>
          <div>
            <div className="font-serif text-lg tracking-widest uppercase text-ivory-50">
              Aurelia
            </div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-champagne-400 font-semibold">
              Vault Control
            </div>
          </div>
        </Link>
      </div>

      {/* Vault Status Indicator */}
      <div className="px-6 py-3 bg-burgundy-950/60 border-b border-charcoal-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-ivory-300 font-medium">Secured Vault Active</span>
        </div>
        <ShieldAlert className="w-3.5 h-3.5 text-champagne-400" />
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1.5">
        <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-charcoal-400 font-bold">
          Management
        </div>
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-sm text-xs font-medium tracking-wider uppercase transition-colors',
                isActive
                  ? 'bg-burgundy-900 text-champagne-300 border-l-2 border-champagne-500 font-semibold'
                  : 'text-ivory-300 hover:text-ivory-50 hover:bg-charcoal-800'
              )}
            >
              <Icon className="w-4 h-4 text-champagne-400" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Switch to Boutique Storefront Link */}
      <div className="p-4 border-t border-charcoal-800">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2.5 rounded-sm bg-charcoal-800 hover:bg-burgundy-950 text-champagne-300 text-xs font-medium tracking-wider uppercase border border-champagne-500/20 transition-all"
        >
          <span className="flex items-center space-x-2">
            <Gem className="w-3.5 h-3.5 text-champagne-400" />
            <span>Storefront</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-champagne-400" />
        </Link>
      </div>
    </aside>
  );
}
