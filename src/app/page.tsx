import { HoverEffect } from "@ui/components/cardHoverEffect/CardHoverEfffect";
import { AuroraBackgroundHero } from "@ui/hero/Hero";
import Link from "next/link";

import { WobbleCard } from "@/ui/components/woobleCard/WoobleCard";

const projects = [
  {
    title: "Llama",
    description: "Llama 3, Llama 2, Hermes-2-Pro-Llama-3",
    link: "https://llama.meta.com",
  },
  {
    title: "Phi",
    description: "Phi 3, Phi 2, Phi 1.5",
    link: "https://azure.microsoft.com/en-us/products/phi-3",
  },
  {
    title: "Gemma",
    description: "Gemma-2B",
    link: "https://ai.google.dev/gemma",
  },
  {
    title: "Qwen",
    description: "Qwen2 0.5B, 1.5B, 7B",
    link: "https://github.com/QwenLM/Qwen",
  },
];

export default function Home() {
  return (
    <section>
      <AuroraBackgroundHero />
      <div className="container flex flex-col px-8 pt-10 mx-auto">
        <div className="text-3xl font-bold text-center md:text-5xl dark:text-white">
          <h2>You can choose between these models</h2>
        </div>
        <HoverEffect items={projects} />
        <div className="pb-10 text-3xl font-bold text-center md:text-5xl dark:text-white">
          <h2>Requirements and Limitations</h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 mx-auto lg:grid-cols-3 max-w-7xl">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-primary-800 min-h-[500px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-full">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Works in client-side and your browser must support WebGPU
              </h2>
              <p className="mt-4 text-xl text-left text-neutral-200">
                In order to use this application, you must have a browser that
                supports WebGPU. If you are using a browser that does not
                support WebGPU, try using a different browser or updating your
                current browser. You can check if your browser supports WebGPU
                at CanIUse WebG.
              </p>
            </div>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-secondary-800">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              {`Must possibly won't work on mobile devices`}
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-xl text-neutral-200">
              Due to the high computational requirements of the models, and
              needs for WebGPU, it is possible that the application will not
              work on mobile devices. We recommend using a desktop or laptop
              computer to use this application.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-primary-800 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-full">
              <h2 className="max-w-7xl text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Models are downloaded local so you must have enough space
              </h2>
              <p className="mt-4 max-w-[80rem] text-left  text-xl text-neutral-200">
                The models are downloaded locally to your device, so you must
                have enough space on your device to download the models. Also it
                would use your GPU to run the models, so make sure you have
                enough VRAM when running the models. All models specify the
                amount of VRAM they need to run.
              </p>
            </div>
          </WobbleCard>
        </div>
        <div className="flex items-center justify-center p-2">
          <h3 className="transition-colors hover:text-primary-500">
            Made by{" "}
            <Link href="https://vladimircuriel.me">Vladimir Curiel</Link>
          </h3>
        </div>
      </div>
    </section>
  );
}
