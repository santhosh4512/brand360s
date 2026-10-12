"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 5 Audience Segments for "Who Needs SEO Services in Chennai?"
 */
const ORBIT_CARDS = [
  {
    id: 1,
    number: "01",
    text: "Startups looking to build online visibility from scratch",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    number: "02",
    text: 'Local businesses targeting "near me" searches',
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    number: "03",
    text: "Ecommerce brands aiming to increase organic sales",
    image:
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    number: "04",
    text: "Service-based businesses generating leads through Google",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    number: "05",
    text: "Companies struggling with low rankings or traffic",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  },
];

/**
 * OrbitingCardsSection Component with 5-Column Blue Curtain Reveal
 * The curtain stays fully covered until the section reaches the top of the viewport (100% full view),
 * then opens in a center-outward wave to unveil the section behind it.
 */
export default function OrbitingCardsSection({ className = "" }) {
  const containerRef = useRef(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 750 });
  const [isFullyInView, setIsFullyInView] = useState(false);

  // Trigger curtain reveal ONLY when section reaches full view (top of viewport)
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 20%", // Triggers when section is fully dominant in the viewport
        onEnter: () => setIsFullyInView(true),
        onLeaveBack: () => setIsFullyInView(false),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Update container dimensions for 100% safe bounded orbit radii
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous smooth orbital rotation animation loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Pause rotation when card is hovered
      if (!isHovered && isFullyInView) {
        setRotationAngle((prev) => (prev + delta * 11) % 360); // 11 deg/sec
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, isFullyInView]);

  const totalCards = ORBIT_CARDS.length;

  // Safe bounded orbit calculations ensuring cards never exceed screen borders
  const cardHalfWidth = containerSize.width < 768 ? 130 : 160;
  const cardHalfHeight = containerSize.width < 768 ? 45 : 50;

  const maxAllowedRadiusX = Math.max(120, containerSize.width / 2 - cardHalfWidth - 30);
  const maxAllowedRadiusY = Math.max(100, containerSize.height / 2 - cardHalfHeight - 60);

  const radiusX = Math.min(maxAllowedRadiusX, 480);
  const radiusY = Math.min(maxAllowedRadiusY, 260);

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-screen py-24 md:py-32 bg-[#ffffff] text-[#133863] flex items-center justify-center overflow-hidden select-none border-t border-slate-100 ${className}`}
    >
      {/* 5-COLUMN BRAND BLUE CURTAIN REVEAL OVERLAY */}
      <div className="absolute inset-0 z-50 pointer-events-none flex w-full h-full overflow-hidden">
        {[0, 1, 2, 3, 4].map((colIdx) => {
          // Center-outward stagger delay: Column 2 (center) lifts first, then 1 & 3, then 0 & 4
          const distanceFromCenter = Math.abs(colIdx - 2);
          const colDelay = 0.1 + distanceFromCenter * 0.14;

          return (
            <motion.div
              key={colIdx}
              initial={{ y: "0%" }}
              animate={isFullyInView ? { y: "-100%" } : { y: "0%" }}
              transition={{
                duration: 0.92,
                delay: colDelay,
                ease: [0.76, 0, 0.24, 1], // Custom power4/quintic smooth slide up
              }}
              className="relative h-full flex-1 bg-[#0077b6] border-r border-white/10 last:border-r-0 shadow-2xl"
              style={{ willChange: "transform" }}
            >
              {/* Subtle vertical metallic shine line */}
              <div className="absolute inset-y-0 right-0 w-[1px] bg-white/15" />
            </motion.div>
          );
        })}
      </div>

      {/* Soft Ambient Brand Glow Behind Content */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-[#0077b6]/10 via-[#133863]/5 to-[#0077b6]/15 blur-3xl" />
      </motion.div>

      {/* CENTER HEADLINE WITH KINETIC REVEAL ANIMATION */}
      <div className="relative z-10 text-center max-w-2xl px-6 pointer-events-none">
        <motion.div
          initial="hidden"
          animate={isFullyInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.45 },
            },
          }}
          className="flex flex-col items-center"
        >
          {/* Headline Word Split Animation */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-extrabold tracking-tight leading-[1.14] text-[#133863] flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1">
            {[
              { text: "Who", highlight: false },
              { text: "Needs", highlight: false },
              { text: "SEO", highlight: true },
              { text: "Services", highlight: true },
              { text: "in", highlight: false },
              { text: "Chennai?", highlight: false },
            ].map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  variants={{
                    hidden: { y: "120%", opacity: 0, filter: "blur(6px)" },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.75,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className={`inline-block ${
                    word.highlight
                      ? "text-[#0077b6] font-black underline decoration-[#0077b6]/30 underline-offset-8"
                      : "text-[#133863]"
                  }`}
                >
                  {word.text}
                </motion.span>
              </span>
            ))}
          </h2>
        </motion.div>
      </div>

      {/* 5 ORBITING REVOLVING CARDS - 100% BOUNDED INSIDE VIEWPORT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {ORBIT_CARDS.map((card, idx) => {
          // Compute angle for each card (360 / 5 = 72 deg spacing)
          const baseAngle = (360 / totalCards) * idx;
          const currentAngleDeg = (baseAngle + rotationAngle) % 360;
          const angleRad = (currentAngleDeg * Math.PI) / 180;

          // Elliptical X and Y positions centered around headline
          const x = Math.cos(angleRad) * radiusX;
          const y = Math.sin(angleRad) * radiusY;

          // Depth layering (cards in front are slightly larger and higher z-index)
          const isFront = Math.sin(angleRad) > 0;
          const depthScale = 0.94 + ((Math.sin(angleRad) + 1) / 2) * 0.12; // 0.94 to 1.06
          const isCurrentCardHovered = hoveredCardId === card.id;

          return (
            <motion.div
              key={card.id}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0px) scale(${
                  isCurrentCardHovered ? 1.14 : depthScale
                })`,
                zIndex: isCurrentCardHovered ? 40 : isFront ? 25 : 5,
              }}
              onMouseEnter={() => {
                setIsHovered(true);
                setHoveredCardId(card.id);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setHoveredCardId(null);
              }}
              className="absolute pointer-events-auto cursor-pointer transition-transform duration-300 ease-out"
            >
              {/* High-Contrast Bounded Card */}
              <div
                className={`flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 pr-4 sm:pr-6 rounded-2xl sm:rounded-3xl bg-[#ffffff] border-2 border-slate-200 shadow-xl shadow-slate-900/10 transition-all duration-300 ${
                  isCurrentCardHovered
                    ? "border-[#0077b6] ring-4 ring-[#0077b6]/20 shadow-2xl bg-[#ffffff] -translate-y-1 scale-105"
                    : "hover:border-slate-400 hover:shadow-2xl"
                }`}
              >
                {/* Large Thumbnail Image with Step Badge */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-100 shadow-md ring-2 ring-slate-100">
                  <img
                    src={card.image}
                    alt={card.text}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                  {/* Step number badge */}
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-[#133863] text-[9px] font-mono font-bold text-white shadow-md leading-none">
                    {card.number}
                  </span>
                </div>

                {/* Card Text Only */}
                <div className="flex flex-col select-none">
                  <p className="text-xs sm:text-[13px] font-bold text-[#0f172a] leading-snug max-w-[160px] sm:max-w-[200px]">
                    {card.text}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
