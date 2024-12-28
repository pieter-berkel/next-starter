import {
  int,
  primaryKey,
  mysqlTable as table,
  varchar,
} from "drizzle-orm/mysql-core";
import type { AdapterAccountType } from "next-auth/adapters";

import { timestamps } from "../helpers";
import { users } from "./users";

export const accounts = table(
  "accounts",
  {
    userId: varchar("userId", { length: 16 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccountType>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
    ...timestamps,
  },
  (t) => [
    {
      pk: primaryKey({
        columns: [t.provider, t.providerAccountId],
      }),
    },
  ],
);

export type Account = typeof accounts.$inferSelect;
export type CreateAccount = typeof accounts.$inferInsert;
