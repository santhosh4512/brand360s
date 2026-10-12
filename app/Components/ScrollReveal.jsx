"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 6,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom 80%",
  wordAnimationEnd = "bottom 65%",
}) => {
  const containerRef = useRef(null);

  const splitContent = useMemo(() => {
    if (typeof children !== "string") return children;

    // Pattern to match [text](url) markdown links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(children)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: children.slice(lastIndex, match.index),
        });
      }
      parts.push({
        type: "link",
        label: match[1],
        url: match[2],
      });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < children.length) {
      parts.push({
        type: "text",
        content: children.slice(lastIndex),
      });
    }

    let globalIndex = 0;
    return parts.map((part, pIdx) => {
      if (part.type === "text") {
        return part.content.split(/(\s+)/).map((word) => {
          if (word.match(/^\s+$/)) return word;
          return (
            <span className="word" key={`w-${globalIndex++}`}>
              {word}
            </span>
          );
        });
      } else {
        return (
          <a
            key={`l-${pIdx}`}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] font-semibold underline underline-offset-8 decoration-[#38bdf8]/50 hover:decoration-[#38bdf8] hover:text-[#7dd3fc] transition-colors pointer-events-auto inline"
          >
            {part.label.split(/(\s+)/).map((word) => {
              if (word.match(/^\s+$/)) return word;
              return (
                <span className="word" key={`lw-${globalIndex++}`}>
                  {word}
                </span>
              );
            })}
          </a>
        );
      }
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scroller =
        scrollContainerRef && scrollContainerRef.current
          ? scrollContainerRef.current
          : window;

      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 85%",
            end: rotationEnd,
            scrub: 1.2,
          },
        }
      );

      const wordElements = el.querySelectorAll(".word");

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: "opacity, filter" },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 80%",
            end: wordAnimationEnd,
            scrub: 1.2,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top 80%",
              end: wordAnimationEnd,
              scrub: 1.2,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitContent}</p>
    </div>
  );
};

export default ScrollReveal;
