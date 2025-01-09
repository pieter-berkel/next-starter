"use client";

import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ProgressStatus,
  ProgressTabs,
  ProgressTabsContent,
  ProgressTabsList,
  ProgressTabsTrigger,
} from "@/components/progress-tabs";

import { createCategoryValidation } from "../validations/create-category-validation";

const TABS = {
  DETAILS: "DETAILS",
  ORGANIZE: "ORGANIZE",
} as const;

type Tab = (typeof TABS)[keyof typeof TABS];
type TabState = Record<Tab, ProgressStatus>;

export const CreateCategoryForm = () => {
  const [tab, setTab] = useState<Tab>(TABS.DETAILS);

  const [tabState, setTabState] = useState<TabState>({
    [TABS.DETAILS]: "in-progress",
    [TABS.ORGANIZE]: "not-started",
  });

  const form = useForm<z.infer<typeof createCategoryValidation>>({
    resolver: zodResolver(createCategoryValidation),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      parent: null,
      position: 0,
    },
  });

  const onSubmit = async (values: any) => {};

  const handleTabChange = async (tab: string) => {
    if (tab === TABS.ORGANIZE) {
      const isValid = await form.trigger();
      if (!isValid) return;
    }

    setTab(tab as Tab);
  };

  useEffect(() => {
    const update = { ...tabState };
    switch (tab) {
      case TABS.DETAILS:
        update[TABS.DETAILS] = "in-progress";
        break;
      case TABS.ORGANIZE:
        update[TABS.DETAILS] = "completed";
        update[TABS.ORGANIZE] = "in-progress";
        break;
    }
    setTabState(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ProgressTabs
          value={tab}
          onValueChange={handleTabChange}
          className="flex h-screen flex-col"
        >
          <ProgressTabsList>
            <ProgressTabsTrigger
              value={TABS.DETAILS}
              status={tabState[TABS.DETAILS]}
            >
              Details
            </ProgressTabsTrigger>
            <ProgressTabsTrigger
              value={TABS.ORGANIZE}
              status={tabState[TABS.ORGANIZE]}
            >
              Organize
            </ProgressTabsTrigger>
          </ProgressTabsList>
          <ProgressTabsContent
            value={TABS.DETAILS}
            className="flex flex-1 flex-col items-center overflow-y-auto p-4 lg:py-16"
          >
            <div className="w-full max-w-[720px]">
              <CategoryDetailsSection form={form} />
            </div>
          </ProgressTabsContent>

          <div className="border-t px-4">
            <div className="mx-auto flex w-full max-w-[720px] items-center justify-end gap-x-2 py-2">
              <Link
                href="/dashboard/categories"
                className={buttonVariants({ variant: "ghost" })}
              >
                Cancel
              </Link>
              {tab === TABS.ORGANIZE ? (
                <Button type="submit">Save</Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => handleTabChange(TABS.ORGANIZE)}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </ProgressTabs>
      </form>
    </Form>
  );
};

const CategoryDetailsSection = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof createCategoryValidation>>;
}) => {
  return (
    <div>
      <h2 className="mb-8 text-xl font-semibold tracking-tight">
        Create category
      </h2>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Slug <span className="text-muted-foreground">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea className="min-h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
