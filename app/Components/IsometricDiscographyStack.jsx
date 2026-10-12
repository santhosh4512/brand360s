"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const seoCases = [
  {
    id: "local-business",
    title: "Local Business",
    desc: "Rank in Google Maps and generate daily enquiries",
    isLink: false,
    bgGradient: "linear-gradient(135deg, #243e76 0%, #1d3568 45%, #101c38 100%)",
    borderColor: "rgba(4, 129, 162, 0.4)",
    textColor: "#ffffff",
    subTextColor: "#DEE2E6",
    coverImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "ecommerce",
    title: "Ecommerce",
    desc: "Increase product visibility and organic sales",
    isLink: false,
    bgGradient: "linear-gradient(135deg, #0481a2 0%, #036b87 50%, #243e76 100%)",
    borderColor: "rgba(255, 255, 255, 0.35)",
    textColor: "#ffffff",
    subTextColor: "#DEE2E6",
    coverImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "service-business",
    title: "Service Business",
    desc: "Capture high-intent leads from search",
    isLink: false,
    bgGradient: "linear-gradient(135deg, #101c38 0%, #172a54 50%, #243e76 100%)",
    borderColor: "rgba(4, 129, 162, 0.4)",
    textColor: "#ffffff",
    subTextColor: "#DEE2E6",
    coverImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "startup",
    title: "Startup",
    desc: "Build brand visibility and long-term authority",
    isLink: true,
    linkText: "brand visibility",
    linkUrl: "https://brand360s.com/services/branding-services-in-chennai/",
    bgGradient: "linear-gradient(135deg, #ffffff 0%, #f7f8fa 50%, #DEE2E6 100%)",
    borderColor: "rgba(4, 129, 162, 0.45)",
    textColor: "#243e76",
    subTextColor: "#243e76",
    coverImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
  },
];

export default function IsometricDiscographyStack() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cards = cardsRef.current.filter(Boolean);

      if (!section || cards.length === 0) return;

      // INITIAL POSITIONS:
      // ALL cards start completely off-screen at bottom
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: 180,
          y: 0,
          x: 0,
          z: (i + 1) * 20,
          rotateX: 12,
          opacity: 0,
          scale: 0.96,
          zIndex: (i + 1) * 10,
        });
      });

      // Master ScrollTrigger Timeline: 1 scroll phase per card + stage straightening phase
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Target stacking offsets on the 3D isometric plane
      const stackOffsets = [
        { y: 0, z: 0, scale: 1 },
        { y: 48, z: 15, scale: 0.99 },
        { y: 96, z: 30, scale: 0.98 },
        { y: 144, z: 45, scale: 0.97 },
      ];

      // Sequential scroll flight: Card 0 flies in first, then Card 1, Card 2, Card 3
      cards.forEach((card, i) => {
        const target = stackOffsets[i];
        tl.to(
          card,
          {
            yPercent: 0,
            y: target.y,
            z: target.z,
            rotateX: 0,
            opacity: 1,
            scale: target.scale,
            ease: "power2.out",
            duration: 1.5,
          },
          i * 1.6 + 0.2
        );
      });

      // AFTER 4 CARDS ARRIVE: Smoothly un-tilt, rotate to 0deg, and scale down to fit comfortably in viewport!
      if (stageRef.current) {
        tl.to(
          stageRef.current,
          {
            rotateX: 0,
            rotateZ: 0,
            scale: 0.76,
            y: -15,
            ease: "power2.inOut",
            duration: 2.2,
          },
          "+=0.4"
        );

        // Synchronously compress card stack offsets so it fits within screen height
        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              y: i * 34,
              ease: "power2.inOut",
              duration: 2.2,
            },
            "<"
          );
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#f7f8fa] text-[#243e76] overflow-hidden select-none"
      style={{
        perspective: "1400px",
        perspectiveOrigin: "50% 35%",
        fontFamily: "'Varela Round', sans-serif",
      }}
    >
      {/* 3D Wireframe / Isometric Floor Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(36, 62, 118, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(36, 62, 118, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "68px 68px",
          maskImage:
            "radial-gradient(circle at 50% 45%, black 40%, rgba(0,0,0,0.2) 75%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%, black 40%, rgba(0,0,0,0.2) 75%, transparent 95%)",
        }}
      />

      {/* 3D ISOMETRIC STAGE CONTAINER */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <div
          ref={stageRef}
          className="relative w-[880px] max-w-[94vw] h-[720px] flex flex-col items-center justify-start pointer-events-auto"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(48deg) rotateZ(22deg) scale(0.92)",
            fontFamily: "'Varela Round', sans-serif",
          }}
        >
          {/* Main Title: REAL-WORLD SEO USE CASES */}
          <div
            className="w-full flex flex-col items-center justify-center mb-6 relative"
            style={{
              transform: "translateZ(35px)",
              transformStyle: "preserve-3d",
            }}
          >
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#0481a2] mb-1 px-4 py-1 rounded-full bg-[#0481a2]/10 border border-[#0481a2]/25">
              Portfolio & Cases
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#243e76] select-none text-center leading-[1.1] mt-1" style={{ fontFamily: "'Varela Round', sans-serif" }}>
              REAL-WORLD{" "}
              <span className="text-[#0481a2]">
                SEO USE CASES
              </span>
            </h1>
          </div>

          {/* 3D DECK OF STACKED CARDS (WIDER BALANCED WIDTH) */}
          <div
            className="relative w-[760px] max-w-[92vw] h-[490px] md:h-[530px]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {seoCases.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="absolute inset-x-0 top-0 mx-auto w-full h-full rounded-[24px] md:rounded-[30px] p-5 md:p-6 select-none flex flex-col justify-between"
                  style={{
                    background: item.bgGradient,
                    border: `1.5px solid ${item.borderColor}`,
                    boxShadow:
                      "0 30px 60px -15px rgba(16, 28, 56, 0.4), 0 10px 24px -6px rgba(16, 28, 56, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.6)",
                    color: item.textColor,
                    transformStyle: "preserve-3d",
                    fontFamily: "'Varela Round', sans-serif",
                  }}
                >
                  {/* Top Bar: Title & Subtitle */}
                  <div className="pb-3 border-b border-white/15">
                    <h2
                      className="text-2xl sm:text-3xl font-bold tracking-tight uppercase"
                      style={{
                        fontFamily: "'Varela Round', sans-serif",
                      }}
                    >
                      {item.title}
                    </h2>

                    {/* Subtitle / Description */}
                    <div className="mt-1 text-xs sm:text-sm font-normal opacity-90 leading-snug" style={{ fontFamily: "'Varela Round', sans-serif" }}>
                      {item.isLink ? (
                        <span>
                          Build{" "}
                          <a
                            href={item.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 font-bold text-[#0481a2] decoration-[#0481a2] hover:opacity-80 transition-opacity inline-flex items-center gap-0.5"
                          >
                            <span>{item.linkText}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 inline" />
                          </a>{" "}
                          and long-term authority
                        </span>
                      ) : (
                        item.desc
                      )}
                    </div>
                  </div>

                  {/* Card Main Image Showcase (Increased Height) */}
                  <div className="relative w-full flex-1 rounded-2xl overflow-hidden shadow-xl border border-black/10 mt-3 min-h-[280px]">
                    <img
                      src={item.coverImg}
                      alt={item.title}
                      className="w-full h-full object-cover brightness-95 contrast-105"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
