import { useQuery } from "@tanstack/react-query";
import { fetchZones } from "../services/zones.api";
import type { Zone } from "../types/zones";

export function useZones() {
  return useQuery<Zone[]>({
    queryKey: ["zones"],
    queryFn: fetchZones,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
