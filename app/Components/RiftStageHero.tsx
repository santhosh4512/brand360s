"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLayoutEffect, useRef } from "react";

export type RiftPanel = {
  eyebrow: string;
  text: string;
};

export type RiftStageHeroProps = {
  leadImage?: string;
  finalImages?: [string, string];
  openingTitle?: string;
  panels?: [RiftPanel, RiftPanel];
  closingText?: string;
  embedded?: boolean;
};

const DEFAULT_IMAGES: [string, string, string] = [
  "/images/seo-comparison-hero.jpg",
  "/images/process_step3.jpg",
  "/images/process_step4.jpg",
];

const COMPARISON_DATA = [
  {
    criteria: "Skill coverage",
    agency: "Technical + content + local + link building",
    freelance: "Usually one or two areas",
  },
  {
    criteria: "Continuity",
    agency: "Team-backed, no single point of failure",
    freelance: "Risk if freelancer becomes unavailable",
  },
  {
    criteria: "Cost",
    agency: "Higher, but broader coverage",
    freelance: "Lower, narrower scope",
  },
  {
    criteria: "Best for",
    agency: "Long-term, compounding growth",
    freelance: "A single, narrowly-scoped task",
  },
];

export default function RiftStageHero({
  leadImage = DEFAULT_IMAGES[0],
  finalImages = [DEFAULT_IMAGES[1], DEFAULT_IMAGES[2]],
  openingTitle = "SEO Agency vs Freelance SEO — Which Is Right for You?",
  panels = [
    {
      eyebrow: "SEO Agency",
      text: "A Chennai SEO agency puts a full team behind your rankings, traffic and local visibility, never relying on one person.",
    },
    {
      eyebrow: "Freelance SEO",
      text: "A freelance SEO expert in Chennai offers personal attention at lower cost, ideal when you need help with one task.",
    },
  ],
  closingText =
    "For sustained rankings, local visibility and lasting growth, a Chennai SEO agency delivers broader expertise and continuity, while freelancers suit only small, narrowly-scoped tasks.",
  embedded = false,
}: RiftStageHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const leftCopyRef = useRef<HTMLDivElement>(null);
  const rightCopyRef = useRef<HTMLDivElement>(null);
  const topImageRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);
  const underlayRef = useRef<HTMLDivElement>(null);
  const finaleRowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const stage = stageRef.current;
    const finale = finaleRef.current;
    const lead = leadRef.current;
    const shade = shadeRef.current;
    const flash = flashRef.current;
    const leftCopy = leftCopyRef.current;
    const rightCopy = rightCopyRef.current;
    const topImage = topImageRef.current;
    const bottomImage = bottomImageRef.current;
    const underlay = underlayRef.current;

    if (
      !root ||
      !content ||
      !stage ||
      !finale ||
      !lead ||
      !shade ||
      !flash ||
      !leftCopy ||
      !rightCopy ||
      !topImage ||
      !bottomImage ||
      !underlay
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.set(finale, { autoAlpha: 0 });
      gsap.set(leftCopy, { xPercent: -18, opacity: 0 });
      gsap.set(rightCopy, { xPercent: 18, opacity: 0 });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(lead, { display: "none" });
        gsap.set(finale, { autoAlpha: 1 });
        gsap.set([topImage, bottomImage], { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      const scroller = embedded ? root : undefined;
      const lenis = embedded
        ? new Lenis({ wrapper: root, content, smoothWheel: true })
        : new Lenis({ smoothWheel: true });

      const syncScroll = () => ScrollTrigger.update();
      lenis.on("scroll", syncScroll);

      let frame = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      const sequence = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          scroller,
          start: "top top",
          end: () =>
            `+=${(embedded ? root.clientHeight : window.innerHeight) * 6}`,
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      sequence
        .to(
          lead,
          {
            clipPath: "inset(0% 48.5% 0% 48.5%)",
            duration: 1,
          },
          0,
        )
        .to(shade, { opacity: 0.88, duration: 1 }, 0)
        .to(
          leftCopy,
          { xPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.18,
        )
        .to(
          rightCopy,
          { xPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.18,
        )
        .to(lead, { rotation: 68, duration: 0.8 }, 1)
        .to(
          lead,
          {
            scale: 0,
            rotation: 105,
            duration: 0.9,
            ease: "power2.in",
          },
          1.8,
        )
        .to(flash, { opacity: 1, duration: 0.18 }, 1.8)
        .to(
          leftCopy,
          { xPercent: 125, opacity: 0, duration: 0.75, ease: "power2.in" },
          2.05,
        )
        .to(
          rightCopy,
          { xPercent: -125, opacity: 0, duration: 0.75, ease: "power2.in" },
          2.05,
        )
        .set(finale, { autoAlpha: 1 }, 2.78)
        .to(
          topImage,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
          2.8,
        )
        .to(
          bottomImage,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
          2.8,
        )
        // Extra reading hold: 3.7 to 4.8
        // Split cards outward to left & right at 4.8 -> 6.0
        .to(
          topImage,
          {
            xPercent: -130,
            rotate: -6,
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          4.8,
        )
        .to(
          bottomImage,
          {
            xPercent: 130,
            rotate: 6,
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          4.8,
        )
        .to(
          [underlay, shade, flash, stage, content, root],
          {
            opacity: 0,
            duration: 0.8,
            ease: "power1.inOut",
          },
          4.8,
        );

      ScrollTrigger.refresh();

      return () => {
        cancelAnimationFrame(frame);
        lenis.off("scroll", syncScroll);
        lenis.destroy();
      };
    }, root);

    return () => context.revert();
  }, [embedded]);

  return (
    <div
      ref={rootRef}
      className={`rr-root${embedded ? " rr-embedded" : ""}`}
    >
      <style>{styles}</style>

      <div ref={contentRef} className="rr-content">
        <section ref={stageRef} className="rr-stage">
          {/* UNDERLAY PANELS */}
          <div ref={underlayRef} className="rr-underlay" aria-hidden="true">
            <article className="rr-panel rr-panel-left">
              <div ref={leftCopyRef} className="rr-panel-copy">
                <span>{panels[0].eyebrow}</span>
                <p>{panels[0].text}</p>
              </div>
            </article>

            <article className="rr-panel rr-panel-right">
              <div ref={rightCopyRef} className="rr-panel-copy">
                <span>{panels[1].eyebrow}</span>
                <p>{panels[1].text}</p>
              </div>
            </article>
          </div>

          {/* FINALE COMPARISON REVEAL STAGE */}
          <div ref={finaleRef} className="rr-finale" aria-hidden="true">
            {/* LEFT / TOP WIPE: SEO AGENCY */}
            <div ref={topImageRef} className="rr-finale-card rr-finale-top">
              <div className="rr-card-bg-mesh rr-mesh-agency" />

              <div className="rr-card-content">
                <div className="rr-card-header">
                  <h3 className="rr-card-title">SEO Agency</h3>
                </div>

                <div className="rr-card-body">
                  {COMPARISON_DATA.map((row, idx) => (
                    <div
                      key={idx}
                      ref={(el) => {
                        finaleRowRefs.current[idx] = el;
                      }}
                      className="rr-row-item rr-agency-row"
                    >
                      <span className="rr-row-criteria">{row.criteria}</span>
                      <div className="rr-row-val-wrap">
                        <span className="rr-check-icon">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="rr-row-val">{row.agency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT / BOTTOM WIPE: FREELANCE SEO */}
            <div
              ref={bottomImageRef}
              className="rr-finale-card rr-finale-bottom"
            >
              <div className="rr-card-bg-mesh rr-mesh-freelance" />

              <div className="rr-card-content">
                <div className="rr-card-header">
                  <h3 className="rr-card-title">Freelance SEO</h3>
                </div>

                <div className="rr-card-body">
                  {COMPARISON_DATA.map((row, idx) => (
                    <div
                      key={idx}
                      className="rr-row-item rr-freelance-row"
                    >
                      <span className="rr-row-criteria">{row.criteria}</span>
                      <div className="rr-row-val-wrap">
                        <span className="rr-dash-icon">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </span>
                        <span className="rr-row-val">{row.freelance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LEAD HERO IMAGE */}
          <div ref={leadRef} className="rr-lead">
            <img src={leadImage} alt="" draggable={false} />
            <div className="rr-image-vignette" />
            <h1>
              <span className="rr-title-main">SEO Agency vs Freelance SEO</span>
              <span className="rr-title-sub">Which Is Right for You?</span>
            </h1>
            <div ref={shadeRef} className="rr-shade" />
            <div ref={flashRef} className="rr-flash" />
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Varela+Round&display=swap");

.rr-root {
  --ink: #101c38;
  --paper: #243e76;
  --navy: #243e76;
  --teal: #0481a2;
  --border-light: #DEE2E6;
  position: relative;
  z-index: 50;
  width: 100%;
  height: 100%;
  min-height: 100svh;
  margin-top: -100vh;
  overflow-x: hidden;
  background: transparent;
  color: var(--navy);
  font-family: "Varela Round", sans-serif;
}

.rr-root * {
  box-sizing: border-box;
}

.rr-root.rr-embedded {
  height: 100svh;
  margin-top: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
}

.rr-root.rr-embedded::-webkit-scrollbar {
  display: none;
}

.rr-content {
  position: relative;
  width: 100%;
}

.rr-stage {
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
}

.rr-underlay,
.rr-finale,
.rr-lead {
  position: absolute;
  inset: 0;
}

.rr-underlay {
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  background:
    radial-gradient(circle at 25% 50%, rgba(36, 62, 118, 0.08), transparent 55%),
    radial-gradient(circle at 75% 50%, rgba(4, 129, 162, 0.09), transparent 55%),
    #ffffff;
  color: #243e76;
}

.rr-underlay::after {
  display: none;
}

.rr-panel {
  display: flex;
  align-items: center;
  padding: clamp(1.25rem, 3vw, 3rem);
  overflow: hidden;
}

.rr-panel-right {
  justify-content: flex-end;
  text-align: right;
  border-left: none;
}

.rr-panel-copy {
  position: relative;
  z-index: 1;
  width: min(32rem, 80%);
  will-change: transform, opacity;
}

.rr-panel-copy::before {
  content: "";
  display: block;
  width: clamp(2.5rem, 5vw, 5rem);
  height: 4px;
  border-radius: 9999px;
  margin-bottom: clamp(1rem, 2vw, 1.75rem);
  background: var(--teal);
}

.rr-panel-right .rr-panel-copy::before {
  margin-left: auto;
  background: var(--navy);
}

.rr-panel-copy span {
  display: block;
  margin-bottom: 0.85rem;
  color: var(--teal);
  font-family: "Outfit", sans-serif;
  font-size: clamp(2.2rem, 4.5vw, 4.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.rr-panel-right .rr-panel-copy span {
  color: var(--navy);
}

.rr-panel-copy p {
  margin: 0;
  font-family: "Varela Round", sans-serif;
  font-size: clamp(1rem, 1.35vw, 1.35rem);
  line-height: 1.6;
  color: #243e76;
  text-transform: none;
}

/* FINALE COMPARISON STAGE */

.rr-finale {
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.2rem, 3vw, 3rem);
  padding: clamp(1.2rem, 2.5vw, 3rem);
  background: #ffffff;
}

.rr-finale-card {
  position: relative;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  border-radius: clamp(16px, 1.5vw, 24px);
  will-change: clip-path;
  border: 1.5px solid rgba(222, 226, 230, 0.2);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.rr-finale-top {
  clip-path: inset(0% 0% 100% 0%);
}

.rr-finale-bottom {
  clip-path: inset(100% 0% 0% 0%);
}

.rr-card-bg-mesh {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.rr-mesh-agency {
  background: #18284d;
  border: 1.5px solid #243e76;
}

.rr-mesh-freelance {
  background: #0481a2;
  border: 1.5px solid #03657f;
}

.rr-card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: clamp(1.4rem, 2.2vw, 2.4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rr-card-header {
  margin-bottom: clamp(0.75rem, 1.2vh, 1.4rem);
}

.rr-card-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: clamp(11px, 0.85vw, 13px);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.rr-badge-agency {
  background: rgba(36, 62, 118, 0.85);
  border: 1px solid #0481a2;
  color: #0481a2;
  box-shadow: 0 4px 14px rgba(36, 62, 118, 0.4);
}

.rr-badge-freelance {
  background: rgba(4, 129, 162, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(4, 129, 162, 0.4);
}

.rr-badge-dot {
  width: 7px;
  height: 7px;
  background: #0481a2;
  border-radius: 50%;
  box-shadow: 0 0 10px #0481a2;
}

.rr-badge-dot-teal {
  width: 7px;
  height: 7px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 10px #ffffff;
}

.rr-card-title {
  margin: 0;
  font-size: clamp(2rem, 3vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
  font-family: "Outfit", sans-serif;
}

.rr-card-body {
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 1vh, 10px);
  flex: 1;
  justify-content: center;
  margin: clamp(0.5rem, 1vh, 1rem) 0;
}

.rr-row-item {
  display: flex;
  flex-direction: column;
  padding: clamp(6px, 0.9vh, 10px) clamp(10px, 1.2vw, 14px);
  border-radius: 12px;
  transition: transform 0.25s ease, background 0.25s ease;
}

.rr-agency-row {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(4, 129, 162, 0.3);
}

.rr-agency-row:hover {
  background: rgba(255, 255, 255, 0.14);
  transform: translateX(4px);
}

.rr-freelance-row {
  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.rr-freelance-row:hover {
  background: rgba(0, 0, 0, 0.26);
  transform: translateX(4px);
}

.rr-row-criteria {
  font-size: clamp(10px, 0.75vw, 11px);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0481a2;
  margin-bottom: 2px;
}

.rr-freelance-row .rr-row-criteria {
  color: #ffffff;
  opacity: 0.85;
}

.rr-row-val-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rr-check-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0481a2;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rr-dash-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rr-row-val {
  font-size: clamp(12px, 1.05vw, 16px);
  font-weight: 500;
  color: #ffffff;
  line-height: 1.35;
}

.rr-root img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  user-select: none;
}

/* LEAD STAGE */

.rr-lead {
  z-index: 3;
  overflow: hidden;
  transform-origin: center;
  clip-path: inset(0% 0% 0% 0%);
  background: var(--ink);
  will-change: clip-path, transform;
}

.rr-lead h1 {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: clamp(7.5rem, 19vh, 15rem);
  width: min(94%, 1300px);
  margin: 0;
  transform: translateX(-50%);
  text-align: center;
  font-family: "Outfit", sans-serif !important;
  letter-spacing: -0.02em;
  text-transform: none;
  color: #ffffff;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
}

.rr-title-main {
  display: block;
  font-family: "Outfit", sans-serif !important;
  font-size: clamp(2.4rem, 5.2vw, 5.2rem);
  font-weight: 800;
  line-height: 1.1;
  white-space: nowrap;
}

.rr-title-sub {
  display: block;
  font-family: "Outfit", sans-serif !important;
  font-size: clamp(2rem, 4.4vw, 4.4rem);
  font-weight: 800;
  line-height: 1.15;
  margin-top: clamp(0.3rem, 1vh, 0.75rem);
}

@media (max-width: 900px) {
  .rr-title-main {
    white-space: normal;
  }
}

.rr-image-vignette,
.rr-shade,
.rr-flash {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.rr-image-vignette {
  z-index: 1;
  background: rgba(16, 28, 56, 0.65);
}

.rr-shade {
  z-index: 4;
  opacity: 0;
  background: var(--ink);
  will-change: opacity;
}

.rr-flash {
  z-index: 5;
  opacity: 0;
  background: var(--teal);
  mix-blend-mode: screen;
  will-change: opacity;
}

@keyframes rr-pulse {
  0%, 100% { transform: scaleX(0.25); opacity: 0.45; }
  50% { transform: scaleX(1); opacity: 1; }
}

@media (max-width: 900px) {
  .rr-finale {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .rr-underlay {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }

  .rr-panel {
    align-items: flex-start;
    padding: 1.25rem;
  }

  .rr-panel-left {
    padding-top: 10svh;
  }

  .rr-panel-right {
    align-items: flex-end;
    border-top: none;
    border-left: 0;
    padding-bottom: 10svh;
  }

  .rr-panel-copy {
    width: min(90%, 24rem);
  }
}
`;
