import type { Tool } from '../types';

export const mockTools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'Advanced AI assistant powered by OpenAI\'s GPT-4 model. Excellent for conversation, writing, coding, and problem-solving tasks.',
    categories: ['Writing', 'Productivity'],
    pricing: 'freemium',
    website: 'https://chat.openai.com',
    rating: 4.8,
    rankingScore: 11.6,
    tags: ['AI Assistant', 'Conversational AI', 'Writing'],
    bestFor: ['Content creation', 'Coding assistance', 'Research help'],
    pros: ['Highly capable', 'Natural conversation', 'Wide knowledge base'],
    cons: ['Can hallucinate', 'Limited knowledge cutoff']
  },
  {
    id: '2',
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'Powerful AI image generation tool that creates stunning artwork from text descriptions. Leading the pack in artistic AI generation.',
    categories: ['Image Generation', 'Design'],
    pricing: 'paid',
    website: 'https://midjourney.com',
    rating: 4.9,
    rankingScore: 11.8,
    tags: ['AI Art', 'Image Generation', 'Design'],
    bestFor: ['Artistic creation', 'Concept art', 'Visual design'],
    pros: ['Exceptional image quality', 'Artistic style', 'Continuous improvements'],
    cons: ['Paid only', 'Discord-based interface']
  },
  {
    id: '3',
    name: 'Claude',
    slug: 'claude',
    description: 'Anthropic\'s AI assistant focused on being helpful, harmless, and honest. Great for analysis, writing, and coding tasks.',
    categories: ['Writing', 'Productivity'],
    pricing: 'freemium',
    website: 'https://claude.ai',
    rating: 4.7,
    rankingScore: 11.4,
    tags: ['AI Assistant', 'Analysis', 'Coding'],
    bestFor: ['Long-form writing', 'Code review', 'Data analysis'],
    pros: ['Large context window', 'Thoughtful responses', 'Strong ethics'],
    cons: ['Less creative than competitors']
  },
  {
    id: '4',
    name: 'DALL-E 3',
    slug: 'dalle-3',
    description: 'OpenAI\'s latest image generation model with improved understanding and quality. Integrated into ChatGPT for seamless creation.',
    categories: ['Image Generation', 'Design'],
    pricing: 'paid',
    website: 'https://openai.com/dall-e-3',
    rating: 4.6,
    rankingScore: 11.2,
    tags: ['AI Art', 'Image Generation', 'Design'],
    bestFor: ['Commercial design', 'Product visualization', 'Marketing assets'],
    pros: ['High quality output', 'ChatGPT integration', 'Text rendering'],
    cons: ['Credit-based system', 'Limited free access']
  },
  {
    id: '5',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'AI-powered code completion tool that suggests code in real-time. Trained on billions of lines of code.',
    categories: ['Developer Tools', 'Productivity'],
    pricing: 'freemium',
    website: 'https://github.com/features/copilot',
    rating: 4.5,
    rankingScore: 11.0,
    tags: ['Code Completion', 'Developer Tools', 'AI'],
    bestFor: ['Coding assistance', 'Learning new languages', 'Boilerplate code'],
    pros: ['Context-aware suggestions', 'Multiple IDEs support', 'Speed up development'],
    cons: ['Subscription cost', 'Occasional incorrect suggestions']
  },
  {
    id: '6',
    name: 'Jasper',
    slug: 'jasper',
    description: 'AI writing assistant designed for marketing teams. Creates blog posts, ads, emails, and social media content.',
    categories: ['Writing', 'Marketing'],
    pricing: 'paid',
    website: 'https://jasper.ai',
    rating: 4.4,
    rankingScore: 10.8,
    tags: ['Content Writing', 'Marketing', 'SEO'],
    bestFor: ['Marketing content', 'SEO optimization', 'Brand voice'],
    pros: ['Templates for various content', 'Brand voice customization', 'Multi-language'],
    cons: ['Monthly subscription', 'Quality varies']
  },
  {
    id: '7',
    name: 'Notion AI',
    slug: 'notion-ai',
    description: 'AI-powered writing assistant integrated into Notion. Helps with brainstorming, editing, and summarizing notes.',
    categories: ['Productivity', 'Writing'],
    pricing: 'freemium',
    website: 'https://notion.so/product/ai',
    rating: 4.5,
    rankingScore: 11.0,
    tags: ['Productivity', 'Writing', 'Notes'],
    bestFor: ['Note-taking', 'Document editing', 'Meeting notes'],
    pros: ['Seamless Notion integration', 'Quick summaries', 'Idea generation'],
    cons: ['Requires Notion subscription', 'Limited outside Notion']
  },
  {
    id: '8',
    name: 'Runway',
    slug: 'runway',
    description: 'Creative suite for AI-powered video editing and generation. Includes text-to-video, editing tools, and more.',
    categories: ['Video Editing', 'Image Generation'],
    pricing: 'freemium',
    website: 'https://runwayml.com',
    rating: 4.6,
    rankingScore: 11.2,
    tags: ['Video Generation', 'Video Editing', 'AI Creative'],
    bestFor: ['Video creation', 'Post-production', 'Creative projects'],
    pros: ['Innovative features', 'Professional tools', 'Regular updates'],
    cons: ['Learning curve', 'Credit-based system']
  },
  {
    id: '9',
    name: 'Perplexity',
    slug: 'perplexity',
    description: 'AI-powered search engine that provides direct answers with sources. Combines search and Q&A capabilities.',
    categories: ['Research', 'Productivity'],
    pricing: 'freemium',
    website: 'https://perplexity.ai',
    rating: 4.7,
    rankingScore: 11.4,
    tags: ['Search', 'Research', 'AI Assistant'],
    bestFor: ['Research', 'Fact-finding', 'Summarization'],
    pros: ['Cited sources', 'Conversation follow-ups', 'Fast answers'],
    cons: ['Limited free queries', 'May miss nuance']
  },
  {
    id: '10',
    name: 'Grammarly',
    slug: 'grammarly',
    description: 'AI-powered writing assistant for grammar, spelling, and style. Available as browser extension and desktop app.',
    categories: ['Writing', 'Productivity'],
    pricing: 'freemium',
    website: 'https://grammarly.com',
    rating: 4.6,
    rankingScore: 11.2,
    tags: ['Grammar', 'Writing Assistant', 'Productivity'],
    bestFor: ['Proofreading', 'Style improvement', 'Professional writing'],
    pros: ['Real-time suggestions', 'Multiple platforms', 'Tone detection'],
    cons: ['Privacy concerns', 'Premium features limited']
  }
];

export function getAllTools(): Tool[] {
  return mockTools;
}

export function getToolBySlug(slug: string): Tool | null {
  return mockTools.find(tool => tool.slug === slug) || null;
}

export function getToolsByCategory(category: string): Tool[] {
  return mockTools.filter(tool => 
    tool.categories.some(cat => cat.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase())
  );
}

export function searchTools(keyword: string): Tool[] {
  if (!keyword) return [];
  
  const keywordLower = keyword.toLowerCase();
  
  return mockTools
    .map(tool => {
      const searchText = [
        tool.name,
        tool.description,
        ...tool.categories,
        ...tool.tags,
        ...tool.bestFor
      ].join(' ').toLowerCase();
      
      const keywordMatches = searchText.includes(keywordLower) ? 1 : 0;
      const rankingScore = (tool.rating * 2) + keywordMatches;
      
      return { ...tool, rankingScore };
    })
    .sort((a, b) => b.rankingScore - a.rankingScore);
}
