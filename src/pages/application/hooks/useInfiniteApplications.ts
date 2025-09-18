import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchApplications } from "../services/applications.api.js";
import type { FetchApplicationsParams } from "../services/applications.api.js";
import type { Application } from "../types/applications.js";

export function useInfiniteApplications(params: Omit<FetchApplicationsParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: ["applications", "infinite", params],
    queryFn: ({ pageParam = 0 }) => 
      fetchApplications({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination.has_next ? pagination.page + 1 : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 1,
  });
}

export function useInfiniteApplicationsFlat(params: Omit<FetchApplicationsParams, 'page'>) {
  const query = useInfiniteApplications(params);
  
  const flatApplications: Application[] = query.data?.pages.flatMap(page => page.applications) ?? [];
  
  return {
    ...query,
    applications: flatApplications,
  };
}
