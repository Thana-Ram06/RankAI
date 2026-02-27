import Link from 'next/link';

interface CategoryCardProps {
  category: {
    slug: string;
    label: string;
    count: number;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className="surface-card p-4 md:p-5 flex flex-col justify-between">
      <div className="space-y-2">
        <h3 className="text-sm font-medium tracking-tight">{category.label}</h3>
        <p className="muted text-xs">
          {category.count} tool{category.count !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="mt-4 text-[0.65rem] uppercase tracking-[0.16em] text-neutral-400">
        View tools
      </div>
    </Link>
  );
}

