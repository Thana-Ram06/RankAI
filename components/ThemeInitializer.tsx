"use client";

import { useEffect } from "react";

const THEME_KEY = 'rankai-theme';

export default function ThemeInitializer() {
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(THEME_KEY) : null;
    const systemPrefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const nextTheme = saved ?? (systemPrefersDark ? 'dark' : 'light');

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(nextTheme);
  }, []);

  return null;
}
