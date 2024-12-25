"use server";

import { z } from "zod";
import { credentialsSchema } from "../../schemas/credentials-schema";
import { signIn } from "../..";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "../data/get-user-by-email";
import { generateVerificationToken } from "./generate-verification-token";
import { sendVerificationEmail } from "./send-verification-email";

const schema = credentialsSchema.extend({
  redirectTo: z.string().optional(),
});

export const credentialsSignIn = async (body: z.infer<typeof schema>) => {
  const { email, password, redirectTo } = schema.parse(body);

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return redirect(`/sign-in?error=CredentialsSignin`);
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(existingUser.email, verificationToken.token);
    return redirect(`/sign-in?error=Verification`);
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectTo || process.env.AUTH_SIGN_IN_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/sign-in?error=${error.type}`);
    }
    throw error;
  }
};
