'use client';
import { useEffect, useRef } from 'react';
import s from './NumaExperience.module.css';

const top = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
];

const bottom = [
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
];

const middle = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
];

const features = [
  {
    number: '01',
    line1: 'White-hat,',
    line2: 'sustainable SEO',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '02',
    line1: 'Local SEO & Google',
    line2: 'Maps optimization',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '03',
    line1: 'Data-driven',
    line2: 'keyword strategy',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
  },
  {
    number: '04',
    line1: 'Continuous monitoring',
    line2: '& optimization',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=700&q=80',
  },
];

const TRUST_BADGES = [
  '16+ Years Hands-On Experience',
  '34+ Years Combined Founder Experience',
  'Chennai-Based Team',
];

const OUTRO_WORDS = [
  'Visibility',
  'on',
  'Google',
  'is',
  'critical',
  'for',
  'business',
  'growth',
  'in',
  'a',
  'competitive',
  'market',
  'like',
];

const FINALE_WORDS = ['Why', 'Chennai', 'Businesses', 'Choose'];

const PARADE_CARDS = [
  {
    tag: 'HEALTHCARE',
    tagBg: s.tagHealthcare,
    title: 'Healthcare clinics (Velachery)',
    desc: 'Trust-first local SEO',
  },
  {
    tag: 'RETAIL',
    tagBg: s.tagRetail,
    title: 'Retail showrooms (Porur)',
    desc: 'Footfall-driving Maps visibility',
  },
  {
    tag: 'EDUCATION',
    tagBg: s.tagEducation,
    title: 'Educational institutions (Anna Nagar)',
    desc: 'Admissions-focused search intent',
  },
  {
    tag: 'ECOMMERCE',
    tagBg: s.tagEcommerce,
    title: 'Ecommerce brands',
    desc: 'Product and category-level SEO',
  },
  {
    tag: 'B2B',
    tagBg: s.tagB2b,
    title: 'B2B suppliers',
    desc: 'Authority and technical SEO over volume keywords',
  },
];

const clamp = (v) => Math.min(1, Math.max(0, v));
const range = (v, a, b) => clamp((v - a) / (b - a));
const ease = (v) => v * v * (3 - 2 * v);

