import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { productService } from '@/services/productService';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/home/HomeMotionComponents';
import { ArrowRight } from 'lucide-react';

export default async function CollectionsPage() {
  const collections = await productService.getCollections();

  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
              Maison Anthologies
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 tracking-tight">
              Curated Collections
            </h1>
            <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
            <p className="text-sm text-charcoal-600 leading-relaxed font-light">
              Each anthology is conceived around a central aesthetic philosophy — from Parisian afternoon warmth to European royal crowns and cosmic nocturnal poetry.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-16">
          {collections.map((col, index) => {
            const isReversed = index % 2 === 1;
            return (
              <SectionReveal key={col.id} delay={0.1}>
                <div className="bg-white rounded-sm border border-ivory-300 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center hover:border-champagne-500/60 transition-colors duration-300">
                  <div
                    className={`lg:col-span-7 relative h-80 sm:h-96 lg:h-[480px] w-full ${
                      isReversed ? 'lg:order-2' : ''
                    }`}
                  >
                    <Image
                      src={col.heroImage}
                      alt={col.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-700 hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div
                    className={`lg:col-span-5 p-8 sm:p-12 space-y-5 ${
                      isReversed ? 'lg:order-1' : ''
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-700 font-semibold">
                      Inspiration: {col.inspiration}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light">
                      {col.name}
                    </h2>
                    <p className="text-xs uppercase tracking-wider text-charcoal-500 font-medium">
                      {col.tagline}
                    </p>
                    <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                      {col.description}
                    </p>
                    <div className="pt-4">
                      <Link href={`/shop?collection=${encodeURIComponent(col.name)}`}>
                        <Button variant="burgundy" size="md">
                          <span>Discover {col.itemCount} Creations</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
