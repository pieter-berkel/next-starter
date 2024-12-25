import { resend } from "@/lib/resend";

export const sendPasswordResetTokenEmail = async (email: string, token: string) => {
  const link = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: `Ecomtrends <info@ecomtrends.nl>`,
    to: email,
    subject: "Wachtwoord resetten",
    text: `Klik op deze link om je wachtwoord te resetten: ${link}`,
  });
};
