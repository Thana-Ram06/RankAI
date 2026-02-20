import { useMemo } from 'react';
import CategoryCard from '../components/CategoryCard';
import { useGetAllTools } from '../hooks/useQueries';
import { Skeleton } from '../components/ui/skeleton';

export default function CategoriesPage() {
  const { data: tools = [], isLoading } = useGetAllTools();

  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    tools.forEach((tool) => {
      tool.categories.forEach((cat) => {
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
      });
    });
    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-'), count }))
      .sort((a, b) => b.count - a.count);
  }, [tools]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
          Browse Categories
        </h1>
        <p className="text-lg text-muted-foreground mb-12 text-center">
          Explore AI tools organized by category
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
