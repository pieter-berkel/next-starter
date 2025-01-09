"use server";

import { actionClient } from "@/lib/safe-action";
import { getUserByEmail } from "@/data-access/users";

import { generatePasswordResetToken } from "../utils/generate-password-reset-token";
import { sendPasswordResetTokenEmail } from "../utils/send-password-reset-token-email";
import { forgotPasswordValidation } from "../validations/forgot-password-validation";

export const forgotPasswordAction = actionClient
  .schema(forgotPasswordValidation)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new Error("Gebruiker is niet gevonden");
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetTokenEmail(email, passwordResetToken.token);
  });
