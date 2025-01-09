import { relations } from "drizzle-orm";
import {
  foreignKey,
  int,
  mysqlTable as table,
  varchar,
} from "drizzle-orm/mysql-core";

import { id, timestamps } from "../helpers";
import { productOptionValues } from "./product-option-values";
import { products } from "./products";

export const productVariants = table("product_variants", {
  id,
  productId: varchar("product_id", { length: 16 })
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: varchar("title", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 255 }),
  barcode: varchar("barcode", { length: 255 }),
  ean: varchar("ean", { length: 255 }),
  upc: varchar("upc", { length: 255 }),
  position: int("position"),
  ...timestamps,
});

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    variantsOptionValuesMap: many(variantsToOptionValues),
  }),
);

export const variantsToOptionValues = table(
  "variants_to_option_values",
  {
    variantId: varchar("variant_id", { length: 16 }).notNull(),
    optionValueId: varchar("option_value_id", { length: 16 }).notNull(),
  },
  (t) => ({
    // FIX: At the moment there is a bug in drizzle-orm that prevents us from
    // using composite primary keys. This is a workaround until the bug is fixed.
    // pk: primaryKey({ columns: [t.productVariantId, t.productOptionValueId] }),
    termReference: foreignKey({
      columns: [t.variantId],
      foreignColumns: [productVariants.id],
      name: "fk_product_variant_reference",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
    valueReference: foreignKey({
      columns: [t.optionValueId],
      foreignColumns: [productOptionValues.id],
      name: "fk_product_option_value_reference",
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  }),
);

export const variantsToOptionValuesRelations = relations(
  variantsToOptionValues,
  ({ one }) => ({
    productVariant: one(productVariants, {
      fields: [variantsToOptionValues.variantId],
      references: [productVariants.id],
    }),
    productOptionValue: one(productOptionValues, {
      fields: [variantsToOptionValues.optionValueId],
      references: [productOptionValues.id],
    }),
  }),
);

export type ProductVariant = typeof productVariants.$inferSelect;
export type CreateProductVariant = typeof productVariants.$inferInsert;
