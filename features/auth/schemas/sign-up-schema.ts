import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    password: z.string().min(8, { message: "Minimaal 8 karakters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Wachtwoorden komen niet overeen",
    path: ["confirmPassword"],
  });
