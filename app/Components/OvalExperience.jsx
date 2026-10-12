"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const POINTS = [
  "Get discovered faster.",
  "Get more calls.",
  "Build hyper-local authority that drives revenue",
  "Increase footfall.",
];

export default function OvalExperience() {
  const containerRef = useRef(null);

  // Scroll Progress across the multi-step journey
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.25,
    restDelta: 0.0001,
  });

  // ================= SCROLL TIMELINE EXACT CHOREOGRAPHY =================

  // 1. Left & Right Width Choreography:
  // Starts 100% -> Splits to 50% (0.08-0.18) -> Stays 50% -> EXPANDS to 100% (0.50-0.64) PUSHING right image out!
  const leftWidth = useTransform(
    smoothProgress, 
    [0.08, 0.18, 0.50, 0.64], 
    ["100%", "50%", "50%", "100%"]
  );
  const rightWidth = useTransform(
    smoothProgress, 
    [0.08, 0.18, 0.50, 0.64], 
    ["0%", "50%", "50%", "0%"]
  );

  // 2. Initial text directly under oval emblem (fades as zoom starts):
  const logoTextOpacity = useTransform(smoothProgress, [0, 0.10, 0.18], [1, 1, 0]);

  // 3. Exact Massive Aperture Scale:
  const ovalEmblemScale = useTransform(
    smoothProgress,
    [0, 0.18, 0.35, 0.52, 0.64],
    [1, 1, 3.0, 10.0, 20.0]
  );

  // Oval physically shifts to the right as left container expands and pushes right image out
  const ovalEmblemX = useTransform(
    smoothProgress,
    [0, 0.50, 0.64],
    ["0%", "0%", "24%"]
  );

  // 4. First Content Reveal INSIDE expanding oval cavity:
  // Aperture expands (0.18 -> 0.64), revealing crystal-sharp native text strictly within the circle
  const apertureClip = useTransform(
    smoothProgress,
    [0.18, 0.30, 0.46, 0.64],
    [
      "ellipse(0px 0px at 50% 50%)",
      "ellipse(140px 190px at 50% 50%)",
      "ellipse(550px 700px at 50% 50%)",
      "ellipse(2500px 2500px at 50% 50%)",
    ]
  );
  const contentOpacity = useTransform(smoothProgress, [0.22, 0.32, 0.58, 0.66], [0, 1, 1, 0]);
  const contentY = useTransform(smoothProgress, [0.22, 0.32, 0.58, 0.66], [25, 0, 0, -25]);

  // 5. Left Hero Color Image (Slides UP from bottom AFTER first content has disappeared):
  const leftImageY = useTransform(smoothProgress, [0.68, 0.80], ["100%", "0%"]);
  const leftImageOpacity = useTransform(smoothProgress, [0.68, 0.74], [0, 1]);

  // 6. Right Near-Me Content Reveal (Appears cleanly AFTER first content is gone):
  const rightContentOpacity = useTransform(smoothProgress, [0.72, 0.82, 0.95, 1.0], [0, 1, 1, 1]);
  const rightContentY = useTransform(smoothProgress, [0.72, 0.82, 0.95, 1.0], [40, 0, 0, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#101c38] text-white select-none overflow-clip"
      style={{
        height: "500vh",
        fontFamily: "'Varela Round', sans-serif",
      }}
    >
      {/* Sticky Fullscreen Viewport Window */}
      <div className="sticky top-0 left-0 w-full h-screen max-h-screen overflow-hidden flex">
        
        {/* ================= 1. LEFT 50% STAGE ================= */}
        <motion.div
          style={{ width: leftWidth }}
          className="relative h-full bg-[#030a1c] flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-20 overflow-hidden shrink-0"
        >

          {/* ================= THE ICONIC OVAL APERTURE EMBLEM (EXPANDS OUT) ================= */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 overflow-hidden">
            <motion.div
              style={{
                scale: ovalEmblemScale,
                x: ovalEmblemX,
                transformOrigin: "center center",
              }}
              className="relative w-44 h-56 sm:w-52 sm:h-68 md:w-60 md:h-80 flex items-center justify-center shrink-0 will-change-transform"
            >
              {/* Outer Silver-Grey Squircle Frame with transparent cutout hole */}
              <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                <mask id="squircleApertureHoleMask">
                  <rect x="0" y="0" width="100" height="130" fill="white" />
                  <ellipse cx="50" cy="65" rx="26" ry="39" fill="black" transform="rotate(-18 50 65)" />
                </mask>
                <rect
                  x="8"
                  y="10"
                  width="84"
                  height="110"
                  rx="30"
                  fill="#E5E7EB"
                  mask="url(#squircleApertureHoleMask)"
                />
              </svg>
            </motion.div>

            {/* Content directly beneath Oval (Visible initially, fades as zoom starts) */}
            <motion.div
              style={{ opacity: logoTextOpacity }}
              className="mt-6 text-center pointer-events-none px-4 max-w-sm"
            >
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#38BDF8] uppercase leading-relaxed block">
                Local SEO, Google Maps & GMB Optimization
              </span>
            </motion.div>
          </div>

          {/* ================= 1. LEFT ZOOM CONTENT — 100% CRISP VECTOR HD QUALITY ON THE LEFT ================= */}
          <motion.div
            style={{
              clipPath: apertureClip,
              opacity: contentOpacity,
              y: contentY,
            }}
            className="absolute top-0 left-0 w-full h-full z-20 flex flex-col justify-center items-start px-8 sm:px-12 md:px-16 lg:px-20 pointer-events-none overflow-hidden"
          >
            <div className="max-w-lg w-full flex flex-col items-start text-left">
              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-[1.15] mb-6 sm:mb-8">
                Be the first business{" "}
                <span className="text-[#38BDF8]">customers see</span>
              </h2>

              {/* 4 Points */}
              <div className="w-full space-y-3.5 sm:space-y-4">
                {POINTS.map((text, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shrink-0" />
                    <p className="text-base sm:text-lg md:text-xl text-neutral-100 font-medium tracking-tight leading-snug">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= 2. LEFT INCOMING HERO COLOR IMAGE (SLIDES UP FROM BOTTOM ON LEFT HALF) ================= */}
          <motion.div
            style={{
              y: leftImageY,
              opacity: leftImageOpacity,
            }}
            className="absolute top-0 left-0 w-full lg:w-1/2 h-full z-25 overflow-hidden pointer-events-none"
          >
            <Image
              src="/images/process_step4.jpg"
              alt="Hero Color Craft"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover contrast-105 brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </motion.div>

          {/* ================= 3. RIGHT NEAR-ME CONTENT REVEAL (REVEALED ON EXPANDED CANVAS AS RIGHT IMAGE PUSHES OUT) ================= */}
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-25 flex flex-col justify-center px-8 sm:px-12 lg:px-16 pointer-events-none overflow-hidden">
            <motion.div
              style={{
                opacity: rightContentOpacity,
                y: rightContentY,
              }}
              className="max-w-xl flex flex-col items-start text-left space-y-5"
            >
              {/* Tag / Headline */}
              <div className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#38BDF8] uppercase leading-tight">
                DOMINATE NEAR-ME SEARCHES — WITH OR WITHOUT A WEBSITE
              </div>

              {/* Paragraph 1 */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                Most customers never scroll past the top results on Google Maps visibility here directly influences calls, enquiries and footfalls.
              </h3>

              {/* Paragraph 2 */}
              <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed">
                Through geo-targeted keywords, optimized listings, citation building, reviews and media posts, we strengthen local SEO performance across Maps and near-me searches.
              </p>

              {/* Paragraph 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <p className="text-xs sm:text-sm md:text-base text-neutral-200 font-normal leading-relaxed">
                  <span className="text-[#38BDF8] font-semibold">Ideal for</span> salons, clinics, restaurants, boutiques, studios and Chennai service providers looking to improve local search visibility.
                </p>
              </div>
            </motion.div>
          </div>

        </motion.div>

        {/* ================= 4. RIGHT IMAGE PANEL (PUSHED OFF-SCREEN AS LEFT CANVAS EXPANDS) ================= */}
        <motion.div
          style={{ width: rightWidth }}
          className="relative h-full bg-[#030a1c] overflow-hidden z-30 shrink-0 border-l border-blue-900/30"
        >
          <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
            <Image
              src="/images/process_step1.jpg"
              alt="Local SEO Editorial"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover contrast-105 brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
