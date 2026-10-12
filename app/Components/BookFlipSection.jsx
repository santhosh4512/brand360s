"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// High-fashion curated photography collection for canvas baking
const EDITORIAL_PAGES = [
  {
    type: "cover_front",
    title: "KEXSIO",
    subtitle: "THE HAUTE COUTURE FOLIO",
    issue: "VOL. VIII — EDITION NOIRE",
    caption: "L'Élégance Permanente & Architecture",
    tag: "№ 00 — PROLOGUE",
    bgGradient: ["#121316", "#1c1e24", "#0a0a0d"],
    accentColor: "#d4af37",
    photoUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "inside_cover",
    title: "SILHOUETTE 01",
    subtitle: "ATELIER & FORM",
    issue: "MONOCHROME STUDY",
    caption: "The structured wool coat in shadow and light.",
    tag: "№ 01 — EDITORIAL",
    bgGradient: ["#f5f2ea", "#ebe6da"],
    accentColor: "#1a1a1a",
    photoUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "spread",
    title: "NOIR DRAPÉ",
    subtitle: "SCULPTED SILK",
    issue: "FALL COLLECTION",
    caption: "Fluid motion captured in 100% mulberry silk.",
    tag: "№ 02 — EDITORIAL",
    bgGradient: ["#f7f4ed", "#ece6d8"],
    accentColor: "#111111",
    photoUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "spread",
    title: "LUMEN AURA",
    subtitle: "GOLDEN HOUR FOLIO",
    issue: "PARIS RESORT",
    caption: "Sunlight dancing on hand-pleated chiffon evening wear.",
    tag: "№ 03 — EDITORIAL",
    bgGradient: ["#f6f3eb", "#eae3d4"],
    accentColor: "#111111",
    photoUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "spread",
    title: "MINIMALISME",
    subtitle: "PURE PROPORTIONS",
    issue: "METROPOLIS 2026",
    caption: "Sharp tailoring meets relaxed architectural ease.",
    tag: "№ 04 — EDITORIAL",
    bgGradient: ["#f5f2ea", "#ebe5d8"],
    accentColor: "#111111",
    photoUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "spread",
    title: "AVANT-GARDE",
    subtitle: "TEXTURAL DIALOGUE",
    issue: "MILANO CAPSULE",
    caption: "Organic weaves contrasted against razor-sharp leather cuts.",
    tag: "№ 05 — EDITORIAL",
    bgGradient: ["#f8f5ee", "#ece5d8"],
    accentColor: "#111111",
    photoUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "spread",
    title: "ÉTHÉRÉ",
    subtitle: "TRANSLUCENT VEILS",
    issue: "SERIES BLANCHE",
    caption: "Weightless organza catching the evening sea breeze.",
    tag: "№ 06 — EDITORIAL",
    bgGradient: ["#f5f2ea", "#e9e3d4"],
    accentColor: "#111111",
    photoUrl: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "spread",
    title: "CHROMA VIVID",
    subtitle: "ELECTRIC BOTANICALS",
    issue: "HAUTE IMPRESSION",
    caption: "Saturated emerald and cobalt pigments printed on satin.",
    tag: "№ 07 — EDITORIAL",
    bgGradient: ["#f6f3ea", "#ece4d6"],
    accentColor: "#111111",
    photoUrl: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "spread",
    title: "NOCTURNE",
    subtitle: "EVENING REVERIE",
    issue: "VELVET COLLECTIVE",
    caption: "Midnight navy velvet with handcrafted crystal embellishments.",
    tag: "№ 08 — EDITORIAL",
    bgGradient: ["#f5f2ea", "#ebe5d8"],
    accentColor: "#111111",
    photoUrl: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "spread",
    title: "ARCHITECTONIQUE",
    subtitle: "THE FINAL CUT",
    issue: "VOLUME FINALE",
    caption: "Sculptural silhouette closing the seasonal presentation.",
    tag: "№ 09 — EDITORIAL",
    bgGradient: ["#f7f4ec", "#ede6d8"],
    accentColor: "#111111",
    photoUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "inside_back",
    title: "COLOPHON",
    subtitle: "IMPRIMÉ À PARIS",
    issue: "CREDITS & ATELIER",
    caption: "Typeset in Playfair Display & DM Mono on 170gsm archival stock.",
    tag: "№ 10 — EPILOGUE",
    bgGradient: ["#f5f2ea", "#eae3d4"],
    accentColor: "#1a1a1a",
    photoUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85",
  },
  {
    type: "cover_back",
    title: "KEXSIO",
    subtitle: "THE EDITION · FIN",
    issue: "WWW.KEXSIO-EDITIONS.COM",
    caption: "All rights reserved. Published seasonally in Paris & Tokyo.",
    tag: "№ 11 — MONOGRAPH",
    bgGradient: ["#121316", "#1c1e24", "#0a0a0d"],
    accentColor: "#d4af37",
    photoUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85",
  },
];

