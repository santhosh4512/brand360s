"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICE_WORDS = [
  {
    id: 1,
    tag: "01 / ARTICLE STRATEGY",
    title: "Content Writing Services Chennai",
    headline: "High-Impact Articles",
    metric: "+140% Engagement Rate",
    desc: "Targeted localized and global content designed to capture high-intent buyers.",
    image: "/images/seo-services-chennai.webp",
  },
  {
    id: 2,
    tag: "02 / THOUGHT LEADERSHIP",
    title: "Linkedin Content Writer India",
    headline: "Executive Brand Authority",
    metric: "Top 1% Creator Visibility",
    desc: "Positioning leadership voices with authentic storytelling that sparks industry conversations.",
    image: "/images/linkedin-content-strategy.webp",
  },
  {
    id: 3,
    tag: "03 / ORGANIC RANKING",
    title: "SEO Blog Writing Services",
    headline: "Search-Engine Optimized",
    metric: "Page #1 Google Authority",
    desc: "Data-driven pillar content structured for algorithm crawlability and long-term search reach.",
    image: "/images/blog-content-writing.webp",
  },
  {
    id: 4,
    tag: "04 / NARRATIVE CRAFT",
    title: "Brand Storytelling",
    headline: "Emotional Connection",
    metric: "3.8x Brand Recall",
    desc: "Unforgettable narratives that connect customer values directly with your company vision.",
    image: "/images/brand-story-writing.webp",
  },
  {
    id: 5,
    tag: "05 / AUDIENCE PIPELINE",
    title: "Newsletter Writing Service",
    headline: "Direct Inbox Nurturing",
    metric: "48% Avg Open Rate",
    desc: "Compelling weekly digests that retain loyal subscribers and drive consistent conversions.",
    image: "/images/newsletter-content.webp",
  },
  {
    id: 6,
    tag: "06 / FULL FUNNEL GROWTH",
    title: "Content Marketing Service",
    headline: "Scalable Content Engine",
    metric: "Compounding ROI",
    desc: "Complete multi-channel asset creation delivering qualified leads and measurable growth.",
    image: "/images/seo-growth-hero.jpg",
  },
];

