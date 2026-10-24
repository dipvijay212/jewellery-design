import React from 'react';
import { Container } from '@/components/ui/Container';
import { BRAND } from '@/utils/constants';

export default function PrivacyPage() {
  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
            Confidentiality Standards
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 tracking-tight">
            Privacy Policy
          </h1>
          <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
          <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            Protecting high-net-worth client confidentiality, delivery protocols, and private salon consultation data.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-300 max-w-4xl mx-auto space-y-6 text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed shadow-2xs">
          <p>
            At {BRAND.name}, safeguarding your private information is integral to our maison ethos. We do not sell, rent, or trade patron records, acquisition histories, or appointment dates with any commercial third-party marketing entities.
          </p>
          <h2 className="font-serif text-xl text-charcoal-900 font-normal pt-4">
            Encrypted Client Dossiers
          </h2>
          <p>
            All consultations, ring sizing dossiers, and laser-inscription registries are maintained under AES-256 bank-grade encryption with access restricted to our Senior Gemology Board.
          </p>
          <h2 className="font-serif text-xl text-charcoal-900 font-normal pt-4">
            Courier Handover Data
          </h2>
          <p>
            Armored delivery addresses are transmitted solely to our bonded logistics partners (Malca-Amit and Brink&apos;s) under encrypted security tokens and expunged following verified receipt.
          </p>
        </div>
      </Container>
    </div>
  );
}
