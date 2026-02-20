import { useQuery } from '@tanstack/react-query';
import { getAllTools, getToolBySlug, getToolsByCategory, searchTools } from '@/data/mockTools';
import type { Tool } from '@/types';

export function useGetAllTools() {
  return useQuery<Tool[]>({
    queryKey: ['tools'],
    queryFn: async () => {
      return getAllTools();
    },
  });
}

export function useGetToolBySlug(slug: string) {
  return useQuery<Tool | null>({
    queryKey: ['tool', slug],
    queryFn: async () => {
      if (!slug) return null;
      return getToolBySlug(slug);
    },
    enabled: !!slug,
  });
}

export function useGetToolsByCategory(category: string) {
  return useQuery<Tool[]>({
    queryKey: ['tools', 'category', category],
    queryFn: async () => {
      if (!category) return [];
      return getToolsByCategory(category);
    },
    enabled: !!category,
  });
}

export function useSearchTools(keyword: string) {
  return useQuery<Tool[]>({
    queryKey: ['tools', 'search', keyword],
    queryFn: async () => {
      if (!keyword) return [];
      return searchTools(keyword);
    },
    enabled: !!keyword,
  });
}

export function useGetCallerUserProfile() {
  return useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      return null;
    },
  });
}

export function useIsCallerAdmin() {
  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      return false;
    },
  });
}
