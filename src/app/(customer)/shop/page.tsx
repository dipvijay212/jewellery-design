import React from 'react';
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
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || 'all';
  const currentSearch = resolvedParams.search || '';
  const currentOccasion = resolvedParams.occasion || 'all';
  const currentCollection = resolvedParams.collection || '';
  const currentSort = resolvedParams.sort || 'featured';

  // Retrieve all products from centralized typed mock service
  const products = await productService.getProducts();

  return (
    <div className="py-12 bg-ivory-100 min-h-screen">
      <Container>
        {/* Editorial Treasury Header */}
        <SectionReveal className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
            Haute Joaillerie & Trousseau Catalogue
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 tracking-tight">
            The Masterpiece Treasury
          </h1>
          <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
          <p className="text-sm text-charcoal-600 font-light leading-relaxed">
            Explore 26 distinct creations spanning bridal trousseau sets, uncut polki and kundan, classic jhumkas, sculpted bangles, and daily luxury ornaments.
          </p>
        </SectionReveal>

        {/* Interactive Catalogue View (Search, Filters, Active Chips, Grid, Pagination) */}
        <CatalogueView
          key={`${currentCategory}-${currentSearch}-${currentOccasion}-${currentCollection}-${currentSort}`}
          initialProducts={products}
          initialCategory={currentCategory}
          initialSearch={currentSearch}
          initialOccasion={currentOccasion}
          initialCollection={currentCollection}
          initialSort={currentSort}
        />

        {/* Trust Guarantees */}
        <div className="mt-20">
          <TrustBadges />
        </div>
      </Container>
    </div>
  );
}
