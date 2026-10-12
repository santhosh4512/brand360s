"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SeoFoundationSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const prismRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !containerRef.current || !prismRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          pin: containerRef.current,
          pinSpacing: true,
          scrub: 1.0,
          anticipatePin: 1,
        },
      });

      // 3D Prism Y-Axis Rotation Timeline
      tl.fromTo(
        prismRef.current,
        { rotationY: 0 },
        { rotationY: -120, ease: "power2.inOut", duration: 0.8 },
        0.4
      );

      tl.to(
        prismRef.current,
        { rotationY: -240, ease: "power2.inOut", duration: 0.8 },
        1.3
      );

      tl.to({}, { duration: 0.9 }, 2.1);

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#101c38] text-white select-none overflow-hidden"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      <style>{`
        .glass-face {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 30px 65px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25);
        }
      `}</style>

      {/* Pinned 100vh Container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen max-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-6 sm:py-8 bg-[#101c38] overflow-hidden"
      >
        {/* Soft Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0481a2]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#38BDF8]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Main Headline */}
        <div className="relative z-20 w-full text-center max-w-4xl mx-auto pt-4 sm:pt-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.06] tracking-tight">
            Start Building Your{" "}
            <span className="text-[#38BDF8] underline decoration-[#38BDF8]/40 underline-offset-8">
              Search Visibility
            </span>
          </h2>
        </div>

        {/* 3D Glass Prism Stage */}
        <div
          className="relative z-10 w-full max-w-5xl mx-auto my-auto h-[360px] sm:h-[400px] flex items-center justify-center"
          style={{ perspective: "1800px" }}
        >
          <div
            className="prism-stage relative w-full h-full flex items-center justify-center will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              ref={prismRef}
              className="relative w-[320px] sm:w-[480px] md:w-[600px] h-[240px] sm:h-[260px] flex items-center justify-center will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* FACE 01 */}
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: "rotateY(0deg) translateZ(360px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="glass-face absolute inset-0 rounded-3xl bg-[#243e76] border-2 border-[#0481a2]/40 p-8 sm:p-10 flex flex-col justify-center items-center text-center text-white shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-normal max-w-xl">
                    If your goal is to attract the right audience, improve rankings and generate consistent leads,{" "}
                    <span className="font-bold text-[#f7f8fa]">SEO is not optional - it is essential.</span>
                  </p>
                </div>

                <div
                  className="glass-face absolute inset-0 rounded-3xl bg-[#243e76] border-2 border-[#0481a2]/30 p-8 flex justify-center items-center shadow-2xl"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl border border-[#0481a2]/40 bg-[#0481a2]/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#f7f8fa] blur-xs" />
                  </div>
                </div>
              </div>

              {/* FACE 02 */}
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: "rotateY(120deg) translateZ(360px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="glass-face absolute inset-0 rounded-3xl bg-[#0481a2] border-2 border-white/30 p-8 sm:p-10 flex flex-col justify-center items-center text-center text-white shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-normal max-w-xl">
                    At <span className="font-bold text-white underline decoration-white/60 underline-offset-4">BRAND 360s</span>, we implement structured and strategic SEO systems designed for long-term business growth.
                  </p>
                </div>

                <div
                  className="glass-face absolute inset-0 rounded-3xl bg-[#0481a2] border-2 border-white/30 p-8 flex justify-center items-center shadow-2xl"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl border border-white/30 bg-white/10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white blur-xs" />
                  </div>
                </div>
              </div>

              {/* FACE 03 */}
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: "rotateY(240deg) translateZ(360px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="glass-face absolute inset-0 rounded-3xl bg-[#101c38] border-2 border-[#0481a2]/60 p-8 sm:p-10 flex flex-col justify-center items-center text-center text-white shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <p className="text-xl sm:text-2xl md:text-3xl text-white leading-snug font-bold tracking-tight max-w-xl">
                    &ldquo;The sooner your SEO foundation is built, the sooner your business starts gaining visibility.&rdquo;
                  </p>
                </div>

                <div
                  className="glass-face absolute inset-0 rounded-3xl bg-[#101c38] border-2 border-[#0481a2]/30 p-8 flex justify-center items-center shadow-2xl"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl border border-[#0481a2]/30 bg-[#0481a2]/10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#0481a2] blur-xs" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
