'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { LUXURY_EASE } from '@/utils/animations';

interface ProductImageZoomProps {
  images: string[];
  productName: string;
}

export function ProductImageZoom({ images, productName }: ProductImageZoomProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [fullscreenModal, setFullscreenModal] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomCoords({ x, y });
  };

  const activeImage = images[activeImageIndex] || images[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: LUXURY_EASE }}
      className="flex flex-col-reverse lg:flex-row gap-4"
    >
      {/* Thumbnails Sidebar / Strip */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[540px] scrollbar-none shrink-0 py-1">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveImageIndex(idx)}
              className={cn(
                'relative w-16 h-20 sm:w-20 sm:h-24 rounded-sm overflow-hidden border-2 transition-all shrink-0 bg-ivory-100 focus:outline-none',
                idx === activeImageIndex
                  ? 'border-champagne-600 ring-2 ring-champagne-500/30'
                  : 'border-ivory-300 hover:border-champagne-400 opacity-75 hover:opacity-100'
              )}
              aria-label={`View ${productName} image ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
              {idx === activeImageIndex && (
                <motion.div
                  layoutId="thumbnail-active"
                  className="absolute inset-0 border-2 border-champagne-600 pointer-events-none"
                  transition={{ duration: 0.25 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Main Image with Zoom Lens */}
      <div className="relative flex-1">
        <div
          ref={imageContainerRef}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setFullscreenModal(true)}
          className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-ivory-100 border border-ivory-300 cursor-crosshair group shadow-sm select-none"
        >
          {/* Base Image with AnimatePresence Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={productName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={cn(
                  'object-cover transition-opacity duration-200',
                  isZooming ? 'opacity-0' : 'opacity-100'
                )}
              />
            </motion.div>
          </AnimatePresence>

          {/* High-Resolution Magnified Lens View */}
          {isZooming && (
            <div
              className="absolute inset-0 bg-no-repeat transition-all pointer-events-none"
              style={{
                backgroundImage: `url(${activeImage})`,
                backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                backgroundSize: '240%',
              }}
            />
          )}

          {/* Zoom hint badge */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-sm border border-ivory-300 text-[10px] uppercase tracking-wider text-charcoal-700 flex items-center gap-1.5 shadow-2xs pointer-events-none group-hover:bg-white"
          >
            <ZoomIn className="w-3.5 h-3.5 text-champagne-700" />
            <span className="hidden sm:inline">Hover to Zoom • Click to Expand</span>
            <span className="sm:hidden">Tap to Expand</span>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {fullscreenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-charcoal-950/90 backdrop-blur-md"
              onClick={() => setFullscreenModal(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: LUXURY_EASE }}
              className="relative max-w-4xl max-h-[90vh] w-full aspect-[4/5] bg-ivory-950 rounded-sm overflow-hidden shadow-2xl z-10"
            >
              <Image
                src={activeImage}
                alt={`${productName} magnified view`}
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-contain"
              />

              {/* Close Button */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setFullscreenModal(false)}
                className="absolute top-4 right-4 p-2 bg-charcoal-900/80 text-ivory-100 hover:text-white rounded-full transition-colors backdrop-blur-md shadow-lg"
                aria-label="Close fullscreen modal"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Lightbox Navigation Controls */}
              {images.length > 1 && (
                <>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-charcoal-900/80 text-ivory-100 hover:text-white rounded-full transition-colors backdrop-blur-md"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-charcoal-900/80 text-ivory-100 hover:text-white rounded-full transition-colors backdrop-blur-md"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
