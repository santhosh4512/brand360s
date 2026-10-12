"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DM_Serif_Display, Inter } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const PHASES = [
  {
    id: "01",
    title: "Website SEO &\nTechnical Optimization",
    desc: (
      <>
        Titles, meta descriptions, headings, speed, Core Web Vitals — often built in via our{" "}
        <a
          href="https://brand360s.com/services/website-development-services-in-chennai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#133863] underline font-medium hover:text-[#0055ff] transition-colors"
        >
          website development services in Chennai
        </a>
        .
      </>
    )
  },
  {
    id: "02",
    title: "Local SEO & Google\nMaps Optimization",
    desc: "Google Business Profile and location-based targeting — by area, not just by city."
  },
  {
    id: "03",
    title: "Authority Building &\nBacklinks",
    desc: "High-authority backlinks and contextual links to strengthen domain authority."
  },
  {
    id: "04",
    title: "Content Marketing\nIntegration",
    desc: (
      <>
        Targeted blogs and landing pages, supported by our{" "}
        <a
          href="https://brand360s.com/services/graphic-design-services-in-chennai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#133863] underline font-medium hover:text-[#0055ff] transition-colors"
        >
          graphic design services in Chennai
        </a>{" "}
        team.
      </>
    )
  }
];

const IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
];

