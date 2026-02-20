import { Link } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  slug: string;
  count?: number;
}

export default function CategoryCard({ name, slug, count }: CategoryCardProps) {
  return (
    <Link 
      to="/category/$slug" 
      params={{ slug }}
      className="block group"
    >
      <div className="p-6 rounded-2xl border border-border bg-card hover:shadow-md hover:scale-[1.02] transition-all duration-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles size={20} className="text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>
        {count !== undefined && (
          <p className="text-sm text-muted-foreground">
            {count} {count === 1 ? 'tool' : 'tools'}
          </p>
        )}
      </div>
    </Link>
  );
}
