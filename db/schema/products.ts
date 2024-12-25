import { mysqlTable as table, varchar } from "drizzle-orm/mysql-core";
import { createdAt, deletedAt, id, updatedAt } from "../fields";

export const products = table("products", {
  id,
  name: varchar("name", { length: 255 }).notNull(),
  createdAt,
  updatedAt,
  deletedAt,
});

export type Product = typeof products.$inferSelect;
export type CreateProduct = typeof products.$inferInsert;
