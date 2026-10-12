"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function DualCardShowcase() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card1FeaturesRef = useRef(null);
  const card2FeaturesRef = useRef(null);
  const card1ActionsRef = useRef(null);
  const card2ActionsRef = useRef(null);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [tilt1, setTilt1] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [tilt2, setTilt2] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pinned GSAP Scroll-Driven Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2600",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // -------------------------------------------------------------
      // INITIAL SCROLL STATE: Cards stacked together in center deck
      // -------------------------------------------------------------
      gsap.set(headerRef.current, {
        y: -30,
        opacity: 0.8,
      });

      gsap.set(card1Ref.current, {
        xPercent: 0,
        yPercent: 0,
        rotateZ: 0,
        rotateY: 0,
        scale: 1,
        zIndex: 20,
        transformPerspective: 1800,
        transformOrigin: "center center",
      });

      gsap.set(card2Ref.current, {
        xPercent: 0,
        yPercent: 3,
        rotateZ: 3,
        rotateY: 0,
        scale: 0.94,
        zIndex: 10,
        opacity: 0.6,
        transformPerspective: 1800,
        transformOrigin: "center center",
      });

      gsap.set([card1FeaturesRef.current, card2FeaturesRef.current], {
        opacity: 0.5,
        y: 15,
      });

      gsap.set([card1ActionsRef.current, card2ActionsRef.current], {
        opacity: 0.5,
        y: 15,
      });

      // -------------------------------------------------------------
      // STEP 1 (Scroll 0% -> 50%): Cards peel apart to Left and Right
      // -------------------------------------------------------------
      tl.to(
        headerRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        card1Ref.current,
        {
          xPercent: -54,
          rotateY: -4,
          ease: "power2.inOut",
          duration: 0.5,
          force3D: true,
        },
        0
      );

      tl.to(
        card2Ref.current,
        {
          xPercent: 54,
          rotateZ: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          rotateY: 4,
          ease: "power2.inOut",
          duration: 0.5,
          force3D: true,
        },
        0
      );

      // -------------------------------------------------------------
      // STEP 2 (Scroll 50% -> 100%): Straighten & Features Spring Pop
      // -------------------------------------------------------------
      tl.to(
        [card1Ref.current, card2Ref.current],
        {
          rotateY: 0,
          ease: "power2.out",
          duration: 0.4,
        },
        0.5
      );

      tl.to(
        [card1FeaturesRef.current, card2FeaturesRef.current],
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "back.out(1.8)",
          duration: 0.35,
        },
        0.55
      );

      tl.to(
        [card1ActionsRef.current, card2ActionsRef.current],
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power2.out",
          duration: 0.35,
        },
        0.60
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Magnetic Cursor Tilt
  const handleMouseMove = (e, cardIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rx = ((y - cy) / cy) * -6;
    const ry = ((x - cx) / cx) * 6;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    if (cardIndex === 1) {
      setTilt1({ rx, ry, gx, gy });
    } else {
      setTilt2({ rx, ry, gx, gy });
    }
  };

  const handleMouseLeave = (cardIndex) => {
    if (cardIndex === 1) {
      setTilt1({ rx: 0, ry: 0, gx: 50, gy: 50 });
    } else {
      setTilt2({ rx: 0, ry: 0, gx: 50, gy: 50 });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#ffffff] text-[#243e76] overflow-hidden flex flex-col items-center justify-between py-8 sm:py-12 px-4 sm:px-8 select-none"
    >
      {/* Ambient Lighting in Project Colors */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#0481a2]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-[650px] h-[650px] bg-[#243e76]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div
        ref={headerRef}
        className="w-full max-w-4xl text-center flex flex-col items-center justify-center z-20 pt-2"
      >
        <span
          className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#0481a2] block mb-1.5"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          VALUE ADDITIONS
        </span>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#243e76] tracking-tight leading-tight mb-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Perfect Add-On for Your Business
        </h2>
        <p
          className="text-xs sm:text-sm text-[#243e76]/80 max-w-2xl font-normal leading-relaxed"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Strategic enhancements designed to strengthen brand authority and support long-term scalability.
        </p>
      </div>

      {/* 3D CARDS STAGE CONTAINER */}
      <div
        className="relative w-full max-w-5xl h-[530px] flex items-center justify-center px-4 sm:px-6 my-auto"
        style={{ perspective: "1800px" }}
      >
        {/* ============================================================ */}
        {/* CARD 01: BRANDING SERVICES (Deep Obsidian Luxury) */}
        {/* ============================================================ */}
        <div
          ref={card1Ref}
          onMouseMove={(e) => handleMouseMove(e, 1)}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => {
            setActiveHover(null);
            handleMouseLeave(1);
          }}
          style={{
            transform: `perspective(1600px) rotateX(${tilt1.rx}deg) rotateY(${tilt1.ry}deg)`,
            transformStyle: "preserve-3d",
          }}
          className={`absolute w-[92%] max-w-[460px] h-[520px] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#020817] via-[#0b172a] to-[#0481a2]/35 text-white p-7 sm:p-8 border border-white/15 cursor-pointer flex flex-col justify-between transition-all duration-300 will-change-transform shadow-[0_25px_60px_rgba(2,8,23,0.38)] ${
            hoveredCard === 1
              ? "scale-[1.03] z-30 shadow-[0_45px_95px_rgba(4,129,162,0.45)] border-[#0481a2]"
              : hoveredCard === 2
              ? "opacity-60 scale-[0.97]"
              : "z-20"
          }`}
        >
          {/* Liquid Specular Glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-35 transition-opacity duration-300 rounded-[32px] z-10"
            style={{
              background: `radial-gradient(circle at ${tilt1.gx}% ${tilt1.gy}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 65%)`,
            }}
          />

          <div>
            {/* Header: Icon + Title */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0481a2]/20 border border-[#0481a2]/40 flex items-center justify-center text-[#0481a2] shadow-[0_0_15px_rgba(4,129,162,0.3)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h3
                  className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Branding Services
                </h3>
              </div>
            </div>

            {/* Subtitle */}
            <p
              className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Deliver consistent brand storytelling with Branding Services.
            </p>

            {/* Features List */}
            <div ref={card1FeaturesRef} className="space-y-2.5 mb-6">
              {[
                "Brand storytelling slides",
                "Custom slide templates",
                "Data visualization",
                "Professional layouts",
                "Investor-ready design",
                "Multi-format exports",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-[#0481a2]/30 border border-[#0481a2] flex items-center justify-center text-[#0481a2] shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTAs */}
          <div ref={card1ActionsRef} className="flex items-center gap-3 pt-4 border-t border-white/10">
            <a
              href="https://brand360s.com/services/branding-services-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2.5 rounded-full bg-[#0481a2] hover:bg-white hover:text-[#243e76] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(4,129,162,0.4)] flex items-center justify-center gap-1.5 group"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span>Enquire Now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="https://brand360s.com/services/branding-services-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/20 flex items-center justify-center gap-1.5 group"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span>Know More</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CARD 02: WEBSITE DESIGN SERVICES (Titanium Luxury Light with RECOMMENDED Badge) */}
        {/* ============================================================ */}
        <div
          ref={card2Ref}
          onMouseMove={(e) => handleMouseMove(e, 2)}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => {
            setActiveHover(null);
            handleMouseLeave(2);
          }}
          style={{
            transform: `perspective(1600px) rotateX(${tilt2.rx}deg) rotateY(${tilt2.ry}deg)`,
            transformStyle: "preserve-3d",
          }}
          className={`absolute w-[92%] max-w-[460px] h-[520px] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#DEE2E6] text-[#243e76] p-7 sm:p-8 border border-[#243e76]/20 cursor-pointer flex flex-col justify-between transition-all duration-300 will-change-transform shadow-[0_25px_60px_rgba(36,62,118,0.18)] ${
            hoveredCard === 2
              ? "scale-[1.03] z-30 shadow-[0_45px_95px_rgba(36,62,118,0.35)] border-[#243e76]/60"
              : hoveredCard === 1
              ? "opacity-60 scale-[0.97]"
              : "z-10"
          }`}
        >
          {/* Liquid Specular Glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-35 transition-opacity duration-300 rounded-[32px] z-10"
            style={{
              background: `radial-gradient(circle at ${tilt2.gx}% ${tilt2.gy}%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 65%)`,
            }}
          />

          <div>
            {/* Top Bar with RECOMMENDED Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#243e76]/10 border border-[#243e76]/25 flex items-center justify-center text-[#243e76] shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* RECOMMENDED BADGE */}
              <div
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#0481a2] text-white text-[11px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(4,129,162,0.4)]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span>★</span>
                <span>RECOMMENDED</span>
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#243e76] mb-1.5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Website Design Services
            </h3>

            {/* Subtitle */}
            <p
              className="text-xs sm:text-sm text-[#243e76]/80 leading-relaxed mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Support investor engagement through professional Website Design.
            </p>

            {/* Features List */}
            <div ref={card2FeaturesRef} className="space-y-2.5 mb-6">
              {[
                "Investor-focused websites",
                "Pitch content integration",
                "Responsive design",
                "Clear navigation",
                "Speed optimization",
                "Easy content updates",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#243e76]">
                  <span className="w-4 h-4 rounded-full bg-[#243e76]/10 border border-[#243e76]/40 flex items-center justify-center text-[#0481a2] shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTAs */}
          <div ref={card2ActionsRef} className="flex items-center gap-3 pt-4 border-t border-[#243e76]/10">
            <a
              href="https://brand360s.com/services/web-design-development-company-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2.5 rounded-full bg-[#243e76] hover:bg-[#0481a2] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(36,62,118,0.25)] flex items-center justify-center gap-1.5 group"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span>Enquire Now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="https://brand360s.com/services/web-design-development-company-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2.5 rounded-full bg-[#243e76]/10 hover:bg-[#243e76]/20 text-[#243e76] font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-[#243e76]/20 flex items-center justify-center gap-1.5 group"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span>Know More</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
