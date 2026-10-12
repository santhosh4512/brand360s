"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 6 Executive PR Strategy & Authority Pillars
const CONTENT_KITS = [
  {
    number: "01",
    title: "Founder Visibility Strategy",
    description: "Strengthen executive and founder positioning across digital channels.",
    image: "/images/linkedin-content-strategy.webp",
    bgColor: "#243e76", // Deep Brand Navy
    overlayFrom: "rgba(36, 62, 118, 0.94)",
    overlayTo: "rgba(16, 28, 56, 0.88)",
    textColor: "#FFFFFF",
    subtextColor: "#DEE2E6",
    accentColor: "#0481a2", // Aegean Teal
    cardBorder: "rgba(4, 129, 162, 0.35)",
    boxBg: "rgba(16, 28, 56, 0.6)",
  },
  {
    number: "02",
    title: "Media Coverage Planning",
    description: "Identify relevant media opportunities aligned with professional goals.",
    image: "/images/newsletter-content.webp",
    bgColor: "#0481a2", // Aegean Teal
    overlayFrom: "rgba(4, 129, 162, 0.94)",
    overlayTo: "rgba(36, 62, 118, 0.85)",
    textColor: "#FFFFFF",
    subtextColor: "#DEE2E6",
    accentColor: "#FFFFFF",
    cardBorder: "rgba(255, 255, 255, 0.35)",
    boxBg: "rgba(255, 255, 255, 0.12)",
  },
  {
    number: "03",
    title: "Executive Reputation Building",
    description: "Develop credibility through strategic PR and visibility initiatives.",
    image: "/images/brand-story-writing.webp",
    bgColor: "#101c38", // Dark Slate Universe
    overlayFrom: "rgba(16, 28, 56, 0.95)",
    overlayTo: "rgba(36, 62, 118, 0.85)",
    textColor: "#FFFFFF",
    subtextColor: "#DEE2E6",
    accentColor: "#0481a2",
    cardBorder: "rgba(4, 129, 162, 0.35)",
    boxBg: "rgba(4, 129, 162, 0.15)",
  },
  {
    number: "04",
    title: "Leadership Positioning",
    description: "Highlight expertise, achievements and industry contributions.",
    image: "/images/content-writing-hero.jpg",
    bgColor: "#1e3a8a", // Royal Sapphire
    overlayFrom: "rgba(30, 58, 138, 0.95)",
    overlayTo: "rgba(15, 23, 42, 0.88)",
    textColor: "#FFFFFF",
    subtextColor: "#DEE2E6",
    accentColor: "#38bdf8",
    cardBorder: "rgba(56, 189, 248, 0.35)",
    boxBg: "rgba(15, 23, 42, 0.6)",
  },
  {
    number: "05",
    title: "Strategic Story Development",
    description: "Create compelling narratives that attract media attention.",
    image: "/images/seo-services-chennai.webp",
    bgColor: "#026a85", // Deep Ocean Teal
    overlayFrom: "rgba(2, 106, 133, 0.95)",
    overlayTo: "rgba(16, 28, 56, 0.9)",
    textColor: "#FFFFFF",
    subtextColor: "#DEE2E6",
    accentColor: "#67e8f9",
    cardBorder: "rgba(103, 232, 249, 0.35)",
    boxBg: "rgba(8, 51, 68, 0.6)",
  },
  {
    number: "06",
    title: "Long-Term Authority Building",
    description: "Support sustainable executive visibility and recognition.",
    image: "/images/blog-content-writing.webp",
    bgColor: "#f7f8fa", // Crisp Off-White
    overlayFrom: "rgba(247, 248, 250, 0.96)",
    overlayTo: "rgba(222, 226, 230, 0.92)",
    textColor: "#243e76", // Deep Navy Text
    subtextColor: "#243e76",
    accentColor: "#0481a2",
    cardBorder: "rgba(36, 62, 118, 0.18)",
    boxBg: "rgba(36, 62, 118, 0.05)",
  },
];

