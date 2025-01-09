"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { LuCircle, LuCircleCheck, LuCircleDashed } from "react-icons/lu";

import { cn } from "@/utils/cn";

import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type StepperContextType = {
  stepState: [number, Dispatch<SetStateAction<number>>];
  reachedState: [number, Dispatch<SetStateAction<number>>];
};

const StepperContext = createContext<StepperContextType | null>(null);

export const useStepper = () => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error("Please wrap component in Steppers component");
  }

  return context;
};

export const useStepperControls = () => {
  const {
    stepState: [step, setStep],
    reachedState: [reached, setReached],
  } = useStepper();

  return {
    next: () => {
      setReached((prev) => step + 1);
      setStep((prev) => prev + 1);
    },
    previous: () => {
      setStep((prev) => prev - 1);
    },
    jump: (index: number) => {
      setStep(index);
      setReached((prev) => (prev > index ? prev : index));
    },
    reset: () => {
      setStep(0);
      setReached(0);
    },
  };
};

export const Steppers = ({ children }: { children: React.ReactNode }) => {
  const stepState = useState(0);
  const reachedState = useState(0);

  return (
    <StepperContext.Provider value={{ stepState, reachedState }}>
      <div className="flex h-screen flex-col">{children}</div>
    </StepperContext.Provider>
  );
};

export const SteppersList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollArea className="whitespace-nowrap">
      <div className="h-14 divide-x border-b">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const SteppersTrigger = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const {
    stepState: [step, setStep],
    reachedState: [reached, setReached],
  } = useStepper();

  const isActive = step === index;

  return (
    <button
      className={cn(
        "group inline-flex h-full min-w-52 items-center gap-2 whitespace-nowrap px-4 text-sm font-medium transition-all last:!border-r disabled:pointer-events-none",
        isActive
          ? "bg-background text-foreground"
          : "bg-muted text-muted-foreground",
      )}
      onClick={() => {
        if (reached < index) return;
        setStep(index);
        setReached((prev) => (index > prev ? index : prev));
      }}
      disabled={reached < index}
    >
      {isActive ? (
        <LuCircle className="size-4" />
      ) : reached >= index ? (
        <LuCircleCheck className="size-4" />
      ) : (
        <LuCircleDashed className="size-4" />
      )}
      <span>{children}</span>
    </button>
  );
};

export const SteppersContent = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const {
    stepState: [step],
  } = useStepper();

  return (
    <ScrollArea className={cn("flex-1", step === index ? "" : "hidden")}>
      <div className="mx-auto w-full max-w-3xl px-4 py-8">{children}</div>
      <ScrollBar />
    </ScrollArea>
  );
};

export const SteppersFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="steppers-footer flex h-14 items-center border-t px-4">
      {children}
    </div>
  );
};
