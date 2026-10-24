import React from 'react';
import { Container } from '@/components/ui/Container';
import { BRAND } from '@/utils/constants';

export default function TermsPage() {
  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-2 block">
            Maison Terms
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal-900 tracking-tight">
            Terms of Acquisition
          </h1>
          <div className="w-12 h-px bg-champagne-500 mx-auto my-4" />
          <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            Legal guarantees governing high jewellery provenance, gemological certificates, and bespoke commissions.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-sm border border-ivory-300 max-w-4xl mx-auto space-y-6 text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed shadow-2xs">
          <h2 className="font-serif text-xl text-charcoal-900 font-normal">
            1. Authenticity and Sovereign Hallmarking
          </h2>
          <p>
            Every piece crafted under the {BRAND.name} seal complies with international hallmark standards (18k / 750 gold, 22k / 916 gold, and 950 platinum). All solitaires carry verifiable GIA, SSEF, or Gübelin gemmological reports.
          </p>
          <h2 className="font-serif text-xl text-charcoal-900 font-normal pt-4">
            2. Bespoke Commission Schedules
          </h2>
          <p>
            Custom bridal suites and private commissions necessitate 4 to 8 weeks for manual stone setting, wax modeling, and Swiss federal assay stamping. Milestone schedules are agreed upon in advance.
          </p>
          <h2 className="font-serif text-xl text-charcoal-900 font-normal pt-4">
            3. Valuation Certificates for Insurance
          </h2>
          <p>
            Every high jewellery piece above $10,000 is accompanied by a complimentary accredited appraisal dossier suitable for immediate underwriting with private wealth insurers.
          </p>
        </div>
      </Container>
    </div>
  );
}
