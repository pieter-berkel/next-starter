import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email({ message: "Ongeldig e-mailadres" }),
  password: z.string().min(1, { message: "Wachtwoord is verplicht" }),
});
