"use client";

import type { CardProps } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

export type FeatureCardProperties = CardProps & {
  title: string;
  descriptions: string[];
  icon: React.ReactNode;
};

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProperties>(
  ({ title, descriptions = [], icon, ...properties }, reference) => {
    return (
      <Card
        ref={reference}
        className="bg-default-200/50"
        shadow="none"
        {...properties}
      >
        <CardHeader className="flex flex-col gap-2 px-4 pt-6 pb-4">
          {icon}
          <p className="text-medium text-content2-foreground">{title}</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
          {descriptions.map((description, index) => (
            <div
              key={index}
              className="flex min-h-[50px] rounded-medium bg-default-200 px-3 py-2 text-content3-foreground"
            >
              <p className="text-small">{description}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    );
  },
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
