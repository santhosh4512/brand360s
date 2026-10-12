"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PROCESS_STEPS = [
  {
    number: "1",
    duration: "Step 01",
    title: "Purpose &\nAudience Clarity",
    image: "/images/process_step1.jpg",
    alt: "Purpose and Audience Clarity",
  },
  {
    number: "2",
    duration: "Step 02",
    title: "Storyline\n& Content Structuring",
    image: "/images/process_step2.jpg",
    alt: "Storyline and Content Structuring",
  },
  {
    number: "3",
    duration: "Step 03",
    title: "Slide Design\n& Visual Systems",
    image: "/images/process_step3.jpg",
    alt: "Slide Design and Visual Systems",
  },
  {
    number: "4",
    duration: "Step 04",
    title: "Feedback\n& Refinement",
    image: "/images/process_step4.jpg",
    alt: "Feedback and Refinement",
  },
  {
    number: "5",
    duration: "Step 05",
    title: "Final Delivery\n(PDF + PPT/Keynote + Editable Files)",
    image: "/images/process_step5.jpg",
    alt: "Final Delivery (PDF + PPT/Keynote + Editable Files)",
  },
];

export default function OurProcessJourney() {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [isMounted, setIsMounted] = useState(false);
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const pathRef = useRef(null);
  const [travelingPoint, setTravelingPoint] = useState(null);

  const motionProgress = useMotionValue(0);

  // Buttery-smooth spring physics for fluid, steady drawing
  const smoothProgress = useSpring(motionProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.0001,
  });

  // Track the front tip (leading edge) of the line in real time from smooth progress
  useEffect(() => {
    const updatePoint = (v) => {
      if (pathRef.current) {
        try {
          const totalLength = pathRef.current.getTotalLength();
          if (totalLength > 0) {
            const clampedV = Math.max(0, Math.min(1, v));
            const currentLen = clampedV * totalLength;
            const pt = pathRef.current.getPointAtLength(currentLen);
            setTravelingPoint({ x: pt.x, y: pt.y });
          }
        } catch {
          // graceful fallback
        }
      }
    };

    updatePoint(smoothProgress.get());

    return smoothProgress.on("change", (v) => {
      updatePoint(v);
    });
  }, [smoothProgress, pathD]);

  // Sync the active line head directly to where the user's screen viewport is positioned
  useEffect(() => {
    let animId;

    const handleScroll = () => {
      if (!containerRef.current || !pathRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalLen = pathRef.current.getTotalLength();
      if (totalLen <= 0) return;

      // Screen eye-level target Y in container coordinates (50% from viewport top)
      const targetScreenY = window.innerHeight * 0.5 - rect.top;

      if (!startNode || !endNode) return;

      if (targetScreenY <= startNode.y) {
        motionProgress.set(0);
        return;
      }

      if (targetScreenY >= endNode.y) {
        motionProgress.set(1);
        return;
      }

      // Fast binary search to find the exact length on the curve where pt.y matches the screen position
      let low = 0;
      let high = totalLen;
      let bestLen = 0;
      for (let i = 0; i < 14; i++) {
        const mid = (low + high) / 2;
        const pt = pathRef.current.getPointAtLength(mid);
        if (pt.y < targetScreenY) {
          bestLen = mid;
          low = mid;
        } else {
          high = mid;
        }
      }

      const progress = Math.max(0, Math.min(1, bestLen / totalLen));
      motionProgress.set(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathD, startNode, endNode, motionProgress]);

  // Calculate the continuous curved path dynamically across all N stages
  const calculatePath = useCallback(() => {
    if (!containerRef.current) return;
    const validElements = stepRefs.current.filter((el) => el !== null && el !== undefined);
    if (validElements.length < PROCESS_STEPS.length) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    if (containerWidth === 0 || containerHeight === 0) return;

    setSvgSize({ width: containerWidth, height: containerHeight });

    const isMobile = containerWidth < 768;
    const r = isMobile ? 24 : 56; // Smooth large 90-degree rounded curves

    // Measure each step's exact layout bounds
    const coords = stepRefs.current.slice(0, PROCESS_STEPS.length).map((el, index) => {
      if (!el) return { nodeX: 0, nodeY: 0, top: 0, bottom: 0 };
      const rect = el.getBoundingClientRect();
      const top = rect.top - containerRect.top;
      const bottom = rect.bottom - containerRect.top;
      const left = rect.left - containerRect.left;
      const right = rect.right - containerRect.left;

      if (isMobile) {
        return {
          nodeX: Math.max(16, left - 4),
          top,
          bottom,
        };
      } else {
        const center = (left + right) / 2;
        const isCenter = index % 2 === 1;
        return {
          nodeX: isCenter ? center : left - 12,
          top,
          bottom,
        };
      }
    });

    if (coords.some((c) => !c || isNaN(c.nodeX))) return;

    if (isMobile) {
      const spineX = coords[0].nodeX;
      const startY = coords[0].top + 8;
      const endY = coords[coords.length - 1].bottom + 40;

      const d = `M ${spineX} ${startY} V ${endY}`;
      setPathD(d);
      setStartNode({ x: spineX, y: startY });
      setEndNode({ x: spineX, y: endY });
      return;
    }

    // DESKTOP: Dynamic continuous path across all N alternating steps
    const startY = coords[0].top + 12;
    const endY = coords[coords.length - 1].bottom + 80;

    let d = `M ${coords[0].nodeX} ${startY} `;

    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const yT = (curr.bottom + next.top) / 2;

      if (i % 2 === 0) {
        // Going from Left to Right
        d += `V ${yT - r} `;
        d += `Q ${curr.nodeX} ${yT} ${curr.nodeX + r} ${yT} `;
        d += `H ${next.nodeX - r} `;
        d += `Q ${next.nodeX} ${yT} ${next.nodeX} ${yT + r} `;
      } else {
        // Going from Right to Left
        d += `V ${yT - r} `;
        d += `Q ${curr.nodeX} ${yT} ${curr.nodeX - r} ${yT} `;
        d += `H ${next.nodeX + r} `;
        d += `Q ${next.nodeX} ${yT} ${next.nodeX} ${yT + r} `;
      }
    }

    // Final vertical run to end of last step
    d += `V ${endY}`;

    setPathD(d);
    setStartNode({ x: coords[0].nodeX, y: startY });
    setEndNode({ x: coords[coords.length - 1].nodeX, y: endY });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    calculatePath();

    // Use ResizeObserver so that as images load or fonts render, the path recalculates in real-time
    const observer = new ResizeObserver(() => {
      calculatePath();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleResize = () => {
      calculatePath();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [calculatePath]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#101c38] text-white py-24 md:py-32 px-6 sm:px-10 md:px-14 lg:px-20 overflow-hidden select-none"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Ambient Central Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0481a2]/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* ===================================================
            HEADER: Editorial Kinetic Scroll Reveal Animation
            =================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-black leading-[1.1] text-white tracking-tight">
            Our Design <span className="text-[#38BDF8]">Process</span>
          </h2>
        </motion.div>

        {/* ===================================================
            CONTINUOUS CONNECTED SVG PATH (INACTIVE + ACTIVE)
            =================================================== */}
        {isMounted && pathD && (
          <svg
            className="absolute inset-0 pointer-events-none w-full h-full z-10"
            viewBox={`0 0 ${svgSize.width || 1200} ${svgSize.height || 4500}`}
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="brandGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.75" />
              </filter>
            </defs>

            {/* 1. Inactive Background Path */}
            <path
              d={pathD}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 2. Active Scroll-Revealed Path (Brand Cyan #38BDF8 with glow) */}
            <motion.path
              ref={pathRef}
              d={pathD}
              stroke="#38BDF8"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#brandGlow)"
              pathLength={smoothProgress}
            />

            {/* 3. Top Starting Circle Node */}
            {startNode && (
              <g transform={`translate(${startNode.x}, ${startNode.y})`}>
                <circle r="10" fill="#38BDF8" opacity="0.35" />
                <circle r="6.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
              </g>
            )}

            {/* 4. Bottom Ending Circle Node */}
            {endNode && (
              <g transform={`translate(${endNode.x}, ${endNode.y})`}>
                <circle r="10" fill="#38BDF8" opacity="0.35" />
                <circle r="6.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
              </g>
            )}

            {/* 5. Traveling Active Head Beacon */}
            {travelingPoint && (
              <g transform={`translate(${travelingPoint.x}, ${travelingPoint.y})`}>
                <circle r="22" fill="#38BDF8" opacity="0.25" />
                <circle r="12" fill="#38BDF8" opacity="0.8" />
                <circle r="6" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="3" />
              </g>
            )}
          </svg>
        )}

        {/* ===================================================
            5 PROCESS STAGES (COMPACT CARDS & SHIFTED CONTENT)
            =================================================== */}
        <div className="relative z-20 flex flex-col gap-28 md:gap-36">
          {PROCESS_STEPS.map((step, index) => {
            const isTextLeft = index % 2 === 0;

            return (
              <div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`flex flex-col ${
                  isTextLeft ? "md:flex-row" : "md:flex-row-reverse"
                } items-center justify-between gap-10 lg:gap-14`}
              >
                {/* ---------------- TEXT CONTENT COLUMN ---------------- */}
                <motion.div
                  initial={{ opacity: 0, x: isTextLeft ? -80 : 80, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full md:w-[46%] lg:w-[44%] ${
                    index === 0
                      ? "pl-16 sm:pl-24 md:pl-32 lg:pl-40 md:translate-x-4 md:translate-y-4 pr-2"
                      : index === 1
                      ? "pl-8 sm:pl-12 md:pl-16 lg:pl-20 pr-2"
                      : index === 2
                      ? "pl-16 sm:pl-24 md:pl-32 lg:pl-40 md:translate-x-4 md:-translate-y-4 pr-2"
                      : index === 3
                      ? "pl-8 sm:pl-12 md:pl-16 lg:pl-20 pr-2 md:-translate-y-4"
                      : "pl-16 sm:pl-24 md:pl-32 lg:pl-40 md:translate-x-4 pr-2"
                  }`}
                >
                  {/* Number */}
                  <div className="mb-3 select-none">
                    <span className="text-5xl sm:text-6xl lg:text-[72px] font-black leading-none text-white/90">
                      {step.number}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold leading-[1.2] text-white tracking-tight max-w-lg whitespace-pre-line">
                    {step.title}
                  </h3>
                </motion.div>

                {/* ---------------- IMAGE COLUMN ---------------- */}
                <motion.div
                  initial={{ opacity: 0, x: isTextLeft ? 80 : -80, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className={`w-full md:w-[48%] lg:w-[46%] max-w-[500px] ${
                    index === 0
                      ? "md:translate-y-8 lg:translate-y-12 md:-translate-x-10 lg:-translate-x-14"
                      : index === 1
                      ? "md:translate-y-6 lg:translate-y-8"
                      : index === 2
                      ? "md:-translate-y-4 md:-translate-x-10 lg:-translate-x-14"
                      : index === 3
                      ? "md:-translate-y-10 lg:-translate-y-14"
                      : "md:-translate-y-6 lg:-translate-y-8 md:-translate-x-10 lg:-translate-x-14"
                  }`}
                >
                  <div className="relative aspect-[16/11] sm:aspect-[16/10.5] w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#0481a2]/35 bg-[#172a54]">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                      priority={index === 0}
                      onLoad={() => calculatePath()}
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

