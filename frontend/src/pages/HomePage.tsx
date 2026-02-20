import { useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ToolCard from '../components/ToolCard';
import { useGetAllTools } from '../hooks/useQueries';
import { Skeleton } from '../components/ui/skeleton';

export default function HomePage() {
  const { data: tools = [], isLoading } = useGetAllTools();

  const sortedTools = useMemo(() => {
    return [...tools].sort((a, b) => b.rankingScore - a.rankingScore);
  }, [tools]);

  const trendingTools = sortedTools.slice(0, 6);

  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    tools.forEach((tool) => {
      tool.categories.forEach((cat) => {
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
      });
    });
    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-'), count }))
      .slice(0, 6);
  }, [tools]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
          Find the Best AI Tool for Any Task
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Discover, compare, and choose from the top-ranked AI tools curated for creators, developers, and businesses.
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
          Popular Categories
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
      </section>

      {/* Trending Tools */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
          Trending AI Tools
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