export default function OurDesignProcess() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const activeLineRef = useRef(null);
  const nodeRefs = useRef([]);
  const textRefs = useRef([]);

  const [activeStep, setActiveStep] = useState(0);

  // 3D Cylinder state for the right side
  const [rotation, setRotation] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);

  const totalCards = IMAGES.length;
  const anglePerCard = 360 / totalCards;
  const cylinderRadius = 220; // 3D cylinder radius in px

  // Pure GSAP Direct Timeline Animation with 100% exact path-sampled coordinates
  useEffect(() => {
    // Initialize Lenis smooth inertia scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const el = containerRef.current;
    const path = pathRef.current;
    let ctx;

    if (el && path) {
      ctx = gsap.context(() => {
        // Measure exact path length and sample 7 slots directly from the SVG path!
        // Path runs from bottom (D=0) to top (D=totalLen)
        const totalLen = path.getTotalLength();
        const centerLen = totalLen * 0.50;
        const stepDist = 145; // Exact distance between slots along the curve

        // Sample 7 exact slot coordinates along the SVG curve:
        // Slot 0 (Bottom Exit): i = -3 (dist = centerLen - 3*stepDist)
        // Slot 1 (Bottom Shelf): i = -2 (dist = centerLen - 2*stepDist)
        // Slot 2 (Lower Shelf): i = -1 (dist = centerLen - 1*stepDist)
        // Slot 3 (ACTIVE CENTER SPOT): i = 0 (dist = centerLen)
        // Slot 4 (Upper Shelf): i = +1 (dist = centerLen + 1*stepDist)
        // Slot 5 (Top Shelf): i = +2 (dist = centerLen + 2*stepDist)
        // Slot 6 (Top Entry): i = +3 (dist = centerLen + 3*stepDist)
        const sampledSlots = [];
        for (let i = -3; i <= 3; i++) {
          const dist = centerLen + i * stepDist;
          const clampedDist = Math.max(0, Math.min(totalLen, dist));
          const pt = path.getPointAtLength(clampedDist);
          sampledSlots.push({
            x: pt.x,
            y: pt.y,
            opacity: Math.abs(i) >= 3 ? 0 : Math.abs(i) === 2 ? 0.45 : Math.abs(i) === 1 ? 0.85 : 1,
            scale: i === 0 ? 1.15 : 0.95
          });
        }

        // Initial node styles (4 nodes)
        // Node 1 is at Slot 3 (Center Active - Deep Brand Navy with White text)
        // Node 2 is at Slot 4 (Top Shelf)
        // Node 3 is at Slot 5 (Top Shelf)
        // Node 4 is at Slot 6 (Top Entry)
        const initialSlotIndexes = [3, 4, 5, 6];

        nodeRefs.current.forEach((node, idx) => {
          if (!node) return;
          const slot = sampledSlots[initialSlotIndexes[idx]];
          gsap.set(node, {
            xPercent: -50,
            yPercent: -50,
            x: slot.x,
            y: slot.y,
            opacity: slot.opacity,
            scale: slot.scale,
            backgroundColor: idx === 0 ? "#133863" : "#ffffff",
            color: idx === 0 ? "#ffffff" : "#133863",
            borderColor: idx === 0 ? "#133863" : "#cbdced",
            boxShadow: idx === 0 ? "0 8px 24px rgba(19, 56, 99, 0.35)" : "0 2px 8px rgba(19, 56, 99, 0.08)"
          });
        });

        // Initial setup for text panels
        textRefs.current.forEach((textPanel, idx) => {
          if (!textPanel) return;
          if (idx === 0) {
            gsap.set(textPanel, { opacity: 1, y: 0, pointerEvents: "auto" });
          } else {
            gsap.set(textPanel, { opacity: 0, y: 30, pointerEvents: "none" });
          }
        });

        // Initialize active navy line
        if (activeLineRef.current) {
          gsap.set(activeLineRef.current, {
            strokeDasharray: `0 ${totalLen}`,
            strokeDashoffset: -centerLen
          });
        }

        // Master ScrollTrigger Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2800",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const step = Math.min(3, Math.floor(p * 3 + 0.45));
              setActiveStep(step);
            }
          }
        });

        // -------------------------------------------------------------
        // PHASE 1 -> PHASE 2 (Timeline: 0.00 -> 0.333)
        // Node 1 moves Slot 3 -> Slot 2 (moves DOWN along the curve!)
        // Node 2 moves Slot 4 -> Slot 3 (moves DOWN INTO CENTER SPOT!)
        // Node 3 moves Slot 5 -> Slot 4
        // Node 4 moves Slot 6 -> Slot 5
        // Navy line extends from Node 1 (Slot 2) up to Node 2 (Slot 3)
        // -------------------------------------------------------------
        tl.to(
          nodeRefs.current[0],
          {
            x: sampledSlots[2].x,
            y: sampledSlots[2].y,
            opacity: sampledSlots[2].opacity,
            scale: sampledSlots[2].scale,
            backgroundColor: "#133863",
            color: "#ffffff",
            borderColor: "#133863",
            boxShadow: "0 4px 12px rgba(19, 56, 99, 0.2)",
            duration: 0.333,
            ease: "none"
          },
          0
        )
          .to(
            nodeRefs.current[1],
            {
              x: sampledSlots[3].x,
              y: sampledSlots[3].y,
              opacity: sampledSlots[3].opacity,
              scale: sampledSlots[3].scale,
              backgroundColor: "#133863",
              color: "#ffffff",
              borderColor: "#133863",
              boxShadow: "0 8px 24px rgba(19, 56, 99, 0.35)",
              duration: 0.333,
              ease: "none"
            },
            0
          )
          .to(
            nodeRefs.current[2],
            {
              x: sampledSlots[4].x,
              y: sampledSlots[4].y,
              opacity: sampledSlots[4].opacity,
              scale: sampledSlots[4].scale,
              duration: 0.333,
              ease: "none"
            },
            0
          )
          .to(
            nodeRefs.current[3],
            {
              x: sampledSlots[5].x,
              y: sampledSlots[5].y,
              opacity: sampledSlots[5].opacity,
              scale: sampledSlots[5].scale,
              duration: 0.333,
              ease: "none"
            },
            0
          )
          .to(
            activeLineRef.current,
            {
              strokeDasharray: `${stepDist} ${totalLen}`,
              strokeDashoffset: -(centerLen - stepDist),
              duration: 0.333,
              ease: "none"
            },
            0
          )
          .to(
            textRefs.current[0],
            { opacity: 0, y: -25, pointerEvents: "none", duration: 0.16, ease: "power1.out" },
            0.09
          )
          .to(
            textRefs.current[1],
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.16, ease: "power1.out" },
            0.17
          );

        // -------------------------------------------------------------
        // PHASE 2 -> PHASE 3 (Timeline: 0.333 -> 0.666)
        // Node 1 moves Slot 2 -> Slot 1 (moves further DOWN!)
        // Node 2 moves Slot 3 -> Slot 2 (moves DOWN!)
        // Node 3 moves Slot 4 -> Slot 3 (moves DOWN INTO CENTER SPOT!)
        // Node 4 moves Slot 5 -> Slot 4
        // Navy line extends to Node 3 (length = 2 * stepDist)
        // -------------------------------------------------------------
        tl.to(
          nodeRefs.current[0],
          {
            x: sampledSlots[1].x,
            y: sampledSlots[1].y,
            opacity: sampledSlots[1].opacity,
            scale: sampledSlots[1].scale,
            duration: 0.333,
            ease: "none"
          },
          0.333
        )
          .to(
            nodeRefs.current[1],
            {
              x: sampledSlots[2].x,
              y: sampledSlots[2].y,
              opacity: sampledSlots[2].opacity,
              scale: sampledSlots[2].scale,
              backgroundColor: "#133863",
              color: "#ffffff",
              borderColor: "#133863",
              boxShadow: "0 4px 12px rgba(19, 56, 99, 0.2)",
              duration: 0.333,
              ease: "none"
            },
            0.333
          )
          .to(
            nodeRefs.current[2],
            {
              x: sampledSlots[3].x,
              y: sampledSlots[3].y,
              opacity: sampledSlots[3].opacity,
              scale: sampledSlots[3].scale,
              backgroundColor: "#133863",
              color: "#ffffff",
              borderColor: "#133863",
              boxShadow: "0 8px 24px rgba(19, 56, 99, 0.35)",
              duration: 0.333,
              ease: "none"
            },
            0.333
          )
          .to(
            nodeRefs.current[3],
            {
              x: sampledSlots[4].x,
              y: sampledSlots[4].y,
              opacity: sampledSlots[4].opacity,
              scale: sampledSlots[4].scale,
              duration: 0.333,
              ease: "none"
            },
            0.333
          )
          .to(
            activeLineRef.current,
            {
              strokeDasharray: `${2 * stepDist} ${totalLen}`,
              strokeDashoffset: -(centerLen - 2 * stepDist),
              duration: 0.333,
              ease: "none"
            },
            0.333
          )
          .to(
            textRefs.current[1],
            { opacity: 0, y: -25, pointerEvents: "none", duration: 0.16, ease: "power1.out" },
            0.42
          )
          .to(
            textRefs.current[2],
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.16, ease: "power1.out" },
            0.50
          );

        // -------------------------------------------------------------
        // PHASE 3 -> PHASE 4 (Timeline: 0.666 -> 1.000)
        // Node 1 moves Slot 1 -> Slot 0 (fades out at bottom)
        // Node 2 moves Slot 2 -> Slot 1 (moves DOWN!)
        // Node 3 moves Slot 3 -> Slot 2 (moves DOWN!)
        // Node 4 moves Slot 4 -> Slot 3 (moves DOWN INTO CENTER SPOT!)
        // Navy line extends to Node 4 (length = 3 * stepDist)
        // -------------------------------------------------------------
        tl.to(
          nodeRefs.current[0],
          {
            x: sampledSlots[0].x,
            y: sampledSlots[0].y,
            opacity: sampledSlots[0].opacity,
            scale: sampledSlots[0].scale,
            duration: 0.334,
            ease: "none"
          },
          0.666
        )
          .to(
            nodeRefs.current[1],
            {
              x: sampledSlots[1].x,
              y: sampledSlots[1].y,
              opacity: sampledSlots[1].opacity,
              scale: sampledSlots[1].scale,
              duration: 0.334,
              ease: "none"
            },
            0.666
          )
          .to(
            nodeRefs.current[2],
            {
              x: sampledSlots[2].x,
              y: sampledSlots[2].y,
              opacity: sampledSlots[2].opacity,
              scale: sampledSlots[2].scale,
              backgroundColor: "#133863",
              color: "#ffffff",
              borderColor: "#133863",
              boxShadow: "0 4px 12px rgba(19, 56, 99, 0.2)",
              duration: 0.334,
              ease: "none"
            },
            0.666
          )
          .to(
            nodeRefs.current[3],
            {
              x: sampledSlots[3].x,
              y: sampledSlots[3].y,
              opacity: sampledSlots[3].opacity,
              scale: sampledSlots[3].scale,
              backgroundColor: "#133863",
              color: "#ffffff",
              borderColor: "#133863",
              boxShadow: "0 8px 24px rgba(19, 56, 99, 0.35)",
              duration: 0.334,
              ease: "none"
            },
            0.666
          )
          .to(
            activeLineRef.current,
            {
              strokeDasharray: `${3 * stepDist} ${totalLen}`,
              strokeDashoffset: -(centerLen - 3 * stepDist),
              duration: 0.334,
              ease: "none"
            },
            0.666
          )
          .to(
            textRefs.current[2],
            { opacity: 0, y: -25, pointerEvents: "none", duration: 0.16, ease: "power1.out" },
            0.75
          )
          .to(
            textRefs.current[3],
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.16, ease: "power1.out" },
            0.83
          );
      }, containerRef);
    }

    return () => {
      if (ctx) ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // Continuous auto-rotation for the right side 3D cylinder (non-stop smooth spin)
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isDragging) {
        setRotation((prev) => (prev + delta * 18) % 360);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  // Mouse / Touch drag for 3D cylinder
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
    setStartRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const diff = clientX - startX;
    setRotation(startRotation + diff * 0.4);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollToPhase = (targetIdx) => {
    if (typeof window === "undefined") return;
    const allTriggers = ScrollTrigger.getAll();
    const trigger = allTriggers.find((t) => t.pin === containerRef.current);
    if (trigger) {
      const targetProgress = targetIdx / (PHASES.length - 1);
      const scrollY = trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${inter.className} w-full h-screen min-h-[700px] bg-[#ffffff] text-[#111111] relative overflow-hidden flex flex-col justify-between select-none`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#133863]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#133863]/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Top Header with smooth entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: -25, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center pt-10 pb-0 relative z-10 shrink-0"
      >
        <h1 className={`${dmSerif.className} text-3xl sm:text-4xl lg:text-5xl font-normal text-[#133863] tracking-tight`}>
          Types of SEO Services We Offer
        </h1>
      </motion.div>

      {/* Main Viewport Container */}
      <div className="max-w-[1700px] mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-24 flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 xl:gap-24 relative z-10 py-8">
        
        {/* ================= LEFT COLUMN: 100% EXACT PATH-ALIGNED ARC & CONTENT ================= */}
        <div className="w-full lg:w-[56%] xl:w-[54%] flex items-center gap-0 sm:gap-2 lg:gap-3 h-full relative justify-start">
          
          {/* Circular Arc Stage - Exact 1:1 pixel dimensions (250x540) */}
          <div className="relative w-[250px] h-[540px] shrink-0 overflow-visible">
            
            <svg
              className="absolute inset-0 w-[250px] h-[540px] pointer-events-none overflow-visible"
              viewBox="0 0 250 540"
              fill="none"
            >
              {/* Single Master Arc Path (Runs from Bottom to Top) */}
              <path
                ref={pathRef}
                d="M 10 700 Q 230 270 10 -160"
                stroke="#d4e2f2"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Active Navy Stroke: GSAP scrubs this with GPU acceleration directly on the path */}
              <path
                ref={activeLineRef}
                d="M 10 700 Q 230 270 10 -160"
                stroke="#133863"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Number Nodes - Sampled 100% precisely directly from the SVG Path so they sit exactly ON TOP OF the line! */}
            {PHASES.map((phase, idx) => (
              <button
                key={phase.id}
                ref={(el) => {
                  nodeRefs.current[idx] = el;
                }}
                onClick={() => scrollToPhase(idx)}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer z-10 border shadow-md will-change-transform transition-colors"
                style={{
                  left: "0px",
                  top: "0px"
                }}
              >
                <span className={`${dmSerif.className} text-base`}>{phase.id}</span>
              </button>
            ))}
          </div>

          {/* Phase Content Details Panel (GSAP Cross-fade) - shifted closer to the left */}
          <div className="flex-1 max-w-xl min-h-[300px] flex flex-col justify-center text-left py-4 relative -ml-4 sm:-ml-6 lg:-ml-8">
            {PHASES.map((phase, idx) => (
              <div
                key={phase.id}
                ref={(el) => {
                  textRefs.current[idx] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center will-change-[opacity,transform]"
              >
                {/* Serif Heading in Crisp Black */}
                <h2
                  className={`${dmSerif.className} text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-[1.15] whitespace-pre-line mb-4`}
                >
                  {phase.title}
                </h2>

                {/* Description */}
                {phase.desc && (
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
                    {phase.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: 3D REVOLVING CYLINDER ================= */}
        <div
          className="w-full lg:w-[46%] xl:w-[44%] flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[520px]"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-neutral-400/15 blur-[100px] pointer-events-none" />

          {/* 3D Perspective Stage */}
          <div
            className="w-full h-full flex items-center justify-center relative lg:pr-2 xl:pr-4"
            style={{
              perspective: "1100px",
              perspectiveOrigin: "50% 50%"
            }}
          >
            {/* 3D World containing Center Card & Revolving Cylinder */}
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "180px",
                height: "250px",
                transformStyle: "preserve-3d",
                transform: "rotateX(-14deg)"
              }}
            >
              {/* Elevated Center Hero Card - Raised higher above the 3D revolving cylinder ring */}
              <div
                className="absolute rounded-2xl overflow-hidden pointer-events-none transition-all duration-700 ease-out z-20"
                style={{
                  width: "185px",
                  height: "255px",
                  transform: "translateY(-145px) scale(1.06)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 35px 70px -15px rgba(0, 0, 0, 0.55), 0 0 35px rgba(0, 0, 0, 0.25)",
                  border: "2.5px solid rgba(255, 255, 255, 0.95)"
                }}
              >
                {/* Dynamic Image for currently active step */}
                {IMAGES.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`Active Phase ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                      activeStep === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    draggable={false}
                  />
                ))}

                {/* Top Phase Number Tag */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {PHASES[activeStep].id}
                  </span>
                </div>
              </div>

              {/* 3D Rotating Cylinder World (5 Cards Revolving continuously around the Center) */}
              <div
                className="absolute inset-0 transition-transform ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotation}deg)`
                }}
              >
                {IMAGES.map((imgUrl, idx) => {
                  const cardAngle = idx * anglePerCard;

                  return (
                    <div
                      key={idx}
                      className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                      style={{
                        transform: `rotateY(${cardAngle}deg) translateZ(${cylinderRadius}px)`,
                        boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.25)",
                        border: "1.5px solid rgba(255, 255, 255, 0.7)"
                      }}
                    >
                      {/* Pure Full-Bleed Image */}
                      <img
                        src={imgUrl}
                        alt={`Gallery item ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
