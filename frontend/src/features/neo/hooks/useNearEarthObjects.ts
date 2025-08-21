import { useQuery } from '@tanstack/react-query';
import { neoApi } from '../../../lib/api';
import type { NearEarthObject, SortOption } from '../types';

export function useNearEarthObjects(date: string, sort: SortOption = 'closeness') {
  return useQuery<NearEarthObject[], Error>({
    queryKey: ['neos', date, date, sort],
    queryFn: () => neoApi.getNearEarthObjects({
      start: date,
      end: date,
      sort,
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
