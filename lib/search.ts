import type { Tool } from '@/types/tool';
import { seedTools } from './seedData';
import { computeRankingScore } from './ranking';

type SearchableFields = Pick<Tool, 'tags' | 'bestFor' | 'categories' | 'name' | 'description'>;

function keywordMatchCount(tool: SearchableFields, terms: string[]): number {
  if (!terms.length) return 0;

  const haystack = [
    tool.name,
    tool.description,
    ...tool.tags,
    ...tool.bestFor,
    ...tool.categories
  ]
    .join(' ')
    .toLowerCase();

  return terms.reduce((count, term) => (haystack.includes(term) ? count + 1 : count), 0);
}

export async function searchTools(query: string): Promise<Tool[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const terms = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
  const tools = seedTools;

  const scored: Tool[] = [];

  for (const tool of tools) {
    const matches = keywordMatchCount(tool, terms);
    if (matches === 0) continue;

    const rankingScore = computeRankingScore(tool, matches);
    scored.push({ ...tool, rankingScore });
  }

  return scored.sort((a, b) => b.rankingScore - a.rankingScore);
}

import { Tool } from './types/tool'

export function matchQuery(tool: Tool, query: string): boolean {
  const q = query.toLowerCase()
  const hay = [ ...tool.tags, ...tool.bestFor, ...tool.categories, tool.name.toLowerCase() ].join(' ')
  return hay.includes(q)
}
