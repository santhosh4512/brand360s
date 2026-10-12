"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Coordinate model of the dynamic running 3D voxel figure in Screenshot 4
const createVoxelFigureCoordinates = () => {
  const coords = [];
  const s = 0.36; // spacing unit

  // Tilted runner / flight silhouette matching the screenshot
  // Head / Visor (forward top-right)
  const head = [
    [2, 3, 0], [3, 3, 0], [4, 3, 0], [3, 4, 0], [4, 4, 0], [5, 4, 0], [6, 4, 0],
    [2, 3, 1], [3, 3, 1], [4, 3, 1], [3, 4, 1], [4, 4, 1],
    [3, 3, -1], [4, 3, -1], [3, 4, -1]
  ];

  // Chest / Core body (center)
  const body = [
    [0, 2, 0], [1, 2, 0], [2, 2, 0], [3, 2, 0],
    [0, 2, 1], [1, 2, 1], [2, 2, 1],
    [0, 2, -1], [1, 2, -1], [2, 2, -1],
    [-1, 1, 0], [0, 1, 0], [1, 1, 0], [2, 1, 0],
    [-1, 1, 1], [0, 1, 1], [1, 1, 1],
    [-1, 1, -1], [0, 1, -1], [1, 1, -1],
    [-2, 0, 0], [-1, 0, 0], [0, 0, 0], [1, 0, 0],
    [-2, 0, 1], [-1, 0, 1], [0, 0, 1],
    [-2, 0, -1], [-1, 0, -1]
  ];

  // Wings / Upper trail extending back-left
  const wing = [
    [-1, 3, 0], [-2, 3, 0], [-3, 4, 0], [-4, 4, 0], [-5, 5, 0],
    [-1, 3, 1], [-2, 3, 1], [-3, 4, 1],
    [-2, 4, 0], [-3, 5, 0], [-4, 6, 0], [-5, 6, 0]
  ];

  // Legs / Lower rear trail extending down-back
  const legs = [
    [-3, -1, 0], [-4, -1, 0], [-5, -2, 0], [-6, -2, 0], [-7, -3, 0],
    [-3, -1, 1], [-4, -1, 1], [-5, -2, 1],
    [-2, -1, 0], [-3, -2, 0], [-4, -3, 0], [-5, -3, 0],
    [-4, -2, -1], [-5, -2, -1], [-6, -3, -1], [-7, -4, 0], [-8, -4, 0]
  ];

  // Extended pixel blocks for rich 3D density
  const extras = [
    [1, 3, 2], [2, 2, 2], [0, 1, 2], [-1, 0, 2], [-3, -1, 2],
    [1, 3, -2], [2, 2, -2], [0, 1, -2], [-1, 0, -2], [-3, -1, -2],
    [-2, 2, 1], [-3, 3, 1], [-4, 3, 0], [-5, 4, 1], [-6, 3, 0],
    [-3, -2, 1], [-4, -3, 1], [-5, -4, 0], [-6, -4, 1]
  ];

  const all = [...head, ...body, ...wing, ...legs, ...extras];

  // Center offset on the screen shifted further to the left
  const offsetX = -4.8;
  const offsetY = -0.3;
  const offsetZ = 0.2;

  all.forEach(([gx, gy, gz]) => {
    // Apply slight forward tilt angle (~25 degrees)
    const angle = 0.42;
    const rx = gx * Math.cos(angle) - gy * Math.sin(angle);
    const ry = gx * Math.sin(angle) + gy * Math.cos(angle);
    const rz = gz;

    coords.push({
      x: rx * s + offsetX,
      y: ry * s + offsetY,
      z: rz * s + offsetZ,
    });
  });

  return coords;
};

