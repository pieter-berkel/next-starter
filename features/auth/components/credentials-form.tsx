"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LuArrowRight } from "react-icons/lu";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { credentialsSchema } from "../schemas/credentials-schema";
import { credentialsSignIn } from "../server/actions/credentials-sign-in";

export const CredentialsForm = () => {
  const form = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof credentialsSchema>) => {
    await credentialsSignIn(values);
  };

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
        <Button type="submit">
          <span>Inloggen</span>
          <LuArrowRight className="ml-2 size-4" />
        </Button>
      </form>
    </Form>
  );
};
