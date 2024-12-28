"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuLoader } from "react-icons/lu";
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
import { resetPasswordAction } from "../actions/reset-password-action";
import { resetPasswordSchema } from "../validations/reset-password-schema";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { execute, isPending } = useAction(
    resetPasswordAction.bind(null, token),
    {
      onError: ({ error }) => {
        if (error.serverError) {
          return toast.error(error.serverError);
        }
      },
      onSuccess: () => {
        form.reset();
        toast.success(
          "Je wachtwoord is gewijzigd. Je kunt nu inloggen met je nieuwe wachtwoord.",
        );
        router.push("/sign-in");
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
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
                <Input
                  type="password"
                  placeholder="Wachtwoord bevestigen"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          <span>Wachtwoord wijzigen</span>
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
