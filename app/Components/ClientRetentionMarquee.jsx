"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, TrendingUp, Compass, Layers, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    id: 1,
    number: "01",
    category: "ENGAGING CONTENT",
    icon: Sparkles,
    bgClass: "bg-[#0481a2]",
    borderClass: "border-[#38bdf8]/50 hover:border-[#38bdf8]",
    shadowClass: "shadow-[0_20px_50px_rgba(4,129,162,0.35)]",
    tagBg: "bg-white/20 text-white border border-white/20",
    iconBg: "bg-white/15 text-[#38bdf8] border border-white/20",
    textColor: "text-white",
    footerText: "text-white/80",
    dotColor: "bg-[#38bdf8]",
    content: (
      <>
        Creating{" "}
        <span className="font-bold text-[#38bdf8] underline decoration-[#38bdf8]/40 underline-offset-4">
          meaningful, informative and engaging
        </span>{" "}
        content
      </>
    ),
  },
  {
    id: 2,
    number: "02",
    category: "PAGE OPTIMIZATION",
    icon: TrendingUp,
    bgClass: "bg-[#DEE2E6]",
    borderClass: "border-[#243e76]/25 hover:border-[#0481a2]",
    shadowClass: "shadow-[0_20px_50px_rgba(0,0,0,0.15)]",
    tagBg: "bg-[#243e76]/10 text-[#243e76] border border-[#243e76]/15",
    iconBg: "bg-[#243e76]/10 text-[#0481a2] border border-[#243e76]/15",
    textColor: "text-[#243e76]",
    footerText: "text-[#243e76]/80",
    dotColor: "bg-[#0481a2]",
    content: (
      <>
        Updating existing pages to{" "}
        <span className="font-bold text-[#0481a2] underline decoration-[#0481a2]/40 underline-offset-4">
          improve performance
        </span>
      </>
    ),
  },
  {
    id: 3,
    number: "03",
    category: "SEARCH INTENT",
    icon: Compass,
    bgClass: "bg-[#0B1220]",
    borderClass: "border-[#0481a2]/40 hover:border-[#38bdf8]",
    shadowClass: "shadow-[0_20px_50px_rgba(11,18,32,0.6)]",
    tagBg: "bg-[#0481a2]/25 text-[#38bdf8] border border-[#0481a2]/40",
    iconBg: "bg-[#0481a2]/20 text-[#38bdf8] border border-[#0481a2]/30",
    textColor: "text-white",
    footerText: "text-white/80",
    dotColor: "bg-[#38bdf8]",
    content: (
      <>
        Aligning every piece of content with{" "}
        <span className="font-bold text-[#38bdf8] underline decoration-[#38bdf8]/40 underline-offset-4">
          user intent
        </span>
      </>
    ),
  },
  {
    id: 4,
    number: "04",
    category: "TOPIC AUTHORITY",
    icon: Layers,
    bgClass: "bg-[#243e76]",
    borderClass: "border-white/25 hover:border-[#38bdf8]/60",
    shadowClass: "shadow-[0_20px_50px_rgba(36,62,118,0.45)]",
    tagBg: "bg-white/15 text-white border border-white/20",
    iconBg: "bg-white/10 text-[#38bdf8] border border-white/20",
    textColor: "text-white",
    footerText: "text-white/80",
    dotColor: "bg-[#DEE2E6]",
    content: (
      <>
        Building{" "}
        <span className="font-bold text-[#38bdf8] underline decoration-[#38bdf8]/40 underline-offset-4">
          topic authority
        </span>{" "}
        over time
      </>
    ),
  },
];

