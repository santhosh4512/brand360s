"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ────────────────────────────────────────────────────────────────────────
   Crescent — an arc carousel. Nine portraits ride a downward cosine arc;
   the one nearest the centre swells largest and LIFTS above the curve while
   its neighbours shrink and droop away to either side.
   ──────────────────────────────────────────────────────────────────────── */

const SLIDE_COUNT = 9;
const SCROLL_LERP = 0.06;

// ── Carousel images (9 portraits from project assets / Unsplash fallbacks) ──
const DEFAULT_SLIDE_SOURCES = [
  "/images/process_step1.jpg",
  "/images/process_step2.jpg",
  "/images/process_step3.jpg",
  "/images/process_step4.jpg",
  "/images/process_step5.jpg",
  "/images/seo-analytics-hero.jpg",
  "/images/seo-comparison-hero.jpg",
  "/images/seo-growth-hero.jpg",
  "/images/brand-story-writing.webp",
];

const DEFAULT_SLIDE_TITLES = [
  "Local Businesses (Velachery, Porur)",
  "Ecommerce Brands",
  "Service-Based Businesses",
  "Startups",
  "Healthcare",
  "Retail",
  "Education",
  "B2B & Multi-Location Brands",
  "Chennai Service Providers",
];

export interface CrescentArcProps {
  sources?: string[];
  titles?: string[];
}

