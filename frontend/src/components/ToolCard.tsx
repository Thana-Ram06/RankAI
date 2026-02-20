import { Link } from '@tanstack/react-router';
import type { Tool } from '../backend';
import { Pricing } from '../backend';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  rank?: number;
}

export default function ToolCard({ tool, rank }: ToolCardProps) {
  const pricingLabel = tool.pricing === Pricing.free ? 'Free' : tool.pricing === Pricing.freemium ? 'Freemium' : 'Paid';
  const pricingColor = tool.pricing === Pricing.free ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                       tool.pricing === Pricing.freemium ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                       'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';

  return (
    <Link 
      to="/tool/$slug" 
      params={{ slug: tool.slug }}
      className="block group"
    >
      <div className="relative p-6 rounded-2xl border border-border bg-card hover:shadow-md hover:scale-[1.02] transition-all duration-200">
        {rank && rank <= 3 && (
          <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
            #{rank}
          </div>
        )}
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {tool.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-1 rounded-full ${pricingColor}`}>
                {pricingLabel}
              </span>
              {tool.categories.slice(0, 2).map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span>{Number(tool.rating)}.0</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
