"use client";
import React from "react";
import Image from "next/image";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import jep from "@/public/images/k-removebg-preview.png";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";


const words = `Hover over the boxes above and click. To be used on backgrounds of hero sections or Call to Action sections. I beg you don't use it everywhere.`;

export default function BackgroundRippleEffectDemo() {
  const [ctaClicked, setCtaClicked] = React.useState(false);

  function handleCTA(e: React.MouseEvent) {
    e.preventDefault();
    setCtaClicked(true);
    setTimeout(() => setCtaClicked(false), 1800);
  }
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />

      <div className="mt-54 w-full">
        <div className="mx-auto grid max-w-6xl gap-10 items-center px-4 lg:grid-cols-2">
          <div className="relative z-10 text-center lg:text-left">
           <div className="mx-auto lg:mx-0 mb-4 inline-block">
            <span className="relative text-xs font-semibold text-zinc-900 dark:text-zinc-100"><LayoutTextFlip words={["Web Developer", "Full Stack Engineer", "Data Analyst", "Web Designer"]} /></span>
            </div>
            <h2 className="text-4xl font-extrabold text-neutral-800 md:text-6xl lg:text-7xl xl:text-8xl dark:text-neutral-100">
              Jeffrey <br /> Sedoro
            </h2>
            <h5 className="mt-6 max-w-2xl text-lg md:text-xl lg:text-xl text-neutral-800 dark:text-neutral-500">
              <i><TextGenerateEffect words={words} /></i>
            </h5>

            <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
              <button
                onClick={handleCTA}
                className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-lg text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                 <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                Download Resume
              </button>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/20 to-white/5 dark:from-zinc-900/40 dark:to-zinc-900/10 shadow-none border border-transparent">
              <div className="rounded-t-2xl bg-gradient-to-r from-white/90 via-zinc-50/70 to-zinc-100/80 dark:from-zinc-800/70 dark:via-zinc-900/60 dark:to-zinc-950/60 backdrop-blur-sm px-4 py-3 border-b border-zinc-200/20 dark:border-zinc-700/30">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-sm ring-1 ring-white/50" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-sm ring-1 ring-white/50" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-sm ring-1 ring-white/50" />
                </div>
              </div>

              <div className="overflow-hidden rounded-b-2xl bg-transparent">
                <Image
                  src={jep}
                  alt="Decorative"
                  width={900}
                  height={600}
                  loading="eager"
                  className="h-96 w-full object-cover sm:h-[30rem] md:h-[32rem] lg:h-[34rem] transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-indigo-400/30 dark:group-hover:border-indigo-300/30" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.12)]" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
