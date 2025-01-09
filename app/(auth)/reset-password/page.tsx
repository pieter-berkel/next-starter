import { ResetPasswordCard } from "@/features/auth/components/reset-password-card";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ResetPasswordCard token={token} />
    </div>
  );
}
