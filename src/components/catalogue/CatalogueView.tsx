'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/common/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { LUXURY_EASE } from '@/utils/animations';

interface CatalogueViewProps {
  initialProducts: Product[];
  initialCategory?: string;
  initialSearch?: string;
  initialOccasion?: string;
  initialCollection?: string;
  initialSort?: string;
}

export function CatalogueView({
  initialProducts,
  initialCategory = 'all',
  initialSearch = '',
  initialOccasion = 'all',
  initialSort = 'featured',
}: CatalogueViewProps) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>(initialSort || 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync state whenever props change
  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSearchQuery(initialSearch);
    setSelectedOccasion(initialOccasion);
    if (initialSort) setSortBy(initialSort);
  }, [initialCategory, initialSearch, initialOccasion, initialSort]);

  const categories = [
    { label: 'All Creations', value: 'all' },
    { label: 'Bridal Sets', value: 'bridal-sets' },
    { label: 'Kundan & Polki', value: 'kundan-polki' },
    { label: 'Necklace Sets', value: 'necklace-sets' },
    { label: 'Earrings & Jhumkas', value: 'earrings-jhumkas' },
    { label: 'Bangles & Bracelets', value: 'bangles-bracelets' },
    { label: 'Maang Tikka & Accessories', value: 'maang-tikka-accessories' },
    { label: 'Festive & Everyday', value: 'festive-everyday' },
  ];

  const occasions = [
    { label: 'All Occasions', value: 'all' },
    { label: 'Bridal & Wedding', value: 'Bridal & Wedding' },
    { label: 'Festive & Celebrations', value: 'Festive & Celebrations' },
    { label: 'Cocktail & Reception', value: 'Cocktail & Reception' },
    { label: 'Everyday Luxury', value: 'Everyday Luxury' },
    { label: 'Puja & Traditional', value: 'Puja & Traditional' },
  ];

  const materials = [
    { label: 'All Materials', value: 'all' },
    { label: 'Kundan & Polki', value: 'kundan' },
    { label: '22K Gold Plated', value: '22k' },
    { label: '925 Sterling Silver', value: 'silver' },
    { label: 'Solid 18K Gold', value: '18k' },
    { label: 'Temple Antique Finish', value: 'temple' },
  ];

  const priceRanges = [
    { label: 'All Price Tiers', value: 'all' },
    { label: 'Under ₹250', value: 'under-250' },
    { label: '₹250 to ₹1,000', value: '250-1000' },
    { label: '₹1,000 to ₹5,000', value: '1000-5000' },
    { label: 'Above ₹5,000', value: 'above-5000' },
  ];

  const sortOptions = [
    { label: 'Maison Featured', value: 'featured' },
    { label: 'Most Popular', value: 'popularity' },
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
  ];

  // Client-side filtering & sorting for instant responsiveness
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Status active only
    result = result.filter((p) => p.status === 'active');

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => {
        if (p.category === selectedCategory) return true;
        // Aliases
        if (selectedCategory === 'bridal' && p.category === 'bridal-sets') return true;
        if (selectedCategory === 'bridal-sets' && p.category === 'bridal') return true;
        if (selectedCategory === 'necklaces' && p.category === 'necklace-sets') return true;
        if (selectedCategory === 'necklace-sets' && p.category === 'necklaces') return true;
        if (selectedCategory === 'earrings' && p.category === 'earrings-jhumkas') return true;
        if (selectedCategory === 'earrings-jhumkas' && p.category === 'earrings') return true;
        if (selectedCategory === 'bangles' && p.category === 'bangles-bracelets') return true;
        if (selectedCategory === 'bangles-bracelets' && p.category === 'bangles') return true;
        if (
          selectedCategory === 'rings' &&
          (p.category === 'rings' ||
            p.name.toLowerCase().includes('ring') ||
            p.name.toLowerCase().includes('band') ||
            p.subtitle.toLowerCase().includes('ring') ||
            p.subtitle.toLowerCase().includes('band'))
        ) return true;
        if (
          (selectedCategory === 'traditional' || selectedCategory === 'traditional-jewellery') &&
          (p.occasion === 'Puja & Traditional' ||
            p.material.toLowerCase().includes('temple') ||
            p.name.toLowerCase().includes('temple') ||
            p.description.toLowerCase().includes('temple'))
        ) return true;
        if (
          (selectedCategory === 'festive-party' || selectedCategory === 'festive-everyday') &&
          (p.category === 'festive-everyday' ||
            p.occasion === 'Festive & Celebrations' ||
            p.occasion === 'Cocktail & Reception')
        ) return true;
        return false;
      });
    }

    // Occasion
    if (selectedOccasion !== 'all') {
      result = result.filter((p) => p.occasion === selectedOccasion);
    }

    // Material
    if (selectedMaterial !== 'all') {
      result = result.filter((p) =>
        p.material.toLowerCase().includes(selectedMaterial.toLowerCase())
      );
    }

    // Price range
    if (selectedPriceRange !== 'all') {
      if (selectedPriceRange === 'under-250') {
        result = result.filter((p) => p.price < 250);
      } else if (selectedPriceRange === '250-1000') {
        result = result.filter((p) => p.price >= 250 && p.price <= 1000);
      } else if (selectedPriceRange === '1000-5000') {
        result = result.filter((p) => p.price > 1000 && p.price <= 5000);
      } else if (selectedPriceRange === 'above-5000') {
        result = result.filter((p) => p.price > 5000);
      }
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'popularity':
        result.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [
    initialProducts,
    searchQuery,
    selectedCategory,
    selectedOccasion,
    selectedMaterial,
    selectedPriceRange,
    sortBy,
  ]);

  // Active filter chip helpers
  const activeChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = [];

    if (searchQuery.trim()) {
      chips.push({
        id: 'search',
        label: `Search: "${searchQuery}"`,
        onRemove: () => setSearchQuery(''),
      });
    }

    if (selectedCategory !== 'all') {
      const match = categories.find((c) => c.value === selectedCategory);
      let label = match?.label || selectedCategory;
      if (selectedCategory === 'rings') label = 'Rings';
      else if (selectedCategory === 'traditional' || selectedCategory === 'traditional-jewellery') label = 'Traditional Jewellery';
      else if (selectedCategory === 'festive-party') label = 'Festive & Party Wear';
      chips.push({
        id: 'category',
        label: `Category: ${label}`,
        onRemove: () => setSelectedCategory('all'),
      });
    }

    if (selectedOccasion !== 'all') {
      chips.push({
        id: 'occasion',
        label: `Occasion: ${selectedOccasion}`,
        onRemove: () => setSelectedOccasion('all'),
      });
    }

    if (selectedMaterial !== 'all') {
      const match = materials.find((m) => m.value === selectedMaterial);
      chips.push({
        id: 'material',
        label: `Material: ${match?.label || selectedMaterial}`,
        onRemove: () => setSelectedMaterial('all'),
      });
    }

    if (selectedPriceRange !== 'all') {
      const match = priceRanges.find((p) => p.value === selectedPriceRange);
      chips.push({
        id: 'price',
        label: `Price: ${match?.label || selectedPriceRange}`,
        onRemove: () => setSelectedPriceRange('all'),
      });
    }

    return chips;
  }, [searchQuery, selectedCategory, selectedOccasion, selectedMaterial, selectedPriceRange]);

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setSelectedMaterial('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
    setVisibleCount(8);
  };

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="space-y-8">
      {/* 1. SEARCH & CATEGORY PILLS BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-champagne-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by jewellery title, stone, material..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(8);
            }}
            className="w-full text-xs bg-white border border-ivory-300 rounded-sm pl-10 pr-9 py-2.5 text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-champagne-500 shadow-2xs transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle Button & Desktop Sort Dropdown */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <Button
            variant="outline-gold"
            size="sm"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold hidden sm:inline">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none text-xs bg-white border border-ivory-300 rounded-sm pl-3 pr-8 py-2 text-charcoal-800 font-medium focus:outline-none focus:border-champagne-500 shadow-2xs cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY PILLS (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <motion.button
              key={cat.value}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.value);
                setVisibleCount(8);
              }}
              className={cn(
                'whitespace-nowrap px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-medium transition-all shadow-2xs border shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500',
                isSelected
                  ? 'bg-burgundy-950 text-ivory-50 border-burgundy-900 ring-1 ring-champagne-400'
                  : 'bg-white text-charcoal-700 hover:bg-champagne-50/60 border-ivory-300 hover:border-champagne-400'
              )}
            >
              {cat.label}
            </motion.button>
          );
        })}
      </div>

      {/* 3. MULTI-FACET FILTER DRAWER */}
      <div
        className={cn(
          'bg-white rounded-sm border border-ivory-300/80 p-5 shadow-2xs transition-all',
          mobileFilterOpen ? 'block' : 'hidden md:block'
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Occasion Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
              Occasion
            </label>
            <select
              value={selectedOccasion}
              onChange={(e) => {
                setSelectedOccasion(e.target.value);
                setVisibleCount(8);
              }}
              className="w-full text-xs px-3 py-2 bg-ivory-50 border border-ivory-300 rounded-sm text-charcoal-800 focus:outline-none focus:border-champagne-500"
            >
              {occasions.map((occ) => (
                <option key={occ.value} value={occ.value}>
                  {occ.label}
                </option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
              Material & Plating
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => {
                setSelectedMaterial(e.target.value);
                setVisibleCount(8);
              }}
              className="w-full text-xs px-3 py-2 bg-ivory-50 border border-ivory-300 rounded-sm text-charcoal-800 focus:outline-none focus:border-champagne-500"
            >
              {materials.map((mat) => (
                <option key={mat.value} value={mat.value}>
                  {mat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
              Price Range
            </label>
            <select
              value={selectedPriceRange}
              onChange={(e) => {
                setSelectedPriceRange(e.target.value);
                setVisibleCount(8);
              }}
              className="w-full text-xs px-3 py-2 bg-ivory-50 border border-ivory-300 rounded-sm text-charcoal-800 focus:outline-none focus:border-champagne-500"
            >
              {priceRanges.map((pr) => (
                <option key={pr.value} value={pr.value}>
                  {pr.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {mobileFilterOpen && (
          <div className="pt-3 md:hidden">
            <Button
              variant="outline-gold"
              size="sm"
              className="w-full"
              onClick={() => setMobileFilterOpen(false)}
            >
              Apply & Close Filters
            </Button>
          </div>
        )}
      </div>

      {/* 4. ACTIVE FILTER CHIPS & PRODUCT COUNT BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Chips with AnimatePresence */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-charcoal-800 mr-1">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'Masterpiece' : 'Masterpieces'}
          </span>

          <AnimatePresence mode="popLayout">
            {activeChips.map((chip) => (
              <motion.span
                key={chip.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: LUXURY_EASE }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-champagne-100/70 border border-champagne-300/80 text-charcoal-900 text-xs font-medium"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={chip.onRemove}
                  className="text-charcoal-500 hover:text-burgundy-800 transition-colors focus:outline-none"
                  aria-label={`Remove filter ${chip.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>

          {activeChips.length > 0 && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleClearAll}
              className="text-xs text-burgundy-800 hover:underline font-semibold uppercase tracking-wider ml-2 flex items-center gap-1 focus:outline-none"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </motion.button>
          )}
        </div>

        <div className="text-[11px] text-charcoal-500 font-light">
          Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length}
        </div>
      </div>

      {/* 5. PRODUCT GRID OR NO-RESULTS EMPTY STATE */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <EmptyState
            icon={<Search className="w-7 h-7 text-champagne-600" />}
            title="No Masterpieces Match Your Filters"
            description="We could not find creations matching your precise search parameters. Try resetting your filter chips or exploring another precious category."
            actionLabel="Reset All Filters"
            onAction={handleClearAll}
          />
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* 6. ACCESSIBLE LOAD-MORE ACTION */}
          {hasMore && (
            <div className="text-center pt-10 pb-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button
                  variant="outline-gold"
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="px-10 shadow-xs hover:shadow-md"
                >
                  <span>Load More Creations ({filteredProducts.length - visibleCount} Remaining)</span>
                </Button>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
