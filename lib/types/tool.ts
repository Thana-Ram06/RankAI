export type Tool = {
  name: string
  slug: string
  description: string
  categories: string[]
  pricing: 'Free' | 'Freemium' | 'Paid'
  website: string
  rating: number
  rankingScore?: number
  tags: string[]
  bestFor: string[]
  pros: string[]
  cons: string[]
  createdAt?: any
  updatedAt?: any
  logoUrl?: string
}
