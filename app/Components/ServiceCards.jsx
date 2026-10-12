"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  KeyRound,
  LayoutTemplate,
  ShieldCheck,
  LineChart,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 5 SEO Process & Methodology Cards (Exact User Copy)
 */
const SERVICES = [
  {
    id: 1,
    number: "01",
    title: "Audit & Analysis",
    description:
      "We begin by identifying technical gaps, keyword opportunities and competitive positioning.",
    icon: Search,
    bgColor: "#243e76", // Deep Brand Navy
    textColor: "#ffffff",
    iconColor: "#0481a2",
    borderColor: "rgba(4, 129, 162, 0.3)",
    finalX: -55,
    finalY: -45,
    finalRotate: -8,
    finalScale: 0.94,
    zIndex: 10,
  },
  {
    id: 2,
    number: "02",
    title: "Keyword Strategy Development",
    description:
      "We target a mix of high-intent keywords and long-tail queries to ensure balanced and sustainable growth.",
    icon: KeyRound,
    bgColor: "#0481a2", // Aegean Teal
    textColor: "#ffffff",
    iconColor: "#ffffff",
    borderColor: "rgba(255, 255, 255, 0.35)",
    finalX: 50,
    finalY: -38,
    finalRotate: 6.5,
    finalScale: 0.96,
    zIndex: 20,
  },
  {
    id: 3,
    number: "03",
    title: "On-Page Optimization",
    description:
      "We refine website structure, metadata and content to align with search engine requirements.",
    icon: LayoutTemplate,
    bgColor: "#101c38", // Slate Navy Dark
    textColor: "#ffffff",
    iconColor: "#0481a2",
    borderColor: "rgba(4, 129, 162, 0.3)",
    finalX: -38,
    finalY: 5,
    finalRotate: -4.5,
    finalScale: 0.98,
    zIndex: 30,
  },
  {
    id: 4,
    number: "04",
    title: "Content & Authority Building",
    description: (
      <span>
        We create valuable content and build backlinks to strengthen your website&apos;s authority. SEO works best when combined with holistic digital marketing services in Chennai, including{" "}
        <a
          href="https://brand360s.com/services/social-media-marketing-services-in-chennai/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/70 hover:decoration-white underline-offset-2 font-bold text-white"
        >
          Social Media Management Services
        </a>
        , content marketing and paid campaigns, to maximize visibility and engagement.
      </span>
    ),
    icon: ShieldCheck,
    bgColor: "#1e3a68", // Royal Aegean Navy
    textColor: "#ffffff",
    iconColor: "#0481a2",
    borderColor: "rgba(4, 129, 162, 0.35)",
    finalX: 42,
    finalY: 10,
    finalRotate: 4,
    finalScale: 0.99,
    zIndex: 40,
  },
  {
    id: 5,
    number: "05",
    title: "Monitoring & Continuous Optimization",
    description:
      "SEO is not a one-time effort. We continuously track performance, refine strategy and adapt to algorithm changes.",
    icon: LineChart,
    bgColor: "#ffffff", // Pure White Hero Top Card
    textColor: "#243e76",
    iconColor: "#0481a2",
    borderColor: "rgba(4, 129, 162, 0.4)",
    finalX: 0,
    finalY: 26,
    finalRotate: 1,
    finalScale: 1.0,
    zIndex: 50,
  },
];

/**
 * ServiceCards Component
 * Pinned on a single screen with GSAP ScrollTrigger (pin: true).
 * While user scrolls:
 * - The top header content animates upward and fades out.
 * - The 5 service cards smoothly enter and stack physically with distinct fanned angles.
 * - Holds statically in the final stacked composition before releasing to next section.
 */
