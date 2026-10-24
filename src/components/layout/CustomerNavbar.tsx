'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  Gem,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface MegaMenuItem {
  name: string;
  href: string;
  description: string;
  badge?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

interface MegaMenuConfig {
  sections: MegaMenuSection[];
  featured: {
    tag: string;
    title: string;
    description: string;
    image: string;
    href: string;
    cta: string;
  };
}

const JEWELLERY_MENU: MegaMenuConfig = {
  sections: [
    {
      title: 'Fine Jewellery',
      items: [
        {
          name: 'Necklaces',
          href: '/shop?category=necklace-sets',
          description: 'Rani haars, diamond colliers & chokers',
        },
        {
          name: 'Earrings',
          href: '/shop?category=earrings-jhumkas',
          description: 'Temple jhumkas, chandbalis & studs',
        },
        {
          name: 'Rings',
          href: '/shop?category=rings',
          description: 'Solitaire rings & micro-pavé eternity bands',
        },
        {
          name: 'Bangles & Bracelets',
          href: '/shop?category=bangles-bracelets',
          description: 'Sculpted filigree kangans & openable kadas',
        },
      ],
    },
    {
      title: 'Occasions & Editions',
      items: [
        {
          name: 'Traditional Jewellery',
          href: '/shop?occasion=Puja%20%26%20Traditional',
          description: 'Sacred temple coin carvings & nakshi gold',
        },
        {
          name: 'Festive & Party Wear',
          href: '/shop?occasion=Festive%20%26%20Celebrations',
          description: 'Modern evening glamour & cocktail suites',
        },
        {
          name: 'Bridal Jewellery',
          href: '/shop?category=bridal-sets',
          description: 'Imperial sovereign trousseau suites',
        },
        {
          name: 'New Arrivals',
          href: '/shop?sort=newest',
          description: 'Freshly unveiled creations from our ateliers',
          badge: 'Latest',
        },
      ],
    },
  ],
  featured: {
    tag: 'Signature Creation',
    title: 'Gulmohar Emerald Collier Set',
    description:
      'Individually set 18K solid gold, Zambian emeralds, and certified brilliant-cut diamonds.',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    href: '/shop/gulmohar-emerald-crystal-collier-set',
    cta: 'Explore Collection',
  },
};

const BRIDAL_MENU: MegaMenuConfig = {
  sections: [
    {
      title: 'The Trousseau Suite',
      items: [
        {
          name: 'Bridal Sets',
          href: '/shop?category=bridal-sets',
          description: 'Complete suites with coordinated neckpieces & earrings',
        },
        {
          name: 'Kundan',
          href: '/shop?search=Kundan',
          description: 'Handcrafted glass cabochons in 22K gold foil setting',
        },
        {
          name: 'Polki-Inspired Jewellery',
          href: '/shop?search=Polki',
          description: 'Uncut gemstone majesty with reverse meenakari',
        },
      ],
    },
    {
      title: 'Ceremonial Adornments',
      items: [
        {
          name: 'Bridal Chokers',
          href: '/shop?search=Choker',
          description: 'Regal contoured gulbandhs & seed pearl collars',
        },
        {
          name: 'Wedding Accessories',
          href: '/shop?category=maang-tikka-accessories',
          description: 'Articulated maang tikkas, passas & haathphools',
        },
        {
          name: 'Private Salon Appointments',
          href: '/contact',
          description: 'Bespoke bridal viewings in London, NY & Mumbai',
          badge: 'Atelier',
        },
      ],
    },
  ],
  featured: {
    tag: 'Imperial Bridal',
    title: 'Maharani Heritage Polki Set',
    description:
      'Masterpiece bridal choker suite with uncut polki diamonds, ruby drops, and fine pearl strands.',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    href: '/bridal',
    cta: 'Explore Bridal Collection',
  },
};

const POPULAR_SEARCHES = [
  'Polki Choker',
  'Solitaire Ring',
  'Bridal Trousseau',
  'Chandbali',
  'Emerald Collier',
  'Jadau Kada',
];

