export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-xs text-neutral-500 md:flex-row">
        <p>© {new Date().getFullYear()} RankAI. Curated AI tools for builders.</p>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">Built for fast scanning, not doomscrolling.</span>
        </div>
      </div>
    </footer>
  );
}

