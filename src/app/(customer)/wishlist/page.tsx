'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { LUXURY_EASE } from '@/utils/animations';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { items, count, remove, clear } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20 bg-ivory-100 min-h-[70vh] flex items-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
          >
            <EmptyState
              icon={<Heart className="w-8 h-8 text-burgundy-800" />}
              title="Your Wishlist is Empty"
              description="Preserve your favored creations to compare gemstones, review ring sizes, or share with your personal atelier concierge."
              actionLabel="Explore The Collection"
              actionHref="/shop"
            />
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-14 bg-ivory-100 min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: LUXURY_EASE }}
          className="flex flex-col sm:flex-row items-baseline justify-between mb-10 pb-6 border-b border-ivory-300"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-600 font-semibold mb-1 block">
              Curated Favorites
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light">
              Your Private Wishlist
            </h1>
            <p className="text-xs text-charcoal-500 mt-1">
              {count} {count === 1 ? 'favored masterpiece' : 'favored masterpieces'} preserved in your personal vault portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={clear}
            className="text-xs text-charcoal-400 hover:text-burgundy-800 uppercase tracking-wider font-medium mt-4 sm:mt-0 transition-colors"
          >
            Clear Entire Wishlist
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <motion.div
                layout
                key={item.product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: 0.2, ease: LUXURY_EASE },
                }}
                transition={{ duration: 0.25, ease: LUXURY_EASE }}
                className="bg-white rounded-sm border border-ivory-300 overflow-hidden flex flex-col justify-between group shadow-2xs hover:border-champagne-500/60 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full bg-ivory-100 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => remove(item.product.id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-charcoal-500 hover:text-burgundy-800 transition-colors shadow-xs"
                      aria-label={`Remove ${item.product.name} from wishlist`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-wider text-champagne-700 font-medium">
                      {item.product.collection}
                    </span>
                    <Link href={`/shop/${item.product.slug}`}>
                      <h3 className="font-serif text-base text-charcoal-900 hover:text-champagne-700 font-normal leading-snug line-clamp-1 mt-1 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <div className="font-serif text-base font-semibold text-charcoal-900 mt-2">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="gold"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        addItem(item.product, 1);
                        remove(item.product.id);
                      }}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                      <span>Transfer to Bag</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