export function CustomerNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { count: cartCount, setOpen: openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  // Navigation interactive state
  const [activeMegaMenu, setActiveMegaMenu] = useState<'jewellery' | 'bridal' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedAccordion, setMobileExpandedAccordion] = useState<'jewellery' | 'bridal' | null>(null);

  // Search & scroll elevation state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Hover grace timeout to eliminate flickering
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track window scroll for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route changes during render (React 19 recommended pattern)
  const currentRouteKey = `${pathname}?${searchParams?.toString() || ''}`;
  const [prevRouteKey, setPrevRouteKey] = useState(currentRouteKey);
  if (prevRouteKey !== currentRouteKey) {
    setPrevRouteKey(currentRouteKey);
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }

  // Click outside to close active menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerContainerRef.current &&
        !headerContainerRef.current.contains(event.target as Node)
      ) {
        setActiveMegaMenu(null);
        setSearchOpen(false);
      }
    };

    if (activeMegaMenu || searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMegaMenu, searchOpen]);

  // Keyboard navigation: Escape key closes menus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMegaMenu(null);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Anti-flicker hover handlers
  const handleDropdownOpen = useCallback((menu: 'jewellery' | 'bridal') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveMegaMenu(menu);
  }, []);

  const handleDropdownCloseScheduled = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 180);
  }, []);

  const handleDropdownCancelClose = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleSearchSubmit = (term: string) => {
    if (term.trim()) {
      router.push(`/shop?search=${encodeURIComponent(term.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Determine active nav indicators
  const isSortNewest = searchParams.get('sort') === 'newest';
  const isNewArrivalsActive = pathname === '/shop' && isSortNewest;
  const isJewelleryActive =
    activeMegaMenu === 'jewellery' ||
    (pathname === '/shop' && !isSortNewest && !pathname.startsWith('/bridal'));
  const isBridalActive = activeMegaMenu === 'bridal' || pathname.startsWith('/bridal');
  const isCollectionsActive = pathname.startsWith('/collections');
  const isOurStoryActive = pathname.startsWith('/about');

  return (
    <header
      ref={headerContainerRef}
      className="sticky top-0 z-40 w-full font-sans transition-all duration-300 select-none"
    >
      {/* =========================================================================
          1. ANNOUNCEMENT BAR
          Slim deep burgundy background (#28080D), elegant gold accents (#C9A227)
          ========================================================================= */}
      <div className="bg-[#1C0508] text-[#FBF8F2] text-[11px] py-2 px-4 sm:px-8 border-b border-[#C9A227]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Concierge contact (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-2 text-[#E8DDC6]/90 font-light tracking-[0.12em]">
            <PhoneCall className="w-3 h-3 text-[#C9A227]" />
            <a
              href="tel:+18008482873"
              className="hover:text-[#DFC063] transition-colors"
            >
              Concierge: +1 (800) 848-AURELIA
            </a>
          </div>

          {/* Center: Promotional message with subtle gold accent */}
          <div className="flex-1 md:flex-initial mx-auto text-center">
            <span className="tracking-[0.16em] uppercase text-[#FBF8F2] font-light text-[10px] sm:text-[11px] inline-flex items-center justify-center gap-1.5 sm:gap-2">
              <span>Exclusive Privileges — Enjoy 10% Off Your First Order</span>
              <span className="hidden sm:inline-block text-[#DFC063] bg-[#28080D] font-semibold tracking-widest text-[9.5px] border border-[#C9A227]/50 px-1.5 py-0.5 rounded-xs shadow-2xs">
                AURELIA10
              </span>
            </span>
          </div>

          {/* Right: Boutique services note (desktop only, NO admin link) */}
          <div className="hidden md:flex items-center space-x-4 text-[11px] tracking-[0.14em] uppercase text-[#C9A227] font-medium">
            <Link
              href="/contact"
              className="hover:text-[#DFC063] transition-colors"
            >
              Private Salon Viewings
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN NAVIGATION BAR
          Seamlessly integrated luxury velvet burgundy & champagne gold palette
          ========================================================================= */}
      <div
        className={cn(
          'transition-all duration-300 relative border-b',
          scrolled
            ? 'bg-[#120204]/98 shadow-[0_8px_30px_rgba(15,2,4,0.7)] border-[#C9A227]/35 backdrop-blur-lg'
            : 'bg-[#180407]/95 sm:bg-[#180407]/92 border-[#C9A227]/25 backdrop-blur-md'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Section: AURELIA Brand Wordmark */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex flex-col items-start group focus:outline-none"
                aria-label="Aurelia Haute Joaillerie Home"
              >
                <div className="flex items-center space-x-2.5">
                  <Gem
                    className="w-5 h-5 text-[#C9A227] transition-transform duration-500 group-hover:rotate-45"
                    strokeWidth={1.75}
                  />
                  <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] uppercase font-normal text-[#FBF8F2] group-hover:text-gold-bright transition-colors leading-none">
                    Aurelia
                  </span>
                </div>
                <span className="text-[8.5px] tracking-[0.42em] uppercase text-[#C9A227] font-semibold mt-1">
                  Haute Joaillerie
                </span>
              </Link>
            </div>

            {/* Center Section: Refined Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center space-x-8 xl:space-x-10 h-full"
              role="navigation"
              aria-label="Main Navigation"
            >
              {/* 1. New Arrivals */}
              <Link
                href="/shop?sort=newest"
                onMouseEnter={() => setActiveMegaMenu(null)}
                className={cn(
                  'relative py-2 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-200',
                  isNewArrivalsActive
                    ? 'text-[#FBF8F2] font-semibold'
                    : 'text-[#FBF8F2]/80 hover:text-[#C9A227]'
                )}
              >
                <span>New Arrivals</span>
                {isNewArrivalsActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C9A227] via-[#DFC063] to-[#C9A227]"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>

              {/* 2. Jewellery Mega Menu Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleDropdownOpen('jewellery')}
                onMouseLeave={handleDropdownCloseScheduled}
              >
                <button
                  type="button"
                  id="nav-jewellery-btn"
                  aria-haspopup="true"
                  aria-expanded={activeMegaMenu === 'jewellery'}
                  aria-controls="jewellery-mega-menu"
                  onClick={() =>
                    setActiveMegaMenu((prev) => (prev === 'jewellery' ? null : 'jewellery'))
                  }
                  className={cn(
                    'relative py-2 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 flex items-center gap-1.5 focus:outline-none',
                    isJewelleryActive
                      ? 'text-[#FBF8F2] font-semibold'
                      : 'text-[#FBF8F2]/80 hover:text-[#C9A227]'
                  )}
                >
                  <span>Jewellery</span>
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 text-[#C9A227] transition-transform duration-200',
                      activeMegaMenu === 'jewellery' ? 'rotate-180' : ''
                    )}
                  />
                  {isJewelleryActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C9A227] via-[#DFC063] to-[#C9A227]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              </div>

              {/* 3. Bridal Mega Menu Trigger */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleDropdownOpen('bridal')}
                onMouseLeave={handleDropdownCloseScheduled}
              >
                <button
                  type="button"
                  id="nav-bridal-btn"
                  aria-haspopup="true"
                  aria-expanded={activeMegaMenu === 'bridal'}
                  aria-controls="bridal-mega-menu"
                  onClick={() =>
                    setActiveMegaMenu((prev) => (prev === 'bridal' ? null : 'bridal'))
                  }
                  className={cn(
                    'relative py-2 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 flex items-center gap-1.5 focus:outline-none',
                    isBridalActive
                      ? 'text-[#FBF8F2] font-semibold'
                      : 'text-[#FBF8F2]/80 hover:text-[#C9A227]'
                  )}
                >
                  <span>Bridal</span>
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 text-[#C9A227] transition-transform duration-200',
                      activeMegaMenu === 'bridal' ? 'rotate-180' : ''
                    )}
                  />
                  {isBridalActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C9A227] via-[#DFC063] to-[#C9A227]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              </div>

              {/* 4. Collections */}
              <Link
                href="/collections"
                onMouseEnter={() => setActiveMegaMenu(null)}
                className={cn(
                  'relative py-2 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-200',
                  isCollectionsActive
                    ? 'text-[#FBF8F2] font-semibold'
                    : 'text-[#FBF8F2]/80 hover:text-[#C9A227]'
                )}
              >
                <span>Collections</span>
                {isCollectionsActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C9A227] via-[#DFC063] to-[#C9A227]"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>

              {/* 5. Our Story */}
              <Link
                href="/about"
                onMouseEnter={() => setActiveMegaMenu(null)}
                className={cn(
                  'relative py-2 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-200',
                  isOurStoryActive
                    ? 'text-[#FBF8F2] font-semibold'
                    : 'text-[#FBF8F2]/80 hover:text-[#C9A227]'
                )}
              >
                <span>Our Story</span>
                {isOurStoryActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C9A227] via-[#DFC063] to-[#C9A227]"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </nav>

            {/* Right Section: Utility Controls (Search, Wishlist, Bag, Mobile Toggle) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-2 text-[#FBF8F2]/85 hover:text-[#C9A227] hover:bg-white/5 transition-colors focus:outline-none rounded-full"
                aria-label="Search creations"
                aria-expanded={searchOpen}
              >
                <Search className="w-5 h-5" strokeWidth={1.75} />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="p-2 text-[#FBF8F2]/85 hover:text-[#C9A227] hover:bg-white/5 transition-colors relative focus:outline-none rounded-full"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className="w-5 h-5" strokeWidth={1.75} />
                {wishlistCount > 0 && (
                  <motion.span
                    key={`wishlist-${wishlistCount}`}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-[#28080D] text-[#C9A227] text-[9.5px] font-bold rounded-full flex items-center justify-center border border-[#C9A227]/60 shadow-xs"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={() => openCart(true)}
                className="p-2 text-[#FBF8F2]/85 hover:text-[#C9A227] hover:bg-white/5 transition-colors relative focus:outline-none rounded-full"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
                {cartCount > 0 && (
                  <motion.span
                    key={`cart-${cartCount}`}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-[#DFBF63] to-[#C9A227] text-[#28080D] text-[9.5px] font-bold rounded-full flex items-center justify-center border border-[#140306] shadow-xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 text-[#FBF8F2] hover:text-[#C9A227] lg:hidden focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={1.75} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. MEGA MENUS (Desktop: Jewellery & Bridal)
            Ivory background, champagne border, balanced multi-column layout with
            featured editorial collection card.
            ========================================================================= */}
        <AnimatePresence>
          {activeMegaMenu && (
            <div
              id={`${activeMegaMenu}-mega-menu`}
              role="region"
              aria-label={`${activeMegaMenu === 'jewellery' ? 'Jewellery' : 'Bridal'} Department Menu`}
              onMouseEnter={handleDropdownCancelClose}
              onMouseLeave={handleDropdownCloseScheduled}
              className="hidden lg:block absolute top-full left-0 right-0 w-full z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#180407]/98 border-b border-[#C9A227]/30 shadow-[0_25px_60px_rgba(15,2,4,0.7)] backdrop-blur-xl text-[#FBF8F2] overflow-hidden"
              >
                {/* Hairline subtle gold shimmer line at the top */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                  {(() => {
                    const currentMenu =
                      activeMegaMenu === 'jewellery' ? JEWELLERY_MENU : BRIDAL_MENU;

                    return (
                      <div className="grid grid-cols-12 gap-10 items-start">
                        {/* Left Columns: Categories & Subcategories */}
                        <div className="col-span-8 grid grid-cols-2 gap-8">
                          {currentMenu.sections.map((section) => (
                            <div key={section.title} className="space-y-4">
                              <div className="border-b border-[#C9A227]/25 pb-2">
                                <span className="text-[10.5px] uppercase tracking-[0.24em] font-semibold text-[#C9A227]">
                                  {section.title}
                                </span>
                              </div>

                              <ul className="space-y-3" role="list">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setActiveMegaMenu(null)}
                                      className="group block p-1.5 -mx-1.5 rounded-xs transition-colors hover:bg-white/5"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-[13px] uppercase tracking-[0.14em] font-medium text-[#FBF8F2] group-hover:text-[#DFC063] transition-colors">
                                          {item.name}
                                        </span>
                                        {item.badge && (
                                          <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#C9A227]/20 text-[#DFC063] border border-[#C9A227]/40">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-[#E8DDC6]/70 font-light leading-snug mt-0.5 line-clamp-1 group-hover:text-[#FBF8F2]/90">
                                        {item.description}
                                      </p>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Right Column: Editorial Featured Collection Showcase */}
                        <div className="col-span-4 pl-4 border-l border-[#C9A227]/25">
                          <Link
                            href={currentMenu.featured.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="group block p-4 rounded-xs bg-[#22070C]/90 border border-[#C9A227]/40 hover:border-[#C9A227] hover:shadow-lg transition-all duration-300"
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs border border-[#C9A227]/30 mb-3.5 bg-[#140306]">
                              <Image
                                src={currentMenu.featured.image}
                                alt={currentMenu.featured.title}
                                fill
                                sizes="(max-width: 1200px) 33vw, 380px"
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                            </div>

                            <div>
                              <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#C9A227] block mb-1">
                                {currentMenu.featured.tag}
                              </span>
                              <h4 className="font-serif text-lg font-light text-[#FBF8F2] group-hover:text-[#DFC063] transition-colors leading-tight">
                                {currentMenu.featured.title}
                              </h4>
                              <p className="text-[11px] text-[#E8DDC6]/75 font-light leading-relaxed mt-1 line-clamp-2">
                                {currentMenu.featured.description}
                              </p>
                              <div className="mt-3.5 pt-2.5 border-t border-[#C9A227]/30 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] font-semibold text-[#C9A227] group-hover:text-[#DFC063] transition-colors">
                                <span>{currentMenu.featured.cta}</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            4. SEARCH DRAWER
            Smooth luxury search dropdown with popular suggestion chips
            ========================================================================= */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-[#C9A227]/30 bg-[#180407]/98 backdrop-blur-md shadow-xl relative z-30"
            >
              <div className="py-5 px-4 sm:px-8 max-w-3xl mx-auto space-y-3">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-[#C9A227]" />
                  <input
                    type="text"
                    placeholder="Search solitaire diamonds, polki, emeralds, 18k gold..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(searchQuery);
                      }
                    }}
                    className="flex-1 text-sm bg-transparent border-none outline-none text-[#FBF8F2] placeholder:text-[#E8DDC6]/45 font-light"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit(searchQuery)}
                    className="text-xs uppercase tracking-wider font-semibold text-[#C9A227] hover:text-[#DFC063] px-3 py-1 transition-colors"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1 text-[#FBF8F2]/60 hover:text-[#FBF8F2]"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Popular searches suggestions */}
                <div className="flex items-center gap-2 pt-1 text-[11px] text-[#E8DDC6]/70 overflow-x-auto">
                  <span className="font-semibold text-[#FBF8F2] shrink-0">Popular:</span>
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSearchSubmit(term)}
                      className="px-2.5 py-1 rounded-full bg-[#28080D] border border-[#C9A227]/30 hover:border-[#C9A227] text-[#E8DDC6] transition-colors shrink-0"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            5. MOBILE NAVIGATION DRAWER
            Slide-down panel with expandable accordions for Jewellery and Bridal
            ========================================================================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-[#C9A227]/30 bg-[#180407]/98 backdrop-blur-xl px-5 py-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto text-[#FBF8F2]"
            >
              {/* Quick Mobile Search */}
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search masterpieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(searchQuery);
                    }
                  }}
                  className="w-full text-xs bg-[#28080D]/80 border border-[#C9A227]/35 rounded-xs px-3.5 py-2.5 pl-9 text-[#FBF8F2] placeholder:text-[#E8DDC6]/45 outline-none focus:border-[#C9A227]"
                />
                <Search className="w-4 h-4 text-[#C9A227] absolute left-3 top-3" />
              </div>

              <div className="flex flex-col space-y-1 divide-y divide-[#C9A227]/20">
                {/* 1. New Arrivals Link */}
                <div className="pt-2 pb-2">
                  <Link
                    href="/shop?sort=newest"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-[#FBF8F2] hover:text-[#C9A227] py-1.5"
                  >
                    <span>New Arrivals</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                  </Link>
                </div>

                {/* 2. Jewellery Accordion */}
                <div className="pt-2 pb-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedAccordion((prev) =>
                        prev === 'jewellery' ? null : 'jewellery'
                      )
                    }
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-[#FBF8F2] hover:text-[#C9A227] py-1.5 text-left focus:outline-none"
                    aria-expanded={mobileExpandedAccordion === 'jewellery'}
                  >
                    <span>Jewellery</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 text-[#C9A227] transition-transform duration-200',
                        mobileExpandedAccordion === 'jewellery' ? 'rotate-180' : ''
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpandedAccordion === 'jewellery' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 pt-2 space-y-2 border-l border-[#C9A227]/40 ml-1.5 mt-1"
                      >
                        {JEWELLERY_MENU.sections.flatMap((s) => s.items).map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs uppercase tracking-[0.14em] text-[#E8DDC6]/80 hover:text-[#C9A227] py-1"
                          >
                            <span>{item.name}</span>
                          </Link>
                        ))}
                        <Link
                          href="/shop"
                          onClick={() => setMobileMenuOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#DFC063] pt-1"
                        >
                          <span>Explore All Jewellery</span>
                          <ArrowRight className="w-3 h-3 text-[#C9A227]" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Bridal Accordion */}
                <div className="pt-2 pb-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedAccordion((prev) =>
                        prev === 'bridal' ? null : 'bridal'
                      )
                    }
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-[#FBF8F2] hover:text-[#C9A227] py-1.5 text-left focus:outline-none"
                    aria-expanded={mobileExpandedAccordion === 'bridal'}
                  >
                    <span>Bridal</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 text-[#C9A227] transition-transform duration-200',
                        mobileExpandedAccordion === 'bridal' ? 'rotate-180' : ''
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpandedAccordion === 'bridal' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 pt-2 space-y-2 border-l border-[#C9A227]/40 ml-1.5 mt-1"
                      >
                        {BRIDAL_MENU.sections.flatMap((s) => s.items).map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs uppercase tracking-[0.14em] text-[#E8DDC6]/80 hover:text-[#C9A227] py-1"
                          >
                            <span>{item.name}</span>
                          </Link>
                        ))}
                        <Link
                          href="/bridal"
                          onClick={() => setMobileMenuOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#DFC063] pt-1"
                        >
                          <span>Explore Bridal Salon</span>
                          <ArrowRight className="w-3 h-3 text-[#C9A227]" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Collections Link */}
                <div className="pt-2 pb-2">
                  <Link
                    href="/collections"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-[#FBF8F2] hover:text-[#C9A227] py-1.5"
                  >
                    <span>Collections</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                  </Link>
                </div>

                {/* 5. Our Story Link */}
                <div className="pt-2 pb-2">
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-[#FBF8F2] hover:text-[#C9A227] py-1.5"
                  >
                    <span>Our Story</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                  </Link>
                </div>
              </div>

              {/* Mobile Drawer Concierge (NO admin link) */}
              <div className="pt-4 mt-4 border-t border-[#C9A227]/25 space-y-2 text-xs">
                <a
                  href="tel:+18008482873"
                  className="flex items-center gap-2 text-[#FBF8F2] font-medium tracking-wider"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Concierge: +1 (800) 848-AURELIA</span>
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[11px] uppercase tracking-wider text-[#C9A227] hover:text-[#DFC063] font-semibold"
                >
                  Book Private Salon Appointment →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
