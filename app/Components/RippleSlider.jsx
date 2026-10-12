"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────────────────────
   Ripple Slider — Sticky scroll-driven WebGL water ripple shader showcasing
   the 6 Executive PR Process steps:
   1. Discovery & Positioning
   2. Story Development
   3. Media Opportunity Research
   4. PR Strategy Planning
   5. Campaign Execution
   6. Performance Review
   ──────────────────────────────────────────────────────────────────────────── */

const SLIDES = [
  {
    number: "01",
    title: "Discovery & Positioning",
    description:
      "Understand professional goals, achievements and visibility opportunities.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "02",
    title: "Story Development",
    description:
      "Create compelling narratives that support executive positioning.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "03",
    title: "Media Opportunity Research",
    description:
      "Identify relevant publications and visibility channels.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "04",
    title: "PR Strategy Planning",
    description:
      "Develop customized visibility and outreach initiatives.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "05",
    title: "Campaign Execution",
    description:
      "Implement PR activities aligned with business objectives.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "06",
    title: "Performance Review",
    description:
      "Measure visibility growth and media impact.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85",
  },
];

// ── Shaders ───────────────────────────────────────────────────────────────────
const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = `
  uniform sampler2D uTexCurrent;
  uniform sampler2D uTexNext;
  uniform float     uProgress;
  uniform vec2      uResolution;
  uniform vec2      uImageRes;
  uniform float     uWaveFreq;
  uniform float     uWavePow;
  uniform float     uWaveWidth;
  uniform float     uFalloff;
  uniform float     uBoostStrength;
  uniform float     uCrossfadeWidth;
  uniform float     uMobile;
  varying vec2 vUv;

  vec2 getImageUv(vec2 uv, vec2 screenRes, vec2 imgRes, vec2 bMin, vec2 bMax) {
    vec2 boxUv   = (uv - bMin) / (bMax - bMin);
    vec2 boxSize = (bMax - bMin) * screenRes;
    float bAR    = boxSize.x / boxSize.y;
    float iAR    = imgRes.x  / imgRes.y;
    vec2 scale   = vec2(1.0);
    if (bAR > iAR) scale.y = iAR / bAR; else scale.x = bAR / iAR;
    return (boxUv - 0.5) * scale + 0.5;
  }

  bool insideBox(vec2 uv, vec2 bMin, vec2 bMax) {
    return uv.x >= bMin.x && uv.x <= bMax.x && uv.y >= bMin.y && uv.y <= bMax.y;
  }

  void main() {
    // Proportioned center image bounds shifted slightly downwards
    vec2 bMin = mix(vec2(0.31, 0.16), vec2(0.08, 0.22), uMobile);
    vec2 bMax = mix(vec2(0.69, 0.80), vec2(0.92, 0.74), uMobile);

    float ar     = uResolution.y / uResolution.x;
    vec2  coord  = vec2(vUv.x, vUv.y * ar);
    vec2  centre = vec2(0.5, 0.48 * ar);
    float dist   = distance(coord, centre);
    float time   = uProgress;

    vec2  displaced  = coord;
    float brightness = 0.0;
    float blend      = 0.0;

    if (time > 0.001) {
      float trailing = dist - time;
      if (trailing < uWaveWidth && trailing < 0.0) {
        float age   = -trailing;
        float decay = exp(-age * uFalloff);
        float wave  = sin(age * uWaveFreq) * decay;
        vec2  dir   = normalize(coord - centre);
        displaced  += dir * wave * uWavePow;
        brightness  = abs(wave) * uBoostStrength * decay;
      }
      blend = smoothstep(0.0, uCrossfadeWidth, -trailing);
    }

    vec2 fUv     = vec2(displaced.x, displaced.y / ar);
    vec2 imgUv   = getImageUv(fUv, uResolution, uImageRes, bMin, bMax);
    vec4 curr    = texture2D(uTexCurrent, imgUv);
    vec4 next    = texture2D(uTexNext,    imgUv);
    vec4 color   = mix(curr, next, blend);
    color.rgb   += color.rgb * brightness;
    if (!insideBox(fUv, bMin, bMax)) color = vec4(0.0);
    gl_FragColor = color;
  }
`;

