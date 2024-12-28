import {
  primaryKey,
  mysqlTable as table,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const verificationTokens = table(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires_at").notNull(),
  },
  (t) => [
    {
      pk: primaryKey({
        columns: [t.identifier, t.token],
      }),
    },
  ],
);

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type CreateVerificationToken = typeof verificationTokens.$inferInsert;
