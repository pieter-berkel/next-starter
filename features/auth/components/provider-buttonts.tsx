import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { formatProviderIcon } from "../utils/format-provider-icon";
import { Button } from "@/components/ui/button";
import { providerMap, signIn } from "../lib/auth";

export const ProviderButtons = ({ redirectTo }: { redirectTo?: string }) => {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${Math.min(
          providerMap.filter((provider) => provider.id !== "credentials")
            .length,
          3,
        )}, 1fr)`,
      }}
    >
      {providerMap
        .filter((provider) => provider.id !== "credentials")
        .map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, { redirectTo });
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`/sign-in?error=${error.type}`);
                }
                throw error;
              }
            }}
          >
            <Button type="submit" variant="outline" className="w-full gap-2">
              {formatProviderIcon(provider.id)}
              <span>{provider.name}</span>
            </Button>
          </form>
        ))}
    </div>
  );
};