// Canvas baking helper for ultra-crisp editorial pages
function bakePageToCanvas(pageData, pageIndex, isVerso) {
  const width = 1024;
  const height = 1440;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const isCover = pageData.type === "cover_front" || pageData.type === "cover_back";

  // 1. Paper Base
  if (isCover) {
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, pageData.bgGradient[0]);
    bgGrad.addColorStop(0.5, pageData.bgGradient[1]);
    bgGrad.addColorStop(1, pageData.bgGradient[2] || pageData.bgGradient[0]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
    for (let i = 0; i < width; i += 4) {
      ctx.fillRect(i, 0, 1, height);
    }
  } else {
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, pageData.bgGradient[0] || "#f5f2ea");
    bgGrad.addColorStop(1, pageData.bgGradient[1] || "#ebe5d8");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(0, 0, 0, 0.015)";
    for (let i = 0; i < 4000; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      ctx.fillRect(rx, ry, 1.5, 1.5);
    }
  }

  // 2. Gutter Shadow Gradient
  const gutterWidth = 140;
  if (isVerso) {
    const gutterGrad = ctx.createLinearGradient(width - gutterWidth, 0, width, 0);
    gutterGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
    gutterGrad.addColorStop(0.7, "rgba(20, 15, 10, 0.12)");
    gutterGrad.addColorStop(1, "rgba(10, 5, 0, 0.42)");
    ctx.fillStyle = gutterGrad;
    ctx.fillRect(width - gutterWidth, 0, gutterWidth, height);
  } else {
    const gutterGrad = ctx.createLinearGradient(0, 0, gutterWidth, 0);
    gutterGrad.addColorStop(0, "rgba(10, 5, 0, 0.42)");
    gutterGrad.addColorStop(0.3, "rgba(20, 15, 10, 0.12)");
    gutterGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gutterGrad;
    ctx.fillRect(0, 0, gutterWidth, height);
  }

  // 3. Editorial Photo Box
  const marginX = isVerso ? 70 : 80;
  const photoW = width - 150;
  const photoH = isCover ? 820 : 880;
  const photoX = marginX;
  const photoY = isCover ? 380 : 180;

  ctx.strokeStyle = isCover ? "rgba(212, 175, 55, 0.4)" : "rgba(0, 0, 0, 0.12)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(photoX - 8, photoY - 8, photoW + 16, photoH + 16);

  const photoGrad = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoH);
  if (isCover) {
    photoGrad.addColorStop(0, "#2a2d36");
    photoGrad.addColorStop(1, "#15171b");
  } else {
    photoGrad.addColorStop(0, "#e8e1d5");
    photoGrad.addColorStop(1, "#cfc6b6");
  }
  ctx.fillStyle = photoGrad;
  ctx.fillRect(photoX, photoY, photoW, photoH);

  if (pageData.loadedImage) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();

    const img = pageData.loadedImage;
    const imgAspect = img.width / img.height;
    const boxAspect = photoW / photoH;
    let sw, sh, sx, sy;

    if (imgAspect > boxAspect) {
      sh = img.height;
      sw = sh * boxAspect;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw / boxAspect;
      sx = 0;
      sy = (img.height - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, photoX, photoY, photoW, photoH);

    const scrim = ctx.createLinearGradient(photoX, photoY + photoH * 0.5, photoX, photoY + photoH);
    scrim.addColorStop(0, "rgba(0,0,0,0)");
    scrim.addColorStop(1, "rgba(0,0,0,0.5)");
    ctx.fillStyle = scrim;
    ctx.fillRect(photoX, photoY, photoW, photoH);

    ctx.restore();
  }

  // 4. Fine Editorial Typography
  ctx.fillStyle = isCover ? "#d4af37" : "#55524c";
  ctx.font = "600 15px 'DM Mono', monospace";
  ctx.letterSpacing = "3px";
  if (isVerso) {
    ctx.textAlign = "left";
    ctx.fillText("KEXSIO · THE EDITION", photoX, 85);
    ctx.textAlign = "right";
    ctx.fillText(pageData.tag || `№ ${String(pageIndex + 1).padStart(2, "0")} — EDITORIAL`, photoX + photoW, 85);
  } else {
    ctx.textAlign = "left";
    ctx.fillText(pageData.tag || `№ ${String(pageIndex + 1).padStart(2, "0")} — EDITORIAL`, photoX, 85);
    ctx.textAlign = "right";
    ctx.fillText("KEXSIO · THE EDITION", photoX + photoW, 85);
  }

  if (isCover) {
    ctx.textAlign = "center";
    ctx.fillStyle = "#d4af37";
    ctx.font = "italic 700 84px 'Playfair Display', Georgia, serif";
    ctx.letterSpacing = "8px";
    ctx.fillText(pageData.title, width / 2, 210);

    ctx.fillStyle = "#ffffff";
    ctx.font = "400 18px 'DM Mono', monospace";
    ctx.letterSpacing = "6px";
    ctx.fillText(pageData.subtitle, width / 2, 270);

    ctx.fillStyle = "rgba(212, 175, 55, 0.7)";
    ctx.font = "500 15px 'DM Mono', monospace";
    ctx.letterSpacing = "4px";
    ctx.fillText(pageData.issue, width / 2, 320);

    ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 80, 345);
    ctx.lineTo(width / 2 + 80, 345);
    ctx.stroke();

    ctx.fillStyle = "#d4af37";
    ctx.font = "italic 400 22px 'Playfair Display', Georgia, serif";
    ctx.fillText(pageData.caption, width / 2, 1310);

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "400 13px 'DM Mono', monospace";
    ctx.letterSpacing = "3px";
    ctx.fillText("PARIS · NEW YORK · MILAN · TOKYO", width / 2, 1360);
  } else {
    ctx.textAlign = "left";
    ctx.fillStyle = "#161618";
    ctx.font = "italic 700 42px 'Playfair Display', Georgia, serif";
    ctx.fillText(pageData.title, photoX, photoY + photoH + 68);

    ctx.fillStyle = "#4a4843";
    ctx.font = "400 16px 'DM Mono', monospace";
    ctx.letterSpacing = "3px";
    ctx.fillText(pageData.subtitle + " — " + pageData.issue, photoX, photoY + photoH + 104);

    ctx.fillStyle = "#68645d";
    ctx.font = "italic 400 20px 'Playfair Display', Georgia, serif";
    ctx.fillText(pageData.caption, photoX, photoY + photoH + 145);

    ctx.fillStyle = "#8a867c";
    ctx.font = "500 15px 'DM Mono', monospace";
    ctx.letterSpacing = "2px";
    if (isVerso) {
      ctx.textAlign = "left";
      ctx.fillText(String(pageIndex + 1).padStart(2, "0"), photoX, height - 60);
      ctx.textAlign = "right";
      ctx.fillText("AUTUMN / WINTER COLLECTIVE", photoX + photoW, height - 60);
    } else {
      ctx.textAlign = "left";
      ctx.fillText("AUTUMN / WINTER COLLECTIVE", photoX, height - 60);
      ctx.textAlign = "right";
      ctx.fillText(String(pageIndex + 1).padStart(2, "0"), photoX + photoW, height - 60);
    }
  }

  return canvas;
}

