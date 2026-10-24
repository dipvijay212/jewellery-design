import React, { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'burgundy' | 'ivory' | 'outline' | 'success' | 'warning';
}

export function Badge({
  className,
  variant = 'gold',
  children,
  ...props
}: BadgeProps) {
  const base =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase';

  const variants = {
    gold: 'bg-champagne-100 text-champagne-800 border border-champagne-300/60',
    burgundy: 'bg-burgundy-900 text-ivory-100 border border-burgundy-700',
    ivory: 'bg-ivory-200 text-charcoal-800 border border-ivory-300',
    outline: 'border border-champagne-500 text-champagne-700 bg-transparent',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-300',
    warning: 'bg-amber-50 text-amber-800 border border-amber-300',
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
