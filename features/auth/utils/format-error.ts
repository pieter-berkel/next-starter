import { AuthError } from "next-auth";

export const formatError = (error: AuthError["type"]) => {
  switch (error) {
    case "CredentialsSignin":
      return "De combinatie van e-mailadres en wachtwoord is onjuist.";
    case "Verification":
      return "Je account is nog niet geverifieerd. Controleer je email inbox (en spam folder) om je account te activeren.";
    default:
      return "Er is iets fout gegaan bij het inloggen.";
  }
};
