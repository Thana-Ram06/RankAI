"use client";

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_KEY = 'rankai-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    const saved = (window.localStorage.getItem(THEME_KEY) as Theme | null) ?? undefined;
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initial: Theme = saved ?? (systemPrefersDark ? 'dark' : 'light');
    root.classList.remove('light', 'dark');
    root.classList.add(initial);
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(next);
    window.localStorage.setItem(THEME_KEY, next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-9 items-center rounded-full border border-neutral-200 dark:border-neutral-800 px-3 text-xs font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}

