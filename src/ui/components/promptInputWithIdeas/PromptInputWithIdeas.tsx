"use client";

import PromptInput from "@components/promptInput/PromptInput";
import { Icon } from "@iconify/react";
import { Button, ScrollShadow, Tooltip } from "@nextui-org/react";
import { cn } from "@utils/cn";
import React from "react";

type Idea = {
  title: string;
  description: string;
};

export function usePromptInputWithIdeas() {
  const ideas: Idea[] = React.useMemo(
    () => [
      {
        title: "Create a blog post about NextUI",
        description: "explain it in simple terms",
      },
      {
        title: "Give me 10 ideas for my next blog post",
        description: "include only the best ideas",
      },
      {
        title: "Compare NextUI with other UI libraries",
        description: "be as objective as possible",
      },
      {
        title: "Write a text message to my friend",
        description: "be polite and friendly",
      },
      {
        title: "How to Get Started with React",
        description: "A beginner's guide to setting up a React project",
      },
      {
        title: "Top 10 JavaScript Frameworks in 2024",
        description: "An overview of the most popular JS frameworks",
      },
      {
        title: "Benefits of Learning to Code",
        description: "Why everyone should consider learning programming",
      },
      {
        title: "Tips for Effective Remote Work",
        description:
          "How to stay productive and balanced while working from home",
      },
      {
        title: "The Future of Web Development",
        description: "Trends and technologies shaping the web",
      },
      {
        title: "Understanding Asynchronous JavaScript",
        description: "An explanation of async/await, promises, and callbacks",
      },
      {
        title: "A Guide to Responsive Web Design",
        description: "Techniques and tools for creating responsive websites",
      },
      {
        title: "How to Build a Simple API with Node.js",
        description: "Step-by-step guide to creating a RESTful API",
      },
      {
        title: "Top 5 CSS Frameworks for Modern Web Design",
        description: "A comparison of the most popular CSS frameworks",
      },
      {
        title: "The Importance of Accessibility in Web Design",
        description: "Why and how to make your website accessible to all users",
      },
      {
        title: "An Introduction to TypeScript",
        description: "Benefits and basics of using TypeScript in your projects",
      },
      {
        title: "SEO Best Practices for 2024",
        description: "Tips for optimizing your website for search engines",
      },
      {
        title: "How to Use Git and GitHub",
        description: "A beginner's guide to version control and collaboration",
      },
      {
        title: "The Role of Artificial Intelligence in Web Development",
        description: "How AI is transforming the web development industry",
      },
      {
        title: "Building a Portfolio Website",
        description: "Tips and examples for creating an impressive portfolio",
      },
      {
        title: "Exploring Progressive Web Apps (PWAs)",
        description: "What PWAs are and why they matter",
      },
    ],
    [],
  );

  const [sortedIdeas, setSortedIdeas] = React.useState<Idea[]>([]);
  React.useEffect(() => {
    const sorted = ideas.sort(() => 0.5 - Math.random()).slice(0, 4);
    setSortedIdeas(sorted);
  }, [ideas]);

  const [prompt, setPrompt] = React.useState<string>("");

  return {
    sortedIdeas,
    setSortedIdeas,
    prompt,
    setPrompt,
  };
}

export default function PromptInputWithIdeas({
  handleClick,
  isDownloading,
  isEngineReady,
}: {
  handleClick: (newMessage: string) => void;
  isDownloading?: boolean;
  isEngineReady?: boolean;
}) {
  const { sortedIdeas: ideas, prompt, setPrompt } = usePromptInputWithIdeas();

  return (
    <div className="flex flex-col w-full gap-4">
      <ScrollShadow
        hideScrollBar
        className="flex justify-center gap-2 flex-nowrap"
        orientation="horizontal"
      >
        <div className="hidden gap-2 md:flex">
          {ideas.map(({ title, description }, index) => (
            <Button
              key={index}
              className="flex flex-col items-start gap-0 h-14 bg-default-200/70"
              variant="flat"
              onClick={() => setPrompt(title)}
            >
              <p>{title}</p>
              <p className="text-default-500">{description}</p>
            </Button>
          ))}
        </div>
      </ScrollShadow>
      <div className="flex flex-col items-start w-full transition-colors rounded-medium bg-default-200/70 hover:bg-default-200/50">
        <PromptInput
          classNames={{
            inputWrapper: "!bg-transparent shadow-none",
            innerWrapper: "relative",
            input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
          }}
          endContent={
            <div className="flex items-end gap-2">
              <Tooltip showArrow content="Send message">
                <Button
                  isIconOnly
                  color={prompt ? "primary" : "default"}
                  isDisabled={!prompt || isDownloading || !isEngineReady}
                  radius="lg"
                  size="sm"
                  variant="solid"
                  onClick={() => {
                    setPrompt("");
                    handleClick(prompt);
                  }}
                >
                  <Icon
                    className={cn(
                      "[&>path]:stroke-[2px]",
                      prompt ? "text-primary-foreground" : "text-default-600",
                    )}
                    icon="solar:arrow-up-linear"
                    width={20}
                  />
                </Button>
              </Tooltip>
            </div>
          }
          minRows={3}
          radius="lg"
          value={prompt}
          variant="flat"
          onValueChange={setPrompt}
        />
      </div>
    </div>
  );
}
