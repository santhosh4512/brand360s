"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

const CheckIcon = () => (
  <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-[#0481a2]/20 border border-[#0481a2]/50 flex items-center justify-center shrink-0">
    <svg
      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0481a2]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M5 13l4 4L19 7"
      />
    </svg>
  </div>
);

const PROGRAMS = [
  {
    id: "01",
    tag: "SEO ESSENTIALS PROGRAM",
    topHeading: "Fix the foundation,\nprepare your Website + GMB for growth",
    heading: "SEO Essentials Program",
    description:
      "A 3-month foundation phase designed to fix technical issues and prepare your website and Google Business Profile for growth.",
    images: [
      {
        title: "Website SEO",
        level: "Basic Level",
        items: [
          "On-page optimization for main pages",
          "Meta titles + descriptions",
          "Basic keyword mapping",
          "Header structure fixes (H1-H2-H3)",
          "Image ALT text + compression",
          "Sitemap creation + submission",
          "Robots.txt setup",
          "Indexing fixes via Search Console",
          "Basic schema (Organization / LocalBusiness)",
          "SSL check & mobile usability fixes",
          "Speed optimization (compression, caching)",
          "Error & broken link cleanup",
        ],
        src: "/images/seo-services-chennai.webp",
      },
      {
        title: "Local SEO",
        level: "Starter Level",
        items: [
          "GMB profile optimization",
          "Category setup + correction",
          "Local keyword optimization",
          "Basic GMB photo posting (3/week)",
          "NAP consistency check",
          "GMB service listing optimization",
          "Primary city-based keyword optimization",
          'Geo-keyword insertion ("service + Chennai", "near me")',
        ],
        src: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1600&q=85",
      },
      {
        title: "Visibility Setup",
        level: "Setup",
        items: [
          "GMB & Google Maps presence improvement",
          "Basic location-based SEO signals",
          "Starter-level competitive insights",
        ],
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },
  {
    id: "02",
    tag: "SEO GROWTH PROGRAM",
    topHeading: "Expand Keywords, grow website traffic,\nimprove local + organic ranking",
    heading: "SEO Growth Program",
    description:
      "A 4–6 month growth phase focused on expanding keyword reach and improving organic and local visibility.",
    images: [
      {
        title: "Website SEO",
        level: "Growth Level",
        items: [
          "On-page optimization for 10-15 pages",
          "Secondary + long-tail keyword optimization",
          "Content gap fixes",
          "FAQ / Service / Organization schema",
          "Image optimization",
          "Internal link structuring",
          "Monthly technical fixes",
          "Sitemap + indexing improvements",
          "Competitor keyword gap analysis",
        ],
        src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1600&q=85",
      },
      {
        title: "Local SEO",
        level: "Growth Level",
        items: [
          "Monthly GMB optimization",
          "4 GMB posts/week (geo-tagged)",
          'Local keyword clusters ("service + Chennai")',
          "Map ranking improvement",
          "10-20 citation backlinks (Anna Nagar, Mogappair etc.)",
          "Neighborhood targeting (Anna Nagar, Mogappair etc.)",
          "Service-wise keyword optimization",
        ],
        src: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1600&q=85",
      },
      {
        title: "GMB Growth",
        level: "Enhancements",
        items: [
          "Review strategy + templates",
          "Monthly Q&A optimization",
          "Geotagged photos/videos",
          "Product/service keyword mapping",
          "GMB title testing",
        ],
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },
  {
    id: "03",
    tag: "SEO PERFORMANCE PROGRAM",
    topHeading: "Aggressive SEO growth across\nWebsite + Local + Content + Authority Signals",
    heading: "SEO Performance Program",
    description:
      "A 6-month performance phase built to accelerate rankings across website SEO, content and authority signals.",
    images: [
      {
        title: "Website SEO",
        level: "High Level",
        items: [
          "Full-site on-page optimization",
          "Keyword clusters (20-40 keywords)",
          "Advanced schema (FAQ, Service, LocalBusiness, Breadcrumbs)",
          "Content optimization for internal",
          "Internal linking structure improvement",
          "Site architecture fix + UX improvement",
          "Monthly technical SEO (speed, indexation, crawlability, errors)",
          "Monthly SEO content plan",
        ],
        src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85",
      },
      {
        title: "Local SEO",
        level: "High Level",
        items: [
          "Full GMB optimization & monthly maintenance",
          'Hyperlocal targeting (areas, neighborhoods, "near me")',
          'Local landing pages ("service + Anna Nagar", "designer + Mogappair")',
          "Local backlinks (industry + city citations)",
          "GMB posts: 3-4 per week",
          "Review acquisition strategy + templates",
          "Monthly Q&A optimization",
          "Monthly geotagged images upload",
        ],
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      },
      {
        title: "Google Maps Ranking",
        level: "Boost",
        items: [
          "Strong push for ranking competitive keywords",
          "CTR improvement strategy",
          "High-quality photo + video uploads",
          "Conversion optimization for GMB enquiries",
          "Map Pack visibility improvements",
        ],
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },
  {
    id: "04",
    tag: "SEO AUTHORITY PROGRAM",
    topHeading: "Build industry Dominance across\norganic search, local search & brand reputation",
    heading: "SEO Authority Program",
    description:
      "A 12-month authority phase designed to establish long-term dominance in organic search, local search and brand credibility.",
    images: [
      {
        title: "Website SEO",
        level: "Authority Level",
        items: [
          "Keyword domination strategy (40-100 keywords)",
          "Topic clusters & pillar content",
          "Monthly long-form SEO blogs",
          "Authority backlinks (DR 50-90 links)",
          "Technical SEO on autopilot",
          "Content marketing engine",
          "Conversion optimization",
        ],
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        title: "Local SEO",
        level: "Authority Level",
        items: [
          "Local + hyperlocal dominance",
          "Multi-location ranking (if applicable)",
          "Local landing page expansions",
          "High-quality citations + press listings",
          "Monthly GMB optimization",
          "Daily posting (if required)",
          "Review velocity growth",
          "GMB competitive insight battles",
        ],
        src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85",
      },
      {
        title: "Google My Business",
        level: "Authority",
        items: [
          "High DA backlinks pointing to GMB",
          "Local PR mentions",
          "Brand searches growth strategy",
          "Rich media uploads (videos, carousels)",
        ],
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },
];

// Flattened list of 12 total image slides (3 slides per program)
const ALL_SLIDES = PROGRAMS.flatMap((program, programIdx) =>
  program.images.map((img, imgIdx) => ({
    ...img,
    programIdx,
    subIdx: imgIdx,
    program,
  }))
);

// Each transition resizes two rounded frames. It does not translate a tall track.
const clamp01 = (value) => Math.max(0, Math.min(1, value));
const HOLD = 0.55;
const END = 0.95;
function getImagePosition(progress) {
  const value = clamp01(progress) * ALL_SLIDES.length;
  const index = Math.min(ALL_SLIDES.length - 1, Math.floor(value));
  if (index === ALL_SLIDES.length - 1) return index;
  const t = clamp01((value - index - HOLD) / (END - HOLD));
  return index + t * t * (3 - 2 * t);
}

function ImageFrame({ position, index, viewportHeight, children }) {
  const top = useTransform(position, (value) => {
    const incoming = clamp01(index - value);
    const gap = incoming > 0 && incoming < 1 ? 8 * Math.sin(Math.PI * incoming) : 0;
    return `calc(${incoming * 100}% + ${gap / 2}px)`;
  });
  const height = useTransform(position, (value) => {
    const visible = clamp01(1 - Math.abs(value - index));
    const gap = visible > 0 && visible < 1 ? 8 * Math.sin(Math.PI * visible) : 0;
    return `max(0px, calc(${visible * 100}% - ${gap / 2}px))`;
  });
  const display = useTransform(position, (value) => Math.abs(value - index) >= 1 ? 'none' : 'block');
  const [interactive, setInteractive] = useState(index === 0);
  useMotionValueEvent(position, 'change', (value) => {
    const base = Math.floor(value);
    setInteractive(index === base + (value - base >= 0.72 ? 1 : 0));
  });
  return <motion.div
    aria-hidden={!interactive}
    inert={!interactive}
    style={{ top, height, display, pointerEvents: interactive ? 'auto' : 'none', '--image-panel-height': `${viewportHeight}px` }}
    className="absolute left-0 w-full overflow-hidden rounded-3xl lg:rounded-[32px] bg-[#101c38] border-2 border-[#DEE2E6]/30 shadow-[0_20px_50px_rgba(36,62,118,0.25)]"
  >{children}</motion.div>;
}

export default function MorphScrollSection() {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const imageViewportRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const node = imageViewportRef.current;
    if (!node) return;
    const measure = () => setViewportHeight(node.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Scroll Progress across 700vh pinned sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    restDelta: 0.001,
  });

  const animationProgress = reducedMotion ? scrollYProgress : smoothProgress;
  const imagePosition = useTransform(animationProgress, getImagePosition);

  // Update the text when the incoming frame occupies most of the viewport.
  useMotionValueEvent(imagePosition, "change", (value) => {
    const base = Math.floor(value);
    const next = Math.min(ALL_SLIDES.length - 1, base + (value - base >= 0.72 ? 1 : 0));
    setActiveSlide((previous) => previous === next ? previous : next);
  });

  const currentSlide = ALL_SLIDES[activeSlide] || ALL_SLIDES[0];
  const activeProgramIndex = currentSlide.programIdx ?? 0;
  const currentProgram = PROGRAMS[activeProgramIndex] || PROGRAMS[0];

  const handleProgramClick = (programIndex) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const targetFraction = (programIndex * 3) / ALL_SLIDES.length + 0.01;
    const targetScroll =
      containerTop + targetFraction * (containerHeight - windowHeight);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const handleEnquire = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[650vh] bg-[#f7f8fa] text-[#243e76] select-none"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* STICKY 100VH VIEWPORT                                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center px-4 sm:px-8 lg:px-12 select-none bg-[#f7f8fa]">
        <div className="w-full max-w-[1380px] h-full flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between py-4 lg:py-8">

          {/* ───────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN (≈ 35% Width - Sticky Editorial Info)         */}
          {/* ───────────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[36%] h-full flex flex-col justify-between py-4 lg:py-6 shrink-0 z-20">

            {/* TOP: Dynamic Headline */}
            <div>
              <div className="min-h-[90px] sm:min-h-[115px] flex items-start">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={activeProgramIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold tracking-tight leading-[1.18] text-[#243e76] whitespace-pre-line"
                    style={{ fontFamily: "'Varela Round', sans-serif" }}
                  >
                    {currentProgram.topHeading}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            {/* MIDDLE: 4 Navigation Items */}
            <div className="flex flex-col space-y-2.5 sm:space-y-3 my-3 lg:my-0 items-start">
              {PROGRAMS.map((prog, index) => {
                const isActive = activeProgramIndex === index;

                return (
                  <button
                    key={prog.id}
                    onClick={() => handleProgramClick(index)}
                    className="flex items-center gap-2.5 text-left group cursor-pointer transition-all duration-200"
                    style={{ fontFamily: "'Varela Round', sans-serif" }}
                  >
                    {/* Brand Teal Radio Dot - Only on the active point */}
                    {isActive && (
                      <motion.div
                        layoutId="programRadioClean"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        className="w-3.5 h-3.5 rounded-full bg-[#0481a2]/20 border-2 border-[#0481a2] flex items-center justify-center shrink-0"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0481a2]" />
                      </motion.div>
                    )}

                    {/* Label */}
                    <span
                      className={`text-sm sm:text-[15px] tracking-tight transition-all duration-200 ${
                        isActive
                          ? "text-[#0481a2] font-bold"
                          : "text-[#243e76]/60 font-medium hover:text-[#243e76]"
                      }`}
                    >
                      {prog.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* BOTTOM LEFT: Active State Title + Description */}
            <div className="min-h-[85px] sm:min-h-[95px] flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProgramIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1.5"
                  style={{ fontFamily: "'Varela Round', sans-serif" }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-[#243e76] tracking-tight leading-snug">
                    {currentProgram.heading}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#243e76]/70 leading-relaxed max-w-md">
                    {currentProgram.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* ───────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: PINNED VIEWPORT WITH COMPACT FRAME REVEALS  */}
          {/* ───────────────────────────────────────────────────────── */}
          <div
            ref={imageViewportRef}
            className="w-full lg:w-[62%] h-[68vh] sm:h-[75vh] lg:h-[78vh] shrink-0 relative overflow-hidden"
          >

            {/* ─────────────────────────────────────────────────────── */}
            {/* INDEPENDENT RESIZING IMAGE FRAMES                       */}
            {/* ─────────────────────────────────────────────────────── */}
            <div className="relative w-full h-full">
              {ALL_SLIDES.map((slide, index) => (
                <ImageFrame key={index} index={index} position={imagePosition} viewportHeight={viewportHeight}>
                  {/* LAYER 1: Background Image */}
                  <img
                    src={slide.src}
                    alt={slide.title || "Visual"}
                    className="w-full h-full object-cover select-none pointer-events-none absolute inset-0 z-0 brightness-95"
                  />

                  {/* LAYER 2: Deep Navy Glassmorphic Overlay */}
                  <div className="absolute inset-0 bg-[#101c38]/80 backdrop-blur-[2px] z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101c38]/95 via-[#243e76]/50 to-[#101c38]/40 z-10 pointer-events-none" />
                  <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#0481a2]/25 rounded-full blur-3xl z-10 pointer-events-none" />

                  {/* LAYER 3: Content Overlay */}
                  <div
                    style={{ height: viewportHeight ? 'var(--image-panel-height)' : '100%', fontFamily: "'Varela Round', sans-serif" }}
                    className="relative z-20 w-full p-5 sm:p-7 lg:p-8 flex flex-col justify-between"
                  >

                    {/* Top: Title & Level Badge */}
                    {slide.title ? (
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-full bg-[#0481a2] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                            {slide.level}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                          {slide.title}
                        </h3>
                      </div>
                    ) : (
                      <div />
                    )}

                    {/* Middle: Bullet Checklist */}
                    {slide.items && (
                      <div className="my-auto py-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[38vh] overflow-y-auto pr-2 custom-scrollbar">
                          {slide.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#243e76]/50 border border-[#DEE2E6]/25 hover:border-[#0481a2]/60 hover:bg-[#243e76]/70 backdrop-blur-md transition-all duration-200 shadow-xs"
                            >
                              <CheckIcon />
                              <span className="text-xs sm:text-[12.5px] text-white/95 font-medium leading-snug">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom: ENQUIRE NOW Button */}
                    <div className="pt-2 flex items-center justify-end w-full">
                      <button
                        onClick={handleEnquire}
                        className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#0481a2] hover:bg-[#036c88] active:scale-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_8px_25px_rgba(4,129,162,0.4)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(4,129,162,0.6)] hover:scale-105 cursor-pointer"
                        style={{ fontFamily: "'Varela Round', sans-serif" }}
                      >
                        <span>Enquire Now</span>
                        <svg
                          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>

                  </div>
                </ImageFrame>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

