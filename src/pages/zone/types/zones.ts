import { z } from "zod";

export const ZoneSchema = z.object({
  zone_id: z.number(),
  name: z.string(),
});
export type Zone = z.infer<typeof ZoneSchema>;

export const ZonesResponseSchema = z.object({
  data: z.array(z.record(z.string(), ZoneSchema)),
});
export type ZonesResponse = z.infer<typeof ZonesResponseSchema>;
