import { database, schema } from "@/db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getVerificationTokenByIdentifier = async (email: string) => {
  return await database.query.verificationTokens.findFirst({
    where: (fields, { eq }) => eq(fields.identifier, email),
  });
};

export const getVerificationTokenByToken = async (token: string) => {
  return await database.query.verificationTokens.findFirst({
    where: (fields, { eq }) => eq(fields.token, token),
  });
};

export const createVerificationToken = async (
  email: string,
  expiresAt: Date,
) => {
  await database.insert(schema.verificationTokens).values({
    identifier: email,
    token: nanoid(),
    expires: expiresAt,
  });
};

export const deleteVerificationTokensByIdentifier = async (email: string) => {
  await database
    .delete(schema.verificationTokens)
    .where(eq(schema.verificationTokens.identifier, email));
};
