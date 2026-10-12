"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: ["WEBSITE SEO &", "TECHNICAL", "OPTIMIZATION"],
    subtitleNode: (
      <>
        Titles, meta descriptions, headings, speed, Core Web Vitals — often built in via our{" "}
        <a
          href="https://brand360s.com/services/website-development-services-in-chennai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0481a2] hover:text-white font-bold underline decoration-[#0481a2]/50 hover:decoration-white underline-offset-4 transition-colors"
        >
          website development services in Chennai
        </a>
        .
      </>
    ),
    background: "#243e76",
    titleColor: "text-[#ffffff]",
    textColor: "text-white/85",
    numberColor: "text-[#0481a2]",
    tagColor: "text-[#0481a2]",
    borderColor: "border-white/15",
    dividerColor: "border-white/15",
    zIndex: 1,
  },
  {
    number: "02",
    title: ["LOCAL SEO &", "GOOGLE MAPS", "OPTIMIZATION"],
    subtitleNode: (
      <>Google Business Profile and location-based targeting — by area, not just by city.</>
    ),
    background: "#0481a2",
    titleColor: "text-[#ffffff]",
    textColor: "text-white/90",
    numberColor: "text-[#ffffff]",
    tagColor: "text-[#ffffff]/80",
    borderColor: "border-white/20",
    dividerColor: "border-white/20",
    zIndex: 2,
  },
  {
    number: "03",
    title: ["AUTHORITY", "BUILDING &", "BACKLINKS"],
    subtitleNode: (
      <>High-authority backlinks and contextual links to strengthen domain authority.</>
    ),
    background: "#ffffff",
    titleColor: "text-[#243e76]",
    textColor: "text-[#243e76]/80",
    numberColor: "text-[#0481a2]",
    tagColor: "text-[#0481a2]",
    borderColor: "border-[#DEE2E6]",
    dividerColor: "border-[#DEE2E6]",
    zIndex: 3,
  },
  {
    number: "04",
    title: ["CONTENT", "MARKETING", "INTEGRATION"],
    subtitleNode: (
      <>
        Targeted blogs and landing pages, supported by our{" "}
        <a
          href="https://brand360s.com/services/graphic-design-services-in-chennai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0481a2] hover:text-[#243e76] font-bold underline decoration-[#0481a2]/40 hover:decoration-[#0481a2] underline-offset-4 transition-colors"
        >
          graphic design services in Chennai
        </a>{" "}
        team.
      </>
    ),
    background: "#DEE2E6",
    titleColor: "text-[#243e76]",
    textColor: "text-[#243e76]/85",
    numberColor: "text-[#0481a2]",
    tagColor: "text-[#243e76]",
    borderColor: "border-[#243e76]/20",
    dividerColor: "border-[#243e76]/15",
    zIndex: 4,
  },
];

