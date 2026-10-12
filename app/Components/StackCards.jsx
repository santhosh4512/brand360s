"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
const CARDS = [{ title: "White-hat, sustainable SEO", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", bg: "#0B2748" }, { title: "Local SEO & Google Maps optimization", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop", bg: "#0077B6" }, { title: "Data-driven keyword strategy", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", bg: "#0284C7" }, { title: "Continuous monitoring & optimization", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop", bg: "#0A192F" }];
const TRUST_BADGES = ["16+ Years Hands-On Experience", "34+ Years Combined Founder Experience", "Chennai-Based Team"];
const Y_STEP = 16, SCALE_STEP = 0.055;
const PARADE_CARDS = [
  { tag: "HEALTHCARE", tagBg: "bg-blue-50 text-[#0077b6] border-blue-200", title: "Healthcare clinics (Velachery)", desc: "Trust-first local SEO" },
  { tag: "RETAIL", tagBg: "bg-cyan-50 text-[#0284c7] border-cyan-200", title: "Retail showrooms (Porur)", desc: "Footfall-driving Maps visibility" },
  { tag: "EDUCATION", tagBg: "bg-slate-100 text-[#133863] border-slate-200", title: "Educational institutions (Anna Nagar)", desc: "Admissions-focused search intent" },
  { tag: "ECOMMERCE", tagBg: "bg-blue-50 text-[#0077b6] border-blue-200", title: "Ecommerce brands", desc: "Product and category-level SEO" },
  { tag: "B2B", tagBg: "bg-cyan-50 text-[#0284c7] border-cyan-200", title: "B2B suppliers", desc: "Authority and technical SEO over volume keywords" }
];

export default function StackCards({ className = "" }) {
  const triggerRef = useRef(null), pinContainerRef = useRef(null), headerRef = useRef(null), seoOriginTextRef = useRef(null), fullHeaderContentRef = useRef(null), cardRefs = useRef([]), badgeRefs = useRef([]), outroRef = useRef(null), seoSourceWordRef = useRef(null), finalRevealRef = useRef(null), paradeCardRefs = useRef([]);
  useEffect(() => {
    if (!triggerRef.current || !pinContainerRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean), badges = badgeRefs.current.filter(Boolean), total = cards.length;
      gsap.set(headerRef.current, { y: 0, opacity: 1 });
      gsap.set(seoSourceWordRef.current, { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)", transformOrigin: "83% 50%" });
      gsap.set(paradeCardRefs.current, { opacity: 0, display: "none" });

      const getSourceGeometry = () => {
        const word = seoSourceWordRef.current, pin = pinContainerRef.current;
        if (!word || !pin) return { x: 0, y: 0, scale: 1 };
        const ancestors = [];
        for (let node = word; node && node !== pin; node = node.parentElement) {
          ancestors.push([node, node.style.transform]); node.style.transform = "none";
        }
        try {
          const rect = word.getBoundingClientRect(), bounds = pin.getBoundingClientRect();
          const fontSize = parseFloat(window.getComputedStyle(word).fontSize) || 22;
          return {
            x: bounds.left + bounds.width / 2 - (rect.left + rect.width * 0.83),
            y: bounds.top + bounds.height / 2 - (rect.top + rect.height / 2),
            scale: Math.min(135 / fontSize, bounds.width * 0.65 / Math.max(1, rect.width))
          };
        } finally { ancestors.forEach(([node, transform]) => { node.style.transform = transform; }); }
      };

      const vCards = paradeCardRefs.current.filter(Boolean);
      const spacing = 0.28;
      const totalDuration = 1.0 + (5 - 1) * spacing;

      const updateParadePositions = (progressVal) => {
        const progress = progressVal * totalDuration;
        vCards.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const t = progress - idx * spacing;
          if (t < -0.25 || t > 1.25) {
            gsap.set(cardEl, { display: "none", opacity: 0 });
            return;
          }
          const startX = window.innerWidth + 350;
          const endX = -420;
          const x = startX + t * (endX - startX);
          const centerY = window.innerHeight * 0.77;
          const archHeight = window.innerHeight * 0.25;
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
          gsap.set(cardEl, {
            display: "flex",
            x: x,
            y: y,
            xPercent: -50,
            yPercent: -50,
            rotation: rotation,
            scale: scale,
            opacity: opacity,
            zIndex: 40 + Math.round((1 - distFromCenter) * 10),
          });
        });
      };

      gsap.set(seoOriginTextRef.current, { scale: 0, opacity: 0, display: "block" });
      if (finalRevealRef.current) {
        gsap.set(finalRevealRef.current, { scale: 0.2, opacity: 0, y: 40, filter: "blur(20px)" });
        const fWords = finalRevealRef.current.querySelectorAll(".finale-word");
        gsap.set(fWords, { opacity: 0, scale: 0.4, y: 50, rotateX: 40, filter: "blur(12px)", transformOrigin: "center bottom" });
        const fCard = finalRevealRef.current.querySelector(".finale-card");
        if (fCard) gsap.set(fCard, { opacity: 0, scale: 0.7, y: 60, rotateX: 25, filter: "blur(14px)", transformOrigin: "center top" });
      }
      const headerLines = fullHeaderContentRef.current ? fullHeaderContentRef.current.querySelectorAll(".header-3d-line") : [];
      gsap.set(headerLines, { opacity: 0, scale: 0.85, y: 20, rotateX: -25, filter: "blur(8px)", transformOrigin: "center bottom" });
      const getBadgeStartX = (badge) => {
        const pin = pinContainerRef.current;
        const pinLeft = pin ? pin.getBoundingClientRect().left : 0;
        const rect = badge ? badge.getBoundingClientRect() : { right: 0 };
        return -(Math.max(window.innerWidth, rect.right - pinLeft) + 200);
      };
      gsap.set(badges, { x: (i, target) => getBadgeStartX(target), opacity: 0, scale: 0.85, filter: "blur(8px)" });
      if (outroRef.current) gsap.set(outroRef.current, { opacity: 0, scale: 0.8, y: 90, rotationX: -18, filter: "blur(14px)" });
      cards.forEach((card, i) => gsap.set(card, { xPercent: -50, yPercent: -50, y: i * Y_STEP, scale: 1 - i * SCALE_STEP, rotationX: 0, opacity: 1, transformOrigin: "center bottom", zIndex: total - i }));
      ScrollTrigger.create({
        trigger: triggerRef.current, start: "top 80%", onEnter: () => {
          const expandTl = gsap.timeline();
          expandTl.to(seoOriginTextRef.current, { scale: 1.25, opacity: 1, duration: 0.45, ease: "back.out(2)" }).to(seoOriginTextRef.current, { scale: 1, duration: 0.25, ease: "power2.out" }).to(seoOriginTextRef.current, { scale: 1.6, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power2.inOut", onComplete: () => { if (seoOriginTextRef.current) seoOriginTextRef.current.style.display = "none" } }, "+=0.15").to(headerLines, { opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.12, duration: 0.8, ease: "back.out(1.6)" }, "-=0.25");
        }, onLeaveBack: () => { if (seoOriginTextRef.current) { seoOriginTextRef.current.style.display = "block"; gsap.set(seoOriginTextRef.current, { scale: 0, opacity: 0, filter: "blur(0px)" }) } gsap.set(headerLines, { opacity: 0, scale: 0.85, y: 20, rotateX: -25, filter: "blur(8px)" }) }
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: triggerRef.current, start: "top top", end: "+=7600", pin: pinContainerRef.current, pinSpacing: true, scrub: 0.4, anticipatePin: 1, invalidateOnRefresh: true } });
      const badgeDuration = 0.65, badgeGap = 0.12;
      badges.forEach((badge, idx) => {
        const startBadgeTime = 0.05 + idx * (badgeDuration + badgeGap);
        tl.fromTo(badge, { x: () => getBadgeStartX(badge), opacity: 0, scale: 0.85, filter: "blur(8px)" }, { x: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "power3.out", duration: badgeDuration }, startBadgeTime);
      });
      const allBadgesFixedTime = 0.05 + badges.length * (badgeDuration + badgeGap) + 0.15;
      const headerExitDuration = 0.75 + (headerLines.length > 0 ? (headerLines.length - 1) * 0.12 : 0);
      tl.to(headerLines, { y: -55, rotateX: 55, scale: 0.82, opacity: 0, filter: "blur(8px)", stagger: 0.12, duration: 0.75, ease: "power2.inOut", transformOrigin: "center top" }, allBadgesFixedTime);
      const cardsStartTime = allBadgesFixedTime + headerExitDuration + 0.2;
      for (let i = 0; i < total; i++) { const currentCard = cards[i], stepTime = cardsStartTime + i * 1.0; tl.to(currentCard, { yPercent: -380, y: -300, rotationX: 45, scale: 0.75, opacity: 0, filter: "blur(6px)", ease: "power2.inOut", duration: 1 }, stepTime); for (let j = i + 1; j < total; j++) { const behindStep = j - (i + 1); tl.to(cards[j], { y: behindStep * Y_STEP, scale: 1 - behindStep * SCALE_STEP, ease: "none", duration: 1 }, stepTime) } }
      const outroTime = cardsStartTime + (total - 1) * 1.0 + 0.45;
      if (outroRef.current) {
        tl.to(outroRef.current, { opacity: 1, scale: 1, y: 0, rotationX: 0, filter: "blur(0px)", ease: "power3.out", duration: 0.85 }, outroTime);
        const flyingHeadingWords = outroRef.current.querySelectorAll(".flying-word"), flyingCard = outroRef.current.querySelector(".flying-card"), cardShine = outroRef.current.querySelector(".card-shine-beam");
        if (flyingHeadingWords.length > 0) tl.fromTo(flyingHeadingWords, { y: 65, opacity: 0, scale: 0.4, rotateY: i => i % 2 === 0 ? -50 : 50, rotateX: 35, z: 120, filter: "blur(12px)", transformOrigin: "center bottom" }, { y: 0, opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0, filter: "blur(0px)", stagger: 0.035, ease: "back.out(2.2)", duration: 0.9 }, outroTime + 0.1);
        if (flyingCard) tl.fromTo(flyingCard, { y: 75, opacity: 0, scale: 0.72, rotateX: 35, filter: "blur(14px)", transformOrigin: "center top" }, { y: 0, opacity: 1, scale: 1, rotateX: 0, filter: "blur(0px)", ease: "back.out(1.8)", duration: 1 }, outroTime + 0.3);
        if (cardShine) tl.fromTo(cardShine, { xPercent: -120, opacity: 0 }, { xPercent: 220, opacity: 0.8, duration: 1.2, ease: "power2.inOut" }, outroTime + 0.55)
      }
      const extractTime = outroTime + 1.8;
      if (outroRef.current) {
        const surroundingContent = outroRef.current.querySelectorAll(".flying-word, .card-text-surround, .card-shine-beam, .flying-card > .absolute");
        tl.to(surroundingContent, { opacity: 0, filter: "blur(8px)", duration: 0.65, ease: "power2.inOut" }, extractTime);
        const descriptionCard = outroRef.current.querySelector(".flying-card");
        if (descriptionCard) {
          gsap.set(descriptionCard, { transition: "none" });
          tl.to(descriptionCard, { backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(241,245,249,0)", boxShadow: "0 0 0 0 rgba(0,0,0,0)", duration: 0.65, ease: "power2.inOut" }, extractTime);
        }
      }
      tl.to(badges, { scale: 0.6, opacity: 0, y: 30, filter: "blur(8px)", stagger: 0.03, duration: 0.5, ease: "power2.inOut" }, extractTime);
      if (seoSourceWordRef.current) {
        tl.to(seoSourceWordRef.current, {
          x: () => getSourceGeometry().x, y: () => getSourceGeometry().y,
          scale: () => getSourceGeometry().scale, opacity: 1, filter: "blur(0px)",
          duration: 0.9, ease: "power3.inOut", transformOrigin: "83% 50%"
        }, extractTime + 0.2);
        const zoomTime = extractTime + 1.5;
        tl.to(seoSourceWordRef.current, { scale: () => getSourceGeometry().scale * 70, opacity: 0, transformOrigin: "83% 50%", duration: 1.35, ease: "power2.inOut" }, zoomTime);
        const finaleTime = zoomTime + 0.32;
        if (finalRevealRef.current) {
          tl.to(finalRevealRef.current, {
            scale: 1,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "power3.out"
          }, finaleTime);

          const finaleWords = finalRevealRef.current.querySelectorAll(".finale-word");
          if (finaleWords.length > 0) {
            tl.to(finaleWords, {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              stagger: 0.035,
              duration: 0.95,
              ease: "back.out(2.2)"
            }, finaleTime + 0.1);
          }

          const finaleCard = finalRevealRef.current.querySelector(".finale-card");
          if (finaleCard) {
            tl.to(finaleCard, {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "back.out(1.8)"
            }, finaleTime + 0.35);
          }

          // Trigger the Flying Cards Parade as user continues scrolling
          const paradeStartTime = finaleTime + 1.1;
          tl.to({ val: 0 }, {
            val: 1,
            duration: 3.4,
            ease: "none",
            onUpdate: function () {
              updateParadePositions(this.progress());
            }
          }, paradeStartTime);
        }
      }
      tl.to({}, { duration: 2.2 });
    }, triggerRef);
    return () => ctx.revert()
  }, []);
  return (
    <div ref={triggerRef} className={`relative w-full bg-[#ffffff] text-[#133863] m-0 p-0 ${className}`}>
      <StyleTag />
      <section ref={pinContainerRef} className="w-full h-screen h-[100dvh] overflow-hidden relative select-none bg-[#ffffff] flex flex-col justify-between pt-6 sm:pt-8 pb-6 px-4 sm:px-8">
        <div ref={headerRef} className="relative w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center z-20 shrink-0 will-change-transform min-h-[105px] sm:min-h-[120px] perspective-[1000px]">
          <div ref={seoOriginTextRef} className="absolute inset-0 m-auto w-max h-max flex items-center justify-center select-none z-30 pointer-events-none will-change-transform"><span className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#0077b6] drop-shadow-md uppercase animate-pulse">SEO</span></div>
          <div ref={fullHeaderContentRef} className="w-full flex flex-col items-center justify-center space-y-1 will-change-transform perspective-[1000px]">
            <div className="header-3d-line will-change-transform"><p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.22em] uppercase text-[#0077b6]">SEO COMPANY IN CHENNAI</p></div>
            <div className="header-3d-line will-change-transform"><h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#133863] leading-tight"><span className="text-[#0077b6] drop-shadow-sm font-black">SEO Services</span> in Chennai</h2></div>
            <div className="header-3d-line will-change-transform"><p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500 pt-0.5">What you get:</p></div>
          </div></div>
        <div className="relative w-full flex-1 flex items-center justify-center perspective-[1200px] overflow-visible my-auto">
          {CARDS.map((c, i) => (<div key={c.title} ref={el => { cardRefs.current[i] = el }} className="stk-card" style={{ backgroundColor: c.bg }}><div className="stk-col stk-copy"><h2>{c.title}</h2></div><div className="stk-col stk-media"><div className="stk-img" style={{ backgroundImage: `url(${c.img})` }} /><div className="stk-overlay" /></div></div>))}
        </div>
        <div ref={outroRef} className="absolute inset-x-0 top-[9vh] sm:top-[11vh] md:top-[13vh] max-w-5xl mx-auto flex flex-col items-center justify-start text-center px-4 sm:px-8 z-40 pointer-events-auto will-change-transform">
          <div className="mb-6 sm:mb-8 max-w-4xl perspective-[1000px]"><h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-black tracking-tight text-[#133863] leading-[1.18] drop-shadow-sm flex flex-wrap justify-center gap-x-3 gap-y-2">{["Visibility", "on", "Google", "is", "critical", "for", "business", "growth", "in", "a", "competitive", "market", "like"].map((w, idx) => (<span key={idx} className="flying-word inline-block will-change-transform">{w}</span>))}<span className="flying-word inline-block will-change-transform"><span className="relative text-[#0077b6] font-black underline decoration-[#0077b6]/45 underline-offset-8">Chennai.</span></span></h3></div>
          <div className="flying-card will-change-transform relative max-w-4xl w-full p-7 sm:p-9 md:p-11 rounded-3xl bg-white border-2 border-slate-100 shadow-2xl shadow-blue-950/10 transition-all duration-300 hover:shadow-blue-900/15 hover:border-blue-200 hover:-translate-y-1 group overflow-visible">
            <div className="card-shine-beam absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-50/70 to-transparent skew-x-[-25deg] pointer-events-none z-10 will-change-transform rounded-3xl overflow-hidden" />
            <div className="absolute top-0 left-12 right-12 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#0077b6]/70 to-transparent" />
            <p className="relative z-10 text-base sm:text-lg md:text-xl lg:text-[22px] text-slate-700 leading-relaxed font-normal"><span className="card-text-surround">Brand 360s approaches </span><span ref={seoSourceWordRef} className="seo-source-word relative inline-flex items-center font-black will-change-transform z-50 select-none tracking-tight" style={{ transformOrigin: "83% 50%" }}><span className="text-[#0077b6]">S</span><span className="text-[#133863]">E</span><span className="text-[#0077b6] inline-block ml-0.5">O</span></span><span className="card-text-surround"> as a structured growth system — part of a larger <a href="https://brand360s.com/services/digital-marketing-agency-in-chennai/" target="_blank" rel="noopener noreferrer" className="relative inline-block text-[#0077b6] hover:text-[#005a8c] font-bold underline decoration-[#0077b6]/50 hover:decoration-[#0077b6] underline-offset-6 transition-colors">digital marketing agency in Chennai</a> strategy — backed by 16+ years of SEO experience across Velachery, Porur and Anna Nagar.</span></p>
          </div></div>
        <div className="w-full flex items-center justify-center gap-3 sm:gap-4 flex-wrap z-30 shrink-0">
          {TRUST_BADGES.map((badgeText, bIdx) => (<div key={bIdx} ref={el => { badgeRefs.current[bIdx] = el }} className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-none bg-[#0077b6] text-white border border-[#0077b6] shadow-xl shadow-blue-950/15 backdrop-blur-md transition-all duration-200 hover:bg-[#005a8c] hover:scale-105 select-none will-change-transform"><span className="w-2.5 h-2.5 rounded-none bg-white shadow-sm shrink-0 animate-pulse" /><span className="text-sm sm:text-base font-extrabold text-white tracking-normal whitespace-nowrap">{badgeText}</span></div>))}
        </div>
        <div ref={finalRevealRef} className="absolute inset-x-0 top-[21vh] sm:top-[23vh] md:top-[25vh] max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-8 z-30 pointer-events-auto will-change-transform perspective-[1000px]">
          <div className="finale-heading mb-4 sm:mb-6 max-w-4xl perspective-[1000px] will-change-transform">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-[#133863] tracking-tight leading-[1.18] drop-shadow-sm flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 sm:gap-y-2">
              {["Why", "Chennai", "Businesses", "Choose"].map((w, idx) => (
                <span key={idx} className="finale-word inline-block will-change-transform">{w}</span>
              ))}
              <span className="finale-word inline-block will-change-transform text-[#0077b6]">Brand 360s</span>
              <span className="finale-word inline-block will-change-transform">for</span>
              <span className="finale-word inline-block will-change-transform text-[#0077b6]">SEO</span>
            </h2>
          </div>
          <div className="finale-card will-change-transform max-w-2xl w-full p-4 sm:p-5 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xl shadow-blue-950/5 rounded-2xl">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-700 leading-relaxed">
              16+ years across categories means we&apos;re not learning your industry from scratch:
            </p>
          </div>
        </div>

        {/* 3D CURVED FLYING CARDS PARADE LAYER */}
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
          {PARADE_CARDS.map((card, cIdx) => (
            <div
              key={cIdx}
              ref={(el) => {
                paradeCardRefs.current[cIdx] = el;
              }}
              className="absolute opacity-0 w-[88vw] sm:w-[380px] md:w-[420px] bg-white/95 backdrop-blur-xl border-2 border-slate-100 rounded-2xl shadow-[0_25px_60px_-15px_rgba(11,39,72,0.22)] p-6 sm:p-7 flex flex-col justify-between will-change-transform pointer-events-auto select-none"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border ${card.tagBg}`}>
                  {card.tag}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">0{cIdx + 1}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[#133863] tracking-tight leading-tight mb-2">
                {card.title}
              </h4>
              <p className="text-sm sm:text-[15px] font-normal text-slate-600 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
function StyleTag() { return (<style>{`@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700;800;900&family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&display=swap');.flying-word,.finale-word{transform-style:preserve-3d;backface-visibility:hidden}.stk-card{position:absolute;top:43%;left:50%;width:72%;max-width:960px;height:56%;min-height:330px;max-height:460px;display:flex;gap:2rem;padding:2.2rem;border-radius:1.5rem;color:#fff;will-change:transform,opacity;backface-visibility:hidden;box-shadow:0 40px 90px -30px rgba(11,39,72,.5),0 0 1px 1px rgba(255,255,255,.1) inset;border:1px solid rgba(255,255,255,.18)}.stk-col{flex:1;height:100%}.stk-copy{display:flex;flex-direction:column;justify-content:center;padding:.5rem 0}.stk-copy h2{margin:0;font-family:'Big Shoulders Display',sans-serif;font-weight:800;text-transform:uppercase;line-height:1;font-size:clamp(2.2rem,3.8vw,4rem);letter-spacing:-.01em;color:#fff}.stk-media{position:relative;border-radius:1rem;overflow:hidden;border:1px solid rgba(255,255,255,.18)}.stk-img{width:100%;height:100%;background-size:cover;background-position:center}.stk-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.3) 100%);pointer-events:none}@media(max-width:1024px){.stk-card{top:45%;width:calc(100% - 2rem);height:70%;flex-direction:column;gap:1.2rem;padding:1.6rem}.stk-col{width:100%}.stk-media{height:48%}.stk-copy{height:52%}.stk-copy h2{font-size:clamp(1.8rem,5vw,2.5rem)}}`}</style>) }

