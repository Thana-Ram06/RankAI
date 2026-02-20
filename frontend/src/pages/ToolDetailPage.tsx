import { useParams, Link } from '@tanstack/react-router';
import { ExternalLink, Star } from 'lucide-react';
import { useGetToolBySlug, useGetToolsByCategory } from '../hooks/useQueries';
import TagPill from '../components/TagPill';
import ProConsList from '../components/ProConsList';
import ToolCard from '../components/ToolCard';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Badge } from '../components/ui/badge';
import { Pricing } from '../backend';

export default function ToolDetailPage() {
  const { slug } = useParams({ from: '/tool/$slug' });
  const { data: tool, isLoading } = useGetToolBySlug(slug);
  const { data: relatedTools = [] } = useGetToolsByCategory(tool?.categories[0] || '');

  const related = relatedTools.filter((t) => t.slug !== slug).slice(0, 3);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Tool not found</h1>
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  const pricingLabel = tool.pricing === Pricing.free ? 'Free' : tool.pricing === Pricing.freemium ? 'Freemium' : 'Paid';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {tool.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {tool.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="secondary" className="text-sm">
                  {pricingLabel}
                </Badge>
                {tool.categories.map((cat) => (
                  <Badge key={cat} variant="outline" className="text-sm">
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{Number(tool.rating)}.0</span>
                </div>
              </div>

              <Button asChild size="lg" className="gap-2">
                <a href={tool.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink size={18} />
                </a>
              </Button>
            </div>
          </div>

          {/* Tags */}
          {tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>

        {/* Best For Section */}
        {tool.bestFor.length > 0 && (
          <section className="mb-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Best For</h2>
            <ul className="space-y-2">
              {tool.bestFor.map((item, index) => (
                <li key={index} className="text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pros & Cons */}
        {(tool.pros.length > 0 || tool.cons.length > 0) && (
          <section className="mb-12 p-6 rounded-2xl border border-border bg-card">
            <ProConsList pros={tool.pros} cons={tool.cons} />
          </section>
        )}

        {/* Related Tools */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((relatedTool) => (
                <ToolCard key={relatedTool.id.toString()} tool={relatedTool} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
