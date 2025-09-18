import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAwards } from "../services/awards.api.js";
import type { FetchAwardsParams } from "../services/awards.api.js";
import type { Award } from "../types/awards.js";

export function useInfiniteAwards(params: Omit<FetchAwardsParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: ["awards", "infinite", params],
    queryFn: ({ pageParam = 0 }) => 
      fetchAwards({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination.has_next ? pagination.page + 1 : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 1,
  });
}

export function useInfiniteAwardsFlat(params: Omit<FetchAwardsParams, 'page'>) {
  const query = useInfiniteAwards(params);
  
  const flatAwards: Award[] = query.data?.pages.flatMap(page => page.awards) ?? [];
  
  return {
    ...query,
    awards: flatAwards,
  };
}
