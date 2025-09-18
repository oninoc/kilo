import { apiClient } from "@/shared/utils/api-client";
import { parseData } from "@/shared/utils/api-helpers";
import type { Application } from "../types/applications.js";
import { ApplicationsSchema } from "../types/applications.js";
import type { Pagination } from "@/shared/types/pagination";

export interface FetchApplicationsParams {
  zone?: number;
  date?: string;
  page?: number;
  limit?: number;
}

export async function fetchApplications(
  params: FetchApplicationsParams = {}
): Promise<{ applications: Application[]; pagination: Pagination }> {
  const defaultParams = { page: 0, limit: 10, ...params };
  const raw = await apiClient<unknown>("applications", { query: defaultParams });
  const parsed = ApplicationsSchema.parse(raw);
  const applications = parseData<Application>(parsed.data as Array<Record<string, Application>>);
  
  return {
    applications,
    pagination: {
      page: parsed.pagination.page,
      limit: parsed.pagination.limit,
      offset: parsed.pagination.offset,
      total_pages: parsed.pagination.total_pages,
      total_records: parsed.pagination.total_records,
      has_next: parsed.pagination.has_next,
      has_previous: parsed.pagination.has_previous,
      next_page: parsed.pagination.next_page,
      previous_page: parsed.pagination.previous_page,
    }
  };
}
