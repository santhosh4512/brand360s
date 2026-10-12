"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoCubeCarousel, { DEFAULT_SEO_VIDEOS } from "./VideoCubeCarousel";
import "./ScrollReveal.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LEFT_COLUMN_CARDS = [
  {
    title: "Website SEO",
    bgImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Authority Building",
    bgImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=900&auto=format&fit=crop",
  },
];

const RIGHT_COLUMN_CARDS = [
  {
    title: "Local SEO",
    bgImage:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Google Maps Ranking",
    bgImage:
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=900&auto=format&fit=crop",
  },
];

const FULL_STATEMENT_PREFIX =
  "Your business needs more than rankings. Our SEO services combine website optimization, local SEO, content strategy, link building and Google Business Profile optimization to improve visibility, build trust and attract qualified leads. Our ";

const FULL_STATEMENT_LINK_TEXT = "SEO Services in Chennai";
const FULL_STATEMENT_LINK_URL =
  "https://brand360s.com/services/seo-services-in-chennai/";

const FULL_STATEMENT_SUFFIX =
  " are tailored for businesses seeking sustainable rankings, stronger online presence, and long-term organic growth.";

export default function ReferenceScrollSection() {
  const containerRef = useRef(null);
  const pinTrackRef = useRef(null);
  const headlineRef = useRef(null);
  const colLeftRef = useRef(null);
  const colRightRef = useRef(null);

  // Single Unified Paragraph Container
  const statementContainerRef = useRef(null);

  // Centered 3D Cube Container
  const cubeContainerRef = useRef(null);
  const [scrollRotation, setScrollRotation] = useState(0);

  // Split words for the single unified statement (including interactive link)
  const splitWords = useMemo(() => {
    let globalIdx = 0;
    const prefixWords = FULL_STATEMENT_PREFIX.split(/(\s+)/).map((word) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word stmt-word" key={`pre-${globalIdx++}`}>
          {word}
        </span>
      );
    });

    const linkWords = (
      <a
        key="stmt-link"
        href={FULL_STATEMENT_LINK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0481a2] hover:text-[#38bdf8] font-bold underline underline-offset-8 decoration-[#0481a2]/60 hover:decoration-[#38bdf8] transition-colors pointer-events-auto inline"
      >
        {FULL_STATEMENT_LINK_TEXT.split(/(\s+)/).map((word) => {
          if (word.match(/^\s+$/)) return word;
          return (
            <span className="word stmt-word" key={`lnk-${globalIdx++}`}>
              {word}
            </span>
          );
        })}
      </a>
    );

    const suffixWords = FULL_STATEMENT_SUFFIX.split(/(\s+)/).map((word) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word stmt-word" key={`suf-${globalIdx++}`}>
          {word}
        </span>
      );
    });

    return [...prefixWords, linkWords, ...suffixWords];
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinTrack = pinTrackRef.current;
      const headline = headlineRef.current;
      const colLeft = colLeftRef.current;
      const colRight = colRightRef.current;
      const stmtContainer = statementContainerRef.current;
      const cubeContainer = cubeContainerRef.current;

      if (
        !pinTrack ||
        !headline ||
        !colLeft ||
        !colRight ||
        !stmtContainer ||
        !cubeContainer
      )
        return;

      const words = stmtContainer.querySelectorAll(".stmt-word");

      // Initial States
      gsap.set(colLeft, { y: "100vh", opacity: 1 });
      gsap.set(colRight, { y: "120vh", opacity: 1 });

      gsap.set(stmtContainer, {
        y: "100vh",
        opacity: 0,
        filter: "blur(5px)",
      });

      gsap.set(words, {
        opacity: 0,
        filter: "blur(5px)",
        willChange: "opacity, filter, transform",
      });

      gsap.set(cubeContainer, {
        y: "100vh",
        opacity: 0,
        scale: 0.94,
        filter: "blur(5px)",
      });

      const cubeRotationProxy = { deg: 0 };

      // Ultra-responsive, smooth, and compact ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTrack,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });

      // ─────────────────────────────────────────────────────────────
      // 1. CARDS & HEADLINE (0.0s -> 0.85s)
      // ─────────────────────────────────────────────────────────────
      tl.to(
        headline,
        {
          opacity: 0,
          filter: "blur(8px)",
          scale: 0.94,
          ease: "power1.inOut",
          duration: 0.45,
        },
        0.0
      );

      tl.to(
        colLeft,
        {
          y: "-180%",
          opacity: 0,
          ease: "power1.in",
          duration: 0.85,
        },
        0.0
      );

      tl.to(
        colRight,
        {
          y: "-190%",
          opacity: 0,
          ease: "power1.in",
          duration: 0.9,
        },
        0.05
      );

      // ─────────────────────────────────────────────────────────────
      // 2. STATEMENT ARRIVES AT CENTER (0.8s -> 2.2s)
      // ─────────────────────────────────────────────────────────────
      tl.to(
        stmtContainer,
        {
          y: "0vh",
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          duration: 0.65,
        },
        0.8
      );

      tl.to(
        words,
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.005,
          ease: "power1.out",
          duration: 0.7,
        },
        0.9
      );

      // ─────────────────────────────────────────────────────────────
      // 3. CUBE ASCENDS FROM BOTTOM & STATEMENT FADES OUT IN PLACE (2.2s -> 3.0s)
      // (Statement stays at y: 0vh and smoothly dims/hides in place)
      // ─────────────────────────────────────────────────────────────
      tl.to(
        stmtContainer,
        {
          opacity: 0,
          filter: "blur(6px)",
          scale: 0.96,
          ease: "power2.inOut",
          duration: 0.7,
        },
        2.2
      );

      tl.to(
        cubeContainer,
        {
          y: "0vh",
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          duration: 0.75,
        },
        2.2
      );

      // ─────────────────────────────────────────────────────────────
      // 4. 3D VIDEO CUBE ROTATION (3.0s -> 4.5s)
      // ─────────────────────────────────────────────────────────────
      tl.to(
        cubeRotationProxy,
        {
          deg: 360,
          ease: "none",
          duration: 1.5,
          onUpdate: () => {
            setScrollRotation(cubeRotationProxy.deg);
          },
        },
        3.0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#101c38] text-white selection:bg-[#0481a2] selection:text-white overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
    >
      {/* 100vh Full Screen Pinned Cosmos Stage with Project Signature Deep Navy */}
      <section
        ref={pinTrackRef}
        className="relative w-full h-screen min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#101c38] px-4 sm:px-8 select-none"
      >
        {/* Atmospheric SEO Network Background Image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="SEO Global Network Background"
            className="w-full h-full object-cover opacity-25 brightness-90 contrast-125 scale-105"
          />

          {/* Project Deep Navy Solid Background */}
          <div className="absolute inset-0 bg-[#101c38]" />

          {/* Dynamic Starry Sky Points */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 25px 40px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 150px 90px, #DEE2E6, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 290px 210px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 430px 70px, #0481a2, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 570px 150px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 710px 230px, #DEE2E6, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 850px 100px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(2px 2px at 990px 180px, #0481a2, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 1130px 50px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 1270px 210px, #DEE2E6, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 1410px 130px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 1550px 80px, #ffffff, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 1690px 190px, #0481a2, rgba(0,0,0,0))
              `,
              backgroundSize: "600px 320px",
            }}
          />
        </div>

        {/* Central Background Headline (Layer z-10) - Strong & Impactful */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4 w-full">
          <h2
            ref={headlineRef}
            className="font-extrabold text-[clamp(28px,4.6vw,72px)] leading-none tracking-tight text-white whitespace-nowrap will-change-transform transition-all duration-300 drop-shadow-[0_15px_45px_rgba(36,62,118,0.98)]"
          >
            SEO Services for Brands in Chennai
          </h2>
        </div>

        {/* 4 Cards in 2 Upward-Scrolling Columns (Layer z-20) */}
        <div className="relative z-20 w-full max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 px-4 sm:px-6 pointer-events-none">
          {/* Left Column (2 Cards) */}
          <div
            ref={colLeftRef}
            className="flex flex-col gap-10 md:gap-14 will-change-transform"
          >
            {LEFT_COLUMN_CARDS.map((item, idx) => (
              <div
                key={idx}
                className="pointer-events-auto relative overflow-hidden h-[260px] sm:h-[300px] md:h-[340px] border-2 border-[#DEE2E6]/40 rounded-3xl shadow-[0_30px_70px_rgba(36,62,118,0.4)] backdrop-blur-2xl transition-all duration-300 hover:border-[#0481a2] hover:shadow-[0_35px_80px_rgba(4,129,162,0.35)] group flex flex-col justify-end p-6 sm:p-8"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.bgImage}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-95 contrast-110 saturate-125 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#101c38]/70" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-[0_4px_14px_rgba(36,62,118,0.95)]">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (2 Cards, Staggered Vertical Offset) */}
          <div
            ref={colRightRef}
            className="flex flex-col gap-10 md:gap-14 will-change-transform"
          >
            {RIGHT_COLUMN_CARDS.map((item, idx) => (
              <div
                key={idx}
                className="pointer-events-auto relative overflow-hidden h-[260px] sm:h-[300px] md:h-[340px] border-2 border-[#DEE2E6]/40 rounded-3xl shadow-[0_30px_70px_rgba(36,62,118,0.4)] backdrop-blur-2xl transition-all duration-300 hover:border-[#0481a2] hover:shadow-[0_35px_80px_rgba(4,129,162,0.35)] group flex flex-col justify-end p-6 sm:p-8"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.bgImage}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-95 contrast-110 saturate-125 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#101c38]/70" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-[0_4px_14px_rgba(36,62,118,0.95)]">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 2: Single Unified Statement (Layer z-30) */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-6 sm:px-10 lg:px-16 w-full">
          <div
            ref={statementContainerRef}
            className="scroll-reveal max-w-5xl lg:max-w-6xl mx-auto will-change-transform"
          >
            <p className="scroll-reveal-text text-white/95 font-medium text-[clamp(22px,2.6vw,36px)] leading-[1.6] tracking-normal text-center drop-shadow-[0_12px_32px_rgba(36,62,118,0.95)]">
              {splitWords}
            </p>
          </div>
        </div>

        {/* Phase 3: Centered 3D Video Cube (Layer z-30) */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-4 sm:px-8 w-full">
          <div
            ref={cubeContainerRef}
            className="pointer-events-auto flex items-center justify-center w-full max-w-4xl h-[400px] sm:h-[460px] md:h-[500px]"
          >
            <VideoCubeCarousel
              videos={DEFAULT_SEO_VIDEOS}
              scrollRotation={scrollRotation}
              cubeWidth={560}
              cubeHeight={360}
              direction="right"
              interaction="scroll"
              showContent={true}
              showProgress={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
