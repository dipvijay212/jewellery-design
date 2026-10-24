import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { Gem } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel = 'Explore Creations',
  actionHref = '/shop',
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 bg-ivory-50/50 rounded-sm border border-champagne-300/30 max-w-xl mx-auto my-8',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-champagne-100 flex items-center justify-center text-champagne-700 mb-5 border border-champagne-300">
        {icon || <Gem className="w-7 h-7" />}
      </div>
      <h3 className="font-serif text-2xl text-charcoal-900 font-light mb-2">{title}</h3>
      <div className="w-8 h-px bg-champagne-400 my-2" />
      <p className="text-sm text-charcoal-600 mb-6 max-w-md leading-relaxed">{description}</p>
      {actionHref ? (
        <Link href={actionHref}>
          <Button variant="gold" size="md">
            {actionLabel}
          </Button>
        </Link>
      ) : onAction ? (
        <Button variant="gold" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
