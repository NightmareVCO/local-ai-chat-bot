"use client";

import { AuroraBackground } from "@ui/components/auroraBackground/AuroraBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export function AuroraBackgroundHero() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <div className="text-3xl font-bold text-center md:text-7xl dark:text-white">
          <h1>Explore my local multi-model AI chatbot.</h1>
        </div>
        <div className="py-4 text-base font-extralight md:text-4xl dark:text-neutral-200">
          <h2>{`It's completely free. No registration required.`}</h2>
        </div>
        <button className="px-4 py-2 text-white bg-black rounded-full dark:bg-white w-fit dark:text-black">
          <Link href="/chat">Try now</Link>
        </button>
        <div className="py-4 text-base font-extralight md:text-xl dark:text-neutral-200">
          <h3>See models, requirements and limitations down below.*</h3>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
