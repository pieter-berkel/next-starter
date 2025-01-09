import { z } from "zod";

import { createProductOptionValidation } from "../validations/create-product-validation";

export const getPermutations = (
  options: z.infer<typeof createProductOptionValidation>[],
): Record<string, string>[] => {
  if (!options.length) return [];

  if (options.length === 1) {
    return options[0].values.map((value) => ({ [options[0].title]: value }));
  }

  const toProcess = options[0];
  const rest = options.slice(1);

  return toProcess.values.flatMap((value) => {
    return getPermutations(rest).map((permutation) => ({
      [toProcess.title]: value,
      ...permutation,
    }));
  });
};
