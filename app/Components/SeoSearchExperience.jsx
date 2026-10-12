"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Mic } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FULL_QUERY = "Who needs SEO services in Chennai?";

const AUDIENCE_POINTS = [
  {
    number: "01",
    title: "Startups",
    description: "looking to build online visibility from scratch",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Local businesses",
    description: 'targeting "near me" searches',
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "Ecommerce brands",
    description: "aiming to increase organic sales",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Service-based businesses",
    description: "generating leads through Google",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "05",
    title: "Companies",
    description: "struggling with low rankings or traffic",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function SeoSearchExperience() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);

  // Search Stage Refs
  const searchIntroRef = useRef(null);
  const searchBarRef = useRef(null);
  const searchInputTextRef = useRef(null);
  const searchCursorRef = useRef(null);

  // 5 Points Layer Refs
  const pointImageRefs = useRef([]);
  const pointContentRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !frameRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(searchIntroRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      gsap.set(searchBarRef.current, { borderColor: "#DEE2E6", boxShadow: "0 15px 40px rgba(36, 62, 118, 0.15)" });
      
      // Initially hide all 5 audience compositions off-screen (Left for Image, Right for Content)
      pointImageRefs.current.forEach((imgEl) => {
        if (imgEl) gsap.set(imgEl, { x: "-55vw", opacity: 0, scale: 0.92, filter: "blur(14px)" });
      });
      pointContentRefs.current.forEach((cntEl) => {
        if (cntEl) gsap.set(cntEl, { x: "55vw", opacity: 0, scale: 0.92, filter: "blur(14px)" });
      });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=420%",
          scrub: 0.8,
          pin: frameRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Typing simulation object
      const typingObj = { charCount: 0 };
      const updateTypingText = (count) => {
        if (searchInputTextRef.current) {
          const num = Math.floor(count);
          if (num === 0) {
            searchInputTextRef.current.innerHTML = '<span class="text-[#243e76]/40 font-normal">Search...</span>';
          } else {
            searchInputTextRef.current.innerHTML = `<span class="text-[#243e76] font-bold">${FULL_QUERY.slice(0, num)}</span>`;
          }
        }
      };

      // ──────────────────────────────────────────
      // STAGE 01: SEARCH BAR ENTERS & TYPES (0 - 25)
      // ──────────────────────────────────────────
      master.addLabel("searchIntro", 0)
        // 1. Search bar enters from left and firmly settles at center
        .fromTo(
          searchBarRef.current,
          { x: "-80vw", opacity: 0, scale: 0.95 },
          { x: "0vw", opacity: 1, scale: 1, duration: 6, ease: "power2.out" },
          "searchIntro"
        )
        // 2. Typing starts strictly AFTER search bar reaches and settles at the center
        .to(
          typingObj,
          {
            charCount: FULL_QUERY.length,
            duration: 14,
            ease: "none",
            onUpdate: () => updateTypingText(typingObj.charCount),
          },
          "searchIntro+=7"
        )
        // 3. Active search bar glow/highlight after typing is done
        .to(
          searchBarRef.current,
          {
            borderColor: "#0481a2",
            boxShadow: "0 18px 50px rgba(4, 129, 162, 0.35)",
            duration: 2.5,
            ease: "power2.inOut",
          },
          "searchIntro+=21"
        );

      // ──────────────────────────────────────────
      // STAGE 02: SEARCH DISAPPEAR TRANSITION (25 - 33)
      // ──────────────────────────────────────────
      master.addLabel("searchExit", 25)
        .to(
          searchIntroRef.current,
          {
            opacity: 0,
            filter: "blur(24px)",
            duration: 8,
            ease: "power2.inOut",
          },
          "searchExit"
        );

      // ──────────────────────────────────────────
      // STAGE 03: FIVE POINTS CONVERGENT REVEAL
      // (IMAGE from LEFT + CONTENT from RIGHT -> CENTER)
      // ──────────────────────────────────────────
      const points = [0, 1, 2, 3, 4];
      const startBase = 33;
      const pointCycle = 22; // 10 units enter + 5 units hold + 7 units exit

      points.forEach((idx) => {
        const pStart = startBase + idx * pointCycle;
        const img = pointImageRefs.current[idx];
        const cnt = pointContentRefs.current[idx];
        const isLast = idx === points.length - 1;

        const enterLabel = `point_${idx + 1}_enter`;
        const exitLabel = `point_${idx + 1}_exit`;

        // 1. Simultaneous Entrance: Left Image + Right Content -> Center
        master.addLabel(enterLabel, pStart);
        if (img && cnt) {
          master.fromTo(
            img,
            { x: "-55vw", opacity: 0, scale: 0.92, filter: "blur(14px)" },
            { x: "0vw", opacity: 1, scale: 1, filter: "blur(0px)", duration: 9, ease: "power2.out" },
            enterLabel
          );
          master.fromTo(
            cnt,
            { x: "55vw", opacity: 0, scale: 0.92, filter: "blur(14px)" },
            { x: "0vw", opacity: 1, scale: 1, filter: "blur(0px)", duration: 9, ease: "power2.out" },
            enterLabel
          );
        }

        // 2. Hold at Center for Reading (natural timeline space)

        // 3. Smooth Exit before Next Point arrives (if not last)
        if (!isLast && img && cnt) {
          master.addLabel(exitLabel, pStart + 15);
          master.to(
            img,
            { x: "-35vw", opacity: 0, scale: 1.05, filter: "blur(10px)", duration: 7, ease: "power2.in" },
            exitLabel
          );
          master.to(
            cnt,
            { x: "35vw", opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 7, ease: "power2.in" },
            exitLabel
          );
        }
      });

      // Final hold on point 05
      master.to({}, { duration: 6 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full bg-[#f7f8fa] select-none shadow-[0_-30px_80px_rgba(16,28,56,0.3)]"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      <div ref={frameRef} className="relative h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* ───────────────────────────────────────────────────────────── */}
        {/* LAYER 1: SEARCH STATE INTRO (BG IMAGE + GOOGLE SEARCH BAR)   */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div
          ref={searchIntroRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-auto will-change-transform"
        >
          {/* SEO Themed Ambient Background Image & Glow */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop"
              alt="SEO Analytics & Strategy Background"
              fill
              unoptimized
              className="object-cover opacity-90 scale-100"
              priority
            />
            {/* Elegant overlay matching Deep Navy palette */}
            <div className="absolute inset-0 bg-[#243e76]/80 backdrop-blur-[1px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-[#0481a2]/25 rounded-full blur-[130px] pointer-events-none" />
          </div>

          {/* Google-Inspired Large Search Bar */}
          <div className="relative z-10 w-full max-w-[780px] flex justify-center px-2">
            <div
              ref={searchBarRef}
              className="w-full h-[68px] sm:h-[80px] bg-white border-2 border-[#DEE2E6] rounded-full px-6 sm:px-8 flex items-center justify-between transition-all duration-300 shadow-[0_25px_60px_-10px_rgba(36,62,118,0.45)] hover:shadow-[0_30px_70px_-10px_rgba(36,62,118,0.55)] will-change-transform"
            >
              {/* Search Icon & Typewriter Text */}
              <div className="flex items-center gap-4 sm:gap-5 flex-1 overflow-hidden mr-3">
                <Search className="w-6 h-6 sm:w-7 sm:h-7 text-[#0481a2] shrink-0" />
                <div className="text-base sm:text-xl md:text-[22px] tracking-tight flex items-center truncate" style={{ fontFamily: "'Varela Round', sans-serif" }}>
                  <span ref={searchInputTextRef} className="truncate">
                    <span className="text-[#243e76]/40 font-normal">Search...</span>
                  </span>
                  <span
                    ref={searchCursorRef}
                    className="inline-block w-[2.5px] h-6 sm:h-7 ml-1 bg-[#0481a2] animate-pulse shrink-0"
                  />
                </div>
              </div>

              {/* Mic Icon */}
              <div className="flex items-center shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[#243e76]/50 hover:text-[#0481a2] hover:bg-[#f7f8fa] transition-colors">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* LAYER 2: FIVE EDITORIAL AUDIENCE POINTS                       */}
        {/* (IMAGE ENTERS FROM LEFT + CONTENT ENTERS FROM RIGHT -> CENTER) */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 sm:px-8 md:px-16 lg:px-24">
          {AUDIENCE_POINTS.map((point, pIdx) => {
            return (
              <div
                key={point.number}
                className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 pointer-events-none"
              >
                <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14 lg:gap-20">
                  
                  {/* LEFT: EDITORIAL IMAGE (ENTERS FROM LEFT) */}
                  <div
                    ref={(el) => {
                      pointImageRefs.current[pIdx] = el;
                    }}
                    className="w-full md:w-1/2 flex justify-center md:justify-end will-change-transform"
                  >
                    <div className="relative w-[86vw] sm:w-[70vw] md:w-[42vw] lg:w-[480px] aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(36,62,118,0.22)] border-2 border-[#DEE2E6] bg-white group">
                      <Image
                        src={point.image}
                        alt={point.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 86vw, 480px"
                        priority={pIdx === 0}
                      />
                    </div>
                  </div>

                  {/* RIGHT: EDITORIAL CONTENT (ENTERS FROM RIGHT) */}
                  <div
                    ref={(el) => {
                      pointContentRefs.current[pIdx] = el;
                    }}
                    className="w-full md:w-1/2 flex flex-col justify-center text-left md:pl-4 will-change-transform"
                  >
                    {/* Number badge */}
                    <div className="mb-3 sm:mb-4">
                      <span className="inline-block text-sm sm:text-base font-bold text-[#0481a2] tracking-wider uppercase bg-white px-4 py-1.5 rounded-xl border-2 border-[#DEE2E6] shadow-xs" style={{ fontFamily: "'Varela Round', sans-serif" }}>
                        {point.number}
                      </span>
                    </div>

                    {/* Headline: Exact Title + Description */}
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-[#243e76] tracking-tight leading-[1.14] drop-shadow-xs max-w-xl" style={{ fontFamily: "'Varela Round', sans-serif" }}>
                      <span className="text-[#0481a2]">{point.title}</span> {point.description}
                    </h3>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