export default function ServiceCards({ className = "" }) {
  const triggerRef = useRef(null);
  const pinContainerRef = useRef(null);
  const headerRef = useRef(null);
  const cardStackRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!triggerRef.current || !pinContainerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      if (!cards[0] || !cards[1] || !cards[2] || !cards[3] || !cards[4]) return;

      // Initial clean positions (No overlap with header):
      gsap.set(headerRef.current, { y: 0, opacity: 1, filter: "blur(0px)" });
      gsap.set(cardStackRef.current, { y: 0 });
      gsap.set(cards[0], { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      gsap.set(cards[1], { x: 40, y: 700, rotation: 10, scale: 0.92, opacity: 0 });
      gsap.set(cards[2], { x: -40, y: 700, rotation: -10, scale: 0.92, opacity: 0 });
      gsap.set(cards[3], { x: 30, y: 700, rotation: 8, scale: 0.92, opacity: 0 });
      gsap.set(cards[4], { x: 0, y: 700, rotation: -5, scale: 0.92, opacity: 0 });

      // GSAP Timeline tied to ScrollTrigger with pin: true
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2000", // Smooth snappy scroll track distance
          pin: pinContainerRef.current,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // --- STEP 0: Header lifts up & fades out, Card stack elevates into center ---
      tl.to(
        headerRef.current,
        {
          y: -110,
          opacity: 0,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 0.8,
        },
        0.05
      )
      .to(
        cardStackRef.current,
        {
          y: -50,
          ease: "power2.out",
          duration: 1,
        },
        0.05
      );

      // --- STEP 1: Card 0 settles into top-left, Card 1 (Orange) enters and lands top-right ---
      tl.to(
        cards[0],
        {
          x: SERVICES[0].finalX,
          y: SERVICES[0].finalY,
          rotation: SERVICES[0].finalRotate,
          scale: SERVICES[0].finalScale,
          ease: "power1.out",
          duration: 1,
        },
        0.1
      )
      .to(
        cards[1],
        { opacity: 1, duration: 0.25, ease: "power1.in" },
        0.1
      )
      .to(
        cards[1],
        {
          x: SERVICES[1].finalX,
          y: SERVICES[1].finalY,
          rotation: SERVICES[1].finalRotate,
          scale: SERVICES[1].finalScale,
          ease: "power2.out",
          duration: 1,
        },
        0.1
      );

      // --- STEP 2: Card 2 (Green) enters and lands bottom-left ---
      tl.to(
        cards[2],
        { opacity: 1, duration: 0.25, ease: "power1.in" },
        1.2
      )
      .to(
        cards[2],
        {
          x: SERVICES[2].finalX,
          y: SERVICES[2].finalY,
          rotation: SERVICES[2].finalRotate,
          scale: SERVICES[2].finalScale,
          ease: "power2.out",
          duration: 1,
        },
        1.2
      );

      // --- STEP 3: Card 3 (Purple) enters and lands bottom-right ---
      tl.to(
        cards[3],
        { opacity: 1, duration: 0.25, ease: "power1.in" },
        2.3
      )
      .to(
        cards[3],
        {
          x: SERVICES[3].finalX,
          y: SERVICES[3].finalY,
          rotation: SERVICES[3].finalRotate,
          scale: SERVICES[3].finalScale,
          ease: "power2.out",
          duration: 1,
        },
        2.3
      );

      // --- STEP 4: Card 4 (Blue) enters and lands front-center ---
      tl.to(
        cards[4],
        { opacity: 1, duration: 0.25, ease: "power1.in" },
        3.4
      )
      .to(
        cards[4],
        {
          x: SERVICES[4].finalX,
          y: SERVICES[4].finalY,
          rotation: SERVICES[4].finalRotate,
          scale: SERVICES[4].finalScale,
          ease: "power2.out",
          duration: 1,
        },
        3.4
      );

      // --- STEP 5: STATIC HOLD PHASE ---
      // Holds the final 5-card fanned stack completely static on screen before unpinning
      tl.to({}, { duration: 1.6 });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={triggerRef}
      className={`relative w-full bg-[#DEE2E6] text-[#243e76] ${className}`}
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* Ambient Subtle Teal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0481a2]/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Pinned Screen Viewport (100vh) */}
      <section
        ref={pinContainerRef}
        className="w-full h-screen min-h-[720px] flex flex-col items-center justify-between pt-8 sm:pt-12 pb-6 px-4 sm:px-6 overflow-hidden bg-[#DEE2E6] select-none relative"
        style={{ fontFamily: "'Varela Round', sans-serif" }}
      >
        {/* TOP / CENTER HEADER (100% Visible on entry, slides up & fades out as cards fan out) */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto flex flex-col items-center z-20 will-change-transform shrink-0 select-none"
          style={{ fontFamily: "'Varela Round', sans-serif" }}
        >
          {/* Eyebrow */}
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#0481a2] mb-1.5 px-4 py-1 rounded-full bg-white/80 border border-[#243e76]/15 shadow-xs">
            SEO Process
          </span>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#243e76] leading-tight mt-1">
            How Our SEO Strategy Works
          </h2>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#334155] font-normal leading-relaxed max-w-2xl">
            Our SEO process is structured, transparent and designed for long-term growth.
          </p>

          {/* Sub-note with Link */}
          <p className="mt-1 text-[11px] sm:text-xs text-[#475569] font-normal leading-relaxed max-w-2xl">
            SEO works best when combined with holistic{" "}
            <a
              href="https://brand360s.com/services/digital-marketing-agency-in-chennai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0481a2] underline hover:text-[#243e76] font-bold underline-offset-4 decoration-[#0481a2]/40 hover:decoration-[#0481a2] transition-colors"
            >
              digital marketing services in Chennai
            </a>{" "}
            that include social media, content and paid campaigns.
          </p>
        </div>

        {/* CENTERED PHYSICAL CARD STACK CONTAINER (Starts cleanly below header with zero overlap) */}
        <div
          ref={cardStackRef}
          className="relative w-[300px] h-[370px] sm:w-[330px] sm:h-[400px] md:w-[360px] md:h-[430px] my-auto flex items-center justify-center will-change-transform"
        >
          {SERVICES.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{
                  zIndex: card.zIndex,
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  borderColor: card.borderColor,
                  fontFamily: "'Varela Round', sans-serif",
                }}
                className="absolute top-0 left-0 w-full h-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl shadow-[#243e76]/15 border will-change-transform select-none"
              >
                {/* Upper-Left Outline Icon & Step Badge */}
                <div className="w-full flex items-center justify-between">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-start">
                    <Icon
                      className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]"
                      style={{ stroke: card.iconColor }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold tracking-wider opacity-75"
                    style={{ color: card.textColor, fontFamily: "'Varela Round', sans-serif" }}
                  >
                    {card.number}
                  </span>
                </div>

                {/* Lower Portion Content: Title & Description */}
                <div className="space-y-2 sm:space-y-2.5">
                  <h3 className="text-xl sm:text-2xl md:text-[25px] font-bold tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <div className="text-xs sm:text-[13px] font-normal leading-relaxed opacity-95">
                    {card.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom spacer for balance */}
        <div className="h-2 w-full shrink-0" />
      </section>
    </div>
  );
}

