import MessageCard from "@components/messageCard/MessageCard";
import { Message } from "@ui/chat/Chat";
import { marked } from "marked";
import React from "react";

export default function Conversation({
  messages,
  isGenerating,
  chunk,
}: {
  messages: Message[];
  isGenerating: boolean;
  chunk: string[];
}) {
  return (
    <div className="flex flex-col gap-4 px-1">
      {messages?.map(({ role, content }, index) => (
        <MessageCard
          key={index}
          attempts={index === 1 ? 2 : 1}
          avatar={
            role === "assistant"
              ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
              : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
          }
          currentAttempt={index === 1 ? 2 : 1}
          message={marked.parse(content)}
          messageClassName={
            role === "user" ? "bg-content3 text-content3-foreground" : ""
          }
          showFeedback={role === "assistant"}
        />
      ))}
      {isGenerating && (
        <MessageCard
          avatar="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
          message={chunk}
          messageClassName="bg-content3 text-content3-foreground"
        />
      )}
    </div>
  );
}
