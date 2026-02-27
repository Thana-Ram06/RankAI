interface RankingBadgeProps {
  position: number;
}

const labels: Record<number, string> = {
  1: '#1',
  2: '#2',
  3: '#3'
};

export default function RankingBadge({ position }: RankingBadgeProps) {
  const label = labels[position] ?? `#${position}`;

  const tone =
    position === 1 ? 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/20 dark:text-amber-100 dark:border-amber-800' :
    position === 2 ? 'bg-neutral-50 text-neutral-900 border-neutral-200 dark:bg-neutral-900/40 dark:text-neutral-100 dark:border-neutral-700' :
    position === 3 ? 'bg-stone-50 text-stone-900 border-stone-200 dark:bg-stone-900/40 dark:text-stone-100 dark:border-stone-700' :
    'bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-900/40 dark:text-neutral-300 dark:border-neutral-800';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.65rem] font-medium tracking-[0.14em] uppercase ${tone}`}
    >
      {label}
    </span>
  );
}

