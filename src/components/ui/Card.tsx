import React, { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'ivory' | 'glass' | 'burgundy' | 'outline';
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = 'ivory',
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  const variants = {
    ivory: 'bg-ivory-50 border border-ivory-300/80 text-charcoal-900',
    glass: 'bg-white/70 backdrop-blur-md border border-champagne-300/40 text-charcoal-900',
    burgundy: 'bg-burgundy-950 border border-champagne-500/30 text-ivory-100',
    outline: 'border border-champagne-500/40 bg-transparent text-charcoal-900',
  };

  return (
    <div
      className={cn(
        'rounded-sm p-6 shadow-sm transition-all duration-300',
        variants[variant],
        hoverEffect && 'hover:shadow-md hover:border-champagne-500/60 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
