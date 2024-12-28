"use server";

import { getUserByEmail } from "@/data/users";
import { generatePasswordResetToken } from "../services/generate-password-reset-token";
import { sendPasswordResetTokenEmail } from "../services/send-password-reset-token-email";
import { forgotPasswordSchema } from "../validations/forgot-password-schema";
import { actionClient } from "@/lib/safe-action";

export const forgotPasswordAction = actionClient
  .schema(forgotPasswordSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new Error("Gebruiker is niet gevonden");
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetTokenEmail(email, passwordResetToken.token);
  });
