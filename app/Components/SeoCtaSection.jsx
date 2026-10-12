"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SeoCtaSection() {
  const marqueeText = "READY TO IMPROVE YOUR SEARCH VISIBILITY? • ";

  return (
    <section
      className="relative w-full h-screen min-h-[600px] bg-[#243e76] text-white flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 overflow-hidden select-none"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      
      {/* ================= 1. DUAL INFINITE KINETIC MARQUEE RUNNERS (SUBTLE BACKGROUND) ================= */}
      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none opacity-[0.06] overflow-hidden z-0">
        
        {/* Top Marquee */}
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white select-none uppercase"
        >
          <span>{marqueeText.repeat(8)}</span>
        </motion.div>

        {/* Bottom Marquee */}
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter select-none uppercase"
          style={{
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.4)",
            color: "transparent",
          }}
        >
          <span>{marqueeText.repeat(8)}</span>
        </motion.div>
      </div>

      {/* ================= 2. MAIN CENTER STAGE ================= */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center px-2 py-4">
        
        {/* 1. TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 sm:mb-5 leading-[1.14] text-white"
        >
          Ready to Improve Your<br />
          <span className="text-[#38bdf8] underline decoration-[#38bdf8]/40 underline-offset-8">
            Search Visibility?
          </span>
        </motion.h2>

        {/* 2. DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-9 font-medium"
        >
          Let&apos;s build a strong SEO foundation for your business. Pair it with our{" "}
          <Link
            href="https://brand360s.com/services/social-media-marketing-agency-in-chennai/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1 font-bold text-[#38bdf8] hover:text-white transition-colors duration-300"
          >
            <span className="relative">
              social media marketing agency in Chennai
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#38bdf8] transform origin-left transition-transform duration-300 group-hover:scale-x-105" />
            </span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 inline-block text-[#38bdf8] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>{" "}
          services for full-funnel visibility.
        </motion.p>

        {/* 3. ROTATING CIRCULAR STAMP SEAL BUTTON (COMPACT & CENTERED) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative inline-block"
        >
          <Link
            href="https://brand360s.com/services/social-media-marketing-agency-in-chennai/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full border-2 border-[#0481a2] bg-[#101c38] shadow-2xl hover:border-[#38bdf8] hover:scale-105 transition-all duration-300"
          >
            {/* Center Core Disc */}
            <div className="w-full h-full rounded-full bg-[#101c38] flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-[#0481a2] transition-colors duration-300">
              
              {/* Continuous Rotating Circular Text Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full p-2.5">
                  <path
                    id="textPathCta"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    fill="none"
                  />
                  <text className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] fill-[#ffffff] transition-colors">
                    <textPath href="#textPathCta" startOffset="0%">
                      • GET MY FREE SEO AUDIT • GET MY FREE SEO AUDIT
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Center Icon */}
              <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0481a2] text-white group-hover:bg-white group-hover:text-[#243e76] flex items-center justify-center shadow-lg group-hover:rotate-45 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
