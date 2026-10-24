import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TrustBadges } from '@/components/common/TrustBadges';
import { ArrowRight } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
            White-Glove Logistics
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 tracking-tight">
            Insured Armored Delivery
          </h1>
          <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
          <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            Every creation dispatched from our Mayfair and Paris vaults travels under continuous surveillance and comprehensive Lloyd&apos;s underwriter insurance coverage.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-300 max-w-4xl mx-auto space-y-8 mb-16 shadow-2xs">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-charcoal-900 font-normal">
              1. Discretion and Specialized Carriers
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              We partner exclusively with Malca-Amit, Brink&apos;s Global Services, and FedEx Priority Secure. Outer packaging gives zero indication of high-value jewellery content to preserve privacy and confidentiality.
            </p>
          </div>

          <div className="space-y-4 border-t border-ivory-200 pt-6">
            <h2 className="font-serif text-2xl text-charcoal-900 font-normal">
              2. 100% Comprehensive Transit Insurance
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              From the instant the piece leaves our vaults until an authorized adult signatory verifies identity upon handover, your acquisition is covered for 100% of its replacement valuation.
            </p>
          </div>

          <div className="space-y-4 border-t border-ivory-200 pt-6">
            <h2 className="font-serif text-2xl text-charcoal-900 font-normal">
              3. Delivery Timelines
            </h2>
            <ul className="text-xs sm:text-sm text-charcoal-600 space-y-2 list-disc list-inside font-light">
              <li><strong className="text-charcoal-900">United Kingdom & European Union:</strong> Next business day via armored courier.</li>
              <li><strong className="text-charcoal-900">North America & Middle East:</strong> 2 to 3 business days priority insured transit.</li>
              <li><strong className="text-charcoal-900">Asia Pacific & India:</strong> 3 to 4 business days direct secured logistics.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-ivory-200 flex justify-between items-center">
            <Link href="/shop">
              <Button variant="gold" size="md">
                <span>Explore The Collection</span>
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
