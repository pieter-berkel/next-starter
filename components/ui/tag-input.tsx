import { useState } from "react";
import { LuX } from "react-icons/lu";

import { cn } from "@/utils/cn";

import { Badge } from "./badge";
import { Button } from "./button";

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
};

export const TagInput = ({
  value,
  onChange,
  placeholder,
  className,
}: TagInputProps) => {
  const [pending, setPending] = useState("");

  const addPending = () => {
    if (!pending) return;
    onChange(Array.from(new Set([...value, pending])));
    setPending("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
      case "Tab":
      case ",":
        e.preventDefault();
        addPending();
        break;
      case "Backspace":
        if (pending.length > 0) break;
        if (value.length <= 0) break;
        onChange(value.slice(0, -1));
        break;
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-h-9 w-full flex-wrap gap-2 rounded-md border border-input bg-transparent p-1 text-base shadow-sm transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring md:text-sm",
        className,
      )}
    >
      {value.map((item) => (
        <Badge key={item} variant="secondary">
          {item}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 size-3"
            onClick={() => {
              onChange(value.filter((i) => i !== item));
            }}
          >
            <LuX className="size-3" />
          </Button>
        </Badge>
      ))}
      <input
        className={cn(
          "mr-2 min-w-14 flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
          value.length <= 0 && "ml-2",
        )}
        value={pending}
        onChange={(e) => setPending(e.target.value)}
        placeholder={value.length <= 0 ? placeholder : undefined}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
