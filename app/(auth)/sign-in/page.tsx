import { AuthError } from "next-auth";
import { SignIn } from "@/features/auth/components/sign-in";

export default async function SignInPage(props: { searchParams: Promise<{ error?: AuthError["type"] }> }) {
  const searchParams = await props.searchParams;

  const { error } = searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn errorType={error} />
    </div>
  );
}
