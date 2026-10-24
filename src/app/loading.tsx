import React from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory-100">
      <LoadingSpinner size="lg" label="Consulting Aurelia Vault..." />
    </div>
  );
}
