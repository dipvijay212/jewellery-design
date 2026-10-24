'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Collection } from '@/types/category';
import { cn } from '@/utils/cn';
import { LUXURY_EASE } from '@/utils/animations';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Gem,
} from 'lucide-react';

interface CollectionsCarouselProps {
  collections: Collection[];
}

/**
 * Converts numbers into classical Roman numerals.
 */
function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  let result = '';
  let n = num;
  for (const [value, symbol] of romanMap) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result || 'I';
}

export function CollectionsCarousel({ collections }: CollectionsCarouselProps) {
  const count = collections.length;

  // Triplicate collections for a seamless, continuous, infinite loop:
  // [Set 1: 0..N-1], [Set 2 (Active range): N..2N-1], [Set 3: 2N..3N-1]
  const extendedCollections = [
    ...collections,
    ...collections,
    ...collections,
  ];

  // Start centered in Set 2 (e.g. index count = 5 for Card 0, or count + 1 for Card 1)
  const [trackIndex, setTrackIndex] = useState(count);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1160);
  const isAnimatingRef = useRef(false);

  // Measure container width accurately on mount and window resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Responsive dimension calculations: exactly fits container without any clipping
  const isMobile = containerWidth < 768;
  const gap = isMobile ? 16 : containerWidth < 1024 ? 20 : 28;

  // On desktop/tablet, 3 cards fill 100% of container width:
  // cardWidth * 3 + gap * 2 = containerWidth
  const cardWidth = isMobile
    ? Math.round(containerWidth * 0.82)
    : Math.floor((containerWidth - 2 * gap) / 3);

  const stepDistance = cardWidth + gap;

  // X offset: card at `trackIndex` is ALWAYS mathematically positioned in the Center Slot
  const targetX = isMobile
    ? Math.round((containerWidth - cardWidth) / 2) - trackIndex * stepDistance
    : (1 - trackIndex) * stepDistance;

  // Next Slide
  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  }, []);

  // Prev Slide
  const prevSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setTrackIndex((prev) => prev - 1);
  }, []);

  // When animation completes, seamlessly normalize trackIndex within Set 2
  const handleAnimationComplete = () => {
    isAnimatingRef.current = false;
    setTrackIndex((curr) => {
      if (curr >= count * 2) {
        setIsTransitioning(false);
        return curr - count;
      }
      if (curr < count) {
        setIsTransitioning(false);
        return curr + count;
      }
      return curr;
    });
  };

  // Re-enable smooth transitions on the frame after an instant reset
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Autoplay: slide automatically & continuously every 3.8s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe for Mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Active collection index in real 0..N-1 range
  const currentCollectionIndex = trackIndex % count;
  const currentCollection = collections[currentCollectionIndex];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full select-none"
    >
      {/* 1. TOP STATUS & NAVIGATION HEADER */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E8DDC6]/80">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#180407] border border-[#C9A227]/70 text-[#DFC063] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#DFC063]" />
            <span className="font-serif text-[11px] font-semibold tracking-[0.22em] uppercase">
              Suite {toRoman(currentCollectionIndex + 1)} of {toRoman(count)}
            </span>
          </div>
          <span className="text-xs uppercase tracking-wider text-[#735A5E] hidden sm:inline-block font-medium">
            {currentCollection?.name}
          </span>
        </div>

        {/* Ornate Gold Arrow Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={prevSlide}
            aria-label="Previous Collection"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#180407] border border-[#C9A227]/70 flex items-center justify-center text-[#DFC063] shadow-md hover:border-[#DFC063] hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Collection"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#180407] border border-[#C9A227]/70 flex items-center justify-center text-[#DFC063] shadow-md hover:border-[#DFC063] hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. THE CONTINUOUS TRIPTYCH STAGE VIEWPORT */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden pt-10 sm:pt-12 pb-6 px-1"
      >
        {/* Subtle Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[640px] h-[450px] bg-gradient-to-b from-[#C9A227]/16 via-[#DFC063]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Continuous Animated Track */}
        <motion.div
          className="flex items-end"
          animate={{ x: targetX }}
          transition={
            isTransitioning
              ? { duration: 0.65, ease: LUXURY_EASE }
              : { duration: 0 }
          }
          onAnimationComplete={handleAnimationComplete}
          style={{ gap: `${gap}px` }}
        >
          {extendedCollections.map((col, idx) => {
            const isCenter = idx === trackIndex;
            const isFlanking = idx === trackIndex - 1 || idx === trackIndex + 1;
            const originalIndex = idx % count;
            const romanNumeral = toRoman(originalIndex + 1);

            return (
              <div
                key={`${idx}-${col.id}`}
                style={{ width: `${cardWidth}px` }}
                className="shrink-0 transition-all duration-500"
              >
                <div
                  onClick={() => {
                    if (!isCenter) {
                      if (idx < trackIndex) prevSlide();
                      if (idx > trackIndex) nextSlide();
                    }
                  }}
                  className={cn(
                    'group relative block overflow-hidden transition-all duration-500 select-none bg-[#140306]',
                    'rounded-t-[190px] sm:rounded-t-[230px] rounded-b-[26px] sm:rounded-b-[34px]',
                    isCenter
                      ? 'h-[490px] sm:h-[530px] -translate-y-6 sm:-translate-y-7 z-30 border-2 border-[#C9A227] shadow-[0_22px_55px_rgba(20,3,6,0.38),0_0_35px_rgba(201,162,39,0.3)]'
                      : isFlanking
                      ? 'h-[440px] sm:h-[475px] translate-y-0 z-10 border border-[#C9A227]/35 shadow-[0_12px_32px_rgba(20,3,6,0.15)] opacity-85 hover:opacity-100 hover:border-[#C9A227]/70 cursor-pointer'
                      : 'h-[420px] sm:h-[455px] translate-y-0 z-0 border border-[#C9A227]/20 opacity-30 cursor-pointer'
                  )}
                >
                  {/* Background Image inside Palace Arch */}
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    sizes="(max-width: 640px) 85vw, 33vw"
                    className={cn(
                      'object-cover object-center transition-transform duration-1000 ease-out',
                      isCenter
                        ? 'group-hover:scale-108 brightness-95'
                        : 'brightness-80 group-hover:brightness-95'
                    )}
                    draggable={false}
                    priority={isCenter}
                  />

                  {/* Architectural Inset Gold Hairline Frame */}
                  <div
                    className={cn(
                      'absolute inset-2.5 sm:inset-3 pointer-events-none transition-all duration-500 z-10',
                      'rounded-t-[180px] sm:rounded-t-[220px] rounded-b-[18px] sm:rounded-b-[24px]',
                      isCenter
                        ? 'border border-[#DFC063]/60 shadow-[inset_0_0_15px_rgba(201,162,39,0.2)]'
                        : 'border border-[#C9A227]/20 group-hover:border-[#C9A227]/50'
                    )}
                  />

                  {/* Multi-layered Vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100204] via-[#100204]/60 via-40% to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#100204]/40 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Keystone Top Medallion */}
                  <div className="absolute top-5 sm:top-6 inset-x-0 flex justify-center z-20 pointer-events-none">
                    <div
                      className={cn(
                        'px-3.5 py-1 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-xs',
                        isCenter
                          ? 'bg-[#180407]/95 border-2 border-[#C9A227] text-[#DFC063] shadow-[0_0_15px_rgba(201,162,39,0.45)] scale-105'
                          : 'bg-[#180407]/85 border border-[#C9A227]/60 text-[#DFC063]/80'
                      )}
                    >
                      <Sparkles className="w-3 h-3 text-[#DFC063] mr-1.5" />
                      <span className="font-serif text-[10.5px] font-bold tracking-[0.24em]">
                        ✦ {romanNumeral} ✦
                      </span>
                    </div>
                  </div>

                  {/* Bottom Narrative Plaque */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 bg-gradient-to-t from-[#100204] via-[#100204]/95 via-70% to-transparent pt-12 text-left">
                    {/* Filament Gold Divider on Center Card */}
                    {isCenter && (
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
                        <Gem className="w-3 h-3 text-[#DFC063]" />
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
                      </div>
                    )}

                    <span className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.24em] text-[#C9A227] font-semibold block mb-1">
                      Inspiration: {col.inspiration}
                    </span>

                    <h3
                      className={cn(
                        'font-serif font-normal text-white tracking-tight leading-snug mb-1.5 transition-colors',
                        isCenter
                          ? 'text-xl sm:text-2xl text-[#FBF8F2]'
                          : 'text-lg sm:text-xl text-[#E8DDC6]'
                      )}
                    >
                      {col.name}
                    </h3>

                    <p
                      className={cn(
                        'text-xs font-light leading-relaxed mb-3.5 line-clamp-2 transition-colors',
                        isCenter ? 'text-[#E8DDC6]/90' : 'text-[#E8DDC6]/65'
                      )}
                    >
                      {col.description}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 border-t border-[#C9A227]/30">
                      <span className="text-[10px] uppercase tracking-wider text-[#DFC063] font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                        {col.itemCount} Pieces
                      </span>

                      {/* Explore Button */}
                      {isCenter ? (
                        <Link
                          href={`/shop?collection=${encodeURIComponent(col.name)}`}
                          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#28080D] to-[#180407] border border-[#C9A227] text-[#DFC063] hover:text-white hover:border-[#DFC063] hover:shadow-[0_0_12px_rgba(201,162,39,0.4)] transition-all duration-300 gap-1.5"
                        >
                          <span>Explore Suite</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#C9A227]" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#DFC063]/80 group-hover:text-white transition-colors gap-1">
                          <span>View Suite</span>
                          <ArrowRight className="w-3 h-3 text-[#C9A227]" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* 3. MINIMAL LUXURY GOLD INDICATOR BARS */}
      <div className="flex items-center justify-center gap-2 mt-4 pt-2">
        {collections.map((col, idx) => {
          const isCurrent = idx === currentCollectionIndex;
          return (
            <button
              key={col.id}
              onClick={() => {
                const diff = idx - currentCollectionIndex;
                setTrackIndex((prev) => prev + diff);
              }}
              aria-label={`Jump to ${col.name}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500 cursor-pointer',
                isCurrent
                  ? 'w-8 bg-gradient-to-r from-[#C9A227] to-[#DFC063] shadow-[0_0_10px_rgba(201,162,39,0.5)]'
                  : 'w-2 bg-[#C9A227]/30 hover:bg-[#C9A227]/60'
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