export default function ServicesScroll() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Card 01: Enters 0.48->0.51 (110vh->0vh) -> Holds 0.51->0.58 (0vh) -> Leaves 0.58->0.61 (-110vh)
  const card1Y = useTransform(scrollYProgress, [0.48, 0.51, 0.58, 0.61], ["110vh", "0vh", "0vh", "-110vh"]);
  const card1Opacity = useTransform(scrollYProgress, [0.48, 0.50, 0.59, 0.61], [0, 1, 1, 0]);
  const card1Rotate = useTransform(scrollYProgress, [0.48, 0.51, 0.58, 0.61], [5, -2, -2, -6]);
  const card1Scale = useTransform(scrollYProgress, [0.48, 0.51, 0.58, 0.61], [0.96, 1, 1, 0.98]);

  // Card 02: Enters seamlessly as Card 01 lifts (0.60->0.64) -> Holds 0.64->0.71 -> Leaves 0.71->0.74 (-110vh)
  const card2Y = useTransform(scrollYProgress, [0.60, 0.64, 0.71, 0.74], ["110vh", "0vh", "0vh", "-110vh"]);
  const card2Opacity = useTransform(scrollYProgress, [0.60, 0.62, 0.72, 0.74], [0, 1, 1, 0]);
  const card2Rotate = useTransform(scrollYProgress, [0.60, 0.64, 0.71, 0.74], [5, 2, 2, -5]);
  const card2Scale = useTransform(scrollYProgress, [0.60, 0.64, 0.71, 0.74], [0.96, 1, 1, 0.98]);

  // Card 03: Enters seamlessly as Card 02 lifts (0.73->0.77) -> Holds 0.77->0.84 -> Leaves 0.84->0.87 (-110vh)
  const card3Y = useTransform(scrollYProgress, [0.73, 0.77, 0.84, 0.87], ["110vh", "0vh", "0vh", "-110vh"]);
  const card3Opacity = useTransform(scrollYProgress, [0.73, 0.75, 0.85, 0.87], [0, 1, 1, 0]);
  const card3Rotate = useTransform(scrollYProgress, [0.73, 0.77, 0.84, 0.87], [-5, -1, -1, 5]);
  const card3Scale = useTransform(scrollYProgress, [0.73, 0.77, 0.84, 0.87], [0.96, 1, 1, 0.98]);

  // Card 04: Enters seamlessly as Card 03 lifts (0.86->0.90) -> Holds 0.90->0.96 -> Leaves 0.96->1.00 (-110vh)
  const card4Y = useTransform(scrollYProgress, [0.86, 0.90, 0.96, 1.00], ["110vh", "0vh", "0vh", "-110vh"]);
  const card4Opacity = useTransform(scrollYProgress, [0.86, 0.88, 0.98, 1.00], [0, 1, 1, 0]);
  const card4Rotate = useTransform(scrollYProgress, [0.86, 0.90, 0.96, 1.00], [5, 2, 2, -6]);
  const card4Scale = useTransform(scrollYProgress, [0.86, 0.90, 0.96, 1.00], [0.96, 1, 1, 0.98]);

  const cardMotionValues = [
    { y: card1Y, opacity: card1Opacity, rotate: card1Rotate, scale: card1Scale },
    { y: card2Y, opacity: card2Opacity, rotate: card2Rotate, scale: card2Scale },
    { y: card3Y, opacity: card3Opacity, rotate: card3Rotate, scale: card3Scale },
    { y: card4Y, opacity: card4Opacity, rotate: card4Rotate, scale: card4Scale },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[1250vh] bg-[#ffffff] select-none -mt-[600vh] z-20"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* STICKY VIEWPORT (100vh) */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* 1. BACKGROUND POSTER TYPOGRAPHY (HEAVILY BLURRED & LOW CONTRAST) */}
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        >
          {/* 'OUR' at upper-left */}
          <div
            className="absolute top-[1vh] sm:top-[2vh] left-[-1vw] font-black uppercase text-[#243e76]/10 tracking-tighter leading-none"
            style={{
              fontFamily: "'Varela Round', sans-serif",
              fontSize: "clamp(100px, 17vw, 360px)",
              filter: "blur(8px)",
            }}
          >
            OUR
          </div>

          {/* 'SEO' at middle-right */}
          <div
            className="absolute top-[32vh] sm:top-[34vh] right-[-1vw] font-black uppercase text-[#243e76]/10 tracking-tighter leading-none text-right"
            style={{
              fontFamily: "'Varela Round', sans-serif",
              fontSize: "clamp(100px, 17vw, 360px)",
              filter: "blur(8px)",
            }}
          >
            SEO
          </div>

          {/* 'SERVICES' at lower-left */}
          <div
            className="absolute bottom-[2vh] sm:bottom-[3vh] left-[-1vw] font-black uppercase text-[#243e76]/10 tracking-tighter leading-none"
            style={{
              fontFamily: "'Varela Round', sans-serif",
              fontSize: "clamp(70px, 13vw, 260px)",
              filter: "blur(8px)",
            }}
          >
            SERVICES
          </div>
        </div>

        {/* 2. CENTERED PHYSICAL PAPER CARDS STACK */}
        <div className="relative z-10 flex items-center justify-center w-full max-w-lg px-4">
          {SERVICES.map((service, index) => {
            const motionVal = cardMotionValues[index];

            return (
              <motion.div
                key={service.number}
                style={{
                  backgroundColor: service.background,
                  y: motionVal.y,
                  opacity: motionVal.opacity,
                  rotate: motionVal.rotate,
                  scale: motionVal.scale,
                  zIndex: service.zIndex,
                  boxShadow: "0 22px 55px rgba(36, 62, 118, 0.12), 0 4px 14px rgba(36, 62, 118, 0.05)",
                  fontFamily: "'Varela Round', sans-serif",
                }}
                className={`absolute w-[290px] h-[400px] sm:w-[350px] sm:h-[460px] md:w-[390px] md:h-[500px] 2xl:w-[460px] 2xl:h-[580px] rounded-[18px] 2xl:rounded-[22px] p-7 sm:p-9 2xl:p-10 flex flex-col justify-between cursor-default will-change-transform border ${service.borderColor}`}
              >
                {/* TOP HEADER: TITLE & SUBTITLE */}
                <div className="flex flex-col">
                  {service.title.map((line, lIdx) => (
                    <h3
                      key={lIdx}
                      className={`font-black uppercase ${service.titleColor} text-[26px] sm:text-[32px] md:text-[36px] 2xl:text-[42px] leading-[1.05] tracking-[-0.02em]`}
                    >
                      {line}
                    </h3>
                  ))}
                  <p className={`text-[13px] sm:text-[14px] md:text-[15px] 2xl:text-[16px] font-medium ${service.textColor} mt-4 sm:mt-5 2xl:mt-6 leading-relaxed`}>
                    {service.subtitleNode}
                  </p>
                </div>

                {/* BOTTOM FOOTER: NUMBER & TAG */}
                <div className={`flex items-end justify-between w-full pt-4 border-t ${service.dividerColor}`}>
                  <span className={`text-[11px] 2xl:text-[12px] font-bold uppercase tracking-wider ${service.tagColor}`}>
                    Brand 360s Deliverable
                  </span>
                  <span className={`font-black text-[44px] sm:text-[52px] md:text-[60px] 2xl:text-[76px] ${service.numberColor} leading-none tracking-tighter`}>
                    {service.number}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
