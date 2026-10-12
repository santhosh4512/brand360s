'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";

export interface ReviewItem {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  position?: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 0,
    name: "Ashley Right",
    role: "Creative director",
    quote:
      "Professionals in their craft! Every resource feels considered, polished, and exceptionally easy to use.",
    image:
      "https://images.unsplash.com/photo-1522751707891-45b4e281010d?auto=format&fit=crop&w=1400&q=88",
    position: "50% 42%",
  },
  {
    id: 1,
    name: "Mina Cole",
    role: "Brand designer",
    quote:
      "The visual quality is outstanding—distinctive, thoughtful, and ready to make an idea feel complete.",
    image:
      "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?auto=format&fit=crop&w=1400&q=88",
    position: "50% 42%",
  },
  {
    id: 2,
    name: "Daniel Brandon",
    role: "Independent designer",
    quote: "Used by trusted teams and thousands of designers worldwide.",
    image:
      "https://images.unsplash.com/photo-1768696082567-f3571983a977?auto=format&fit=crop&w=1400&q=88",
    position: "50% 38%",
  },
  {
    id: 3,
    name: "Jacob Jose",
    role: "Studio founder",
    quote:
      "Unlimited, instant access to hundreds of premium-quality resources created by designers, for designers.",
    image:
      "https://images.unsplash.com/photo-1777969381592-614b9c28c2ad?auto=format&fit=crop&w=1400&q=88",
    position: "50% 45%",
  },
  {
    id: 4,
    name: "Noah Ellis",
    role: "Product designer",
    quote:
      "A rare collection where strong art direction and practical usability live side by side.",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=1400&q=88",
    position: "50% 40%",
  },
];

