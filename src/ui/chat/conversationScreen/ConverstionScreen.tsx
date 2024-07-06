"use client";

import Conversation from "@components/conversation/Conversation";
import { Button, ScrollShadow } from "@nextui-org/react";
import { Message } from "@ui/chat/Chat";
import { cn } from "@utils/cn";
import React from "react";

export function useConversationScreen({ chunk }: { chunk: string[] }) {
  const scrollReference = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (scrollReference.current) {
      scrollReference.current.scrollTop = scrollReference.current.scrollHeight;
    }
  }, [chunk]);

  const handleClick = React.useCallback(() => {
    window.location.reload();
  }, []);

  return {
    scrollReference,
    handleClick,
  };
}

export default function ConversationScreen({
  className,
  scrollShadowClassName,
  messages,
  isGenerating,
  chunk,
}: {
  className?: string;
  scrollShadowClassName?: string;
  messages: Message[];
  isGenerating: boolean;
  chunk: string[];
}) {
  const { scrollReference, handleClick } = useConversationScreen({ chunk });

  return (
    <>
      <div
        className={cn(
          "flex h-full w-full max-w-full max-h-[70%] flex-col gap-8",
          className,
        )}
      >
        <div className="flex flex-wrap items-center justify-center w-full gap-2 min-h-14 border-b-small border-divider sm:justify-between">
          <p className="text-base font-medium">
            {messages.length === 0
              ? "Start a conversation"
              : messages[0].content}
          </p>
          <Button color="primary" onClick={handleClick}>
            Reset
          </Button>
        </div>
        <ScrollShadow
          ref={scrollReference}
          className={cn("flex h-full flex-col", scrollShadowClassName)}
          hideScrollBar
          isEnabled={false}
        >
          <Conversation
            messages={messages}
            isGenerating={isGenerating}
            chunk={chunk}
          />
        </ScrollShadow>
      </div>
    </>
  );
}
