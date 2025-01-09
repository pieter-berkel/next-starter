import { z } from "zod";

export const createProductVariantsValidation = z.object({
  shouldCreate: z.boolean(),
  isDefault: z.boolean().optional(),
  title: z.string().min(1).max(255),
  upc: z.string().max(255).optional(),
  sku: z.string().max(255).optional(),
  ean: z.string().max(255).optional(),
  barcode: z.string().max(255).optional(),
  options: z.record(z.string(), z.string()),
  position: z.number().int(),
});

export const createProductOptionValidation = z.object({
  title: z.string().min(1).max(255),
  values: z.array(z.string().min(1).max(255)).min(1),
});

export const createProductValidation = z
  .object({
    title: z.string().min(1).max(255),
    subtitle: z.string().max(255).optional(),
    slug: z.string().max(255).optional(),
    description: z.string().optional(),
    options: z.array(createProductOptionValidation).min(1),
    isVariantsEnabled: z.boolean().optional(),
    variants: z.array(createProductVariantsValidation).min(1),
  })
  .superRefine((data, ctx) => {
    if (data.variants.every((variant) => !variant.shouldCreate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one variant should be created",
        path: ["variants"],
      });
    }
  });

export type CreateProduct = z.infer<typeof createProductValidation>;
