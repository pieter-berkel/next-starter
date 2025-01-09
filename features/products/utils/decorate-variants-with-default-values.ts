import { z } from "zod";

import { createProductVariantsValidation } from "../validations/create-product-validation";

export const decorateVariantsWithDefaultValues = (
  variants: z.infer<typeof createProductVariantsValidation>[],
) => {
  return variants.map((variant) => ({
    ...variant,
    title: variant.title || "",
    sku: variant.sku || "",
  }));
};
