import { z } from "zod";
import { PaginationSchema } from "@/shared/types/pagination";

export const AwardSchema = z.object({
  award_id: z.number(),
  application_id: z.number(),
  zone_id: z.number(),
  pref: z.number(),
  entry: z.string(),
  size: z.number(),
});
export type Award = z.infer<typeof AwardSchema>;

export const AwardsResponseSchema = z.object({
  data: z.array(z.record(z.string(), AwardSchema)),
  pagination: PaginationSchema,
});
export type AwardsResponse = z.infer<typeof AwardsResponseSchema>;

export const AwardsSchema = AwardsResponseSchema;
