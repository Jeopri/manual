"use client";
import React from "react";
import { motion } from "motion/react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <motion.div
        className="relative flex h-full w-full min-h-[560px] items-start justify-start overflow-hidden rounded-md"
        whileHover={{ scale: 1.01, y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <img
          src="/linear.webp"
          width={1200}
          height={800}
          className="absolute inset-0 h-full w-full object-cover filter blur-sm scale-105"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-white">Collaborative Editing</h3>
          <p className="mt-3 max-w-md text-white/80 text-sm md:text-base">Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.</p>
        </div>
      </motion.div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <motion.div
        className="relative flex h-full w-full min-h-[560px] items-start justify-start overflow-hidden rounded-md"
        whileHover={{ scale: 1.01, y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <img
          src="/linear.webp"
          width={1200}
          height={800}
          className="absolute inset-0 h-full w-full object-cover filter blur-sm scale-105"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-white">Real time changes</h3>
          <p className="mt-3 max-w-md text-white/80 text-sm md:text-base">See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project.</p>
        </div>
      </motion.div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <motion.div
        className="relative flex h-full w-full min-h-[560px] items-start justify-start overflow-hidden rounded-md"
        whileHover={{ scale: 1.01, y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <img
          src="/linear.webp"
          width={1200}
          height={800}
          className="absolute inset-0 h-full w-full object-cover filter blur-sm scale-105"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-white">Version control</h3>
          <p className="mt-3 max-w-md text-white/80 text-sm md:text-base">Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version.</p>
        </div>
      </motion.div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <motion.div
        className="relative flex h-full w-full min-h-[560px] items-start justify-start overflow-hidden rounded-md"
        whileHover={{ scale: 1.01, y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <img
          src="/linear.webp"
          width={1200}
          height={800}
          className="absolute inset-0 h-full w-full object-cover filter blur-sm scale-105"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-white">Running out of content</h3>
          <p className="mt-3 max-w-md text-white/80 text-sm md:text-base">Experience real-time updates and never stress about version control again. Stay in the loop, keep your team aligned, and maintain the flow of your work.</p>
        </div>
      </motion.div>
    ),
  },
];
export default function Tools() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
