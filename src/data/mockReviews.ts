export interface CustomerReview {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  verifiedBuyer: boolean;
  title: string;
  content: string;
  productName: string;
  productSlug: string;
  date: string;
  avatar?: string;
  isSampleContent: true;
}

export const mockReviews: CustomerReview[] = [
  {
    id: 'rev-001',
    customerName: 'Ananya Singhania',
    location: 'Mumbai & London',
    rating: 5,
    verifiedBuyer: true,
    title: 'The Solitaire Trousseau Suite Surpassed Every Expectation',
    content:
      'We visited the private salon for our wedding trousseau. The craftsmanship of the oval brilliant solitaire and matching eternity band is incomparable. The warmth of the champagne gold alloy sets it completely apart from commercial luxury houses.',
    productName: 'Aurelia Grand Solitaire Diamond Ring',
    productSlug: 'aurelia-grand-solitaire-diamond-ring',
    date: 'September 2026',
    isSampleContent: true,
  },
  {
    id: 'rev-002',
    customerName: 'Gayatri Devi Chawla',
    location: 'New Delhi',
    rating: 5,
    verifiedBuyer: true,
    title: 'Heirloom Quality Worthy of Royal Heritage',
    content:
      'The Muzo emerald in my collier possesses the deep incandescent forest fire that only natural, untreated Colombian stones exhibit. The armored courier delivery to our residence in Delhi was discreet, impeccably insured, and packaged in a velvet coffer.',
    productName: 'Imperial Colombian Emerald & Diamond Collier',
    productSlug: 'imperial-colombian-emerald-diamond-collier',
    date: 'August 2026',
    isSampleContent: true,
  },
  {
    id: 'rev-003',
    customerName: 'Meera & Rohan Kothari',
    location: 'Dubai & New York',
    rating: 5,
    verifiedBuyer: true,
    title: 'Master Goldsmiths Who Understand Grand Indian Weddings',
    content:
      'Finding high jewellery that seamlessly bridges contemporary gala evenings with traditional Indian bridal ceremony attire is rare. The chandelier drops catch candlelight like floating starlight.',
    productName: 'Celestial Diamond Chandelier Drops',
    productSlug: 'celestial-diamond-chandelier-drops',
    date: 'October 2026',
    isSampleContent: true,
  },
  {
    id: 'rev-004',
    customerName: 'Natasha Poonawalla-Vance',
    location: 'Mayfair, London',
    rating: 5,
    verifiedBuyer: true,
    title: 'Unrivaled Setting Under 40x Magnification',
    content:
      'I had our independent gemologist inspect the claw mountings. Not a single microscopic imperfection was detected. Truly an elite boutique maison upholding ancient European and Indian joaillerie savoir-faire.',
    productName: 'Eternal Promise Emerald Cut Eternity Band',
    productSlug: 'eternal-promise-emerald-cut-eternity-band',
    date: 'July 2026',
    isSampleContent: true,
  },
];
