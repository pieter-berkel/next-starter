import { ResetPassword } from "@/features/auth/components/reset-password";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ResetPassword token={token} />
    </div>
  );
}
