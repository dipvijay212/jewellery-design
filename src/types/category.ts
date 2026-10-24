import { CategorySlug } from './product';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  subtitle: string;
  description: string;
  image: string;
  itemCount: number;
  featured: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  inspiration: string;
  itemCount: number;
}
