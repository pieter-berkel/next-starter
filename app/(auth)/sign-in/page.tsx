import { AuthError } from "next-auth";

import { SignInCard } from "@/features/auth/components/sign-in-card";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: AuthError["type"] }>;
}) {
  const error = (await searchParams).error;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInCard errorType={error} />
    </div>
  );
}
