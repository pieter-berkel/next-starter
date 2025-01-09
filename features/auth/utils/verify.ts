import "server-only";

import { getUserByEmail, updateUser } from "@/data-access/users";
import {
  deleteVerificationTokensByIdentifier,
  getVerificationTokenByToken,
} from "@/data-access/verification-tokens";

export const verify = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token bestaat niet",
    };
  }

  const isTokenExpired = existingToken.expires < new Date();

  if (isTokenExpired) {
    return {
      error: "Token is verlopen",
    };
  }

  const user = await getUserByEmail(existingToken.identifier);

  if (!user) {
    return {
      error: "Gebruiker bestaat niet",
    };
  }

  await updateUser(user.id, { emailVerified: new Date() });
  await deleteVerificationTokensByIdentifier(existingToken.identifier);
};
