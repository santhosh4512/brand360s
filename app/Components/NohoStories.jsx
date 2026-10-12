"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const STORIES = [
  {
    id: 1,
    num: "01",
    symbol: "✦",
    title: "For many businesses, growth depends on being found locally.",
    category: "Local Presence",
    bgColor: "#243e76", // Deep Brand Navy
    borderColor: "rgba(4, 129, 162, 0.35)",
    tagBg: "rgba(4, 129, 162, 0.25)",
    tagText: "#ffffff",
  },
  {
    id: 2,
    num: "02",
    symbol: "✦",
    title:
      "When someone searches for services in Chennai, your business should appear - not your competitors.",
    category: "Market Share",
    bgColor: "#0481a2", // Aegean Teal
    borderColor: "rgba(255, 255, 255, 0.35)",
    tagBg: "rgba(255, 255, 255, 0.2)",
    tagText: "#ffffff",
  },
  {
    id: 3,
    num: "03",
    symbol: "✦",
    title:
      "We focus on improving visibility where it directly impacts enquiries, calls and conversions.",
    category: "High Intent",
    bgColor: "#101c38", // Slate Navy Dark
    borderColor: "rgba(4, 129, 162, 0.35)",
    tagBg: "rgba(4, 129, 162, 0.25)",
    tagText: "#0481a2",
  },
];

