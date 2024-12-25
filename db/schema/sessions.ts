import { mysqlTable as table, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const sessions = table("sessions", {
  sessionToken: varchar("session_token", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 16 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type CreateSession = typeof sessions.$inferInsert;
