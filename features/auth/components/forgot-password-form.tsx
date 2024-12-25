"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuLoader } from "react-icons/lu";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { forgotPasswordSchema } from "../schemas/forgot-password-schema";
import { forgotPassword } from "../server/actions/forgot-password";

export const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    const result = await forgotPassword(values);

    if (result?.error) {
      return toast.error(result.error);
    }

    form.reset();
    toast.success(
      "Je wachtwoord reset token is verstuurd. Controleer je email (en spam folder) voor de link om je wachtwoord te resetten.",
    );
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emailadres</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Emailadres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          <span>Wachtwoord vergeten</span>
          {isLoading ? <LuLoader className="ml-2 size-4 animate-spin" /> : <LuArrowRight className="ml-2 size-4" />}
        </Button>
      </form>
    </Form>
  );
};
