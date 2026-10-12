"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LOCAL_SEO_POINTS = [
  "Get discovered faster.",
  "Get more calls.",
  "Build hyper-local authority that drives revenue",
  "Increase footfall.",
];

export default function ScrollExpandMediaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const cardInnerContentRef = useRef<HTMLDivElement>(null);
  const expandingDotRef = useRef<HTMLDivElement>(null);
  const finaleStageRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const mediaOverlayRef = useRef<HTMLDivElement>(null);

  const displayLine1 = "Be the first business";
  const displayLine2 = "customers see";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinTrack = pinTrackRef.current;
      const mediaCard = mediaCardRef.current;
      const cardInner = cardInnerContentRef.current;
      const expandingDot = expandingDotRef.current;
      const finaleStage = finaleStageRef.current;
      const titleLeft = titleLeftRef.current;
      const titleRight = titleRightRef.current;
      const bgImg = bgImageRef.current;
      const mediaOverlay = mediaOverlayRef.current;

      if (!pinTrack || !mediaCard) return;

      const isMobile = window.innerWidth < 768;
      const initialWidth = isMobile ? 280 : 340;
      const initialHeight = isMobile ? 360 : 440;
      const targetWidth = isMobile ? "94vw" : "88vw";
      const targetHeight = isMobile ? "78vh" : "80vh";

      // Set initial states
      gsap.set(mediaCard, {
        width: initialWidth,
        height: initialHeight,
        borderRadius: isMobile ? 24 : 32,
      });

      gsap.set([titleLeft, titleRight], {
        x: 0,
        opacity: 1,
      });

      // Initially hide inner card content completely
      if (cardInner) {
        gsap.set(cardInner, {
          opacity: 0,
          y: 35,
          filter: "blur(10px)",
          willChange: "opacity, transform, filter",
        });

        const pills = cardInner.querySelectorAll(".card-point-pill");
        if (pills.length) {
          gsap.set(pills, {
            opacity: 0,
            y: 20,
            scale: 0.94,
            willChange: "opacity, transform",
          });
        }
      }

      // Initially hide and shrink expanding dot at center
      if (expandingDot) {
        gsap.set(expandingDot, {
          scale: 0,
          opacity: 0,
          willChange: "transform, opacity",
        });
      }

      // Initially hide finale content stage
      if (finaleStage) {
        gsap.set(finaleStage, {
          opacity: 0,
          pointerEvents: "none",
          willChange: "opacity, transform",
        });

        const finaleItems = finaleStage.querySelectorAll(".finale-anim-item");
        if (finaleItems.length) {
          gsap.set(finaleItems, {
            opacity: 0,
            y: 35,
            filter: "blur(10px)",
            willChange: "opacity, transform, filter",
          });
        }
      }

      gsap.set(mediaOverlay, {
        opacity: 0.55,
      });

      gsap.set(bgImg, {
        opacity: 1,
        scale: 1,
      });

      // Master ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTrack,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      // 1. Expand media card from center
      tl.to(
        mediaCard,
        {
          width: targetWidth,
          height: targetHeight,
          borderRadius: isMobile ? 20 : 28,
          duration: 1.6,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Split typography completely off-screen left and right
      tl.to(
        titleLeft,
        {
          x: isMobile ? "-110vw" : "-100vw",
          opacity: 0,
          duration: 1.4,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        titleRight,
        {
          x: isMobile ? "110vw" : "100vw",
          opacity: 0,
          duration: 1.4,
          ease: "power2.inOut",
        },
        0
      );

      // 3. Soften background and lighten overlay on card
      tl.to(
        bgImg,
        {
          opacity: 0.15,
          scale: 1.06,
          duration: 1.6,
          ease: "power1.out",
        },
        0
      );

      tl.to(
        mediaOverlay,
        {
          opacity: 0.15,
          duration: 1.6,
          ease: "power1.out",
        },
        0
      );

      // 4. REVEAL inner 4-card content ONLY AFTER the title content has exited (starts at 1.3s)
      if (cardInner) {
        tl.to(
          cardInner,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power2.out",
          },
          1.3
        );

        const pills = cardInner.querySelectorAll(".card-point-pill");
        if (pills.length) {
          tl.to(
            pills,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.7,
              ease: "back.out(1.4)",
            },
            1.5
          );
        }
      }

      // 5. Center dot emerges from between the 4 cards and ZOOMS to OCCUPY FULL SCREEN
      if (expandingDot) {
        tl.to(
          expandingDot,
          {
            opacity: 1,
            scale: 0.8,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          2.6
        );

        tl.to(
          expandingDot,
          {
            scale: 52,
            duration: 1.8,
            ease: "power2.inOut",
          },
          3.0
        );

        // Fade out previous card content as zoom covers screen
        if (cardInner) {
          tl.to(
            cardInner,
            {
              opacity: 0,
              scale: 0.94,
              filter: "blur(6px)",
              duration: 0.8,
              ease: "power1.in",
            },
            3.1
          );
        }
      }

      // 6. AFTER circle zooms and covers screen, REVEAL THE FINALE CONTENT with rich kinetic animation
      if (finaleStage) {
        tl.to(
          finaleStage,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.4,
          },
          3.8
        );

        const finaleItems = finaleStage.querySelectorAll(".finale-anim-item");
        if (finaleItems.length) {
          tl.to(
            finaleItems,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              stagger: 0.18,
              duration: 1.0,
              ease: "power3.out",
            },
            4.0
          );
        }
      }

      // Hold finale state comfortably to read, then transition cleanly into next section
      tl.to({}, { duration: 1.4 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-[#ffffff] overflow-hidden">
      {/* Pinned 100vh Stage with Clean White Background */}
      <div
        ref={pinTrackRef}
        className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden select-none bg-[#ffffff]"
      >
        {/* Atmospheric Subtle Ambient Light Background */}
        <div
          ref={bgImageRef}
          className="absolute inset-0 pointer-events-none will-change-transform z-0 overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, #f0f7ff 0%, #ffffff 70%),
                radial-gradient(1.5px 1.5px at 40px 40px, #DEE2E6, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 160px 120px, #0481a2, rgba(0,0,0,0)),
                radial-gradient(1.5px 1.5px at 280px 200px, #DEE2E6, rgba(0,0,0,0))
              `,
              backgroundSize: "100% 100%, 300px 300px, 300px 300px, 300px 300px",
            }}
          />
        </div>

        {/* Central Visual Container */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4 pointer-events-none">
          {/* Centered Expanding Card (Project Signature Light/Aegean Blue #0481a2) */}
          <div
            ref={mediaCardRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0_30px_90px_rgba(4,129,162,0.35)] border-2 border-white/40 will-change-transform pointer-events-auto rounded-3xl bg-gradient-to-br from-[#0481a2] via-[#058fa8] to-[#026c88] flex flex-col justify-center"
          >
            {/* Subtle Cyan Glow Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-[#38bdf8]/20 pointer-events-none" />

            {/* Inner Content Layer (Revealed strictly AFTER the title exits) */}
            <div
              ref={cardInnerContentRef}
              className="relative z-10 w-full flex flex-col justify-center items-center text-center p-6 sm:p-10 md:p-14"
              style={{ fontFamily: "'Varela Round', sans-serif" }}
            >
              {/* Main Headline in Project Dark Navy */}
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#101c38] tracking-tight leading-[1.15] mb-8 sm:mb-10 drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)] max-w-4xl">
                Local SEO, Google Maps &amp; GMB Optimization
              </h2>

              {/* 4 Feature Points Grid with Central Expanding Dot Origin */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-4xl text-left">
                {LOCAL_SEO_POINTS.map((point, idx) => (
                  <div
                    key={idx}
                    className="card-point-pill flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/95 border border-white/60 shadow-[0_8px_24px_rgba(4,129,162,0.2)] transition-all duration-300 hover:bg-white hover:shadow-lg group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#101c38] border border-[#243e76] flex items-center justify-center text-white shrink-0 shadow-[0_0_12px_rgba(16,28,56,0.3)]">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-[#101c38] tracking-tight leading-snug">
                      {point}
                    </span>
                  </div>
                ))}

                {/* Center Expanding Portal Dot - Originating from the exact center of the 4 cards (Project Dark Blue) */}
                <div
                  ref={expandingDotRef}
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#243e76] border-2 border-[#3b5998]/50 shadow-[0_0_100px_rgba(36,62,118,0.9)] z-40 will-change-transform"
                />
              </div>
            </div>
          </div>

          {/* Splitting Kinetic Typography in Project Dark Navy #243e76 */}
          <div
            className="pointer-events-none relative z-20 flex w-full flex-col items-center justify-center gap-2 text-center px-4"
            style={{ fontFamily: "'Varela Round', sans-serif" }}
          >
            <h1
              ref={titleLeftRef}
              className="text-[clamp(2.2rem,5.2vw,5.5rem)] font-bold leading-tight tracking-tight text-[#243e76] drop-shadow-[0_4px_20px_rgba(36,62,118,0.2)] will-change-transform whitespace-nowrap"
            >
              {displayLine1}
            </h1>

            <h1
              ref={titleRightRef}
              className="text-[clamp(2.2rem,5.2vw,5.5rem)] font-bold leading-tight tracking-tight text-[#243e76] drop-shadow-[0_4px_20px_rgba(36,62,118,0.2)] will-change-transform whitespace-nowrap"
            >
              {displayLine2}
            </h1>
          </div>

          {/* Phase 4 Finale Stage - Revealed AFTER the circle zooms to full screen */}
          <div
            ref={finaleStageRef}
            className="absolute inset-0 z-50 flex items-center justify-center px-4 sm:px-8 md:px-12 w-full h-full pointer-events-none"
            style={{ fontFamily: "'Varela Round', sans-serif" }}
          >
            <div className="max-w-4xl lg:max-w-5xl w-full mx-auto flex flex-col items-center text-center gap-6 sm:gap-7">
              {/* Category / Subtitle */}
              <p className="finale-anim-item text-[#38bdf8] font-bold text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase">
                DOMINATE NEAR-ME SEARCHES — WITH OR WITHOUT A WEBSITE
              </p>

              {/* Lead Highlight Statement */}
              <h3 className="finale-anim-item text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.25] max-w-4xl">
                Most customers never scroll past the top results on Google Maps — visibility here directly influences calls, enquiries and footfalls.
              </h3>

              {/* Strategy Description Paragraph */}
              <p className="finale-anim-item text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
                Through geo-targeted keywords, optimized listings, citation building, reviews and media posts, we strengthen local SEO performance across Maps and near-me searches.
              </p>

              {/* Ideal For Note */}
              <p className="finale-anim-item text-sm sm:text-base md:text-lg text-[#7dd3fc] font-medium leading-relaxed max-w-3xl">
                Ideal for salons, clinics, restaurants, boutiques, studios and Chennai service providers looking to improve local search visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
