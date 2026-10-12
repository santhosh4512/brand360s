"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PANELS = [
  {
    id: "01",
    number: "01",
    spineTitle: "01 • Executive Media Coverage",
    title: "Executive Media Coverage",
    description:
      "Secure high-visibility opportunities and strategic features across premier news platforms and tier-1 publications.",
    bgGradient: "linear-gradient(135deg, #101c36 0%, #1e3567 60%, #15264b 100%)",
    accentColor: "#0481a2",
  },
  {
    id: "02",
    number: "02",
    spineTitle: "02 • Founder PR Campaigns",
    title: "Founder PR Campaigns",
    description:
      "Promote founder stories, milestones, achievements, and unique industry expertise to captivate stakeholders.",
    bgGradient: "linear-gradient(135deg, #0d1933 0%, #1a3461 55%, #0481a2 100%)",
    accentColor: "#38bdf8",
  },
  {
    id: "03",
    number: "03",
    spineTitle: "03 • Leadership Profile Development",
    title: "Leadership Profile Development",
    description:
      "Create authoritative, market-defining professional positioning for executives, founders, and business leaders.",
    bgGradient: "linear-gradient(135deg, #132446 0%, #20396c 50%, #03657f 100%)",
    accentColor: "#22d3ee",
  },
  {
    id: "04",
    number: "04",
    spineTitle: "04 • Press Release Strategy",
    title: "Press Release Strategy",
    description:
      "Develop and distribute newsworthy executive announcements, strategic milestones, and major company updates.",
    bgGradient: "linear-gradient(135deg, #0a1324 0%, #182642 50%, #20396c 100%)",
    accentColor: "#34d399",
  },
  {
    id: "05",
    number: "05",
    spineTitle: "05 • Industry Authority Building",
    title: "Industry Authority Building",
    description:
      "Strengthen recognition and executive credibility through signature frameworks and expert positioning initiatives.",
    bgGradient: "linear-gradient(135deg, #0e1e3b 0%, #1d3c6d 55%, #056a84 100%)",
    accentColor: "#60a5fa",
  },
  {
    id: "06",
    number: "06",
    spineTitle: "06 • Reputation Management Support",
    title: "Reputation Management Support",
    description:
      "Enhance professional credibility, digital sentiment, and brand trust across global digital media channels.",
    bgGradient: "linear-gradient(135deg, #111e38 0%, #224075 50%, #0481a2 100%)",
    accentColor: "#a78bfa",
  },
  {
    id: "07",
    number: "07",
    spineTitle: "07 • Keynote & Speaking Engagements",
    title: "Keynote & Speaking Engagements",
    description:
      "Curate and secure marquee speaking slots, conference panels, and keynote stages at premier industry summits.",
    bgGradient: "linear-gradient(135deg, #0c1830 0%, #1f3b6c 50%, #036881 100%)",
    accentColor: "#fbbf24",
  },
  {
    id: "08",
    number: "08",
    spineTitle: "08 • Executive Media Relations",
    title: "Executive Media Relations",
    description:
      "Establish direct, enduring relationships with tier-1 journalists, chief editors, and leading business media hosts.",
    bgGradient: "linear-gradient(135deg, #091222 0%, #162a4d 50%, #20396c 100%)",
    accentColor: "#4ade80",
  },
];

