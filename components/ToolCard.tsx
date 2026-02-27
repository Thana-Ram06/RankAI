import Link from 'next/link';
import type { Tool } from '@/types/tool';
import RankingBadge from './RankingBadge';

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="surface-card p-4 md:p-5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {typeof index === 'number' && <RankingBadge position={index + 1} />}
            <h3 className="font-medium text-sm md:text-base tracking-tight">
              {tool.name}
            </h3>
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

