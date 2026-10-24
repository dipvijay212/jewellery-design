'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/types/product';
import { formatPrice } from '@/utils/formatters';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { Heart, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: 'light' | 'dark';
}

export function ProductCard({
  product,
  className,
  variant = 'light',
}: ProductCardProps) {
  const { toggle, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const inWishlist = isInWishlist(product.id);
  const [addedRecently, setAddedRecently] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem(product, 1);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartAnim(true);
    toggle(product);
    setTimeout(() => setHeartAnim(false), 450);
  };

  const hasSecondaryImage = product.images.length > 1;
  const isDark = variant === 'dark';

  // Refined single luxury badge
  const getLuxuryBadge = () => {
    if (product.stock === 0) {
      return {
        text: 'Archived',
        style: 'bg-[#28080D]/90 text-[#FBF8F2] border-[#C9A227]/40',
      };
    }
    if (product.isBestseller) {
      return {
        text: 'Bestseller',
        style: 'bg-[#180407]/90 text-[#DFC063] border-[#C9A227]/70',
      };
    }
    if (product.isNew) {
      return {
        text: 'Atelier Release',
        style: 'bg-[#180407]/90 text-[#DFC063] border-[#C9A227]/70',
      };
    }
    if (product.stock <= 3) {
      return {
        text: 'Vault Exclusive',
        style: 'bg-[#28080D]/90 text-[#DFC063] border-[#C9A227]/60',
      };
    }
    return null;
  };

  const luxuryBadge = getLuxuryBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative flex flex-col transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-[#C9A227]/40',
        /* Sculptural Palatial Arched Vitrine Contour */
        'rounded-t-[54px] sm:rounded-t-[64px] rounded-b-[24px] sm:rounded-b-[28px]',
        'hover:-translate-y-2',
        isDark
          ? 'bg-[#140306] border border-[#C9A227]/35 hover:border-[#C9A227] hover:shadow-[0_22px_50px_rgba(201,162,39,0.18)]'
          : 'bg-[#FAF8F4] border border-[#E4D9C4] hover:border-[#C9A227] hover:shadow-[0_20px_45px_rgba(40,8,13,0.11)]',
        className
      )}
    >
      {/* Outer Architectural Arched Gold Filigree Ring */}
      <div
        className={cn(
          'absolute inset-2 sm:inset-2.5 rounded-t-[46px] sm:rounded-t-[56px] rounded-b-[18px] sm:rounded-b-[22px] pointer-events-none transition-all duration-500 z-10',
          isDark
            ? 'border border-[#C9A227]/20 group-hover:border-[#C9A227]/60 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.2)]'
            : 'border border-[#C9A227]/20 group-hover:border-[#C9A227]/55 group-hover:shadow-[0_0_18px_rgba(201,162,39,0.15)]'
        )}
      />

      {/* 1. Arched Vitrine Image Stage - perfectly squared aspect ratio for balanced jewelry presentation */}
      <div
        className={cn(
          'relative aspect-square w-full overflow-hidden',
          'rounded-t-[52px] sm:rounded-t-[62px] rounded-b-lg',
          isDark ? 'bg-[#1C050B]' : 'bg-[#F2ECE1]'
        )}
      >
        <Link
          href={`/shop/${product.slug}`}
          className="relative block w-full h-full focus:outline-none"
        >
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              'object-cover object-center transition-all duration-700 ease-out will-change-transform group-hover:scale-106',
              hasSecondaryImage && isHovered ? 'opacity-0' : 'opacity-100'
            )}
          />

          {/* Secondary Image Crossfade on Hover */}
          {hasSecondaryImage && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                'object-cover object-center transition-all duration-700 ease-out will-change-transform group-hover:scale-106 absolute inset-0',
                isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
            />
          )}

          {/* Subtle Vignette on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#28080D]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Link>

        {/* Luxury Badge: clean top-left talisman */}
        {luxuryBadge && (
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 pointer-events-none">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] uppercase tracking-[0.2em] font-serif font-semibold border backdrop-blur-md shadow-xs',
                luxuryBadge.style
              )}
            >
              <Sparkles className="w-2.5 h-2.5 text-[#DFC063]" />
              <span>{luxuryBadge.text}</span>
            </span>
          </div>
        )}

        {/* Wishlist Button: clean top-right talisman */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          className={cn(
            'absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] cursor-pointer',
            inWishlist
              ? 'bg-[#28080D] text-[#DFC063] border border-[#C9A227] shadow-[0_0_12px_rgba(201,162,39,0.4)]'
              : 'bg-[#180407]/90 text-[#DFC063] hover:bg-[#28080D] hover:border-[#DFC063] hover:shadow-[0_0_12px_rgba(201,162,39,0.35)] border border-[#C9A227]/70'
          )}
        >
          <motion.div
            animate={heartAnim ? { scale: [1, 1.35, 0.9, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Heart
              className={cn(
                'w-3.5 h-3.5 transition-colors duration-200',
                inWishlist ? 'fill-[#DFC063] text-[#DFC063]' : 'text-[#DFC063] group-hover:scale-110'
              )}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* 2. Gallery Plinth & Product Narrative */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between relative z-20">
        <div>
          {/* Category / Occasion Tag */}
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-[#C9A227] font-semibold mb-1.5">
            <span className="truncate max-w-[150px]">
              {product.occasion || product.collection || 'Haute Joaillerie'}
            </span>
            {product.stock > 0 && (
              <span
                className={cn(
                  'font-medium tracking-wider lowercase text-[9.5px]',
                  isDark ? 'text-[#85E3B3]' : 'text-[#1B4332]'
                )}
              >
                in vault
              </span>
            )}
          </div>

          {/* Product Name - allows 2 lines so full royal titles are never truncated */}
          <Link
            href={`/shop/${product.slug}`}
            className="focus:outline-none focus-visible:underline block"
          >
            <h3
              className={cn(
                'font-serif text-[15px] sm:text-base font-normal leading-snug transition-colors line-clamp-2 min-h-[2.6em]',
                isDark
                  ? 'text-[#FBF8F2] group-hover:text-[#DFC063]'
                  : 'text-[#28080D] group-hover:text-[#93741E]'
              )}
            >
              {product.name}
            </h3>
          </Link>

          {/* Craftsmanship Note */}
          <p
            className={cn(
              'text-[11px] font-light line-clamp-1 mt-1 leading-relaxed',
              isDark ? 'text-[#E8DDC6]/65' : 'text-[#302024]/65'
            )}
          >
            {product.subtitle || product.material}
          </p>
        </div>

        {/* Price & Luxury Action Row */}
        <div
          className={cn(
            'mt-3.5 pt-3 flex items-center justify-between gap-2',
            isDark ? 'border-t border-[#C9A227]/25' : 'border-t border-[#E8DDC6]/70'
          )}
        >
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                'font-serif text-[17px] font-medium tracking-tight',
                isDark ? 'text-[#FBF8F2]' : 'text-[#28080D]'
              )}
            >
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span
                className={cn(
                  'text-[11px] line-through font-light',
                  isDark ? 'text-[#E8DDC6]/45' : 'text-[#302024]/45'
                )}
              >
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Luxury Jewel Clasp Action Pill */}
          <motion.button
            type="button"
            disabled={product.stock === 0}
            whileTap={product.stock > 0 ? { scale: 0.95 } : undefined}
            onClick={handleAddToCart}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9.5px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] shadow-2xs shrink-0',
              addedRecently
                ? 'bg-[#1B4332] text-[#FBF8F2] border border-[#1B4332]'
                : isDark
                  ? 'bg-[#28080D] hover:bg-[#C9A227] text-[#DFC063] hover:text-[#180407] border border-[#C9A227]/50 hover:border-[#C9A227]'
                  : 'bg-[#180407] hover:bg-[#C9A227] text-[#DFC063] hover:text-[#180407] border border-[#28080D] hover:border-[#C9A227]'
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {addedRecently ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-[#DFC063]" />
                  <span>Added</span>
                </motion.span>
              ) : product.stock === 0 ? (
                <span key="soldout">Archived</span>
              ) : (
                <motion.span
                  key="acquire"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3 text-[#DFC063] group-hover:text-inherit" />
                  <span>Acquire</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
