export const getVariantName = (options: Record<string, string>) => {
  return Object.values(options).join(" / ");
};
