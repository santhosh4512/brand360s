"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, Rocket, Gem, Sparkles } from "lucide-react";
import BlurText from "./BlurText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SeoAddonsSection() {
  const rootRef = useRef(null);
  const curvedSectionRef = useRef(null);
  const curvedContainerRef = useRef(null);
  const textPathRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentWrapRef = useRef(null);

  const stackContainerRef = useRef(null);
  const card1Ref = useRef(null);
  const card1InnerRef = useRef(null);
  const card2Ref = useRef(null);
  const card2InnerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. PINNED CURVED KINETIC TEXT
      if (
        textPathRef.current &&
        curvedContainerRef.current &&
        curvedSectionRef.current &&
        subtitleRef.current &&
        contentWrapRef.current
      ) {
        const curvedTl = gsap.timeline({
          scrollTrigger: {
            trigger: curvedSectionRef.current,
            start: "top top",
            end: "+=1200",
            pin: curvedContainerRef.current,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        curvedTl.fromTo(
          textPathRef.current,
          { attr: { startOffset: "85%" } },
          {
            attr: { startOffset: "-50%" },
            ease: "power1.out",
            duration: 0.75,
          },
          0
        );

        curvedTl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.28,
            ease: "power2.out",
          },
          0.2
        );

        curvedTl.to(
          contentWrapRef.current,
          {
            y: -240,
            opacity: 0,
            filter: "blur(12px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.7
        );
      }

      // 2. 3D PERSPECTIVE CARD STACKING
      if (
        stackContainerRef.current &&
        card1Ref.current &&
        card1InnerRef.current &&
        card2Ref.current &&
        card2InnerRef.current
      ) {
        const stackTl = gsap.timeline({
          scrollTrigger: {
            trigger: stackContainerRef.current,
            start: "top top",
            end: "+=2200",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        gsap.set(card1InnerRef.current, {
          transformOrigin: "center center",
          scale: 1,
          opacity: 1,
          yPercent: 0,
        });

        gsap.set(card2Ref.current, {
          yPercent: 100,
          scale: 1,
          opacity: 1,
        });

        gsap.set(".c1-anim-item", {
          opacity: 0,
          y: 35,
          scale: 0.97,
        });
        gsap.set(".c2-anim-item", {
          opacity: 0,
          y: 35,
          scale: 0.97,
        });

        stackTl.to(
          ".c1-anim-item",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            duration: 0.35,
            ease: "power3.out",
          },
          0.05
        );

        stackTl.to({}, { duration: 0.4 });

        stackTl.to(
          card1InnerRef.current,
          {
            scale: 0.94,
            yPercent: -15,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.75,
          },
          "cardTransition"
        );

        stackTl.to(
          card2Ref.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 0.75,
          },
          "cardTransition"
        );

        stackTl.to(
          ".c2-anim-item",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            duration: 0.35,
            ease: "power3.out",
          },
          ">-=0.25"
        );

        stackTl.to({}, { duration: 0.5 });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full bg-[#DEE2E6] text-[#243e76] select-none"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* 1. PINNED CURVED KINETIC TEXT SECTION */}
      <section
        ref={curvedSectionRef}
        id="curved-text-fullscreen-section"
        className="relative w-full bg-[#DEE2E6] text-[#243e76] overflow-hidden"
        style={{ fontFamily: "'Varela Round', sans-serif" }}
      >
        <div
          ref={curvedContainerRef}
          className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-[#DEE2E6]"
        >
          <div 
            ref={contentWrapRef}
            className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden will-change-[transform,opacity,filter]"
          >
            {/* TOP FLOATING REVEAL BADGE WITH BLURTEXT */}
            <div className="absolute top-[8vh] sm:top-[10vh] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#243e76]/15 shadow-sm text-[#0481a2] text-xs sm:text-sm font-bold tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-[#0481a2]" />
                <BlurText
                  text="STRATEGIC ACCELERATORS & ADD-ONS"
                  delay={80}
                  animateBy="words"
                  direction="top"
                  className="font-bold text-[#243e76]"
                />
              </div>
            </div>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 1920 600"
                className="w-full h-full object-cover overflow-visible"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <path
                    id="nbnzia-fullscreen-path"
                    d="M -1600 80 Q 960 500 3600 80"
                    fill="none"
                  />
                </defs>

                <text
                  className="fill-[#243e76] text-[130px] sm:text-[180px] lg:text-[230px] xl:text-[270px] font-black uppercase tracking-tight"
                  style={{ textAnchor: "start", fontFamily: "'Varela Round', sans-serif" }}
                >
                  <textPath
                    ref={textPathRef}
                    href="#nbnzia-fullscreen-path"
                    startOffset="85%"
                    className="will-change-transform"
                  >
                    PERFECT ADD-ON FOR YOUR SEO STRATEGY
                  </textPath>
                </text>
              </svg>

              <div
                ref={subtitleRef}
                className="absolute bottom-[12vh] sm:bottom-[14vh] lg:bottom-[16vh] left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 text-center z-20 pointer-events-auto will-change-[transform,opacity,filter]"
                style={{ opacity: 0 }}
              >
                <p className="text-lg sm:text-xl lg:text-2xl text-[#243e76] font-medium leading-relaxed">
                  Strategic enhancements designed to strengthen{" "}
                  <a
                    href="https://brand360s.com/services/website-development-services-in-chennai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#0481a2] underline decoration-[#0481a2]/40 underline-offset-4 hover:decoration-[#0481a2] hover:text-[#243e76] transition-colors inline-flex items-center gap-0.5 group"
                  >
                    <span>website performance</span>
                    <ArrowRight className="w-5 h-5 inline transform group-hover:translate-x-0.5 transition-transform" />
                  </a>{" "}
                  and brand authority for long-term search visibility.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D CARD STACKING CONTAINER */}
      <div
        ref={stackContainerRef}
        className="relative w-full h-screen overflow-hidden bg-[#DEE2E6]"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          fontFamily: "'Varela Round', sans-serif",
        }}
      >
        {/* CARD 01 */}
        <div
          ref={card1Ref}
          className="absolute inset-0 z-10 w-full h-full flex items-center justify-center p-0"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            ref={card1InnerRef}
            className="w-full h-full bg-[#243e76] text-white flex flex-col justify-between pt-16 sm:pt-20 pb-14 sm:pb-16 px-8 sm:px-16 lg:px-24 will-change-transform shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              fontFamily: "'Varela Round', sans-serif",
            }}
          >
            <div className="c1-anim-item w-full flex items-center justify-between gap-4 border-b border-white/10 pb-6 will-change-[transform,opacity]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0481a2]/30 flex items-center justify-center text-[#DEE2E6]">
                  <Rocket className="w-6 h-6 text-[#38bdf8]" />
                </div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#0481a2] text-white text-xs font-bold tracking-wider uppercase shadow-md">
                  MOST POPULAR
                </div>
              </div>

              <span className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight opacity-90 text-[#DEE2E6]">
                (01)
              </span>
            </div>

            <div className="flex flex-col items-start text-left my-auto py-4 max-w-5xl">
              <h2 className="c1-anim-item text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 will-change-[transform,opacity]">
                Website Design & Redesign Services
              </h2>

              <p className="c1-anim-item text-base sm:text-lg lg:text-xl font-medium leading-relaxed mb-8 text-[#DEE2E6] max-w-3xl will-change-[transform,opacity]">
                Optimize your website structure and UX for better SEO performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-full mb-10">
                {[
                  "Clear, easy navigation",
                  "Easy to update and scale",
                  "Boosts conversions",
                  "Modern, professional design",
                  "Fast, smooth user experience",
                  "Mobile-friendly on all devices",
                ].map((item, dIdx) => (
                  <div key={dIdx} className="c1-anim-item flex items-center gap-3 will-change-[transform,opacity]">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-[#DEE2E6]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="c1-anim-item flex flex-wrap items-center gap-4 will-change-[transform,opacity]">
                <a
                  href="https://brand360s.com/services/website-development-services-in-chennai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase bg-[#0481a2] text-white hover:bg-white hover:text-[#243e76] transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase border border-[#DEE2E6]/40 text-white hover:bg-white hover:text-[#243e76] transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer">
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-1" />
          </div>
        </div>

        {/* CARD 02 */}
        <div
          ref={card2Ref}
          className="absolute inset-0 z-20 w-full h-full flex items-center justify-center p-0 shadow-[0_-12px_35px_rgba(36,62,118,0.18)] border-t border-white/20"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            ref={card2InnerRef}
            className="w-full h-full bg-[#0481a2] text-white flex flex-col justify-between pt-16 sm:pt-20 pb-14 sm:pb-16 px-8 sm:px-16 lg:px-24 will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              fontFamily: "'Varela Round', sans-serif",
            }}
          >
            <div className="c2-anim-item w-full flex items-center justify-between gap-4 border-b border-white/15 pb-6 will-change-[transform,opacity]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white">
                  <Gem className="w-6 h-6 text-white" />
                </div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#243e76] text-white text-xs font-bold tracking-wider uppercase shadow-md">
                  RECOMMENDED
                </div>
              </div>

              <span className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white/90">
                (02)
              </span>
            </div>

            <div className="flex flex-col items-start text-left my-auto py-4 max-w-5xl">
              <h2 className="c2-anim-item text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 will-change-[transform,opacity]">
                Branding & Identity Design
              </h2>

              <p className="c2-anim-item text-base sm:text-lg lg:text-xl font-medium leading-relaxed mb-8 text-[#DEE2E6] max-w-3xl will-change-[transform,opacity]">
                Build brand credibility that boosts authority and engagement signals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-full mb-10">
                {[
                  "Memorable brand identity",
                  "Storytelling that resonates",
                  "Consistent visuals across channels",
                  "Engaging designs for your audience",
                  "Professional and credible image",
                  "Improves recognition and loyalty",
                ].map((item, dIdx) => (
                  <div key={dIdx} className="c2-anim-item flex items-center gap-3 will-change-[transform,opacity]">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="c2-anim-item flex flex-wrap items-center gap-4 will-change-[transform,opacity]">
                <a
                  href="https://brand360s.com/services/website-development-services-in-chennai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase bg-[#243e76] text-white hover:bg-white hover:text-[#243e76] transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase bg-white text-[#243e76] hover:bg-[#243e76] hover:text-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer">
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-1" />
          </div>
        </div>

      </div>
    </div>
  );
}
