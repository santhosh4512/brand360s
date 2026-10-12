"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CheckCircle2, Sparkles, Target, ShieldCheck, Zap } from "lucide-react";

const STAGES = [
  {
    id: "01",
    displayNum: "01",
    shortTitle: "Website & Technical SEO",
    tag: "01 / WEBSITE & TECHNICAL",
    title: "Website SEO & Technical Optimization",
    lead: "A strong SEO strategy begins with a technically sound website. Without proper structure, even the best content will struggle to rank.",
    subheading: "Our technical SEO optimization includes:",
    bullets: [
      "Optimizing page titles, meta descriptions and heading structures",
      "Improving site speed and Core Web Vitals",
      "Ensuring mobile responsiveness across all devices",
      "Fixing indexing, crawling and structural issues",
      "Enhancing navigation and user experience",
      "Implementing structured content hierarchy",
    ],
    summaryLabel: "CORE FOCUS",
    summary: "We focus on creating a website that is easy for both users and search engines to understand.",
    bg: "#DEE2E6", // Project Cement Color
    numColor: "#243e76", // Project Navy
    textColor: "#243e76",
    subtextColor: "#334155",
    bulletColor: "#0481a2",
    boxBg: "rgba(255, 255, 255, 0.75)",
    boxBorder: "rgba(36, 62, 118, 0.16)",
    boxIconBg: "rgba(4, 129, 162, 0.12)",
    boxAccent: "#0481a2",
  },
  {
    id: "02",
    displayNum: "02",
    shortTitle: "Local SEO & Google Maps",
    tag: "02 / LOCAL & GOOGLE MAPS",
    title: "Local SEO & Google Maps Optimization",
    lead: "For businesses targeting Chennai customers, local visibility is essential. Our local SEO services are designed to position your business exactly where your customers are searching.",
    subheading: "This includes:",
    bullets: [
      "Google Business Profile (GMB) optimization",
      "Location-based keyword targeting",
      "Local citations and directory listings",
      "Geo-tagged images and content",
      "Optimizing for searches like local SEO service near me",
    ],
    summaryLabel: "LOCAL IMPACT",
    summary: "We help your business appear in Google Maps, local packs and high-intent local searches that drive real enquiries.",
    bg: "#0B1220", // Deep Midnight Slate
    numColor: "#ffffff",
    textColor: "#ffffff",
    subtextColor: "#cbd5e1",
    bulletColor: "#38bdf8",
    boxBg: "rgba(255, 255, 255, 0.05)",
    boxBorder: "rgba(56, 189, 248, 0.25)",
    boxIconBg: "rgba(56, 189, 248, 0.15)",
    boxAccent: "#38bdf8",
  },
  {
    id: "03",
    displayNum: "03",
    shortTitle: "Authority Building & Backlinks",
    tag: "03 / AUTHORITY & BACKLINKS",
    title: "Authority Building & Backlink Strategy",
    lead: "Search engines rank websites based on trust and authority. One of the strongest signals of authority is high quality backlinks.",
    subheading: "Our approach focuses on:",
    bullets: [
      "Acquiring relevant and high-authority backlinks",
      "Building contextual links through content",
      "Avoiding spam or low-quality link practices",
      "Strengthening domain authority over time",
    ],
    summaryLabel: "TRUST VELOCITY",
    summary: "This ensures that your website is seen as credible and reliable by search engines.",
    bg: "#0481a2", // Brand Aegean Teal
    numColor: "#ffffff",
    textColor: "#ffffff",
    subtextColor: "#e0f2fe",
    bulletColor: "#ffffff",
    boxBg: "rgba(255, 255, 255, 0.12)",
    boxBorder: "rgba(255, 255, 255, 0.25)",
    boxIconBg: "rgba(255, 255, 255, 0.2)",
    boxAccent: "#ffffff",
  },
  {
    id: "04",
    displayNum: "04",
    shortTitle: "Content Marketing Integration",
    tag: "04 / CONTENT INTEGRATION",
    title: "Content Marketing Integration",
    lead: "Content is not just about writing blogs — it is about answering real search intent.",
    subheading: "Our content marketing strategy includes:",
    bullets: [
      "Creating targeted blog topics based on keyword research",
      "Developing landing pages aligned with search queries",
      "Producing SEO optimized content that ranks and engages",
      "Structuring content for readability and authority",
    ],
    summaryLabel: "AUTHORITY DEPTH",
    summary: "We focus on building topical depth so your website becomes a trusted resource in your industry.",
    bg: "#101c38", // Brand Deep Navy
    numColor: "#ffffff",
    textColor: "#ffffff",
    subtextColor: "#e2e8f0",
    bulletColor: "#38bdf8",
    boxBg: "rgba(255, 255, 255, 0.08)",
    boxBorder: "rgba(56, 189, 248, 0.25)",
    boxIconBg: "rgba(56, 189, 248, 0.18)",
    boxAccent: "#38bdf8",
  },
];

