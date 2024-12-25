import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "Minimaal 8 karakters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Wachtwoorden komen niet overeen",
    path: ["confirmPassword"],
  });
