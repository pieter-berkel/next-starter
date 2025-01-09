import { VerifyCard } from "@/features/auth/components/verify-card";
import { verify } from "@/features/auth/utils/verify";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const token = (await searchParams).token;
  const result = await verify(token);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <VerifyCard error={result?.error} />
    </div>
  );
}
