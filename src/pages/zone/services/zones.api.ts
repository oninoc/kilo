import { apiClient } from "@/shared/utils/api-client";
import { parseData } from "@/shared/utils/api-helpers";
import type { Zone } from "../types/zones";
import { ZonesResponseSchema } from "../types/zones";

export const fetchZones = async (): Promise<Zone[]> => {
  const rawData = await apiClient<unknown>("zones");
  const parsed = ZonesResponseSchema.parse(rawData);
  const normalized = parseData<Zone>(parsed.data);
  return normalized;
};
