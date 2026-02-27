export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-neutral-500 md:flex-row">
        <p>© {new Date().getFullYear()} RankAI. Curated AI tools for builders.</p>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">Built for fast scanning, not doomscrolling.</span>
        </div>
      </div>
    </footer>
  );
}

"use client";
import React from 'react'

export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-neutral-200 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} RankAI
    </footer>
  )
}
