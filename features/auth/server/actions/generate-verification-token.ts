import { eq } from "drizzle-orm";
import { db, s } from "@/db";
import { nanoid } from "@/lib/nanoid";

export const generateVerificationToken = async (email: string) => {
  const token = nanoid();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour

  await db.delete(s.verificationTokens).where(eq(s.verificationTokens.identifier, email));

  await db.insert(s.verificationTokens).values({
    identifier: email,
    token,
    expires,
  });

  return { token, expires };
};
