import { resend } from "@/lib/resend";

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${process.env.NEXT_PUBLIC_URL}/verify?token=${token}`;

  await resend.emails.send({
    from: `Ecomtrends <info@ecomtrends.nl>`,
    to: email,
    subject: "Emailadres verifiëren",
    text: `Klik op deze link om je emailadres te verifiëren: ${link}`,
  });
};
