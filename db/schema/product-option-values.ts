import { relations } from "drizzle-orm";
import { mysqlTable as table, varchar } from "drizzle-orm/mysql-core";

import { id, timestamps } from "../helpers";
import { productOptions } from "./product-options";
import { variantsToOptionValues } from "./product-variants";

export const productOptionValues = table("product_option_values", {
  id,
  productOptionId: varchar("product_option_id", { length: 16 })
    .notNull()
    .references(() => productOptions.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  value: varchar("value", { length: 255 }).notNull(),
  ...timestamps,
});

export const productOptionValuesRelations = relations(
  productOptionValues,
  ({ one, many }) => ({
    option: one(productOptions, {
      fields: [productOptionValues.productOptionId],
      references: [productOptions.id],
    }),
    variantsOptionValuesMap: many(variantsToOptionValues),
  }),
);

export type ProductOptionValue = typeof productOptionValues.$inferSelect;
export type CreateProductOptionValue = typeof productOptionValues.$inferInsert;
