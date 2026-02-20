interface TagPillProps {
  tag: string;
}

export default function TagPill({ tag }: TagPillProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
      {tag}
    </span>
  );
}
