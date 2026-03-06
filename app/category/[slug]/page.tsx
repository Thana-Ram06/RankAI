// import type { Metadata } from 'next';
// import { getAllTools } from '@/lib/ranking';
// import ToolCard from '@/components/ToolCard';

// interface CategoryPageProps {
//   params: { slug: string };
// }

// export async function generateMetadata(
//   { params }: CategoryPageProps
// ): Promise<Metadata> {
//   const label = params.slug
//     .split('-')
//     .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
//     .join(' ');

//   const title = `${label} AI tools – RankAI`;
//   const description = `Ranked AI tools for ${label.toLowerCase()} workflows.`;

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description
//     }
//   };
// }

// export default async function CategoryPage({ params }: CategoryPageProps) {
//   const tools = (await getAllTools()).filter((tool) =>
//     tool.categories.map((c) => c.toLowerCase()).includes(params.slug.toLowerCase())
//   );

//   const label = params.slug
//     .split('-')
//     .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
//     .join(' ');

//   return (
//     <div className="py-14 md:py-16 w-full">
//       <header className="max-w-2xl space-y-3 mb-8">
//         <p className="badge-soft uppercase tracking-[0.18em] text-[0.7rem] w-fit">
//           Category
//         </p>
//         <h1 className="font-serif text-3xl md:text-4xl tracking-tight">
//           {label} AI tools
//         </h1>
//         <p className="muted text-sm">
//           Tools in this collection are sorted by their overall ranking score.
//         </p>
//       </header>
//       <div className="grid gap-4 md:grid-cols-2">
//         {tools.map((tool, index) => (
//           <ToolCard key={tool.slug} tool={tool} index={index} />
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { getAllTools } from "@/lib/ranking";
import ToolCard from "@/components/ToolCard";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [tools, setTools] = useState<any[]>([]);

  useEffect(() => {
    async function loadTools() {
      const all = await getAllTools();
      const filtered = all.filter((tool: any) =>
        tool.categories.includes(params.slug)
      );
      setTools(filtered);
    }

    loadTools();
  }, [params.slug]);

  return (
    <div className="py-14 md:py-16 w-full">
      <h1 className="text-3xl font-semibold mb-6 capitalize">
        {params.slug} AI tools
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </div>
  );
}