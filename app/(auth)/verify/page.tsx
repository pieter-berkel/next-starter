import { Verify } from "@/features/auth/components/verify";
import { verify } from "@/features/auth/server/actions/verify";

export default async function VerifyPage(props: { searchParams: Promise<{ token: string }> }) {
  const searchParams = await props.searchParams;

  const { token } = searchParams;

  const result = await verify(token);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Verify error={result?.error} />
    </div>
  );
}
