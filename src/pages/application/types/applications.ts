import { z } from "zod";
import { PaginationSchema } from "@/shared/types/pagination";

export const ApplicationSchema = z.object({
  application_id: z.number(),
  date1: z.string(),
  date2: z.string(),
  date3: z.string(),
  zone1: z.number(),
  zone2: z.number(),
  zone3: z.number(),
  awarded: z.boolean(),
  award_id: z.number(),
});

export const ApplicationsSchema = z.object({
  data: z.array(z.record(z.string(), ApplicationSchema)),
  pagination: PaginationSchema,
});

export type Application = z.infer<typeof ApplicationSchema>;
export type ApplicationsResponse = z.infer<typeof ApplicationsSchema>;
