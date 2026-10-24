import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TrustBadges } from '@/components/common/TrustBadges';
import { ArrowRight } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
            Client Peace of Mind
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 tracking-tight">
            Returns, Exchanges & Sizing
          </h1>
          <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
          <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            Acquiring high jewellery is an intimate milestone. We offer comprehensive 30-day returns and complimentary lifetime ring sizing and servicing.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-300 max-w-4xl mx-auto space-y-8 mb-16 shadow-2xs">
          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal-900 font-normal">
              30-Day Acquisition Evaluation Period
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              Should any piece not match your aesthetic desires, you may request a return or boutique exchange within 30 days of receipt. Pieces must remain unworn with official laboratory security tags intact.
            </p>
          </div>

          <div className="space-y-3 border-t border-ivory-200 pt-6">
            <h2 className="font-serif text-2xl text-charcoal-900 font-normal">
              Complimentary Lifetime Ring Sizing
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              We provide one complimentary precision laser resizing on all solitaires and bands within the first year of acquisition, handled directly by our master goldsmiths.
            </p>
          </div>

          <div className="space-y-3 border-t border-ivory-200 pt-6">
            <h2 className="font-serif text-2xl text-charcoal-900 font-normal">
              Annual Cleaning & Claw Inspection
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              Bring your Aurelia jewel to any of our salons worldwide for complimentary ultrasonic steam cleaning, rhodium brightening, and microscopic claw safety verification.
            </p>
          </div>

          <div className="pt-4 border-t border-ivory-200 flex justify-between items-center">
            <Link href="/contact">
              <Button variant="burgundy" size="md">
                <span>Contact Atelier Concierge</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <TrustBadges />
      </Container>
    </div>
  );
}
