"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import BlurText from "./BlurText";

const FACTORS = [
  {
    id: 1,
    num: "01",
    label: "Industry Competition",
    line1: "Industry",
    line2: "competition",
    category: "MARKET LANDSCAPE",
  },
  {
    id: 2,
    num: "02",
    label: "Target Keywords",
    line1: "Number of",
    line2: "target keywords",
    category: "SEARCH VOLUME",
  },
  {
    id: 3,
    num: "03",
    label: "Website Condition",
    line1: "Website condition &",
    line2: "technical issues",
    category: "AUDIT & HEALTH",
  },
  {
    id: 4,
    num: "04",
    label: "Content & Backlinks",
    line1: "Content and",
    line2: "backlink requirements",
    category: "AUTHORITY GROWTH",
  },
];

export default function ShapeOfIntelligence() {
  const containerRef = useRef(null);
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const prevIndexRef = useRef(0);

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.25,
    restDelta: 0.0001,
  });

  const totalFactors = FACTORS.length;

  // Phase 1: 0.0 -> 0.15 (Heading modern reveal)
  // Phase 2: 0.18 -> 0.90 (The 4 Factors Kinetic Scroll Drum)
  const progressFloat = useTransform(
    smoothProgress,
    [0.18, 0.90],
    [0, totalFactors - 1],
    { clamp: true }
  );

  // Content Below Opacity: Appears smoothly with the drum
  const contentBelowOpacity = useTransform(
    smoothProgress,
    [0.10, 0.20],
    [0, 1],
    { clamp: true }
  );

  const contentBelowY = useTransform(
    smoothProgress,
    [0.10, 0.20],
    [20, 0],
    { clamp: true }
  );

  // Track active factor index based on scroll
  useMotionValueEvent(progressFloat, "change", (latest) => {
    const rounded = Math.min(
      totalFactors - 1,
      Math.max(0, Math.round(latest))
    );
    if (rounded !== prevIndexRef.current) {
      prevIndexRef.current = rounded;
      setActiveFactorIndex(rounded);
    }
  });

  // Scroll directly to a specific factor
  const scrollToFactor = (idx) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = 0.18 + (idx / (totalFactors - 1)) * (0.90 - 0.18);
    const targetScroll = containerTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const handleNextClick = () => {
    if (activeFactorIndex < totalFactors - 1) {
      scrollToFactor(activeFactorIndex + 1);
    } else {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
          top: rect.bottom + scrollTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${(totalFactors + 1.5) * 85}vh`,
      }}
    >
      {/* Sticky Screen Viewport */}
      <div
        className="sticky top-0 left-0 w-full h-screen min-h-[660px] max-h-[1080px] bg-[#DEE2E6] text-[#243e76] overflow-hidden select-none flex flex-col justify-between"
        style={{ fontFamily: "'Varela Round', sans-serif" }}
      >
        {/* Subtle grid accent background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#243e76 1px, transparent 1px), linear-gradient(90deg, #243e76 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Ambient background accent */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#0481a2]/10 blur-3xl pointer-events-none rounded-full" />

        {/* ================= MAIN OPTICALLY-CENTERED KINETIC STAGE ================= */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden">
          
          {/* Depth gradient mask for 3D top/bottom fading */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, #DEE2E6 0%, rgba(222,226,230,0) 22%, rgba(222,226,230,0) 78%, #DEE2E6 100%)",
            }}
          />

          {/* ================= MODERN TRENDING HEADER LOCKUP (STRICT USER CONTENT ONLY) ================= */}
          <div className="absolute left-6 md:left-12 lg:left-16 top-10 md:top-14 z-20 max-w-3xl pointer-events-auto flex flex-col">
            {/* 1. Main High-Impact Headline */}
            <div>
              <BlurText
                text="SEO Services Cost in Chennai"
                delay={85}
                animateBy="words"
                direction="top"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#243e76] tracking-tight leading-tight"
              />
            </div>

            {/* 2. Modern Subtitle with Blur Reveal */}
            <div className="pt-2 max-w-2xl">
              <BlurText
                text="SEO pricing depends on competition, keywords and business goals."
                delay={45}
                animateBy="words"
                direction="top"
                className="text-base sm:text-lg md:text-xl text-[#243e76]/85 font-medium leading-relaxed"
              />
            </div>
          </div>

          {/* ================= CONTENT BELOW: 3D KINETIC DRUM ================= */}

          {/* Centered Typography Drum Box */}
          <motion.div
            style={{
              opacity: contentBelowOpacity,
            }}
            className="relative w-full max-w-7xl mx-auto h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-start pl-4 sm:pl-16 md:pl-36 lg:pl-56 xl:pl-64 mt-20"
          >
            {FACTORS.map((factor, idx) => (
              <FactorSlide
                key={factor.id}
                factor={factor}
                index={idx}
                progressFloat={progressFloat}
                onClick={() => scrollToFactor(idx)}
              />
            ))}
          </motion.div>

          {/* Contact CTA Bar (Bottom Left) */}
          <motion.div
            style={{
              opacity: contentBelowOpacity,
              y: contentBelowY,
            }}
            className="absolute left-6 md:left-12 lg:left-16 bottom-10 md:bottom-12 z-20 max-w-2xl group cursor-pointer"
          >
            <p className="text-[14.5px] sm:text-[16px] md:text-[17px] font-medium tracking-tight text-[#243e76] group-hover:text-[#0481a2] transition-colors duration-300 flex items-center gap-2 flex-wrap">
              <span>Contact us for a custom SEO strategy and pricing based on your business needs</span>
              <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1.5 text-[#0481a2] font-bold">
                →
              </span>
            </p>
            <div className="h-[2px] w-0 group-hover:w-full bg-[#0481a2] transition-all duration-500 ease-out mt-1 rounded-full" />
          </motion.div>

          {/* Floating Down Arrow Action */}
          <motion.button
            style={{
              opacity: contentBelowOpacity,
            }}
            onClick={handleNextClick}
            aria-label="Next Factor"
            className="absolute right-6 md:right-12 lg:right-16 bottom-8 md:bottom-10 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-xl hover:bg-[#0481a2] hover:text-white transition-all text-[#243e76] border border-[#243e76]/15 active:scale-95 group cursor-pointer"
          >
            <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Sub-component for each factor's scroll-driven 3D cylindrical animation
function FactorSlide({ factor, index, progressFloat, onClick }) {
  const y = useTransform(progressFloat, (val) => {
    const delta = index - val;
    return delta * 180;
  });

  const rotateX = useTransform(progressFloat, (val) => {
    const delta = index - val;
    return delta * -28;
  });

  const scale = useTransform(progressFloat, (val) => {
    const delta = Math.abs(index - val);
    return Math.max(0.85, 1 - delta * 0.12);
  });

  const opacity = useTransform(progressFloat, (val) => {
    const delta = Math.abs(index - val);
    if (delta > 0.95) return 0;
    return Math.max(0, 1 - delta * 1.15);
  });

  const filter = useTransform(progressFloat, (val) => {
    const delta = Math.abs(index - val);
    const blur = Math.min(8, delta * 7);
    return `blur(${blur}px)`;
  });

  const pointerEvents = useTransform(progressFloat, (val) => {
    return Math.abs(index - val) < 0.5 ? "auto" : "none";
  });

  return (
    <motion.div
      onClick={onClick}
      style={{
        y,
        rotateX,
        scale,
        opacity,
        filter,
        pointerEvents,
        transformPerspective: 1000,
        transformOrigin: "center center",
      }}
      className="absolute left-4 sm:left-12 md:left-28 lg:left-48 xl:left-60 right-0 cursor-pointer select-none"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-widest text-[#0481a2] uppercase px-3 py-1 rounded-full bg-white/70 border border-[#0481a2]/20">
          {factor.num} • {factor.category}
        </span>
      </div>
      <h2 className="text-[42px] sm:text-[60px] md:text-[80px] lg:text-[96px] font-bold leading-[1.03] tracking-[-0.035em]">
        <span className="block text-[#243e76]">
          {factor.line1}
        </span>
        <span className="block text-[#0481a2]">
          {factor.line2}
        </span>
      </h2>
    </motion.div>
  );
}
