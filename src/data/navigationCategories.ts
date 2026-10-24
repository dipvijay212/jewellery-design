export interface NavSubcategory {
  id: string;
  name: string;
  href: string;
  description: string;
}

export interface NavFeaturedPiece {
  name: string;
  image: string;
  price: number;
  href: string;
  tag: string;
}

export interface NavCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  badge?: string;
  isDirectLink?: boolean;
  featuredPiece?: NavFeaturedPiece;
  subcategories: NavSubcategory[];
}

export const navigationCategories: NavCategory[] = [
  {
    id: 'bridal-jewellery',
    name: 'Bridal Jewellery',
    slug: 'bridal-jewellery',
    href: '/shop?category=bridal-sets',
    description: 'Regal wedding chokers, jadau suites, and trousseau heirloom sets',
    badge: 'Heirloom',
    featuredPiece: {
      name: 'Maharani Heritage Polki Bridal Choker Set',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
      price: 3450,
      href: '/shop/maharani-heritage-polki-bridal-choker-set',
      tag: 'Imperial Sovereign',
    },
    subcategories: [
      {
        id: 'bridal-sets',
        name: 'Bridal Sets',
        href: '/shop?category=bridal-sets',
        description: 'Complete trousseau suites with coordinated chokers and ear hangs',
      },
      {
        id: 'bridal-kundan',
        name: 'Kundan',
        href: '/shop?search=Kundan',
        description: 'Handcrafted glass cabochons set in 22K gold foil setting',
      },
      {
        id: 'bridal-polki',
        name: 'Polki-Inspired Jewellery',
        href: '/shop?search=Polki',
        description: 'Uncut gemstone elegance with reverse meenakari detailing',
      },
      {
        id: 'bridal-chokers',
        name: 'Bridal Chokers',
        href: '/shop?search=Choker',
        description: 'Regal contoured gulbandh and high-collar neckpieces',
      },
      {
        id: 'bridal-accessories',
        name: 'Wedding Accessories',
        href: '/shop?category=maang-tikka-accessories',
        description: 'Statement maang tikkas, passas, and articulated haathphools',
      },
    ],
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    slug: 'necklaces',
    href: '/shop?category=necklace-sets',
    description: 'From majestic rani haars to contemporary diamond tennis colliers',
    featuredPiece: {
      name: 'Gulmohar Emerald & Crystal Collier Set',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
      price: 2100,
      href: '/shop/gulmohar-emerald-crystal-collier-set',
      tag: 'Imperial Sovereign',
    },
    subcategories: [
      {
        id: 'necklace-sets',
        name: 'Necklace Sets',
        href: '/shop?category=necklace-sets',
        description: 'Coordinated necklace and earring ensembles for regal occasions',
      },
      {
        id: 'necklaces-chokers',
        name: 'Chokers',
        href: '/shop?search=Choker',
        description: 'Layered seed pearl collars and articulated polki chokers',
      },
      {
        id: 'necklaces-long',
        name: 'Long Necklaces',
        href: '/shop?search=Haar',
        description: 'Cascading seven-string rani haars and royal pendants',
      },
      {
        id: 'necklaces-pendant-sets',
        name: 'Pendant Sets',
        href: '/shop?search=Pendant',
        description: 'Temple coin medallions and delicate everyday luxury pendants',
      },
    ],
  },
  {
    id: 'earrings',
    name: 'Earrings',
    slug: 'earrings',
    href: '/shop?category=earrings-jhumkas',
    description: 'Cascading radiance — temple bell jhumkas, crescent chandbalis, and studs',
    featuredPiece: {
      name: 'Chandrika Jadau Moon Chandbali Earrings',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
      price: 780,
      href: '/shop/chandrika-jadau-moon-chandbali-earrings',
      tag: 'Imperial Sovereign',
    },
    subcategories: [
      {
        id: 'earrings-jhumkas',
        name: 'Jhumkas',
        href: '/shop?category=earrings-jhumkas&search=Jhumka',
        description: 'Architectural temple gold dome jhumkas with hanging pearl drops',
      },
      {
        id: 'earrings-studs',
        name: 'Studs',
        href: '/shop?category=earrings-jhumkas&search=Stud',
        description: 'Minimal solitaire diamond studs and 18K yellow gold buttons',
      },
      {
        id: 'earrings-chandbalis',
        name: 'Chandbalis',
        href: '/shop?category=earrings-jhumkas&search=Chandbali',
        description: 'Crescent moon jadau drops with onyx beads and pearl fringes',
      },
      {
        id: 'earrings-drops',
        name: 'Drop Earrings',
        href: '/shop?category=earrings-jhumkas&search=Drops',
        description: 'Celestial diamond chandelier dangles and evening drops',
      },
      {
        id: 'earrings-statement',
        name: 'Statement Earrings',
        href: '/shop?category=earrings-jhumkas',
        description: 'Opulent ear adornments designed for receptions and red-carpet galas',
      },
    ],
  },
  {
    id: 'rings',
    name: 'Rings',
    slug: 'rings',
    href: '/shop?category=rings',
    description: 'Cushion-cut solitaires, open-set cocktail rings, and gemstone eternity bands',
    featuredPiece: {
      name: 'Aurelia Grand Solitaire Diamond Bridal Ring Set',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
      price: 1480,
      href: '/shop/aurelia-grand-solitaire-diamond-bridal-ring-set',
      tag: 'Lumière Éternelle',
    },
    subcategories: [
      {
        id: 'rings-statement',
        name: 'Statement Rings',
        href: '/shop?category=rings&search=Ring',
        description: 'Grand solitaires and cocktail rings with prong & pavé crowns',
      },
      {
        id: 'rings-fashion',
        name: 'Fashion Rings',
        href: '/shop?category=rings&search=Band',
        description: 'Stackable micro-pavé contour bands and Navratna eternity rings',
      },
    ],
  },
  {
    id: 'bangles-bracelets',
    name: 'Bangles & Bracelets',
    slug: 'bangles-bracelets',
    href: '/shop?category=bangles-bracelets',
    description: 'Sculpted filigree kangans, openable kadas, and champagne line tennis bracelets',
    featuredPiece: {
      name: 'Kada-E-Shahi Antique Filigree Bangle Pair',
      image: 'https://images.unsplash.com/photo-1611591475870-802c0199e1ee?auto=format&fit=crop&w=900&q=80',
      price: 1620,
      href: '/shop/kada-e-shahi-antique-filigree-bangle-pair',
      tag: 'Imperial Sovereign',
    },
    subcategories: [
      {
        id: 'bangles',
        name: 'Bangles',
        href: '/shop?category=bangles-bracelets&search=Bangle',
        description: 'Antique 22K micron gold filigree paired wrist adornments',
      },
      {
        id: 'kada',
        name: 'Kada',
        href: '/shop?search=Kada',
        description: 'Articulated openable cuff kadas with floral meenakari enamel',
      },
      {
        id: 'bracelets',
        name: 'Bracelets',
        href: '/shop?category=bangles-bracelets&search=Bracelet',
        description: 'Champagne diamond tennis bracelets and delicate protection charms',
      },
    ],
  },
  {
    id: 'traditional-jewellery',
    name: 'Traditional Jewellery',
    slug: 'traditional-jewellery',
    href: '/shop?occasion=Puja%20%26%20Traditional',
    description: 'Sacred temple coin carvings, antique nakshi deities, and heritage suites',
    badge: 'Auspicious',
    featuredPiece: {
      name: 'Mayur Temple Gold Dome Jhumkas',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
      price: 890,
      href: '/shop/mayur-temple-gold-dome-jhumkas',
      tag: 'Imperial Sovereign',
    },
    subcategories: [
      {
        id: 'traditional-temple',
        name: 'Temple-Inspired Jewellery',
        href: '/shop?search=Temple',
        description: 'Antique finish nakshi peacocks, coin carvings, and heritage gold',
      },
      {
        id: 'traditional-sets',
        name: 'Traditional Sets',
        href: '/shop?occasion=Puja%20%26%20Traditional',
        description: 'Auspicious puja ceremony and religious festival adornments',
      },
    ],
  },
  {
    id: 'festive-party',
    name: 'Festive & Party Wear',
    slug: 'festive-party',
    href: '/shop?occasion=Festive%20%26%20Celebrations',
    description: 'Radiant modern splendor for sangeet soirees, receptions, and cocktail galas',
    featuredPiece: {
      name: 'Pari Kundan Openable Cuff Bracelet',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
      price: 940,
      href: '/shop/pari-kundan-openable-cuff-bracelet',
      tag: 'Imperial Sovereign',
    },
    subcategories: [
      {
        id: 'festive-sets',
        name: 'Festive Sets',
        href: '/shop?occasion=Festive%20%26%20Celebrations',
        description: 'Vibrant celebratory suites for family celebrations and Diwali galas',
      },
      {
        id: 'party-wear',
        name: 'Party Wear Jewellery',
        href: '/shop?occasion=Cocktail%20%26%20Reception',
        description: 'Contemporary evening glamour, pavé diamond hoops, and cocktail rings',
      },
    ],
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    href: '/shop?sort=newest',
    description: 'Freshly unveiled creations directly from our Rajasthan and Parisian ateliers',
    badge: 'Latest',
    isDirectLink: true,
    subcategories: [],
  },
];
