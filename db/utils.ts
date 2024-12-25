import { nanoid } from "@/lib/nanoid";
import { sql } from "drizzle-orm";
import { datetime, varchar } from "drizzle-orm/mysql-core";

export const id = varchar("id", { length: 16 })
  .primaryKey()
  .$defaultFn(() => nanoid());

export const createdAt = datetime("created_at")
  .notNull()
  .default(sql`NOW()`);

export const updatedAt = datetime("updated_at")
  .notNull()
  .default(sql`NOW()`)
  .$onUpdate(() => sql`NOW()`);

export const deletedAt = datetime("deleted_at");
