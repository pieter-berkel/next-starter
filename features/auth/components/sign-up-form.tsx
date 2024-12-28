"use client";

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
import { signUpAction } from "../actions/sign-up-action";
import { signUpSchema } from "../validations/sign-up-schema";

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { execute, isPending } = useAction(signUpAction, {
    onError: ({ error }) => {
      if (error.serverError) {
        return toast.error(error.serverError);
      }
    },
    onSuccess: () => {
      form.reset();
      toast.success(
        "Je account is aangemaakt. Controleer je email (en spam folder) voor de verificatie link.",
      );
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
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
          <span>Aanmelden</span>
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
