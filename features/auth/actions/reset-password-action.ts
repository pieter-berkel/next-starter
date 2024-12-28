"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail, updateUser } from "@/data/users";
import {
  deletePasswordResetTokensByIdentifier,
  getPasswordResetTokenByToken,
} from "@/data/password-reset-tokens";
import { resetPasswordSchema } from "../validations/reset-password-schema";
import { actionClient } from "@/lib/safe-action";

export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .bindArgsSchemas<[token: z.ZodString]>([z.string().min(1)])
  .action(async ({ parsedInput, bindArgsParsedInputs }) => {
    const { password } = parsedInput;
    const [token] = bindArgsParsedInputs;

    const existingPasswordResetToken =
      await getPasswordResetTokenByToken(token);

    if (!existingPasswordResetToken) {
      throw new Error("Token is niet geldig");
    }

    const isTokenExpired = existingPasswordResetToken.expiresAt < new Date();

    if (isTokenExpired) {
      throw new Error("Token is verlopen");
    }

    const existingUser = await getUserByEmail(
      existingPasswordResetToken.identifier,
    );

    if (!existingUser) {
      return {
        error: "Gebruiker is niet gevonden",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser(existingUser.id, { password: hashedPassword });
    await deletePasswordResetTokensByIdentifier(existingUser.email!);
  });
