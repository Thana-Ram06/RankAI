import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Tool, UserProfile, Pricing } from '../backend';

export function useGetAllTools() {
  const { actor, isFetching } = useActor();

  return useQuery<Tool[]>({
    queryKey: ['tools'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTools();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetToolBySlug(slug: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Tool | null>({
    queryKey: ['tool', slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getToolBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useGetToolsByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Tool[]>({
    queryKey: ['tools', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getToolsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useSearchTools(keyword: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Tool[]>({
    queryKey: ['tools', 'search', keyword],
    queryFn: async () => {
      if (!actor || !keyword) return [];
      return actor.searchTools(keyword);
    },
    enabled: !!actor && !isFetching && !!keyword,
  });
}

export function useAddTool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tool: Tool) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addTool(tool);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
