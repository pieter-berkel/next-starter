import { ResetPassword } from "@/features/auth/components/reset-password";

export default async function ResetPasswordPage(props: { searchParams: Promise<{ token: string }> }) {
  const searchParams = await props.searchParams;

  const { token } = searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ResetPassword token={token} />
    </div>
  );
}
