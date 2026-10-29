import { Product, ProductFilterParams } from '@/types/product';
import { Category, Collection } from '@/types/category';
import { mockProducts } from '@/data/mockProducts';
import { mockCategories } from '@/data/mockCategories';
import { mockCollections } from '@/data/mockCollections';

export interface IProductService {
  getProducts(params?: ProductFilterParams): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(): Promise<Product[]>;
  getBestsellers(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getBridalCreations(): Promise<Product[]>;
  getRelatedProducts(currentId: string, limit?: number): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getCollections(): Promise<Collection[]>;
  getOccasions(): Promise<string[]>;
  getMaterials(): Promise<string[]>;
}

class MockProductService implements IProductService {
  private simulateDelay(_ms: number = 0): Promise<void> {
    return Promise.resolve();
  }

  async getProducts(params?: ProductFilterParams): Promise<Product[]> {
    await this.simulateDelay();
    let result = [...mockProducts];

    // Default to active items only
    result = result.filter((p) => p.status === 'active');

    if (!params) return result;

    // Filter by Category (with intelligent alias matching)
    if (params.category && params.category !== 'all') {
      const targetCategory = params.category as string;
      result = result.filter((p) => {
        if (p.category === targetCategory) return true;
        // Aliases
        if (targetCategory === 'bridal' && p.category === 'bridal-sets') return true;
        if (targetCategory === 'bridal-sets' && p.category === 'bridal') return true;
        if (targetCategory === 'necklaces' && p.category === 'necklace-sets') return true;
        if (targetCategory === 'necklace-sets' && p.category === 'necklaces') return true;
        if (targetCategory === 'earrings' && p.category === 'earrings-jhumkas') return true;
        if (targetCategory === 'earrings-jhumkas' && p.category === 'earrings') return true;
        if (targetCategory === 'bracelets' && p.category === 'bangles-bracelets') return true;
        if (targetCategory === 'bangles-bracelets' && p.category === 'bracelets') return true;
        if (targetCategory === 'bangles' && p.category === 'bangles-bracelets') return true;
        if (targetCategory === 'bangles-bracelets' && p.category === 'bangles') return true;
        if (
          targetCategory === 'rings' &&
          (p.category === 'rings' ||
            p.name.toLowerCase().includes('ring') ||
            p.name.toLowerCase().includes('band') ||
            p.subtitle.toLowerCase().includes('ring') ||
            p.subtitle.toLowerCase().includes('band'))
        ) return true;
        if (
          (targetCategory === 'traditional' || targetCategory === 'traditional-jewellery') &&
          (p.occasion === 'Puja & Traditional' ||
            p.material.toLowerCase().includes('temple') ||
            p.name.toLowerCase().includes('temple') ||
            p.description.toLowerCase().includes('temple'))
        ) return true;
        if (
          (targetCategory === 'festive-party' || targetCategory === 'festive-everyday') &&
          (p.category === 'festive-everyday' ||
            p.occasion === 'Festive & Celebrations' ||
            p.occasion === 'Cocktail & Reception')
        ) return true;
        if (
          targetCategory === 'high-jewellery' &&
          (p.isFeatured || p.price >= 2000 || p.collection === 'Imperial Sovereign')
        ) return true;
        return false;
      });
    }

    // Filter by Occasion
    if (params.occasion && params.occasion !== 'all') {
      result = result.filter(
        (p) => p.occasion && p.occasion.toLowerCase() === params.occasion?.toLowerCase()
      );
    }

    // Filter by Material
    if (params.material && params.material !== 'all') {
      const targetMat = params.material.toLowerCase();
      result = result.filter((p) => p.material && p.material.toLowerCase().includes(targetMat));
    }

    // Filter by Collection
    if (params.collection) {
      result = result.filter(
        (p) => p.collection.toLowerCase() === params.collection?.toLowerCase()
      );
    }

    // Filter by Metal
    if (params.metal && params.metal !== 'all') {
      result = result.filter((p) => p.metal === params.metal);
    }

    // Filter by Price Range Preset
    if (params.priceRange && params.priceRange !== 'all') {
      switch (params.priceRange) {
        case 'under-250':
          result = result.filter((p) => p.price < 250);
          break;
        case '250-1000':
          result = result.filter((p) => p.price >= 250 && p.price <= 1000);
          break;
        case '1000-5000':
          result = result.filter((p) => p.price > 1000 && p.price <= 5000);
          break;
        case 'above-5000':
          result = result.filter((p) => p.price > 5000);
          break;
      }
    }

    // Min and Max price bounds
    if (params.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (params.minPrice ?? 0));
    }

    if (params.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (params.maxPrice ?? Infinity));
    }

    // Full-Text Search across name, subtitle, description, material, and collection
    if (params.searchQuery) {
      const q = params.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (params.sort) {
      switch (params.sort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
          break;
        case 'popularity':
          result.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
          break;
        case 'featured':
        default:
          result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    await this.simulateDelay();
    const product = mockProducts.find((p) => p.slug === slug);
    return product || null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    await this.simulateDelay();
    return mockProducts.filter((p) => p.isFeatured && p.status === 'active');
  }

  async getBestsellers(): Promise<Product[]> {
    await this.simulateDelay();
    return mockProducts.filter((p) => p.isBestseller && p.status === 'active');
  }

  async getNewArrivals(): Promise<Product[]> {
    await this.simulateDelay();
    return mockProducts.filter((p) => p.isNew && p.status === 'active');
  }

  async getBridalCreations(): Promise<Product[]> {
    await this.simulateDelay();
    return mockProducts.filter(
      (p) => (p.category === 'bridal' || p.category === 'bridal-sets') && p.status === 'active'
    );
  }

  async getRelatedProducts(currentId: string, limit: number = 4): Promise<Product[]> {
    await this.simulateDelay();
    const current = mockProducts.find((p) => p.id === currentId);
    if (!current) return mockProducts.slice(0, limit);

    const related = mockProducts
      .filter(
        (p) =>
          p.id !== currentId &&
          p.status === 'active' &&
          (p.category === current.category ||
            p.occasion === current.occasion ||
            p.collection === current.collection)
      )
      .slice(0, limit);

    if (related.length < limit) {
      const additional = mockProducts.filter(
        (p) => p.id !== currentId && p.status === 'active' && !related.includes(p)
      );
      return [...related, ...additional].slice(0, limit);
    }

    return related;
  }

  async getCategories(): Promise<Category[]> {
    await this.simulateDelay();
    return [...mockCategories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    await this.simulateDelay();
    const cat = mockCategories.find((c) => c.slug === slug);
    return cat || null;
  }

  async getCollections(): Promise<Collection[]> {
    await this.simulateDelay();
    return [...mockCollections];
  }

  async getOccasions(): Promise<string[]> {
    return [
      'Bridal & Wedding',
      'Festive & Celebrations',
      'Cocktail & Reception',
      'Everyday Luxury',
      'Puja & Traditional',
    ];
  }

  async getMaterials(): Promise<string[]> {
    return [
      'Polki Kundan',
      '22K Gold Plated',
      '925 Sterling Silver',
      'Solid 18K Gold',
      'Antique Temple Gold',
    ];
  }
}

export const productService: IProductService = new MockProductService();
