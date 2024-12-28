import { mysqlTable as table, varchar } from "drizzle-orm/mysql-core";

import { id, timestamps } from "../helpers";

export const products = table("products", {
  id,
  name: varchar("name", { length: 255 }).notNull(),
  ...timestamps,
});

export type Product = typeof products.$inferSelect;
export type CreateProduct = typeof products.$inferInsert;