export default function ContentMarketingExperience() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  // Phase container refs
  const phase1Ref = useRef(null);
  const phase3Ref = useRef(null);
  const phase4Ref = useRef(null);

  // Sub elements
  const lettersRef = useRef([]);
  const morph1Ref = useRef(null);
  const morph2Ref = useRef(null);
  const morph3Ref = useRef(null);
  const editorialRef = useRef(null);

  // Phase 4 specific refs for scroll-driven progression
  const serviceItemRefs = useRef([]);
  const serviceTitleRefs = useRef([]);
  const serviceNumRefs = useRef([]);
  const serviceImageRefs = useRef([]);
  const serviceListRef = useRef(null);

  const [activeItem, setActiveItem] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !containerRef.current) return;

      // Master Timeline pinned over 6500px of scroll for unhurried, distinct 6-point scroll experience
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3200",
          pin: containerRef.current,
          pinSpacing: true,
          scrub: 1.0,
          anticipatePin: 1,
        },
      });

      // 0. RESET ALL PHASES INITIALLY
      gsap.set([phase1Ref.current, phase3Ref.current, phase4Ref.current], {
        autoAlpha: 0,
      });
      gsap.set([morph1Ref.current, morph2Ref.current, morph3Ref.current], {
        autoAlpha: 0,
        y: 25,
      });

      // =========================================================================
      // STEP 1: OPENING — "CONTENT" ASSEMBLES + 3 PILLARS ON FIRST PAGE
      // =========================================================================
      tl.set(phase1Ref.current, { autoAlpha: 1 });

      lettersRef.current.forEach((letter, i) => {
        if (!letter) return;
        const randomX = (i - 3) * 60;
        const randomY = (i % 2 === 0 ? -1 : 1) * 70;
        tl.fromTo(
          letter,
          { x: randomX, y: randomY, opacity: 0, filter: "blur(14px)", scale: 1.5 },
          { x: 0, y: 0, opacity: 1, filter: "blur(0px)", scale: 1, ease: "power3.out", duration: 0.6 },
          0.05 + i * 0.04
        );
      });

      // Reveal the 3 headline words seamlessly on the same first screen with kinetic blur & scale matching CONTENT
      tl.fromTo(
        [morph1Ref.current, morph2Ref.current, morph3Ref.current],
        { autoAlpha: 0, y: 35, scale: 1.25, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
        },
        0.3
      );

      tl.to({}, { duration: 0.75 }); // Unified breathing hold for the whole hero lockup

      // STEP 1 EXIT — All 4 elements transition out together smoothly into Phase 3
      tl.to(phase1Ref.current, {
        autoAlpha: 0,
        scale: 0.9,
        filter: "blur(10px)",
        y: -25,
        duration: 0.45,
        ease: "power2.in",
      });

      // =========================================================================
      // STEP 3: CONTENT WRITING EXPERIENCE (Pure Floating Typography)
      // =========================================================================
      tl.set(phase3Ref.current, { autoAlpha: 1 });
      tl.fromTo(
        editorialRef.current,
        { autoAlpha: 0, y: 35, filter: "blur(8px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
      );

      tl.to(
        ".theme-accent",
        { color: "#0481a2", textShadow: "0 0 16px rgba(4, 129, 162, 0.45)", duration: 0.3, stagger: 0.05 }
      );

      tl.to({}, { duration: 0.5 }); // HOLD for reading

      tl.to(phase3Ref.current, {
        autoAlpha: 0,
        y: -30,
        filter: "blur(10px)",
        duration: 0.35,
        ease: "power2.in",
      });

      // =========================================================================
      // STEP 4: SERVICE WORDS (8-POINT SCROLL-DRIVEN PROGRESSION + IMAGE SYNC)
      // =========================================================================
      tl.set(phase4Ref.current, { autoAlpha: 1 });

      // Fade in the whole phase 4 container
      tl.fromTo(
        phase4Ref.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );

      // Set initial state for all 6 items: item 0 active, others inactive with sharp visual contrast
      serviceItemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          backgroundColor: i === 0 ? "rgba(4, 129, 162, 0.28)" : "rgba(16, 28, 56, 0.55)",
          borderColor: i === 0 ? "#0481a2" : "rgba(222, 226, 230, 0.12)",
          boxShadow: i === 0 ? "0 12px 36px rgba(4, 129, 162, 0.45)" : "0 4px 15px rgba(0, 0, 0, 0.15)",
          x: i === 0 ? 14 : 0,
          scale: i === 0 ? 1.03 : 0.97,
          opacity: i === 0 ? 1 : 0.45,
        });
      });
      serviceTitleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          color: i === 0 ? "#ffffff" : "#DEE2E6",
          opacity: i === 0 ? 1 : 0.6,
        });
      });
      serviceNumRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0.4,
          color: i === 0 ? "#0481a2" : "#DEE2E6",
          scale: i === 0 ? 1.15 : 1,
        });
      });
      serviceImageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 50,
          scale: i === 0 ? 1 : 1.1,
          filter: i === 0 ? "blur(0px)" : "blur(10px)",
        });
      });

      tl.to({}, { duration: 0.8 }); // Hold item 1 clearly

      // SCROLL-DRIVEN STEPPING THROUGH POINTS 1 TO 6
      for (let i = 0; i < SERVICE_WORDS.length - 1; i++) {
        const next = i + 1;
        const stepTl = gsap.timeline();

        // Dim current item i on left list
        if (serviceItemRefs.current[i]) {
          stepTl.to(
            serviceItemRefs.current[i],
            {
              backgroundColor: "rgba(16, 28, 56, 0.55)",
              borderColor: "rgba(222, 226, 230, 0.12)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
              x: 0,
              scale: 0.97,
              opacity: 0.45,
              duration: 0.4,
              ease: "power2.inOut",
            },
            0
          );
        }
        if (serviceTitleRefs.current[i]) {
          stepTl.to(
            serviceTitleRefs.current[i],
            { color: "#DEE2E6", opacity: 0.6, duration: 0.35, ease: "power2.inOut" },
            0
          );
        }
        if (serviceNumRefs.current[i]) {
          stepTl.to(
            serviceNumRefs.current[i],
            { color: "#DEE2E6", opacity: 0.4, scale: 1, duration: 0.3 },
            0
          );
        }

        // Distinct Exit Animation for Previous Card in Right Box
        if (serviceImageRefs.current[i]) {
          stepTl.to(
            serviceImageRefs.current[i],
            {
              autoAlpha: 0,
              y: -50,
              scale: 0.9,
              filter: "blur(10px)",
              duration: 0.45,
              ease: "power2.inOut",
            },
            0
          );
        }

        // Illuminate next item on left list with distinct scale, slide, and border glow
        if (serviceItemRefs.current[next]) {
          stepTl.to(
            serviceItemRefs.current[next],
            {
              backgroundColor: "rgba(4, 129, 162, 0.28)",
              borderColor: "#0481a2",
              boxShadow: "0 12px 36px rgba(4, 129, 162, 0.45)",
              x: 14,
              scale: 1.03,
              opacity: 1,
              duration: 0.45,
              ease: "power2.out",
            },
            0.05
          );
        }
        if (serviceTitleRefs.current[next]) {
          stepTl.to(
            serviceTitleRefs.current[next],
            { color: "#ffffff", opacity: 1, duration: 0.4, ease: "power2.out" },
            0.08
          );
        }
        if (serviceNumRefs.current[next]) {
          stepTl.to(
            serviceNumRefs.current[next],
            { color: "#0481a2", opacity: 1, scale: 1.15, duration: 0.4 },
            0.08
          );
        }

        // Distinct Swoop-In Animation for Next Card in Right Box
        if (serviceImageRefs.current[next]) {
          stepTl.fromTo(
            serviceImageRefs.current[next],
            { autoAlpha: 0, y: 50, scale: 1.1, filter: "blur(10px)" },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power3.out",
            },
            0.05
          );
        }

        // Shift list smoothly
        if (serviceListRef.current) {
          const shiftY = -(next * 16);
          stepTl.to(serviceListRef.current, { y: shiftY, duration: 0.45, ease: "power2.out" }, 0.05);
        }

        tl.add(stepTl);
        tl.to({}, { duration: 0.85 }); // Clear and comfortable hold for each point on scroll
      }

      // Final hold of last point
      tl.to({}, { duration: 1.0 });

      // STEP 4 COMPLETE EXIT — Smoothly fade/zoom out into next section
      tl.to(phase4Ref.current, {
        autoAlpha: 0,
        scale: 0.94,
        filter: "blur(10px)",
        y: -30,
        duration: 0.5,
        ease: "power2.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#243e76] text-white overflow-hidden select-none"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* Brand Ambient Accent from #0481a2 and deep #243e76 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[#0481a2]/15 blur-[140px] rounded-full" />
      </div>

      {/* STICKY 100VH VIEWPORT */}
      <div
        ref={containerRef}
        className="w-full h-screen min-h-[600px] max-h-[1080px] flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8"
        style={{ fontFamily: "'Varela Round', sans-serif" }}
      >
        {/* ========================================================================= */}
        {/* 1. OPENING — CONTENT & 3 CORE PILLARS (PURE TYPOGRAPHIC HERO LOCKUP)     */}
        {/* ========================================================================= */}
        <div
          ref={phase1Ref}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-4 text-center max-w-6xl mx-auto"
          style={{ fontFamily: "'Varela Round', sans-serif" }}
        >
          {/* Main Title: CONTENT */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white flex items-center justify-center mb-6 sm:mb-10"
            style={{ fontFamily: "'Varela Round', sans-serif" }}
          >
            {["C", "O", "N", "T", "E", "N", "T"].map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  lettersRef.current[i] = el;
                }}
                className="inline-block transform will-change-transform text-white drop-shadow-[0_4px_24px_rgba(4,129,162,0.45)]"
              >
                {char}
              </span>
            ))}
          </h1>

          {/* 3 Core Words in the exact same typography & drop-shadow style as CONTENT */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-10 w-full max-w-5xl px-4">
            {/* HIGH-IMPACT WRITING */}
            <div
              ref={morph1Ref}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(4,129,162,0.45)] select-none"
              style={{ fontFamily: "'Varela Round', sans-serif" }}
            >
              HIGH-IMPACT <span className="text-[#0481a2]">WRITING</span>
            </div>

            <span className="hidden md:inline-block text-[#0481a2] text-2xl opacity-60">•</span>

            {/* AUTHORITY */}
            <div
              ref={morph2Ref}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(4,129,162,0.45)] select-none"
              style={{ fontFamily: "'Varela Round', sans-serif" }}
            >
              <span className="text-[#0481a2]">BRAND</span> AUTHORITY
            </div>

            <span className="hidden md:inline-block text-[#0481a2] text-2xl opacity-60">•</span>

            {/* SEARCH VISIBILITY */}
            <div
              ref={morph3Ref}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(4,129,162,0.45)] select-none"
              style={{ fontFamily: "'Varela Round', sans-serif" }}
            >
              SEARCH <span className="text-[#0481a2]">VISIBILITY</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CONTENT WRITING EXPERIENCE (Pure Floating Typography)                  */}
        {/* ========================================================================= */}
        <div
          ref={phase3Ref}
          className="absolute inset-0 flex items-center justify-center z-30 px-6 sm:px-10 md:px-16"
        >
          <div
            ref={editorialRef}
            className="max-w-3xl w-full mx-auto border-l-2 border-[#0481a2] pl-6 sm:pl-10 space-y-6"
            style={{ fontFamily: "'Varela Round', sans-serif" }}
          >
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Content That Communicates,<br />
              <span className="text-[#0481a2]">Educates & Converts</span>
            </h3>

            <div className="text-lg sm:text-2xl md:text-3xl font-normal text-[#DEE2E6] leading-relaxed">
              “<span className="theme-accent font-bold text-white">Strong brands</span> communicate with{" "}
              <span className="theme-accent font-bold text-white">purpose</span>.”
            </div>

            <div className="text-base sm:text-lg md:text-xl text-[#DEE2E6]/95 leading-relaxed font-normal">
              Our content marketing add-ons are built to{" "}
              <span className="theme-accent font-bold text-white">educate audiences</span>, strengthen{" "}
              <span className="theme-accent font-bold text-white">credibility</span> and support{" "}
              <span className="theme-accent font-bold text-white">SEO</span>, without the cost of an internal team.
              <span className="inline-block w-2 h-4 bg-[#0481a2] ml-2 animate-pulse align-middle" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SERVICE WORDS (6-POINT ANIMATED LIST SCROLL + IMAGE PORTAL)           */}
        {/* ========================================================================= */}
        <div
          ref={phase4Ref}
          className="absolute inset-0 flex items-center justify-center z-30 px-4 sm:px-8 md:px-12 overflow-hidden"
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 lg:gap-14">
            {/* Left Column: 6 Animated List Cards with Overlays */}
            <div className="w-full md:w-[58%] relative">
              <div
                ref={serviceListRef}
                className="w-full flex flex-col space-y-2.5 sm:space-y-3 py-2 transition-transform duration-300"
              >
                {SERVICE_WORDS.map((service, idx) => (
                  <div
                    key={service.id}
                    ref={(el) => {
                      serviceItemRefs.current[idx] = el;
                    }}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border transition-all duration-300 cursor-pointer bg-[#101c38]/85 border-[#DEE2E6]/15 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-between gap-3 group hover:border-[#0481a2]/60"
                    style={{ fontFamily: "'Varela Round', sans-serif" }}
                  >
                    <h4
                      ref={(el) => {
                        serviceTitleRefs.current[idx] = el;
                      }}
                      className="text-sm sm:text-base md:text-[17px] lg:text-[18px] font-bold tracking-tight select-none text-white transition-colors duration-300"
                      style={{ fontFamily: "'Varela Round', sans-serif" }}
                    >
                      {service.title}
                    </h4>
                    <span
                      ref={(el) => {
                        serviceNumRefs.current[idx] = el;
                      }}
                      className="text-xs tracking-widest shrink-0 font-bold text-[#DEE2E6] transition-colors duration-300"
                      style={{ fontFamily: "'Varela Round', sans-serif" }}
                    >
                      0{service.id} ↗
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Synced Preview Portal with Visible Card Transitions */}
            <div className="w-full md:w-[42%] flex items-center justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#0481a2]/60 shadow-[0_20px_50px_rgba(4,129,162,0.35)] bg-[#101c38] backdrop-blur-md">
                {SERVICE_WORDS.map((item, idx) => (
                  <div
                    key={item.id}
                    ref={(el) => {
                      serviceImageRefs.current[idx] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 will-change-transform"
                    style={{ fontFamily: "'Varela Round', sans-serif" }}
                  >
                    {/* Background Image with Dark Tint */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover -z-10"
                    />
                    <div className="absolute inset-0 bg-[#101c38]/75 -z-10" />

                    {/* Top Status Header */}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[11px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#0481a2]/25 border border-[#0481a2]/50 text-[#0481a2] backdrop-blur-sm">
                        {item.tag}
                      </span>
                      <span className="text-xs font-bold text-white/80 px-2.5 py-0.5 rounded-md bg-[#243e76]/80 border border-[#DEE2E6]/20">
                        0{item.id} / 06
                      </span>
                    </div>

                    {/* Center & Bottom Information Overlay */}
                    <div className="space-y-2 z-10 pt-4">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0481a2] bg-[#101c38]/90 px-2.5 py-1 rounded-md border border-[#0481a2]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0481a2] animate-pulse" />
                        {item.metric}
                      </div>

                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                        {item.headline}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#DEE2E6]/90 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
