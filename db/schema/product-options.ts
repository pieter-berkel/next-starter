import { relations } from "drizzle-orm";
import { mysqlTable as table, varchar } from "drizzle-orm/mysql-core";

import { id, timestamps } from "../helpers";
import { productOptionValues } from "./product-option-values";
import { products } from "./products";

export const productOptions = table("product_options", {
  id,
  productId: varchar("product_id", { length: 16 })
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: varchar("title", { length: 255 }).notNull(),
  ...timestamps,
});

export const productOptionsRelations = relations(
  productOptions,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productOptions.productId],
      references: [products.id],
    }),
    values: many(productOptionValues),
  }),
);

export type ProductOption = typeof productOptions.$inferSelect;
export type CreateProductOption = typeof productOptions.$inferInsert;
