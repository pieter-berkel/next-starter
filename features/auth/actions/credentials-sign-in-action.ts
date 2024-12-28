"use server";

import { z } from "zod";

import { getUserByEmail } from "@/data/users";
import { actionClient } from "@/lib/safe-action";
import { signIn } from "@/features/auth/lib/auth";
import { generateVerificationToken } from "../services/generate-verification-token";
import { sendVerificationEmail } from "../services/send-verification-email";
import { credentialsSchema } from "../validations/credentials-schema";

export const credentialsSignInAction = actionClient
  .schema(credentialsSchema)
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
