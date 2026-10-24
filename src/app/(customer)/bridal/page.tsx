import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { productService } from '@/services/productService';
import { ProductCard } from '@/components/common/ProductCard';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/home/HomeMotionComponents';
import { TrustBadges } from '@/components/common/TrustBadges';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default async function BridalPage() {
  const bridalPieces = await productService.getBridalCreations();

  return (
    <div className="py-12 bg-ivory-100 min-h-screen">
      {/* Bridal Hero */}
      <section className="relative bg-burgundy-950 text-ivory-50 py-20 lg:py-28 overflow-hidden mb-16 border-b border-champagne-500/20">
        <div className="absolute inset-0 bg-radial from-burgundy-900/60 via-charcoal-900/90 to-charcoal-900 pointer-events-none" />
        <Container className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <SectionReveal>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-xs font-medium uppercase tracking-[0.25em] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>The Trousseau Salon</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-ivory-50 tracking-tight leading-tight mb-6">
              Bridal & High Ceremony <span className="italic font-normal text-gold-bright">Masterpieces</span>
            </h1>

            <p className="text-sm sm:text-base text-ivory-200 font-light leading-relaxed max-w-2xl mb-8 mx-auto">
              From uncut Syndicate Polki chokers and Basra pearl haslis to 5-carat solitaire engagement suites. Handcrafted by royal karigars for your once-in-a-lifetime vows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="gold" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Book Bridal Consultation</span>
                </Button>
              </Link>
              <Link href="/shop?category=bridal">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-ivory-100 hover:text-champagne-300 border border-champagne-500/30"
                >
                  <span>Browse All Bridal Works</span>
                </Button>
              </Link>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Bridal Gallery */}
      <Container>
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
              Curated Ceremonial Suites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light">
              Heirloom Trousseau Pieces
            </h2>
            <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
            <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
              Each bridal creation is crafted in limited numbers, hallmarked for purity, and accompanied by lifelong maintenance guarantees.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {bridalPieces.map((piece) => (
            <ProductCard key={piece.id} product={piece} />
          ))}
        </div>

        {/* Private Bridal Consultation Card */}
        <SectionReveal delay={0.15}>
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-300 shadow-sm mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-700 font-semibold">
                White-Glove Trousseau Experience
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-light">
                Bespoke Styling with our Chief Gemologist
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Every bride deserves jewelry sculpted to her neckline, ceremony color palette, and heirloom preferences. Arrange a private salon session in London, Mumbai, or New York.
              </p>
              <div className="pt-2">
                <Link href="/contact">
                  <Button variant="burgundy" size="md">
                    <span>Schedule Private Viewing</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-sm overflow-hidden border border-ivory-300">
              <Image
                src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80"
                alt="Bridal suite diamonds"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </SectionReveal>

        <TrustBadges />
      </Container>
    </div>
  );
}
