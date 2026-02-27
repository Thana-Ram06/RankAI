import type { Tool } from '@/types/tool';
import { seedTools } from './seedData';

// In production you would fetch from Firestore using firebase-admin.
// For this scaffold we compute ranking on top of the seed data.

export function computeRankingScore(tool: Tool, keywordMatches: number = 0): number {
  return tool.rating * 2 + keywordMatches;
}

export async function getAllTools(): Promise<Tool[]> {
  return seedTools.map((tool) => ({
    ...tool,
    rankingScore: computeRankingScore(tool)
  }));
}

export async function getTrendingTools(limit = 6): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools
    .slice()
    .sort((a, b) => b.rankingScore - a.rankingScore)
    .slice(0, limit);
}

export async function getFeaturedCategories(): Promise<
  { slug: string; label: string; count: number }[]
> {
  const tools = await getAllTools();
  const map = new Map<string, number>();

  for (const tool of tools) {
    for (const category of tool.categories) {
      const key = category.toLowerCase();
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }

  const items = Array.from(map.entries()).map(([slug, count]) => ({
    slug,
    label: slug
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' '),
    count
  }));

  return items.sort((a, b) => b.count - a.count).slice(0, 6);
}

import { Tool } from '../lib/types/tool'

export function computeRanking(tool: Tool, query?: string): number {
  const ratingWeight = (tool.rating ?? 0) * 2
  const keywordMatches = doKeywordMatches(tool, query)
  const popularityWeight = tool.rankingScore ?? 0
  return ratingWeight + keywordMatches + popularityWeight
}

function doKeywordMatches(tool: Tool, query?: string): number {
  if (!query) return 0
  const words = query.toLowerCase().split(/\s+/).filter(w => w)
  const corpusParts = [ ...tool.tags, ...tool.bestFor, ...tool.categories ]
  const corpus = corpusParts.join(' ').toLowerCase()
  let count = 0
  for (const w of words) {
    if (corpus.includes(w)) count += 1
  }
  return count
}
