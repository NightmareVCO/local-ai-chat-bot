"use client";

import PromptInputWithBottomActions from "@components/promptInputWithIdeas/PromptInputWithIdeas";
import {
  ChatCompletionMessageParam,
  CreateMLCEngine,
  MLCEngine,
} from "@mlc-ai/web-llm";
import { Selection } from "@nextui-org/react";
import ConversationScreen from "@ui/chat/conversationScreen/ConverstionScreen";
import InitialScreen from "@ui/chat/initialScreen/InitialScreen";
import React, { useCallback } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export function useChat() {
  const DEFAULT_MODELS = [
    "Llama-3-8B-Instruct-q4f32_1-MLC-1k - 5.2gb vram required",
    "Llama-2-7b-chat-hf-q4f32_1-MLC-1k - 5.2gb vram required",
    "Hermes-2-Pro-Llama-3-8B-q4f16_1-MLC - 4.9gb vram required",
    "Phi-3-mini-4k-instruct-q4f16_1-MLC - 3.6gb vram required",
    "phi-2-q4f16_1-MLC - 3.0gb vram required",
    "phi-1_5-q4f16_1-MLC - 1.2gb vram required",
    "gemma-2b-it-q4f16_1-MLC - 1.7gb vram required",
    "Qwen2-0.5B-Instruct-q4f16_1-MLC - 950mb vram required",
    "Qwen2-1.5B-Instruct-q4f16_1-MLC - 1.6gb vram required",
    "Qwen2-7B-Instruct-q4f16_1-MLC - 5.1gb vram required",
  ];

  const [allMessages, setMessages] = React.useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = React.useState<React.Key | null>(
    "gemma-2b-it-q4f16_1-MLC - 1.7gb vram required",
  );
  const [engine, setEngine] = React.useState<MLCEngine | null>();
  const [isEngineReady, setIsEngineReady] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [error, setError] = React.useState<string | undefined>();
  const [chunk, setChunk] = React.useState<string[]>([]);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(
    null,
  );

  const startCounter = () => {
    setTimeElapsed(0);
    const id = setInterval(() => {
      setTimeElapsed((previousCounter) => previousCounter + 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopCounter = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  React.useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const onModelChange = useCallback(async (keys: Selection) => {
    // eslint-disable-next-line unicorn/prefer-spread
    const newModel = Array.from(keys)[0];
    if (typeof newModel === "string") {
      setSelectedModel(newModel);
    }
  }, []);

  const handleDownload = useCallback(
    async (model: string) => {
      const modelToUse = model.split(" ")[0];
      setIsDownloading(true);
      setIsEngineReady(false);
      setError(undefined);
      startCounter();
      try {
        const newEngine = await CreateMLCEngine(modelToUse, {
          initProgressCallback: (info) => {
            setDownloadProgress(info.progress);
            setTimeElapsed(info.timeElapsed);
          },
        });
        setEngine(newEngine);
        setIsEngineReady(true);
        setIsDownloading(false);
        setError(undefined);
        stopCounter();
      } catch (error) {
        if (error instanceof Error) {
          setError(
            "GPU not supported. Please try to change the browser. Otherwise your GPU is not supported at all.",
          );
          setIsDownloading(false);
        }
      }
    },
    [stopCounter],
  );

  const addMessage = useCallback((newMessage: Message) => {
    setMessages((currentMessages) => [...currentMessages, newMessage]);
  }, []);

  const handleClick = useCallback(
    async (message: string) => {
      setIsGenerating(true);
      const newMessage: Message = {
        role: "user",
        content: message,
      };
      addMessage(newMessage);

      const chunks =
        (await engine?.chat.completions.create({
          messages: [
            {
              role: "user",
              content: message,
            } as ChatCompletionMessageParam,
          ],
          stream: true,
        })) ?? [];

      let reply = "";

      for await (const chunk of chunks) {
        const choice = chunk.choices[0];
        const content = choice?.delta?.content ?? "";
        setChunk((currentChunks) => [...currentChunks, content]);
        reply += content;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: reply,
      };
      addMessage(assistantMessage);
      setIsGenerating(false);
      setChunk([]);
    },

    [addMessage, engine],
  );

  return {
    allMessages,
    handleClick,
    downloadProgress,
    timeElapsed,
    isDownloading,
    handleDownload,
    selectedModel,
    onModelChange,
    DEFAULT_MODELS,
    isEngineReady,
    engine,
    setEngine,
    isGenerating,
    error,
    chunk,
  };
}

export default function Chat() {
  const {
    allMessages: messages,
    handleClick,
    downloadProgress,
    timeElapsed,
    isEngineReady,
    isDownloading,
    handleDownload,
    selectedModel,
    onModelChange,
    DEFAULT_MODELS,
    isGenerating,
    chunk,
    error,
  } = useChat();

  return (
    <div className="flex flex-col w-full h-full max-w-full gap-8">
      {messages.length === 0 && (
        <InitialScreen
          selectedModel={selectedModel}
          onModelChange={onModelChange}
          DEFAULT_MODELS={DEFAULT_MODELS}
          downloadProgress={downloadProgress}
          isDownloading={isDownloading}
          handleDownload={handleDownload}
          timeElapsed={timeElapsed}
          error={error}
        />
      )}
      {messages.length > 0 && (
        <ConversationScreen
          messages={messages}
          isGenerating={isGenerating}
          chunk={chunk}
        />
      )}

      <div className="flex flex-col gap-2">
        <PromptInputWithBottomActions
          handleClick={handleClick}
          isDownloading={isDownloading}
          isEngineReady={isEngineReady}
        />
        <p className="px-2 text-tiny text-default-400">
          AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
