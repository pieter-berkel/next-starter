import { AlertDescription } from "@/components/ui/alert";
import { LuArrowRight, LuCircleAlert } from "react-icons/lu";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PlaceholderLogo from "../assets/auth-placeholder-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const Verify = ({ error }: { error?: string }) => {
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
          <CardTitle className="text-lg">Verificatie bij Ecomtrends</CardTitle>
          <p className="text-balance text-center text-sm text-muted-foreground">
            Verifieer je account om verder te gaan.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {error ? (
            <Alert variant="destructive">
              <LuCircleAlert className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <Alert>
                <AlertDescription>
                  Je account is geverifieerd! U kunt nu doorgaan naar inloggen.
                </AlertDescription>
              </Alert>
              <Link href="/sign-in" className={buttonVariants()}>
                <span>Inloggen</span>
                <LuArrowRight className="ml-2 size-4" />
              </Link>
            </>
          )}
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
