"use client";

import React, { useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────────────────
   Settle — a pinned scroll sequence where a single cover card flips over to
   reveal a stack of cards, which then peel away upward one by one in order 01 → 06.

   Driven by one normalised progress value p ∈ [0,1]:
     • [0 .. 0.18]  the deck rises into frame while the headline lifts away
     • [~0.34]      the cover card flips (rotateY 0→180) and the back cards
                    flip in (rotateY -180→0) with a settle tilt
     • [0.50 .. 1]  each back card dismisses upward in forward order (01 → 06)
                    with a growing tilt, peeling the stack apart
   ──────────────────────────────────────────────────────────────────────── */

type Card = {
  number: string;
  title: string;
  body: string;
  flipTilt: number; // rotationZ when the stack settles
  dismissTilt: number; // rotationZ at the top of its exit
  bg: string;
  fg: string;
  border?: string;
  icon: string; // inline SVG path data drawn in a 24-box
};

// 6 Back cards styled with project brand colors: #0481a2, #243e76, #DEE2E6, #f8f9fa, #ffffff
const CARDS: Card[] = [
  {
    number: "01",
    title: "Executive Media Coverage",
    body: "Secure visibility opportunities across relevant media platforms.",
    flipTilt: -12,
    dismissTilt: -55,
    bg: "#243e76",
    fg: "#ffffff",
    icon: "M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 8h6m-6 4h6m-6 4h4",
  },
  {
    number: "02",
    title: "Founder PR Campaigns",
    body: "Promote founder stories, achievements and expertise.",
    flipTilt: -20,
    dismissTilt: -64,
    bg: "#0481a2",
    fg: "#ffffff",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    number: "03",
    title: "Leadership Profile Development",
    body: "Create professional positioning for executives and business leaders.",
    flipTilt: -6,
    dismissTilt: -48,
    bg: "#DEE2E6",
    fg: "#243e76",
    border: "1px solid rgba(36, 62, 118, 0.15)",
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  {
    number: "04",
    title: "Press Release Strategy",
    body: "Develop and distribute newsworthy executive announcements.",
    flipTilt: 8,
    dismissTilt: 48,
    bg: "#243e76",
    fg: "#DEE2E6",
    icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  },
  {
    number: "05",
    title: "Industry Authority Building",
    body: "Strengthen recognition through expert positioning initiatives.",
    flipTilt: -10,
    dismissTilt: -58,
    bg: "#0481a2",
    fg: "#ffffff",
    icon: "M12 3 3 8l9 5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5",
  },
  {
    number: "06",
    title: "Reputation Management Support",
    body: "Enhance professional credibility across digital channels.",
    flipTilt: 12,
    dismissTilt: 52,
    bg: "#ffffff",
    fg: "#243e76",
    border: "1px solid #DEE2E6",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mapRange = (a: number, b: number, x: number) => clamp01((x - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutBack = (t: number) => {
  const c = 1.7;
  const u = t - 1;
  return 1 + (c + 1) * u * u * u + c * u * u;
};

const FLIP_START = 0.28;
const FLIP_END = 0.44;
const DISMISS_START = 0.50;

export default function SettleStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = CARDS.length;

    const apply = (p: number) => {
      // 1 — deck rises in, headline lifts away
      const enter = mapRange(0, 0.18, p);
      const deckY = lerp(46, -6, enter);
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translateY(${lerp(0, -120, enter)}%)`;
        headlineRef.current.style.opacity = `${1 - enter}`;
      }

      // 2 — the flip (cover turns away, stack turns in)
      const flip = easeOutBack(mapRange(FLIP_START, FLIP_END, p));
      if (frontRef.current) {
        frontRef.current.style.transform =
          `translate(-50%,calc(-50% + ${deckY}%)) rotateY(${lerp(0, 180, flip)}deg)`;
      }

      // 3 — per-card dismiss in FORWARD order 01 → 06 (Card 01 leaves first, revealing 02, etc.)
      const windowRange = (1 - DISMISS_START) / count;
      CARDS.forEach((c, i) => {
        const el = backRefs.current[i];
        if (!el) return;
        const order = i; // 01 leaves first, 06 leaves last
        const dStart = DISMISS_START + order * windowRange;
        const dismiss = smooth(mapRange(dStart, dStart + windowRange, p));
        const ry = lerp(-180, 0, flip);
        const y = deckY + lerp(0, -240, dismiss);
        const rz = lerp(c.flipTilt * clamp01(flip), c.dismissTilt, dismiss);
        el.style.transform =
          `translate(-50%,calc(-50% + ${y}%)) rotateY(${ry}deg) rotateZ(${rz}deg)`;
        el.style.opacity = `${1 - dismiss * dismiss}`;
      });
    };

    let raf = 0;

    if (reduced) {
      apply(0.5);
      return;
    }

    const tick = () => {
      const rect = pin.getBoundingClientRect();
      const span = pin.offsetHeight - window.innerHeight;
      const p = clamp01(span > 0 ? -rect.top / span : 0);
      apply(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="st-root" ref={wrapRef}>
      <style>{css}</style>

      <div className="st-track" ref={pinRef}>
        <div className="st-stage">
          {/* Main Headline (Outfit font, #243e76) */}
          <div className="st-headline" ref={headlineRef}>
            <h1>Executive PR Services We Offer</h1>
          </div>

          <div className="st-deck">
            {/* cover card */}
            <div className="st-card st-front" ref={frontRef}>
              <h3>Executive PR</h3>
              <p>
                Our services support professionals seeking greater visibility and authority through media outreach, executive positioning and reputation-building initiatives.
              </p>
              <button className="st-tag" type="button">
                Start Your PR Strategy
              </button>
            </div>

            {/* revealed stack (Card 01 on top, peeling away 01 → 06) */}
            {CARDS.map((c, i) => (
              <div
                key={i}
                className="st-card st-back"
                ref={(el) => {
                  backRefs.current[i] = el;
                }}
                style={{
                  background: c.bg,
                  color: c.fg,
                  border: c.border || "none",
                  zIndex: 20 - i, // Card 01 has highest zIndex so it sits on top and dismisses first
                }}
              >
                <span className="st-card-num">{c.number}</span>
                <h3>{c.title}</h3>
                <div
                  className="st-icon"
                  style={{
                    background: c.fg === "#243e76" ? "#243e76" : "#ffffff",
                    color: c.fg === "#243e76" ? "#ffffff" : c.bg,
                  }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d={c.icon} />
                  </svg>
                </div>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Varela+Round&display=swap");

  .st-root {
    position: relative;
    width: 100%;
    background: #f8f9fa;
    color: #243e76;
    font-family: 'Varela Round', sans-serif;
  }

  /* tall scroll track; the sticky stage stays pinned while you scroll it */
  .st-track {
    position: relative;
    width: 100%;
    height: 560svh;
  }

  .st-stage {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100svh;
    overflow: hidden;
    background: radial-gradient(120% 120% at 50% 10%, #ffffff 0%, #f8f9fa 50%, #DEE2E6 100%);
    color: #243e76;
    perspective: 1200px;
    font-family: 'Varela Round', sans-serif;
  }

  .st-headline {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform, opacity;
    z-index: 2;
    padding: 0 1.5rem;
  }

  .st-headline h1 {
    width: 78%;
    max-width: 980px;
    text-align: center;
    margin: 0;
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    line-height: 1.05;
    font-size: clamp(2.4rem, 4.8vw, 5.2rem);
    letter-spacing: -0.025em;
    color: #243e76;
  }

  .st-deck {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    z-index: 3;
  }

  .st-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 26%;
    min-width: 310px;
    max-width: 380px;
    aspect-ratio: 4 / 5.1;
    padding: 2.8rem 2rem;
    border-radius: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    backface-visibility: hidden;
    will-change: transform, opacity;
    box-shadow: 0 25px 55px -18px rgba(36, 62, 118, 0.28);
    font-family: 'Varela Round', sans-serif;
  }

  .st-front {
    background: #243e76;
    color: #ffffff;
    border: 1px solid rgba(222, 226, 230, 0.25);
  }

  .st-back {
    transform: translate(-50%, -50%) rotateY(-180deg);
  }

  .st-card-num {
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    opacity: 0.9;
  }

  .st-card h3 {
    margin: 0;
    font-family: 'Varela Round', sans-serif;
    font-weight: 700;
    line-height: 1.18;
    font-size: clamp(1.35rem, 1.85vw, 1.85rem);
    letter-spacing: -0.01em;
  }

  .st-card p {
    margin: 0;
    font-family: 'Varela Round', sans-serif;
    font-size: 0.96rem;
    font-weight: 400;
    line-height: 1.45;
    opacity: 0.92;
  }

  .st-tag {
    font-family: 'Varela Round', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 0.75rem 1.3rem;
    border-radius: 0.6rem;
    background: #0481a2;
    color: #ffffff;
    border: none;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(4, 129, 162, 0.35);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease, box-shadow 0.25s ease;
    display: inline-block;
  }

  .st-tag:hover {
    background: #036883;
    transform: scale(1.04);
    box-shadow: 0 12px 24px rgba(4, 129, 162, 0.45);
  }

  .st-icon {
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .st-icon svg {
    width: 1.85rem;
    height: 1.85rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (max-width: 1000px) {
    .st-headline h1 {
      width: 90%;
    }
    .st-card {
      width: 82%;
      min-width: 280px;
    }
  }
`;
