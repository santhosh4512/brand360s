"use client";

import { useEffect, useRef, useMemo } from "react";

/* ────────────────────────────────────────────────────────────────────────
   Cinematic scroll-reveal hero — a pinned editorial title sequence.

   Choreography:
   1. The background image starts scaled and un-zooms smoothly into full screen (0 -> 0.22).
   2. The initial headline "High-Impact Writing for Authority & Search Visibility" displays over the image.
   3. Only AFTER the background settles into full screen (p >= 0.22), the center seam line appears,
      grows into a vertical bar (0.22 -> 0.38), and wipes across the full viewport (0.38 -> 0.60).
   4. Three full-bleed project visuals cascade in sequentially with clip-path scale.
   5. An outro headline scales up smoothly and stays firmly centered with progressive text illumination.
   ──────────────────────────────────────────────────────────────────────── */

// ── Images ───────────────────────────────────────────────────────────────
const BG = "/images/content-writing-hero.jpg";
const IMAGES = [
  "/images/process_step4.jpg",
  "/images/process_step5.jpg",
  "/images/brand-story-writing.webp",
];

// ── Palette (Signature Brand Palette) ──────────────────────────────────
const CREAM = "#f7f8fa";
const CURTAIN = "#243e76"; // Deep Brand Navy
const INK = "#243e76";
const ACCENT = "#0481a2"; // Aegean Teal

// Clip-path polygons
const REV_SEAM = [49.5, 50, 50.5, 50, 50.5, 50, 49.5, 50]; // collapsed centre dot
const REV_BAR = [49.5, 0, 50.5, 0, 50.5, 100, 49.5, 100]; //  thin vertical bar
const REV_FULL = [0, 0, 100, 0, 100, 100, 0, 100]; //          whole screen
const IMG_SEAM = [50, 50, 50, 50, 50, 50, 50, 50]; //          collapsed centre
const IMG_FULL = [0, 0, 100, 0, 100, 100, 0, 100]; //          fully revealed

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

// Sub-tween over [start, end]
const seg = (p: number, start: number, end: number) =>
  p <= start ? 0 : p >= end ? 1 : (p - start) / (end - start);

const lerpPoly = (a: number[], b: number[], t: number) =>
  a.map((v, i) => lerp(v, b[i], t));
const poly = (a: number[]) =>
  `polygon(${a[0]}% ${a[1]}%, ${a[2]}% ${a[3]}%, ${a[4]}% ${a[5]}%, ${a[6]}% ${a[7]}%)`;

const OUTRO_TEXT =
  "Create content that educates, engages and converts. Our content marketing services strengthen credibility, support SEO and deliver consistent visibility without the cost of an in-house team.";