const styles = `
  .epr-scroll-wrapper {
    position: relative;
    width: 100%;
    background: #ffffff;
  }

  .epr-page {
    --paper: #ffffff;
    --ink: #243e76;
    --muted: #64748b;
    --accent: #0481a2;
    --motion: 750ms cubic-bezier(0.22, 1, 0.36, 1);

    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    overflow: hidden;
    background: #ffffff;
    color: var(--ink);
    font-family: 'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }

  .epr-page * {
    box-sizing: border-box;
  }

  .epr-page button {
    color: inherit;
    font: inherit;
  }

  /* Container-query stage */
  .epr-stage {
    container-type: inline-size;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #ffffff;
    isolation: isolate;
  }

  .epr-title {
    position: absolute;
    z-index: 30;
    top: 36.8%;
    left: 22.85%;
    margin: 0;
    transform: rotate(-90deg) translateX(-100%);
    transform-origin: left top;
    font-size: clamp(20px, 1.66cqw, 34px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--ink);
  }

  .epr-deck {
    position: absolute;
    inset: 0;
  }

  .epr-card {
    --left: -16.6%;
    --top: 64.72%;
    --width: 11.46%;
    --height: 21.11%;

    position: absolute;
    z-index: 4;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--height);
    margin: 0;
    padding: 0;
    overflow: visible;
    border: 0;
    border-radius: 4px;
    outline: 0;
    background: #f1f5f9;
    transition:
      left var(--motion),
      top var(--motion),
      width var(--motion),
      height var(--motion);
    will-change: left, top, width, height;
    backface-visibility: hidden;
    transform: translateZ(0);
  }

  .epr-card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: var(--image-position, 50% 50%);
    user-select: none;
    backface-visibility: hidden;
    border-radius: 4px;
    transform: translateZ(0);
    -webkit-user-drag: none;
    transition:
      opacity 300ms ease,
      object-position var(--motion),
      filter 240ms ease;
  }

  .epr-card.hero {
    --left: 37.29%;
    --top: 12.78%;
    --width: 18.44%;
    --height: 72.92%;
    z-index: 12;
    pointer-events: none;
    box-shadow: 0 20px 40px -15px rgba(36, 62, 118, 0.18);
  }

  /* Five fixed positions form one continuous loop */
  .epr-card.thumb-0 { --left: -16.6%; z-index: 2; }
  .epr-card.thumb-1 { --left: -3.13%; }
  .epr-card.thumb-2 { --left: 10.42%; }
  .epr-card.thumb-3 { --left: 23.85%; }

  .epr-card[class*="thumb-"] {
    cursor: pointer;
    box-shadow: 0 8px 24px -6px rgba(36, 62, 118, 0.12);
  }

  .epr-card[class*="thumb-"]:hover img,
  .epr-card[class*="thumb-"]:focus-visible img {
    filter: saturate(0.9) brightness(0.98);
  }

  .epr-card[class*="thumb-"]:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  .epr-progress {
    position: absolute;
    right: 0;
    bottom: -0.42cqw;
    left: 0;
    height: 0.22cqw;
    min-height: 2px;
    overflow: hidden;
    background: #e2e8f0;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 180ms ease;
  }

  .epr-progress::after {
    position: absolute;
    inset: 0;
    content: "";
    background: var(--accent);
    transform: translateX(-100%);
  }

  .epr-card[class*="thumb-"]:hover .epr-progress,
  .epr-card[class*="thumb-"]:focus-visible .epr-progress {
    opacity: 1;
  }

  .epr-card[class*="thumb-"]:hover .epr-progress::after,
  .epr-card[class*="thumb-"]:focus-visible .epr-progress::after {
    animation: epr-progress 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  .epr-meta {
    position: absolute;
    top: calc(100% + 0.8cqw);
    left: 0;
    display: grid;
    gap: 0.15cqw;
    width: 100%;
    opacity: 0;
    text-align: left;
    transform: translateY(0.4cqw);
    transition: opacity 180ms ease, transform 250ms ease;
  }

  .epr-meta strong {
    overflow: hidden;
    font-size: clamp(9px, 0.52cqw, 12px);
    font-weight: 700;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--ink);
  }

  .epr-meta small {
    color: var(--muted);
    font-size: clamp(8px, 0.44cqw, 11px);
    font-weight: 500;
    line-height: 1.1;
  }

  .epr-card[class*="thumb-"]:hover .epr-meta,
  .epr-card[class*="thumb-"]:focus-visible .epr-meta {
    opacity: 1;
    transform: translateY(0);
  }

  .epr-copy {
    position: absolute;
    z-index: 22;
    top: 35.35%;
    left: 64.58%;
    width: 28.2%;
  }

  .epr-copy-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0;
  }

  .epr-copy-layer.is-entering {
    animation: epr-copy-in 600ms 100ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .epr-copy-layer.is-leaving {
    pointer-events: none;
    animation: epr-copy-out 360ms cubic-bezier(0.4, 0, 1, 1) both;
  }

  .epr-author {
    display: grid;
    gap: 0.35cqw;
  }

  .epr-author strong {
    font-size: clamp(13px, 0.85cqw, 18px);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: var(--ink);
  }

  .epr-author span {
    color: var(--muted);
    font-size: clamp(11px, 0.7cqw, 15px);
    font-weight: 500;
    line-height: 1.2;
  }

  .epr-copy blockquote {
    max-width: 27cqw;
    margin: min(4.5cqw, 7vh) 0 0;
    font-size: clamp(18px, 1.65cqw, 32px);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.45;
    color: var(--ink);
  }

  .epr-cursor {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    display: none;
    width: 2.35rem;
    height: 2.35rem;
    margin: -1.175rem 0 0 -1.175rem;
    place-items: center;
    border: 2px solid rgba(4, 129, 162, 0.85);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transform: translate3d(-80px, -80px, 0);
    transition:
      opacity 200ms ease,
      width 220ms ease,
      height 220ms ease,
      margin 220ms ease,
      border-color 220ms ease,
      background-color 220ms ease;
    will-change: transform;
  }

  .epr-cursor.is-visible {
    opacity: 1;
  }

  .epr-cursor span {
    width: 1.35rem;
    height: 1.35rem;
    border: 2px solid rgba(36, 62, 118, 0.85);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
    transition: transform 180ms ease;
  }

  .epr-cursor.is-hovering {
    width: 2.75rem;
    height: 2.75rem;
    margin: -1.375rem 0 0 -1.375rem;
    background: rgba(4, 129, 162, 0.08);
    border-color: rgba(4, 129, 162, 1);
  }

  .epr-cursor.is-down span {
    transform: scale(0.58);
  }

  @media (pointer: fine) {
    .epr-stage:hover,
    .epr-stage:hover * {
      cursor: none !important;
    }
    .epr-cursor {
      display: grid;
    }
  }

  @keyframes epr-progress {
    to { transform: translateX(0); }
  }

  @keyframes epr-copy-in {
    from {
      opacity: 0;
      filter: blur(3px);
      transform: translateY(1.05cqw);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }

  @keyframes epr-copy-out {
    from {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
    to {
      opacity: 0;
      filter: blur(2px);
      transform: translateY(-0.55cqw);
    }
  }

  @media (max-aspect-ratio: 4 / 5) {
    .epr-page {
      height: 100vh;
      min-height: 600px;
    }

    .epr-card.hero {
      --left: 7%;
      --top: 9%;
      --width: 45%;
      --height: 50%;
    }

    .epr-card {
      --top: 69%;
      --width: 26%;
      --height: 20%;
    }

    .epr-card.thumb-0 { --left: -40%; }
    .epr-card.thumb-1 { --left: -10%; }
    .epr-card.thumb-2 { --left: 20%; }
    .epr-card.thumb-3 { --left: 50%; }

    .epr-title {
      top: 10%;
      left: 60%;
      transform: none;
      font-size: 5cqw;
    }

    .epr-copy {
      top: 17%;
      left: 60%;
      width: 35%;
    }

    .epr-author { gap: 1.2cqw; }
    .epr-author strong { font-size: 2.6cqw; }
    .epr-author span { font-size: 2.2cqw; }

    .epr-copy blockquote {
      max-width: 35cqw;
      margin-top: 8cqw;
      font-size: 3.5cqw;
      line-height: 1.35;
    }

    .epr-meta,
    .epr-progress { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    :root, .epr-page { --motion: 1ms linear; }
    *,
    *::before,
    *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 1ms !important;
    }
  }
`;

