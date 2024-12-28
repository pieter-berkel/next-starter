"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuLoader } from "react-icons/lu";
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
import { credentialsSchema } from "../validations/credentials-schema";
import { credentialsSignInAction } from "../actions/credentials-sign-in-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const CredentialsForm = () => {
  const form = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
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

  const onSubmit = async (values: z.infer<typeof credentialsSchema>) => {
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