function Img({ src }: { src: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#101c38",
        backgroundImage: `url("${src}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

export default function ScrollRevealHero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const revealerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outroRef = useRef<HTMLDivElement>(null);
  const outroTextRef = useRef<HTMLHeadingElement>(null);

  const outroWords = useMemo(() => {
    return OUTRO_TEXT.split(/(\s+)/).map((word, idx) => {
      if (word.match(/^\s+$/)) {
        return <span key={`sp-${idx}`}> </span>;
      }
      return (
        <span
          key={`w-${idx}`}
          className="sr-word inline-block will-change-transform"
          style={{
            display: "inline-block",
            willChange: "transform, opacity, filter",
          }}
        >
          {word}
        </span>
      );
    });
  }, []);

  useEffect(() => {
    const bg = bgRef.current;
    const chrome = chromeRef.current;
    const content = contentRef.current;
    const revealer = revealerRef.current;
    const imagesWrap = imagesRef.current;
    const outro = outroRef.current;
    const outroText = outroTextRef.current;
    if (!bg || !content || !revealer || !imagesWrap || !outro) return;

    const fade = [bg, chrome, content, revealer, imagesWrap];

    // Drive the whole title sequence from original normalised progress value 0→1
    const apply = (p: number) => {
      // 1. background un-zooms 1.5 → 1 over the first half
      bg.style.transform = `scale(${lerp(1.5, 1, easeOut(seg(p, 0, 0.5)))})`;

      // 2. blue revealer: a centre seam grows to a bar (→0.2), then opens fully (→0.5)
      revealer.style.clipPath =
        p < 0.2
          ? poly(lerpPoly(REV_SEAM, REV_BAR, easeOut(seg(p, 0, 0.2))))
          : poly(lerpPoly(REV_BAR, REV_FULL, easeOut(seg(p, 0.2, 0.5))));

      // 3. three images cascade in, staggered, each a clip-path reveal + scale-up
      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        const t = easeOut(seg(p, 0.4 + i * 0.04, 0.4 + i * 0.04 + 0.16));
        img.style.clipPath = poly(lerpPoly(IMG_SEAM, IMG_FULL, t));
        img.style.transform = `translate(-50%, -50%) scale(${t})`;
      });

      // 4. the first layers vanish under the now full-screen outro at 0.7
      const lit = p < 0.7 ? "1" : "0";
      for (const el of fade) if (el) el.style.opacity = lit;

      // 5. outro headline scales up smoothly and stays firmly centered (exact original scale formula)
      const grow = easeOut(seg(p, 0.54, 0.75));
      outro.style.transform = `translate(-50%, -50%) scale(${grow})`;
      outro.style.opacity = String(p >= 0.52 ? 1 : 0);

      // 6. Subtle kinetic word illumination over the outro scroll window
      if (outroText && p >= 0.54) {
        const words = outroText.querySelectorAll<HTMLElement>(".sr-word");
        const total = words.length;
        const textProgress = easeOut(seg(p, 0.56, 0.88));

        words.forEach((wEl, wIdx) => {
          const startThresh = (wIdx / total) * 0.65;
          const endThresh = Math.min(1, startThresh + 0.35);
          const wp = easeOut(seg(textProgress, startThresh, endThresh));

          wEl.style.opacity = String(lerp(0.2, 1, wp));
          wEl.style.filter = `blur(${lerp(4, 0, wp)}px)`;
          wEl.style.transform = `translateY(${lerp(10, 0, wp)}px)`;
        });
      }
    };

    const card = new URLSearchParams(window.location.search).has("card");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;

    if (card) {
      if (reduced) {
        apply(0);
        return;
      }
      const DUR = 5200;
      const HOLD = 950;
      const start = performance.now();
      const loop = (now: number) => {
        const t = (now - start) % (DUR + HOLD);
        apply(t < DUR ? t / DUR : 1);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      const loop = () => {
        const pin = pinRef.current;
        if (pin) {
          const dist = pin.offsetHeight - window.innerHeight;
          apply(dist > 0 ? clamp(-pin.getBoundingClientRect().top / dist, 0, 1) : 0);
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="sr-root" style={{ fontFamily: "'Varela Round', sans-serif" }}>
      <style>{css}</style>

      <section className="sr-pin" ref={pinRef}>
        <div className="sr-stage">
          {/* Background Image */}
          <div className="sr-bg" ref={bgRef}>
            <Img src={BG} />
          </div>

          {/* Initial Headline */}
          <div className="sr-content" ref={contentRef}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif" }}>High-Impact Writing for<br />Authority &amp; Search Visibility</h1>
          </div>

          {/* Blue Centre Seam Revealer */}
          <div className="sr-revealer" ref={revealerRef} />

          {/* Cascading Project Visuals */}
          <div className="sr-images" ref={imagesRef}>
            {IMAGES.map((src, i) => (
              <div
                key={src}
                className="sr-img"
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
              >
                <Img src={src} />
              </div>
            ))}
          </div>

          {/* Outro Solid Headline */}
          <div className="sr-outro" ref={outroRef}>
            <h1 ref={outroTextRef}>
              {outroWords}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}

const css = `
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Varela+Round&display=swap");

.sr-root{
  --cream:${CREAM}; --curtain:${CURTAIN}; --ink:${INK}; --accent:${ACCENT};
  background:var(--cream);
  font-family:'Varela Round', sans-serif;
}
.sr-root *{margin:0;padding:0;box-sizing:border-box;}
.sr-root h1,.sr-root h2,.sr-root h3,.sr-root p{
  font-family:'Varela Round', sans-serif;
  font-weight:700;line-height:1.15;letter-spacing:-0.01em;
}
.sr-root h1{font-size:clamp(2rem,4vw,4.5rem);color:#ffffff;}
.sr-root h3{font-size:clamp(1.75rem,2.6vw,2.8rem);color:var(--curtain);}
.sr-root p{font-size:1.15rem;font-weight:500;color:#243e76;line-height:1.6;}

/* tall wrapper provides the scroll distance the sticky stage is pinned through */
.sr-pin{position:relative;width:100%;height:450svh;}
.sr-stage{
  position:sticky;top:0;
  width:100%;height:100svh;overflow:hidden;
  background:var(--cream);z-index:2;
}

.sr-bg,.sr-content,.sr-revealer,.sr-images,.sr-chrome{
  position:absolute;top:0;left:0;width:100%;height:100%;will-change:transform,opacity;
}
.sr-bg{transform:scale(1.5);}
.sr-bg::after{
  content:"";
  position:absolute;
  inset:0;
  background:rgba(16, 28, 56, 0.55);
}

.sr-content{
  display:flex;justify-content:center;align-items:center;text-align:center;
  padding:2rem;color:#ffffff;z-index:3;
}
.sr-content h1{
  font-family:'Outfit', sans-serif !important;
  width:85%;
  max-width:1150px;
  font-size:clamp(2.4rem, 4.8vw, 5.2rem);
  font-weight:800;
  line-height:1.16;
  letter-spacing:-0.02em;
  color:#ffffff;
  text-shadow:0 6px 32px rgba(16,28,56,0.85);
  margin:0;
}

.sr-revealer{
  background-color:var(--curtain);z-index:4;
  clip-path:polygon(49.5% 50%, 50.5% 50%, 50.5% 50%, 49.5% 50%);
}

.sr-images{z-index:5;}
.sr-img{
  position:absolute;top:50%;left:50%;width:100%;height:100%;
  transform:translate(-50%,-50%) scale(0);
  clip-path:polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
  will-change:transform,clip-path;
}

.sr-outro{
  position:absolute;top:50%;left:50%;width:100%;height:100%;
  transform:translate(-50%,-50%) scale(0);will-change:transform;
  display:flex;justify-content:center;align-items:center;text-align:center;
  padding:clamp(1.5rem, 4vw, 3.5rem);background-color:var(--curtain);color:#ffffff;z-index:7;
}
.sr-outro h1{
  width:88%;
  max-width:1050px;
  font-size:clamp(1.35rem, 2.3vw, 2.5rem);
  line-height:1.5;
  letter-spacing:-0.015em;
  font-weight:700;
  text-shadow:0 4px 24px rgba(16,28,56,0.6);
  color:#ffffff;
}

.sr-word{
  display:inline-block;
  margin-right:0.22em;
}

@media (max-width:1000px){
  .sr-content h1{width:92%;}
  .sr-outro h1{width:92%;font-size:clamp(1.15rem, 3.5vw, 1.6rem);line-height:1.45;}
}
`;
