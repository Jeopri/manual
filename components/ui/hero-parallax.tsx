"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { useTheme } from "@/app/theme-provider";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

/* ─── HeroParallax ────────────────────────────────────────────────────────── */
export const HeroParallax = ({
  products,
  onProductClick,
}: {
  products: Product[];
  onProductClick?: (product: Product) => void;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  const { theme, toggleTheme } = useTheme();

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        <div className="mb-20">
          <p className="pl-4 mb-3 text-white/50 text-xs md:text-sm font-mono tracking-widest">// Web development</p>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {firstRow.map((product, i) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={`row1-${i}`}
                onClick={() => onProductClick?.(product)}
              />
            ))}
          </motion.div>
        </div>
        <div className="mb-20">
          <p className="pl-4 mb-3 text-white/50 text-xs md:text-sm font-mono tracking-widest">// AI & RPA automation</p>
          <motion.div className="flex flex-row space-x-20">
            {secondRow.map((product, i) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={`row2-${i}`}
                onClick={() => onProductClick?.(product)}
              />
            ))}
          </motion.div>
        </div>
        <div>
          <p className="pl-4 mb-3 text-white/50 text-xs md:text-sm font-mono tracking-widest">// Web designing</p>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {thirdRow.map((product, i) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={`row3-${i}`}
                onClick={() => onProductClick?.(product)}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Header ──────────────────────────────────────────────────────────────── */
export const Header = ({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) => {
  return (
    <div
      id="main-section"
      className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0"
    >
      <div className="grid gap-12 items-center lg:grid-cols-[1.3fr_0.9fr]">
        <div>
          <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
            Consist of <br /> work that spans across design, development, and
            automation.
          </h1>
          <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
            From crafting pixel-perfect interfaces to building robust backend
            systems and automating complex workflows — I bring ideas to life
            across the full spectrum of web.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── ProductCard ─────────────────────────────────────────────────────────── */
export const ProductCard = ({
  product,
  translate,
  onClick,
}: {
  product: Product;
  translate: MotionValue<number>;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0 cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <img
        src={product.thumbnail}
        height="600"
        width="600"
        className="object-cover object-left-top absolute h-full w-full inset-0"
        alt={product.title}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-200" />

      {/* Title + click hint on hover */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/product:opacity-100 transition-opacity duration-200 flex items-end justify-between">
        <h2 className="text-white font-semibold text-base">{product.title}</h2>
        <span className="text-white/60 text-xs">Click to preview</span>
      </div>
    </motion.div>
  );
};