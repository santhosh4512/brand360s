"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, TrendingUp, Search, Layers, ShieldCheck, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SEO_STAGES = [
  {
    id: "01",
    num: "01",
    duration: "1 Month",
    title: "Audit, fixes and keyword strategy",
    description: "Deep technical diagnostic, resolving crawl bottlenecks, establishing high-intent keyword foundations, and setting benchmark performance metrics.",
    tags: [
      ["/ FULL TECHNICAL AUDIT", "/ CORE WEB VITALS BOOST"],
      ["/ KEYWORD GAP ANALYSIS", "/ ARCHITECTURE STREAMLINING"],
      ["/ INDEXATION REPAIR", "/ SCHEMA & STRUCTURED DATA"],
    ],
    panelTheme: {
      primaryBg: "#0B1528",
      accentBg: "#112240",
      accentBorder: "rgba(56, 189, 248, 0.2)",
      statNumber: "100%",
      statLabel: "Crawl Indexation Health",
      metricTitle: "Phase 1 Baseline",
      metricSub: "Zero 404 Errors · Clean Architecture",
    },
  },
  {
    id: "02",
    num: "02",
    duration: "2–3 Month",
    title: "On-page optimization + content improvements",
    description: "Aligning on-page metadata with search intent, publishing authoritative topical clusters, and optimizing conversion-focused landing pages.",
    tags: [
      ["/ ON-PAGE METADATA REWRITE", "/ TOPICAL CONTENT CLUSTERS"],
      ["/ INTERNAL LINK FLOW", "/ SEARCH INTENT ALIGNMENT"],
      ["/ CTR TITLE EXPERIMENTS", "/ FAQ & SNIPPET CAPTURE"],
    ],
    panelTheme: {
      primaryBg: "#0F203C",
      accentBg: "#162D55",
      accentBorder: "rgba(56, 189, 248, 0.3)",
      statNumber: "+180%",
      statLabel: "Keyword Ranking Velocity",
      metricTitle: "Topical Expansion",
      metricSub: "High-Intent Page Clusters Live",
    },
  },
  {
    id: "03",
    num: "03",
    duration: "3–6 Month",
    title: "Ranking improvements and traffic growth",
    description: "Surging into Google Page 1 for high-volume revenue keywords, compounding organic impressions, and accelerating inbound traffic growth.",
    tags: [
      ["/ TOP 10 SERP DOMINANCE", "/ IMPRESSION ACCELERATION"],
      ["/ LOCAL MAP PACK TOP 3", "/ BOUNCE RATE REDUCTION"],
      ["/ ORGANIC TRAFFIC SURGE", "/ COMMERCIAL QUERY WINS"],
    ],
    panelTheme: {
      primaryBg: "#0B2A4A",
      accentBg: "#0369A1",
      accentBorder: "rgba(56, 189, 248, 0.4)",
      statNumber: "Top 3",
      statLabel: "Average SERP Positions",
      metricTitle: "Traffic Compounding",
      metricSub: "3.4x Qualified Search Inquiries",
    },
  },
  {
    id: "04",
    num: "04",
    duration: "6+ Months",
    title: "Authority building and consistent lead generation",
    description: "Cementing industry market leadership through high-tier contextual backlink acquisition, sustaining top positions, and driving predictable customer pipeline.",
    tags: [
      ["/ NICHE EDITORIAL BACKLINKS", "/ SUSTAINED MARKET LEADERSHIP"],
      ["/ PREDICTABLE PIPELINE", "/ CONTINUOUS CRO EXPERIMENTS"],
      ["/ COMPETITOR DEFENSE MOAT", "/ REVENUE ATTRIBUTION TRACKING"],
    ],
    panelTheme: {
      primaryBg: "#0A192F",
      accentBg: "#0284C7",
      accentBorder: "rgba(56, 189, 248, 0.5)",
      statNumber: "$0 CAC",
      statLabel: "Compounding Organic Pipeline",
      metricTitle: "Domain Authority Moat",
      metricSub: "Consistent High-Intent Inbound Leads",
    },
  },
];

