import { AuthError } from "next-auth";

import { SignIn } from "@/features/auth/components/sign-in";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: AuthError["type"] }>;
}) {
  const error = (await searchParams).error;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn errorType={error} />
    </div>
  );
}