export default function TechnicalCeramicsGallery() {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const panelsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const container = containerRef.current;
    if (!root || !container) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const total = CONTENT_KITS.length; // 6 kits
      const panels = panelsRef.current;

      // Active card: 70% width | Inactive cards: 6% width each (5 * 6% = 30%)
      const activeWidth = 70;
      const inactiveWidth = (100 - activeWidth) / (total - 1); // 6%

      // Initialize widths
      panels.forEach((p, idx) => {
        if (!p) return;
        gsap.set(p, {
          width: `${idx === 0 ? activeWidth : inactiveWidth}%`,
        });
      });

      // Master Pinned Scroll Timeline with 6 Distinct Scroll Stages & Holds
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * 5.5}`,
          pin: container,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const index = Math.min(total - 1, Math.floor(p * total));
            setActiveIdx(index);
          },
        },
      });

      // Initial Hold on Card 1
      masterTl.to({}, { duration: 0.8 });

      // Step-by-step transitions dynamically for all 6 cards
      for (let i = 0; i < total - 1; i++) {
        const nextIdx = i + 1;
        masterTl
          .to(panels[i], { width: `${inactiveWidth}%`, duration: 1.4, ease: "power2.inOut" }, "+=0.1")
          .to(panels[nextIdx], { width: `${activeWidth}%`, duration: 1.4, ease: "power2.inOut" }, "<")
          .to(`.kit-content-${i}`, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, "<")
          .fromTo(`.kit-content-${nextIdx}`, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "<0.4")
          .to({}, { duration: 0.8 });
      }

      // Final Solid Hold on last Card before unpinning
      masterTl.to({}, { duration: 1.2 });

    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="content-marketing-gallery"
      className="relative w-full bg-[#f7f8fa] text-[#243e76] select-none"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* Pinned 100vh Fullscreen Viewport */}
      <div
        ref={containerRef}
        className="w-full h-screen overflow-hidden flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 bg-[#f7f8fa]"
        style={{ fontFamily: "'Varela Round', sans-serif" }}
      >
        {/* ============================================================== */}
        {/* TOP HEADER: COMPLETE CREATIVE SYSTEMS                          */}
        {/* ============================================================== */}
        <div className="w-full max-w-7xl px-2 sm:px-6 pt-1 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-3 z-20 shrink-0">
          <div className="flex flex-col max-w-2xl">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#0481a2] mb-1" style={{ fontFamily: "'Varela Round', sans-serif" }}>
              WHY CHOOSE US
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#243e76] tracking-tight leading-[1.15]" style={{ fontFamily: "'Varela Round', sans-serif" }}>
              Why Businesses Choose Brand 360s as Their Executive PR Agency in Chennai
            </h2>
          </div>
          <p className="text-xs sm:text-sm md:text-[15px] text-[#243e76]/80 max-w-md font-normal leading-relaxed md:text-right" style={{ fontFamily: "'Varela Round', sans-serif" }}>
            Our Executive PR Agency in Chennai services help professionals build visibility, credibility and authority. For broader personal brand development, explore our Personal Branding Agency in Chennai services.
          </p>
        </div>

        {/* ============================================================== */}
        {/* MAIN 6-CARD EXPANDING GALLERY                                  */}
        {/* ============================================================== */}
        <div
          ref={galleryRef}
          className="relative w-full flex-1 max-h-[76vh] flex overflow-hidden rounded-2xl sm:rounded-3xl border border-[#DEE2E6] shadow-2xl bg-[#DEE2E6]"
        >
          {CONTENT_KITS.map((kit, idx) => (
            <div
              key={kit.number}
              ref={(el) => (panelsRef.current[idx] = el)}
              className="relative h-full shrink-0 overflow-hidden border-r last:border-r-0 will-change-[width] p-8 sm:p-10 lg:p-14 flex flex-col justify-center"
              style={{
                backgroundColor: kit.bgColor,
                borderColor: kit.cardBorder,
                color: kit.textColor,
                fontFamily: "'Varela Round', sans-serif",
              }}
            >
              {/* Background Image with Ambient Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src={kit.image}
                  alt={kit.title}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                    activeIdx === idx
                      ? "scale-105 opacity-35 filter brightness-100"
                      : "scale-100 opacity-20 filter brightness-75"
                  }`}
                />
                {/* Themed Gradient Overlay for Crystal-Clear Text Contrast */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${kit.overlayFrom} 0%, ${kit.overlayTo} 100%)`,
                  }}
                />
              </div>

              {/* Narrow Slice Number (Visible when slice is 8% narrow) */}
              <div
                className={`absolute top-10 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl font-bold tracking-wider transition-opacity duration-300 pointer-events-none z-10 ${
                  activeIdx === idx ? "opacity-0" : "opacity-75"
                }`}
                style={{ color: kit.textColor, fontFamily: "'Varela Round', sans-serif" }}
              >
                {kit.number}
              </div>

              {/* ====================================================== */}
              {/* ACTIVE CARD CONTENT (CLEAN, FOCUSED, NO EXTRA TEXT)   */}
              {/* ====================================================== */}
              <div
                className={`kit-content-${idx} relative z-20 w-full h-full flex flex-col justify-center pointer-events-auto ${
                  idx === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{ fontFamily: "'Varela Round', sans-serif" }}
              >
                {/* 2-Column Clean Composition */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full">
                  
                  {/* Left Column (5 cols): Number + Title */}
                  <div className="lg:col-span-5 flex flex-col items-start text-left">
                    <span
                      className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wider mb-2 opacity-90"
                      style={{ color: kit.accentColor, fontFamily: "'Varela Round', sans-serif" }}
                    >
                      {kit.number}
                    </span>

                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.18] tracking-tight"
                      style={{ color: kit.textColor, fontFamily: "'Varela Round', sans-serif" }}
                    >
                      {kit.title}
                    </h3>
                  </div>

                  {/* Right Column (7 cols): Exact Description */}
                  <div
                    className="lg:col-span-7 p-6 sm:p-8 lg:p-10 rounded-2xl border backdrop-blur-md flex flex-col justify-center text-left"
                    style={{
                      backgroundColor: kit.boxBg,
                      borderColor: kit.cardBorder,
                    }}
                  >
                    <p
                      className="text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed"
                      style={{ color: kit.textColor, fontFamily: "'Varela Round', sans-serif" }}
                    >
                      {kit.description}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