export default function NohoStories() {
  const targetRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Scroll Progress across the pinned track
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.22,
    restDelta: 0.0001,
  });

  const totalCards = STORIES.length; // 3 cards

  // Phase 1 (0.10 -> 0.48): 3 Cards slide & completely finish 75% overlap on the left
  const progressFloat = useTransform(
    smoothProgress,
    [0.10, 0.48],
    [0, totalCards - 1],
    { clamp: true }
  );

  // Phase 2 (0.50 -> 0.98): Right Card & Points appear ONLY AFTER the 3 cards have finished overlapping
  const rightPanelOpacity = useTransform(smoothProgress, [0.50, 0.64], [0, 1]);
  const rightPanelX = useTransform(smoothProgress, [0.50, 0.64], [50, 0]);
  const rightPanelScale = useTransform(smoothProgress, [0.50, 0.64], [0.94, 1]);

  const item1Opacity = useTransform(smoothProgress, [0.64, 0.73], [0, 1]);
  const item1Y = useTransform(smoothProgress, [0.64, 0.73], [16, 0]);

  const item2Opacity = useTransform(smoothProgress, [0.73, 0.82], [0, 1]);
  const item2Y = useTransform(smoothProgress, [0.73, 0.82], [16, 0]);

  const item3Opacity = useTransform(smoothProgress, [0.82, 0.90], [0, 1]);
  const item3Y = useTransform(smoothProgress, [0.82, 0.90], [16, 0]);

  const quoteOpacity = useTransform(smoothProgress, [0.89, 0.97], [0, 1]);
  const quoteY = useTransform(smoothProgress, [0.89, 0.97], [16, 0]);

  useMotionValueEvent(progressFloat, "change", (latest) => {
    const idx = Math.min(
      totalCards - 1,
      Math.floor(latest)
    );
    setActiveCardIndex(idx);
  });

  return (
    <section
      ref={targetRef}
      className="relative w-full bg-[#f7f8fa] text-[#243e76] select-none"
      style={{
        height: `${(totalCards + 3) * 100}vh`,
        fontFamily: "'Varela Round', sans-serif",
      }}
    >
      {/* Sticky Screen Viewport */}
      <div
        className="sticky top-0 left-0 w-full h-screen min-h-[640px] max-h-[1080px] bg-[#f7f8fa] overflow-hidden flex flex-col justify-between pt-6 md:pt-8 pb-10"
        style={{ fontFamily: "'Varela Round', sans-serif" }}
      >
        {/* ================= TOP HEADER ================= */}
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-start justify-start z-40">
          <div className="flex flex-col max-w-4xl">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#0481a2] mb-1.5 px-4 py-1 rounded-full bg-[#0481a2]/10 border border-[#0481a2]/25 self-start">
              Local SEO Mastery
            </span>
            <h2 className="text-[32px] sm:text-[44px] md:text-[54px] lg:text-[62px] font-bold tracking-tight text-[#243e76] leading-[1.08] mt-1">
              Strengthen Your{" "}
              <span className="text-[#0481a2]">
                Local Presence
              </span>{" "}
              in Chennai
            </h2>
          </div>
        </div>

        {/* ================= STAGE: LEFT CARDS OVERLAP + RIGHT SIDE SCROLL-DRIVEN PANEL ================= */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto px-6 md:px-12 lg:px-16">
          <div className="relative w-full h-[440px] sm:h-[480px] md:h-[500px]">
            {/* 3 OVERLAPPING CARDS ON THE LEFT */}
            {STORIES.map((story, index) => (
              <ContinuousTrainOverlappingCard
                key={story.id}
                story={story}
                index={index}
                progressFloat={progressFloat}
              />
            ))}

            {/* STRICTLY SCROLL-DRIVEN RIGHT SIDE PANEL (Animates strictly as user scrolls) */}
            <motion.div
              style={{
                opacity: rightPanelOpacity,
                x: rightPanelX,
                scale: rightPanelScale,
                fontFamily: "'Varela Round', sans-serif",
              }}
              className="hidden lg:flex absolute top-0 right-0 w-[420px] xl:w-[480px] h-full rounded-3xl p-8 xl:p-10 bg-white border border-[#DEE2E6] shadow-[0_20px_50px_rgba(36,62,118,0.12)] flex-col justify-between z-30"
            >
              <div className="flex flex-col gap-3.5">
                <h3 className="text-[24px] xl:text-[28px] font-bold text-[#243e76] leading-[1.2] tracking-tight">
                  Our local SEO services Chennai
                </h3>

                <p className="text-sm font-normal text-[#243e76]/80 -mt-1">
                  Designed to position your business in:
                </p>

                {/* 3 Scroll-Triggered Deliverables */}
                <div className="flex flex-col gap-3 mt-2">
                  <motion.div
                    style={{ opacity: item1Opacity, y: item1Y }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f7f8fa] border border-[#DEE2E6] transition-all hover:bg-white hover:border-[#0481a2]/50 hover:shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0481a2] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      ✓
                    </div>
                    <span className="text-[15px] font-bold text-[#243e76]">
                      Google Maps listings
                    </span>
                  </motion.div>

                  <motion.div
                    style={{ opacity: item2Opacity, y: item2Y }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f7f8fa] border border-[#DEE2E6] transition-all hover:bg-white hover:border-[#0481a2]/50 hover:shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0481a2] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      ✓
                    </div>
                    <span className="text-[15px] font-bold text-[#243e76]">
                      Local search results
                    </span>
                  </motion.div>

                  <motion.div
                    style={{ opacity: item3Opacity, y: item3Y }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f7f8fa] border border-[#DEE2E6] transition-all hover:bg-white hover:border-[#0481a2]/50 hover:shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0481a2] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      ✓
                    </div>
                    <span className="text-[15px] font-bold text-[#243e76]">
                      High-intent location-based queries
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Scroll-Triggered Bottom Statement */}
              <motion.div
                style={{ opacity: quoteOpacity, y: quoteY }}
                className="p-5 rounded-2xl bg-[#243e76] text-white text-sm xl:text-[15px] font-normal leading-relaxed shadow-md border border-[#0481a2]/30"
              >
                <p className="m-0">
                  When someone searches for services in Chennai, your business should appear - not your competitors.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ================= BOTTOM PROGRESS TRACKER & FLOATING DOT ================= */}
        <div
          className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between text-xs text-[#243e76]/70 z-40"
          style={{ fontFamily: "'Varela Round', sans-serif" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#243e76]">
              0{activeCardIndex + 1}
            </span>
            <span className="text-[#0481a2] font-bold">/</span>
            <span className="text-sm text-[#243e76]/60">
              0{totalCards}
            </span>
          </div>

          {/* Floating animated progress indicator dot */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-3.5 h-3.5 rounded-full bg-[#0481a2] shadow-[0_0_12px_#0481a2]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Continuous Card Train with 75% Progressive Overlap Stop (Exactly 3 Cards):
function ContinuousTrainOverlappingCard({ story, index, progressFloat }) {
  const cardWidth = 500; // Card width in px
  const cardGap = 28; // Gap between cards in initial continuous row
  const step = cardWidth + cardGap;
  const exposedSlice = 140; // Visible width of previous card after overlap
  const leftMargin = 0; // Left margin inside container

  // Starting position in continuous row at p = 0
  const startX = leftMargin + index * step;
  // Final permanent stopped position after 75% overlap on the left
  const finalX = leftMargin + index * exposedSlice;

  const x = useTransform(progressFloat, (currentP) => {
    if (index === 0) {
      return leftMargin;
    }

    const delta = step - exposedSlice;
    const calculatedX = startX - currentP * delta;

    return Math.max(finalX, calculatedX);
  });

  return (
    <motion.div
      style={{
        x,
        zIndex: 10 + index * 5, // Higher index sits ON TOP of previous cards
        backgroundColor: story.bgColor,
        borderColor: story.borderColor,
        fontFamily: "'Varela Round', sans-serif",
      }}
      className="absolute top-0 w-[84vw] sm:w-[460px] md:w-[480px] lg:w-[500px] h-[440px] sm:h-[480px] md:h-[500px] text-white rounded-3xl p-8 sm:p-10 md:p-12 flex flex-col justify-between select-text group cursor-pointer shadow-[0_24px_60px_rgba(36,62,118,0.25)] border transition-transform duration-300"
    >
      {/* Top ✦ Symbol & Category Badge */}
      <div className="flex items-center justify-between">
        <span className="text-3xl sm:text-4xl text-[#0481a2] select-none">
          ✦
        </span>
        <span
          className="text-xs tracking-widest uppercase font-bold px-3.5 py-1.5 rounded-full border border-white/20"
          style={{ backgroundColor: story.tagBg, color: story.tagText }}
        >
          {story.category}
        </span>
      </div>

      {/* Exact Original Statement */}
      <div>
        <p className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[33px] font-bold text-white leading-[1.26] tracking-tight">
          {story.title}
        </p>
      </div>

      {/* Bottom Number Indicator */}
      <div className="flex items-center justify-between pt-4 border-t border-white/15 text-white/70 text-xs font-bold">
        <span className="tracking-wider">BRAND 360s</span>
        <span className="font-bold text-white text-sm">0{story.id}</span>
      </div>
    </motion.div>
  );
}
