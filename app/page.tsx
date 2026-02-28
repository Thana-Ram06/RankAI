import type { Metadata } from 'next';
import { getFeaturedCategories, getTrendingTools } from '@/lib/ranking';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ToolCard from '@/components/ToolCard';

export const metadata: Metadata = {
  title: 'RankAI – Find the Best AI Tool for Any Task',
  description: 'Discover curated AI tools, ranked by quality and fit across categories like writing, research, marketing, and more.'
};

export default async function HomePage() {
  const [categories, trending] = await Promise.all([
    getFeaturedCategories(),
    getTrendingTools()
  ]);

  return (
    <div className="py-20 flex-1 flex flex-col items-center">
      <section className="max-w-3xl text-center space-y-6">
        <p className="badge-soft mx-auto w-fit uppercase tracking-[0.18em] text-[0.7rem]">
          Curated AI directory
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight">
          Find the Best AI Tool for Any Task
        </h1>
        <p className="muted text-sm md:text-base max-w-xl mx-auto">
          A tightly curated index of AI products, ranked by usefulness, craft, and how well they fit real workflows.
        </p>
      </section>

      <section className="w-full max-w-2xl mt-10">
        <SearchBar />
      </section>

      <section className="w-full mt-16 space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-medium">Featured categories</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="w-full mt-16 space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-medium">Trending tools</h2>
          <p className="muted text-xs">
            Sorted by ranking score
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {trending.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

