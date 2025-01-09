"use server";

import { z } from "zod";

import { actionClient } from "@/lib/safe-action";
import { signIn } from "@/features/auth/lib/auth";
import { getUserByEmail } from "@/data-access/users";

import { generateVerificationToken } from "../utils/generate-verification-token";
import { sendVerificationEmail } from "../utils/send-verification-email";
import { credentialsValidation } from "../validations/credentials-validation";

export const credentialsSignInAction = actionClient
  .schema(credentialsValidation)
  .schema(async (prevSchema) => {
    return prevSchema.extend({ redirectTo: z.string().optional() });
  })
  .action(async ({ parsedInput }) => {
    const { email, password, redirectTo } = parsedInput;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
      throw new Error("CredentialsSignin");
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );
      await sendVerificationEmail(existingUser.email, verificationToken.token);
      throw new Error("Verification");
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectTo,
    });
  });
