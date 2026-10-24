import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TrustBadges } from '@/components/common/TrustBadges';
import { SectionReveal } from '@/components/home/HomeMotionComponents';
import { Gem, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        {/* Editorial Story Header */}
        <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
            Maison Patrimony Since 1928
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal-900 tracking-tight">
            The Philosophy of Aurelia
          </h1>
          <div className="w-12 h-px bg-champagne-500 mx-auto my-5" />
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            High jewellery is not an ornament; it is a repository of eternal emotion, ancient geological miracle, and peerless human dexterity.
          </p>
        </SectionReveal>

        {/* Narrative Section 1 */}
        <SectionReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-white p-8 sm:p-12 rounded-sm border border-ivory-300">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-700 font-semibold">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl text-charcoal-900 font-light">
              Born from European Goldsmith Maestros
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              Founded nearly a century ago in the artisanal quarter of Mayfair and later establishing our atelier on Place Vendôme, Aurelia Jewels was created to challenge mass manufactured luxury. Every mount is individually alloyed with solid 18-karat gold and certified 950 platinum.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              We operate without commercial intermediaries. Our master gemologists travel directly to the mines of Muzo, Mogok, Antwerp, and Ceylon to secure singular stones before they reach auction houses.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden border border-ivory-300">
            <Image
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
              alt="Aurelia Haute Joaillerie Heritage"
              fill
              className="object-cover"
            />
          </div>
        </SectionReveal>

        {/* The 3 Pillars */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-sm border border-ivory-300 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-champagne-100 flex items-center justify-center text-champagne-700 border border-champagne-300">
              <Gem className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-charcoal-900 font-normal">
              Rare Natural Unheated Stones
            </h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              We reject synthetic simulants and fracture fillings. Each stone carries an unassailable dossier from SSEF, GIA, or Gübelin.
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm border border-ivory-300 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-champagne-100 flex items-center justify-center text-champagne-700 border border-champagne-300">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-charcoal-900 font-normal">
              Sovereign Hand Finishing
            </h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              From hand-drawn gouache renderings to microscope micro-claw pavé settings, our jewelers train for a minimum of fifteen years before mounting solitaire pieces.
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm border border-ivory-300 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-champagne-100 flex items-center justify-center text-champagne-700 border border-champagne-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-charcoal-900 font-normal">
              Patrimonial Longevity
            </h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Designed as family heirlooms passed through generations. We offer perpetual complimentary cleaning, inspection, and provenance archiving.
            </p>
          </div>
        </SectionReveal>

        {/* Boutique Salons CTA */}
        <SectionReveal className="bg-burgundy-950 text-ivory-50 p-10 sm:p-14 rounded-sm border border-champagne-500/30 text-center max-w-3xl mx-auto space-y-6 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-champagne-400 font-semibold">
            Private Viewings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light">
            Arrange a Private Salon Consultation
          </h2>
          <p className="text-xs sm:text-sm text-ivory-300 leading-relaxed max-w-lg mx-auto font-light">
            Our private salon suites in Mayfair, Paris, and Fifth Avenue provide discrete viewing rooms for collectors, bridal couples, and high jewellery patrons.
          </p>
          <div className="pt-2">
            <Link href="/shop">
              <Button variant="gold" size="lg">
                <span>View Current Vault Collection</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </SectionReveal>

        <TrustBadges />
      </Container>
    </div>
  );
}
