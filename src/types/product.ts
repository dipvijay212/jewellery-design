export type MetalType =
  | '18k-yellow-gold'
  | '18k-white-gold'
  | '18k-rose-gold'
  | 'platinum-950';

export type GemstoneType =
  | 'diamond'
  | 'colombian-emerald'
  | 'ceylon-sapphire'
  | 'burmese-ruby'
  | 'south-sea-pearl'
  | 'champagne-diamond'
  | 'polki-kundan'
  | 'none';

export type CategorySlug =
  | 'bridal-sets'
  | 'kundan-polki'
  | 'necklace-sets'
  | 'earrings-jhumkas'
  | 'bangles-bracelets'
  | 'bangles'
  | 'maang-tikka-accessories'
  | 'festive-everyday'
  | 'rings'
  | 'necklaces'
  | 'earrings'
  | 'bracelets'
  | 'traditional'
  | 'traditional-jewellery'
  | 'festive-party'
  | 'high-jewellery'
  | 'bridal';

export type OccasionType =
  | 'Bridal & Wedding'
  | 'Festive & Celebrations'
  | 'Cocktail & Reception'
  | 'Everyday Luxury'
  | 'Puja & Traditional';

export type ProductStatus = 'active' | 'draft';

export interface ProductSpecification {
  metal?: string;
  purity?: string;
  totalCaratWeight?: string;
  gemstoneClarity?: string;
  gemstoneColor?: string;
  hallmark?: string;
  origin?: string;
  baseMaterial?: string;
  plating?: string;
  closureType?: string;
  weightGrams?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: CategorySlug;
  collection: string;
  material: string;
  occasion: OccasionType | string;
  stock: number;
  isFeatured?: boolean;
  status: ProductStatus;
  images: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  sku: string;
  careInstructions?: string[];
  popularity?: number; // 1 - 100 score for sorting
  createdAt?: string;  // ISO date for sorting by newest
  metal?: MetalType;
  gemstone?: GemstoneType;
  caratWeight?: number;
  specifications?: ProductSpecification;
  availableSizes?: string[];
  certification?: string;
}

export interface ProductFilterParams {
  category?: CategorySlug | 'all';
  collection?: string;
  metal?: MetalType | 'all';
  gemstone?: GemstoneType | 'all';
  material?: string | 'all';
  occasion?: string | 'all';
  priceRange?: 'all' | 'under-250' | '250-1000' | '1000-5000' | 'above-5000';
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price-asc' | 'price-desc' | 'featured' | 'newest' | 'popularity';
  searchQuery?: string;
  status?: ProductStatus;
  page?: number;
  pageSize?: number;
}
