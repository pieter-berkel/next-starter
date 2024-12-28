"use server";

import { createUser, getUserByEmail } from "@/data/users";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../services/generate-verification-token";
import { sendVerificationEmail } from "../services/send-verification-email";
import { signUpSchema } from "../validations/sign-up-schema";
import { actionClient } from "@/lib/safe-action";

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Error("Emailadres is al geregistreerd");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({
      email,
      password: hashedPassword,
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);
  });
