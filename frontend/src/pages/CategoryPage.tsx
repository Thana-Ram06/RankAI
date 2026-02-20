import { useState, useMemo } from 'react';
import { useParams } from '@tanstack/react-router';
import { Filter } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import SortingControls from '../components/SortingControls';
import FilterDrawer from '../components/FilterDrawer';
import { useGetAllTools } from '../hooks/useQueries';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { Pricing } from '../backend';

export default function CategoryPage() {
  const { slug } = useParams({ from: '/category/$slug' });
  const { data: allTools = [], isLoading } = useGetAllTools();
  const [sortBy, setSortBy] = useState('top-rated');
  const [pricingFilters, setPricingFilters] = useState<string[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const filteredAndSortedTools = useMemo(() => {
    let filtered = allTools.filter((tool) =>
      tool.categories.some((cat) => cat.toLowerCase().replace(/\s+/g, '-') === slug)
    );

    if (pricingFilters.length > 0) {
      filtered = filtered.filter((tool) => pricingFilters.includes(tool.pricing));
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'top-rated') {
        return Number(b.rating) - Number(a.rating);
      } else if (sortBy === 'most-popular') {
        return Number(b.rankingScore) - Number(a.rankingScore);
      } else if (sortBy === 'free') {
        if (a.pricing === Pricing.free && b.pricing !== Pricing.free) return -1;
        if (a.pricing !== Pricing.free && b.pricing === Pricing.free) return 1;
        return Number(b.rankingScore) - Number(a.rankingScore);
      }
      return 0;
    });

    return sorted;
  }, [allTools, slug, sortBy, pricingFilters]);

  const handlePricingFilterChange = (pricing: string, checked: boolean) => {
    setPricingFilters((prev) =>
      checked ? [...prev, pricing] : prev.filter((p) => p !== pricing)
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {categoryName}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {filteredAndSortedTools.length} {filteredAndSortedTools.length === 1 ? 'tool' : 'tools'} found
        </p>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card">
              <SortingControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                pricingFilters={pricingFilters}
                onPricingFilterChange={handlePricingFilterChange}
              />
            </div>
          </aside>

          {/* Tools List */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="md:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setFilterDrawerOpen(true)}
                className="w-full"
              >
                <Filter size={18} className="mr-2" />
                Filters & Sort
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-2xl" />
                ))}
              </div>
            ) : filteredAndSortedTools.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tools found in this category.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAndSortedTools.map((tool, index) => (
                  <ToolCard key={tool.id.toString()} tool={tool} rank={index + 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        pricingFilters={pricingFilters}
        onPricingFilterChange={handlePricingFilterChange}
      />
    </div>
  );
}