export default function ClientRetentionMarquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // 1. Continuous seamless infinite auto-movement loop
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      });

      // 2. Pin the section full screen so user locks in place before scrolling to next section
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=1200",
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.6, ease: "power1.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: "power1.inOut" });
    }
  };

  // Duplicate cards for seamless infinite marquee
  const marqueeItems = [...cards, ...cards, ...cards, ...cards];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#101c38] overflow-hidden text-white select-none flex items-center justify-center"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* Ambient Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#0481a2]/15 blur-[160px] pointer-events-none rounded-full" />

      {/* Main Area: Static Deep Navy Card & Horizontal Auto-moving Cards */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* The Static Left Deep Navy Card */}
        <div className="absolute left-4 md:left-10 lg:left-16 top-1/2 -translate-y-1/2 z-30 flex items-center">
          <div
            className="w-[300px] sm:w-[360px] md:w-[420px] h-[380px] md:h-[420px] rounded-3xl bg-[#243e76] border border-[#0481a2]/60 shadow-[0_25px_70px_rgba(0,0,0,0.5)] p-7 md:p-10 flex flex-col justify-between relative overflow-hidden text-white transition-transform duration-300 hover:scale-[1.01]"
            style={{ fontFamily: "'Varela Round', sans-serif" }}
          >
            {/* Top Statements */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 w-fit text-[#38bdf8] text-[11px] font-bold tracking-widest uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                OUR APPROACH FOCUSES ON
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[#DEE2E6] text-sm sm:text-base md:text-lg font-normal leading-snug">
                  SEO without content has limits.
                </p>
                <p className="text-[#DEE2E6] text-sm sm:text-base md:text-lg font-normal leading-snug">
                  Content without strategy has no direction.
                </p>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-white tracking-tight leading-[1.18] mt-1">
                We combine both for sustainable growth
              </h2>
            </div>

            {/* Bottom Statement */}
            <div className="relative z-10 pt-3 border-t border-white/10">
              <p className="text-xs sm:text-sm md:text-[13px] text-[#DEE2E6]/90 font-normal leading-relaxed">
                This ensures that your website does not just rank temporarily, but continues to grow steadily.
              </p>
            </div>
          </div>
        </div>

        {/* Automatic Continuous Moving Cards Track */}
        <div 
          className="marquee-masked-container w-full flex items-center py-4 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-6 whitespace-normal will-change-transform"
            style={{ width: "fit-content" }}
          >
            {marqueeItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  className={`w-[300px] sm:w-[360px] md:w-[420px] h-[350px] md:h-[390px] rounded-3xl ${item.bgClass} backdrop-blur-md border ${item.borderClass} ${item.shadowClass} p-7 md:p-9 flex flex-col justify-between shrink-0 hover:scale-[1.03] transition-all duration-300 group cursor-pointer relative overflow-hidden`}
                  style={{ fontFamily: "'Varela Round', sans-serif" }}
                >
                  {/* Top Header Row: Category Badge & Card Number */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.iconBg} backdrop-blur-sm shadow-sm`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${item.tagBg}`}>
                        {item.category}
                      </span>
                    </div>
                    <span className={`text-2xl font-black opacity-35 ${item.textColor}`}>
                      {item.number}
                    </span>
                  </div>

                  {/* Main Focus Statement */}
                  <h3 className={`${item.textColor} text-xl sm:text-2xl md:text-[25px] font-normal leading-snug tracking-tight text-left my-auto`}>
                    {item.content}
                  </h3>

                  {/* Bottom Footer Accent */}
                  <div className="pt-2 flex items-center justify-between border-t border-current/10">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.dotColor} shadow-sm`} />
                      <span className={`text-[11px] font-bold uppercase tracking-widest ${item.footerText}`}>
                        PROVEN STRATEGY
                      </span>
                    </div>
                    <span className={`text-xs font-semibold ${item.footerText}`}>
                      0{item.id} / 04
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Mask so cards smoothly fade at both ends */}
      <style jsx>{`
        .marquee-masked-container {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0px,
            transparent 60px,
            black 280px,
            black calc(100% - 100px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0px,
            transparent 60px,
            black 280px,
            black calc(100% - 100px),
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
}
