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


export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-xs text-neutral-500 md:flex-row">
        
        <p>
          © {new Date().getFullYear()} RankAI. Curated AI tools for builders.
        </p>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline">
            Built for fast scanning, not doomscrolling.
          </span>

          {/* PIPE + LINK */}
          <span className="hidden md:inline">|</span>

          <a
            href="https://x.com/anoinv?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline hover:underline text-black dark:text-white"
          >
            Made by me
          </a>
        </div>

      </div>
    </footer>
  );
}