import React, { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-sm bg-ivory-200/80 border border-ivory-300/50',
        className
      )}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-[#FAF8F4] rounded-t-[72px] sm:rounded-t-[84px] rounded-b-[24px] sm:rounded-b-[28px] border border-[#E4D9C4] p-4 space-y-3">
      <Skeleton className="aspect-square w-full rounded-t-[66px] sm:rounded-t-[78px] rounded-b-lg" />
      <Skeleton className="h-4 w-2/3 rounded-full" />
      <Skeleton className="h-3 w-1/2 rounded-full" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}
