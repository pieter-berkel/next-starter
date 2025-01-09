import "server-only";

import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { database, schema } from "@/db";

export const getPasswordResetTokenByIdentifier = async (email: string) => {
  return await database.query.passwordResetTokens.findFirst({
    where: (fields, { eq }) => eq(fields.identifier, email),
  });
};

export const getPasswordResetTokenByToken = async (token: string) => {
  return await database.query.passwordResetTokens.findFirst({
    where: (fields, { eq }) => eq(fields.token, token),
  });
};

export const createPasswordResetToken = async (
  email: string,
  expiresAt: Date,
) => {
  await database.insert(schema.passwordResetTokens).values({
    identifier: email,
    token: nanoid(),
    expiresAt,
  });
};

export const deletePasswordResetTokensByIdentifier = async (email: string) => {
  await database
    .delete(schema.passwordResetTokens)
    .where(eq(schema.passwordResetTokens.identifier, email));
};
