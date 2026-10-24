import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'burgundy' | 'outline-gold' | 'outline-burgundy' | 'outline' | 'ivory' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'gold',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-[0.12em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      gold: 'bg-champagne-500 hover:bg-champagne-600 text-charcoal-900 shadow-md hover:shadow-lg active:scale-[0.99]',
      burgundy:
        'bg-burgundy-900 hover:bg-burgundy-950 text-ivory-100 shadow-md hover:shadow-lg active:scale-[0.99] border border-champagne-500/30',
      'outline-gold':
        'border border-champagne-500 text-champagne-700 hover:bg-champagne-500 hover:text-charcoal-900 active:scale-[0.99]',
      'outline-burgundy':
        'border border-burgundy-800 text-burgundy-800 hover:bg-burgundy-800 hover:text-ivory-50 active:scale-[0.99]',
      outline:
        'border border-ivory-400 text-charcoal-700 hover:bg-ivory-200 hover:text-charcoal-900 active:scale-[0.99]',
      ivory:
        'bg-ivory-100 hover:bg-ivory-200 text-charcoal-900 border border-ivory-300 shadow-sm active:scale-[0.99]',
      ghost:
        'text-charcoal-800 hover:text-champagne-600 hover:bg-champagne-500/10 active:scale-[0.99]',
    };

    const sizes = {
      sm: 'text-[11px] px-3.5 py-1.5 rounded-sm',
      md: 'text-xs px-5 py-2.5 rounded-sm',
      lg: 'text-sm px-8 py-3.5 rounded-sm tracking-[0.16em]',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
