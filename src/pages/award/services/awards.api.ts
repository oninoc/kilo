import { apiClient } from "@/shared/utils/api-client";
import { parseData } from "@/shared/utils/api-helpers";
import type { Award } from "../types/awards.js";
import { AwardsSchema } from "../types/awards.js";
import type { Pagination } from "@/shared/types/pagination";

export interface FetchAwardsParams {
  zone?: number;
  date?: string;
  page?: number;
  limit?: number;
}

export async function fetchAwards(
  params: FetchAwardsParams = {}
): Promise<{ awards: Award[]; pagination: Pagination }> {
  const defaultParams = { page: 1, limit: 10, ...params };
  const raw = await apiClient<unknown>("awards", { query: defaultParams });
  const parsed = AwardsSchema.parse(raw);
  const awards = parseData<Award>(parsed.data);
  
  return {
    awards,
    pagination: parsed.pagination
  };
}

export async function fetchAwardById(id: number): Promise<Award> {
  const raw = await apiClient<unknown>(`awards/${id}`);
  const parsed = AwardsSchema.parse(raw);
  const awards = parseData<Award>(parsed.data);
  return awards[0];
}
