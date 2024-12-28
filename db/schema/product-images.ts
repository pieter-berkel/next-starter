import { relations } from "drizzle-orm";
import { int, mysqlTable as table, varchar } from "drizzle-orm/mysql-core";

import { id, timestamps } from "../helpers";
import { products } from "./products";

export const productImages = table("product_images", {
  id,
  productId: varchar("product_id", { length: 16 })
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  url: varchar("slug", { length: 255 }).notNull(),
  position: int("position"),
  ...timestamps,
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export type ProductImage = typeof productImages.$inferSelect;
export type CreateProductImage = typeof productImages.$inferInsert;
