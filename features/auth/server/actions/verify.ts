import { db, s } from "@/db";
import { getUserByEmail } from "../data/get-user-by-email";
import { eq } from "drizzle-orm";

export const verify = async (token: string) => {
  const existingToken = await db.query.verificationTokens.findFirst({
    where: (fields, { eq }) => eq(fields.token, token),
  });

  if (!existingToken) {
    return {
      error: "Token bestaat niet",
    };
  }

  const isTokenExpired = existingToken.expires < new Date();

  if (isTokenExpired) {
    return {
      error: "Token is verlopen",
    };
  }

  const user = await getUserByEmail(existingToken.identifier);

  if (!user) {
    return {
      error: "Gebruiker bestaat niet",
    };
  }

  await db
    .update(s.users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(s.users.id, user.id));

  await db.delete(s.verificationTokens).where(eq(s.verificationTokens.identifier, existingToken.identifier));
};
