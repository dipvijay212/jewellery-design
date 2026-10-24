import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { productService } from '@/services/productService';
import { formatPrice } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Gem, Plus, ArrowLeft } from 'lucide-react';

export default async function AdminProductsPage() {
  const products = await productService.getProducts();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-charcoal-700 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-charcoal-400 mb-1">
            <Link href="/admin" className="hover:text-champagne-400 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-ivory-50">
            Vault Masterpiece Inventory
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Managing {products.length} registered high jewelry assets and atelier specimens.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="gold" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            <span>Register New Piece</span>
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-charcoal-800/80 rounded-sm border border-champagne-500/20 overflow-hidden shadow-md">
        <div className="p-4 bg-charcoal-800 border-b border-charcoal-700 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-charcoal-400 font-semibold">
            All Atelier Assets ({products.length})
          </span>
          <span className="text-xs text-champagne-400 font-medium flex items-center gap-1">
            <Gem className="w-3.5 h-3.5" />
            <span>All Insured by Lloyd&apos;s</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-charcoal-700 text-[10px] uppercase tracking-widest text-charcoal-400 bg-charcoal-900/50">
                <th className="py-3 px-4 font-semibold">Piece</th>
                <th className="py-3 px-4 font-semibold">SKU</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Metal / Alloy</th>
                <th className="py-3 px-4 font-semibold">Vault Stock</th>
                <th className="py-3 px-4 font-semibold">Price (INR)</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-700/60">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-charcoal-700/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-charcoal-900 border border-charcoal-700 shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-serif font-medium text-ivory-100 text-sm">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-charcoal-400">{item.collection}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-champagne-300 font-mono text-[11px]">
                    {item.sku}
                  </td>
                  <td className="py-3 px-4 uppercase text-charcoal-300 text-[11px]">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 text-charcoal-300 text-[11px] capitalize">
                    {item.metal ? item.metal.replace(/-/g, ' ') : item.material || 'Artisan Plated'}
                  </td>
                  <td className="py-3 px-4">
                    {item.stock <= 2 ? (
                      <Badge variant="burgundy">{item.stock} in vault</Badge>
                    ) : (
                      <Badge variant="gold">{item.stock} in vault</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 font-serif font-semibold text-ivory-50 text-sm">
                    {formatPrice(item.price)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/shop/${item.slug}`}
                      target="_blank"
                      className="text-xs text-champagne-400 hover:text-champagne-200 underline font-medium"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
