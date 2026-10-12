"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const RED_VIDEO =
  "https://videos.pexels.com/video-files/35897922/15226325_1920_1080_24fps.mp4";

const AUDIENCE_ITEMS = [
  {
    id: "01",
    number: "01",
    name: "Startup Founders",
    media: "image",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
    position: "50% 30%",
    theme: "navy",
  },
  {
    id: "02",
    number: "02",
    name: "CEOs and Business Leaders",
    media: "image",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=85",
    position: "50% 25%",
    theme: "light",
  },
  {
    id: "03",
    number: "03",
    name: "Consultants and Coaches",
    media: "video",
    src: RED_VIDEO,
    position: "50% 50%",
    theme: "navy",
  },
  {
    id: "04",
    number: "04",
    name: "Industry Experts",
    media: "image",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1400&q=85",
    position: "50% 35%",
    theme: "light",
  },
  {
    id: "05",
    number: "05",
    name: "Corporate Executives",
    media: "image",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=85",
    position: "50% 28%",
    theme: "navy",
  },
  {
    id: "06",
    number: "06",
    name: "Entrepreneurs Building Personal Authority",
    media: "image",
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=85",
    position: "50% 32%",
    theme: "light",
  },
];

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function rowHeight(distance, scale) {
  return (112 + 340 / (1 + 1.45 * distance * distance)) * scale;
}

function trackY(relative, scale) {
  return (119 * relative + 269 * Math.atan(1.2 * relative)) * scale;
}

