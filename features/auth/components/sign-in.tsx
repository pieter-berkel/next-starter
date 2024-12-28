import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PlaceholderLogo from "../assets/auth-placeholder-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { providerMap } from "@/features/auth/lib/auth";
import { AuthError } from "next-auth";
import { Separator } from "@/components/ui/separator";
import { CredentialsForm } from "./credentials-form";
import { ProviderButtons } from "./provider-buttonts";

type SignInProps = {
  redirectTo?: string;
  errorType?: AuthError["type"];
};

export const SignIn = (props: SignInProps) => {
  const redirectTo = props.redirectTo || process.env.AUTH_SIGN_IN_REDIRECT_URL;

  return (
    <div className="w-full max-w-sm rounded-xl bg-muted text-muted-foreground shadow">
      <Card className="shadow-none">
        <CardHeader className="flex flex-col items-center">
          <Image
            src={PlaceholderLogo}
            alt=""
            width={128}
            height={128}
            className="mb-4 mt-2 h-10"
          />
          <CardTitle className="text-lg">Log in bij Ecomtrends</CardTitle>
          <p className="text-balance text-center text-sm text-muted-foreground">
            Welkom terug! Log in om verder te gaan.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ProviderButtons redirectTo={redirectTo} />
          {providerMap.some((provider) => provider.id === "credentials") ? (
            <>
              <div className="relative">
                <Separator />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm">
                  or
                </div>
              </div>
              <CredentialsForm />
            </>
          ) : null}
        </CardContent>
      </Card>
      <div className="p-4 text-center text-sm">
        <Link href="/sign-up" className="hover:underline">
          Heb je nog geen account? <b>Aanmelden</b>
        </Link>
      </div>
    </div>
  );
};
