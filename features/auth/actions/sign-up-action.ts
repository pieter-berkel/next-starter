"use server";

import bcrypt from "bcryptjs";

import { actionClient } from "@/lib/safe-action";
import { createUser, getUserByEmail } from "@/data-access/users";

import { generateVerificationToken } from "../utils/generate-verification-token";
import { sendVerificationEmail } from "../utils/send-verification-email";
import { signUpValidation } from "../validations/sign-up-validation";

export const signUpAction = actionClient
  .schema(signUpValidation)
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
