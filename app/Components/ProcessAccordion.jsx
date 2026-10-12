"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Process items matching Brand 360s SEO industry specializations
 */
const DEFAULT_PROCESSES = [
  {
    number: "01",
    title: "Healthcare clinics (Velachery)",
    description: "Trust-first local SEO",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop",
    fallbackImage: "/cideos/1.png",
    avatars: [
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    number: "02",
    title: "Retail showrooms (Porur)",
    description: "Footfall-driving Maps visibility",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    fallbackImage: "/cideos/2.png",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    number: "03",
    title: "Educational institutions (Anna Nagar)",
    description: "Admissions-focused search intent",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    fallbackImage: "/cideos/3.png",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    number: "04",
    title: "Ecommerce brands",
    description: "Product and category-level SEO",
    image:
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1600&auto=format&fit=crop",
    fallbackImage: "/cideos/4.png",
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    ],
  },
  {
    number: "05",
    title: "B2B suppliers",
    description: "Authority and technical SEO over volume keywords",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    fallbackImage: "/cideos/1.png",
    avatars: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    ],
  },
];

/**
 * Slide-up sheet transition variants
 * Entering image slides up from bottom (y: 100% -> 0%) directly over the outgoing image.
 */
const slideSheetVariants = {
  enter: (direction) => ({
    y: direction >= 0 ? "100%" : "-100%",
    scale: 1.04,
    opacity: 1,
    zIndex: 10,
  }),
  center: {
    y: "0%",
    scale: 1,
    opacity: 1,
    zIndex: 10,
    transition: {
      y: { duration: 0.72, ease: [0.32, 0.72, 0, 1] },
      scale: { duration: 0.75, ease: [0.32, 0.72, 0, 1] },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction) => ({
    y: direction >= 0 ? "-15%" : "15%",
    scale: 0.95,
    opacity: 0.4,
    zIndex: 1,
    transition: {
      y: { duration: 0.72, ease: [0.32, 0.72, 0, 1] },
      scale: { duration: 0.72, ease: [0.32, 0.72, 0, 1] },
      opacity: { duration: 0.45 },
    },
  }),
};

/**
 * ProcessAccordion Component in Brand 360s Theme
 *
 * @param {Object} [props]
 * @param {Array} [props.items] - Array of process accordion items
 * @param {string} [props.className] - Container CSS classes
 */
export default function ProcessAccordion({
  items = DEFAULT_PROCESSES,
  className = "",
} = {}) {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imgErrors, setImgErrors] = useState({});

  const [lastActiveIndex, setLastActiveIndex] = useState(0);

  // GSAP ScrollTrigger Pinning: Locks the screen while scrolling through 1 -> 2 -> 3 -> 4 -> 5
  useEffect(() => {
    if (!containerRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      const totalSteps = items.length;
      const scrollDistance = totalSteps * 650;

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: containerRef.current,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const calculatedStep = Math.min(
            Math.floor(progress * totalSteps),
            totalSteps - 1
          );

          setActiveIndex((prev) => {
            if (prev !== calculatedStep && calculatedStep >= 0) {
              setDirection(calculatedStep > (prev ?? 0) ? 1 : -1);
              setLastActiveIndex(calculatedStep);
              return calculatedStep;
            }
            return prev;
          });
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [items.length]);

  // Click / Touch toggle handler: if open -> closes; if closed -> opens
  const handleSelect = (idx) => {
    if (idx === activeIndex) {
      // Toggle collapse/close
      setActiveIndex(null);
    } else {
      // Toggle expand/open
      setDirection(lastActiveIndex !== null && idx > lastActiveIndex ? 1 : -1);
      setActiveIndex(idx);
      setLastActiveIndex(idx);
    }
  };

  const currentItem =
    activeIndex !== null ? items[activeIndex] : (items[lastActiveIndex] || items[0]);

  return (
    <div ref={triggerRef} className={`w-full bg-[#f8fafc] text-[#133863] ${className}`}>
      {/* Pinned Screen Viewport (100vh) */}
      <section
        ref={containerRef}
        className="w-full h-screen min-h-[700px] flex flex-col justify-center px-4 sm:px-8 lg:px-14 py-6 sm:py-8 overflow-hidden relative bg-[#ffffff]"
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-between h-full max-h-[92vh]">
          {/* TOP SECTION: Animated Brand 360s Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            className="mb-4 sm:mb-6 lg:mb-8 text-center max-w-4xl mx-auto flex flex-col items-center select-none"
          >
            {/* Animated Headline with Staggered Word Reveal */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#133863] leading-[1.2] flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1">
              {[
                { text: "Why", highlight: false },
                { text: "Chennai", highlight: false },
                { text: "Businesses", highlight: false },
                { text: "Choose", highlight: false },
                { text: "Brand 360s", highlight: true },
                { text: "for", highlight: false },
                { text: "SEO", highlight: true },
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
                        ? "text-[#0077b6] font-extrabold drop-shadow-sm"
                        : "text-[#133863]"
                    }`}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Subtitle with Blur & Fade Up Animation */}
            <motion.p
              variants={{
                hidden: { y: 16, opacity: 0, filter: "blur(8px)" },
                visible: {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.8,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="mt-3 text-sm sm:text-base md:text-lg text-[#475569] font-normal leading-relaxed max-w-2xl"
            >
              16+ years across categories means we&apos;re not learning your industry from scratch:
            </motion.p>

            {/* Subtle Expanding Accent Line */}
            <motion.div
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: {
                  width: "80px",
                  opacity: 1,
                  transition: {
                    duration: 0.9,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="h-[3px] bg-gradient-to-r from-transparent via-[#0077b6] to-transparent mt-3.5 rounded-full"
            />
          </motion.div>

          {/* MAIN TWO-COLUMN GRID (Content + Image) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center flex-1 min-h-0">
            {/* LEFT COLUMN: Accordion Items */}
            <div className="lg:col-span-6 flex flex-col justify-start -translate-y-3 sm:-translate-y-5 lg:-translate-y-8">
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={item.number || idx}
                    className="flex flex-col border-b border-slate-200/90 last:border-b-0"
                  >
                    {/* Header button row */}
                    <button
                      type="button"
                      onClick={() => handleSelect(idx)}
                      className="w-full text-left py-4 sm:py-5 flex items-center justify-between gap-4 outline-none select-none group transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-4 sm:gap-5">
                        <span
                          className={`text-base sm:text-lg font-mono font-medium transition-colors duration-300 ${
                            isActive
                              ? "text-[#0077b6] font-bold"
                              : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        >
                          {item.number}
                        </span>
                        <h3
                          className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                            isActive
                              ? "text-[#133863]"
                              : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key={`content-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.3, delay: 0.05 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.15 },
                            },
                          }}
                          className="overflow-hidden pl-8 sm:pl-9 pr-2 pb-5"
                        >
                          {/* Description */}
                          <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed max-w-lg mb-4">
                            {item.description}
                          </p>

                          {/* Optional Avatars Thumbnail Row */}
                          {item.avatars && item.avatars.length > 0 && (
                            <div className="flex items-center gap-2 pt-1 pb-1">
                              {item.avatars.map((avUrl, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden ring-2 ring-white shadow-md bg-slate-200 shrink-0"
                                >
                                  <img
                                    src={avUrl}
                                    alt="avatar preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Tall Rounded Image Card with Slide-Up Sheet Transition */}
            <div className="lg:col-span-6 w-full flex items-center lg:items-start justify-center">
              <div className="relative w-full -translate-y-1 sm:-translate-y-2 lg:-translate-y-3 h-[50vh] sm:h-[55vh] lg:h-[58vh] max-h-[580px] min-h-[380px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-100 border border-slate-200/90 shadow-xl shadow-slate-200/90 ring-1 ring-slate-900/5">
                <AnimatePresence custom={direction} mode="sync">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideSheetVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full overflow-hidden"
                  >
                    <img
                      src={
                        imgErrors[activeIndex]
                          ? currentItem.fallbackImage || currentItem.image
                          : currentItem.image
                      }
                      onError={() => {
                        setImgErrors((prev) => ({ ...prev, [activeIndex]: true }));
                      }}
                      alt={currentItem.title}
                      className="w-full h-full object-cover object-center select-none"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
