interface ProConsListProps {
  pros: string[];
  cons: string[];
}

export default function ProConsList({ pros, cons }: ProConsListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="surface-card p-4 space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-emerald-500">
          Pros
        </p>
        <ul className="space-y-2 text-sm">
          {pros.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="surface-card p-4 space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-rose-500">
          Cons
        </p>
        <ul className="space-y-2 text-sm">
          {cons.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

