"use client";
import React, { useState } from "react";
import { HeroParallax } from "../../components/ui/hero-parallax";
import { motion, AnimatePresence } from "motion/react";

export const products = [
{
    title: "N/A",
    link: "",
    thumbnail: "/images/ye.gif",
  },
  {
    title: "Malaybalay City Veterinary",
    link: "",
    thumbnail: "/images/landing.jpg",
  },
  {
    title: "BookNest",
    link: "",
    thumbnail: "/images/book.png",
  },
  {
    title: "BuksuLabsecure",
    link: "",
    thumbnail: "/images/bading.png",
  },
  {
    title: "Moneycache-POS  ",
    link: "",
    thumbnail: "/images/wow.png",
  },
{
    title: "N/A",
    link: "",
    thumbnail: "/images/ye.gif",
  },
  {
    title: "AI Chatbot Flow",
    link: "",
    thumbnail: "/images/chat.png",
  },
  {
    title: "Utilizing RPA tools for Automation",
    link: "",
    thumbnail: "/images/tre.png",
  },
  {
    title: "N8n - Email Digest Workflow",
    link: "",
    thumbnail: "/images/ha.png",
  },
  {
    title: "SmartBridge",
    link: "",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
{
    title: "N/A",
    link: "",
    thumbnail: "/images/ye.gif",
  },  
  {
    title: "Creme Digital",
    link: "",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "LogicBase Interactive Mock up Design",
    link: "https://www.figma.com/design/hwDdkJrkap5JTsYseEYcOO/Sedoro_LBI?node-id=0-1&p=f&t=lY8vQk0bPdgoMvV5-0",
    thumbnail: "/images/image.png",
  },
  {
    title: "Moneycache Mock Design",
    link: "https://www.figma.com/design/x75LZo7SwMBG9VjRAx8DDW/MC-Mock-up-D?node-id=0-1&p=f&t=39U83oSjlYIluiuv-0",
    thumbnail: "/images/webdesign1.png",
  },
  {
    title: "N/A",
    link: "",
    thumbnail: "/images/ye.gif",
  },
];

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Product = { title: string; thumbnail: string; link: string };

/* ─── Modal ───────────────────────────────────────────────────────────────── */
function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  // Close on Escape key
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop — click to close */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-white/10"
            initial={{ scale: 0.93, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            {/* Full image */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full max-h-[70vh] object-cover object-top"
            />

            {/* Footer bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/95">
              <h2 className="text-white font-semibold text-base md:text-lg">
                {product.title}
              </h2>
              <div className="flex items-center gap-2">
                {product.link && (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Visit site ↗
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                >
                  Close ✕
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Demo ────────────────────────────────────────────────────────────────── */
export function HeroParallaxDemo() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <HeroParallax
        products={products}
        onProductClick={(product) => setSelected(product)}
      />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default function MainSection() {
  return <HeroParallaxDemo />;
}