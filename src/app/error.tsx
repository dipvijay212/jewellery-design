'use client';

import React, { useEffect } from 'react';
import { ErrorState } from '@/components/ui/ErrorState';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for atelier telemetry
    console.error('Atelier Error Captured:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory-100 p-6">
      <ErrorState
        title="An Unexpected Disruption Occurred"
        message="Our concierge has been alerted. Please attempt to refresh the salon view or return to the main hall."
        onRetry={() => reset()}
      />
    </div>
  );
}
