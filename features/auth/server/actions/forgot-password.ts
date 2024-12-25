"use server";

import { z } from "zod";
import { forgotPasswordSchema } from "../../schemas/forgot-password-schema";
import { getUserByEmail } from "../data/get-user-by-email";
import { generatePasswordResetToken } from "./generate-password-reset-token";
import { sendPasswordResetTokenEmail } from "./send-password-reset-token-email";

export const forgotPassword = async (input: z.infer<typeof forgotPasswordSchema>) => {
  const { data, success } = forgotPasswordSchema.safeParse(input);

  if (!success) {
    return {
      error: "Ongeldige invoer",
    };
  }

  const existingUser = await getUserByEmail(data.email);

  if (!existingUser) {
    return;
  }

  const passwordResetToken = await generatePasswordResetToken(data.email);
  await sendPasswordResetTokenEmail(data.email, passwordResetToken.token);
};
