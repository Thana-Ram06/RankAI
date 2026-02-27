"use client";

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState('');

  useEffect(() => {
    const current = searchParams.get('q') ?? '';
    setValue(current);
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set('q', value.trim());
    } else {
      params.delete('q');
    }
    router.push(`/search?${params.toString()}`);
  };

  const placeholder = compact
    ? 'Search AI tools'
    : '“Help me research a new market”';

  const inputClasses = compact
    ? 'h-9 rounded-2xl text-xs'
    : 'h-12 md:h-14 rounded-2xl text-sm md:text-base';

  return (
    <form
      onSubmit={onSubmit}
      className={`surface-card flex items-center gap-3 px-3 md:px-4 ${compact ? '' : 'shadow-soft'}`}
    >
      <div className="flex-1">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-transparent outline-none placeholder:text-neutral-400 ${inputClasses}`}
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="hidden md:inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
      >
        Search
      </button>
    </form>
  );
}

