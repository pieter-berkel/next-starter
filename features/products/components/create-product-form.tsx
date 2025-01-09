"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useFieldArray,
  useForm,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { LuCircleAlert, LuX } from "react-icons/lu";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import {
  ProgressStatus,
  ProgressTabs,
  ProgressTabsContent,
  ProgressTabsList,
  ProgressTabsTrigger,
} from "@/components/progress-tabs";

import { decorateVariantsWithDefaultValues } from "../utils/decorate-variants-with-default-values";
import { getPermutations } from "../utils/get-permutations";
import { getVariantName } from "../utils/get-variant-name";
import { createProductValidation } from "../validations/create-product-validation";

const TABS = {
  DETAILS: "DETAILS",
  ORGANIZE: "ORGANIZE",
  VARIANTS: "VARIANTS",
} as const;

type Tab = (typeof TABS)[keyof typeof TABS];
type TabState = Record<Tab, ProgressStatus>;

export const CreateProductForm = () => {
  const [tab, setTab] = useState<Tab>(TABS.DETAILS);

  const [tabState, setTabState] = useState<TabState>({
    [TABS.DETAILS]: "in-progress",
    [TABS.ORGANIZE]: "not-started",
    [TABS.VARIANTS]: "not-started",
  });

  const form = useForm<z.infer<typeof createProductValidation>>({
    resolver: zodResolver(createProductValidation),
    defaultValues: {
      title: "Winter Jacket",
      subtitle: "Cosy winter jacket",
      slug: "winter-jacket",
      description: "A warm and cozy winter jacket.",
      isVariantsEnabled: false,
      options: [{ title: "Default option", values: ["Default option value"] }],
      variants: decorateVariantsWithDefaultValues([
        {
          shouldCreate: true,
          position: 0,
          isDefault: true,
          title: "Default variant",
          options: {
            "Default option": "Default option value",
          },
        },
      ]),
    },
  });

  const onSubmit = async (values: z.infer<typeof createProductValidation>) => {
    console.log(values);
  };

  const handleTabChange = async (tab: string) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    setTab(tab as Tab);
  };

  const handleContinue = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    switch (tab) {
      case TABS.DETAILS:
        setTab(TABS.ORGANIZE);
        break;
      case TABS.ORGANIZE:
        setTab(TABS.VARIANTS);
        break;
    }
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
      case TABS.VARIANTS:
        update[TABS.DETAILS] = "completed";
        update[TABS.ORGANIZE] = "completed";
        update[TABS.VARIANTS] = "in-progress";
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
            <ProgressTabsTrigger
              value={TABS.VARIANTS}
              status={tabState[TABS.VARIANTS]}
            >
              Variants
            </ProgressTabsTrigger>
          </ProgressTabsList>
          <ProgressTabsContent
            value={TABS.DETAILS}
            className="flex flex-1 flex-col items-center overflow-y-auto p-4 lg:py-16"
          >
            <div className="w-full max-w-[720px]">
              <ProductDetails form={form} />
            </div>
          </ProgressTabsContent>
          <ProgressTabsContent
            value={TABS.ORGANIZE}
            className="flex-1 overflow-y-auto"
          >
            <div>Organize</div>
          </ProgressTabsContent>
          <ProgressTabsContent
            value={TABS.VARIANTS}
            className="flex-1 overflow-y-auto"
          >
            <div>Variants</div>
          </ProgressTabsContent>
          <div className="border-t px-4">
            <div className="mx-auto flex w-full max-w-[720px] items-center justify-end gap-x-2 py-2">
              <Link
                href="/dashboard/products"
                className={buttonVariants({ variant: "ghost" })}
              >
                Cancel
              </Link>
              <Button type="button" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        </ProgressTabs>
      </form>
    </Form>
  );
};

const ProductDetails = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof createProductValidation>>;
}) => {
  return (
    <div>
      <h2 className="mb-8 text-xl font-semibold tracking-tight">General</h2>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Winter jacket" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subtitle{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Warm and cozy" {...field} />
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
                  <Input type="text" placeholder="winter-jacket" {...field} />
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
                <Textarea
                  className="min-h-20"
                  placeholder="A warm and cozy jacket"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-6" />
        <CreateProductVariantsSection form={form} />
      </div>
    </div>
  );
};

