import React, { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  dark?: boolean;
}

export function SectionHeading({
  className,
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  ...props
}: SectionHeadingProps) {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col', alignment[align], className)} {...props}>
      {eyebrow && (
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-champagne-600 mb-2.5">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight',
          dark ? 'text-ivory-50' : 'text-charcoal-900'
        )}
      >
        {title}
      </h2>
      <div className="w-12 h-px bg-champagne-500 my-4" />
      {description && (
        <p
          className={cn(
            'text-sm sm:text-base max-w-2xl font-normal leading-relaxed',
            dark ? 'text-ivory-300' : 'text-charcoal-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
