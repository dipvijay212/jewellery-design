import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productService } from '@/services/productService';
import { formatPrice } from '@/utils/formatters';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/common/ProductCard';
import { TrustBadges } from '@/components/common/TrustBadges';
import { ProductImageZoom } from '@/components/catalogue/ProductImageZoom';
import { ProductDetailActions } from './ProductDetailActions';
import { ProductAccordions } from './ProductAccordions';
import { SectionReveal } from '@/components/home/HomeMotionComponents';
import {
  ShieldCheck,
  Gift,
  Truck,
  Info,
  ChevronRight,
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await productService.getRelatedProducts(product.id, 4);

  // Genuine discount calculation
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const savingsAmount = hasDiscount ? product.compareAtPrice! - product.price : 0;
  const discountPercent = hasDiscount
    ? Math.round((savingsAmount / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="py-10 bg-ivory-100 min-h-screen">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center space-x-2 text-xs text-charcoal-500 mb-8 tracking-wider uppercase overflow-x-auto whitespace-nowrap scrollbar-none"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-champagne-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
          <Link href="/shop" className="hover:text-champagne-700 transition-colors">
            Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-champagne-700 transition-colors capitalize"
          >
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
          <span className="text-charcoal-900 font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-sm border border-ivory-300/80 p-6 sm:p-10 lg:p-12 shadow-sm mb-16">
          {/* Left Column: Interactive Image Gallery with Thumbnails & Zoom */}
          <div className="lg:col-span-7">
            <ProductImageZoom images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Details, Genuine Discount, Specs, & Acquisition Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Occasion Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-champagne-700 font-semibold">
                  {product.occasion || product.collection}
                </span>
                {product.isNew && <Badge variant="gold">New Arrival</Badge>}
                {product.isBestseller && <Badge variant="ivory">Bestseller</Badge>}
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-charcoal-500 mt-2 font-light italic">
                {product.subtitle}
              </p>

              {/* Price & Genuine Discount Calculation */}
              <div className="pt-4 pb-4 border-y border-ivory-200 mt-4 space-y-1.5">
                <div className="flex items-baseline space-x-3">
                  <span className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-900">
                    {formatPrice(product.price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-charcoal-400 line-through">
                      {formatPrice(product.compareAtPrice!)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <Badge variant="burgundy" className="text-xs font-semibold">
                      {discountPercent}% OFF
                    </Badge>
                  )}
                </div>

                {hasDiscount && (
                  <div className="text-[11px] text-emerald-800 font-medium">
                    You save {formatPrice(savingsAmount)} on this acquisition.
                  </div>
                )}

                <div className="text-[10px] uppercase tracking-wider text-charcoal-400 pt-1">
                  Reference SKU: <span className="font-mono text-charcoal-600">{product.sku}</span>
                </div>
              </div>

              {/* Editorial Description */}
              <div className="py-4">
                <h3 className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-800 mb-1.5">
                  About This Creation
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Material Quick Hint */}
              <div className="p-3.5 rounded-sm bg-ivory-50 border border-ivory-300 text-xs text-charcoal-700 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-champagne-800 block">
                  Material Composition:
                </span>
                <span className="font-medium text-charcoal-900">{product.material}</span>
              </div>

              {/* Interactive Purchase Actions: Quantity Limits, Bag, Wishlist */}
              <ProductDetailActions product={product} />
            </div>

            {/* Packaging & Service Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-ivory-200 text-xs text-charcoal-600">
              <div className="flex items-start space-x-2.5">
                <Gift className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                <span className="text-[11px]">Signature Velvet Presentation Coffer</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Truck className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                <span className="text-[11px]">Insured Armored Courier Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Material & Care Details Luxury Accordions */}
        <SectionReveal className="mb-16">
          <ProductAccordions product={product} />
        </SectionReveal>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <SectionReveal className="mb-16">
            <div className="text-center mb-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold block mb-1">
                Complementary Pieces
              </span>
              <h2 className="font-serif text-3xl text-charcoal-900 font-light">
                Complete Your Suite
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </SectionReveal>
        )}

        <TrustBadges />
      </Container>
    </div>
  );
}
