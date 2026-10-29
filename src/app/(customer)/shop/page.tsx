import React, { Suspense } from 'react';
import { productService } from '@/services/productService';
import { Container } from '@/components/ui/Container';
import { TrustBadges } from '@/components/common/TrustBadges';
import { CatalogueView } from '@/components/catalogue/CatalogueView';
import { SectionReveal } from '@/components/home/HomeMotionComponents';

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    collection?: string;
    search?: string;
    occasion?: string;
    sort?: string;
    section?: string;
  }>;
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const resolvedParams = (await searchParams) || {};
  const currentCategory = resolvedParams.category || 'all';
  const currentSearch = resolvedParams.search || '';
  const currentOccasion = resolvedParams.occasion || 'all';
  const currentCollection = resolvedParams.collection || '';
  const currentSort = resolvedParams.sort || 'featured';
  const currentSection = resolvedParams.section || '';

  const isBridalView =
    currentSection === 'bridal' ||
    currentCategory === 'bridal' ||
    currentCategory === 'bridal-sets' ||
    currentOccasion === 'Bridal & Wedding';

  // Retrieve all products from centralized typed mock service
  const products = await productService.getProducts();

  return (
    <>
      {/* Editorial Treasury Header */}
      <SectionReveal className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
          {isBridalView
            ? 'Imperial Trousseau & Bridal Treasury'
            : currentCollection
            ? `Anthology Collection — ${currentCollection}`
            : 'Haute Joaillerie & Trousseau Catalogue'}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 tracking-tight">
          {isBridalView
            ? 'The Bridal Salon Treasury'
            : currentCollection
            ? currentCollection
            : 'The Masterpiece Treasury'}
        </h1>
        <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
        <p className="text-sm text-charcoal-600 font-light leading-relaxed">
          {isBridalView
            ? 'Imperial bridal chokers, uncut polki sets, jadau gulbandhs, and ceremonial adornments hand-wrought by royal karigars.'
            : currentCollection
            ? 'An exclusive curation conceived around this signature aesthetic philosophy.'
            : 'Explore 26 distinct creations spanning bridal trousseau sets, uncut polki and kundan, classic jhumkas, sculpted bangles, and daily luxury ornaments.'}
        </p>
      </SectionReveal>

      {/* Interactive Catalogue View (Search, Filters, Active Chips, Grid, Pagination) */}
      <CatalogueView
        key={`${currentCategory}-${currentSearch}-${currentOccasion}-${currentCollection}-${currentSort}-${currentSection}`}
        initialProducts={products}
        initialCategory={currentCategory}
        initialSearch={currentSearch}
        initialOccasion={currentOccasion}
        initialCollection={currentCollection}
        initialSort={currentSort}
        initialSection={currentSection}
      />
    </>
  );
}

function ShopSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Editorial Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="h-3 w-48 bg-champagne-200/60 rounded mx-auto mb-3" />
        <div className="h-10 w-72 sm:w-96 bg-charcoal-200/50 rounded mx-auto mb-4" />
        <div className="w-12 h-px bg-champagne-400 mx-auto my-4" />
        <div className="h-4 w-5/6 max-w-md bg-charcoal-100 rounded mx-auto" />
      </div>

      {/* Search / Filter Skeleton */}
      <div className="bg-white border border-ivory-300 rounded-xl p-4 sm:p-6 mb-8 shadow-xs">
        <div className="h-12 bg-ivory-200/70 rounded-lg w-full mb-4" />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-ivory-200/80 rounded-full shrink-0" />
          ))}
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white border border-ivory-300/60 rounded-xl overflow-hidden p-3 shadow-xs">
            <div className="aspect-4/5 bg-ivory-200/70 rounded-lg mb-3" />
            <div className="h-3 w-20 bg-champagne-200/50 rounded mb-2" />
            <div className="h-5 w-3/4 bg-charcoal-200/50 rounded mb-2" />
            <div className="h-4 w-1/3 bg-champagne-300/60 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <div className="py-12 bg-ivory-100 min-h-screen">
      <Container>
        <Suspense fallback={<ShopSkeleton />}>
          <ShopContent searchParams={searchParams} />
        </Suspense>

        {/* Trust Guarantees */}
        <div className="mt-20">
          <TrustBadges />
        </div>
      </Container>
    </div>
  );
}
