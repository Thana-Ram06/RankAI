// export default function Footer() {
//   return (
//     <footer className="border-t border-neutral-200 dark:border-neutral-800">
//       <div className="container flex flex-col items-center justify-between gap-4 py-8 text-xs text-neutral-500 md:flex-row">
//         <p>© {new Date().getFullYear()} RankAI. Curated AI tools for builders.</p>
//         <div className="flex items-center gap-4">
//           <span className="hidden md:inline">Built for fast scanning, not doomscrolling.</span>
//         </div>
//       </div>
//     </footer>
//   );
// }



"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">RankAI</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Discover and explore the best AI tools for your workflow.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Built for fast scanning, not doomscrolling.{" "}
            <span className="mx-2">|</span>
            <a
              href="https://x.com/anoinv?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white font-medium hover:underline"
            >
              Made by me
            </a>
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs text-neutral-500 dark:text-neutral-600 pb-6">
        © {new Date().getFullYear()} RankAI
      </div>
    </footer>
  );
}