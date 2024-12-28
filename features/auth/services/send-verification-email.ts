import "server-only";

import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${env.HOST_NAME}/verify?token=${token}`;

  await sendEmail({
    from: `Ecomtrends <info@ecomtrends.nl>`,
    to: email,
    subject: "Emailadres verifiëren",
    text: `Klik op deze link om je emailadres te verifiëren: ${link}`,
  });
};