function Media({ item, time }) {
  if (item.media === "video") {
    return (
      <video
        className="epl-media-el epl-video"
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      className="epl-media-el"
      src={item.src}
      alt={item.name}
      draggable="false"
      style={{ objectPosition: item.position || "50% 50%" }}
    />
  );
}

export default function EditorialPortfolioLoop({ className = "" }) {
  const containerRef = useRef(null);
  const rootRef = useRef(null);
  const rafRef = useRef(0);
  const targetRef = useRef(0);
  const posRef = useRef(0);
  const velRef = useRef(0);
  const lastTimeRef = useRef(0);
  const startRef = useRef(0);
  const reducedRef = useRef(false);

  const [view, setView] = useState(() => ({
    pos: 0,
    time: 0,
    velocity: 0,
    width: typeof window === "undefined" ? 720 : window.innerWidth,
    height: typeof window === "undefined" ? 1280 : window.innerHeight,
  }));

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    reducedRef.current = Boolean(mq?.matches);

    const onResize = () =>
      setView((v) => ({ ...v, width: window.innerWidth, height: window.innerHeight }));
    window.addEventListener("resize", onResize);

    // Preload image assets
    AUDIENCE_ITEMS.forEach((item) => {
      if (item.media === "image" && item.src) {
        const img = new Image();
        img.decoding = "async";
        img.src = item.src;
      }
    });

    // Scroll progress mapping
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const rawProgress = -rect.top / totalScroll;
      const progress = clamp(rawProgress, 0, 1);

      // Maps scroll progress to target index (0 to 5)
      targetRef.current = progress * (AUDIENCE_ITEMS.length - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Physics Animation Loop
    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = clamp((now - lastTimeRef.current) / 1000, 0.001, 0.034);
      lastTimeRef.current = now;
      const elapsed = (now - startRef.current) / 1000;

      if (reducedRef.current) {
        posRef.current = targetRef.current;
        velRef.current = 0;
      } else {
        const displacement = targetRef.current - posRef.current;
        const acceleration = displacement * 140 - velRef.current * 22;
        velRef.current += acceleration * dt;
        posRef.current += velRef.current * dt;
      }

      setView((v) => ({
        ...v,
        pos: posRef.current,
        time: elapsed,
        velocity: velRef.current,
      }));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToItem = (index) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScroll = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (AUDIENCE_ITEMS.length - 1)) * totalScroll;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const scale = clamp(Math.min(view.width / 720, view.height / 1280), 0.5, 1.05);
  const centerY = view.height / 2;
  const activeIndex = clamp(Math.round(view.pos), 0, AUDIENCE_ITEMS.length - 1);
  const activeItem = AUDIENCE_ITEMS[activeIndex] || AUDIENCE_ITEMS[0];
  const isNavy = activeItem.theme === "navy";

  // Bold, Large Uniform Editorial Typography Sizing for ALL 6 items
  const titleSize = clamp(Math.min(view.width * 0.088, view.height * 0.12), 42, 105);
  const cardBaseWidth = 410 * scale;

  // Header fades out smoothly as scroll moves away from initial position
  const headerOpacity = clamp(1 - (view.pos / 0.65), 0, 1);
  const headerTranslateY = (1 - headerOpacity) * -30;
  const headerScale = 0.95 + 0.05 * headerOpacity;

  // Render surrounding rows
  const rows = useMemo(() => {
    const list = [];
    const minVirtual = Math.max(0, Math.floor(view.pos) - 4);
    const maxVirtual = Math.min(AUDIENCE_ITEMS.length - 1, Math.floor(view.pos) + 4);

    for (let virtual = minVirtual; virtual <= maxVirtual; virtual += 1) {
      list.push({ virtual, item: AUDIENCE_ITEMS[virtual] });
    }
    return list;
  }, [Math.floor(view.pos)]);

  return (
    <div
      ref={containerRef}
      className={`epl-container relative w-full ${className}`}
      style={{ height: "550vh" }}
    >
      <div
        ref={rootRef}
        className={`epl-root sticky top-0 ${isNavy ? "is-navy" : "is-light"}`}
        aria-label="Target audience showcase scroll section"
      >
        <style>{STYLES}</style>

        {/* SECTION HEADER (SMOOTHLY FADES OUT & DISAPPEARS AS USER SCROLLS) */}
        <header
          className="epl-header"
          style={{
            opacity: headerOpacity,
            transform: `translateX(-50%) translateY(${headerTranslateY}px) scale(${headerScale})`,
            pointerEvents: headerOpacity < 0.05 ? "none" : "auto",
            visibility: headerOpacity <= 0 ? "hidden" : "visible",
          }}
        >
          <div className="epl-eyebrow">
            <span className="epl-eyebrow-dot" />
            <span>TARGET AUDIENCE</span>
          </div>
          <h2 className="epl-main-heading">
            Who Benefits From Executive PR?
          </h2>
          <p className="epl-subtitle">
            Executive PR helps professionals strengthen visibility, credibility and industry recognition through strategic media exposure and reputation-building initiatives.
          </p>
        </header>

        {/* UNIFORM SAME-SIZE EDITORIAL TITLE (ALL 6 POINTS HAVE IDENTICAL FONT SIZE) */}
        <div
          className="epl-title"
          style={{
            fontSize: `${titleSize}px`,
            letterSpacing: `${-titleSize * 0.04}px`,
          }}
          aria-hidden="true"
        >
          {activeItem.name}
        </div>

        {/* FOREGROUND 3D STACK STAGE (PASSES OVER THE HEADING) */}
        <div className="epl-stage" aria-hidden="true">
          {rows.map(({ virtual, item }) => {
            const relative = virtual - view.pos;
            const distance = Math.abs(relative);
            const height = rowHeight(distance, scale);
            const y = centerY + trackY(relative, scale);
            const top = y - height / 2;
            const mediaHeight = Math.max(48 * scale, height - 50 * scale);
            const shrink = 0.915 + 0.085 / (1 + 0.7 * distance * distance);
            const mediaWidth = cardBaseWidth * shrink;
            const active = virtual === activeIndex;
            const rotateX = clamp(relative * -1.4 + view.velocity * -0.06, -4.5, 4.5);
            const rotateY = Math.sin(virtual * 1.73) * 0.85 + clamp(view.velocity * 0.025, -0.7, 0.7);
            const rotateZ = Math.sin(virtual * 2.11) * 0.32 + clamp(view.velocity * -0.018, -0.5, 0.5);

            return (
              <div
                key={virtual}
                className={`epl-row ${active ? "is-active" : ""}`}
                style={{
                  top,
                  height,
                  "--media-top": `${24 * scale}px`,
                }}
                onClick={() => scrollToItem(virtual)}
              >
                <div
                  className="epl-media"
                  style={{
                    width: mediaWidth,
                    height: mediaHeight,
                    transform: `translateX(-50%) perspective(${950 * scale}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
                  }}
                >
                  <Media item={item} time={view.time} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const STYLES = `
  @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Varela+Round&display=swap");

  .epl-container {
    position: relative;
    width: 100%;
  }

  .epl-root,
  .epl-root * { box-sizing: border-box; }

  .epl-root {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    min-height: 540px;
    overflow: hidden;
    isolation: isolate;
    user-select: none;
    background: #DEE2E6;
    color: #243e76;
    font-family: 'Varela Round', sans-serif;
    transition: background 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 10;
  }

  /* BRAND NAVY THEME (#243e76 Background, #DEE2E6 Text & Highlights) */
  .epl-root.is-navy {
    background: #243e76;
    color: #DEE2E6;
  }

  /* BRAND LIGHT THEME (#DEE2E6 Background, #243e76 Text) */
  .epl-root.is-light {
    background: #DEE2E6;
    color: #243e76;
  }

  /* SECTION HEADER */
  .epl-header {
    position: absolute;
    top: 24px;
    left: 50%;
    width: calc(100% - 48px);
    max-width: 860px;
    text-align: center;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    will-change: opacity, transform;
    transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .epl-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-family: 'Outfit', sans-serif;
    color: #0481a2;
    white-space: nowrap;
    transition: color 0.6s ease;
  }

  .is-navy .epl-eyebrow {
    color: #DEE2E6;
  }

  .epl-eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
  }

  .epl-main-heading {
    margin: 0;
    font-family: 'Outfit', sans-serif;
    font-size: clamp(20px, 3.2vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: #243e76;
    transition: color 0.6s ease;
  }

  .is-navy .epl-main-heading {
    color: #ffffff;
  }

  .epl-subtitle {
    margin: 0;
    font-family: 'Varela Round', sans-serif;
    font-size: clamp(12px, 1.35vw, 14.5px);
    line-height: 1.5;
    max-width: 680px;
    opacity: 0.88;
    font-weight: 400;
    color: currentColor;
    transition: color 0.6s ease, opacity 0.6s ease;
  }

  .epl-title {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: max-content;
    max-width: none;
    white-space: nowrap;
    text-align: center;
    transform: translate(-50%, -50%);
    font-family: 'Outfit', sans-serif;
    font-weight: 900;
    line-height: 0.9;
    color: currentColor;
    pointer-events: none;
    will-change: transform, opacity;
    text-rendering: geometricPrecision;
    transition: color 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .is-navy .epl-title {
    color: #DEE2E6;
  }

  /* FOREGROUND STAGE & SCROLLING CARDS */
  .epl-stage {
    position: absolute;
    inset: 0;
    z-index: 5;
    overflow: hidden;
    pointer-events: none;
  }

  .epl-row {
    position: absolute;
    z-index: 6;
    left: 0;
    width: 100%;
    border-top: 1px solid rgba(36, 62, 118, 0.15);
    color: inherit;
    pointer-events: auto;
    cursor: pointer;
    transition: border-color 0.6s ease;
  }

  .is-navy .epl-row {
    border-top: 1px solid rgba(222, 226, 230, 0.18);
  }

  .epl-media {
    position: absolute;
    z-index: 7;
    top: var(--media-top);
    left: 50%;
    overflow: hidden;
    background: #DEE2E6;
    border: 1px solid rgba(36, 62, 118, 0.12);
    transform-origin: 50% 50%;
    will-change: width, height, transform;
    backface-visibility: hidden;
    contain: paint;
    box-shadow: 0 20px 45px rgba(36, 62, 118, 0.16);
    border-radius: 8px;
    transition: background 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease;
  }

  .is-navy .epl-media {
    background: #192d59;
    border: 1px solid rgba(222, 226, 230, 0.22);
    box-shadow: 0 24px 55px rgba(10, 20, 48, 0.55);
  }

  .epl-media-el {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.02);
    backface-visibility: hidden;
    transition: filter 0.3s ease;
  }

  .epl-video {
    object-position: 50% 50%;
    filter: saturate(1.15) contrast(1.08);
  }

  @media (prefers-reduced-motion: reduce) {
    .epl-media { transform: translateX(-50%) !important; }
  }
`;
