"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// Exactly 5 Curated Images for the 2-Left + 1-Center + 2-Right Choreography
const IMAGES = [
  {
    id: 1,
    image: "/images/process_step1.jpg",
    aspect: "aspect-[4/3]",
    targetSlot: "left-top",
  },
  {
    id: 2,
    image: "/images/seo-analytics-hero.jpg",
    aspect: "aspect-[16/10]",
    targetSlot: "left-bottom",
  },
  {
    id: 3,
    image: "/images/process_step2.jpg",
    aspect: "aspect-[4/3]",
    targetSlot: "center",
  },
  {
    id: 4,
    image: "/images/seo-growth-hero.jpg",
    aspect: "aspect-[16/11]",
    targetSlot: "right-top",
  },
  {
    id: 5,
    image: "/images/brand-story-writing.webp",
    aspect: "aspect-[16/10]",
    targetSlot: "right-bottom",
  },
];

const LEFT_POINTS = [
  "Get discovered faster.",
  "Get more calls.",
  "Build hyper-local authority that drives revenue",
  "Increase footfall.",
];

export default function FinetoothStreamGallery() {
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Scroll Progress across the 400vh choreographed journey
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.28,
    restDelta: 0.0001,
  });

  // Content visibility fades in as cards disperse and join their side positions
  const contentOpacity = useTransform(smoothProgress, [0.35, 0.65], [0.2, 1]);
  const contentY = useTransform(smoothProgress, [0.35, 0.65], [30, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#ffffff] text-[#111827] select-none overflow-clip font-sans"
      style={{
        // 420vh allows generous time for the curve-up + split-dock choreography + final hold
        height: "420vh",
      }}
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 left-0 w-full h-screen max-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-8 lg:px-12 pointer-events-none">
        
        {/* Main Stage Grid Container */}
        <div className="relative w-full max-w-[1440px] mx-auto h-full flex items-center justify-center pointer-events-auto">
          
          {/* ================= 1. LEFT CONTENT COLUMN ================= */}
          <motion.div 
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute left-2 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] lg:w-[350px] z-10 flex flex-col items-start justify-center text-left py-4"
          >
            {/* Tag */}
            <div className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-[#2B5CFF] uppercase mb-3">
              Local SEO, Google Maps & GMB Optimization
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#111827] leading-[1.12] mb-6">
              Be the first business{" "}
              <span className="text-[#2B5CFF]">customers see</span>
            </h2>

            {/* 4 Points */}
            <div className="w-full space-y-3">
              {LEFT_POINTS.map((text, idx) => (
                <div key={idx} className="flex items-baseline gap-3 group cursor-default">
                  <span className="font-mono text-xs font-bold text-[#2B5CFF]">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#374151] font-medium leading-snug">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= 2. RIGHT CONTENT COLUMN ================= */}
          <motion.div 
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute right-2 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] lg:w-[350px] z-10 flex flex-col items-start justify-center text-left py-4 space-y-4"
          >
            {/* Headline */}
            <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight text-[#111827] leading-[1.2] uppercase">
              DOMINATE NEAR-ME SEARCHES —{" "}
              <span className="text-[#2B5CFF]">WITH OR WITHOUT A WEBSITE</span>
            </h3>

            {/* Paragraph 1 */}
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal">
              Most customers never scroll past the top results on Google Maps visibility here directly influences calls, enquiries and footfalls.
            </p>

            {/* Paragraph 2 */}
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal">
              Through geo-targeted keywords, optimized listings, citation building, reviews and media posts, we strengthen local SEO performance across Maps and near-me searches.
            </p>

            {/* Paragraph 3 */}
            <div className="pt-3 border-t border-neutral-200 w-full">
              <p className="text-[11px] sm:text-xs text-[#1E293B] leading-relaxed font-medium">
                Ideal for salons, clinics, restaurants, boutiques, studios and Chennai service providers looking to improve local search visibility.
              </p>
            </div>
          </motion.div>

          {/* ================= 3. THE 5 CHOREOGRAPHED DOCKING CARDS ================= */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
            {IMAGES.map((item, idx) => (
              <ChoreographedCard
                key={item.id}
                item={item}
                index={idx}
                progress={smoothProgress}
                isHovered={hoveredId === item.id}
                setHoveredId={setHoveredId}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

// Card with S-Curve Upward Flow -> Splitting Left & Right to Join Content
function ChoreographedCard({ item, index, progress, isHovered, setHoveredId }) {
  
  // Custom Path Configuration for each of the 5 cards:
  // Phase 1 (0.0 -> 0.40): All cards rise from center bottom along an S-curve
  // Phase 2 (0.40 -> 0.75): Cards curve and glide towards their target dock slots
  // Phase 3 (0.75 -> 1.00): Cards sit securely joined beside Left/Right content and Center

  let xKeyframes = [0, 0, 0, 0];
  let yKeyframes = [800, 400, 0, 0];
  let rotKeyframes = [0, 0, 0, 0];
  let scaleKeyframes = [0.85, 0.95, 1, 1];

  if (index === 0) {
    // Left Upper Card (Joins Left Content top-right)
    xKeyframes = [-40, -90, -220, -360];
    yKeyframes = [900, 150, -110, -110];
    rotKeyframes = [-3, 2, -2, -2];
    scaleKeyframes = [0.85, 0.95, 1, 1];
  } else if (index === 1) {
    // Left Lower Card (Joins Left Content bottom-right)
    xKeyframes = [30, -60, -200, -320];
    yKeyframes = [1100, 320, 130, 130];
    rotKeyframes = [2, -2, 1.5, 1.5];
    scaleKeyframes = [0.85, 0.95, 1, 1];
  } else if (index === 2) {
    // Center Card (Remains the centerpiece anchor)
    xKeyframes = [0, 40, -10, 0];
    yKeyframes = [1000, 200, 0, 0];
    rotKeyframes = [-2, 2, 0, 0];
    scaleKeyframes = [0.85, 0.95, 1, 1];
  } else if (index === 3) {
    // Right Upper Card (Joins Right Content top-left)
    xKeyframes = [-30, 80, 200, 320];
    yKeyframes = [1150, 260, -110, -110];
    rotKeyframes = [-2, 3, 2, 2];
    scaleKeyframes = [0.85, 0.95, 1, 1];
  } else if (index === 4) {
    // Right Lower Card (Joins Right Content bottom-left)
    xKeyframes = [40, 100, 220, 360];
    yKeyframes = [1350, 420, 130, 130];
    rotKeyframes = [3, -2, -1.8, -1.8];
    scaleKeyframes = [0.85, 0.95, 1, 1];
  }

  // Responsive dynamic multipliers using Framer Motion transform ranges
  const x = useTransform(progress, [0, 0.35, 0.65, 0.9], xKeyframes);
  const y = useTransform(progress, [0, 0.35, 0.65, 0.9], yKeyframes);
  const rotate = useTransform(progress, [0, 0.35, 0.65, 0.9], rotKeyframes);
  const scale = useTransform(progress, [0, 0.35, 0.65, 0.9], scaleKeyframes);

  // Opacity fades smoothly in as they rise
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.1, 1, 1, 1]);

  return (
    <motion.div
      style={{
        y,
        x,
        rotate,
        opacity,
        scale,
        zIndex: isHovered ? 50 : 20 + index,
      }}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="absolute w-[220px] sm:w-[260px] md:w-[290px] lg:w-[310px] cursor-pointer will-change-transform"
    >
      {/* Frosted Translucent Card Frame */}
      <div 
        className={`group relative rounded-2xl bg-white/95 p-2 backdrop-blur-xl border transition-all duration-300 ${
          isHovered
            ? "border-[#2B5CFF]/60 shadow-[0_25px_60px_rgba(43,92,255,0.2)] scale-[1.04]"
            : "border-neutral-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
        }`}
      >
        {/* Pure Image Frame */}
        <div className={`relative w-full ${item.aspect} rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/60`}>
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 768px) 260px, 310px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={index < 2}
          />

          {/* Translucent overlay that clears on hover */}
          <div className="absolute inset-0 bg-white/5 transition-opacity duration-300 group-hover:opacity-0" />
        </div>
      </div>
    </motion.div>
  );
}