interface ReviewsShowcaseProps {
  reviews?: ReviewItem[];
  title?: string;
  className?: string;
}

export default function ReviewsShowcase({
  reviews = DEFAULT_REVIEWS,
  title = "Reviews",
  className = "",
}: ReviewsShowcaseProps) {
  const [active, setActive] = useState(0);
  const [previousActive, setPreviousActive] = useState<number | null>(null);
  const activeRef = useRef(active);
  const transitionTimerRef = useRef<number | NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const activate = useCallback(
    (id: number) => {
      if (id === activeRef.current) return;

      const prev = activeRef.current;
      isTransitioningRef.current = true;
      setPreviousActive(prev);
      activeRef.current = id;
      setActive(id);

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current as number);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setPreviousActive(null);
        isTransitioningRef.current = false;
      }, 750);
    },
    []
  );

  // Preload images
  useEffect(() => {
    reviews.forEach(({ image }) => {
      if (typeof window !== "undefined") {
        const img = new Image();
        img.src = image;
      }
    });
  }, [reviews]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current as number);
      }
    };
  }, []);

  // Scroll listener: Drives active card based on scroll position in sticky wrapper
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const totalScrollable = wrapperRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Distance scrolled from top of wrapper
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      // Map progress [0 .. 1] to target review index
      const targetIndex = Math.min(
        Math.floor(progress * reviews.length),
        reviews.length - 1
      );

      if (targetIndex !== activeRef.current) {
        activate(targetIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activate, reviews.length]);

  // Scroll to a specific card when clicked
  const scrollToCard = (targetIndex: number) => {
    if (!wrapperRef.current) {
      activate(targetIndex);
      return;
    }
    const rect = wrapperRef.current.getBoundingClientRect();
    const scrollableDistance = wrapperRef.current.offsetHeight - window.innerHeight;
    const currentScrollY = window.scrollY || window.pageYOffset;
    const containerTop = currentScrollY + rect.top;

    const sliceProgress = (targetIndex + 0.5) / reviews.length;
    const targetScrollY = containerTop + sliceProgress * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Custom cursor logic scoped to stage hover
  useEffect(() => {
    const cursor = cursorRef.current;
    const stage = stageRef.current;
    if (!cursor || !stage || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let x = -80;
    let y = -80;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      const overButton =
        event.target instanceof Element && Boolean(event.target.closest("button"));
      cursor.classList.toggle("is-hovering", overButton);

      if (!frame) {
        frame = requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          frame = 0;
        });
      }
    };

    const enter = () => {
      cursor.classList.add("is-visible");
    };

    const leave = () => {
      cursor.classList.remove("is-visible");
    };

    const down = () => cursor.classList.add("is-down");
    const up = () => cursor.classList.remove("is-down");

    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerdown", down, { passive: true });
    stage.addEventListener("pointerup", up, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointerup", up);
    };
  }, []);

  const slotFor = (id: number) => {
    if (id === active) return "hero";

    const distanceBehind = (active - id + reviews.length) % reviews.length;

    if (distanceBehind === 1) return "thumb-0";
    if (distanceBehind === 2) return "thumb-1";
    if (distanceBehind === 3) return "thumb-2";
    return "thumb-3";
  };

  const current = reviews[active] || reviews[0];
  const previous =
    previousActive === null ? null : reviews[previousActive];

  return (
    <div
      className={`epr-scroll-wrapper ${className}`}
      ref={wrapperRef}
      style={{ height: `${reviews.length * 80}vh` }}
    >
      <style>{styles}</style>

      <section className="epr-page">
        <div className="epr-stage" ref={stageRef} aria-label="Client reviews showcase">
          <h2 className="epr-title">{title}</h2>

          <div className="epr-deck" aria-label="Choose a review">
            {reviews.map((review) => {
              const slot = slotFor(review.id);
              const isThumb = slot.startsWith("thumb");

              return (
                <button
                  className={`epr-card ${slot}`}
                  key={review.id}
                  type="button"
                  onClick={() => isThumb && scrollToCard(review.id)}
                  tabIndex={isThumb ? 0 : -1}
                  aria-label={
                    isThumb ? `Read ${review.name}'s review` : undefined
                  }
                  aria-hidden={!isThumb}
                  style={
                    {
                      "--image-position": review.position || "50% 50%",
                    } as React.CSSProperties
                  }
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    draggable="false"
                    fetchPriority={review.id < 4 ? "high" : "auto"}
                  />
                  <span className="epr-progress" aria-hidden="true" />
                  <span className="epr-meta" aria-hidden="true">
                    <strong>{review.name}</strong>
                    <small>{review.role}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="epr-copy" aria-live="polite">
            {previous && (
              <article className="epr-copy-layer is-leaving" aria-hidden="true">
                <header className="epr-author">
                  <strong>{previous.name}</strong>
                  <span>{previous.role}</span>
                </header>
                <blockquote>“{previous.quote}”</blockquote>
              </article>
            )}

            <article
              className={`epr-copy-layer ${
                previous ? "is-entering" : ""
              }`}
              key={active}
            >
              <header className="epr-author">
                <strong>{current.name}</strong>
                <span>{current.role}</span>
              </header>
              <blockquote>“{current.quote}”</blockquote>
            </article>
          </div>
        </div>

        <div className="epr-cursor" ref={cursorRef} aria-hidden="true">
          <span />
        </div>
      </section>
    </div>
  );
}
