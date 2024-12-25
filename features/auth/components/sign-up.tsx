import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PlaceholderLogo from "../assets/auth-placeholder-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { providerMap } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import { SignUpForm } from "./sign-up-form";
import { ProviderButtons } from "./provider-buttonts";

export const SignUp = () => {
  return (
    <div className="w-full max-w-sm rounded-xl bg-muted text-muted-foreground shadow">
      <Card className="shadow-none">
        <CardHeader className="flex flex-col items-center">
          <Image src={PlaceholderLogo} alt="" width={128} height={128} className="mb-4 mt-2 h-10" />
          <CardTitle className="text-lg">Maak een account</CardTitle>
          <p className="text-balance text-center text-sm text-muted-foreground">
            Welkom! Vul jouw details in om verder te gaan.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ProviderButtons />
          {providerMap.some((provider) => provider.id === "credentials") ? (
            <>
              <div className="relative">
                <Separator />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm">or</div>
              </div>
              <SignUpForm />
            </>
          ) : null}
        </CardContent>
      </Card>
      <div className="p-4 text-center text-sm">
        <Link href="/sign-in" className="hover:underline">
          Heb je al een account? <b>Inloggen</b>
        </Link>
      </div>
    </div>
  );
};
