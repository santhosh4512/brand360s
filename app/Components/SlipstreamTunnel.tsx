"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────
   Slipstream — 12 Industry Cards (3 Layers of 4 Cards).
   Layer 1: Startups, Corporates, Tech, Finance
   Layer 2: Real Estate, FMCG, Agencies, Coaches
   Layer 3: Consultants, Education, Hospitality, Healthcare & MedTech
   Dark Blue Theme with Bottom Industry Name Labels on each card.
   ──────────────────────────────────────────────────────────────────────── */

const TOTAL = 12;
const CONTENT_LAYERS = 3; // Exactly 3 layers of 4 cards = 12 cards
const LAYER_GAP = 2200;
const START_OFFSET = -1800; // Deep initial position so first 4 cards start far away and zoom in
const EXIT_POINT = 1400;
const VISIBLE_DEPTH = 8500;

const RADIUS_X = 430;
const RADIUS_Y = 295;
const ITEM_W = 195;
const ITEM_H = 240;

// 12 Curated Industries with custom photos
const INDUSTRIES = [
  {
    name: "Startups",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Corporates",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tech",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Finance",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Real Estate",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "FMCG",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Agencies",
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Coaches",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Consultants",
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Education",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hospitality",
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Healthcare & Pharma",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
];

const overlayFor = (z: number) => {
  if (z >= EXIT_POINT) return 1;
  if (z > 0) return z / EXIT_POINT;
  if (z >= -2200) return 0;
  if (z > -VISIBLE_DEPTH) {
    const p = (Math.abs(z) - 2200) / (VISIBLE_DEPTH - 2200);
    return Math.min(1, Math.max(0, p * p));
  }
  return 1;
};

export default function SlipstreamTunnel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  // 3 distinct layers of 4 items starting deep in the background
  const layers = useMemo(() => {
    return Array.from({ length: CONTENT_LAYERS }, (_, i) => {
      const startIdx = i * 4;
      const items = [];
      for (let j = 0; j < 4; j++) {
        const n = startIdx + j;
        if (n >= TOTAL) break;
        const angle = (j / 4) * Math.PI * 2 - Math.PI / 2;
        items.push({
          name: INDUSTRIES[n].name,
          src: INDUSTRIES[n].src,
          x: Math.cos(angle) * RADIUS_X - ITEM_W / 2,
          y: Math.sin(angle) * RADIUS_Y - ITEM_H / 2,
        });
      }
      return { baseZ: START_OFFSET - i * LAYER_GAP, items };
    });
  }, []);

  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[][]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Total camera distance to zoom through all 3 layers from deep background past the exit
    const TOTAL_TRAVEL = Math.abs(START_OFFSET) + (CONTENT_LAYERS - 0.2) * LAYER_GAP + EXIT_POINT;

    const getProgress = () => {
      if (!sectionRef.current) return 0;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDist = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollableDist <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / scrollableDist));
    };

    const initialProgress = getProgress();
    let targetZ = initialProgress * TOTAL_TRAVEL;
    let currentZ = targetZ;

    const renderScene = (camZ: number) => {
      // 1. Render the 3 layers (12 cards)
      layers.forEach((layer, i) => {
        const z = layer.baseZ + camZ;
        const ov = Math.min(1, Math.max(0, overlayFor(z)));
        const el = layerRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(0, 0, ${z.toFixed(1)}px)`;
          el.style.visibility = ov >= 0.999 ? "hidden" : "visible";
        }
        overlayRefs.current[i]?.forEach((o) => {
          if (o) o.style.opacity = `${ov.toFixed(3)}`;
        });
      });

      // 2. Reveal Center Content after all 12 cards fly past (progress ~ 0.65 to 0.85)
      if (contentRef.current) {
        const norm = camZ / TOTAL_TRAVEL; // 0 to 1
        const revealStart = 0.65;
        const revealEnd = 0.84;

        if (norm < revealStart) {
          contentRef.current.style.opacity = "0";
          contentRef.current.style.transform = "scale(0.94)";
          contentRef.current.style.pointerEvents = "none";
          setShowContent(false);
        } else if (norm >= revealStart && norm < revealEnd) {
          const t = (norm - revealStart) / (revealEnd - revealStart);
          const easeT = t * t * (3 - 2 * t);
          contentRef.current.style.opacity = `${easeT.toFixed(3)}`;
          contentRef.current.style.transform = `scale(${(0.94 + easeT * 0.06).toFixed(3)})`;
          contentRef.current.style.pointerEvents = easeT > 0.5 ? "auto" : "none";
          setShowContent(true);
        } else {
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "scale(1)";
          contentRef.current.style.pointerEvents = "auto";
          setShowContent(true);
        }
      }
    };

    const onScroll = () => {
      const progress = getProgress();
      targetZ = progress * TOTAL_TRAVEL;
    };

    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    let raf = 0;
    const tick = () => {
      currentZ += (targetZ - currentZ) * 0.16;
      renderScene(currentZ);
      raf = requestAnimationFrame(tick);
    };

    // Render immediately on mount
    renderScene(currentZ);

    if (!reduced) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [layers]);

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] bg-[#ffffff]">
      <style>{css}</style>

      {/* STICKY 3D VIEWPORT */}
      <div ref={stageRef} className="sl-stage sticky top-0 h-screen w-full">
        
        {/* 3D PHOTO TUNNEL (3 Layers x 4 Cards = 12 Cards Total) */}
        <div className="sl-tunnel">
          {layers.map((layer, i) => (
            <div
              key={i}
              className="sl-layer"
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
            >
              {layer.items.map((it, j) => (
                <div
                  key={j}
                  className="sl-item"
                  style={{ left: `${it.x}px`, top: `${it.y}px` }}
                >
                  {/* Photo Card Frame */}
                  <div className="sl-photo-frame">
                    <div
                      className="sl-photo"
                      style={{ backgroundImage: `url("${it.src}")` }}
                    />
                    <div
                      className="sl-overlay"
                      ref={(el) => {
                        (overlayRefs.current[i] ||= [])[j] = el;
                      }}
                    />
                  </div>
                  {/* External Industry Name Label BELOW the Card */}
                  <div className="sl-label-under">
                    <span>{it.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* REVEALING CENTER CONTENT (Blooms in dead center after 12 cards finish) */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-30 flex items-center justify-center px-6 pointer-events-none select-none will-change-transform opacity-0"
        >
          <div className="text-center max-w-3xl sm:max-w-4xl mx-auto flex flex-col items-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#243e76] tracking-tight leading-[1.15] mb-4 sm:mb-5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Industries We Serve
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#243e76]/85 leading-relaxed max-w-3xl font-medium"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              We create tailored pitch decks using{" "}
              <a
                href="https://www.prezent.ai/blog/business-storytelling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0481a2] font-bold underline underline-offset-4 decoration-[#0481a2]/70 hover:text-[#243e76] hover:decoration-[#243e76] transition-all inline cursor-pointer"
              >
                executive presentation design
              </a>{" "}
              and corporate storytelling for diverse business audiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .sl-stage{position:sticky;top:0;width:100%;height:100vh;overflow:hidden;
    background:radial-gradient(120% 120% at 50% 50%, #f8fafc 0%, #ffffff 65%, #f1f5f9 100%);
    perspective:1000px;cursor:grab;font-family:"Outfit",sans-serif;
    -webkit-user-select:none;user-select:none;}
  .sl-stage:active{cursor:grabbing;}

  .sl-tunnel{position:absolute;top:50%;left:50%;transform:translate3d(-50%,-50%,0);
    transform-style:preserve-3d;}
  .sl-layer{position:absolute;will-change:transform;transform-style:preserve-3d;}
  
  .sl-item{position:absolute;width:${ITEM_W}px;display:flex;flex-direction:column;align-items:center;}
  .sl-photo-frame{position:relative;width:${ITEM_W}px;height:${ITEM_H}px;
    border-radius:12px;overflow:hidden;
    border:1px solid rgba(36,62,118,0.15);
    box-shadow:0 20px 45px -10px rgba(36,62,118,0.22), 0 0 20px rgba(4,129,162,0.08);}
  .sl-photo{width:100%;height:100%;background-size:cover;background-position:center;
    background-color:#f1f5f9;}
  .sl-overlay{position:absolute;inset:0;background:#ffffff;pointer-events:none;}

  .sl-label-under{
    margin-top:10px;
    text-align:center;
    width:max-content;
    max-width:240px;
    pointer-events:none;
  }
  .sl-label-under span{
    font-family:'Outfit',sans-serif;
    font-size:14px;
    font-weight:700;
    letter-spacing:0.06em;
    text-transform:uppercase;
    display:block;
    color:#243e76;
    text-shadow:0 1px 10px rgba(255,255,255,0.9);
  }

  .sl-chrome{position:absolute;left:0;right:0;z-index:10;display:flex;
    align-items:center;justify-content:space-between;
    padding:0 clamp(1.4rem,4vw,3rem);pointer-events:none;color:#243e76;}
  .sl-bottom{bottom:clamp(1.4rem,4vh,2.4rem);}
  .sl-meta,.sl-hint{font-size:11px;font-weight:600;letter-spacing:.18em;
    text-transform:uppercase;}
  .sl-hint{color:#0481a2;mix-blend-mode:normal;}
  .sl-hint::before{content:"";display:inline-block;width:22px;height:1px;
    background:#0481a2;margin-right:10px;vertical-align:middle;}

  @media (max-width:560px){ .sl-meta{display:none;} }
`;
