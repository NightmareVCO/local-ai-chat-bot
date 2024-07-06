"use client";

import FeaturesCards from "@components/featureCards/FeatureCards";
import ModelSelect from "@components/modelSelect/ModelSelect";
import { Avatar, Button, Selection } from "@nextui-org/react";
import React from "react";

import ErrorCard from "@/ui/components/errorCard/ErrorCard";
import ModelProgress from "@/ui/components/modelProgress/ModelProgress";
import SuccessCard from "@/ui/components/successCard/SuccessCard";

export default function InitialScreen({
  selectedModel,
  onModelChange,
  DEFAULT_MODELS,
  downloadProgress,
  timeElapsed,
  isDownloading,
  handleDownload,
  error,
}: {
  selectedModel: React.Key | null;
  onModelChange: (keys: Selection) => void;
  DEFAULT_MODELS: string[];
  downloadProgress: number;
  timeElapsed: number;
  isDownloading: boolean;
  handleDownload: (model: string) => void;
  error: string | undefined;
}) {
  return (
    <div className="flex flex-col justify-center h-full gap-10">
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <Avatar
          size="lg"
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
        />
        <h1 className="text-xl font-medium text-default-700">
          How can I help you today?
        </h1>
      </div>
      <FeaturesCards />
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <h2 className="text-xl font-medium text-default-700">
          Select a model to start!
        </h2>
        <div className="flex flex-col items-center justify-center w-full gap-5 md:flex-row">
          <ModelSelect
            selectedModel={selectedModel}
            onModelChange={onModelChange}
            DEFAULT_MODELS={DEFAULT_MODELS}
          />
          <Button
            className="w-full md:w-fit min-h-12 min-w-fit"
            color="primary"
            isDisabled={isDownloading}
            onClick={() => handleDownload(selectedModel as string)}
          >
            Select Model
          </Button>
        </div>
        {isDownloading && (
          <ModelProgress
            progress={downloadProgress}
            timeElapsed={timeElapsed}
          />
        )}
        {error && <ErrorCard error={error} />}
        {downloadProgress === 1 && (
          <SuccessCard success="Model selected successfully!" />
        )}
      </div>
    </div>
  );
}
