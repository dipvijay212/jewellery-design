import React from 'react';
import { ShieldCheck, Sparkles, Gem, Truck } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TrustBadgesProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function TrustBadges({ className, variant = 'light' }: TrustBadgesProps) {
  const isDark = variant === 'dark';

  const items = [
    {
      icon: Gem,
      title: 'GIA & SSEF Certified',
      description: 'Each solitaire accompanied by a world-recognized gemmological certificate.',
    },
    {
      icon: Sparkles,
      title: 'Bespoke Atelier Savoir-Faire',
      description: 'Handcrafted in 18k solid gold & 950 platinum by master French goldsmiths.',
    },
    {
      icon: ShieldCheck,
      title: 'Discreet Armored Shipping',
      description: '100% insured delivery via specialized luxury courier straight to your door.',
    },
    {
      icon: Truck,
      title: 'Complimentary Resizing & Care',
      description: 'Lifetime annual inspection, cleaning, and one complimentary resizing.',
    },
  ];

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 px-6 rounded-sm border',
        isDark
          ? 'bg-burgundy-950/70 border-champagne-500/20 text-ivory-100'
          : 'bg-ivory-50 border-champagne-300/30 text-charcoal-900',
        className
      )}
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-10 h-10 shrink-0 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-600">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4
                className={cn(
                  'text-sm font-semibold tracking-wide uppercase',
                  isDark ? 'text-ivory-100' : 'text-charcoal-900'
                )}
              >
                {item.title}
              </h4>
              <p
                className={cn(
                  'text-xs mt-1 leading-relaxed',
                  isDark ? 'text-ivory-300' : 'text-charcoal-600'
                )}
              >
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
