"use server";

import { z } from "zod";
import { getUserByEmail } from "../data/get-user-by-email";
import { resetPasswordSchema } from "../../schemas/reset-password-schema";
import { db, s } from "@/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const resetPassword = async (input: z.infer<typeof resetPasswordSchema> & { token: string }) => {
  const { data, success } = resetPasswordSchema.safeParse(input);

  if (!success) {
    return {
      error: "Ongeldige invoer",
    };
  }

  const existingPasswordResetToken = await db.query.passwordResetTokens.findFirst({
    where: (field, { eq }) => eq(field.token, input.token),
  });

  if (!existingPasswordResetToken) {
    return {
      error: "Token is niet geldig",
    };
  }

  const isTokenExpired = existingPasswordResetToken.expires < new Date();

  if (isTokenExpired) {
    return {
      error: "Token is verlopen",
    };
  }

  const existingUser = await getUserByEmail(existingPasswordResetToken.identifier);

  if (!existingUser) {
    return {
      error: "Gebruiker is niet gevonden",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  await db
    .update(s.users)
    .set({
      password: hashedPassword,
    })
    .where(eq(s.users.id, existingUser.id));

  await db.delete(s.passwordResetTokens).where(eq(s.passwordResetTokens.identifier, existingUser.email!));
};