export default function TimelineSection({ className = "" }) {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [showFinalQuote, setShowFinalQuote] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    const ctx = gsap.context(() => {
      const totalStages = SEO_STAGES.length;

      // Master Pinned Scroll Timeline for the 4 SEO Stages
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: `+=${totalStages * 1400}`,
          pin: container,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const newIndex = Math.min(totalStages - 1, Math.floor(p * totalStages * 0.999));
            setActiveStage(newIndex);
            setShowFinalQuote(p > 0.88);
          },
        },
      });

      // 1. Stage-by-Stage Typography & Visual Panel Translations
      SEO_STAGES.forEach((_, i) => {
        if (i === 0) return;
        const time = (i / totalStages) * totalStages;

        // Typography Transition: Old exits to left (x: 0 -> -80px), New enters from right (x: 80px -> 0)
        masterTl.to(
          `.seo-stage-text-${i - 1}`,
          {
            x: -80,
            opacity: 0,
            duration: 0.45,
            ease: "power3.inOut",
          },
          time - 0.25
        );

        masterTl.fromTo(
          `.seo-stage-text-${i}`,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
          time + 0.05
        );

        // Visual Panels Horizontal & Scale Choreography
        masterTl.to(
          `.seo-panel-main-${i - 1}`,
          {
            x: -120,
            opacity: 0,
            scale: 0.92,
            duration: 0.5,
            ease: "power2.inOut",
          },
          time - 0.25
        );

        masterTl.fromTo(
          `.seo-panel-main-${i}`,
          { x: 120, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          time + 0.05
        );

        // Secondary and Tertiary Visual Cards Shifting
        masterTl.to(
          `.seo-subpanel-top-${i - 1}`,
          {
            y: -50,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          time - 0.2
        );

        masterTl.fromTo(
          `.seo-subpanel-top-${i}`,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          time + 0.1
        );

        masterTl.to(
          `.seo-subpanel-bot-${i - 1}`,
          {
            x: 80,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          time - 0.2
        );

        masterTl.fromTo(
          `.seo-subpanel-bot-${i}`,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          time + 0.15
        );
      });
    }, trigger);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (index) => {
    if (!triggerRef.current) return;
    const total = SEO_STAGES.length;
    const targetScroll = triggerRef.current.offsetTop + (index / total) * (total * 1400);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={triggerRef}
      id="seo-timeline"
      className={`relative w-full bg-[#050C1A] text-[#F8FAFC] select-none ${className}`}
      style={{ height: `${SEO_STAGES.length * 100}vh` }}
    >
      {/* Editorial Typography & Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        
        .font-seo-title {
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          letter-spacing: -0.035em;
          font-weight: 400;
        }
        .font-seo-stage {
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          letter-spacing: -0.025em;
        }
        .font-seo-mono {
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.05em;
        }
        .font-seo-num {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.02em;
        }
      `}</style>

      {/* Sticky Fullscreen 100vh Editorial Viewport */}
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#050C1A] via-[#09152B] to-[#040914]"
      >
        {/* ============================================================== */}
        {/* 1. TOP EDITORIAL HEADER BAR                                    */}
        {/* ============================================================== */}
        <header className="relative z-40 flex items-center justify-between w-full border-b border-white/10 pb-4">
          {/* Section Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-seo-mono text-xs text-[#38BDF8] tracking-widest uppercase font-semibold">
              BRAND 360s · SEO METHODOLOGY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span className="font-seo-mono text-xs text-white/50 tracking-wider uppercase hidden sm:inline">
              STRATEGIC GROWTH JOURNEY
            </span>
          </div>

          {/* Floating Minimal Pill */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
            <span className="font-seo-mono text-[11px] text-white/80 uppercase font-medium">
              PHASE {SEO_STAGES[activeStage].num} OF 04
            </span>
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] animate-pulse" />
          </div>
        </header>

        {/* ============================================================== */}
        {/* 2. CENTER EDITORIAL SPLIT CANVAS                               */}
        {/* LEFT: Anchored Typography | RIGHT: Rearranging Visual Panels   */}
        {/* ============================================================== */}
        <div className="relative z-30 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4">
          
          {/* ------------------------------------------------------------ */}
          {/* LEFT 6 COLS: EDITORIAL TYPOGRAPHY                            */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Main Section Heading */}
            <h2 className="font-seo-title text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight mb-2">
              SEO Timeline <br />
              <span className="text-white/60 font-light">& Results Expectation</span>
            </h2>

            {/* Subtitle */}
            <p className="font-seo-stage text-xs sm:text-sm text-[#94A3B8] max-w-lg mb-8 leading-relaxed">
              SEO is a long-term strategy focused on sustainable growth.
            </p>

            {/* Stage Dynamic Content Container (Transitions 01 -> 04 on scroll) */}
            <div className="relative min-h-[280px] w-full">
              {SEO_STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`seo-stage-text-${idx} absolute left-0 top-0 w-full flex flex-col items-start ${
                    idx === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Stage Number + Duration Badge */}
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-seo-num text-5xl sm:text-6xl text-[#38BDF8] leading-none">
                      {stage.num}
                    </span>
                    <span className="font-seo-stage text-2xl sm:text-3xl text-white font-bold tracking-tight">
                      {stage.duration}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3 className="font-seo-stage text-lg sm:text-xl text-[#E2E8F0] font-semibold mb-3 leading-snug">
                    {stage.title}
                  </h3>

                  {/* Stage Detailed Description */}
                  <p className="font-seo-stage text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-md mb-6">
                    {stage.description}
                  </p>

                  {/* 2-Column Slashed Tags Grid (Editorial reference style) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6 w-full">
                    {stage.tags.map((row, rIdx) => (
                      <React.Fragment key={rIdx}>
                        <span className="font-seo-mono text-[11px] text-[#38BDF8] opacity-90 font-medium">
                          {row[0]}
                        </span>
                        <span className="font-seo-mono text-[11px] text-[#94A3B8] opacity-90 font-medium">
                          {row[1]}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Editorial Outline Pill Button */}
                  <button className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#38BDF8]/40 text-[#38BDF8] font-seo-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#38BDF8] hover:text-[#050C1A] cursor-pointer">
                    <span>{stage.cta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT 6 COLS: ABSTRACT EDITORIAL SEO VISUAL PANELS           */}
          {/* Overlapping, rearranging panels on each scroll stage        */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-6 relative h-[380px] sm:h-[440px] w-full flex items-center justify-center">
            
            {SEO_STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  activeStage === idx ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                {/* 1. Main Large Visual Panel (Abstract SERP / Growth Data Card) */}
                <div
                  className={`seo-panel-main-${idx} relative z-20 w-[88%] sm:w-[82%] h-[280px] sm:h-[320px] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border backdrop-blur-xl ${
                    idx === 0 ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundColor: stage.panelTheme.primaryBg,
                    borderColor: stage.panelTheme.accentBorder,
                  }}
                >
                  {/* Top Bar inside panel */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                        {idx === 0 && <Search className="w-4 h-4" />}
                        {idx === 1 && <Layers className="w-4 h-4" />}
                        {idx === 2 && <TrendingUp className="w-4 h-4" />}
                        {idx === 3 && <ShieldCheck className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-seo-stage text-xs font-bold text-white uppercase tracking-wider">
                          {stage.panelTheme.metricTitle}
                        </div>
                        <div className="font-seo-mono text-[10px] text-white/50">
                          {stage.panelTheme.metricSub}
                        </div>
                      </div>
                    </div>
                    <span className="font-seo-mono text-xs px-2.5 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/25 font-bold">
                      STAGE {stage.num}
                    </span>
                  </div>

                  {/* Center High-Impact Metric */}
                  <div className="my-auto py-3">
                    <div className="font-seo-num text-5xl sm:text-6xl text-white tracking-tight leading-none mb-1">
                      {stage.panelTheme.statNumber}
                    </div>
                    <div className="font-seo-mono text-xs text-[#38BDF8] uppercase tracking-widest">
                      {stage.panelTheme.statLabel}
                    </div>
                  </div>

                  {/* Abstract SERP Waveform / Data Bars */}
                  <div className="flex items-end gap-2 h-10 w-full pt-2 border-t border-white/10">
                    {[40, 65, 55, 80, 95, 75, 90, 100, 85, 98, 92, 100].map((val, barIdx) => (
                      <div
                        key={barIdx}
                        className="flex-1 rounded-t transition-all duration-700"
                        style={{
                          height: `${(val * (idx + 1)) / 4}%`,
                          backgroundColor: barIdx >= 8 ? "#38BDF8" : "rgba(255, 255, 255, 0.15)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 2. Top-Right Secondary Overlapping Mini-Card */}
                <div
                  className={`seo-subpanel-top-${idx} absolute -top-4 right-2 sm:right-4 z-30 px-4 py-3 rounded-xl border border-white/15 bg-[#0F203C]/90 backdrop-blur-xl shadow-xl flex items-center gap-3 ${
                    idx === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
                  <span className="font-seo-mono text-[11px] text-white/90 font-medium">
                    {idx === 0 && "100% Crawl Clean"}
                    {idx === 1 && "Topical Hubs Active"}
                    {idx === 2 && "Rank #1 SERP Capture"}
                    {idx === 3 && "Authority Moat Secured"}
                  </span>
                </div>

                {/* 3. Bottom-Left Tertiary Overlapping Mini-Card */}
                <div
                  className={`seo-subpanel-bot-${idx} absolute -bottom-4 left-2 sm:left-4 z-30 px-4 py-2.5 rounded-xl border border-white/15 bg-[#071326]/95 backdrop-blur-xl shadow-xl flex items-center gap-2.5 ${
                    idx === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span className="font-seo-mono text-[10px] text-white/80 uppercase tracking-wider font-semibold">
                    {idx === 0 && "Core Web Vitals: 99/100"}
                    {idx === 1 && "Content Quality: Verified"}
                    {idx === 2 && "Organic Impressions: +340%"}
                    {idx === 3 && "Conversion Yield: Compound"}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. BOTTOM NUMBERED NAVIGATION & FINAL GROWTH STATEMENT         */}
        {/* ============================================================== */}
        <footer className="relative z-40 w-full pt-4 border-t border-white/10 flex flex-col gap-3">
          
          {/* Bottom Numbered Navigation: 01   02   03   04 */}
          <div className="flex items-center justify-between gap-6 sm:gap-12 overflow-x-auto scrollbar-none">
            {SEO_STAGES.map((st, i) => {
              const isActive = activeStage === i;
              return (
                <button
                  key={st.id}
                  onClick={() => handleNavClick(i)}
                  className={`group relative pb-2 transition-all duration-300 cursor-pointer shrink-0 text-left ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
                  }`}
                >
                  {/* Number + Duration */}
                  <div className="flex items-baseline gap-2 text-white">
                    <span className="font-seo-mono text-xs font-bold text-[#38BDF8]">
                      {st.num}
                    </span>
                    <span className="font-seo-stage text-xs sm:text-sm font-bold tracking-wider uppercase">
                      {st.duration}
                    </span>
                  </div>

                  {/* Active Solid Cyan Underline */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#38BDF8] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Final Compelling Growth Statement (Revealed after Stage 04) */}
          <div
            className={`transition-all duration-700 overflow-hidden ${
              showFinalQuote
                ? "max-h-20 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="pt-2 text-center sm:text-left">
              <p className="font-seo-stage text-xs sm:text-sm text-[#38BDF8] font-semibold tracking-wide">
                “If your competitors are ranking above you, they are getting your customers.”
              </p>
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
}
