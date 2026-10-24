import React from 'react';
import { cn } from '@/utils/cn';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Loading Aurelia Jewels...',
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-3',
  };

  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-3 p-6', className)}
      role="status"
      aria-label={label}
    >
      <div
        className={cn(
          'rounded-full border-t-champagne-500 border-r-champagne-300 border-b-ivory-300 border-l-transparent animate-spin',
          sizes[size]
        )}
      />
      {label && (
        <span className="text-[11px] uppercase tracking-[0.2em] text-champagne-700 font-medium">
          {label}
        </span>
      )}
    </div>
  );
}
