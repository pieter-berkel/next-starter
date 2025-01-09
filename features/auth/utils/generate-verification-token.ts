import "server-only";

import {
  createVerificationToken,
  deleteVerificationTokensByIdentifier,
  getVerificationTokenByIdentifier,
} from "@/data-access/verification-tokens";

export const generateVerificationToken = async (email: string) => {
  await deleteVerificationTokensByIdentifier(email);

  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour
  await createVerificationToken(email, expiresAt);

  const verificationToken = await getVerificationTokenByIdentifier(email);

  if (!verificationToken) {
    throw new Error("Verification token not found");
  }

  return { token: verificationToken.token, expires: verificationToken.expires };
};