export default function CrescentArc({
  sources = DEFAULT_SLIDE_SOURCES,
  titles = DEFAULT_SLIDE_TITLES,
}: CrescentArcProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const REPEAT = 3;
  const TOTAL_COUNT = sources.length * REPEAT;

  useEffect(() => {
    const container = containerRef.current;
    const sliderContainer = sliderRef.current;
    const titleDisplay = titleRef.current;
    const slideElements = slidesRef.current;
    if (!container || !sliderContainer || !titleDisplay) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowCenterX = windowWidth / 2;
    let arcBaselineY = windowHeight * 0.50;

    const getLayout = () => {
      const isMobile = windowWidth < 768;
      const baseWidth = isMobile
        ? Math.min(200, windowWidth * 0.52)
        : Math.min(270, windowWidth * 0.18, windowHeight * 0.32);
      const baseHeight = baseWidth * 1.35;
      // 50% slideGap ratio ensures continuous tight card overlap/join
      const slideGap = baseWidth * 0.52;
      const arcDepth = isMobile ? 90 : Math.min(160, windowHeight * 0.18);
      const centerLift = isMobile ? 45 : Math.min(80, windowHeight * 0.09);
      const trackWidth = TOTAL_COUNT * slideGap;
      return { baseWidth, baseHeight, slideGap, arcDepth, centerLift, trackWidth };
    };

    function computeSlideTransform(slideIndex: number, scrollOffset: number) {
      const { baseWidth, baseHeight, slideGap, arcDepth, centerLift, trackWidth } =
        getLayout();

      let wrappedOffsetX =
        (((slideIndex * slideGap - scrollOffset) % trackWidth) + trackWidth) %
        trackWidth;
      if (wrappedOffsetX > trackWidth / 2) wrappedOffsetX -= trackWidth;

      const slideCenterX = windowCenterX + wrappedOffsetX;
      const normalizedDist =
        (slideCenterX - windowCenterX) / (windowWidth * 0.52);
      const absDist = Math.min(Math.abs(normalizedDist), 1.35);

      const scaleFactor = Math.max(1 - absDist * 0.52, 0.48);
      const scaledWidth = baseWidth * scaleFactor;
      const scaledHeight = baseHeight * scaleFactor;

      const clampedDist = Math.min(absDist, 1);
      const arcDropY = (1 - Math.cos(clampedDist * Math.PI)) * 0.5 * arcDepth;
      const centerLiftY = Math.max(1 - absDist * 1.8, 0) * centerLift;

      return {
        x: slideCenterX - scaledWidth / 2,
        y: arcBaselineY - scaledHeight / 2 + arcDropY - centerLiftY,
        width: scaledWidth,
        height: scaledHeight,
        zIndex: Math.round((1 - absDist) * 100),
        distanceFromCenter: Math.abs(wrappedOffsetX),
      };
    }

    function layoutSlides(scrollOffset: number) {
      slideElements.forEach((slideEl, i) => {
        if (!slideEl) return;
        const { x, y, width, height, zIndex } = computeSlideTransform(
          i,
          scrollOffset,
        );
        slideEl.style.transform = `translate(${x}px, ${y}px)`;
        slideEl.style.width = `${width}px`;
        slideEl.style.height = `${height}px`;
        slideEl.style.zIndex = String(zIndex);
      });
    }

    let activeSlideIndex = -1;
    function syncActiveTitle(scrollOffset: number) {
      let closestIndex = 0;
      let closestDist = Infinity;
      slideElements.forEach((_, i) => {
        const { distanceFromCenter } = computeSlideTransform(i, scrollOffset);
        if (distanceFromCenter < closestDist) {
          closestDist = distanceFromCenter;
          closestIndex = i;
        }
      });
      const realIndex = closestIndex % titles.length;
      if (realIndex !== activeSlideIndex) {
        activeSlideIndex = realIndex;
        titleDisplay!.textContent = titles[realIndex] || titles[0];
      }
    }

    // Reduced motion: a single calm centred frame, no scroll handlers, no loop.
    if (reduce) {
      layoutSlides(0);
      syncActiveTitle(0);
      return;
    }

    layoutSlides(0);
    syncActiveTitle(0);

    let scrollTarget = 0;
    let scrollCurrent = 0;
    const AUTO_GLIDE_SPEED = 0.95;

    let isDragging = false;
    let dragStartX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      dragStartX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const deltaX = dragStartX - clientX;
      scrollTarget += deltaX * 0.7;
      dragStartX = clientX;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    sliderContainer.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    sliderContainer.addEventListener("touchstart", onPointerDown, { passive: true });
    sliderContainer.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    let rafId = 0;
    function animate() {
      // Continuous smooth automatic flow
      if (!isDragging) {
        scrollTarget += AUTO_GLIDE_SPEED;
      }
      scrollCurrent += (scrollTarget - scrollCurrent) * SCROLL_LERP;
      layoutSlides(scrollCurrent);
      syncActiveTitle(scrollCurrent);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    const onResize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
      windowCenterX = windowWidth / 2;
      arcBaselineY = windowHeight * 0.50;
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    // Pin precisely for 2 wheel scrolls (0.75x screen height) then release to next section
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${window.innerHeight * 0.75}`,
        pin: true,
        anticipatePin: 1,
      });
    }, container);

    return () => {
      sliderContainer.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      sliderContainer.removeEventListener("touchstart", onPointerDown);
      sliderContainer.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [titles]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#060b16] overflow-hidden">
      <section className="kxc-stage">
        <style>{CSS}</style>

        {/* Top Section Header */}
        <div className="kxc-header">
          <h2 className="kxc-heading">Industries We Serve</h2>
        </div>

        <div className="kxc-slider" ref={sliderRef}>
          {Array.from({ length: TOTAL_COUNT }).map((_, i) => {
            const src = sources[i % sources.length];
            const title = titles[i % titles.length];
            return (
              <div
                key={i}
                className="kxc-slide"
                ref={(el) => {
                  slidesRef.current[i] = el;
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={title || `Slide ${i + 1}`} draggable={false} />
              </div>
            );
          })}
          <p className="kxc-slide-title" ref={titleRef}>
            {titles[0]}
          </p>
        </div>
      </section>
    </div>
  );
}

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Varela+Round&display=swap");

.kxc-stage {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  height: 100dvh;
  overflow: hidden;
  background:
    radial-gradient(130% 120% at 50% 18%, #101c38 0%, #0c152a 52%, #060b16 100%);
  color: #ffffff;
  font-family: 'Outfit', 'Varela Round', sans-serif;
  cursor: grab;
  user-select: none;
}
.kxc-stage:active { cursor: grabbing; }

.kxc-header {
  position: absolute;
  top: clamp(20px, 4.5vh, 44px);
  left: 0;
  right: 0;
  text-align: center;
  z-index: 250;
  pointer-events: none;
  padding: 0 1rem;
}

.kxc-heading {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 4.2vw, 3.8rem);
  letter-spacing: -0.025em;
  color: #ffffff;
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.7);
}

.kxc-slider {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  touch-action: none;
}

.kxc-slide {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform, width, height;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 35px 80px -20px rgba(0, 0, 0, 0.85),
    0 0 0 1.5px rgba(255, 255, 255, 0.15);
  transition: box-shadow 0.3s ease;
}
.kxc-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

.kxc-slide-title {
  position: absolute;
  bottom: clamp(20px, 5vh, 44px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: clamp(1.4rem, 2.6vw, 2.4rem);
  letter-spacing: -0.02em;
  white-space: nowrap;
  color: #ffffff;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.8), 0 0 40px rgba(4, 129, 162, 0.4);
}

@media (prefers-reduced-motion: reduce) {
  .kxc-stage { cursor: default; }
}
`;
