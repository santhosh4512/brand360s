'use client';

import React, { useEffect, useRef } from "react";

const FULL_QUERY = "Who needs SEO services in Chennai?";
const SEARCH_BG_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop";

const SLIDES = [
  {
    lines: ["Startups", "looking to build", "online visibility"],
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1500&auto=format&fit=crop",
    position: "50% 50%",
    tone: "natural",
    alt: "Startups building online visibility",
  },
  {
    lines: ["Local businesses", 'targeting "near me"', "searches"],
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500&auto=format&fit=crop",
    position: "50% 50%",
    tone: "natural",
    alt: "Local businesses targeting near me searches",
  },
  {
    lines: ["Ecommerce brands", "aiming to increase", "organic sales"],
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1500&auto=format&fit=crop",
    position: "50% 50%",
    tone: "natural",
    alt: "Ecommerce brands increasing organic sales",
  },
  {
    lines: ["Service-based", "businesses generating", "Google leads"],
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1500&auto=format&fit=crop",
    position: "50% 50%",
    tone: "natural",
    alt: "Service-based businesses generating leads",
  },
  {
    lines: ["Companies", "struggling with", "low rankings"],
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1500&auto=format&fit=crop",
    position: "50% 50%",
    tone: "natural",
    alt: "Companies scaling search traffic and rankings",
  },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const mix = (a, b, t) => a + (b - a) * t;
const smoothstep = (t) => t * t * (3 - 2 * t);

function getCardLayout(relativeIndex, mobile) {
  const slots = mobile
    ? [
        { x: 0, w: 0.68, h: 1, opacity: 1 },
        { x: 0.68, w: 0.19, h: 0.73, opacity: 1 },
        { x: 0.87, w: 0.09, h: 0.49, opacity: 0.82 },
        { x: 0.96, w: 0.055, h: 0.31, opacity: 0.5 },
        { x: 1.015, w: 0.03, h: 0.18, opacity: 0 },
      ]
    : [
        { x: 0, w: 0.498, h: 1, opacity: 1 },
        { x: 0.498, w: 0.218, h: 0.86, opacity: 1 },
        { x: 0.716, w: 0.169, h: 0.68, opacity: 0.88 },
        { x: 0.885, w: 0.113, h: 0.47, opacity: 0.68 },
        { x: 0.998, w: 0.065, h: 0.28, opacity: 0 },
      ];

  if (relativeIndex < 0) {
    const t = clamp(-relativeIndex, 0, 1);
    return {
      left: 0,
      top: -1.08 * smoothstep(t),
      width: slots[0].w,
      height: 1,
      opacity: 1 - t,
      zIndex: 60,
      lift: -1.2 * t,
    };
  }

  if (relativeIndex >= slots.length - 1) {
    const last = slots[slots.length - 1];
    return {
      left: last.x,
      top: (1 - last.h) / 2,
      width: last.w,
      height: last.h,
      opacity: 0,
      zIndex: 1,
      lift: 0,
    };
  }

  const low = Math.floor(relativeIndex);
  const high = Math.min(low + 1, slots.length - 1);
  const t = smoothstep(relativeIndex - low);
  const a = slots[low];
  const b = slots[high];
  const h = mix(a.h, b.h, t);

  return {
    left: mix(a.x, b.x, t),
    top: (1 - h) / 2,
    width: mix(a.w, b.w, t),
    height: h,
    opacity: mix(a.opacity, b.opacity, t),
    zIndex: 40 - low,
    lift: 0,
  };
}

export default function KexsioEditorialScroll() {
  const sectionRef = useRef(null);
  const searchStageRef = useRef(null);
  const searchBgRef = useRef(null);
  const searchBarRef = useRef(null);
  const searchTextRef = useRef(null);

  const galleryRef = useRef(null);
  const copyRef = useRef(null);
  const stepBadgeRef = useRef(null);
  const titleSlideRefs = useRef([]);
  const lineRefs = useRef([]);
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    const bgImg = new Image();
    bgImg.src = SEARCH_BG_IMG;

    SLIDES.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let mobile = window.innerWidth <= 860;
    const onResize = () => {
      mobile = window.innerWidth <= 860;
    };
    window.addEventListener("resize", onResize);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let currentRawProgress = 0;
    let targetRawProgress = 0;
    let rafId = 0;
    let prevCharCount = -1;

    const updateDOM = (rawP) => {
      // ──────────────────────────────────────────────
      // 1. SEARCH BAR & BG IMAGE INTRO STAGE (rawP: 0.00 -> 0.44)
      // ──────────────────────────────────────────────
      if (searchStageRef.current && searchBarRef.current && searchTextRef.current) {
        if (rawP < 0.44) {
          searchStageRef.current.style.visibility = "visible";
          searchStageRef.current.style.pointerEvents = "auto";

          // Background image smooth subtle zoom & exit fade
          if (searchBgRef.current) {
            if (rawP <= 0.38) {
              const bgScale = 1.05 - (rawP / 0.38) * 0.03;
              searchBgRef.current.style.opacity = "1";
              searchBgRef.current.style.transform = `scale(${bgScale.toFixed(3)})`;
            } else {
              const exitProgress = clamp((rawP - 0.38) / 0.06, 0, 1);
              searchBgRef.current.style.opacity = String(Math.max(0, 1 - exitProgress));
              searchBgRef.current.style.transform = `scale(${(1.02 - exitProgress * 0.03).toFixed(3)})`;
            }
          }

          // While Section 3 is lifting off (0.00 -> 0.18): Hold stationary and ready
          if (rawP <= 0.18) {
            searchBarRef.current.style.transform = "translate3d(0, 0, 0)";
            searchBarRef.current.style.opacity = "1";
            searchBarRef.current.style.borderColor = "#DEE2E6";
            searchBarRef.current.style.boxShadow = "0 20px 50px rgba(36, 62, 118, 0.18)";
            searchTextRef.current.innerHTML = '<span class="kes-placeholder">Search...</span>';
            prevCharCount = 0;
          } else if (rawP <= 0.34) {
            // Typing simulation (0.18 -> 0.34) — ONLY AFTER Section 3 has lifted off!
            searchBarRef.current.style.transform = "translate3d(0, 0, 0)";
            searchBarRef.current.style.opacity = "1";
            searchBarRef.current.style.borderColor = "#DEE2E6";
            searchBarRef.current.style.boxShadow = "0 20px 50px rgba(36, 62, 118, 0.2)";

            const typeProgress = clamp((rawP - 0.18) / 0.16, 0, 1);
            const charCount = Math.floor(typeProgress * FULL_QUERY.length);

            if (charCount !== prevCharCount) {
              prevCharCount = charCount;
              if (charCount === 0) {
                searchTextRef.current.innerHTML = '<span class="kes-placeholder">Search...</span>';
              } else {
                const typed = FULL_QUERY.slice(0, charCount);
                searchTextRef.current.innerHTML = `<span class="kes-typed">${typed}</span><span class="kes-cursor">|</span>`;
              }
            }
          } else if (rawP <= 0.38) {
            // Settled & highlighted
            searchBarRef.current.style.transform = "translate3d(0, 0, 0)";
            searchBarRef.current.style.opacity = "1";
            searchBarRef.current.style.borderColor = "#0481a2";
            searchBarRef.current.style.boxShadow = "0 22px 60px rgba(4, 129, 162, 0.38)";
            searchTextRef.current.innerHTML = `<span class="kes-typed">${FULL_QUERY}</span><span class="kes-cursor">|</span>`;
          } else {
            // Exit fade & slide up (0.38 -> 0.44)
            const exitProgress = clamp((rawP - 0.38) / 0.06, 0, 1);
            searchBarRef.current.style.transform = `translate3d(0, ${-exitProgress * 35}px, 0)`;
            searchBarRef.current.style.opacity = String(Math.max(0, 1 - exitProgress));
          }
        } else {
          searchStageRef.current.style.visibility = "hidden";
          searchStageRef.current.style.pointerEvents = "none";
          searchBarRef.current.style.opacity = "0";
          if (searchBgRef.current) searchBgRef.current.style.opacity = "0";
        }
      }

      // ──────────────────────────────────────────────
      // 2. EDITORIAL CARDS & CONTENT (ONLY AFTER SEARCH DISAPPEARS: rawP >= 0.44)
      // ──────────────────────────────────────────────
      if (rawP < 0.44) {
        if (galleryRef.current) {
          galleryRef.current.style.opacity = "0";
          galleryRef.current.style.visibility = "hidden";
        }
        if (copyRef.current) {
          copyRef.current.style.opacity = "0";
          copyRef.current.style.visibility = "hidden";
        }
        return;
      }

      // Smooth fade in for cards and copy after search is 100% gone
      const stageFade = clamp((rawP - 0.44) / 0.06, 0, 1);
      if (galleryRef.current) {
        galleryRef.current.style.visibility = "visible";
        galleryRef.current.style.opacity = stageFade.toFixed(3);
      }
      if (copyRef.current) {
        copyRef.current.style.visibility = "visible";
        copyRef.current.style.opacity = stageFade.toFixed(3);
      }

      const cardStageProgress = clamp((rawP - 0.48) / 0.52, 0, 1);
      const p = cardStageProgress * (SLIDES.length - 1);

      // Active Number Indicator (01, 02, 03, 04, 05)
      const activeSegment = Math.min(Math.floor(p + 0.5), SLIDES.length - 1);
      if (stepBadgeRef.current) {
        stepBadgeRef.current.innerText = `0${activeSegment + 1}`;
      }

      SLIDES.forEach((slide, sIdx) => {
        const cardEl = cardRefs.current[sIdx];
        const imgEl = imgRefs.current[sIdx];
        const slideEl = titleSlideRefs.current[sIdx];

        const relative = sIdx - p;
        const dist = Math.abs(relative);

        // Card image positioning
        if (cardEl && imgEl) {
          const layout = getCardLayout(relative, mobile);
          const innerY = clamp(relative, -1, 3) * -2.1 + layout.lift;
          const scale = relative < 0 ? 1.08 + clamp(-relative, 0, 1) * 0.05 : 1.08;

          cardEl.style.left = `${layout.left * 100}%`;
          cardEl.style.top = `${layout.top * 100}%`;
          cardEl.style.width = `${layout.width * 100}%`;
          cardEl.style.height = `${layout.height * 100}%`;
          cardEl.style.opacity = String(layout.opacity * stageFade);
          cardEl.style.zIndex = String(layout.zIndex);
          cardEl.setAttribute("aria-hidden", layout.opacity * stageFade < 0.02 ? "true" : "false");

          imgEl.style.transform = `translate3d(0, ${innerY}%, 0) scale(${scale})`;
        }

        // Kinetic Staggered Masked-Line Reveal (Zero overlap, pure cinematic motion)
        if (slideEl) {
          if (dist > 0.55) {
            slideEl.style.opacity = "0";
            slideEl.style.visibility = "hidden";
          } else {
            slideEl.style.visibility = "visible";
            const masterT = 1 - (dist / 0.55);
            slideEl.style.opacity = (smoothstep(masterT) * stageFade).toFixed(3);

            const lineList = lineRefs.current[sIdx] || [];
            lineList.forEach((lineEl, lIdx) => {
              if (!lineEl) return;
              const delay = lIdx * 0.12;
              const lineT = smoothstep(clamp((masterT - delay) / (1 - delay), 0, 1));

              const yOffset = relative > 0 ? (1 - lineT) * 115 : -(1 - lineT) * 115;
              const rotX = relative > 0 ? (1 - lineT) * 16 : -(1 - lineT) * -16;

              lineEl.style.transform = `translate3d(0, ${yOffset.toFixed(1)}%, 0) rotateX(${rotX.toFixed(1)}deg)`;
            });
          }
        }
      });
    };

    const tick = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScroll = sectionRef.current.offsetHeight - window.innerHeight;

      if (totalScroll > 0) {
        targetRawProgress = clamp(-rect.top / totalScroll, 0, 1);
      }

      if (reduceMotion) {
        currentRawProgress = targetRawProgress;
      } else {
        currentRawProgress += (targetRawProgress - currentRawProgress) * 0.12;
        if (Math.abs(targetRawProgress - currentRawProgress) < 0.0005) {
          currentRawProgress = targetRawProgress;
        }
      }

      updateDOM(currentRawProgress);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <section className="kes-story" ref={sectionRef} aria-label="Who needs SEO in Chennai">
        <div className="kes-stage">
          {/* 1. SEARCH BAR INTRO LAYER (WITH BACKGROUND IMAGE) */}
          <div className="kes-search-stage" ref={searchStageRef}>
            <div className="kes-search-bg-wrap" ref={searchBgRef}>
              <img
                src={SEARCH_BG_IMG}
                alt="SEO Analytics & Strategy Background"
                className="kes-search-bg-img"
              />
              <div className="kes-search-bg-overlay" />
              <div className="kes-search-bg-glow" />
            </div>

            <div className="kes-search-pill" ref={searchBarRef}>
              <div className="kes-search-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#243e76" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <div className="kes-search-text" ref={searchTextRef}>
                <span className="kes-placeholder">Search...</span>
              </div>
              <div className="kes-search-mic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#243e76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* 2. LEFT EDITORIAL COPY (KINETIC STAGGERED MASKED REVEAL) */}
          <div className="kes-copy" ref={copyRef} style={{ opacity: 0 }}>
            <div className="kes-num-indicator">
              <span className="kes-num-text" ref={stepBadgeRef}>
                01
              </span>
            </div>

            <div className="kes-titles-viewport">
              {SLIDES.map((slide, sIdx) => (
                <div
                  key={sIdx}
                  className="kes-title-slide"
                  ref={(el) => {
                    titleSlideRefs.current[sIdx] = el;
                  }}
                  style={{
                    opacity: sIdx === 0 ? 1 : 0,
                    visibility: sIdx === 0 ? "visible" : "hidden",
                  }}
                >
                  <h1 className="kes-title">
                    {slide.lines.map((line, lIdx) => (
                      <div key={lIdx} className="kes-line-clip">
                        <span
                          className="kes-line-inner"
                          ref={(el) => {
                            if (!lineRefs.current[sIdx]) lineRefs.current[sIdx] = [];
                            lineRefs.current[sIdx][lIdx] = el;
                          }}
                        >
                          {line}
                        </span>
                      </div>
                    ))}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          {/* 3. RIGHT EDITORIAL GALLERY */}
          <div className="kes-gallery" ref={galleryRef} style={{ opacity: 0 }} aria-live="polite">
            {SLIDES.map((slide, index) => (
              <figure
                className="kes-card"
                key={slide.src}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{
                  left: "0%",
                  top: "0%",
                  width: "49.8%",
                  height: "100%",
                  opacity: 0,
                  zIndex: 40 - index,
                }}
              >
                <img
                  ref={(el) => {
                    imgRefs.current[index] = el;
                  }}
                  className={slide.tone}
                  src={slide.src}
                  alt={slide.alt}
                  draggable="false"
                  decoding="async"
                  loading="eager"
                  style={{
                    objectPosition: slide.position,
                    transform: "translate3d(0, 0%, 0) scale(1.08)",
                  }}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&family=Manrope:wght@400;500;600;700&display=swap');

.kes-story * { box-sizing: border-box; }

.kes-story {
  --ink: #f0f7ff;
  --paper: #243e76;
  position: relative;
  width: 100%;
  height: 600vh;
  margin-top: -100vh;
  background: #f0f7ff;
  color: #243e76;
  font-family: "Varela Round", sans-serif;
  z-index: 10;
}

.kes-stage {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
  isolation: isolate;
  background: radial-gradient(circle at 60% 40%, #f7faff 0%, #eaf3fd 100%);
}

/* ──────────────── SEARCH STAGE & BG ──────────────── */
.kes-search-stage {
  position: absolute;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.kes-search-bg-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
  will-change: transform, opacity;
}

.kes-search-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: contrast(1.04) brightness(0.96);
}

.kes-search-bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(36, 62, 118, 0.82);
  backdrop-filter: blur(1px);
}

.kes-search-bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(900px, 90vw);
  height: 400px;
  background: rgba(4, 129, 162, 0.28);
  border-radius: 9999px;
  filter: blur(130px);
  pointer-events: none;
}

.kes-search-pill {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 680px;
  height: 76px;
  background: #ffffff;
  border: 1.5px solid #DEE2E6;
  border-radius: 9999px;
  box-shadow: 0 20px 50px rgba(36, 62, 118, 0.18);
  display: flex;
  align-items: center;
  padding: 0 28px;
  gap: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, opacity;
}

.kes-search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kes-search-text {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  font-family: "Varela Round", sans-serif;
  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
  font-weight: 600;
  color: #243e76;
  display: flex;
  align-items: center;
}

.kes-placeholder {
  color: rgba(36, 62, 118, 0.35);
  font-weight: 400;
}

.kes-typed {
  color: #243e76;
}

.kes-cursor {
  color: #0481a2;
  font-weight: 300;
  margin-left: 2px;
  animation: kesBlink 1s infinite;
}

@keyframes kesBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.kes-search-mic {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ──────────────── EDITORIAL COPY (KINETIC MASKED REVEAL) ──────────────── */
.kes-copy {
  position: absolute;
  z-index: 20;
  left: 6vw;
  top: 53%;
  transform: translateY(-50%);
  width: 32vw;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.kes-num-indicator {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.25rem;
}

.kes-num-text {
  font-family: "Varela Round", sans-serif;
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  font-weight: 700;
  color: #0481a2;
  letter-spacing: -0.02em;
  line-height: 1;
}

.kes-titles-viewport {
  position: relative;
  width: 100%;
  min-height: 260px;
  perspective: 1000px;
}

.kes-title-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  will-change: opacity, transform;
}

.kes-title {
  margin: 0;
  color: #243e76;
  font-family: "Varela Round", sans-serif;
  width: 100%;
  font-size: clamp(34px, 3.8vw, 62px);
  font-weight: 400;
  line-height: 1.18;
  letter-spacing: -0.02em;
}

.kes-line-clip {
  overflow: hidden;
  display: block;
  padding: 3px 0;
}

.kes-line-inner {
  display: block;
  transform-origin: 50% 100%;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* ──────────────── EDITORIAL GALLERY ──────────────── */
.kes-gallery {
  position: absolute;
  z-index: 10;
  left: 41vw;
  top: 50%;
  transform: translateY(-50%);
  width: 53vw;
  height: 72vh;
  perspective: 1200px;
  transition: opacity 0.3s ease;
}

.kes-card {
  position: absolute;
  margin: 0;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 20px 45px rgba(36, 62, 118, 0.12), 0 6px 16px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  border: 1px solid rgba(36, 62, 118, 0.08);
  will-change: left, top, width, height, opacity, transform;
  transform: translateZ(0);
  contain: layout paint;
}

.kes-card::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(120deg, rgba(255,255,255,.35), transparent 40%, rgba(0,0,0,.04));
  opacity: .6;
}

.kes-card img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  backface-visibility: hidden;
  will-change: transform;
}
.kes-card img.mono { filter: grayscale(1) contrast(.94) brightness(.91); }
.kes-card img.warm { filter: saturate(.78) sepia(.08) contrast(.96) brightness(.92); }
.kes-card img.muted { filter: saturate(.56) contrast(.93) brightness(.83); }
.kes-card img.natural { filter: contrast(1.02) brightness(.98); }

@media (max-width: 860px) {
  .kes-story { height: 550vh; }
  .kes-stage { min-height: 620px; }
  .kes-search-pill { height: 60px; padding: 0 18px; max-width: 92vw; }
  .kes-copy { left: 20px; top: 12vh; width: calc(100vw - 40px); transform: none; }
  .kes-titles-viewport { min-height: 180px; }
  .kes-title { width: auto; font-size: clamp(28px, 7vw, 46px); line-height: 1.15; letter-spacing: -0.02em; }
  .kes-title span { display: block; }
  .kes-gallery { left: 20px; top: 40vh; width: calc(100vw - 40px); height: 48vh; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .kes-card { transition: none !important; }
  .kes-line-inner { transform: none !important; }
}
`;
