import { AuthError } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    console.error("Server action error:", e);

    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return "De combinatie van e-mailadres en wachtwoord is onjuist.";
        case "Verification":
          return "Je account is nog niet geverifieerd. Controleer je email inbox (en spam folder) om je account te activeren.";
      }
    }

    if (e instanceof Error) {
      return e.message;
    }

    return "Er is een onbekende fout opgetreden.";
  },
});
