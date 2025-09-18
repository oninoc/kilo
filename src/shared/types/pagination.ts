import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  offset: z.number(),
  total_pages: z.number(),
  total_records: z.number(),
  has_next: z.boolean(),
  has_previous: z.boolean(),
  next_page: z.union([z.string(), z.boolean()]),
  previous_page: z.union([z.string(), z.boolean()]),
});

export type Pagination = z.infer<typeof PaginationSchema>;
