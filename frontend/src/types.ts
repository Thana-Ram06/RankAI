export const Pricing = {
  Free: 'free',
  Freemium: 'freemium',
  Paid: 'paid',
} as const;

export type Pricing = typeof Pricing[keyof typeof Pricing];

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  categories: string[];
  pricing: Pricing;
  website: string;
  rating: number;
  rankingScore: number;
  tags: string[];
  bestFor: string[];
  pros: string[];
  cons: string[];
}