// ── CSS ────────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Varela+Round&display=swap');

  .rslider-container {
    position: relative;
    width: 100%;
  }

  .rslider-stage {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    min-height: 560px;
    background:
      radial-gradient(85% 90% at 50% 6%, #ffffff 0%, rgba(248, 249, 250, 0) 55%),
      linear-gradient(158deg, #f8f9fa 0%, #DEE2E6 55%, #c8ced6 100%);
    overflow: hidden;
    font-family: 'Varela Round', sans-serif;
    user-select: none;
    z-index: 10;
  }

  /* SECTION HEADER */
  .rslider-header {
    position: absolute;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 48px);
    max-width: 860px;
    text-align: center;
    z-index: 12;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .rslider-main-heading {
    margin: 0;
    font-family: 'Outfit', sans-serif;
    font-size: clamp(20px, 3.2vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: #243e76;
  }

  .rslider-subtitle {
    margin: 0;
    font-family: 'Varela Round', sans-serif;
    font-size: clamp(12px, 1.35vw, 14.5px);
    line-height: 1.5;
    max-width: 680px;
    opacity: 0.88;
    font-weight: 400;
    color: #243e76;
  }

  .rslider-stage canvas {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
    filter: drop-shadow(0 25px 45px rgba(36, 62, 118, 0.18));
  }

  .rslider-content {
    position: absolute;
    inset: 0;
    user-select: none;
    pointer-events: none;
    z-index: 3;
  }

  .rslider-title {
    position: absolute;
    top: 57%;
    left: clamp(2rem, 5vw, 6rem);
    transform: translateY(-50%);
    max-width: 26vw;
    color: #243e76;
    font-family: 'Outfit', sans-serif;
    z-index: 4;
  }

  .rslider-step-num {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: clamp(0.9rem, 1.2vw, 1.1rem);
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #0481a2;
    margin-bottom: 0.5rem;
  }

  .rslider-title h1 {
    font-size: clamp(2rem, 3.2vw, 3.8rem);
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 1.12;
    overflow: hidden;
    margin: 0;
    font-family: 'Outfit', sans-serif;
    color: #243e76;
  }

  .rslider-desc {
    position: absolute;
    top: 57%;
    right: clamp(2rem, 5vw, 6rem);
    transform: translateY(-50%);
    width: 22%;
    max-width: 280px;
    color: #243e76;
    z-index: 4;
    overflow: hidden;
    font-family: 'Varela Round', sans-serif;
  }

  .rslider-desc p {
    font-size: clamp(0.9rem, 1.1vw, 1.05rem);
    font-weight: 400;
    line-height: 1.6;
    margin: 0;
    color: #243e76;
    opacity: 0.88;
  }

  .rsl-char-wrap  { display: inline-block; overflow: hidden; vertical-align: bottom; }
  .rsl-char-inner { display: inline-block; will-change: transform; }
  .rsl-line-wrap  { overflow: hidden; }
  .rsl-line-inner { display: block; will-change: transform; }

  @media (max-width: 1000px) {
    .rslider-title {
      left: 50%;
      top: 20%;
      transform: translateX(-50%);
      width: 88%;
      max-width: none;
      text-align: center;
    }
    .rslider-desc {
      width: 84%;
      max-width: none;
      text-align: center;
      top: unset;
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

// ── Easing ────────────────────────────────────────────────────────────────────
function easeOutPow2(t) { return 1 - (1 - t) * (1 - t); }

// ── DOM helpers ───────────────────────────────────────────────────────────────
function buildSlideEl(slide) {
  const el = document.createElement("div");
  el.className = "rslider-content";
  el.style.opacity = "0";

  const titleHtml = slide.title
    .split(" ")
    .map((word) => {
      const chars = word
        .split("")
        .map((c) => `<span class="rsl-char-wrap"><span class="rsl-char-inner">${c}</span></span>`)
        .join("");
      return `<span style="display:inline-block;margin-right:0.22em">${chars}</span>`;
    })
    .join("");

  el.innerHTML = `
    <div class="rslider-title">
      <span class="rslider-step-num">STEP ${slide.number}</span>
      <h1>${titleHtml}</h1>
    </div>
    <div class="rslider-desc">
      <div class="rsl-line-wrap"><div class="rsl-line-inner"><p>${slide.description}</p></div></div>
    </div>`;
  return el;
}

function chars(el) { return Array.from(el.querySelectorAll(".rsl-char-inner")); }
function lines(el) { return Array.from(el.querySelectorAll(".rsl-line-inner")); }

function textOut(el) {
  chars(el).forEach((c, i) => {
    c.style.transition = `transform .5s cubic-bezier(.4,0,.6,1) ${i * .018}s`;
    c.style.transform  = "translateY(-100%)";
  });
  lines(el).forEach((l) => {
    l.style.transition = "transform .5s cubic-bezier(.4,0,.6,1) .08s";
    l.style.transform  = "translateY(-100%)";
  });
}

function textIn(el) {
  chars(el).forEach((c) => { c.style.transition = "none"; c.style.transform = "translateY(100%)"; });
  lines(el).forEach((l) => { l.style.transition = "none"; l.style.transform = "translateY(100%)"; });
  el.style.opacity = "1";
  requestAnimationFrame(() => requestAnimationFrame(() => {
    chars(el).forEach((c, i) => {
      c.style.transition = `transform .5s cubic-bezier(.4,0,.2,1) ${i * .018}s`;
      c.style.transform  = "translateY(0%)";
    });
    lines(el).forEach((l) => {
      l.style.transition = "transform .5s cubic-bezier(.4,0,.2,1) .1s";
      l.style.transform  = "translateY(0%)";
    });
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function RippleSlider({ className = "" }) {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    if (!slider || !container) return;

    let rafId = 0;
    let cancelled = false;
    let renderer = null;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Three.js scene ───────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    slider.prepend(renderer.domElement);

    // ── Ripple config ────────────────────────────────────────────────────────
    const rCfg = {
      waveFreq: 25.0, wavePow: 0.035, waveWidth: 0.5,
      falloff: 10.0, boostStrength: 0.5, crossfadeWidth: 0.05,
      duration: 2000, endValue: 1.0,
    };

    function cornerDist() {
      const ratio = slider.clientHeight / slider.clientWidth;
      return Math.sqrt(0.25 + 0.25 * ratio * ratio);
    }

    const U = {
      uTexCurrent:    { value: null },
      uTexNext:       { value: null },
      uProgress:      { value: 0 },
      uResolution:    { value: new THREE.Vector2() },
      uImageRes:      { value: new THREE.Vector2(1600, 1060) },
      uWaveFreq:      { value: rCfg.waveFreq },
      uWavePow:       { value: rCfg.wavePow },
      uWaveWidth:     { value: rCfg.waveWidth },
      uFalloff:       { value: rCfg.falloff },
      uBoostStrength: { value: rCfg.boostStrength },
      uCrossfadeWidth:{ value: rCfg.crossfadeWidth },
      uMobile:        { value: window.innerWidth <= 1000 ? 1.0 : 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: U, transparent: true,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material));

    function handleResize() {
      if (!slider || !renderer) return;
      const w = slider.clientWidth, h = slider.clientHeight;
      renderer.setSize(w, h);
      U.uResolution.value.set(w, h);
      U.uMobile.value  = window.innerWidth <= 1000 ? 1.0 : 0.0;
      rCfg.endValue    = cornerDist() + rCfg.waveWidth;
      rCfg.duration    = window.innerWidth <= 1000 ? 1500 : 2000;
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    // ── Slide state ──────────────────────────────────────────────────────────
    let currentIndex = 0;
    let isTransitioning = false;
    let isRippling = false;
    let rippleStart = 0;
    let rippleUnlocked = false;
    let rippleNextIdx = 0;
    let currentSlideEl = null;
    let textures = [];

    function transitionTo(targetIdx) {
      if (targetIdx === currentIndex || textures.length === 0) return;
      if (isTransitioning) return;

      isTransitioning = true;

      if (isRippling) {
        isRippling = false;
        U.uProgress.value = 0;
        U.uTexCurrent.value = textures[currentIndex];
      }

      const outEl = currentSlideEl;
      if (outEl) textOut(outEl);

      U.uTexCurrent.value = textures[currentIndex];
      U.uTexNext.value    = textures[targetIdx];
      rippleNextIdx       = targetIdx;
      rippleStart         = performance.now();
      isRippling          = true;
      rippleUnlocked      = false;
      U.uProgress.value   = 0;

      setTimeout(() => {
        if (cancelled) return;
        outEl?.remove();
        const newEl = buildSlideEl(SLIDES[targetIdx]);
        slider.appendChild(newEl);
        currentSlideEl = newEl;
        textIn(newEl);
      }, 550);
    }

    // ── Render loop ──────────────────────────────────────────────────────────
    function render() {
      if (cancelled) return;

      if (isRippling) {
        const t = Math.min((performance.now() - rippleStart) / rCfg.duration, 1);
        const eased = easeOutPow2(t);
        U.uProgress.value = eased * rCfg.endValue;

        if (!rippleUnlocked && U.uProgress.value > 0.65) {
          rippleUnlocked = true;
          currentIndex = rippleNextIdx;
          isTransitioning = false;
        }
        if (t >= 1) {
          isRippling = false;
          U.uTexCurrent.value = textures[currentIndex];
          U.uProgress.value = 0;
          if (!rippleUnlocked) { currentIndex = rippleNextIdx; isTransitioning = false; }
        }
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    }

    // ── Scroll Progress Mapping ──────────────────────────────────────────────
    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      // Progress within the sticky container: 0 (top) -> 1 (bottom)
      const rawProgress = -rect.top / totalScroll;
      const p = Math.max(0, Math.min(1, rawProgress));

      // Calculate slide index from scroll position across all 6 slides
      const slideIndex = Math.min(
        SLIDES.length - 1,
        Math.max(0, Math.floor(p * (SLIDES.length - 0.02)))
      );

      if (slideIndex !== currentIndex && textures.length > 0 && !isTransitioning) {
        transitionTo(slideIndex);
      }
    };

    // ── Load textures with cross-origin support ──────────────────────────────
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    Promise.all(
      SLIDES.map((s) =>
        new Promise((res) =>
          loader.load(
            s.image,
            (tex) => {
              tex.minFilter = THREE.LinearFilter;
              tex.magFilter = THREE.LinearFilter;
              tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
              res(tex);
            },
            undefined,
            () => {
              const c = document.createElement("canvas");
              c.width = 1600; c.height = 1000;
              const ctx = c.getContext("2d");
              ctx.fillStyle = "#243e76";
              ctx.fillRect(0, 0, 1600, 1000);
              const fallbackTex = new THREE.CanvasTexture(c);
              res(fallbackTex);
            }
          )
        )
      )
    ).then((loaded) => {
      if (cancelled) return;
      textures = loaded;
      U.uTexCurrent.value = textures[0];
      U.uTexNext.value    = textures[1];

      // initial slide
      const el = buildSlideEl(SLIDES[0]);
      slider.appendChild(el);
      currentSlideEl = el;

      if (prefersReduced) {
        el.style.opacity = "1";
        return;
      }

      textIn(el);
      render();

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      // Click anywhere to advance to next slide
      const onClick = () => {
        const next = (currentIndex + 1) % SLIDES.length;
        transitionTo(next);
      };
      slider.addEventListener("click", onClick);

      slider.__cleanup = () => {
        window.removeEventListener("scroll", handleScroll);
        slider.removeEventListener("click", onClick);
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      slider.__cleanup?.();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`rslider-container relative w-full ${className}`}
      style={{ height: "600vh" }}
    >
      <div
        ref={sliderRef}
        className="rslider-stage sticky top-0 w-full h-screen overflow-hidden"
        aria-label="Executive PR Process Ripple Showcase"
      >
        <style dangerouslySetInnerHTML={{ __html: CSS }} />

        {/* SECTION HEADER */}
        <header className="rslider-header">
          <h2 className="rslider-main-heading">
            How Our Executive PR Process Works
          </h2>
          <p className="rslider-subtitle">
            Effective PR requires strategy, positioning and consistent visibility.
          </p>
        </header>
      </div>
    </div>
  );
}

