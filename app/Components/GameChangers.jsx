"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./assets/volleyball.json";
import { mountGameChangers } from "./section";
import "./section.css";

export default function GameChangers() {
  const root = useRef(null);
  useEffect(() => {
    if (!root.current) return;
    const cleanup = mountGameChangers(root.current, lottie, animationData);
    return cleanup;
  }, []);
  return <div ref={root} />;
}
