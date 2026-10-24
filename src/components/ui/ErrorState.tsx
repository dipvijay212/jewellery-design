'use client';

import React from 'react';
import { Button } from './Button';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'An unexpected imperfection occurred',
  message = 'We could not load the requested archival pieces at this moment. Our atelier concierge has been alerted.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 bg-burgundy-50/60 rounded-sm border border-burgundy-200 max-w-xl mx-auto my-8',
        className
      )}
      role="alert"
    >
      <div className="w-14 h-14 rounded-full bg-burgundy-100 flex items-center justify-center text-burgundy-800 mb-4 border border-burgundy-300">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-2xl text-charcoal-900 font-light mb-2">{title}</h3>
      <p className="text-sm text-charcoal-600 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button variant="burgundy" size="md" onClick={onRetry}>
          <RotateCcw className="w-3.5 h-3.5 mr-2" />
          Attempt Again
        </Button>
      )}
    </div>
  );
}
