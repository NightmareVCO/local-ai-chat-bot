"use client";

import type { TextAreaProps } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { cn } from "@utils/cn";
import React from "react";

const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ classNames = {}, ...properties }, reference) => {
    return (
      <Textarea
        ref={reference}
        aria-label="Prompt"
        className="min-h-[40px]"
        classNames={{
          ...classNames,
          label: cn("hidden", classNames?.label),
          input: cn("py-0", classNames?.input),
        }}
        minRows={1}
        placeholder="Enter a prompt here"
        radius="lg"
        variant="bordered"
        {...properties}
      />
    );
  },
);

export default PromptInput;

PromptInput.displayName = "PromptInput";