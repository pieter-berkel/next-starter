import { z } from "zod";

export const createCategoryValidation = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().max(255).optional(),
  description: z.string().optional(),
  parent: z.string().nullable(),
  position: z.number().int(),
});
