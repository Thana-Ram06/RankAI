export type PricingTier = 'Free' | 'Freemium' | 'Paid';

export interface Tool {
  name: string;
  slug: string;
  description: string;
  categories: string[];
  pricing: PricingTier;
  website: string;
  rating: number;
  rankingScore: number;
  tags: string[];
  bestFor: string[];
  pros: string[];
  cons: string[];
  createdAt: Date;
}

