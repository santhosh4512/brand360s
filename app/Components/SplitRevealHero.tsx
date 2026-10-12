"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface SplitRevealHeroProps {
  line1?: string;
  line2?: string;
  cardContent?: string;
  cardCtaText?: string;
  coverImage?: string;
  heroImage?: string;
  className?: string;
}

export default function SplitRevealHero({
  line1 = "Executive PR Agency in Chennai",
  line2 = "for Founder and Leadership Visibility",
  cardContent = "As an Executive PR Agency in Chennai, BRAND 360s helps professionals strengthen visibility, build credibility and gain media exposure that supports long-term professional growth.",
  cardCtaText = "Build Your Executive Presence",
  coverImage = "/images/content-writing-hero.jpg",
  heroImage = "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=90",
  className = "",
}: SplitRevealHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const covers = gsap.utils.toArray<HTMLElement>(".sf-cover", root);
      const scene = root.querySelector<HTMLElement>(".sf-scene");
      const card = root.querySelector<HTMLElement>(".sf-card");
      const topCover = root.querySelector<HTMLElement>(".sf-top");
      const bottomCover = root.querySelector<HTMLElement>(".sf-bottom");

      const allChars = gsap.utils.toArray<HTMLElement>(
        ".sf-cover .sf-char > span",
        root,
      );
      const vanishWords = gsap.utils.toArray<HTMLElement>(
        ".sf-cover .sf-vanish-word",
        root,
      );
      const prWords = gsap.utils.toArray<HTMLElement>(
        ".sf-cover .sf-stay-pr",
        root,
      );

      const cardTextEl = root.querySelector<HTMLElement>(".sf-card-text");
      const cardCtaEl = root.querySelector<HTMLElement>(".sf-card-cta");

      if (reducedMotion) {
        covers.forEach((cover) => {
          cover.style.display = "none";
        });
        if (scene) scene.style.clipPath = "inset(0)";
        if (card) card.style.clipPath = "inset(0)";
        if (cardTextEl) cardTextEl.style.opacity = "1";
        if (cardCtaEl) cardCtaEl.style.opacity = "1";
        return;
      }

      const mobile = window.innerWidth <= 1000;

      // Initial CSS states
      gsap.set(allChars, { yPercent: -110 });
      gsap.set(vanishWords, { yPercent: 0, opacity: 1 });
      gsap.set(prWords, { x: 0, y: 0, scale: 1 });
      
      if (card) gsap.set(card, { clipPath: "inset(50% 0%)" });
      if (cardTextEl) gsap.set(cardTextEl, { y: 25, opacity: 0 });
      if (cardCtaEl) gsap.set(cardCtaEl, { y: 20, opacity: 0, scale: 0.95 });

      if (scene) gsap.set(scene, { clipPath: "polygon(0% 48%, 0% 48%, 0% 52%, 0% 52%)" });
      if (topCover) gsap.set(topCover, { yPercent: 0, clipPath: "none" });
      if (bottomCover) gsap.set(bottomCover, { yPercent: 0, clipPath: "none" });

      // Autonomous Auto Animation Timeline (Runs automatically on page load/view!)
      const tl = gsap.timeline({
        delay: 0.3,
      });

      // ── Step 1: Headline (2 lines) drops in from top (0.0s -> 0.8s)
      tl.to(
        allChars,
        {
          yPercent: 0,
          stagger: 0.015,
          duration: 0.75,
          ease: "power2.out",
        },
        0,
      );

      // ── Step 2: HOLD PAUSE (The 2 lines stay still so reader reads them!) (0.75s -> 2.0s)
      // 1.25s pause

      // ── Step 3: All words EXCEPT 'PR' slide down and fade away (2.0s -> 2.8s)
      tl.to(
        vanishWords,
        {
          yPercent: 120,
          opacity: 0,
          stagger: 0.015,
          duration: 0.75,
          ease: "power2.inOut",
        },
        2.0,
      );

      // ── Step 4: The isolated 'PR' moves smoothly to dead-center and scales up into mega logo (2.6s -> 4.0s)
      tl.to(
        prWords,
        {
          x: () => {
            const topCoverEl = topCover || root;
            const topPr = topCoverEl.querySelector<HTMLElement>(".sf-stay-pr");
            if (!topPr) return 0;
            const prR = topPr.getBoundingClientRect();
            const rootR = topCoverEl.getBoundingClientRect();
            return (rootR.left + rootR.width / 2) - (prR.left + prR.width / 2);
          },
          y: () => {
            const topCoverEl = topCover || root;
            const topPr = topCoverEl.querySelector<HTMLElement>(".sf-stay-pr");
            if (!topPr) return 0;
            const prR = topPr.getBoundingClientRect();
            const rootR = topCoverEl.getBoundingClientRect();
            return (rootR.top + rootR.height / 2) - (prR.top + prR.height / 2);
          },
          scale: mobile ? 2.6 : 3.8,
          fontWeight: "900",
          duration: 1.3,
          ease: "power3.inOut",
        },
        2.6,
      );

      // ── Step 5: Horizontal center slit cuts across the centered 'PR' (4.0s -> 4.8s)
      if (topCover && bottomCover) {
        tl.set(topCover, { clipPath: "inset(0% 0% 50% 0%)" }, 4.0);
        tl.set(bottomCover, { clipPath: "inset(50% 0% 0% 0%)" }, 4.0);
      }

      if (scene) {
        tl.fromTo(
          scene,
          { clipPath: "polygon(0% 48%, 0% 48%, 0% 52%, 0% 52%)" },
          { clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)", duration: 0.8, ease: "power2.inOut" },
          4.0,
        );
      }

      // ── Step 6: Curtain Split — Top & Bottom covers split (-50% / +50%) and Scene opens fully (4.8s -> 6.0s)
      if (topCover) {
        tl.to(topCover, { yPercent: -50, duration: 1.2, ease: "power3.inOut" }, 4.8);
      }
      if (bottomCover) {
        tl.to(bottomCover, { yPercent: 50, duration: 1.2, ease: "power3.inOut" }, 4.8);
      }
      if (scene) {
        tl.fromTo(
          scene,
          { clipPath: "inset(48% 0%)" },
          { clipPath: "inset(0% 0%)", duration: 1.2, ease: "power3.inOut" },
          4.8,
        );
      }

      // ── Step 7: White Center Card Unveils & Text + Button Slide Up (5.8s -> 7.0s)
      if (card) {
        tl.fromTo(
          card,
          { clipPath: "inset(50% 0%)" },
          { clipPath: "inset(0% 0%)", duration: 0.8, ease: "power3.out" },
          5.8,
        );
      }

      if (cardTextEl) {
        tl.to(cardTextEl, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 6.2);
      }
      if (cardCtaEl) {
        tl.to(cardCtaEl, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" }, 6.4);
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const renderWordsWithPR = (text: string) => {
    const words = text.split(" ");
    return words.map((word, wIdx) => {
      const isPR = word.toUpperCase() === "PR";

      if (isPR) {
        return (
          <span
            className="sf-word-group sf-stay-pr"
            key={`${word}-${wIdx}`}
          >
            <span className="sf-char sf-pr-p">
              <span>P</span>
            </span>
            <span className="sf-char sf-pr-r">
              <span>R</span>
            </span>
            {wIdx < words.length - 1 ? <span className="sf-space">&nbsp;</span> : null}
          </span>
        );
      }

      return (
        <span
          className="sf-word-group sf-vanish-word"
          key={`${word}-${wIdx}`}
        >
          {Array.from(word).map((char, cIdx) => (
            <span className="sf-char" key={`${char}-${cIdx}`}>
              <span>{char}</span>
            </span>
          ))}
          {wIdx < words.length - 1 ? <span className="sf-space">&nbsp;</span> : null}
        </span>
      );
    });
  };

  const Cover = ({ position }: { position: "top" | "bottom" }) => (
    <div className={`sf-cover sf-${position}`} aria-hidden="true">
      {/* Background Image behind initial intro/PR cover */}
      <div className="sf-cover-bg-wrap">
        <img
          src={coverImage}
          alt="PR Agency Backdrop"
          className="sf-cover-bg-img"
          draggable={false}
          loading="eager"
        />
        <div className="sf-cover-overlay" />
      </div>

      {/* 2 Lines of Content in the Center */}
      <div className="sf-intro">
        <h1 className="sf-line-1">{renderWordsWithPR(line1)}</h1>
        <h2 className="sf-line-2">{renderWordsWithPR(line2)}</h2>
      </div>
    </div>
  );

  return (
    <section ref={rootRef} className={`sf-root relative w-full overflow-hidden ${className}`}>
      <style>{styles}</style>

      <Cover position="bottom" />
      <Cover position="top" />

      <div className="sf-scene">
        <img
          className="sf-image"
          src={heroImage}
          alt="Executive PR Agency in Chennai"
          draggable={false}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <div className="sf-shade" />

        {/* White Center Card containing ONLY the provided content & button */}
        <div className="sf-card">
          <div className="sf-card-inner">
            <p className="sf-card-text">{cardContent}</p>

            <div className="sf-card-action">
              <button
                type="button"
                className="sf-card-cta"
                onClick={() => {
                  const ctaSection = document.getElementById("contact") || document.querySelector("footer");
                  if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span>{cardCtaText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = `
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap");

.sf-root,
.sf-root * {
  box-sizing: border-box;
}

.sf-root {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  min-height: 580px;
  overflow: hidden;
  isolation: isolate;
  background: #060a12;
  color: #fff;
  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, Arial, sans-serif;
}

.sf-root h1,
.sf-root h2,
.sf-root p {
  margin: 0;
}

.sf-cover,
.sf-scene {
  position: absolute;
  inset: 0;
}

.sf-cover {
  z-index: 4;
  overflow: hidden;
  background: #060a12;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
  will-change: transform, clip-path;
  contain: layout paint;
}

/* Background image & clean natural overlay on initial cover */
.sf-cover-bg-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.sf-cover-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.04);
  filter: brightness(0.7) contrast(1.05);
  backface-visibility: hidden;
}

.sf-cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.sf-bottom {
  z-index: 3;
}

.sf-top {
  z-index: 4;
}

/* 2 Lines Headline */
.sf-intro {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  width: min(92%, 1280px);
  text-align: center;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.sf-line-1 {
  font-size: clamp(2rem, 4.4vw, 4.4rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}

.sf-line-2 {
  font-size: clamp(1.3rem, 2.5vw, 2.2rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.03em;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);
}

.sf-word-group {
  display: inline-block;
  white-space: nowrap;
}

.sf-vanish-word {
  display: inline-block;
  will-change: transform, opacity;
}

/* The exact 'PR' that stays from inside the headline */
.sf-stay-pr {
  display: inline-block;
  position: relative;
  transform-origin: center center;
  will-change: transform;
  z-index: 5;
}

.sf-stay-pr .sf-char {
  color: #ffffff;
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.9);
}

.sf-space {
  display: inline-block;
}

.sf-char {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  backface-visibility: hidden;
  will-change: transform, font-size;
}

.sf-char > span {
  display: inline-block;
  backface-visibility: hidden;
  will-change: transform;
}

.sf-scene {
  z-index: 2;
  overflow: hidden;
  clip-path: polygon(0% 48%, 0% 48%, 0% 52%, 0% 52%);
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
  will-change: clip-path;
  contain: layout paint;
}

.sf-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate3d(0,0,0) scale(1.001);
  backface-visibility: hidden;
}

.sf-shade {
  display: none;
}

/* White Center Card */
.sf-card {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  display: flex;
  width: min(92%, 640px);
  min-height: 420px;
  max-height: 84vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform: translate3d(-50%,-50%,0);
  background: #ffffff;
  border-radius: 24px;
  clip-path: inset(50% 0%);
  backface-visibility: hidden;
  will-change: clip-path;
  contain: layout paint;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.45), 0 10px 30px rgba(36, 62, 118, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.sf-card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 3.2rem;
  width: 100%;
}

.sf-card-text {
  color: #1a2744;
  font-size: clamp(1.2rem, 1.75vw, 1.45rem);
  font-weight: 500;
  line-height: 1.65;
  letter-spacing: -0.01em;
  margin: 0 0 3.2rem 0;
  max-width: 540px;
}

.sf-card-action {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
}

.sf-card-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.15rem 2.8rem;
  background: #243e76;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(36, 62, 118, 0.35);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.sf-card-cta:hover {
  background: #0481a2;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 14px 30px rgba(4, 129, 162, 0.45);
}

@media (max-width: 1000px) {
  .sf-line-1 {
    font-size: clamp(1.8rem, 5.5vw, 3rem);
  }

  .sf-line-2 {
    font-size: clamp(1.1rem, 3vw, 1.7rem);
  }

  .sf-card {
    width: 86%;
    min-height: 340px;
  }

  .sf-card-inner {
    padding: 2.5rem 2rem;
  }

  .sf-card-text {
    font-size: 1.15rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 560px) {
  .sf-root {
    min-height: 540px;
  }

  .sf-line-1 {
    font-size: 1.45rem;
  }

  .sf-line-2 {
    font-size: 0.95rem;
  }

  .sf-card {
    width: 90%;
    min-height: 320px;
    border-radius: 18px;
  }

  .sf-card-inner {
    padding: 2rem 1.4rem;
  }

  .sf-card-text {
    font-size: 1.05rem;
    line-height: 1.5;
    margin-bottom: 1.6rem;
  }

  .sf-card-cta {
    padding: 1rem 2rem;
    font-size: 13px;
    width: 100%;
  }
}
`;
