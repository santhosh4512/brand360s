"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 5 Master States matching Akaru's exact layout & structure
const STATES = [
  {
    id: "01",
    num: "01",
    label: "STRATÉGIE & CONSEIL",
    mainTitle: "Expertises",
    subTitle: "Stratégie & Conseil",
    bgColor: "#B9C9D8", // Soft Powder Blue
    tags: [
      ["/ AUDIT & BENCHMARK", "/ POSITIONNEMENT"],
      ["/ IMAGE DE MARQUE", "/ STRATÉGIE DIGITALE"],
      ["/ STRATÉGIE ÉDITORIALE", "/ ACCOMPAGNEMENT"],
    ],
    cta: "VOIR L'EXPERTISE",
    // Image 1: Woman on white stairs
    heroImg: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "02",
    num: "02",
    label: "DIRECTION ARTISTIQUE",
    mainTitle: "Expertises",
    subTitle: "Direction Artistique",
    bgColor: "#B69CAF", // Dusty Mauve / Lavender
    tags: [
      ["/ IDENTITÉ VISUELLE", "/ LOGO"],
      ["/ CHARTE GRAPHIQUE", "/ DESIGN GRAPHIQUE"],
      ["/ MAQUETTES ET PROTOTYPES", "/ UI & UX DESIGN"],
    ],
    cta: "VOIR L'EXPERTISE",
    // Image 2: Woman face in golden sunlight
    heroImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "03",
    num: "03",
    label: "DÉVELOPPEMENT WEB",
    mainTitle: "Expertises",
    subTitle: "Développement Web",
    bgColor: "#8EA18D", // Muted Sage Olive Green
    tags: [
      ["/ FRONT-END CRÉATIF", "/ WEBGL & GSAP 3D"],
      ["/ PERFORMANCE & SEO", "/ CMS SUR-MESURE"],
      ["/ E-COMMERCE HEADLESS", "/ ARCHITECTURE CLOUD"],
    ],
    cta: "VOIR L'EXPERTISE",
    // Image 3: Orange sneakers
    heroImg: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "04",
    num: "04",
    label: "PRODUCTION 3D",
    mainTitle: "Expertises",
    subTitle: "Production 3D & Motion",
    bgColor: "#D9825B", // Warm Terracotta / Clay
    tags: [
      ["/ MODELISATION 3D", "/ TEXTURING & LIGHTING"],
      ["/ ANIMATION CGI", "/ SOUND DESIGN"],
      ["/ EXPERIENCES IMMERSIVES", "/ POST-PRODUCTION"],
    ],
    cta: "VOIR L'EXPERTISE",
    // Image 4: Mountain landscape
    heroImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "05",
    num: "05",
    label: "MOTION DESIGN",
    mainTitle: "Expertises",
    subTitle: "Motion Design & Activation",
    bgColor: "#F1EEE7", // Warm Soft Cream
    tags: [
      ["/ SHOOTINGS PHOTO", "/ DIRECTION DE PRODUCTION"],
      ["/ SOCIAL MEDIA ASSETS", "/ CAMPAGNES DE LANCEMENT"],
      ["/ DIRECTION ARTISTIQUE EVENT", "/ DIFFUSION OMNICANAL"],
    ],
    cta: "VOIR L'EXPERTISE",
    // Image 5: Portrait visual
    heroImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function CeramixExperience() {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const root = rootRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!root || !container || !track) return;

    const ctx = gsap.context(() => {
      const total = STATES.length;

      // Master Pinned Scroll Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${total * 1500}`,
          pin: container,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const index = Math.min(total - 1, Math.floor(p * total * 0.999));
            setActiveIdx(index);
          },
        },
      });

      // Advance track horizontally by exactly 80vw per state
      masterTl.to(
        track,
        {
          x: `-${(total - 1) * 80}vw`,
          ease: "none",
          duration: total,
        },
        0
      );

      // Smooth state text transitions
      STATES.forEach((_, i) => {
        if (i === 0) return;
        const stateTime = (i / total) * total;

        masterTl.to(
          `.akaru-text-state-${i - 1}`,
          {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power2.inOut",
          },
          stateTime - 0.2
        );

        masterTl.fromTo(
          `.akaru-text-state-${i}`,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          stateTime + 0.05
        );
      });
    }, root);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleNavClick = (index) => {
    if (!rootRef.current) return;
    const total = STATES.length;
    const targetScroll = rootRef.current.offsetTop + (index / total) * (total * 1500);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full select-none overflow-hidden"
      style={{ height: `${STATES.length * 100}vh` }}
    >
      {/* Typography Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-akaru-brand {
          font-family: 'Bebas Neue', 'Impact', sans-serif;
          letter-spacing: -0.01em;
          transform: scaleY(1.3);
        }
        .font-akaru-heading {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          letter-spacing: -0.04em;
          font-weight: 400;
        }
        .font-akaru-sub {
          font-family: 'Inter', -apple-system, sans-serif;
          letter-spacing: -0.02em;
          font-weight: 500;
        }
        .font-akaru-mono {
          font-family: 'Inter', -apple-system, sans-serif;
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* Sticky Fullscreen Viewport Canvas */}
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* ============================================================== */}
        {/* 1. EXACT HORIZONTAL PANEL TRACK (100% Matching Screenshot)     */}
        {/* Panel 1: Powder Blue (80vw wide)                               */}
        {/* Panel 2: Dusty Lavender (80vw wide, starts at 80vw)            */}
        {/* Panel 3: Sage Green (80vw wide, starts at 160vw)               */}
        {/* In the first 100vw screen:                                     */}
        {/* - Blue panel takes 0 to 80vw                                   */}
        {/* - Lavender panel takes 80vw to 95vw (15vw stripe)              */}
        {/* - Sage Green panel takes 95vw to 100vw (5vw stripe)            */}
        {/* ============================================================== */}
        <div
          ref={trackRef}
          className="absolute inset-0 h-full flex pointer-events-none z-0 will-change-transform"
        >
          {/* ----------------- PANEL 01: POWDER BLUE ----------------- */}
          <div
            className="relative h-full shrink-0"
            style={{ width: "80vw", backgroundColor: "#B9C9D8" }}
          >
            {/* Image 1: Woman on white stairs (touches right boundary at 80vw) */}
            <div className="absolute left-[46.5vw] top-[38vh] w-[33.5vw] h-[43vh] overflow-hidden bg-black/5">
              <img
                src={STATES[0].heroImg}
                alt="Woman on white stairs"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ----------------- PANEL 02: DUSTY LAVENDER ----------------- */}
          <div
            className="relative h-full shrink-0"
            style={{ width: "80vw", backgroundColor: "#B69CAF" }}
          >
            {/* Image 2: Woman face in golden sunlight (Starts at 0vw of panel 2, top 61.5vh) */}
            <div className="absolute left-0 top-[61.5vh] w-[33.5vw] h-[20vh] overflow-hidden bg-black/5">
              <img
                src={STATES[1].heroImg}
                alt="Woman face golden sunlight"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ----------------- PANEL 03: MUTED SAGE GREEN ----------------- */}
          <div
            className="relative h-full shrink-0"
            style={{ width: "80vw", backgroundColor: "#8EA18D" }}
          >
            {/* Image 3: Orange sneakers (Starts at 0vw of panel 3, top 74vh) */}
            <div className="absolute left-0 top-[74vh] w-[33.5vw] h-[12vh] overflow-hidden bg-black/5">
              <img
                src={STATES[2].heroImg}
                alt="Orange sneakers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ----------------- PANEL 04: WARM TERRACOTTA ----------------- */}
          <div
            className="relative h-full shrink-0"
            style={{ width: "80vw", backgroundColor: "#D9825B" }}
          >
            <div className="absolute left-0 top-[40vh] w-[33.5vw] h-[40vh] overflow-hidden bg-black/5">
              <img
                src={STATES[3].heroImg}
                alt="Mountain landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ----------------- PANEL 05: WARM SOFT CREAM ----------------- */}
          <div
            className="relative h-full shrink-0"
            style={{ width: "100vw", backgroundColor: "#F1EEE7" }}
          >
            <div className="absolute left-0 top-[35vh] w-[33.5vw] h-[45vh] overflow-hidden bg-black/5">
              <img
                src={STATES[4].heroImg}
                alt="Portrait visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. TOP HEADER (BRAND LOGO + FIXED MENU PILL)                   */}
        {/* ============================================================== */}
        <header className="relative z-40 flex items-center justify-between w-full px-8 sm:px-12 pt-7 sm:pt-9">
          {/* AKARU compressed tall bold wordmark logo */}
          <div className="flex items-center">
            <span className="font-akaru-brand text-5xl sm:text-[56px] text-[#121416] tracking-tighter leading-none inline-block origin-left">
              AKARU
            </span>
          </div>

          {/* Floating Oval Black Pill Button [ MENU • ] */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group flex items-center gap-3.5 px-6 py-2.5 rounded-full bg-[#18191B] text-white shadow-xl cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <span className="font-akaru-mono text-[11px] font-semibold tracking-widest uppercase">
              MENU
            </span>
            <span className="w-2 h-2 rounded-full bg-[#F07C52] shadow-[0_0_6px_#F07C52]" />
          </button>
        </header>

        {/* Menu Modal Drawer if clicked */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="bg-[#18191B] text-white p-8 sm:p-10 rounded-2xl max-w-lg w-full space-y-6 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="font-akaru-heading text-xl">NAVIGATION</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-akaru-mono text-white/60 hover:text-white"
                >
                  ✕ FERMER
                </button>
              </div>
              <div className="space-y-3">
                {STATES.map((st, idx) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      handleNavClick(idx);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between font-akaru-mono text-xs tracking-wider"
                  >
                    <span>{st.num} {st.label}</span>
                    <span className="text-[#F07C52]">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. LEFT FIXED/ANCHORED EDITORIAL TEXT CONTENT                  */}
        {/* ============================================================== */}
        <div className="relative z-20 w-full flex-1 flex items-center px-8 sm:px-12 my-auto pointer-events-none">
          <div className="relative z-30 w-full max-w-[480px] lg:max-w-[520px] flex flex-col justify-center pointer-events-auto">
            {/* Massive Main Heading 'Expertises' */}
            <h1 className="font-akaru-heading text-6xl sm:text-7xl lg:text-[98px] text-[#121416] leading-[0.92] mb-5 tracking-tight">
              Expertises
            </h1>

            {/* Sub-State Content Container */}
            <div className="relative min-h-[260px] w-full">
              {STATES.map((st, idx) => (
                <div
                  key={st.id}
                  className={`akaru-text-state-${idx} absolute left-0 top-0 w-full flex flex-col items-start ${
                    idx === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Category Title (e.g. 'Stratégie & Conseil') */}
                  <h2 className="font-akaru-sub text-2xl sm:text-[32px] text-[#121416] mb-6 font-semibold tracking-tight">
                    {st.subTitle}
                  </h2>

                  {/* 2-Column Slashed Tag Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8 w-full">
                    {st.tags.map((row, rIdx) => (
                      <React.Fragment key={rIdx}>
                        <span className="font-akaru-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121416] opacity-90 uppercase">
                          {row[0]}
                        </span>
                        <span className="font-akaru-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121416] opacity-90 uppercase">
                          {row[1]}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Outline Pill Button [ VOIR L'EXPERTISE • ] */}
                  <button className="group flex items-center gap-3.5 px-7 py-3 rounded-full border border-[#121416] text-[#121416] font-akaru-mono text-[11px] font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#121416] hover:text-white cursor-pointer">
                    <span>{st.cta}</span>
                    <span className="w-2 h-2 rounded-full bg-[#121416] group-hover:bg-[#F07C52] transition-colors" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. BOTTOM NUMBERED NAVIGATION                                  */}
        {/* 01 STRATÉGIE & CONSEIL   02      03      04      05            */}
        {/* ============================================================== */}
        <footer className="relative z-40 w-full px-8 sm:px-12 pb-7 sm:pb-9">
          <div className="flex items-center justify-between gap-8 sm:gap-16 overflow-x-auto scrollbar-none">
            {STATES.map((st, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={st.id}
                  onClick={() => handleNavClick(i)}
                  className={`group relative pb-2.5 transition-all duration-300 cursor-pointer shrink-0 text-left ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
                  }`}
                >
                  {/* Number + Label */}
                  <div className="flex items-baseline gap-2.5 text-[#121416]">
                    <span className="font-akaru-mono text-[11px] font-bold">
                      {st.num}
                    </span>
                    <span className="font-akaru-mono text-xs sm:text-[12.5px] font-bold tracking-wider uppercase">
                      {st.label}
                    </span>
                  </div>

                  {/* Active Solid Black Underline */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#121416] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </footer>

      </div>
    </section>
  );
}
