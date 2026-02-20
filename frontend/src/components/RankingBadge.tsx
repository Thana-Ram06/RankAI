interface RankingBadgeProps {
  rank: number;
}

export default function RankingBadge({ rank }: RankingBadgeProps) {
  const colors = {
    1: 'bg-yellow-500 text-white',
    2: 'bg-gray-400 text-white',
    3: 'bg-orange-600 text-white',
  };

  const color = colors[rank as keyof typeof colors] || 'bg-primary text-primary-foreground';

  return (
    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${color} font-bold text-sm shadow-md`}>
      #{rank}
    </div>
  );
}
