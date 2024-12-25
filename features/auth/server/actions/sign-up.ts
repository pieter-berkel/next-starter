"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { signUpSchema } from "../../schemas/sign-up-schema";
import { getUserByEmail } from "../data/get-user-by-email";
import { db, s } from "@/db";
import { generateVerificationToken } from "./generate-verification-token";
import { sendVerificationEmail } from "./send-verification-email";

export const signUp = async (input: z.infer<typeof signUpSchema>) => {
  const { success, data } = signUpSchema.safeParse(input);

  if (!success) {
    return {
      error: "Ongeldige invoer",
    };
  }

  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    return {
      error: "Emailadres is al geregistreerd",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  await db.insert(s.users).values({
    email: data.email,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(data.email);
  await sendVerificationEmail(data.email, verificationToken.token);
};
