import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productService } from '@/services/productService';
import { mockReviews } from '@/data/mockReviews';
import { ProductCard } from '@/components/common/ProductCard';
import { TrustBadges } from '@/components/common/TrustBadges';
import { ReviewsSection } from '@/components/common/ReviewsSection';
import { NewsletterSection } from '@/components/common/NewsletterSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import {
  HeroSection,
  SectionReveal,
  EditorialImageReveal,
} from '@/components/home/HomeMotionComponents';
import { CollectionsCarousel } from '@/components/home/CollectionsCarousel';
import {
  ArrowRight,
  Sparkles,
  Gem,
  Award,
  Calendar,
  ShieldCheck,
  Heart,
} from 'lucide-react';

export default async function HomePage() {
  const [bestsellers, newArrivals, bridalPieces, categories, collections] =
    await Promise.all([
      productService.getBestsellers(),
      productService.getNewArrivals(),
      productService.getBridalCreations(),
      productService.getCategories(),
      productService.getCollections(),
    ]);

  return (
    <div className="flex flex-col w-full bg-ivory-100 overflow-hidden">
      {/* 4. EDITORIAL HERO SECTION */}
      <HeroSection />

      {/* 5. SHOP-BY-COLLECTION SECTION */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DDC6]/80 relative overflow-hidden">
        <Container>
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <SectionHeading
                align="left"
                eyebrow="Curated Anthologies"
                title="Shop by Signature Collection"
                description="From regal Nizam polki suites and Muzo emeralds to warm golden-hour solitaires."
              />
              <div className="mt-6 md:mt-0">
                <Link href="/collections">
                  <Button variant="outline-gold" size="md">
                    <span>View All Collections</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Luxury Arched Carousel for Collections */}
          <SectionReveal delay={0.1}>
            <div className="pt-4 pb-2">
              <CollectionsCarousel collections={collections} />
            </div>
          </SectionReveal>

          {/* Category Quick Pills */}
          <SectionReveal delay={0.2}>
            <div className="mt-14 pt-8 border-t border-[#E8DDC6]/80 flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#28080D] mr-2">
                Explore by Discipline:
              </span>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop?category=${c.slug}`}
                  className="text-[11px] px-5 py-2 rounded-full bg-white hover:bg-[#1A0508] border border-[#E8DDC6] hover:border-[#C9A227] text-[#302024] hover:text-[#DFC063] uppercase tracking-[0.16em] font-medium transition-all shadow-2xs hover:-translate-y-0.5 hover:shadow-sm"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* 6. BESTSELLERS SECTION */}
      <section className="py-24 bg-[#FAF7F2] border-b border-[#E8DDC6]/80">
        <Container>
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <SectionHeading
                align="left"
                eyebrow="The Most Coveted Works"
                title="Maison Bestsellers"
                description="Iconic solitaires, uncut diamond chandbalis, and diamond tennis bracelets chosen by collectors."
              />
              <div className="mt-6 md:mt-0">
                <Link href="/shop?sort=featured">
                  <Button variant="outline-gold" size="md">
                    <span>View All Bestsellers</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestsellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* 7. BRIDAL JEWELLERY FEATURE SECTION */}
      <section className="py-24 bg-burgundy-950 text-ivory-50 border-y border-champagne-500/20 relative overflow-hidden">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 bg-radial from-burgundy-900/50 via-charcoal-900/90 to-charcoal-900 pointer-events-none" />

        <Container className="relative z-10">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">
                <Heart className="w-3.5 h-3.5 text-champagne-400" />
                <span>Royal Indian & Sovereign Trousseau</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory-50 tracking-tight leading-tight mb-4">
                The Bridal Treasury
              </h2>
              <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
              <p className="text-xs sm:text-sm text-ivory-200 font-light max-w-xl mx-auto leading-relaxed">
                Uncut Syndicate Polki chokers with Basra pearls, crescent Jadau chandbalis, and 5-carat cushion solitaires created for royal celebrations.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
            {bridalPieces.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} variant="dark" />
            ))}
          </div>

          {/* Bridal Trousseau Consultation Feature Banner */}
          <SectionReveal delay={0.15}>
            <div className="relative overflow-hidden bg-gradient-to-r from-[#180407]/95 via-[#25070D]/95 to-[#180407]/95 border border-[#C9A227]/40 rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
              {/* Inner Architectural Gold Hairline Frame */}
              <div className="absolute inset-2.5 sm:inset-3 rounded-[22px] sm:rounded-[30px] border border-[#C9A227]/20 pointer-events-none" />

              <div className="space-y-2 text-center lg:text-left relative z-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFC063] font-semibold">
                  Private Trousseau Concierge
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF8F2] font-light">
                  Curating Your Once-in-a-Lifetime Suite
                </h3>
                <p className="text-xs text-[#E8DDC6]/80 max-w-xl font-light leading-relaxed">
                  Meet privately with our Chief Gemologist to custom-fit hasli chokers, select center solitaires, or commission matching family suites.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
                <Link href="/contact">
                  <Button variant="gold" size="lg" className="rounded-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Book Consultation</span>
                  </Button>
                </Link>
                <Link href="/bridal">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-[#FBF8F2] hover:text-[#DFC063] border border-[#C9A227]/40 rounded-full"
                  >
                    <span>Explore Bridal Salon</span>
                  </Button>
                </Link>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* 8. NEW ARRIVALS SECTION */}
      <section className="py-24 bg-ivory-100">
        <Container>
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <SectionHeading
                align="left"
                eyebrow="Newly Released Masterpieces"
                title="Atelier New Arrivals"
                description="Freshly emerged from the goldsmith benches of our Rajasthan and Paris ateliers."
              />
              <div className="mt-6 md:mt-0">
                <Link href="/shop?sort=newest">
                  <Button variant="outline-gold" size="md">
                    <span>View All New Arrivals</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* 9. BRAND STORY & CRAFTSMANSHIP SECTION */}
      <section className="py-24 bg-ivory-50 border-t border-champagne-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <SectionReveal>
                <SectionHeading
                  align="left"
                  eyebrow="Generational Lineage"
                  title="A Century of Gold, Fire & Heritage"
                  description="Before reaching our private vaults, each jewel passes through generations of refined artisan discipline."
                />

                <div className="space-y-4 pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center text-champagne-700 shrink-0 mt-0.5">
                      <Gem className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal-900">
                        Hereditary Karigar Savoir-Faire
                      </h4>
                      <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                        Handcrafted in our specialized ateliers by master craftsmen whose lineage traces back to royal courts of Rajasthan, Hyderabad, and Paris.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center text-champagne-700 shrink-0 mt-0.5">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal-900">
                        Zero Fracture-Filled Stones
                      </h4>
                      <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                        We strictly refuse glass-filled or synthetic stones. Every diamond and colored gemstone holds a verifiable natural origin report from GIA, SSEF, or Gübelin.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center text-champagne-700 shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal-900">
                        Swiss & Indian Assay Hallmarking
                      </h4>
                      <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                        Stamped with our registered maison maker mark and official state purity seals ensuring uncompromised 18k and 22k gold integrity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/about">
                    <Button variant="burgundy" size="md">
                      <span>Read The Maison Chronicles</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SectionReveal>
            </div>

            <EditorialImageReveal className="lg:col-span-6 relative aspect-[4/5] sm:aspect-square max-w-lg mx-auto w-full rounded-t-[180px] sm:rounded-t-[220px] rounded-b-[28px] overflow-hidden border border-[#C9A227]/40 shadow-2xl bg-[#140306]">
              {/* Inner Architectural Gold Hairline Ring */}
              <div className="absolute inset-2.5 rounded-t-[170px] sm:rounded-t-[210px] rounded-b-[20px] border border-[#C9A227]/25 pointer-events-none z-10" />

              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
                alt="Master Goldsmith setting emeralds at Aurelia Atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#180407]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#C9A227]/40 shadow-lg z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#28080D] border border-[#C9A227] flex items-center justify-center text-[#DFC063] shrink-0">
                    <Sparkles className="w-4 h-4 text-[#DFC063]" />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-semibold text-[#FBF8F2]">
                      Microscope Claw Mounting Standard
                    </div>
                    <div className="text-[10px] text-[#E8DDC6]/75">
                      Every prong is sculpted under 40x magnification for lifelong retention.
                    </div>
                  </div>
                </div>
              </div>
            </EditorialImageReveal>
          </div>
        </Container>
      </section>

      {/* 10. CUSTOMER REVIEWS SECTION */}
      <ReviewsSection reviews={mockReviews} />

      {/* TRUST PILLARS BAR */}
      <section className="py-12 bg-ivory-100 border-t border-ivory-300">
        <Container>
          <TrustBadges />
        </Container>
      </section>

      {/* 11. NEWSLETTER UI */}
      <NewsletterSection />
    </div>
  );
}
