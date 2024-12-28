import {
  primaryKey,
  mysqlTable as table,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const passwordResetTokens = table(
  "password_reset_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
  },
  (t) => [
    {
      pk: primaryKey({
        columns: [t.identifier, t.token],
      }),
    },
  ],
);

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type CreatePasswordResetToken = typeof passwordResetTokens.$inferInsert;
