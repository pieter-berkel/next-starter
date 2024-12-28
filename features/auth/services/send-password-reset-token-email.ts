import "server-only";

import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";

export const sendPasswordResetTokenEmail = async (
  email: string,
  token: string,
) => {
  const link = `${env.HOST_NAME}/reset-password?token=${token}`;

  await sendEmail({
    from: `Ecomtrends <info@ecomtrends.nl>`,
    to: email,
    subject: "Wachtwoord resetten",
    text: `Klik op deze link om je wachtwoord te resetten: ${link}`,
  });
};
