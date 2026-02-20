import { useSearch } from '@tanstack/react-router';
import SearchBar from '../components/SearchBar';
import ToolCard from '../components/ToolCard';
import { useSearchTools } from '../hooks/useQueries';
import { Skeleton } from '../components/ui/skeleton';

export default function SearchResultsPage() {
  const search = useSearch({ from: '/search' });
  const query = (search as any).q || '';
  const { data: results = [], isLoading } = useSearchTools(query);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Search Results
        </h1>

        <div className="mb-12">
          <SearchBar defaultValue={query} autoFocus />
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-2">No tools found</p>
            <p className="text-sm text-muted-foreground">
              Try different keywords or browse our categories
            </p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              Found {results.length} {results.length === 1 ? 'tool' : 'tools'}
            </p>
            <div className="space-y-6">
              {results.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
