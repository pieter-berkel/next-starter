import { relations } from "drizzle-orm";
import {
  AnyMySqlColumn,
  int,
  mysqlTable as table,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

import { id, timestamps } from "../helpers";
import { productsToCategories } from "./products";

export const productCategories = table("product_categories", {
  id,
  parentId: varchar("parent_id", { length: 16 }).references(
    (): AnyMySqlColumn => productCategories.id,
    { onDelete: "cascade", onUpdate: "cascade" },
  ),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  position: int("position"),
  ...timestamps,
});

export const productCategoriesRelations = relations(
  productCategories,
  ({ one, many }) => ({
    parent: one(productCategories, {
      fields: [productCategories.parentId],
      references: [productCategories.id],
    }),
    children: many(productCategories),
    productsCategoriesMap: many(productsToCategories),
  }),
);

export type ProductCategory = typeof productCategories.$inferSelect;
export type CreateProductCategory = typeof productCategories.$inferInsert;
