"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Layers, Users, Coins, Target } from "lucide-react";

const COMPARISON_ITEMS = [
  {
    number: "01",
    title: "Skill coverage",
    agency: "Technical + content + local + link building",
    freelance: "Usually one or two areas",
    icon: Layers,
  },
  {
    number: "02",
    title: "Continuity",
    agency: "Team-backed, no single point of failure",
    freelance: "Risk if freelancer becomes unavailable",
    icon: Users,
  },
  {
    number: "03",
    title: "Cost",
    agency: "Higher, but broader coverage",
    freelance: "Lower, narrower scope",
    icon: Coins,
  },
  {
    number: "04",
    title: "Best for",
    agency: "Long-term, compounding growth",
    freelance: "A single, narrowly-scoped task",
    icon: Target,
  },
];

// Row Container Trigger
const rowContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Card Shell Reveal Variants: Spawns from Center Circle as a Round Orb and Morphs into Card
const leftCardShellVariants = {
  hidden: { 
    opacity: 0, 
    x: "115%", 
    scale: 0.12, 
    borderRadius: "9999px",
    filter: "blur(8px)",
    boxShadow: "0 0 30px rgba(0,119,182,0.8)",
  },
  visible: {
    opacity: 1,
    x: "0%",
    scale: 1,
    borderRadius: "24px",
    filter: "blur(0px)",
    boxShadow: "0 15px 35px rgba(11,39,72,0.3)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightCardShellVariants = {
  hidden: { 
    opacity: 0, 
    x: "-115%", 
    scale: 0.12, 
    borderRadius: "9999px",
    filter: "blur(8px)",
    boxShadow: "0 0 30px rgba(100,116,139,0.8)",
  },
  visible: {
    opacity: 1,
    x: "0%",
    scale: 1,
    borderRadius: "24px",
    filter: "blur(0px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const centerNodeVariants = {
  hidden: { opacity: 0, scale: 0.1, rotate: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.65,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

// Character-by-Character streaming into Left Card (SEO Agency)
function DispatchedAgencyChars({ text }) {
  const words = text.split(" ");
  let charCounter = 0;

  return (
    <span className="inline-flex flex-wrap gap-x-2.5 gap-y-1">
      {words.map((word, wIdx) => {
        const chars = word.split("");
        return (
          <span key={wIdx} className="inline-flex whitespace-nowrap">
            {chars.map((char, cIdx) => {
              const delay = 0.45 + charCounter * 0.02;
              charCounter++;

              return (
                <motion.span
                  key={cIdx}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 12,
                      scale: 0.2, 
                      filter: "blur(6px)",
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay,
                      },
                    },
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

// Character-by-Character streaming into Right Card (Freelance SEO)
function DispatchedFreelanceChars({ text }) {
  const words = text.split(" ");
  let charCounter = 0;

  return (
    <span className="inline-flex flex-wrap gap-x-2.5 gap-y-1">
      {words.map((word, wIdx) => {
        const chars = word.split("");
        return (
          <span key={wIdx} className="inline-flex whitespace-nowrap">
            {chars.map((char, cIdx) => {
              const delay = 0.45 + charCounter * 0.02;
              charCounter++;

              return (
                <motion.span
                  key={cIdx}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 12,
                      scale: 0.2, 
                      filter: "blur(6px)",
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay,
                      },
                    },
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function TimelineRow({ item }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={rowContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative w-full py-10 sm:py-14 md:py-18"
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* DESKTOP LAYOUT (Circle to Card Morph Animation)              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-14 items-center w-full relative">
        
        {/* Horizontal Connecting Energy Line (Left to Center) */}
        <div className="absolute left-[calc(50%-180px)] w-[180px] top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#0077B6]/40 to-[#0077B6] pointer-events-none -z-10" />

        {/* LEFT: SEO AGENCY CARD (CIRCLE-TO-CARD MORPH EXPANSION) */}
        <div className="col-span-5 flex justify-end z-10">
          <motion.div
            variants={leftCardShellVariants}
            className="w-full bg-[#0B2748] border border-[#0077B6]/40 hover:border-[#38BDF8]/70 p-7 lg:p-8 hover:shadow-[0_25px_50px_rgba(0,119,182,0.4)] transition-colors duration-300 group relative overflow-hidden will-change-transform"
          >
            {/* Ambient inner soft blue glow */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#0077B6]/25 rounded-full blur-2xl pointer-events-none" />
            
            {/* Top Tag (Fades in once card morphs) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -6 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.4 } }
              }}
              className="flex items-center gap-2 mb-3 relative z-10"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_8px_#38BDF8]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#38BDF8]">
                SEO Agency
              </span>
            </motion.div>

            {/* Characters Streaming In (Pure White Text) */}
            <div className="text-lg sm:text-xl md:text-[21px] font-semibold text-white leading-snug group-hover:text-slate-100 transition-colors relative z-10">
              <DispatchedAgencyChars text={item.agency} />
            </div>
          </motion.div>
        </div>

        {/* CENTER: TIMELINE NODE & TITLE */}
        <div className="col-span-2 flex flex-col items-center justify-center text-center relative z-20">
          {/* Animated Circular Number Node with Halo Beacon */}
          <motion.div
            variants={centerNodeVariants}
            className="relative flex items-center justify-center mb-3.5 will-change-transform"
          >
            {/* Outer Pulse Ring */}
            <div className="absolute -inset-2.5 rounded-full bg-[#0077B6]/30 animate-ping pointer-events-none" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0077B6] to-[#38BDF8] blur-sm opacity-70 animate-pulse" />
            
            {/* Main Number Node */}
            <div className="w-[54px] h-[54px] rounded-full bg-[#0B2748] text-white flex items-center justify-center font-mono font-bold text-sm shadow-[0_12px_28px_rgba(11,39,72,0.4)] ring-4 ring-[#FAFBFD] relative z-10">
              {item.number}
            </div>
          </motion.div>

          {/* Title */}
          <div className="flex items-center gap-1.5 justify-center">
            <Icon className="w-4 h-4 text-[#0077B6]" />
            <h3 className="text-base lg:text-[17px] font-extrabold uppercase tracking-tight text-[#0B2748] leading-tight">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Horizontal Connecting Energy Line (Center to Right) */}
        <div className="absolute right-[calc(50%-180px)] w-[180px] top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-l from-transparent via-slate-300 to-[#0B2748] pointer-events-none -z-10" />

        {/* RIGHT: FREELANCE SEO CARD (CIRCLE-TO-CARD MORPH EXPANSION) */}
        <div className="col-span-5 flex justify-start z-10">
          <motion.div
            variants={rightCardShellVariants}
            className="w-full bg-white border border-slate-200/90 hover:border-slate-300 p-7 lg:p-8 hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-colors duration-300 group relative overflow-hidden will-change-transform"
          >
            {/* Top Tag (Fades in once card morphs) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -6 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.4 } }
              }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                Freelance SEO
              </span>
            </motion.div>

            {/* Characters Streaming In */}
            <div className="text-lg sm:text-xl md:text-[21px] font-medium text-slate-800 leading-snug group-hover:text-black transition-colors">
              <DispatchedFreelanceChars text={item.freelance} />
            </div>
          </motion.div>
        </div>

      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MOBILE LAYOUT                                                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex md:hidden gap-4 items-start w-full relative">
        {/* Left Mobile Node */}
        <div className="flex flex-col items-center shrink-0 z-10 pt-1">
          <motion.div
            variants={centerNodeVariants}
            className="w-10 h-10 rounded-full bg-[#0B2748] text-white flex items-center justify-center font-mono font-bold text-xs shadow-md ring-4 ring-[#FAFBFD]"
          >
            {item.number}
          </motion.div>
        </div>

        {/* Right Mobile Content */}
        <div className="flex-1 space-y-3.5 z-10">
          {/* Stage Header */}
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-[#0077B6]" />
            <h3 className="text-base font-bold uppercase tracking-tight text-[#0B2748]">
              {item.title}
            </h3>
          </div>

          {/* Agency Mobile Card (Blue) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0B2748] border border-[#0077B6]/30 rounded-[18px] p-5 shadow-md text-white"
          >
            <span className="block text-[11px] font-bold tracking-wider uppercase text-[#38BDF8] mb-1.5">
              SEO Agency
            </span>
            <div className="text-sm sm:text-base font-semibold text-white leading-snug">
              <DispatchedAgencyChars text={item.agency} />
            </div>
          </motion.div>

          {/* Freelance Mobile Card (White) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-white border border-slate-200 rounded-[18px] p-5 shadow-sm"
          >
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-slate-500 mb-1.5">
              Freelance SEO
            </span>
            <div className="text-sm sm:text-base font-medium text-slate-800 leading-snug">
              <DispatchedFreelanceChars text={item.freelance} />
            </div>
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
}

export default function ComparisonSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Laser beam height down the continuous straight line
  const laserHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#FAFBFD] text-[#0B2748] py-24 sm:py-32 px-4 sm:px-8 select-none overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* TOP: Main Heading with Mastercrafted 3D Kinetic Typography Animation */}
        <div className="relative text-center max-w-4xl mx-auto mb-16 sm:mb-24">
          
          {/* Ambient Lighting Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[220px] bg-gradient-to-r from-[#0077B6]/20 via-[#38BDF8]/15 to-[#0B2748]/20 rounded-full blur-[110px] pointer-events-none -z-10" />

          {/* High-End Kinetic Stagger Typography (Pure Title, Zero Extra Words) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="flex flex-col items-center space-y-4"
          >
            {/* Row 1: SEO Agency  [vs.]  Freelance SEO */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-5">
              
              {/* "SEO Agency" — Sweeps in from left with 3D Depth */}
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: -60, rotateY: 30, filter: "blur(12px)" },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    rotateY: 0, 
                    filter: "blur(0px)", 
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                  },
                }}
                className="text-3xl sm:text-5xl md:text-[52px] font-black tracking-tight text-[#0B2748] drop-shadow-sm"
                style={{
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                SEO Agency
              </motion.span>

              {/* "vs." — Explosive Scale-Pop with Ambient Glow */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0, rotate: -180 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0, 
                    transition: { 
                      duration: 0.7, 
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 0.15 
                    } 
                  },
                }}
                className="relative flex items-center justify-center px-3 py-1 rounded-full bg-[#0077B6]/10 border border-[#0077B6]/30 shadow-[0_0_15px_rgba(0,119,182,0.2)]"
              >
                <span className="text-[#0077B6] font-mono text-xl sm:text-2xl md:text-3xl font-extrabold italic">
                  vs.
                </span>
              </motion.div>

              {/* "Freelance SEO" — Sweeps in from right with 3D Depth */}
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: 60, rotateY: -30, filter: "blur(12px)" },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    rotateY: 0, 
                    filter: "blur(0px)", 
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                  },
                }}
                className="text-3xl sm:text-5xl md:text-[52px] font-bold tracking-tight text-slate-600"
                style={{
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Freelance SEO
              </motion.span>
            </div>

            {/* Row 2: "Which Is Right for You?" — Letter-by-Letter 3D Kinetic Rise */}
            <div className="pt-1">
              <motion.h2
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.35,
                    },
                  },
                }}
                className="text-3xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-tight flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3.5"
                style={{
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {/* Break "Which Is Right for You?" into animated words */}
                {["Which", "Is", "Right", "for", "You?"].map((word, wIdx) => (
                  <span key={wIdx} className="inline-block overflow-hidden py-1">
                    <motion.span
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          y: "120%", 
                          rotateX: -75,
                          filter: "blur(10px)" 
                        },
                        visible: { 
                          opacity: 1, 
                          y: "0%", 
                          rotateX: 0,
                          filter: "blur(0px)", 
                          transition: { 
                            duration: 0.8, 
                            ease: [0.16, 1, 0.3, 1] 
                          } 
                        },
                      }}
                      className="inline-block bg-gradient-to-r from-[#0077B6] via-[#0284C7] to-[#0B2748] bg-clip-text text-transparent will-change-transform"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>
            </div>

            {/* Glowing Dual-Beam Laser Flare Expansion Underline */}
            <div className="flex items-center justify-center gap-2 pt-3 w-full">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 sm:w-44 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#0077B6] to-transparent shadow-[0_0_12px_#0077B6]"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8, ease: "backOut" }}
                className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
              />
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 sm:w-44 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#0077B6] to-transparent shadow-[0_0_12px_#0077B6]"
              />
            </div>
          </motion.div>

        </div>

        {/* 4 COMPARISON POINTS DOWN A CONTINUOUS GLOWING STRAIGHT TIMELINE */}
        <div className="relative w-full max-w-6xl mx-auto my-4">
          
          {/* DESKTOP STRAIGHT VERTICAL LASER LINE */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[2px] bg-slate-200 z-0">
            {/* Active Glowing Laser Progress */}
            <motion.div
              className="w-full bg-gradient-to-b from-[#0077B6] via-[#38BDF8] to-[#0B2748] origin-top rounded-full relative"
              style={{ 
                height: laserHeight,
                boxShadow: "0 0 12px rgba(0, 119, 182, 0.6)",
              }}
            >
              {/* Laser Head Glow Bead */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]" />
            </motion.div>
          </div>

          {/* MOBILE STRAIGHT VERTICAL LASER LINE */}
          <div className="block md:hidden absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-200 z-0">
            <motion.div
              className="w-full bg-gradient-to-b from-[#0077B6] via-[#38BDF8] to-[#0B2748] origin-top rounded-full"
              style={{ height: laserHeight }}
            />
          </div>

          {/* 4 COMPARISON ITEMS */}
          {COMPARISON_ITEMS.map((item) => (
            <TimelineRow
              key={item.number}
              item={item}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