export default function StackedRevealPanels() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const panelRefs = useRef([]);
  const overlayRefs = useRef([]);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean);
      const overlays = overlayRefs.current.filter(Boolean);
      const totalPanels = panels.length;

      // Strip width allocated to each stacked panel on the left
      const isMobile = window.innerWidth <= 768;
      const stripWidthVw = isMobile ? 6.5 : 4.0; // percentage of viewport width

      // Master Timeline driven by ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalPanels * 90}vh`,
          scrub: 0.85,
          pin: stage,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentIdx = Math.min(
              totalPanels - 1,
              Math.floor(progress * totalPanels + 0.12)
            );
            setActivePanel(currentIdx);
          },
        },
      });

      // Initially, Panel 0 is at x: 0, while Panels 1..N start offscreen to the right (x: 100vw)
      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { x: 0, zIndex: 10 });
        } else {
          gsap.set(panel, { xPercent: 100, zIndex: 10 + i });
        }
      });

      // Animate each panel entering from right to its stacked position: x = i * stripWidth
      for (let i = 1; i < totalPanels; i++) {
        const targetXPercent = i * stripWidthVw;

        tl.to(
          panels[i],
          {
            xPercent: targetXPercent,
            ease: "power2.inOut",
            duration: 1.2,
          },
          `step-${i}`
        );

        // Darken the previous panel slightly to highlight the stack depth
        if (overlays[i - 1]) {
          tl.to(
            overlays[i - 1],
            {
              opacity: 0.76,
              ease: "power1.inOut",
              duration: 1.0,
            },
            `step-${i}-=0.9`
          );
        }
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const scrollToPanel = (idx) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const totalScroll = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = containerTop + (idx / (PANELS.length - 1)) * totalScroll;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f8f9fa] text-white select-none"
      style={{ height: `${PANELS.length * 90 + 50}vh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a1120] flex items-center justify-center"
      >
        {/* STACKED PANELS CONTAINER */}
        <div className="relative w-full h-full overflow-hidden">
          {PANELS.map((panel, i) => {
            return (
              <div
                key={panel.id}
                ref={(el) => (panelRefs.current[i] = el)}
                className="absolute top-0 left-0 w-full h-full will-change-transform shadow-[-20px_0_45px_rgba(0,0,0,0.6)] border-l border-white/10"
                style={{
                  background: panel.bgGradient,
                }}
              >
                {/* INACTIVE BACKDROP OVERLAY (fades in when pushed left) */}
                <div
                  ref={(el) => (overlayRefs.current[i] = el)}
                  className="absolute inset-0 bg-[#060c18] pointer-events-none opacity-0 transition-opacity duration-300 z-20"
                />

                {/* LEFT STRIP SPINE (Always visible when stacked to the left) */}
                <div
                  onClick={() => scrollToPanel(i)}
                  className="absolute top-0 left-0 h-full w-[8vw] sm:w-[4vw] min-w-[36px] sm:min-w-[48px] max-w-[62px] z-30 cursor-pointer flex flex-col items-center justify-between py-6 sm:py-8 px-1 sm:px-2 border-r border-white/10 bg-black/30 backdrop-blur-md transition-all hover:bg-black/50 group"
                  title={`Jump to ${panel.title}`}
                >
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <span
                      className="font-['Outfit'] font-extrabold text-xs sm:text-sm tracking-wider transition-colors duration-300"
                      style={{ color: activePanel === i ? panel.accentColor : "#DEE2E6" }}
                    >
                      {panel.number}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: activePanel === i ? panel.accentColor : "rgba(255,255,255,0.3)",
                        boxShadow: activePanel === i ? `0 0 8px ${panel.accentColor}` : "none",
                      }}
                    />
                  </div>

                  {/* Vertical Rotated Title on Spine */}
                  <div className="flex-1 flex items-center justify-center my-4">
                    <span
                      className="font-['Outfit'] font-semibold text-[10px] sm:text-xs tracking-[0.16em] uppercase whitespace-nowrap -rotate-90 origin-center transition-all duration-300 group-hover:text-white"
                      style={{
                        color: activePanel === i ? "#ffffff" : "rgba(222, 226, 230, 0.65)",
                      }}
                    >
                      {panel.spineTitle}
                    </span>
                  </div>

                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/50 transition-colors">
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                {/* PANEL MAIN CONTENT AREA */}
                <div className="relative w-full h-full pl-[10vw] sm:pl-[6vw] pr-6 sm:pr-14 py-10 sm:py-16 flex flex-col justify-center overflow-hidden z-10">
                  {/* Subtle Background Glow */}
                  <div
                    className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
                    style={{ background: panel.accentColor }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

                  {/* All 8 Cards: Clean, Premium Full Typography matching screenshot */}
                  <div className="max-w-4xl w-full flex flex-col justify-center gap-5 sm:gap-7 relative z-10">
                    <div className="flex items-center gap-4">
                      <span
                        className="font-['Outfit'] font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight opacity-40 select-none"
                        style={{ color: panel.accentColor }}
                      >
                        {panel.number}
                      </span>
                      <div
                        className="h-0.5 flex-1 max-w-[120px] rounded-full opacity-30"
                        style={{ background: panel.accentColor }}
                      />
                    </div>

                    {/* Main Panel Title */}
                    <h2 className="font-['Outfit'] font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                      {panel.title}
                    </h2>

                    {/* Description */}
                    <p className="font-['Varela_Round'] text-base sm:text-xl lg:text-2xl text-[#DEE2E6]/95 leading-relaxed max-w-3xl">
                      {panel.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
