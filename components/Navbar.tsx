"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import SearchBar from './SearchBar';

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showInlineSearch = pathname === '/' && !searchParams.get('q');

  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold">
            AI
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">RankAI</span>
            <span className="muted text-[0.7rem]">Curated AI directory</span>
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          {showInlineSearch ? (
            <div className="hidden md:block w-64">
              <SearchBar compact />
            </div>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

