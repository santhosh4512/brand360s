"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FEATURES_DATA = [
  {
    id: "01",
    label: "Technical Optimization",
    title: "Technical Infrastructure 24/7",
    description:
      "Engineered for search bots to index effortlessly and users to convert faster. Sub-second speed with zero crawl budget waste.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85",
    tag: "01 / 03 — Technical",
  },
  {
    id: "02",
    label: "Topical Authority",
    title: "Topical Authority Engine",
    description:
      "Deep semantic entity architecture and keyword topic clusters that establish undeniable search dominance in your niche.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85",
    tag: "02 / 03 — Authority",
  },
  {
    id: "03",
    label: "Revenue Growth",
    title: "Compounding Pipeline Growth",
    description:
      "Transforming high-intent search visibility into predictable, qualified inbound sales pipeline that scales month over month.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    tag: "03 / 03 — Revenue",
  },
];

export default function StickyFeatureScroll() {
  const sectionRef = useRef(null);

  // Track scroll progress of the sticky section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // ─────────────────────────────────────────────────────────────────
  // RIGHT SIDE: Vertical Image Track Transform
  // - 0.00 -> 0.15: Image 1 locked in view
  // - 0.15 -> 0.42: Image 1 moves UP, Image 2 enters and locks at 0.42
  // - 0.42 -> 0.58: Image 2 locked in view
  // - 0.58 -> 0.85: Image 2 moves UP, Image 3 enters and locks at 0.85
  // - 0.85 -> 1.00: Image 3 locked in view
  // ─────────────────────────────────────────────────────────────────
  const trackTranslateY = useTransform(
    smoothProgress,
    [0, 0.15, 0.42, 0.58, 0.85, 1],
    [
      "0%",
      "0%",
      "-33.333333%",
      "-33.333333%",
      "-66.666667%",
      "-66.666667%",
    ]
  );

  // ─────────────────────────────────────────────────────────────────
  // LEFT SIDE: Feature Navigation (Item 1, 2, 3 Active Indicators)
  // ─────────────────────────────────────────────────────────────────
  // Item 1 (Technical Optimization)
  const dot1Opacity = useTransform(smoothProgress, [0, 0.32, 0.40], [1, 1, 0]);
  const text1Color = useTransform(smoothProgress, [0, 0.32, 0.40], ["#0B2748", "#0B2748", "#94A3B8"]);

  // Item 2 (Topical Authority)
  const dot2Opacity = useTransform(smoothProgress, [0.36, 0.42, 0.68, 0.75], [0, 1, 1, 0]);
  const text2Color = useTransform(smoothProgress, [0.36, 0.42, 0.68, 0.75], ["#94A3B8", "#0B2748", "#0B2748", "#94A3B8"]);

  // Item 3 (Revenue Growth)
  const dot3Opacity = useTransform(smoothProgress, [0.72, 0.80, 1], [0, 1, 1]);
  const text3Color = useTransform(smoothProgress, [0.72, 0.80, 1], ["#94A3B8", "#0B2748", "#0B2748"]);

  // ─────────────────────────────────────────────────────────────────
  // LEFT SIDE: Bottom Descriptions (100% GPU Motion Values)
  // ─────────────────────────────────────────────────────────────────
  // Description 1
  const desc1Opacity = useTransform(smoothProgress, [0, 0.30, 0.38], [1, 1, 0]);
  const desc1Y = useTransform(smoothProgress, [0, 0.30, 0.38], [0, 0, -10]);

  // Description 2
  const desc2Opacity = useTransform(smoothProgress, [0.36, 0.42, 0.68, 0.75], [0, 1, 1, 0]);
  const desc2Y = useTransform(smoothProgress, [0.36, 0.42, 0.68, 0.75], [10, 0, 0, -10]);

  // Description 3
  const desc3Opacity = useTransform(smoothProgress, [0.72, 0.80, 1], [0, 1, 1]);
  const desc3Y = useTransform(smoothProgress, [0.72, 0.80, 1], [10, 0, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[360vh] bg-[#FFFFFF] text-[#0B2748]"
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* STICKY VIEWPORT (100vh)                                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] flex items-center justify-center overflow-hidden p-6 sm:p-8 md:p-10 lg:p-14 select-none bg-white">
        
        <div className="w-full max-w-[1600px] h-full flex flex-col lg:flex-row gap-8 lg:gap-14 items-stretch justify-between">
          
          {/* ───────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN (≈ 32% Width)                                 */}
          {/* ───────────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[32%] flex flex-col justify-between py-2 lg:py-4 shrink-0 z-10">
            
            {/* TOP: Large Vibrant Blue 2-Line Heading (Numa style) */}
            <div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight leading-[1.12] text-[#0055D4]"
                style={{
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Fix the foundation,
                <br />
                prepare your Website + GMB for growth
              </h2>
            </div>

            {/* VERTICAL MIDDLE: 3 Feature Radio Navigation Items */}
            <div className="flex flex-col space-y-3.5 my-6 lg:my-0">
              
              {/* Item 1 */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 flex items-center justify-center shrink-0 relative">
                  <motion.div
                    style={{ opacity: dot1Opacity }}
                    className="w-3.5 h-3.5 rounded-full border-2 border-[#0055D4] flex items-center justify-center absolute inset-0 m-auto"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0055D4]" />
                  </motion.div>
                </div>
                <motion.span
                  style={{ color: text1Color }}
                  className="text-sm sm:text-base tracking-tight font-semibold"
                >
                  {FEATURES_DATA[0].label}
                </motion.span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 flex items-center justify-center shrink-0 relative">
                  <motion.div
                    style={{ opacity: dot2Opacity }}
                    className="w-3.5 h-3.5 rounded-full border-2 border-[#0055D4] flex items-center justify-center absolute inset-0 m-auto"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0055D4]" />
                  </motion.div>
                </div>
                <motion.span
                  style={{ color: text2Color }}
                  className="text-sm sm:text-base tracking-tight font-semibold"
                >
                  {FEATURES_DATA[1].label}
                </motion.span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 flex items-center justify-center shrink-0 relative">
                  <motion.div
                    style={{ opacity: dot3Opacity }}
                    className="w-3.5 h-3.5 rounded-full border-2 border-[#0055D4] flex items-center justify-center absolute inset-0 m-auto"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0055D4]" />
                  </motion.div>
                </div>
                <motion.span
                  style={{ color: text3Color }}
                  className="text-sm sm:text-base tracking-tight font-semibold"
                >
                  {FEATURES_DATA[2].label}
                </motion.span>
              </div>

            </div>

            {/* BOTTOM LEFT: Active Feature Title + Supporting Description */}
            <div className="relative min-h-[120px] flex items-end">
              
              {/* Description 1 */}
              <motion.div
                style={{ opacity: desc1Opacity, y: desc1Y }}
                className="absolute inset-0 flex flex-col justify-end space-y-2 will-change-transform"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B2748] tracking-tight leading-snug">
                  {FEATURES_DATA[0].title}
                </h3>
                <p className="text-sm font-normal text-slate-500 leading-relaxed max-w-md">
                  {FEATURES_DATA[0].description}
                </p>
              </motion.div>

              {/* Description 2 */}
              <motion.div
                style={{ opacity: desc2Opacity, y: desc2Y }}
                className="absolute inset-0 flex flex-col justify-end space-y-2 will-change-transform"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B2748] tracking-tight leading-snug">
                  {FEATURES_DATA[1].title}
                </h3>
                <p className="text-sm font-normal text-slate-500 leading-relaxed max-w-md">
                  {FEATURES_DATA[1].description}
                </p>
              </motion.div>

              {/* Description 3 */}
              <motion.div
                style={{ opacity: desc3Opacity, y: desc3Y }}
                className="absolute inset-0 flex flex-col justify-end space-y-2 will-change-transform"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B2748] tracking-tight leading-snug">
                  {FEATURES_DATA[2].title}
                </h3>
                <p className="text-sm font-normal text-slate-500 leading-relaxed max-w-md">
                  {FEATURES_DATA[2].description}
                </p>
              </motion.div>

            </div>

          </div>

          {/* ───────────────────────────────────────────────────────── */}
          {/* RIGHT SIDE: FULL-BLEED IMMERSIVE ROUNDED IMAGE (≈ 68%)    */}
          {/* ───────────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[68%] h-[55vh] sm:h-[65vh] lg:h-full relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-transparent">
            
            {/* Vertical Image Track (Smoothly translates upward on scroll) */}
            <motion.div
              style={{ y: trackTranslateY }}
              className="w-full h-full flex flex-col will-change-transform"
            >
              {FEATURES_DATA.map((feat) => (
                <div
                  key={feat.id}
                  className="w-full h-full shrink-0 pb-6 relative box-border"
                >
                  <div className="w-full h-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden relative bg-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/60">
                    <img
                      src={feat.image}
                      alt={feat.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="eager"
                    />

                    {/* Subtle dark gradient overlay on bottom of image for cinematic depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                    {/* Feature ID Badge on Image Corner */}
                    <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-mono font-bold text-xs tracking-wider">
                      {feat.tag}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
