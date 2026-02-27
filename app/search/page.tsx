import type { Metadata } from 'next';
import { seedTools } from '@/lib/seedData';
import ToolCard from '@/components/ToolCard';
import SearchBar from '@/components/SearchBar';

interface SearchPageProps {
  searchParams: { q?: string };
}

export const metadata: Metadata = {
  title: 'Search AI tools – RankAI',
  description: 'Natural language search across the RankAI directory of curated AI tools.'
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() ?? '';
  const results = query
    ? seedTools.filter((tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    : [];

  return (
    <div className="py-14 md:py-16 space-y-10">
      <header className="space-y-4 max-w-2xl">
        <p className="badge-soft uppercase tracking-[0.18em] text-[0.7rem] w-fit">
          Search
        </p>
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight">
          What do you want to get done?
        </h1>
        <p className="muted text-sm">
          Ask in natural language. We match against categories, tags, best fits, and descriptions.
        </p>
      </header>

      <div className="max-w-2xl">
        <SearchBar />
      </div>

      <section className="space-y-4">
        {query && (
          <p className="muted text-xs">
            Showing {results.length} result{results.length !== 1 ? 's' : ''} for “{query}”.
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
