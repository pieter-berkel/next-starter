import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlaceholderLogo from "../assets/auth-placeholder-logo.svg";
import { ForgotPasswordForm } from "./forgot-password-form";

export const ForgotPasssord = () => {
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
          <CardTitle className="text-lg">Wachtwoord vergeten</CardTitle>
          <p className="text-balance text-center text-sm text-muted-foreground">
            Geef jouw e-mailadres op om een wachtwoord reset link te ontvangen.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ForgotPasswordForm />
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
