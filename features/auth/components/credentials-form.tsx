"use client";

import { useForm } from "react-hook-form";
import { LuArrowRight, LuLoader } from "react-icons/lu";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { credentialsSignInAction } from "../actions/credentials-sign-in-action";
import { credentialsValidation } from "../validations/credentials-validation";

export const CredentialsForm = () => {
  const form = useForm<z.infer<typeof credentialsValidation>>({
    resolver: zodResolver(credentialsValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, isPending } = useAction(credentialsSignInAction, {
    onError: ({ error }) => {
      if (error.serverError) {
        return toast.error(error.serverError);
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof credentialsValidation>) => {
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
              <FormDescription>
                <Link href="/forgot-password" className="hover:underline">
                  Wachtwoord vergeten?
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          <span>Inloggen</span>
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
