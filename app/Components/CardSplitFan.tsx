"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import {
  Layout,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function CardSplitFan() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth responsive spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001,
  });

  // 1. LEFT CARD 3D MAGNETIC ARC PEEL
  const leftX = useTransform(smoothProgress, [0.06, 0.72], ["0%", "-54%"]);
  const leftY = useTransform(smoothProgress, [0.06, 0.4, 0.72], ["0px", "6px", "0px"]);
  const leftRotateY = useTransform(smoothProgress, [0.06, 0.72], [0, 14]);
  const leftRotateX = useTransform(smoothProgress, [0.06, 0.72], [0, 3]);
  const leftRotateZ = useTransform(smoothProgress, [0.06, 0.72], [0, -4]);
  const leftScale = useTransform(smoothProgress, [0.06, 0.72], [0.96, 1]);
  const leftShadow = useTransform(
    smoothProgress,
    [0.06, 0.72],
    [
      "0 15px 30px rgba(36, 62, 118, 0.15)",
      "0 25px 60px rgba(36, 62, 118, 0.25)",
    ]
  );

  // 2. RIGHT CARD 3D MAGNETIC ARC PEEL
  const rightX = useTransform(smoothProgress, [0.06, 0.72], ["0%", "54%"]);
  const rightY = useTransform(smoothProgress, [0.06, 0.4, 0.72], ["0px", "6px", "0px"]);
  const rightRotateY = useTransform(smoothProgress, [0.06, 0.72], [0, -14]);
  const rightRotateX = useTransform(smoothProgress, [0.06, 0.72], [0, -3]);
  const rightRotateZ = useTransform(smoothProgress, [0.06, 0.72], [0, 4]);
  const rightScale = useTransform(smoothProgress, [0.06, 0.72], [0.96, 1]);
  const rightShadow = useTransform(
    smoothProgress,
    [0.06, 0.72],
    [
      "0 15px 30px rgba(4, 129, 162, 0.15)",
      "0 25px 60px rgba(4, 129, 162, 0.25)",
    ]
  );

  // Content reveal ONLY AFTER cards have separated/split
  const contentOpacity = useTransform(smoothProgress, [0.48, 0.76], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.48, 0.76], [24, 0]);

  const websiteFeatures = [
    "Clear, easy navigation",
    "Easy to update and scale",
    "Boosts conversions",
    "Modern, professional design",
    "Fast, smooth user experience",
    "Mobile-friendly on all devices",
  ];

  const brandingFeatures = [
    "Memorable brand identity",
    "Storytelling that resonates",
    "Consistent visuals across channels",
    "Engaging designs for your audience",
    "Professional and credible image",
    "Improves recognition and loyalty",
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[230vh] bg-[#ffffff] select-none"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Sticky 100vh Viewport with 3D Perspective */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-between px-4 pt-4 sm:pt-6 pb-4 sm:pb-6"
        style={{ perspective: "1600px" }}
      >
        {/* 1. TOP HEADER CONTENT */}
        <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto flex-shrink-0">
          {/* Eyebrow Badge */}
          <span
            className="inline-block px-3.5 py-0.5 rounded-full text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#0481a2] bg-[#0481a2]/10 border border-[#0481a2]/20 mb-1.5 shadow-sm"
          >
            PREMIUM ADD-ONS
          </span>

          {/* Main Title */}
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black text-[#243e76] tracking-tight leading-tight mb-1"
          >
            Perfect Add-On for Your SEO Strategy
          </h2>

          {/* Subtitle with Link */}
          <p className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[#243e76]/75 max-w-2xl leading-snug">
            Strategic enhancements designed to strengthen{" "}
            <Link
              href="https://brand360s.com/services/website-development-services-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0481a2] hover:text-[#243e76] font-bold underline decoration-[#0481a2]/40 hover:decoration-[#243e76] underline-offset-4 transition-colors"
            >
              website performance
            </Link>{" "}
            and brand authority for long-term search visibility.
          </p>
        </div>

        {/* 2. 2-CARD STAGE CONTAINER */}
        <div
          className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-auto pt-1 pb-3 sm:pb-4"
          style={{ transformStyle: "preserve-3d" }}
        >

          {/* ────────────────────────────────────────────────────────
              CARD 1 (LEFT SOLID ROYAL NAVY CARD - WEBSITE DESIGN)
             ──────────────────────────────────────────────────────── */}
          <motion.div
            style={{
              x: leftX,
              y: leftY,
              rotateY: leftRotateY,
              rotateX: leftRotateX,
              rotateZ: leftRotateZ,
              scale: leftScale,
              boxShadow: leftShadow,
              zIndex: 20,
              transformStyle: "preserve-3d",
            }}
            className="absolute pointer-events-auto w-[280px] h-[400px] sm:w-[330px] sm:h-[450px] md:w-[370px] md:h-[480px] lg:w-[410px] lg:h-[500px] rounded-[24px] sm:rounded-[28px] overflow-hidden border-2 border-white/20 bg-[#243e76] will-change-transform shadow-2xl p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between"
          >
            {/* Revealed Content (Fades in ONLY AFTER cards split) */}
            <motion.div
              style={{
                opacity: contentOpacity,
                y: contentY,
              }}
              className="relative z-20 flex flex-col justify-between h-full"
            >
              {/* Card Header: Icon + Title + Description */}
              <div>
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner flex-shrink-0">
                    <Layout className="w-5 h-5 sm:w-6 sm:h-6 text-[#38bdf8]" />
                  </div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-white leading-tight">
                    Website Design &amp; Redesign Services
                  </h3>
                </div>

                <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13px] text-white/80 font-medium leading-snug mb-2 sm:mb-3">
                  Optimize your website structure and UX for better SEO performance.
                </p>

                {/* Feature Points */}
                <div className="space-y-1 sm:space-y-1.5 lg:space-y-2 border-t border-white/15 pt-2 sm:pt-2.5">
                  {websiteFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#38bdf8]" />
                      </div>
                      <span className="text-[11px] sm:text-[12px] lg:text-[12.5px] text-white/90 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions / Buttons */}
              <div className="pt-2.5 sm:pt-3 border-t border-white/15 flex items-center gap-2 sm:gap-2.5">
                <Link
                  href="https://brand360s.com/services/website-development-services-in-chennai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] sm:text-[12px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#38bdf8]" />
                </Link>
                <Link
                  href="https://brand360s.com/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center py-2 px-3 rounded-xl text-[11px] sm:text-[12px] font-bold text-white bg-[#0481a2] hover:bg-[#036f8c] shadow-lg shadow-black/10 transition-all duration-200 active:scale-95"
                >
                  Enquire Now
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* ────────────────────────────────────────────────────────
              CARD 2 (RIGHT SOLID BRAND TEAL CARD - BRANDING & IDENTITY)
             ──────────────────────────────────────────────────────── */}
          <motion.div
            style={{
              x: rightX,
              y: rightY,
              rotateY: rightRotateY,
              rotateX: rightRotateX,
              rotateZ: rightRotateZ,
              scale: rightScale,
              boxShadow: rightShadow,
              zIndex: 10,
              transformStyle: "preserve-3d",
            }}
            className="absolute pointer-events-auto w-[280px] h-[400px] sm:w-[330px] sm:h-[450px] md:w-[370px] md:h-[480px] lg:w-[410px] lg:h-[500px] rounded-[24px] sm:rounded-[28px] overflow-hidden border-2 border-white/20 bg-[#0481a2] will-change-transform shadow-2xl p-4 sm:p-5 lg:p-6 text-white flex flex-col justify-between"
          >
            {/* Revealed Content (Fades in ONLY AFTER cards split) */}
            <motion.div
              style={{
                opacity: contentOpacity,
                y: contentY,
              }}
              className="relative z-20 flex flex-col justify-between h-full"
            >
              {/* Card Header: Icon + Title + Description */}
              <div>
                <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 border border-white/30 flex items-center justify-center shadow-inner flex-shrink-0">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#facc15]" />
                  </div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-white leading-tight">
                    Branding &amp; Identity Design
                  </h3>
                </div>

                <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13px] text-white/85 font-medium leading-snug mb-2 sm:mb-3">
                  Build brand credibility that boosts authority and engagement signals.
                </p>

                {/* Feature Points */}
                <div className="space-y-1 sm:space-y-1.5 lg:space-y-2 border-t border-white/20 pt-2 sm:pt-2.5">
                  {brandingFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-white/15 border border-white/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#ffffff]" />
                      </div>
                      <span className="text-[11px] sm:text-[12px] lg:text-[12.5px] text-white/95 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions / Buttons */}
              <div className="pt-2.5 sm:pt-3 border-t border-white/20 flex items-center gap-2 sm:gap-2.5">
                <Link
                  href="https://brand360s.com/services/brand-identity-design-services-in-chennai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] sm:text-[12px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all duration-200"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#ffffff]" />
                </Link>
                <Link
                  href="https://brand360s.com/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-[11px] sm:text-[12px] font-black text-[#0481a2] bg-white hover:bg-[#f0f9ff] shadow-lg shadow-black/10 transition-all duration-200 active:scale-95"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0481a2]" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}


