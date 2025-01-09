"use client";

import * as React from "react";
import { LuCircleCheck, LuCircleDashed, LuCircleGauge } from "react-icons/lu";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/cn";

export type ProgressStatus = "not-started" | "in-progress" | "completed";

export const ProgressTabs = TabsPrimitive.Root;

export const ProgressTabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => {
  return (
    <TabsPrimitive.List
      className={cn("flex w-full items-center border-b", className)}
      {...props}
    />
  );
};

interface ProgressIndicatorProps extends React.ComponentProps<"span"> {
  status?: ProgressStatus;
}

const ProgressIndicator = ({
  status,
  className,
  ...props
}: ProgressIndicatorProps) => {
  const Icon = React.useMemo(() => {
    switch (status) {
      case "not-started":
        return LuCircleDashed;
      case "in-progress":
        return LuCircleGauge;
      case "completed":
        return LuCircleCheck;
      default:
        return LuCircleDashed;
    }
  }, [status]);

  return (
    <span
      className={cn(
        "text-muted-foreground group-data-[state=active]/trigger:text-foreground",
        className,
      )}
      {...props}
    >
      <Icon />
    </span>
  );
};

interface ProgressTabsTriggerProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Trigger>, "asChild"> {
  status?: ProgressStatus;
}

export const ProgressTabsTrigger = ({
  className,
  children,
  status = "not-started",
  ...props
}: ProgressTabsTriggerProps) => {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "group/trigger overflow-hidden text-ellipsis whitespace-nowrap",
        "inline-flex h-[52px] w-full max-w-[200px] flex-1 items-center gap-x-2 border-r bg-muted px-4 text-left text-sm text-muted-foreground outline-none transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:bg-muted/70",
        "data-[state=active]:bg-background data-[state=active]:text-foreground",
        className,
      )}
      {...props}
    >
      <ProgressIndicator status={status} />
      {children}
    </TabsPrimitive.Trigger>
  );
};

export const ProgressTabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      className={cn("outline-none", className)}
      {...props}
    />
  );
};
