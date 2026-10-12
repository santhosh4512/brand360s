"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function HeroExperience() {
  const containerRef = useRef(null);
  const maskContainerRef = useRef(null);
  const bgImageRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const studioMessageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Master Scroll-Driven Timeline pinned to viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2200",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // -------------------------------------------------------------
      // PHASE 1: CAMERA ZOOM THROUGH CENTER ARCH WINDOW INTO THE WORLD
      // -------------------------------------------------------------
      
      // 1. Headline lifts upward and fades away cleanly
      tl.to(
        heroHeadlineRef.current,
        {
          y: -60,
          autoAlpha: 0,
          scale: 0.96,
          ease: "power1.inOut",
          duration: 0.35,
          force3D: true,
        },
        0
      );

      // 2. 3-Arch Mask scales up (8.5x is sufficient to push side arches offscreen) and fades out completely
      tl.to(
        maskContainerRef.current,
        {
          scale: 8.5,
          autoAlpha: 0,
          ease: "power1.inOut",
          duration: 0.50,
          force3D: true,
        },
        0
      );

      // 3. Single unified background landscape scales smoothly into full view
      tl.to(
        bgImageRef.current,
        {
          scale: 1.08,
          ease: "power1.out",
          duration: 0.50,
          force3D: true,
        },
        0
      );

      // -------------------------------------------------------------
      // PHASE 2: REVEALED CONTENT INSIDE THE FULLSCREEN WORLD
      // -------------------------------------------------------------
      
      // Message Entry with autoAlpha (manages opacity & visibility for zero GPU thrashing)
      tl.fromTo(
        studioMessageRef.current,
        {
          y: 40,
          autoAlpha: 0,
          scale: 0.97,
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          ease: "power2.out",
          duration: 0.25,
          force3D: true,
        },
        0.48
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#020817] text-white overflow-hidden select-none"
    >
      {/* ============================================================ */}
      {/* 1. SINGLE UNIFIED FULLSCREEN BACKGROUND PANORAMA */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          ref={bgImageRef}
          src="/images/presentation_hero_bg.jpg"
          alt="BRAND 360s Pitch Deck and Presentation Design Showcase"
          className="w-full h-full object-cover object-center scale-100 [transform:translateZ(0)] [backface-visibility:hidden]"
        />
        <div className="absolute inset-0 bg-[#020817]/20 pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* 2. FOREGROUND DARK BLUE FRAME WITH REFINED 3 ARCH WINDOW CUTOUTS */}
      {/* ============================================================ */}
      <div
        ref={maskContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 origin-[50%_56%] [transform:translateZ(0)] [backface-visibility:hidden]"
      >
        <svg
          viewBox="0 0 1920 1080"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="triptychArchMask">
              {/* White fills the screen (renders dark frame) */}
              <rect x="-1000" y="-1000" width="4000" height="3000" fill="white" />
              {/* Black cuts out 3 refined arch windows showing background */}
              <g id="archApertures">
                {/* Left Arch (Waterfall & Left Peak) */}
                <path
                  d="M 490 850 L 490 410 A 135 135 0 0 1 760 410 L 760 850 Z"
                  fill="black"
                />
                {/* Center Arch (Sunlit Valley & River) */}
                <path
                  d="M 825 850 L 825 410 A 135 135 0 0 1 1095 410 L 1095 850 Z"
                  fill="black"
                />
                {/* Right Arch (Right Mountain Ridge) */}
                <path
                  d="M 1160 850 L 1160 410 A 135 135 0 0 1 1430 410 L 1430 850 Z"
                  fill="black"
                />
              </g>
            </mask>
          </defs>

          {/* Dark blue atmosphere frame with transparent 3-arch aperture */}
          <rect
            x="-1000"
            y="-1000"
            width="4000"
            height="3000"
            fill="#020817"
            mask="url(#triptychArchMask)"
          />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 3. ATMOSPHERIC SUBTLE GRID GUIDES & DEEP BLUE GLOW */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 max-w-full mx-auto border-x border-white/[0.04]">
          <div className="border-r border-white/[0.03] h-full" />
          <div className="border-r border-white/[0.03] h-full" />
          <div className="border-r border-white/[0.03] h-full" />
          <div className="border-r border-white/[0.03] h-full" />
          <div className="border-r border-white/[0.03] h-full" />
          <div className="border-r border-white/[0.03] h-full hidden md:block" />
          <div className="border-r border-white/[0.03] h-full hidden md:block" />
        </div>

        {/* Ambient Dark Blue / Teal Radial Glows matching Project Palette */}
        <div className="absolute top-1/2 -left-40 -translate-y-1/2 w-[600px] h-[600px] bg-[#0481a2]/25 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-[600px] h-[600px] bg-[#243e76]/40 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#0481a2]/15 rounded-full blur-[140px]" />
      </div>

      {/* ============================================================ */}
      {/* 4. HERO HEADLINE (Centered strictly within the 3 cards boundary) */}
      {/* ============================================================ */}
      <div
        ref={heroHeadlineRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-4 pointer-events-none"
      >
        {/* Main Title constrained within 3 cards width */}
        <h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold uppercase tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] select-none max-w-[820px] mx-auto px-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          PRESENTATION DESIGN AGENCY <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#0481a2]">
            COMPANY IN CHENNAI
          </span>
        </h1>
      </div>

      {/* ============================================================ */}
      {/* 5. PHASE 2: REVEALED CONTENT INSIDE THE FULL SCREEN */}
      {/* ============================================================ */}
      <div
        ref={studioMessageRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 z-30 pointer-events-none opacity-0"
      >
        <div className="max-w-4xl mx-auto pointer-events-auto">
          {/* Heading */}
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white mb-6 sm:mb-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Pitch Deck &amp; Presentation Design
          </h2>

          {/* Description with Clickable Links */}
          <p
            className="text-base sm:text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed text-white/95 tracking-normal drop-shadow-[0_3px_20px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            BRAND 360s creates strategic pitch decks and presentations that turn data into clear, persuasive visual stories. Our presentation design agency in Chennai aligns every deck with your{" "}
            <a
              href="https://brand360s.com/services/digital-marketing-agency-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0481a2] font-semibold underline decoration-[#0481a2] underline-offset-4 hover:text-white hover:decoration-white transition-colors duration-200"
            >
              digital marketing
            </a>{" "}
            goals while extending your brand through{" "}
            <a
              href="https://brand360s.com/services/branding-services-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0481a2] font-semibold underline decoration-[#0481a2] underline-offset-4 hover:text-white hover:decoration-white transition-colors duration-200"
            >
              branding services
            </a>{" "}
            and{" "}
            <a
              href="https://brand360s.com/services/stationery-design-company-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0481a2] font-semibold underline decoration-[#0481a2] underline-offset-4 hover:text-white hover:decoration-white transition-colors duration-200"
            >
              stationery design
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}


