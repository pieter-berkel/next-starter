import { Verify } from "@/features/auth/components/verify";
import { verify } from "@/features/auth/services/verify";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;
  const result = await verify(token);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Verify error={result?.error} />
    </div>
  );
}
