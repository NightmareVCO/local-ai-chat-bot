import "@styles/globals.css";

import { Providers } from "@app/provider";
import Background from "@ui/components/background/Background";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local AI Chat App",
  description:
    "A chat app that uses AI to generate responses. It's all local, so your data stays private. It's Free!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="overflow-x-hidden bg-transparent">
        <Providers>
          <Background />
          <header></header>
          <main>{children}</main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
