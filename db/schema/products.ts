import { relations } from "drizzle-orm";
import {
  foreignKey,
  mysqlEnum,
  mysqlTable as table,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

import { id, timestamps } from "../helpers";
import { productCategories } from "./product-categories";
import { productImages } from "./product-images";

export const products = table("products", {
  id,
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  status: mysqlEnum("status", ["draft", "published"]).notNull(),
  description: text("description"),
  ...timestamps,
});

export const productsRelations = relations(products, ({ many }) => ({
  productsCategoriesMap: many(productsToCategories),
  images: many(productImages),
}));

export const productsToCategories = table(
  "product_to_categories",
  {
    productId: varchar("product_id", { length: 16 }).notNull(),
    categoryId: varchar("category_id", { length: 16 }).notNull(),
  },
  (t) => ({
    // FIX: At the moment there is a bug in drizzle-orm that prevents us from
    // using composite primary keys. This is a workaround until the bug is fixed.
    // pk: primaryKey({ columns: [t.productId, t.productCategoryId] }),
    termReference: foreignKey({
      columns: [t.productId],
      foreignColumns: [products.id],
      name: "fk_product_reference",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
    categoryReference: foreignKey({
      columns: [t.categoryId],
      foreignColumns: [productCategories.id],
      name: "fk_category_reference",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  }),
);

export const productsToCategoriesRelations = relations(
  productsToCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToCategories.productId],
      references: [products.id],
    }),
    category: one(productCategories, {
      fields: [productsToCategories.categoryId],
      references: [productCategories.id],
    }),
  }),
);

export type Product = typeof products.$inferSelect;
export type CreateProduct = typeof products.$inferInsert;

export type ProductStatus = Product["status"];
