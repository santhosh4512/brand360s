"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "investor-pitch-decks",
    client: "Investor Pitch Decks",
    description: "High-impact investor presentations highlighting vision, traction and opportunity using clear storytelling and investor psychology.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "startup-funding-decks",
    client: "Startup Funding Decks",
    description: "Purpose-built funding decks for Seed to Series A/B that structure your narrative for clarity, confidence and scalability.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "corporate-presentations",
    client: "Corporate Presentations",
    description: "Boardroom-ready presentations for leadership reviews, strategy meetings and executive communication.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "sales-decks",
    client: "Sales Decks",
    description: "Persuasive decks built to showcase benefits, address objections and improve closing rates.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "capability-service-decks",
    client: "Capability & Service Decks",
    description: "Structured presentations that clearly articulate services, processes and case studies.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "product-demo-decks",
    client: "Product Demo Decks",
    description: "Feature-focused product decks explaining workflows, benefits and user value with clarity.",
    image: "https://images.unsplash.com/photo-1581291518655-9523c932694b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "strategy-decks",
    client: "Strategy Decks",
    description: "Insight-driven presentations covering positioning, competition, KPIs and marketing direction.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "roadmap-presentations",
    client: "Roadmap Presentations",
    description: "Structured timelines for product rollouts, features, launches and execution planning.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "marketing-performance-decks",
    client: "Marketing Reports & Performance Decks",
    description: "Data-driven presentations that transform numbers into visually clear insights and actionable stories.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "infographic-presentations",
    client: "Infographic-Rich Presentations",
    description: "Iconography, charts and diagrams crafted for fast comprehension and stronger engagement.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85",
  }
];

export default function StudioLoopShowcase() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Discrete active index and bidirectional scroll detection
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const count = PROJECTS.length;
      // Map 0..1 progress evenly across all 10 items
      const rawIndex = Math.floor(latest * (count - 0.02));
      const index = Math.min(count - 1, Math.max(0, rawIndex));
      if (index !== prevIndexRef.current) {
        setDirection(index > prevIndexRef.current ? 1 : -1);
        prevIndexRef.current = index;
        setActiveIndex(index);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToProject = (index) => {
    if (!containerRef.current) return;
    if (index !== activeIndex) {
      setDirection(index > activeIndex ? 1 : -1);
      prevIndexRef.current = index;
      setActiveIndex(index);
    }
    const containerTop = containerRef.current.offsetTop;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (PROJECTS.length - 1)) * totalHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  const imageVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 0.93,
      x: dir > 0 ? 35 : -35,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 1.05,
      x: dir > 0 ? -35 : 35,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#f8fafc] text-[#243e76] font-sans selection:bg-[#243e76] selection:text-white"
      style={{ height: `${PROJECTS.length * 100}vh` }}
    >
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden px-6 md:px-10 lg:px-12 pt-6 pb-6 flex flex-col justify-between select-none">

        {/* CENTERED HEADING WITH OUTFIT FONT & PROJECT BRAND COLORS */}
        <div className="w-full text-center flex flex-col items-center justify-center z-30 pt-1">
          <span
            className="text-[11px] sm:text-xs md:text-[13px] font-bold tracking-[0.25em] uppercase text-[#0481a2] block mb-1.5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            PITCH DECK DESIGN SERVICES
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#243e76] tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Our Pitch Deck &amp; Presentation Services
          </h2>
        </div>

        {/* MAIN ACCORDION DISPLAY AREA (Identical, equal flex spacing on both left and right of the image card) */}
        <div className="relative flex-1 w-full flex items-end justify-between overflow-hidden px-1 mt-2">
          
          {PROJECTS.map((item, idx) => {
            const isActive = activeIndex === idx;
            const isHovered = hoveredIndex === idx;

            return (
              <React.Fragment key={item.id}>
                {/* VERTICAL COLUMN LABEL BUTTON (Project Font & Brand Colors with Smooth Layout Physics) */}
                <motion.button
                  layout
                  onClick={() => scrollToProject(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 26,
                    mass: 0.6
                  }}
                  className="flex-1 min-w-[32px] sm:min-w-[40px] md:min-w-[50px] flex flex-col items-center justify-end pb-1 cursor-pointer select-none group"
                  aria-label={`Select ${item.client}`}
                >
                  <div
                    className="whitespace-nowrap transition-colors duration-300 flex items-center justify-center"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)"
                    }}
                  >
                    <span
                      className={`text-[13px] sm:text-[14.5px] md:text-[15.5px] tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-[#0481a2] font-bold scale-105"
                          : isHovered
                          ? "text-[#243e76] font-semibold"
                          : "text-[#243e76]/45 font-medium"
                      }`}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.client}
                    </span>
                  </div>
                </motion.button>

                {/* THE ACTIVE PORTRAIT MEDIA CARD (Buttery smooth layout morph in BOTH directions) */}
                {isActive && (
                  <motion.div
                    layout
                    layoutId="activeStudioCard"
                    className="shrink-0 relative z-20 mx-1 sm:mx-2 md:mx-3"
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 26,
                      mass: 0.6
                    }}
                  >
                    <div className="relative w-[240px] sm:w-[275px] md:w-[315px] lg:w-[350px] xl:w-[375px] h-[calc(100vh-160px)] max-h-[750px] rounded-[22px] md:rounded-[26px] overflow-hidden bg-[#241F1C] shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                      <AnimatePresence custom={direction} mode="popLayout">
                        <motion.div
                          key={activeProject.id}
                          custom={direction}
                          variants={imageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="absolute inset-0 w-full h-full"
                        >
                          <img
                            src={activeProject.image}
                            alt={activeProject.client}
                            className="w-full h-full object-cover object-center"
                          />

                          {/* Subtle dark gradient overlay for crystal-clear readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                          {/* 3-Line Description at the bottom of the image */}
                          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10 pointer-events-none">
                            <p className="text-white/95 text-[12.5px] sm:text-[13.5px] md:text-[14.5px] leading-relaxed font-sans font-normal line-clamp-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                              {activeProject.description}
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}

        </div>

      </div>
    </section>
  );
}