export default function BookFlipSection() {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const totalSheets = EDITORIAL_PAGES.length / 2; // 6 sheets = 12 pages

  useEffect(() => {
    const mountEl = mountRef.current;
    const containerEl = containerRef.current;
    if (!mountEl || !containerEl) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    const PW = 1.9;
    const PH = 2.7;
    const SHEET_THICKNESS = 0.0035;
    const BEND_MAX = 2.2;
    const LEAD = 0.35;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c0d10");

    const camera = new THREE.PerspectiveCamera(35, mountEl.clientWidth / mountEl.clientHeight, 0.1, 100);
    const defaultCamPos = new THREE.Vector3(0, 3.4, 4.2);
    camera.position.copy(defaultCamPos);
    camera.lookAt(0, 0.25, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mountEl.appendChild(renderer.domElement);

    // Key Light
    const keyLight = new THREE.DirectionalLight("#fff2dc", 2.6);
    keyLight.position.set(2.8, 6.0, 2.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.camera.left = -3.5;
    keyLight.shadow.camera.right = 3.5;
    keyLight.shadow.camera.top = 3.5;
    keyLight.shadow.camera.bottom = -3.5;
    keyLight.shadow.bias = -0.00015;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight("#d8e5f2", "#181410", 0.7);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight("#9abeff", 0.75);
    rimLight.position.set(-4.0, 3.5, -2.5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight("#1e1a16", 0.35);
    scene.add(ambientLight);

    // Studio Ground Plane
    const groundCanvas = document.createElement("canvas");
    groundCanvas.width = 1024;
    groundCanvas.height = 1024;
    const gCtx = groundCanvas.getContext("2d");
    if (gCtx) {
      const gGrad = gCtx.createRadialGradient(512, 512, 40, 512, 512, 500);
      gGrad.addColorStop(0, "#2c2621");
      gGrad.addColorStop(0.35, "#18181c");
      gGrad.addColorStop(1, "#0c0d10");
      gCtx.fillStyle = gGrad;
      gCtx.fillRect(0, 0, 1024, 1024);
    }
    const groundTexture = new THREE.CanvasTexture(groundCanvas);
    const groundGeo = new THREE.PlaneGeometry(24, 24);
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTexture,
      roughness: 0.85,
      metalness: 0.1,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.02;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Spine Ridge
    const spineGeo = new THREE.CylinderGeometry(0.025, 0.025, PH * 1.02, 16);
    const spineMat = new THREE.MeshStandardMaterial({
      color: "#0a0a0c",
      roughness: 0.4,
      metalness: 0.2,
    });
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    spineMesh.rotation.x = Math.PI / 2;
    spineMesh.position.set(0, 0.015, 0);
    spineMesh.castShadow = true;
    spineMesh.receiveShadow = true;
    scene.add(spineMesh);

    // Page Textures
    const pageCanvases = EDITORIAL_PAGES.map((p, idx) => {
      const isVerso = idx % 2 === 1;
      return bakePageToCanvas(p, idx, isVerso);
    });

    const pageTextures = pageCanvases.map((canvas) => {
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    });

    EDITORIAL_PAGES.forEach((pageData, idx) => {
      if (pageData.photoUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = pageData.photoUrl;
        img.onload = () => {
          pageData.loadedImage = img;
          const isVerso = idx % 2 === 1;
          const updatedCanvas = bakePageToCanvas(pageData, idx, isVerso);
          pageTextures[idx].image = updatedCanvas;
          pageTextures[idx].needsUpdate = true;
        };
      }
    });

    // Left & Right Stacks
    const leftStackGeo = new THREE.BoxGeometry(PW, 1, PH);
    const rightStackGeo = new THREE.BoxGeometry(PW, 1, PH);

    const edgePaperMat = new THREE.MeshStandardMaterial({
      color: "#ded9cb",
      roughness: 0.9,
      metalness: 0.05,
    });

    const createStackMats = (topTexture) => [
      edgePaperMat,
      edgePaperMat,
      new THREE.MeshStandardMaterial({
        map: topTexture,
        roughness: 0.28,
        metalness: 0.04,
      }),
      edgePaperMat,
      edgePaperMat,
      edgePaperMat,
    ];

    const leftStackMesh = new THREE.Mesh(leftStackGeo, createStackMats(pageTextures[0]));
    leftStackMesh.castShadow = true;
    leftStackMesh.receiveShadow = true;
    scene.add(leftStackMesh);

    const rightStackMesh = new THREE.Mesh(rightStackGeo, createStackMats(pageTextures[1]));
    rightStackMesh.castShadow = true;
    rightStackMesh.receiveShadow = true;
    scene.add(rightStackMesh);

    // Physical Turning Leaf (48x18 Grid)
    const leafGeo = new THREE.PlaneGeometry(PW, PH, 48, 18);
    leafGeo.translate(PW / 2, 0, 0);
    const restPositions = leafGeo.attributes.position.array.slice();

    const uniforms = {
      mapFront: { value: pageTextures[0] },
      mapBack: { value: pageTextures[1] },
    };

    const leafMat = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    leafMat.onBeforeCompile = (shader) => {
      shader.uniforms.mapFront = uniforms.mapFront;
      shader.uniforms.mapBack = uniforms.mapBack;
      shader.fragmentShader =
        `
        uniform sampler2D mapFront;
        uniform sampler2D mapBack;
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `
        #ifdef USE_MAP
          vec4 texColor;
          if (gl_FrontFacing) {
            texColor = texture2D(mapFront, vMapUv);
          } else {
            vec2 backUv = vec2(1.0 - vMapUv.x, vMapUv.y);
            texColor = texture2D(mapBack, backUv);
          }
          diffuseColor *= texColor;
        #endif
        `
      );
    };

    const leafMesh = new THREE.Mesh(leafGeo, leafMat);
    leafMesh.castShadow = true;
    leafMesh.receiveShadow = true;
    leafMesh.visible = false;
    scene.add(leafMesh);

    // Physics Deformation
    const deformLeaf = (tv, sheetIdx) => {
      const posAttr = leafGeo.attributes.position;
      const arr = posAttr.array;
      const vertexCount = posAttr.count;

      const clampedTv = Math.max(0, Math.min(1, tv));
      const rightStackH = Math.max(0.002, (totalSheets - sheetIdx - 1) * SHEET_THICKNESS);
      const leftStackH = Math.max(0.002, sheetIdx * SHEET_THICKNESS);

      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3;
        const s = restPositions[i3];      // distance from spine along X [0, PW]
        const z = restPositions[i3 + 1];  // position along spine length Z [-PH/2, PH/2]

        const normalizedZ = z / (PH / 2);
        // Diagonal corner lead twist so the outer-top corner leads the turn
        const localTv = THREE.MathUtils.clamp(
          clampedTv + LEAD * normalizedZ * Math.sin(clampedTv * Math.PI) * 0.25,
          0,
          1
        );
        const localTheta = localTv * Math.PI;
        const localBend = Math.max(0.0001, Math.sin(localTv * Math.PI) * BEND_MAX);

        let cx = 0;
        let cy = 0;

        if (localBend < 0.005) {
          cx = s;
          cy = 0;
        } else {
          const rho = PW / localBend;
          const arcAngle = (s / PW) * localBend;
          cx = rho * Math.sin(arcAngle);
          cy = rho * (1.0 - Math.cos(arcAngle));
        }

        const rotX = Math.cos(localTheta) * cx - Math.sin(localTheta) * cy;
        const rotY = Math.sin(localTheta) * cx + Math.cos(localTheta) * cy;

        const baseH = (1 - localTv) * rightStackH + localTv * leftStackH;
        const finalY = baseH + rotY + 0.04 * Math.sin(localTv * Math.PI) * (s / PW);

        arr[i3] = rotX;
        arr[i3 + 1] = Math.max(0.001, finalY);
        arr[i3 + 2] = z;
      }

      posAttr.needsUpdate = true;
      leafGeo.computeVertexNormals();
    };

    // -------------------------------------------------------------
    // PINNED SCROLL CONTINUOUS PAGE STATE
    // -------------------------------------------------------------
    let currentGlobalProgress = 0;
    let targetGlobalProgress = 0;
    let lastRenderedSpread = -1;

    const updateBookWithGlobalProgress = (gp) => {
      const clamped = Math.max(0, Math.min(totalSheets, gp));
      const activeSheet = Math.min(totalSheets - 1, Math.floor(clamped));
      const sheetTv = clamped - activeSheet;

      const displaySpread = Math.round(clamped);
      if (displaySpread !== lastRenderedSpread) {
        lastRenderedSpread = displaySpread;
        setSpreadIndex(displaySpread);
      }

      if (sheetTv < 0.002) {
        // Resting completely at activeSheet
        leafMesh.visible = false;

        const leftCount = activeSheet;
        const rightCount = totalSheets - activeSheet;
        const leftH = Math.max(0.002, leftCount * SHEET_THICKNESS);
        const rightH = Math.max(0.002, rightCount * SHEET_THICKNESS);

        leftStackMesh.scale.set(1, leftH, 1);
        leftStackMesh.position.set(-PW / 2, leftH / 2, 0);
        rightStackMesh.scale.set(1, rightH, 1);
        rightStackMesh.position.set(PW / 2, rightH / 2, 0);

        const leftIdx = activeSheet > 0 ? 2 * activeSheet - 1 : -1;
        const rightIdx = activeSheet < totalSheets ? 2 * activeSheet : -1;

        if (leftIdx >= 0) {
          leftStackMesh.material[2].map = pageTextures[leftIdx];
          leftStackMesh.material[2].needsUpdate = true;
          leftStackMesh.visible = true;
        } else {
          leftStackMesh.visible = false;
        }

        if (rightIdx >= 0) {
          rightStackMesh.material[2].map = pageTextures[rightIdx];
          rightStackMesh.material[2].needsUpdate = true;
          rightStackMesh.visible = true;
        } else {
          rightStackMesh.visible = false;
        }
      } else if (sheetTv > 0.998) {
        // Resting completely at activeSheet + 1
        leafMesh.visible = false;

        const leftCount = activeSheet + 1;
        const rightCount = totalSheets - (activeSheet + 1);
        const leftH = Math.max(0.002, leftCount * SHEET_THICKNESS);
        const rightH = Math.max(0.002, rightCount * SHEET_THICKNESS);

        leftStackMesh.scale.set(1, leftH, 1);
        leftStackMesh.position.set(-PW / 2, leftH / 2, 0);
        rightStackMesh.scale.set(1, rightH, 1);
        rightStackMesh.position.set(PW / 2, rightH / 2, 0);

        const leftIdx = 2 * (activeSheet + 1) - 1;
        const rightIdx = activeSheet + 1 < totalSheets ? 2 * (activeSheet + 1) : -1;

        if (leftIdx >= 0 && leftIdx < pageTextures.length) {
          leftStackMesh.material[2].map = pageTextures[leftIdx];
          leftStackMesh.material[2].needsUpdate = true;
          leftStackMesh.visible = true;
        } else {
          leftStackMesh.visible = false;
        }

        if (rightIdx >= 0 && rightIdx < pageTextures.length) {
          rightStackMesh.material[2].map = pageTextures[rightIdx];
          rightStackMesh.material[2].needsUpdate = true;
          rightStackMesh.visible = true;
        } else {
          rightStackMesh.visible = false;
        }
      } else {
        // Turning leaf is active in 3D
        leafMesh.visible = true;

        // Static underneath stacks
        const leftCount = activeSheet;
        const rightCount = totalSheets - (activeSheet + 1);
        const leftH = Math.max(0.002, leftCount * SHEET_THICKNESS);
        const rightH = Math.max(0.002, rightCount * SHEET_THICKNESS);

        leftStackMesh.scale.set(1, leftH, 1);
        leftStackMesh.position.set(-PW / 2, leftH / 2, 0);
        rightStackMesh.scale.set(1, rightH, 1);
        rightStackMesh.position.set(PW / 2, rightH / 2, 0);

        const leftIdx = activeSheet > 0 ? 2 * activeSheet - 1 : -1;
        const rightIdx = activeSheet + 1 < totalSheets ? 2 * (activeSheet + 1) : -1;

        if (leftIdx >= 0) {
          leftStackMesh.material[2].map = pageTextures[leftIdx];
          leftStackMesh.material[2].needsUpdate = true;
          leftStackMesh.visible = true;
        } else {
          leftStackMesh.visible = false;
        }

        if (rightIdx >= 0) {
          rightStackMesh.material[2].map = pageTextures[rightIdx];
          rightStackMesh.material[2].needsUpdate = true;
          rightStackMesh.visible = true;
        } else {
          rightStackMesh.visible = false;
        }

        // Turning sheet textures
        const frontIdx = 2 * activeSheet;
        const backIdx = 2 * activeSheet + 1;

        if (uniforms.mapFront.value !== pageTextures[frontIdx]) {
          uniforms.mapFront.value = pageTextures[frontIdx];
          leafMat.needsUpdate = true;
        }
        if (uniforms.mapBack.value !== pageTextures[backIdx]) {
          uniforms.mapBack.value = pageTextures[backIdx];
          leafMat.needsUpdate = true;
        }

        deformLeaf(sheetTv, activeSheet);
      }
    };

    // Scroll Listener
    const handleScroll = () => {
      if (prefersReducedMotion || !containerEl) return;
      const rect = containerEl.getBoundingClientRect();
      const scrollDistance = -rect.top;
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollDistance / totalScroll));
      targetGlobalProgress = progress * totalSheets;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Mouse parallax
    const mouse = new THREE.Vector2();
    const onMouseMove = (e) => {
      const rect = mountEl.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentGlobalProgress = THREE.MathUtils.lerp(currentGlobalProgress, targetGlobalProgress, 0.12);
      updateBookWithGlobalProgress(currentGlobalProgress);

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, defaultCamPos.x + mouse.x * 0.06, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, defaultCamPos.z + mouse.y * 0.06, 0.05);
      camera.lookAt(0, 0.25, 0);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!mountEl) return;
      const width = mountEl.clientWidth;
      const height = mountEl.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      handleScroll();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      spineGeo.dispose();
      spineMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      leftStackGeo.dispose();
      rightStackGeo.dispose();
      pageTextures.forEach((t) => t.dispose());

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [totalSheets]);

  return (
    <section
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: `${(totalSheets + 1) * 100}vh` }}
    >
      {/* Sticky Full-Screen Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0c0d10] flex flex-col items-center justify-center">
        {/* Injected Typography & Editorial Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
          
          .editorial-chrome {
            font-family: 'DM Mono', monospace;
            pointer-events: none;
            mix-blend-mode: difference;
          }
          .editorial-serif {
            font-family: 'Playfair Display', Georgia, serif;
          }
        `}</style>

        {/* 3D WebGL Canvas Stage */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Editorial Studio Chrome & Metadata Overlay */}
        <div className="editorial-chrome absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-[#ffffff] z-20">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="editorial-serif font-bold text-xl tracking-wider">KEXSIO®</span>
              <span className="text-xs uppercase tracking-widest text-white/70">· Pageflip · Book</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-white/60 hidden sm:block">
              Haute Couture Physical Folio
            </div>
          </div>

          {/* Bottom Interactive Chrome */}
          <div className="flex items-end justify-between border-t border-white/20 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-widest text-white/80">
                Scroll to Leaf Through the Folio
              </span>
              <span className="text-[10px] text-white/40 font-light">
                Physical cylinder curvature & real moving cast shadows
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs tracking-widest">
                Spread {String(spreadIndex).padStart(2, "0")} / {String(totalSheets).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSheets + 1 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 transition-all duration-300 rounded-full ${
                      i === spreadIndex ? "w-5 bg-white" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