export default function SparkkExperience() {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const heroTextRef = useRef(null);
  const ghostTextRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const scrollProgressRef = useRef({ val: 0 });
  const [activeLang, setActiveLang] = useState("EN");

  useEffect(() => {
    const container = containerRef.current;
    const canvasHolder = canvasContainerRef.current;
    if (!container || !canvasHolder) return;

    // --- 1. THREE.JS SCENE SETUP ---
    const width = canvasHolder.clientWidth || window.innerWidth || 800;
    const height = canvasHolder.clientHeight || window.innerHeight || 600;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x052210, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    canvasHolder.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x0a3315, 2.2);
    scene.add(ambientLight);

    // Main neon green key light on the voxel character shifted left
    const charLight = new THREE.PointLight(0x4adb26, 6.0, 18);
    charLight.position.set(-4.5, 0.5, 3.5);
    scene.add(charLight);

    // Secondary fill light for depth & volume
    const fillLight = new THREE.PointLight(0x22c55e, 3.5, 25);
    fillLight.position.set(2, -2, 4);
    scene.add(fillLight);

    // Emerald back-rim light
    const rimLight = new THREE.DirectionalLight(0xa7f3d0, 1.8);
    rimLight.position.set(-6, 4, -2);
    scene.add(rimLight);

    // --- VOXEL FIGURE GEOMETRY & MATERIALS ---
    const initialCoords = createVoxelFigureCoordinates();
    const CUBE_COUNT = initialCoords.length;
    const cubeSize = 0.35;
    const boxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Vibrant green voxel shader material with distinct face lighting & glowing edges
    const material = new THREE.MeshStandardMaterial({
      color: 0x3ee622,
      emissive: 0x114a13,
      emissiveIntensity: 0.65,
      roughness: 0.22,
      metalness: 0.1,
    });

    const instancedMesh = new THREE.InstancedMesh(boxGeometry, material, CUBE_COUNT);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedMesh);

    // Cube data structures
    const cubesData = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < CUBE_COUNT; i++) {
      const coord = initialCoords[i];

      // Initial compact voxel runner figure on the left
      const startX = coord.x;
      const startY = coord.y;
      const startZ = coord.z;
      const startScale = 0.95;

      // Target dispersed position when scrolling (Exact scatter matching screenshots)
      let targetX, targetY, targetZ, targetScale;

      if (i % 5 === 0) {
        // Giant foreground zoom cubes shifted towards the right (Screenshot 1)
        targetX = 0.2 + (Math.random() - 0.5) * 4.8;
        targetY = 0.3 + (Math.random() - 0.5) * 4.0;
        targetZ = 4.8 + Math.random() * 3.2; // close to camera (z=9.5)
        targetScale = 2.6 + Math.random() * 2.2;
      } else if (i % 2 === 0) {
        // Dense left-side vortex & tunnel cloud (Screenshot 1 & 3)
        const angle = (i / CUBE_COUNT) * Math.PI * 3.0;
        const radius = 2.2 + Math.random() * 4.2;
        targetX = -5.4 + Math.cos(angle) * radius * 0.95;
        targetY = -0.6 + Math.sin(angle) * radius * 0.85;
        targetZ = 0.5 + (Math.random() - 0.5) * 4.5;
        targetScale = 1.1 + Math.random() * 1.0;
      } else {
        // Perimeter & background drift
        targetX = -3.5 + Math.random() * 9.5;
        targetY = -2.5 + Math.random() * 6.5;
        targetZ = -3.5 + Math.random() * 5.0;
        targetScale = 0.75 + Math.random() * 0.7;
      }

      cubesData.push({
        start: new THREE.Vector3(startX, startY, startZ),
        target: new THREE.Vector3(targetX, targetY, targetZ),
        startScale: startScale,
        targetScale: targetScale,
        rotSpeed: {
          x: (Math.random() - 0.5) * 2.2,
          y: (Math.random() - 0.5) * 2.2,
          z: (Math.random() - 0.5) * 2.2,
        },
        phase: Math.random() * Math.PI * 2,
      });
    }

    // --- MOUSE PARALLAX ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 1.2;
      targetMouseY = -y * 1.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!canvasHolder) return;
      const w = canvasHolder.clientWidth || window.innerWidth;
      const h = canvasHolder.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- 2. GSAP SCROLLTRIGGER PIN & TIMELINE ---
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
        },
      });

      // 1. Disperse voxel sculpture as user scrolls
      tl.to(
        scrollProgressRef.current,
        {
          val: 1,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      // 2. Hero Text Shift & Fade Out
      tl.to(
        heroTextRef.current,
        {
          opacity: 0,
          y: -70,
          scale: 0.95,
          ease: "power2.inOut",
          duration: 0.45,
        },
        0
      );

      // 3. Ghosted Background Text
      tl.to(
        ghostTextRef.current,
        {
          opacity: 0.12,
          scale: 1.04,
          ease: "power2.out",
          duration: 0.3,
        },
        0.1
      );

      // 4. 100% Solid Dark Forest Green Overlay Fades In to cleanly cover the 3D boxes & background
      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.35,
        },
        0.24
      );

      // 5. "Who We Are" Content Smooth Transition In on top of the clean solid background
      tl.fromTo(
        whoWeAreRef.current,
        {
          opacity: 0,
          y: 60,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          ease: "power2.out",
          duration: 0.45,
        },
        0.40
      );
    }, container);

    // --- 3. ANIMATION LOOP ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const progress = scrollProgressRef.current.val;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.7;
      camera.position.y = mouseY * 0.7;
      camera.lookAt(0, 0, 0);

      // Update instanced cubes
      for (let i = 0; i < CUBE_COUNT; i++) {
        const data = cubesData[i];

        // Position: interpolate between figure form and dispersed explosion
        const px = THREE.MathUtils.lerp(data.start.x, data.target.x, progress);
        const py = THREE.MathUtils.lerp(data.start.y, data.target.y, progress);
        const pz = THREE.MathUtils.lerp(data.start.z, data.target.z, progress);

        // Ambient idle floating motion (alive even before scrolling)
        const floatX = Math.sin(elapsedTime * 1.5 + data.phase) * (0.04 + progress * 0.1);
        const floatY = Math.cos(elapsedTime * 1.8 + data.phase) * (0.05 + progress * 0.12);
        const floatZ = Math.sin(elapsedTime * 1.1 + data.phase) * (0.04 + progress * 0.08);

        dummy.position.set(px + floatX, py + floatY, pz + floatZ);

        // Fixed crisp voxel orientation (No continuous spinning/rotation)
        dummy.rotation.set(0, 0, 0);

        // Dynamic scale interpolation between initial figure scale and scatter zoom scale
        const currentScale = THREE.MathUtils.lerp(data.startScale, data.targetScale, progress);
        const s = currentScale * (1 + Math.sin(elapsedTime * 2.2 + data.phase) * 0.03);
        dummy.scale.set(s, s, s);

        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      ctx.revert();

      if (renderer.domElement && canvasHolder.contains(renderer.domElement)) {
        canvasHolder.removeChild(renderer.domElement);
      }
      boxGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#052210] text-[#ebebeb] overflow-hidden select-none"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* 3D WebGL Background Canvas (Overlaps typography with voxel sculpture in front) */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      />

      {/* Dark Forest Green Transition Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#052210] opacity-0 z-25 pointer-events-none transition-opacity duration-300"
      />

      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4adb26]/[0.08] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#22c55e]/[0.05] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* 1. Header Bar (SPARKK logo, EN | FR, 3D Green MENU Button) */}
      <header className="absolute top-0 left-0 w-full z-40 px-6 sm:px-10 md:px-14 pt-7 md:pt-9 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl sm:text-2xl font-black tracking-[0.22em] text-white uppercase cursor-pointer hover:text-[#4adb26] transition-colors">
            SPARKK
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Language Switcher */}
          <div className="flex items-center text-xs font-bold tracking-widest uppercase">
            <button
              onClick={() => setActiveLang("EN")}
              className={`px-1.5 transition-colors cursor-pointer ${
                activeLang === "EN" ? "text-white opacity-100" : "text-white/40 hover:text-white"
              }`}
            >
              EN
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => setActiveLang("FR")}
              className={`px-1.5 transition-colors cursor-pointer ${
                activeLang === "FR" ? "text-white opacity-100" : "text-white/40 hover:text-white"
              }`}
            >
              FR
            </button>
          </div>

          {/* Neon Green 3D Cube Menu Button */}
          <button className="group relative bg-[#4adb26] text-[#052210] font-black text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(74,219,38,0.7)] hover:scale-105 active:scale-95 cursor-pointer">
            <span className="relative z-10 flex items-center gap-2">
              MENU
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          </button>
        </div>
      </header>

      {/* 2. Floating Right Social Links */}
      <aside className="absolute right-6 sm:right-10 md:right-14 bottom-10 z-40 hidden md:flex flex-col items-center gap-6 text-xs text-white/60">
        <a
          href="#facebook"
          className="font-bold hover:text-[#4adb26] hover:scale-110 transition-all uppercase"
          aria-label="Facebook"
        >
          f
        </a>
        <a
          href="#instagram"
          className="hover:text-[#4adb26] hover:scale-110 transition-all"
          aria-label="Instagram"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a
          href="#linkedin"
          className="font-bold hover:text-[#4adb26] hover:scale-110 transition-all text-xs"
          aria-label="LinkedIn"
        >
          in
        </a>
      </aside>

      {/* 3. Ghosted Background Text on Scroll */}
      <div
        ref={ghostTextRef}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none opacity-0 z-10 select-none pl-6 md:pl-20"
      >
        <h2 className="text-[12vw] font-black uppercase text-emerald-950/40 leading-[0.88] tracking-tight">
          PLAY WITH
        </h2>
        <h2 className="text-[12vw] font-black uppercase text-emerald-950/40 leading-[0.88] tracking-tight">
          YOUR <span className="font-serif italic text-emerald-900/30">ideas</span>
        </h2>
      </div>

      {/* 4. EXACT INITIAL HERO STATE (Screenshot 4) */}
      <div
        ref={heroTextRef}
        className="absolute inset-0 z-15 flex items-center justify-center px-6 sm:px-10 md:px-16 pointer-events-none"
      >
        <div className="w-full max-w-[1440px] flex flex-col justify-center pt-8">
          {/* Row 1: LET US + Tags */}
          <div className="flex items-end justify-between w-full">
            <h1 className="text-[13vw] sm:text-[11vw] md:text-[130px] lg:text-[145px] font-black tracking-[-0.04em] leading-[0.88] uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              LET US
            </h1>
            <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-2 text-xs sm:text-sm font-medium text-white/80 tracking-wide pb-3 sm:pb-5 pr-2 sm:pr-8 md:pr-20">
              <span className="hover:text-white transition-colors cursor-default">web agency</span>
              <span className="hover:text-white transition-colors cursor-default">front-end</span>
              <span className="hover:text-white transition-colors cursor-default">ux-ui design</span>
              <span className="hover:text-white transition-colors cursor-default">back-end</span>
            </div>
          </div>

          {/* Row 2: PLAY WITH (Voxel Character sits on the left of this line) */}
          <div className="w-full">
            <h1 className="text-[13vw] sm:text-[11vw] md:text-[130px] lg:text-[145px] font-black tracking-[-0.04em] leading-[0.88] uppercase text-white pl-[16%] sm:pl-[20%] md:pl-[240px] drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              PLAY WITH
            </h1>
          </div>

          {/* Row 3: YOUR ideas */}
          <div className="w-full flex items-baseline flex-wrap gap-x-4 sm:gap-x-8 pl-[8%] sm:pl-[12%] md:pl-[140px]">
            <span className="text-[13vw] sm:text-[11vw] md:text-[130px] lg:text-[145px] font-black tracking-[-0.04em] leading-[0.88] uppercase text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              YOUR
            </span>
            <span
              className="text-[14vw] sm:text-[12vw] md:text-[145px] lg:text-[160px] font-normal italic text-[#4adb26] leading-[0.7] tracking-normal"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                textShadow:
                  "0 0 25px rgba(74, 219, 38, 0.75), 0 0 50px rgba(74, 219, 38, 0.4)",
              }}
            >
              ideas
            </span>
          </div>
        </div>
      </div>

      {/* 5. "WHO WE ARE" Scroll-Revealed Layer (Screenshots 1 & 2) */}
      <div
        ref={whoWeAreRef}
        className="absolute inset-0 z-30 flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-28 opacity-0 pointer-events-none"
      >
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-start gap-8 md:gap-14 ml-auto md:mr-6">
          {/* Neon Badge */}
          <div className="shrink-0 mt-3">
            <span className="inline-block bg-[#4adb26] text-[#052210] font-black text-xs sm:text-sm tracking-wider uppercase px-3.5 py-1.5 shadow-[0_0_20px_rgba(74,219,38,0.4)]">
              WHO WE ARE
            </span>
          </div>

          {/* Agency Statement - Exactly 5 clean lines matching Screenshot 2 */}
          <div className="space-y-1.5 md:space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-[1.18] tracking-[-0.02em]">
              Based in Nantes, SPARKK
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-[1.18] tracking-[-0.02em]">
              is a web agency specialized
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-[1.18] tracking-[-0.02em]">
              in creating custom websites
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-[1.18] tracking-[-0.02em]">
              and developing digital solutions
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-[1.18] tracking-[-0.02em]">
              since 2013.
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#052210] to-transparent z-25 pointer-events-none" />
    </section>
  );
}
