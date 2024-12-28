import {
  mysqlTable as table,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { id, timestamps } from "../helpers";

export const users = table("users", {
  id,
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: timestamp("email_verified_at"),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 255 }),
  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;
