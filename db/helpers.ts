import { timestamp, varchar } from "drizzle-orm/mysql-core";

import { nanoid } from "@/utils/nanoid";

export const id = varchar("id", { length: 16 })
  .primaryKey()
  .$defaultFn(() => nanoid());

export const createdAt = timestamp("created_at").notNull().defaultNow();

export const updatedAt = timestamp("updated_at")
  .notNull()
  .defaultNow()
  .onUpdateNow();

export const deletedAt = timestamp("deleted_at");

export const timestamps = {
  createdAt,
  updatedAt,
  deletedAt,
};
