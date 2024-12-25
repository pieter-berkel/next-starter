"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuLoader } from "react-icons/lu";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { resetPasswordSchema } from "../schemas/reset-password-schema";
import { resetPassword } from "../server/actions/reset-password";
import { useRouter } from "next/navigation";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    const result = await resetPassword({ ...values, token });

    if (result?.error) {
      return toast.error(result.error);
    }

    form.reset();
    toast.success("Je wachtwoord is gewijzigd. Je kunt nu inloggen met je nieuwe wachtwoord.");
    router.push("/sign-in");
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wachtwoord</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Wachtwoord" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wachtwoord bevestigen</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Wachtwoord bevestigen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          <span>Wachtwoord wijzigen</span>
          {isLoading ? <LuLoader className="ml-2 size-4 animate-spin" /> : <LuArrowRight className="ml-2 size-4" />}
        </Button>
      </form>
    </Form>
  );
};