const CreateProductVariantsSection = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof createProductValidation>>;
}) => {
  const options = useFieldArray({
    control: form.control,
    name: "options",
  });

  const variants = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const watchedEnableVariants = form.watch("isVariantsEnabled", false);

  const watchedOptions = useWatch({
    control: form.control,
    name: "options",
    defaultValue: [],
  });

  const watchedVariants = useWatch({
    control: form.control,
    name: "variants",
    defaultValue: [],
  });

  const showInvalidOptionsMessage = !!form.formState.errors.options?.length;
  const showInvalidVariantsMessage = !!form.formState.errors.variants?.length;

  const handleOptionValueChange = useCallback(
    (index: number, value: string[]) => {
      const newOptions = [...watchedOptions];
      newOptions[index].values = value;

      const permutations = getPermutations(newOptions);
      const oldVariants = [...watchedVariants];

      const findMatchingPermutation = (options: Record<string, string>) => {
        return permutations.find((permutation) => {
          return Object.keys(permutation).every(
            (key) => options[key] === permutation[key],
          );
        });
      };

      const newVariants = oldVariants.reduce(
        (acc, variant) => {
          const match = findMatchingPermutation(variant.options);

          if (match) {
            acc.push({
              ...variant,
              title: getVariantName(match),
              options: match,
            });
          }

          return acc;
        },
        [] as typeof oldVariants,
      );

      const usedPermutation = new Set(
        newVariants.map((variant) => variant.options),
      );

      const unusedPermutations = permutations.filter(
        (permutation) => !usedPermutation.has(permutation),
      );

      const { isTouched: hasUserSelectedVariants } =
        form.getFieldState("variants");

      unusedPermutations.forEach((permutation) => {
        newVariants.push({
          title: getVariantName(permutation),
          options: permutation,
          shouldCreate: hasUserSelectedVariants ? false : true,
          position: newVariants.length,
        });
      });

      form.setValue("variants", newVariants);
    },
    [form, watchedOptions, watchedVariants],
  );

  const createDefaultOptionAndVariant = useCallback(() => {
    form.setValue("options", [
      { title: "Default option", values: ["Default option value"] },
    ]);

    form.setValue(
      "variants",
      decorateVariantsWithDefaultValues([
        {
          shouldCreate: true,
          position: 0,
          isDefault: true,
          title: "Default variant",
          options: {
            "Default option": "Default option value",
          },
        },
      ]),
    );
  }, [form]);

  const handleVariantsEnabledChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        form.setValue("options", [{ title: "", values: [] }]);
        form.setValue("variants", []);
      } else {
        createDefaultOptionAndVariant();
      }
    },
    [form, createDefaultOptionAndVariant],
  );

  const getCheckedState = useCallback(
    (variants: z.infer<typeof createProductValidation>["variants"]) => {
      if (variants.every((variant) => variant.shouldCreate)) {
        return true;
      }

      if (variants.some((variant) => variant.shouldCreate)) {
        return "indeterminate";
      }

      return false;
    },
    [],
  );

  const onCheckedAllChange = useCallback(
    (checked: boolean | "indeterminate") => {
      switch (checked) {
        case true: {
          watchedVariants.forEach((_, i) =>
            form.setValue(`variants.${i}.shouldCreate`, true),
          );
          break;
        }
        case false: {
          watchedVariants.forEach((_, i) =>
            form.setValue(`variants.${i}.shouldCreate`, false),
          );
          break;
        }
        case "indeterminate":
          break;
      }
    },
    [form, watchedVariants],
  );

  return (
    <>
      <h3 className="text-lg font-semibold tracking-tight">Variants</h3>
      <Card>
        <CardContent className="flex gap-4 p-4">
          <FormField
            control={form.control}
            name="isVariantsEnabled"
            render={({ field }) => (
              <FormItem className="inline">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(enabled) => {
                      field.onChange(enabled);
                      handleVariantsEnabledChange(enabled);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-0.5 flex flex-1 flex-col gap-2">
            <h5 className="text-sm font-medium leading-none tracking-tight">
              Yes, this is a product with variants
            </h5>
            <p className="text-xs text-muted-foreground">
              When unchecked, we will create a default variant for you
            </p>
          </div>
        </CardContent>
      </Card>
      {watchedEnableVariants && (
        <>
          <FormField
            control={form.control}
            name="options"
            render={() => (
              <FormItem className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="mt-0.5 flex flex-1 flex-col gap-2">
                    <h5 className="text-sm font-medium leading-none tracking-tight">
                      Product options
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Define the options for the product, e.g. color, size, etc.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => options.append({ title: "", values: [] })}
                  >
                    <span>Add</span>
                  </Button>
                </div>
                {showInvalidOptionsMessage && <FormMessage />}
                <div className="flex flex-col gap-4">
                  {options.fields.map((field, index) => (
                    <Card key={field.id}>
                      <CardContent className="flex items-center gap-2 py-2 pl-4 pr-2">
                        <div className="flex flex-1 flex-col gap-2">
                          <FormField
                            control={form.control}
                            name={`options.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-4 space-y-0">
                                  <FormLabel className="min-w-12">
                                    Title
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="Color" {...field} />
                                  </FormControl>
                                </div>
                                <FormMessage className="ml-16" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`options.${index}.values`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-4 space-y-0">
                                  <FormLabel className="min-w-12">
                                    Values
                                  </FormLabel>
                                  <FormControl>
                                    <TagInput
                                      value={field.value}
                                      onChange={(value) => {
                                        handleOptionValueChange(index, value);
                                        field.onChange(value);
                                      }}
                                      placeholder="Red, Blue, Green"
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage className="ml-16" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          disabled={options.fields.length <= 1}
                          onClick={() => options.remove(index)}
                        >
                          <LuX className="size-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <div className="mt-0.5 flex flex-1 flex-col gap-2">
              <h5 className="text-sm font-medium leading-none tracking-tight">
                Product variants
              </h5>
              <p className="text-xs text-muted-foreground">
                This ranking will affect the variants order in your storefront.
              </p>
            </div>
          </div>

          {variants.fields.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox
                        checked={getCheckedState(watchedVariants)}
                        onCheckedChange={onCheckedAllChange}
                      />
                    </TableHead>
                    {watchedOptions.map((option, i) => (
                      <TableHead key={i}>{option.title}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variants.fields.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variants.${i}.shouldCreate`}
                          render={({ field: { value, onChange, ...rest } }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    {...rest}
                                    checked={value}
                                    onCheckedChange={onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      </TableCell>
                      {Object.values(item.options).map((value, i) => (
                        <TableCell key={i}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Alert>
              <LuCircleAlert className="size-4" />
              <AlertTitle>Add options to create variants</AlertTitle>
            </Alert>
          )}
        </>
      )}
    </>
  );
};
