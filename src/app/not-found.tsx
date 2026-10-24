import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Gem, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center p-6 text-charcoal-900">
      <div className="max-w-lg w-full bg-white rounded-sm border border-champagne-300/60 p-10 sm:p-14 text-center shadow-lg space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-champagne-100 border border-champagne-400 flex items-center justify-center text-champagne-700">
          <Gem className="w-8 h-8" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-champagne-700 font-semibold block">
          Archival Error 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-light leading-tight text-charcoal-900">
          A Piece Forgotten to Time
        </h1>

        <div className="w-10 h-px bg-champagne-500 mx-auto" />

        <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
          The creation or archival document you are seeking may have been retired to our private patrimonial vaults or the reference link has expired.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="gold" size="md" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Return to Boutique</span>
            </Button>
          </Link>

          <Link href="/shop" className="w-full sm:w-auto">
            <Button variant="outline-gold" size="md" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              <span>Explore The Vault</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
