"use client";

import React, { CSSProperties, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

.kex-scroll-page {
  width: 100%;
  background: #243e76;
  font-family: 'Varela Round', sans-serif;
  overflow: clip;
}

.kex-scroll-scene {
  position: relative;
  height: 440vh;
  background: #243e76;
}

.kex-sticky-stage {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #243e76;
}

/* PAGE 1 (HERO 1 - GMB FOUNDATION SETUP) */

.kex-hero-content {
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: clamp(24px, 5vw, 72px);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #243e76;
  font-family: 'Varela Round', sans-serif;
}

.kex-hero-title {
  margin: 0;
  max-width: 1200px;
  font-size: clamp(60px, 10.5vw, 175px);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #ffffff;
  font-family: 'Varela Round', sans-serif;
}

.kex-hero-subtitle {
  position: absolute;
  left: clamp(24px, 5vw, 72px);
  bottom: clamp(26px, 5vw, 72px);
  max-width: 920px;
  margin: 0;
  font-size: clamp(20px, 2.4vw, 38px);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #ffffff;
  font-family: 'Varela Round', sans-serif;
}

/* STACKING CARD LAYER */

.kex-card-layer {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: auto;
}

.kex-scroll-card {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100vh;
  background: var(--card-bg);
  color: var(--card-text);
  transform-origin: 14% 0%;
  will-change: transform, opacity, filter;
  overflow: hidden;
  box-shadow: 0 -25px 60px rgba(16, 28, 56, 0.45);
  font-family: 'Varela Round', sans-serif;
}

/* DELIVERABLES CARDS (PAGES 2, 4, 6) */

.kex-card-inner-page {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: clamp(20px, 3.5vw, 54px) clamp(24px, 5vw, 72px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.kex-content-grid {
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  gap: clamp(24px, 3.5vw, 64px);
  align-items: start;
}

.kex-section-heading {
  margin: 0 0 clamp(12px, 1.8vh, 20px);
  font-size: clamp(22px, 2.4vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ffffff;
  font-family: 'Varela Round', sans-serif;
}

.kex-items-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(6px, 0.9vh, 11px) clamp(10px, 1.3vw, 18px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.kex-list-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: clamp(12px, 0.95vw, 15px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.96);
  line-height: 1.35;
  font-family: 'Varela Round', sans-serif;
}

.kex-list-dot {
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.kex-right-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(20px, 3.5vh, 44px);
}

.kex-results-list {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.2vh, 14px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.kex-results-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 500;
  color: #ffffff;
  line-height: 1.4;
  font-family: 'Varela Round', sans-serif;
}

.kex-results-dot {
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}

.kex-enquire-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: clamp(12px, 1.5vh, 18px) clamp(30px, 2.8vw, 44px);
  background: #ffffff;
  color: var(--btn-text, #243e76);
  font-size: clamp(15px, 1.3vw, 19px);
  font-weight: 700;
  letter-spacing: -0.01em;
  border-radius: 9999px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  box-shadow: 0 8px 24px rgba(16, 28, 56, 0.3);
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  font-family: 'Varela Round', sans-serif;
}

.kex-enquire-btn:hover {
  transform: scale(1.05);
  background: #243e76;
  color: #ffffff;
  box-shadow: 0 12px 30px rgba(36, 62, 118, 0.5);
}

/* HERO BANNER CARDS (PAGES 3 & 5) */

.kex-engine-hero {
  position: relative;
  width: 100%;
  height: 100%;
  padding: clamp(24px, 5vw, 72px);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Varela Round', sans-serif;
}

.kex-engine-title {
  margin: 0;
  max-width: 1200px;
  font-size: clamp(60px, 10.5vw, 175px);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #ffffff;
  font-family: 'Varela Round', sans-serif;
}

.kex-engine-subtitle {
  position: absolute;
  left: clamp(24px, 5vw, 72px);
  bottom: clamp(26px, 5vw, 72px);
  max-width: 980px;
  margin: 0;
  font-size: clamp(20px, 2.4vw, 38px);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #ffffff;
  font-family: 'Varela Round', sans-serif;
}

@media (max-width: 900px) {
  .kex-content-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    overflow-y: auto;
  }
  .kex-items-list {
    grid-template-columns: 1fr;
  }
}
`;

// PAGE 2 DATA (GMB Foundation Setup)
const foundationSetupList = [
  "Primary & secondary categories",
  "SEO-rich business description",
  "Services + products added and optimized",
  "Attributes (women-led, online booking, etc.)",
  "Opening & holiday hours",
  "NAP consistency",
  "15 geo-tagged photos uploaded",
  "3 optimized videos (if available)",
  "Cover photo + logo optimization",
  "15 high-quality citations",
  "Q&A seeding (3-5 questions)",
  "Review request templates",
  'Geo-keyword placement ("service + Chennai", "near me")',
  "Local keyword research (Chennai + neighborhoods)",
];

const foundationExpectedList = [
  "30-70% visibility lift",
  'Appear for "near me" searches',
  "Strong base for ranking in top 10",
];

// PAGE 4 DATA (GMB Growth Engine)
const growthMonthlyList = [
  "4-8 GMB posts (offers, testimonials, updates)",
  "Keyword-optimized captions",
  "10 new geo-tagged photos",
  "Templates + staff review scripts",
  "Ranking radius growth: 2-5 km → 5-10 km",
  "Category monitoring",
  "Competitor insight tracking",
  "CTR improvement (photos, captions, buttons)",
  "Duplicate listing cleanup (if needed)",
  "Monthly visibility + ranking report",
  "Review velocity system (4-10 new reviews/month)",
  'Local keyword expansion ("service in Anna Nagar", "near Mogappair")',
];

const growthExpectedList = [
  "Significant keyword movement",
  "Higher Maps visibility",
  "Consistent calls/messages",
  "100-300% engagement lift",
];

// PAGE 6 DATA (Local Dominance Program)
const dominanceExecutionList = [
  "Full monthly GMB optimization",
  "Conversion-focused descriptions",
  "Competitor keyword tracking",
  "Local landing pages (if website exists)",
  "Entity strengthening for Google Maps",
  "Daily posting (5-6 days/week)",
  "30 geo-tagged photos + 6-8 videos/month",
  "Review velocity & sentiment system",
  "Keyword-rich review prompts",
  "Negative review handling",
  "30-50 local citations",
  "Local backlinks from Chennai directories",
  "Spam competitor cleanup",
  "CTR optimization",
  "High-engagement media upload system",
  "Monthly ranking + traffic insights",
  'Hyperlocal strategy ("service + Anna Nagar / Mogappair / Chennai")',
];

const dominanceExpectedList = [
  "Top-3 Maps rank for multiple keywords",
  "Hyperlocal dominance (3-5 km)",
  "200-400% visibility growth",
  "Strong authority even vs. larger chains",
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export default function ScrollRevealCards() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTargetProgress = () => {
      const scene = sceneRef.current;
      if (!scene) return;

      const rect = scene.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      targetProgress.current = clamp(
        -rect.top / Math.max(scrollable, 1),
        0,
        1,
      );
    };

    const render = () => {
      currentProgress.current = lerp(
        currentProgress.current,
        targetProgress.current,
        0.085,
      );

      const progress = currentProgress.current;

      // First Hero (Page 1) lift and fade
      if (heroTitleRef.current) {
        const heroLift = clamp(progress / 0.15, 0, 1);
        heroTitleRef.current.style.transform = `translate3d(0, ${lerp(0, -90, heroLift)}px, 0)`;
        heroTitleRef.current.style.opacity = `${lerp(1, 0.45, heroLift)}`;
      }

      if (heroSubtitleRef.current) {
        const subtitleFade = clamp(progress / 0.12, 0, 1);
        heroSubtitleRef.current.style.transform = `translate3d(0, ${lerp(0, -40, subtitleFade)}px, 0)`;
        heroSubtitleRef.current.style.opacity = `${lerp(1, 0, subtitleFade)}`;
      }

      // Stacking Cards: Card 0 (Page 2), Card 1 (Page 3), Card 2 (Page 4), Card 3 (Page 5), Card 4 (Page 6)
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        // Spread 5 cards across scroll range
        const start = 0.05 + index * 0.185;
        const end = start + 0.175;

        const raw = clamp((progress - start) / (end - start), 0, 1);
        const eased = easeOutCubic(raw);
        const settle = easeInOutCubic(raw);

        const y = lerp(110, 0, eased);
        const x = lerp(8, 0, eased);
        const rotate = lerp(-6, 0, settle);
        const scale = lerp(1.04, 1, eased);

        const opacity = raw <= 0 ? 0 : lerp(0.3, 1, eased);
        const blur = lerp(4, 0, eased);

        card.style.transform = `
          translate3d(${x}vw, ${y}vh, 0)
          rotate(${rotate}deg)
          scale(${scale})
        `;

        card.style.opacity = `${opacity}`;
        card.style.filter = `blur(${blur}px)`;
        card.style.zIndex = `${20 + index}`;
      });

      frameRef.current = requestAnimationFrame(render);
    };

    updateTargetProgress();
    window.addEventListener("scroll", updateTargetProgress, { passive: true });
    window.addEventListener("resize", updateTargetProgress);

    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", updateTargetProgress);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <div className="kex-scroll-page">
        <section ref={sceneRef} className="kex-scroll-scene">
          <div className="kex-sticky-stage">
            {/* PAGE 1: GMB FOUNDATION SETUP (#243e76) */}
            <div className="kex-hero-content">
              <h1 ref={heroTitleRef} className="kex-hero-title">
                GMB
                <br />
                FOUNDATION
                <br />
                SETUP
              </h1>

              <p ref={heroSubtitleRef} className="kex-hero-subtitle">
                One-time optimization to build a clean, structured and search-ready Google Business Profile.
              </p>
            </div>

            {/* STACKING CARDS LAYER */}
            <div className="kex-card-layer">
              {/* PAGE 2: WHAT WE SET UP + EXPECTED IN 30 DAYS (#0481a2) */}
              <div
                ref={(el) => {
                  cardRefs.current[0] = el;
                }}
                className="kex-scroll-card"
                style={
                  {
                    "--card-bg": "#0481a2",
                    "--card-text": "#ffffff",
                    "--btn-text": "#0481a2",
                  } as CSSProperties
                }
              >
                <div className="kex-card-inner-page">
                  <div className="kex-content-grid">
                    {/* What We Set Up */}
                    <div>
                      <h2 className="kex-section-heading">What We Set Up:</h2>
                      <ul className="kex-items-list">
                        {foundationSetupList.map((item, index) => (
                          <li key={index} className="kex-list-item">
                            <span className="kex-list-dot" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expected in 30 days & Enquire Now */}
                    <div className="kex-right-column">
                      <div>
                        <h2 className="kex-section-heading">Expected in 30 days:</h2>
                        <ul className="kex-results-list">
                          {foundationExpectedList.map((item, index) => (
                            <li key={index} className="kex-results-item">
                              <span className="kex-results-dot" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <a
                          href="#contact"
                          className="kex-enquire-btn"
                          onClick={(e) => {
                            const contactSection = document.getElementById("contact");
                            if (contactSection) {
                              e.preventDefault();
                              contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 3: GMB GROWTH ENGINE (#243e76) */}
              <div
                ref={(el) => {
                  cardRefs.current[1] = el;
                }}
                className="kex-scroll-card"
                style={
                  {
                    "--card-bg": "#243e76",
                    "--card-text": "#ffffff",
                    "--btn-text": "#243e76",
                  } as CSSProperties
                }
              >
                <div className="kex-engine-hero">
                  <h1 className="kex-engine-title">
                    GMB
                    <br />
                    GROWTH
                    <br />
                    ENGINE
                  </h1>

                  <p className="kex-engine-subtitle">
                    A 3–6 month program to expand ranking radius, improve visibility and increase calls and walk-ins.
                  </p>
                </div>
              </div>

              {/* PAGE 4: MONTHLY WORK INCLUDES + EXPECTED BY MONTH 3-6 (#0481a2) */}
              <div
                ref={(el) => {
                  cardRefs.current[2] = el;
                }}
                className="kex-scroll-card"
                style={
                  {
                    "--card-bg": "#0481a2",
                    "--card-text": "#ffffff",
                    "--btn-text": "#0481a2",
                  } as CSSProperties
                }
              >
                <div className="kex-card-inner-page">
                  <div className="kex-content-grid">
                    {/* Monthly Work Includes */}
                    <div>
                      <h2 className="kex-section-heading">Monthly Work Includes:</h2>
                      <ul className="kex-items-list">
                        {growthMonthlyList.map((item, index) => (
                          <li key={index} className="kex-list-item">
                            <span className="kex-list-dot" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expected by Month 3-6 & Enquire Now */}
                    <div className="kex-right-column">
                      <div>
                        <h2 className="kex-section-heading">Expected by Month 3-6:</h2>
                        <ul className="kex-results-list">
                          {growthExpectedList.map((item, index) => (
                            <li key={index} className="kex-results-item">
                              <span className="kex-results-dot" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <a
                          href="#contact"
                          className="kex-enquire-btn"
                          onClick={(e) => {
                            const contactSection = document.getElementById("contact");
                            if (contactSection) {
                              e.preventDefault();
                              contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 5: LOCAL DOMINANCE PROGRAM (#243e76) */}
              <div
                ref={(el) => {
                  cardRefs.current[3] = el;
                }}
                className="kex-scroll-card"
                style={
                  {
                    "--card-bg": "#243e76",
                    "--card-text": "#ffffff",
                    "--btn-text": "#243e76",
                  } as CSSProperties
                }
              >
                <div className="kex-engine-hero">
                  <h1 className="kex-engine-title">
                    LOCAL
                    <br />
                    DOMINANCE
                    <br />
                    PROGRAM
                  </h1>

                  <p className="kex-engine-subtitle">
                    A 6–9 month plan built to secure top-3 Google Maps rankings and long-term local SEO authority.
                  </p>
                </div>
              </div>

              {/* PAGE 6: AGGRESSIVE LOCAL SEO EXECUTION + EXPECTED BY MONTH 6-9 (#0481a2) */}
              <div
                ref={(el) => {
                  cardRefs.current[4] = el;
                }}
                className="kex-scroll-card"
                style={
                  {
                    "--card-bg": "#0481a2",
                    "--card-text": "#ffffff",
                    "--btn-text": "#0481a2",
                  } as CSSProperties
                }
              >
                <div className="kex-card-inner-page">
                  <div className="kex-content-grid">
                    {/* Aggressive Local SEO Execution */}
                    <div>
                      <h2 className="kex-section-heading">Aggressive Local SEO Execution:</h2>
                      <ul className="kex-items-list">
                        {dominanceExecutionList.map((item, index) => (
                          <li key={index} className="kex-list-item">
                            <span className="kex-list-dot" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expected by Month 6-9 & Enquire Now */}
                    <div className="kex-right-column">
                      <div>
                        <h2 className="kex-section-heading">Expected by Month 6-9:</h2>
                        <ul className="kex-results-list">
                          {dominanceExpectedList.map((item, index) => (
                            <li key={index} className="kex-results-item">
                              <span className="kex-results-dot" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <a
                          href="#contact"
                          className="kex-enquire-btn"
                          onClick={(e) => {
                            const contactSection = document.getElementById("contact");
                            if (contactSection) {
                              e.preventDefault();
                              contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
