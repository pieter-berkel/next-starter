import "server-only";

import {
  createPasswordResetToken,
  deletePasswordResetTokensByIdentifier,
  getPasswordResetTokenByIdentifier,
} from "@/data/password-reset-tokens";

export const generatePasswordResetToken = async (email: string) => {
  await deletePasswordResetTokensByIdentifier(email);

  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour
  await createPasswordResetToken(email, expiresAt);

  const passwordResetToken = await getPasswordResetTokenByIdentifier(email);

  if (!passwordResetToken) {
    throw new Error("Password reset token not found");
  }

  return {
    token: passwordResetToken.token,
    expiresAt: passwordResetToken.expiresAt,
  };
};
