"use client";
import React from "react";
import Image from "next/image";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import jep from "@/public/images/k-removebg-preview.png";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion, useScroll, useSpring } from "motion/react";
import { useRouter } from "next/navigation";


const words = `Results-driven IT graduate specializing in web development, data analytics, automation, and AI integrations, experienced building scalable systems, dashboards, and efficient workflows across multi-branch business environments with confidence.`;

export default function BackgroundRippleEffectDemo() {
  const [ctaClicked, setCtaClicked] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  function handleCTA(e: React.MouseEvent) {
    e.preventDefault();
    setCtaClicked(true);
    setTimeout(() => {
      setCtaClicked(false);
      document.getElementById("main-section")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }
function handleSecondaryCTA(e: React.MouseEvent) {
  e.preventDefault();
  
  const link = document.createElement("a");
  link.href = "/Jeffrey_Sedoro_Resume.pdf";
  link.download = "Jeffrey_Sedoro_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
        <BackgroundRippleEffect />

        <div className="w-full py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-10 items-center px-4 lg:grid-cols-2">
            <div className="relative z-10 text-center lg:text-left">
              <div className="mx-auto lg:mx-0 mb-4 inline-block">
              <span className="relative text-xs font-semibold text-foreground"><LayoutTextFlip words={["Web Developer", "Full Stack Engineer", "Data Analyst", "Web Designer"]} /></span>
              </div>
              <h2 className="text-4xl font-extrabold text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
                Jeffrey <br /> Sedoro
              </h2>
              <h5 className="mt-6 max-w-2xl text-sm md:text-base lg:text-base font-normal text-muted-foreground">
                <i>
                  <TextGenerateEffect words={words} />
                </i>
              </h5>

              <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={handleSecondaryCTA}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-6 text-sm text-primary transition-all hover:bg-primary/20 hover:border-primary/50 active:scale-[0.97]"
                >
                   <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                  Download Resume
                </button>
  <button
    onClick={handleCTA}
    className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97]"
  >
    Get Started
      <svg
      className="w-4 h-4 ml-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14m0 0l-6-6m6 6l-6 6"
      />
    </svg>
  </button>
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-xl">
              <div className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-none">
                <div className="rounded-t-2xl bg-secondary/70 backdrop-blur-sm px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-sm ring-1 ring-white/20" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-sm ring-1 ring-white/20" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-sm ring-1 ring-white/20" />
                  </div>
                </div>

                <div className="overflow-hidden rounded-b-2xl">
                  <Image
                    src={jep}
                    alt="Decorative"
                    width={900}
                    height={600}
                    loading="eager"
                    className="h-96 w-full object-cover sm:h-[30rem] md:h-[32rem] lg:h-[34rem] transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-primary/30" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)]" />
              </div>

            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">Scroll</span>
          <motion.svg
            className="w-4 h-4 text-muted-foreground"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
          </motion.svg>
        </motion.div>
      </div>
      <ScrollProgress />
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-extrabold text-foreground md:text-5xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Jeffrey Sedoro
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Loading
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >...</motion.span>
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-12 h-[2px] w-48 overflow-hidden rounded-full bg-border/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

  return (
    <>
      <style>{`
        @keyframes rgb-shift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes rgb-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(255,0,0,0.6), 0 0 30px rgba(255,0,0,0.2); }
          16% { box-shadow: 0 0 12px rgba(255,165,0,0.6), 0 0 30px rgba(255,165,0,0.2); }
          33% { box-shadow: 0 0 12px rgba(255,255,0,0.6), 0 0 30px rgba(255,255,0,0.2); }
          50% { box-shadow: 0 0 12px rgba(0,255,0,0.6), 0 0 30px rgba(0,255,0,0.2); }
          66% { box-shadow: 0 0 12px rgba(0,150,255,0.6), 0 0 30px rgba(0,150,255,0.2); }
          83% { box-shadow: 0 0 12px rgba(150,0,255,0.6), 0 0 30px rgba(150,0,255,0.2); }
        }
        .animate-rgb-line {
          animation: rgb-shift 3s linear infinite, rgb-glow 3s linear infinite;
        }
      `}</style>

      <div className="fixed bottom-0 left-0 z-50 h-[3px] w-full bg-border/30">
        <motion.div
          className="h-full origin-left"
          style={{ scaleX, width: "100%" }}
        >
          <div className="animate-rgb-line h-full w-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-purple-500" />
        </motion.div>
      </div>
    </>
  );
}
