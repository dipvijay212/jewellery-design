'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Gem,
  ShieldCheck,
  Award,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { LUXURY_EASE } from '@/utils/animations';

/**
 * Aurelia Haute Joaillerie Campaign Configuration
 */
export const HERO_CAMPAIGN = {
  mainImage: '/images/hero-bridal-campaign.jpg',
  specimenImage: '/images/hero-specimen-detail.jpg',
  alt: 'Aurelia Haute Joaillerie — Royal Indian Bridal Campaign featuring Handcrafted Polki Choker, Emerald Drops, and Heritage Adornments',
  eyebrow: 'THE ART OF ADORNMENT',
  headline: 'Jewellery That Commands a Moment.',
  description:
    'Discover statement pieces, bridal creations, and timeless designs for every celebration.',
  primaryCta: {
    label: 'EXPLORE THE COLLECTION',
    href: '/shop',
  },
  secondaryCta: {
    label: 'DISCOVER BRIDAL',
    href: '/bridal',
  },
  hotspot: {
    title: 'The Nizam Polki Suite',
    carat: '22K Antique Micron Gold',
    stones: 'Uncut Syndicate Polki & Untreated Zambian Emeralds',
    link: '/shop',
  },
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  twinkleSpeed: number;
  maxOpacity: number;
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // Mouse Parallax & Dynamic Light State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHotspotOpen, setIsHotspotOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax Pointer Tracking
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x / rect.width - 0.5) * 2; // -1 to 1
      const normY = (y / rect.height - 0.5) * 2; // -1 to 1

      setMousePos({ x, y, normX, normY });
    },
    [shouldReduceMotion]
  );

  // Floating Golden Starlight Canvas Particles
  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 35 ethereal gold starlight particles
    const particles: Particle[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      maxOpacity: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle gently upward
        p.y -= p.speedY;
        p.x += p.speedX;

        // Twinkle opacity cycle
        p.opacity += p.twinkleSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.15) {
          p.twinkleSpeed = -p.twinkleSpeed;
        }

        // Loop around edges
        if (p.y < 0) p.y = height + 10;
        if (p.x < 0) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glowing starlight mote
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 2.2
        );
        gradient.addColorStop(0, `rgba(252, 249, 238, ${p.opacity})`);
        gradient.addColorStop(0.4, `rgba(212, 175, 55, ${p.opacity * 0.7})`);
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0, normX: 0, normY: 0 });
      }}
      aria-label="Aurelia Luxury Haute Joaillerie Campaign"
      className="relative w-full bg-[#140306] text-[#FBF8F2] overflow-hidden select-none border-b border-[#C9A227]/30 min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] xl:min-h-[820px] flex items-center"
    >
      {/* =========================================================================
          1. IMMERSIVE CAMPAIGN PHOTOGRAPH WITH 2.5D POINTER PARALLAX
          High-definition Indian bridal visual with uncut Syndicate Polki & emeralds.
          ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: mousePos.normX * -14,
                  y: mousePos.normY * -10,
                  scale: isHovered ? 1.025 : 1.01,
                }
          }
          transition={{
            type: 'spring',
            stiffness: 75,
            damping: 24,
            mass: 0.8,
          }}
          className="relative w-full h-full"
        >
          <Image
            src={HERO_CAMPAIGN.mainImage}
            alt={HERO_CAMPAIGN.alt}
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-[62%_20%] sm:object-[68%_25%] lg:object-[72%_25%] xl:object-[75%_25%]"
          />
        </motion.div>

        {/* =========================================================================
            2. DIRECTIONAL LUXURY GRADIENTS & SHADOWS
            Keeps the left copy razor-sharp and leaves the bride & jewellery radiant.
            ========================================================================= */}
        {/* Left-to-Right Horizontal Scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#140306] via-[#140306]/85 via-45% sm:via-[#140306]/75 lg:via-[#140306]/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Bottom Grounding Vignette */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#140306] via-[#140306]/65 via-30% to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Vignette (Seamless Navbar Blending) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#140306]/60 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle Radial Glow Follows Mouse */}
        {!shouldReduceMotion && isHovered && (
          <div
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,transparent_65%)] pointer-events-none transition-transform duration-75 blur-xl"
            aria-hidden="true"
          />
        )}
      </div>

      {/* =========================================================================
          3. FLOATING GOLDEN DUST & STARLIGHT CANVAS
          ========================================================================= */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* =========================================================================
          4. INTERACTIVE PULSING HOTSPOT ON THE STATEMENT POLKI NECKLACE
          (Desktop only, placed over the bridal necklace region)
          ========================================================================= */}
      <div className="absolute right-[22%] sm:right-[26%] lg:right-[28%] xl:right-[30%] top-[48%] sm:top-[50%] z-30 hidden sm:block">
        <div className="relative">
          {/* Sonar Pulsing Ring */}
          <span className="absolute -inset-2 rounded-full bg-[#C9A227]/40 animate-ping" />
          <button
            type="button"
            onClick={() => setIsHotspotOpen((prev) => !prev)}
            onMouseEnter={() => setIsHotspotOpen(true)}
            aria-label="Inspect Nizam Polki Suite Details"
            className="relative w-7 h-7 rounded-full bg-[#28080D]/90 border border-[#C9A227] flex items-center justify-center text-[#C9A227] shadow-[0_0_16px_rgba(201,162,39,0.5)] hover:scale-110 transition-transform focus:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
          </button>

          {/* Hotspot Floating Detail Popover */}
          <AnimatePresence>
            {isHotspotOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25, ease: LUXURY_EASE }}
                className="absolute left-9 -top-6 w-64 p-3.5 rounded-xs bg-[#1A0508]/95 backdrop-blur-md border border-[#C9A227]/60 shadow-[0_12px_35px_rgba(20,3,6,0.5)] text-left"
              >
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.24em] font-semibold text-[#C9A227] mb-1">
                  <Gem className="w-3 h-3 text-[#C9A227]" />
                  <span>{HERO_CAMPAIGN.hotspot.title}</span>
                </div>
                <div className="text-[11px] font-serif text-[#FBF8F2] font-normal leading-snug mb-1">
                  {HERO_CAMPAIGN.hotspot.stones}
                </div>
                <div className="text-[9.5px] text-[#E8DDC6]/70 font-light mb-2">
                  {HERO_CAMPAIGN.hotspot.carat}
                </div>
                <Link
                  href={HERO_CAMPAIGN.hotspot.link}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#C9A227] hover:text-[#DFC063] font-semibold"
                >
                  <span>Explore Creation</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =========================================================================
          5. MAIN EDITORIAL CONTENT COLUMN (Asymmetric Left Quadrant)
          ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Eyebrow with Restrained Gold Detailing */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.1,
              ease: LUXURY_EASE,
            }}
            className="inline-flex items-center gap-3 mb-4 sm:mb-5"
          >
            <span
              className="w-8 h-[1.5px] bg-gradient-to-r from-[#C9A227] to-transparent"
              aria-hidden="true"
            />
            <span className="text-[#C9A227] text-[10.5px] sm:text-xs uppercase tracking-[0.32em] font-semibold">
              {HERO_CAMPAIGN.eyebrow}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" aria-hidden="true" />
          </motion.div>

          {/* Monumental Editorial Headline */}
          <div className="overflow-hidden mb-5 sm:mb-6">
            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.7,
                delay: shouldReduceMotion ? 0 : 0.2,
                ease: LUXURY_EASE,
              }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] text-[#FBF8F2] font-light tracking-tight leading-[1.08] sm:leading-[1.04]"
            >
              Jewellery That{' '}
              <span className="italic font-normal text-gold-bright relative inline-block">
                Commands a Moment.
                {/* Gold Underline Glow */}
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.8,
                    delay: shouldReduceMotion ? 0 : 0.6,
                    ease: LUXURY_EASE,
                  }}
                  className="absolute bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#C9A227] via-[#DFC063] to-transparent"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>
          </div>

          {/* Narrative Editorial Description */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.35,
              ease: LUXURY_EASE,
            }}
            className="text-sm sm:text-base lg:text-lg text-[#FBF8F2]/90 font-light leading-relaxed max-w-lg mb-8 sm:mb-10 drop-shadow-sm tracking-wide"
          >
            {HERO_CAMPAIGN.description}
          </motion.p>

          {/* Dual Shopping CTAs with Shimmer Gleam */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.55,
              delay: shouldReduceMotion ? 0 : 0.45,
              ease: LUXURY_EASE,
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-9 sm:mb-11"
          >
            {/* Primary CTA: Solid Champagne Gold with Animated Sheen */}
            <Link
              href={HERO_CAMPAIGN.primaryCta.href}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xs bg-gradient-to-r from-[#DFBF63] via-[#D4AF37] to-[#B89327] hover:brightness-110 text-[#28080D] font-semibold text-xs uppercase tracking-[0.22em] shadow-xl hover:shadow-[0_8px_30px_rgba(201,162,39,0.4)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBF8F2] overflow-hidden"
            >
              {/* Sweeping Light Sheen */}
              <span
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">{HERO_CAMPAIGN.primaryCta.label}</span>
              <ArrowRight className="relative z-10 w-4 h-4 text-[#28080D] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA: Translucent Burgundy Glass */}
            <Link
              href={HERO_CAMPAIGN.secondaryCta.href}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-xs bg-[#28080D]/70 hover:bg-[#28080D]/95 text-[#FBF8F2] hover:text-[#C9A227] border border-[#C9A227]/40 hover:border-[#C9A227] font-medium text-xs uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              <span>{HERO_CAMPAIGN.secondaryCta.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9A227] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Heritage Trust & Artisan Seals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.55,
            }}
            className="pt-4 border-t border-[#E8DDC6]/20 flex flex-wrap items-center gap-y-2 gap-x-5 text-[10.5px] uppercase tracking-[0.18em] text-[#E8DDC6]/75 font-light"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Hallmarked 22K & 18K Karats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Certified Natural Origin</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Hereditary Karigar Guild</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          6. FLOATING MACRO SPECIMEN CARD (Bottom-Right Architectural Accent)
          Provides authentic 3D layering with subtle vertical floating animation.
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: shouldReduceMotion ? 0 : [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 0.7, delay: 0.5 },
          x: { duration: 0.7, delay: 0.5 },
          y: {
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="absolute right-6 lg:right-12 bottom-6 sm:bottom-10 z-20 hidden lg:block max-w-[260px] p-2.5 rounded-xs bg-[#1A0508]/85 backdrop-blur-md border border-[#C9A227]/40 shadow-[0_16px_40px_rgba(20,3,6,0.6)] group"
      >
        <Link href="/shop" className="block focus:outline-none">
          <div className="relative w-full aspect-[4/3] rounded-2xs overflow-hidden mb-2 bg-[#28080D]">
            <Image
              src={HERO_CAMPAIGN.specimenImage}
              alt="Aurelia Solitaire & Emerald Craftsmanship Detail"
              fill
              sizes="260px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-3xs bg-[#140306]/85 backdrop-blur-xs text-[8px] uppercase tracking-widest text-[#C9A227] font-semibold border border-[#C9A227]/30">
              ATELIER MACRO
            </div>
          </div>
          <div className="flex items-center justify-between text-[#FBF8F2] px-0.5">
            <div>
              <span className="text-[8.5px] uppercase tracking-[0.2em] font-semibold text-[#C9A227] block">
                Masterpiece Suite
              </span>
              <span className="font-serif text-xs font-light block text-[#FBF8F2]">
                Solitaire & Emerald Setting
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-[#C9A227] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <Eye className="w-3 h-3" />
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
