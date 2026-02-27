import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seedTools } from '@/lib/seedData';
import ProConsList from '@/components/ProConsList';

interface ToolPageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: ToolPageProps
): Promise<Metadata> {
  const tool = seedTools.find((t) => t.slug.toLowerCase() === params.slug.toLowerCase());
  const title = tool ? `${tool.name} – AI tool on RankAI` : 'Tool not found – RankAI';
  const description = tool?.description ?? 'Tool not found';
  const url = `/tool/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url
    }
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = seedTools.find((t) => t.slug.toLowerCase() === params.slug.toLowerCase());

  if (!tool) {
    return notFound();
  }

  const related = seedTools
    .filter((t) => t.slug !== tool.slug && t.categories.some((c) => tool.categories.includes(c)))
    .slice(0, 4);

  return (
    <div className="py-14 md:py-16 space-y-10">
      <header className="space-y-5 max-w-3xl">
        <div className="inline-flex items-center gap-3">
          <span className="pill text-[0.65rem]">{tool.pricing}</span>
          <span className="muted text-xs">Rating {tool.rating.toFixed(1)}</span>
        </div>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
            {tool.name}
          </h1>
          <p className="muted text-sm md:text-base">
            {tool.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem]">
          {tool.tags.map((tag) => (
            <span key={tag} className="badge-soft">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
        <div className="space-y-6">
          <div className="surface-card p-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1 text-sm">
                <p className="muted text-xs uppercase tracking-[0.18em]">
                  Best for
                </p>
                <p>
                  {tool.bestFor.join(' · ')}
                </p>
              </div>
            </div>
            <a
              href={tool.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors w-full md:w-auto"
            >
              Visit site
            </a>
          </div>

          <ProConsList pros={tool.pros} cons={tool.cons} />
        </div>

        <aside className="space-y-4">
          <div className="surface-card p-4 space-y-3 text-sm">
            <p className="muted text-xs uppercase tracking-[0.18em]">
              At a glance
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="muted text-xs">Pricing</span>
                <span className="text-xs font-medium">{tool.pricing}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="muted text-xs">Ranking score</span>
                <span className="text-xs font-medium">
                  {tool.rankingScore.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="space-y-3">
              <p className="muted text-xs uppercase tracking-[0.18em]">
                Related tools
              </p>
              <div className="space-y-2">
                {related.map((t) => (
                  <a
                    key={t.slug}
                    href={`/tool/${t.slug}`}
                    className="block rounded-2xl border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{t.name}</span>
                      <span className="muted">{t.pricing}</span>
                    </div>
                    <p className="muted line-clamp-1 mt-1">
                      {t.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
