"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function CurvedTextScroll() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth responsive spring physics for ultra-smooth 120fps glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001,
  });

  // Phase 1 (0 to 0.45): Title starts 100% completely offscreen on the far right (96%) and glides into center (50%)
  const curveOffset = useTransform(smoothProgress, [0, 0.45], ["96%", "50%"]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.04, 0.45], [1, 1, 1]);

  // Phase 2 (0.45 to 0.82): Paragraph content slides up from bottom to top beneath the locked curved heading
  const contentY = useTransform(smoothProgress, [0.45, 0.80], [100, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.45, 0.72], [0, 1]);
  const contentScale = useTransform(smoothProgress, [0.45, 0.80], [0.94, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[240vh] bg-gradient-to-b from-[#020713] via-[#040e24] to-[#020713] text-white"
    >
      {/* STICKY PINNED VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center select-none px-4 sm:px-8">
        
        {/* BACKGROUND AMBIENT GLOWS */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0481a2]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#38bdf8]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#243e76]/25 rounded-full blur-[160px] pointer-events-none" />

        {/* PHASE 1: DOWNWARD DIP CURVE TITLE (Enters from 100% offscreen right and locks in center) */}
        <div className="relative w-full max-w-[98vw] lg:max-w-7xl mx-auto flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 1800 340"
            className="w-full h-auto max-h-[240px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-[400px] overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Downward Dipping Curve Path with ultra-wide offscreen wings (-1400 to 3200) */}
              <path
                id="titleDownCurvePath"
                d="M -1400 70 Q 900 290, 3200 70"
                fill="none"
              />

              {/* Glowing Title Gradient */}
              <linearGradient id="textGradTitle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#38bdf8" />
                <stop offset="70%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#0481a2" />
              </linearGradient>

              {/* Glowing Neon Shadow Filter */}
              <filter id="titleGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* CURVED TITLE TEXT: Glides smoothly from outside right into center (50%) */}
            <motion.text
              textAnchor="middle"
              filter="url(#titleGlow)"
              style={{
                opacity: titleOpacity,
                fontFamily: "'Outfit', sans-serif",
                fill: "url(#textGradTitle)",
              }}
              className="text-[34px] sm:text-[40px] md:text-[45px] lg:text-[48px] font-extrabold uppercase tracking-[0.04em]"
            >
              <motion.textPath
                href="#titleDownCurvePath"
                startOffset={curveOffset}
              >
                A Trusted Presentation Design Agency Company in Chennai
              </motion.textPath>
            </motion.text>
          </svg>
        </div>

        {/* PHASE 2: BOTTOM PARAGRAPH CONTENT (Slides up from bottom to top as you scroll) */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
            scale: contentScale,
          }}
          className="relative z-10 max-w-3xl sm:max-w-4xl mx-auto text-center mt-2 sm:mt-6 px-4"
        >
          <p
            className="text-base sm:text-lg md:text-xl lg:text-[22px] text-white/95 leading-relaxed font-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#38bdf8] font-bold">BRAND 360s</span> supports brands in Chennai, across India and in Switzerland with premium presentation and pitch deck design. Our approach balances storytelling, visual clarity and global design quality, ensuring every deck performs in high-stakes environments.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
