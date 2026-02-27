import Link from 'next/link';
import type { Tool } from '@/types/tool';
import RankingBadge from './RankingBadge';

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  return (
    <Link href={`/tool/${tool.slug}`} className="surface-card p-4 md:p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {typeof index === 'number' && <RankingBadge position={index + 1} />}
            <h3 className="font-medium text-sm md:text-base tracking-tight">{tool.name}</h3>
          </div>
          <p className="muted text-xs line-clamp-2">{tool.description}</p>
        </div>
        <span className="pill text-[0.65rem]">
          {tool.pricing}
        </span>
      </div>
      <div className="flex items-center justify-between text-[0.7rem] text-neutral-500">
        <span>Rating {tool.rating.toFixed(1)}</span>
        <span className="truncate">
          {tool.categories[0] &&
            tool.categories[0]
              .split('-')
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join(' ')}
        </span>
      </div>
    </Link>
  );
}

"use client";
import React from 'react'
import { Tool } from '../lib/types/tool'

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="border rounded-2xl p-4 hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200" />
          <div>
            <div className="font-semibold">{tool.name}</div>
            <div className="text-sm text-gray-600">{tool.description}</div>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100">{tool.pricing}</span>
      </div>
      <div className="mt-2 text-sm text-gray-700">Tags: {tool.tags.join(', ')}</div>
    </div>
  )
}
