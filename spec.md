# Specification

## Summary
**Goal:** Build RankAI, an AI tool directory with smart search, ranking algorithm, and premium minimal UI inspired by tpot.cc.

**Planned changes:**
- Create Motoko backend with Tool type (id, name, slug, description, categories, pricing, website, rating, rankingScore, tags, bestFor, pros, cons, timestamps)
- Implement backend methods: addTool, getAllTools, getToolBySlug, getToolsByCategory, searchTools (keyword matching against tags, bestFor, categories)
- Seed backend with 8-10 example AI tools across multiple categories with realistic data
- Implement ranking algorithm: rankingScore = (rating * 2) + keywordMatches + popularityWeight, with search results sorted descending
- Build homepage with hero section (Instrument Serif heading, large search bar, popular categories grid, trending tools)
- Create category page (/category/:slug) with sorting options (Top Rated, Free, Most Popular), pricing filter, vertical card list, ranking badges for top 3
- Create tool detail page (/tool/:slug) with full tool info, pros/cons lists, Best For section, Visit Website button, related tools
- Implement smart search that matches queries against tags, bestFor, categories and sorts by rankingScore
- Apply premium minimal SaaS design: center-aligned layout, generous whitespace, soft borders, rounded-2xl/3xl corners, clean cards, smooth hover transitions
- Configure typography: Instrument Serif for hero headings only, Inter for all body text
- Implement dark/light theme toggle: pure white in light mode, soft neutral gray (NOT black) in dark mode
- Create responsive mobile design: single column, sticky bottom search, collapsible filters, large tap targets
- Build navbar with RankAI logo, Categories link, Submit Tool placeholder, theme toggle, responsive mobile menu
- Integrate Internet Identity authentication for admin route /admin with Add New Tool form
- Add subtle animations: fade-in on load, smooth hover scale (200ms), smooth theme transitions

**User-visible outcome:** Users can browse and search AI tools by category or keyword, view detailed tool information with pros/cons, toggle between light/dark themes, and admins can add new tools via Internet Identity authentication. The interface features a premium minimal design with clean typography and smooth interactions.
