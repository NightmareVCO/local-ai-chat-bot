"use client";

import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface ProvidersProperties {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProperties) {
  const router = useRouter();
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