export default function SeoApproachTimeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.25,
    restDelta: 0.0001,
  });

  // Framer Accordion Width Shrink Transitions:
  // Card 1 (Cement #DEE2E6): 100% -> 0% width, number rotates 0deg -> -45deg and glides left offscreen
  const card1Width = useTransform(smoothProgress, [0.08, 0.32], ["100%", "0%"]);
  const card1Rotate = useTransform(smoothProgress, [0.08, 0.32], [0, -45]);
  const card1NumX = useTransform(smoothProgress, [0.08, 0.32], ["0%", "-65%"]);
  // Card 1 Top-Left Header Exit as Card 1 shrinks
  const card1TopLeftX = useTransform(smoothProgress, [0.08, 0.28], [0, -60]);
  const card1TopLeftOpacity = useTransform(smoothProgress, [0.08, 0.24], [1, 0]);
  // Card 1 Right Content Exit
  const card1RightX = useTransform(smoothProgress, [0.08, 0.28], [0, -40]);
  const card1RightY = useTransform(smoothProgress, [0.08, 0.28], [0, -20]);
  const card1RightOpacity = useTransform(smoothProgress, [0.08, 0.26], [1, 0]);

  // Card 2 (Midnight Black #0B1220): 100% -> 0% width, number rotates 0deg -> -45deg and glides left offscreen
  const card2Width = useTransform(smoothProgress, [0.42, 0.66], ["100%", "0%"]);
  const card2Rotate = useTransform(smoothProgress, [0.42, 0.66], [0, -45]);
  const card2NumX = useTransform(smoothProgress, [0.42, 0.66], ["0%", "-65%"]);
  // Card 2 Right Content Glide & Reveal
  const card2RightX = useTransform(smoothProgress, [0.12, 0.36], [60, 0]);
  const card2RightY = useTransform(smoothProgress, [0.12, 0.36], [40, 0]);
  const card2RightOpacity = useTransform(smoothProgress, [0.14, 0.34], [0, 1]);

  // Card 3 (Aegean Teal #0481a2): 100% -> 0% width, number rotates 0deg -> -45deg and glides left offscreen
  const card3Width = useTransform(smoothProgress, [0.74, 0.96], ["100%", "0%"]);
  const card3Rotate = useTransform(smoothProgress, [0.74, 0.96], [0, -45]);
  const card3NumX = useTransform(smoothProgress, [0.74, 0.96], ["0%", "-65%"]);
  // Card 3 Right Content Glide & Reveal
  const card3RightX = useTransform(smoothProgress, [0.46, 0.68], [60, 0]);
  const card3RightY = useTransform(smoothProgress, [0.46, 0.68], [40, 0]);
  const card3RightOpacity = useTransform(smoothProgress, [0.48, 0.66], [0, 1]);

  // Card 4 (Deep Brand Navy #101c38): Base Layer Right Content Glide & Reveal
  const card4RightX = useTransform(smoothProgress, [0.76, 0.94], [60, 0]);
  const card4RightY = useTransform(smoothProgress, [0.76, 0.94], [40, 0]);
  const card4RightOpacity = useTransform(smoothProgress, [0.78, 0.93], [0, 1]);

  // Content lockup width wrapper class to keep all text & numbers aligned to 100vw full screen
  const stageInnerClass =
    "absolute top-0 left-0 h-full w-screen pointer-events-none";

  // Reusable responsive right content position class - perfectly balanced top placement
  const rightContentPositionClass =
    "absolute top-10 sm:top-14 md:top-16 lg:top-18 xl:top-20 right-6 sm:right-12 lg:right-20 max-w-xl w-[calc(100%-60px)] sm:w-[500px] lg:w-[580px] flex flex-col items-start text-left space-y-3 sm:space-y-4 z-20 pointer-events-auto";

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#030712] text-white select-none overflow-clip"
      style={{
        height: "340vh",
        fontFamily: "'Varela Round', sans-serif",
      }}
    >
      {/* Sticky Fullscreen 100vh Stage - True Full Screen */}
      <div className="sticky top-0 left-0 w-full h-screen max-h-screen overflow-hidden">
        
        {/* Full Screen Stage Frame */}
        <div className="relative w-full h-full overflow-hidden bg-[#030712]">

          {/* ========================================================= */}
          {/* BASE LAYER - CARD 04: CONTENT INTEGRATION (z-10)          */}
          {/* ========================================================= */}
          <div
            style={{ backgroundColor: STAGES[3].bg }}
            className="absolute inset-0 z-10 w-full h-full overflow-hidden"
          >
            <div className={stageInnerClass}>
              {/* Top-Right Content Lockup with Smooth Glide & Fade Reveal */}
              <motion.div
                style={{
                  x: card4RightX,
                  y: card4RightY,
                  opacity: card4RightOpacity,
                }}
                className={rightContentPositionClass}
              >
                {/* Title */}
                <h3
                  style={{ color: STAGES[3].textColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight leading-tight"
                >
                  {STAGES[3].title}
                </h3>

                {/* Lead text */}
                <p
                  style={{ color: STAGES[3].subtextColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed"
                >
                  {STAGES[3].lead}
                </p>

                {/* Subheading */}
                <p
                  style={{ color: STAGES[3].textColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm font-bold tracking-wide uppercase pt-1 opacity-90"
                >
                  {STAGES[3].subheading}
                </p>

                {/* Bullet Checklist with Hover Highlights */}
                <div className="w-full space-y-1.5 sm:space-y-2">
                  {STAGES[3].bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "transparent",
                      }}
                      className="group flex items-start gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#38bdf8]/20 group-hover:scale-110 transition-transform">
                        <CheckCircle2
                          className="w-3.5 h-3.5"
                          style={{ color: STAGES[3].bulletColor }}
                        />
                      </div>
                      <span
                        style={{ color: STAGES[3].textColor, fontFamily: "'Varela Round', sans-serif" }}
                        className="text-xs sm:text-sm font-medium leading-snug"
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* High-Impact Frosted Glass Takeaway Pill */}
                <div
                  style={{
                    backgroundColor: STAGES[3].boxBg,
                    borderColor: STAGES[3].boxBorder,
                  }}
                  className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl border backdrop-blur-xl w-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] mt-1.5 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div
                    style={{ backgroundColor: STAGES[3].boxIconBg }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-inner"
                  >
                    <Zap className="w-4 h-4 text-[#38bdf8]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span
                      style={{ fontFamily: "'Varela Round', sans-serif" }}
                      className="text-[10px] font-bold tracking-widest uppercase text-[#38bdf8] mb-0.5"
                    >
                      {STAGES[3].summaryLabel}
                    </span>
                    <p
                      style={{ color: STAGES[3].textColor, fontFamily: "'Varela Round', sans-serif" }}
                      className="text-xs sm:text-[13px] font-medium leading-snug"
                    >
                      {STAGES[3].summary}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-Left Huge Pillar Content Lockup */}
              <div className="absolute bottom-6 sm:bottom-10 lg:bottom-14 left-6 sm:left-10 lg:left-14 origin-bottom-left z-10 pointer-events-none max-w-sm sm:max-w-md lg:max-w-xl">
                <div className="flex flex-col items-start">
                  <span
                    style={{ color: STAGES[3].numColor, fontFamily: "'Varela Round', sans-serif" }}
                    className="text-[90px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-extrabold leading-[0.78] tracking-tighter select-none"
                  >
                    {STAGES[3].displayNum}
                  </span>
                  <h4
                    style={{ color: STAGES[3].numColor, fontFamily: "'Varela Round', sans-serif" }}
                    className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-bold tracking-tight leading-tight uppercase mt-2 sm:mt-3"
                  >
                    {STAGES[3].shortTitle}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LAYER 3 - CARD 03: AUTHORITY & BACKLINKS (z-20)            */}
          {/* ========================================================= */}
          <motion.div
            style={{
              width: card3Width,
              backgroundColor: STAGES[2].bg,
            }}
            className="absolute left-0 top-0 bottom-0 z-20 h-full overflow-hidden will-change-[width]"
          >
            <div className={stageInnerClass}>
              {/* Top-Right Content Lockup with Smooth Glide & Fade Reveal */}
              <motion.div
                style={{
                  x: card3RightX,
                  y: card3RightY,
                  opacity: card3RightOpacity,
                }}
                className={rightContentPositionClass}
              >
                {/* Title */}
                <h3
                  style={{ color: STAGES[2].textColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight leading-tight"
                >
                  {STAGES[2].title}
                </h3>

                {/* Lead text */}
                <p
                  style={{ color: STAGES[2].subtextColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed"
                >
                  {STAGES[2].lead}
                </p>

                {/* Subheading */}
                <p
                  style={{ color: STAGES[2].textColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm font-bold tracking-wide uppercase pt-1 opacity-90"
                >
                  {STAGES[2].subheading}
                </p>

                {/* Bullet Checklist with Hover Highlights */}
                <div className="w-full space-y-1.5 sm:space-y-2">
                  {STAGES[2].bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/20 group-hover:scale-110 transition-transform">
                        <CheckCircle2
                          className="w-3.5 h-3.5"
                          style={{ color: STAGES[2].bulletColor }}
                        />
                      </div>
                      <span
                        style={{ color: STAGES[2].textColor, fontFamily: "'Varela Round', sans-serif" }}
                        className="text-xs sm:text-sm font-medium leading-snug"
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* High-Impact Frosted Glass Takeaway Pill */}
                <div
                  style={{
                    backgroundColor: STAGES[2].boxBg,
                    borderColor: STAGES[2].boxBorder,
                  }}
                  className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl border backdrop-blur-xl w-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] mt-1.5 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div
                    style={{ backgroundColor: STAGES[2].boxIconBg }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/20 shadow-inner"
                  >
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span
                      style={{ fontFamily: "'Varela Round', sans-serif" }}
                      className="text-[10px] font-bold tracking-widest uppercase text-white mb-0.5"
                    >
                      {STAGES[2].summaryLabel}
                    </span>
                    <p
                      style={{ color: STAGES[2].textColor, fontFamily: "'Varela Round', sans-serif" }}
                      className="text-xs sm:text-[13px] font-medium leading-snug"
                    >
                      {STAGES[2].summary}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-Left Huge Pillar Content Lockup (Rotates and slides left as width shrinks) */}
              <div className="absolute bottom-6 sm:bottom-10 lg:bottom-14 left-6 sm:left-10 lg:left-14 origin-bottom-left z-10 pointer-events-none max-w-sm sm:max-w-md lg:max-w-xl">
                <motion.div
                  style={{
                    x: card3NumX,
                    rotate: card3Rotate,
                    originX: 0,
                    originY: 1,
                  }}
                  className="flex flex-col items-start will-change-transform origin-bottom-left"
                >
                  <span
                    style={{ color: STAGES[2].numColor, fontFamily: "'Varela Round', sans-serif" }}
                    className="text-[90px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-extrabold leading-[0.78] tracking-tighter select-none"
                  >
                    {STAGES[2].displayNum}
                  </span>
                  <h4
                    style={{ color: STAGES[2].numColor, fontFamily: "'Varela Round', sans-serif" }}
                    className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-bold tracking-tight leading-tight uppercase mt-2 sm:mt-3"
                  >
                    {STAGES[2].shortTitle}
                  </h4>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* LAYER 2 - CARD 02: LOCAL & GOOGLE MAPS (z-30)              */}
          {/* ========================================================= */}
          <motion.div
            style={{
              width: card2Width,
              backgroundColor: STAGES[1].bg,
            }}
            className="absolute left-0 top-0 bottom-0 z-30 h-full overflow-hidden will-change-[width]"
          >
            <div className={stageInnerClass}>
              {/* Top-Right Content Lockup with Smooth Glide & Fade Reveal */}
              <motion.div
                style={{
                  x: card2RightX,
                  y: card2RightY,
                  opacity: card2RightOpacity,
                }}
                className={rightContentPositionClass}
              >
                {/* Title */}
                <h3
                  style={{ color: STAGES[1].textColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight leading-tight"
                >
                  {STAGES[1].title}
                </h3>

                {/* Lead text */}
                <p
                  style={{ color: STAGES[1].subtextColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed"
                >
                  {STAGES[1].lead}
                </p>

                {/* Subheading */}
                <p
                  style={{ color: STAGES[1].textColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm font-bold tracking-wide uppercase pt-1 opacity-90"
                >
                  {STAGES[1].subheading}
                </p>

                {/* Bullet Checklist with Hover Highlights */}
                <div className="w-full space-y-1.5 sm:space-y-2">
                  {STAGES[1].bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#38bdf8]/20 group-hover:scale-110 transition-transform">
                        <CheckCircle2
                          className="w-3.5 h-3.5"
                          style={{ color: STAGES[1].bulletColor }}
                        />
                      </div>
                      <span
                        style={{ color: STAGES[1].textColor, fontFamily: "'Varela Round', sans-serif" }}
                        className="text-xs sm:text-sm font-medium leading-snug"
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* High-Impact Frosted Glass Takeaway Pill */}
                <div
                  style={{
                    backgroundColor: STAGES[1].boxBg,
                    borderColor: STAGES[1].boxBorder,
                  }}
                  className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl border backdrop-blur-xl w-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] mt-1.5 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div
                    style={{ backgroundColor: STAGES[1].boxIconBg }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-[#38bdf8]/30 shadow-inner"
                  >
                    <Target className="w-4 h-4 text-[#38bdf8]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span
                      style={{ fontFamily: "'Varela Round', sans-serif" }}
                      className="text-[10px] font-bold tracking-widest uppercase text-[#38bdf8] mb-0.5"
                    >
                      {STAGES[1].summaryLabel}
                    </span>
                    <p
                      style={{ color: STAGES[1].textColor, fontFamily: "'Varela Round', sans-serif" }}
                      className="text-xs sm:text-[13px] font-medium leading-snug"
                    >
                      {STAGES[1].summary}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-Left Huge Pillar Content Lockup (Rotates and slides left as width shrinks) */}
              <div className="absolute bottom-6 sm:bottom-10 lg:bottom-14 left-6 sm:left-10 lg:left-14 origin-bottom-left z-10 pointer-events-none max-w-sm sm:max-w-md lg:max-w-xl">
                <motion.div
                  style={{
                    x: card2NumX,
                    rotate: card2Rotate,
                    originX: 0,
                    originY: 1,
                  }}
                  className="flex flex-col items-start will-change-transform origin-bottom-left"
                >
                  <span
                    style={{ color: STAGES[1].numColor, fontFamily: "'Varela Round', sans-serif" }}
                    className="text-[90px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-extrabold leading-[0.78] tracking-tighter select-none"
                  >
                    {STAGES[1].displayNum}
                  </span>
                  <h4
                    style={{ color: STAGES[1].numColor, fontFamily: "'Varela Round', sans-serif" }}
                    className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-bold tracking-tight leading-tight uppercase mt-2 sm:mt-3"
                  >
                    {STAGES[1].shortTitle}
                  </h4>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* LAYER 1 - CARD 01: WEBSITE SEO & TECHNICAL (z-40)          */}
          {/* ========================================================= */}
          <motion.div
            style={{
              width: card1Width,
              backgroundColor: STAGES[0].bg,
            }}
            className="absolute left-0 top-0 bottom-0 z-40 h-full overflow-hidden will-change-[width]"
          >
            <div className={stageInnerClass}>
              {/* Top-Left Section Header on 1st Page (Project Cement #DEE2E6 Card) */}
              <motion.div
                style={{
                  x: card1TopLeftX,
                  opacity: card1TopLeftOpacity,
                }}
                className="absolute top-10 sm:top-14 md:top-16 lg:top-18 xl:top-20 left-6 sm:left-12 lg:left-20 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-start text-left z-20 pointer-events-auto"
              >
                <h2
                  style={{ fontFamily: "'Varela Round', sans-serif" }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-bold tracking-tight leading-[1.08] text-[#243e76] mb-2.5 sm:mb-3.5"
                >
                  Our SEO & Content Marketing Approach
                </h2>

                <p
                  style={{ fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed text-[#334155] max-w-md"
                >
                  At <strong className="font-bold text-[#0481a2]">BRAND 360s</strong>, we do not treat SEO as isolated activities. We build a connected system where technical performance, content and authority work together.
                </p>
              </motion.div>

              {/* Top-Right Content Lockup with Smooth Exit */}
              <motion.div
                style={{
                  x: card1RightX,
                  y: card1RightY,
                  opacity: card1RightOpacity,
                }}
                className={rightContentPositionClass}
              >
                {/* Title */}
                <h3
                  style={{ color: STAGES[0].textColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight leading-tight"
                >
                  {STAGES[0].title}
                </h3>

                {/* Lead text */}
                <p
                  style={{ color: STAGES[0].subtextColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed"
                >
                  {STAGES[0].lead}
                </p>

                {/* Subheading */}
                <p
                  style={{ color: STAGES[0].textColor, fontFamily: "'Varela Round', sans-serif" }}
                  className="text-xs sm:text-sm font-bold tracking-wide uppercase pt-1 opacity-90"
                >
                  {STAGES[0].subheading}
                </p>

                {/* Bullet Checklist with Hover Highlights */}
                <div className="w-full space-y-1.5 sm:space-y-2">
                  {STAGES[0].bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-200 hover:bg-black/5"
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#0481a2]/15 group-hover:scale-110 transition-transform">
                        <CheckCircle2
                          className="w-3.5 h-3.5"
                          style={{ color: STAGES[0].bulletColor }}
                        />
                      </div>
                      <span
                        style={{ color: STAGES[0].textColor, fontFamily: "'Varela Round', sans-serif" }}
                        className="text-xs sm:text-sm font-medium leading-snug"
                      >
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* High-Impact Frosted Glass Takeaway Pill */}
                <div
                  style={{
                    backgroundColor: STAGES[0].boxBg,
                    borderColor: STAGES[0].boxBorder,
                  }}
                  className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl border backdrop-blur-xl w-full shadow-[0_8px_30px_rgba(36,62,118,0.06)] mt-1.5 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div
                    style={{ backgroundColor: STAGES[0].boxIconBg }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-[#0481a2]/20 shadow-inner"
                  >
                    <Sparkles className="w-4 h-4 text-[#0481a2]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span
                      style={{ fontFamily: "'Varela Round', sans-serif" }}
                      className="text-[10px] font-bold tracking-widest uppercase text-[#0481a2] mb-0.5"
                    >
                      {STAGES[0].summaryLabel}
                    </span>
                    <p
                      style={{ color: STAGES[0].textColor, fontFamily: "'Varela Round', sans-serif" }}
                      className="text-xs sm:text-[13px] font-semibold leading-snug"
                    >
                      {STAGES[0].summary}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-Left Huge Pillar Content Lockup (Rotates and slides left as width shrinks) */}
              <div className="absolute bottom-6 sm:bottom-10 lg:bottom-14 left-6 sm:left-10 lg:left-14 origin-bottom-left z-10 pointer-events-none max-w-sm sm:max-w-md lg:max-w-xl">
                <motion.div
                  style={{
                    x: card1NumX,
                    rotate: card1Rotate,
                    originX: 0,
                    originY: 1,
                  }}
                  className="flex flex-col items-start will-change-transform origin-bottom-left"
                >
                  <span
                    style={{ color: STAGES[0].numColor, fontFamily: "'Varela Round', sans-serif" }}
                    className="text-[90px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-extrabold leading-[0.78] tracking-tighter select-none"
                  >
                    {STAGES[0].displayNum}
                  </span>
                  <h4
                    style={{ color: STAGES[0].numColor, fontFamily: "'Varela Round', sans-serif" }}
                    className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-bold tracking-tight leading-tight uppercase mt-2 sm:mt-3"
                  >
                    {STAGES[0].shortTitle}
                  </h4>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