export default function NumaExperience() {
  const track = useRef(null);
  const viewportRef = useRef(null);
  const hero = useRef(null);
  const titleRef = useRef(null);
  const capsules = useRef([]);
  const device = useRef(null);
  const statement = useRef(null);
  const stats = useRef(null);
  const badgeRefs = useRef([]);

  const outroRef = useRef(null);
  const outroWordsRef = useRef([]);
  const flyingCardRef = useRef(null);
  const cardShineRef = useRef(null);
  const seoSourceWordRef = useRef(null);
  const letterORef = useRef(null);

  const finalRevealRef = useRef(null);
  const finaleWordsRef = useRef([]);
  const finaleCardRef = useRef(null);
  const paradeCardRefs = useRef([]);
  const blueBackdropRef = useRef(null);
  const prewarmRef = useRef(null);

  useEffect(() => {
    // Pre-warm the SEO glyph texture atlas in GPU memory at max zoom resolution immediately on mount:
    if (prewarmRef.current) {
      const _w = prewarmRef.current.offsetWidth;
      prewarmRef.current.getBoundingClientRect();
    }

    let frame = 0;
    let p = 0;
    let last = performance.now();
    let cachedGeometry = null;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onResize = () => {
      cachedGeometry = null;
    };
    window.addEventListener('resize', onResize);

    const getSourceGeometry = () => {
      if (cachedGeometry) return cachedGeometry;
      const word = seoSourceWordRef.current;
      const letterO = letterORef.current;
      const pin = viewportRef.current || track.current;
      if (!word || !pin) {
        const defaultScale = Math.min(135 / 22, (window.innerWidth * 0.65) / 80);
        return { x: 0, y: 0, scale: defaultScale, originX: '83.3%', originY: '50%' };
      }
      const ancestors = [];
      for (let node = word; node && node !== pin; node = node.parentElement) {
        ancestors.push([node, node.style.transform]);
        node.style.transform = 'none';
      }
      try {
        const wordRect = word.getBoundingClientRect();
        const oRect = letterO ? letterO.getBoundingClientRect() : wordRect;
        const bounds = pin.getBoundingClientRect();
        const fontSize = parseFloat(window.getComputedStyle(word).fontSize) || 22;

        const oCenterX = oRect.left + oRect.width / 2;
        const oCenterY = oRect.top + oRect.height / 2;
        const screenCenterX = bounds.left + bounds.width / 2;
        const screenCenterY = bounds.top + bounds.height / 2;

        const x = screenCenterX - oCenterX;
        const y = screenCenterY - oCenterY;

        const originXPercent = ((oCenterX - wordRect.left) / wordRect.width) * 100;
        const originYPercent = ((oCenterY - wordRect.top) / wordRect.height) * 100;

        cachedGeometry = {
          x,
          y,
          scale: Math.min(125 / fontSize, (bounds.width * 0.55) / Math.max(1, wordRect.width)),
          originX: `${originXPercent.toFixed(2)}%`,
          originY: `${originYPercent.toFixed(2)}%`,
        };
        return cachedGeometry;
      } finally {
        ancestors.forEach(([node, transform]) => {
          node.style.transform = transform;
        });
      }
    };

    const tick = (now) => {
      if (!track.current) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const activeScrollDistance = Math.max(1, track.current.offsetHeight - innerHeight * 2);
      const target = clamp(
        -track.current.getBoundingClientRect().top / activeScrollDistance
      );

      p += (target - p) * (reduced ? 1 : 1 - Math.exp(-dt * 11));

      const w = innerWidth;
      const h = innerHeight;
      const mobile = w < 700;
      const cw = mobile ? w * 0.54 : w * 0.238;
      const ch = mobile ? h * 0.235 : h * 0.335;
      const gap = mobile ? 12 : w * 0.012;
      const step = cw + gap;
      const cx = (w - cw) / 2;
      const cy = (h - ch) / 2;

      // 1. Hero shrink & travel
      const shrink = ease(range(p, 0.02, 0.12));
      const travel = ease(range(p, 0.15, 0.28));
      const arrive = ease(range(p, 0.12, 0.16));
      const depart = ease(range(p, 0.28, 0.35));

      const hw = w + (cw - w) * shrink;
      const hh = h + (ch - h) * shrink;

      if (hero.current) {
        hero.current.style.width = hw + 'px';
        hero.current.style.height = hh + 'px';
        hero.current.style.transform = `translate3d(${
          cx * shrink - travel * step * 4
        }px,${cy * shrink}px,0)`;
        hero.current.style.borderRadius =
          (Math.min(hw, hh) / 2) * ease(range(p, 0.015, 0.08)) + 'px';
        hero.current.style.opacity = String(1 - depart);
      }

      // Title fades out immediately
      const textFade = 1 - ease(range(p, 0.01, 0.05));
      if (titleRef.current) {
        titleRef.current.style.opacity = String(textFade);
        titleRef.current.style.transform = `translate3d(${(1 - textFade) * -35}px, 0, 0)`;
        titleRef.current.style.filter = `blur(${(1 - textFade) * 6}px)`;
      }

      // 2. Portrait capsules
      capsules.current.forEach((el, i) => {
        if (!el) return;
        let x = 0;
        let y = cy;
        if (i < 5) {
          x = cx + (i - 5) * step + travel * 4 * step - (1 - arrive) * w + depart * w * 1.5;
          y = cy - ch - gap;
        } else if (i < 10) {
          x = cx + (i - 10) * step + travel * 4 * step - (1 - arrive) * w + depart * w * 1.5;
          y = cy + ch + gap;
        } else {
          x = cx + (i - 9) * step - travel * 4 * step + (1 - arrive) * w - depart * w;
        }
        el.style.width = cw + 'px';
        el.style.height = ch + 'px';
        el.style.transform = `translate3d(${x}px,${y}px,0)`;
        el.style.opacity = String(range(p, 0.12, 0.15));
      });

      // 3. Product capsule & statement headline
      const textWidth = statement.current?.scrollWidth || w * 1.6;
      const textX = cx + cw + gap * 2;
      const cardsX = textX + textWidth + w * 0.1;
      const horizontal = ease(range(p, 0.36, 0.47)) * cardsX;
      const textEnter = ease(range(p, 0.33, 0.37));

      if (device.current) {
        device.current.style.width = cw + 'px';
        device.current.style.height = ch + 'px';
        device.current.style.opacity = String(range(p, 0.22, 0.25));
        device.current.style.transform = `translate3d(${
          cx + 4 * step * (1 - travel) - horizontal
        }px,${cy}px,0) rotate(${-70 * ease(range(p, 0.36, 0.44))}deg)`;
      }

      if (statement.current) {
        statement.current.style.transform = `translate3d(${
          textX + (1 - textEnter) * w - horizontal
        }px,0,0)`;
        statement.current.style.opacity = String(range(p, 0.32, 0.35));
      }

      // 4. Cards and Badges exit up/fade (ONLY AFTER the 3 points have fully settled and held)
      const cardExit = ease(range(p, 0.59, 0.66));

      if (stats.current) {
        const exitY = -cardExit * h * 1.3;
        const exitRotX = cardExit * 45;
        const exitScale = 1 - cardExit * 0.25;
        const exitOpacity = 1 - cardExit;
        const exitBlur = cardExit * 8;
        stats.current.style.transform = `translate3d(${cardsX - horizontal}px, ${exitY}px, 0) scale(${exitScale}) rotateX(${exitRotX}deg)`;
        stats.current.style.opacity = String(exitOpacity);
        stats.current.style.filter = `blur(${exitBlur}px)`;
        stats.current.style.visibility = p > 0.35 && p < 0.67 ? 'visible' : 'hidden';
      }

      // Trust Badges animation (Enters early and settles firmly before card exit)
      badgeRefs.current.forEach((el, idx) => {
        if (!el) return;
        const itemProgress = ease(range(p, 0.46 + idx * 0.018, 0.51 + idx * 0.018));
        const startX = -100 * (idx + 1);
        const exitY = -cardExit * 50;
        const opacity = itemProgress * (1 - cardExit);
        el.style.transform = `translate3d(${startX * (1 - itemProgress)}px, ${exitY}px, 0) scale(${0.88 + 0.12 * itemProgress - cardExit * 0.15})`;
        el.style.opacity = String(opacity);
        el.style.filter = `blur(${(1 - itemProgress + cardExit) * 6}px)`;
        el.style.visibility = p > 0.44 && p < 0.67 ? 'visible' : 'hidden';
      });

      // 5. OUTRO SECTION (Visibility on Google heading + flying card)
      const outroEnter = ease(range(p, 0.63, 0.67));
      const surroundFade = 1 - ease(range(p, 0.71, 0.74));

      if (outroRef.current) {
        outroRef.current.style.visibility = p > 0.62 && p < 0.80 ? 'visible' : 'hidden';
        outroRef.current.style.opacity = String(p < 0.67 ? outroEnter : 1);
      }

      // Outro words flying 3D
      outroWordsRef.current.forEach((wordEl, idx) => {
        if (!wordEl) return;
        const wordProg = ease(range(p, 0.63 + idx * 0.003, 0.665 + idx * 0.003));
        const y = (1 - wordProg) * 55;
        const rotY = (1 - wordProg) * (idx % 2 === 0 ? -45 : 45);
        const rotX = (1 - wordProg) * 35;
        const scale = 0.5 + 0.5 * wordProg;
        const opacity = wordProg * surroundFade;
        const blur = (1 - wordProg) * 10 + (1 - surroundFade) * 8;
        wordEl.style.transform = `translate3d(0, ${y}px, 0) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;
        wordEl.style.opacity = String(opacity);
        wordEl.style.filter = `blur(${blur}px)`;
      });

      // Flying card
      if (flyingCardRef.current) {
        const cardProg = ease(range(p, 0.64, 0.67));
        const y = (1 - cardProg) * 65;
        const rotX = (1 - cardProg) * 30;
        const scale = 0.75 + 0.25 * cardProg;
        flyingCardRef.current.style.transform = `translate3d(0, ${y}px, 0) rotateX(${rotX}deg) scale(${scale})`;
        flyingCardRef.current.style.backgroundColor = `rgba(255, 255, 255, ${cardProg * 0.95 * surroundFade})`;
        flyingCardRef.current.style.borderColor = `rgba(226, 232, 240, ${cardProg * surroundFade})`;
        flyingCardRef.current.style.boxShadow = surroundFade > 0.1 ? `0 25px 60px -15px rgba(11, 39, 72, ${0.15 * surroundFade})` : 'none';
      }

      // Shimmer beam
      if (cardShineRef.current) {
        const beamProg = range(p, 0.66, 0.70);
        cardShineRef.current.style.transform = `translateX(${-120 + beamProg * 340}%) skewX(-25deg)`;
        cardShineRef.current.style.opacity = String(range(p, 0.66, 0.675) * (1 - range(p, 0.685, 0.70)));
      }

      // Surrounding card text
      const surroundEls = flyingCardRef.current?.querySelectorAll(`.${s.cardTextSurround}, .${s.cardAccentLine}`);
      surroundEls?.forEach((el) => {
        el.style.opacity = String(surroundFade);
        el.style.filter = `blur(${(1 - surroundFade) * 8}px)`;
      });

      // 6. EXACT 2-STAGE "SEO" WORD ZOOM INTO LETTER 'O'
      // Symmetrically and seamlessly reversible on backward scroll
      if (seoSourceWordRef.current) {
        const geom = getSourceGeometry();
        seoSourceWordRef.current.style.transformOrigin = `${geom.originX} ${geom.originY}`;

        if (p < 0.71) {
          seoSourceWordRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
          seoSourceWordRef.current.style.opacity = String(outroEnter);
        } else if (p < 0.74) {
          // Stage 1: Lift off paragraph and smoothly center on screen
          const centerProg = ease(range(p, 0.71, 0.74));
          const curX = geom.x * centerProg;
          const curY = geom.y * centerProg;
          const curScale = 1 + (geom.scale - 1) * centerProg;
          seoSourceWordRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${curScale})`;
          seoSourceWordRef.current.style.opacity = '1';
        } else {
          // Stage 2: Cinematic mega-zoom directly through letter 'O' (sharp vector scaling)
          const zoomProg = ease(range(p, 0.74, 0.785));
          const zoomScale = geom.scale * (1 + zoomProg * 28.0);
          const zoomOpacity = Math.max(0, 1 - ease(range(p, 0.758, 0.782)));
          seoSourceWordRef.current.style.transform = `translate3d(${geom.x}px, ${geom.y}px, 0) scale(${zoomScale})`;
          seoSourceWordRef.current.style.opacity = String(zoomOpacity);
        }
      }

      // Blue Universe Backdrop Transition (Zooms into deep blue world)
      const blueBgProg = ease(range(p, 0.74, 0.785));
      if (blueBackdropRef.current) {
        blueBackdropRef.current.style.opacity = String(blueBgProg);
      }

      // 7. FINALE REVEAL (Emerges SIMULTANEOUSLY inside the 'O' aperture zoom!)
      const finaleProg = ease(range(p, 0.745, 0.785));
      if (finalRevealRef.current) {
        finalRevealRef.current.style.visibility = p > 0.74 ? 'visible' : 'hidden';
        finalRevealRef.current.style.opacity = String(finaleProg);
        finalRevealRef.current.style.transform = `translate3d(0, ${(1 - finaleProg) * 30}px, 0) scale(${0.75 + 0.25 * finaleProg})`;
        finalRevealRef.current.style.filter = `blur(${(1 - finaleProg) * 6}px)`;
      }

      finaleWordsRef.current.forEach((wordEl, idx) => {
        if (!wordEl) return;
        const wProg = ease(range(p, 0.745 + idx * 0.002, 0.78 + idx * 0.002));
        wordEl.style.transform = `translate3d(0, ${(1 - wProg) * 25}px, 0) rotateX(${(1 - wProg) * 25}deg) scale(${0.7 + 0.3 * wProg})`;
        wordEl.style.opacity = String(wProg);
        wordEl.style.filter = `blur(${(1 - wProg) * 4}px)`;
      });

      if (finaleCardRef.current) {
        const fCardProg = ease(range(p, 0.755, 0.79));
        finaleCardRef.current.style.transform = `translate3d(0, ${(1 - fCardProg) * 30}px, 0) rotateX(${(1 - fCardProg) * 15}deg) scale(${0.85 + 0.15 * fCardProg})`;
        finaleCardRef.current.style.opacity = String(fCardProg);
        finaleCardRef.current.style.filter = `blur(${(1 - fCardProg) * 6}px)`;
      }

      // 8. 3D CURVED FLYING CARDS PARADE (Starts IMMEDIATELY alongside finale)
      const paradeProgress = range(p, 0.77, 0.985);
      const spacing = 0.28;
      const totalDuration = 1.0 + (5 - 1) * spacing;
      const progress = paradeProgress * totalDuration;

      paradeCardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        if (p < 0.765) {
          cardEl.style.display = 'none';
          cardEl.style.opacity = '0';
          return;
        }
        const t = progress - idx * spacing;
        if (t < -0.25 || t > 1.25) {
          cardEl.style.display = 'none';
          cardEl.style.opacity = '0';
          return;
        }
        const startX = w + 350;
        const endX = -420;
        const x = startX + t * (endX - startX);
        const centerY = h * 0.72;
        const archHeight = h * 0.22;
        const yOffset = Math.cos((t - 0.5) * Math.PI) * (-archHeight);
        const y = centerY + yOffset;
        const slope = -Math.sin((t - 0.5) * Math.PI);
        const rotation = -slope * 8.5;
        const distFromCenter = Math.abs(t - 0.5);
        const scale = 1.0 - Math.min(0.12, distFromCenter * 0.24);
        let opacity = 1;
        if (t < 0) opacity = (t + 0.25) / 0.25;
        else if (t > 1.0) opacity = (1.25 - t) / 0.25;
        opacity = Math.max(0, Math.min(1, opacity));
        cardEl.style.display = 'flex';
        cardEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
        cardEl.style.opacity = String(opacity);
        cardEl.style.zIndex = String(40 + Math.round((1 - distFromCenter) * 10));
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={s.root}>
      <section className={s.journey} ref={track} aria-label="Numa introduction and features">
        <div className={s.viewport} ref={viewportRef}>
          {/* Blue Universe Backdrop for post-zoom */}
          <div ref={blueBackdropRef} className={s.blueBackdrop} />

          {/* Hero Capsule */}
          <div className={s.hero} ref={hero}>
            <img
              src="/hero-chennai-seo.jpg"
              alt="SEO Services in Chennai"
            />
            <div className={s.heroHeadline} ref={titleRef}>
              <div className={s.heroTitleLine1}>SEO Services</div>
              <div className={s.heroTitleLine2}>
                in Chennai
                <svg className={s.titleUnderline} viewBox="0 0 260 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 14C70 4 190 2 256 12" stroke="#0481a2" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Background portrait capsules */}
          <div className={s.portraits} aria-hidden="true">
            {[...top, ...bottom, ...middle].map((src, i) => (
              <div
                className={s.capsule}
                key={i}
                ref={(el) => {
                  capsules.current[i] = el;
                }}
              >
                <img src={src} alt="" />
              </div>
            ))}
          </div>

          {/* 3D Device capsule */}
          <div ref={device} className={s.device}>
            <div className={s.deviceWhitePill}>
              <span className={s.deviceBadge}>SEO</span>
            </div>
          </div>

          {/* Large Statement */}
          <h2 ref={statement} className={s.statement}>
            SEO Services in Chennai
          </h2>

          {/* 4 Feature Cards with Content Overlay */}
          <div ref={stats} className={s.stats} id="features">
            {features.map((f, idx) => (
              <article className={s.feature} key={idx}>
                <div className={s.featureImageWrap}>
                  <img src={f.image} alt={`${f.line1} ${f.line2}`} className={s.featureImg} />
                  <div className={s.featureOverlay} />
                </div>
                <div className={s.featureCopy}>
                  <h3>
                    <span>{f.line1}</span>
                    <br />
                    <span>{f.line2}</span>
                  </h3>
                </div>
              </article>
            ))}
          </div>

          {/* Trust Badges */}
          <div className={s.trustBadgesRow}>
            {TRUST_BADGES.map((badgeText, bIdx) => (
              <div
                key={bIdx}
                ref={(el) => {
                  badgeRefs.current[bIdx] = el;
                }}
                className={s.trustBadgeItem}
              >
                <span className={s.badgeText}>{badgeText}</span>
              </div>
            ))}
          </div>

          {/* OUTRO SECTION */}
          <div ref={outroRef} className={s.outroSection}>
            <div className={s.outroHeadingWrapper}>
              <h3 className={s.outroHeading}>
                {OUTRO_WORDS.map((w, idx) => (
                  <span
                    key={idx}
                    ref={(el) => {
                      outroWordsRef.current[idx] = el;
                    }}
                    className={s.flyingWord}
                  >
                    {w}
                  </span>
                ))}
                <span
                  ref={(el) => {
                    outroWordsRef.current[OUTRO_WORDS.length] = el;
                  }}
                  className={s.flyingWord}
                >
                  <span className={s.chennaiHighlight}>Chennai.</span>
                </span>
              </h3>
            </div>

            <div ref={flyingCardRef} className={s.flyingCard}>
              <div ref={cardShineRef} className={s.cardShineBeam} />
              <div className={s.cardAccentLine} />
              <p className={s.flyingCardText}>
                <span className={s.cardTextSurround}>Brand 360s approaches </span>
                <span
                  ref={seoSourceWordRef}
                  className={s.seoSourceWord}
                >
                  <svg
                    className={s.seoSvg}
                    viewBox="0 0 520 220"
                    preserveAspectRatio="xMinYMid meet"
                    aria-hidden="true"
                  >
                    <text
                      x="0"
                      y="175"
                      className={s.svgSeoText}
                    >
                      SE<tspan ref={letterORef} className={s.svgLetterO}>O</tspan>
                    </text>
                  </svg>
                </span>
                <span className={s.cardTextSurround}>
                  {' '}as a structured growth system — part of a larger{' '}
                  <a
                    href="https://brand360s.com/services/digital-marketing-agency-in-chennai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.cardLink}
                  >
                    digital marketing agency in Chennai
                  </a>{' '}
                  strategy — backed by 16+ years of SEO experience across Velachery, Porur and Anna Nagar.
                </span>
              </p>
            </div>

            {/* Offscreen Pre-Warm High-Res SEO Texture Buffer */}
            <div
              ref={prewarmRef}
              aria-hidden="true"
              className={s.seoPrewarm}
            >
              <svg viewBox="0 0 520 220" width="520" height="220">
                <text x="0" y="175" className={s.svgSeoText}>
                  SEO
                </text>
              </svg>
            </div>
          </div>

          {/* FINALE REVEAL SECTION */}
          <div ref={finalRevealRef} className={s.finaleSection}>
            <div className={s.finaleHeadingWrapper}>
              <h2 className={s.finaleHeading}>
                {FINALE_WORDS.map((w, idx) => (
                  <span
                    key={idx}
                    ref={(el) => {
                      finaleWordsRef.current[idx] = el;
                    }}
                    className={s.finaleWord}
                  >
                    {w}
                  </span>
                ))}
                <span
                  ref={(el) => {
                    finaleWordsRef.current[FINALE_WORDS.length] = el;
                  }}
                  className={`${s.finaleWord} ${s.brandColor}`}
                >
                  Brand 360s
                </span>
                <span
                  ref={(el) => {
                    finaleWordsRef.current[FINALE_WORDS.length + 1] = el;
                  }}
                  className={s.finaleWord}
                >
                  for
                </span>
                <span
                  ref={(el) => {
                    finaleWordsRef.current[FINALE_WORDS.length + 2] = el;
                  }}
                  className={`${s.finaleWord} ${s.brandColor}`}
                >
                  SEO
                </span>
              </h2>
            </div>

            <div ref={finaleCardRef} className={s.finaleSubtitleWrapper}>
              <p className={s.finaleSubtitle}>
                <span className={s.finaleAccent}>16+ years across categories</span> means we&apos;re not learning your industry from scratch:
              </p>
            </div>
          </div>

          {/* 3D CURVED FLYING CARDS PARADE LAYER */}
          <div className={s.paradeLayer}>
            {PARADE_CARDS.map((card, cIdx) => (
              <div
                key={cIdx}
                ref={(el) => {
                  paradeCardRefs.current[cIdx] = el;
                }}
                className={s.paradeCard}
              >
                <div className={s.paradeCardHeader}>
                  <span className={`${s.paradeTag} ${card.tagBg}`}>
                    {card.tag}
                  </span>
                  <span className={s.paradeNumber}>0{cIdx + 1}</span>
                </div>
                <h4 className={s.paradeTitle}>{card.title}</h4>
                <p className={s.paradeDesc}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
