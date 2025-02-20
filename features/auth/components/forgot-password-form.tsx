"use client";

import { useForm } from "react-hook-form";
import { LuArrowRight, LuLoader } from "react-icons/lu";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { forgotPasswordAction } from "../actions/forgot-password-action";
import { forgotPasswordValidation } from "../validations/forgot-password-validation";

export const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof forgotPasswordValidation>>({
    resolver: zodResolver(forgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  const { execute, isPending } = useAction(forgotPasswordAction, {
    onError: ({ error }) => {
      if (error.serverError) {
        return toast.error(error.serverError);
      }
    },
    onSuccess: () => {
      form.reset();
      toast.success(
        "Je wachtwoord reset token is verstuurd. Controleer je email (en spam folder) voor de link om je wachtwoord te resetten.",
      );
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordValidation>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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
        <Button type="submit" disabled={isPending}>
          <span>Wachtwoord vergeten</span>
          {isPending ? (
            <LuLoader className="ml-2 size-4 animate-spin" />
          ) : (
            <LuArrowRight className="ml-2 size-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};
