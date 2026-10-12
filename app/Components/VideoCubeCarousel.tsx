"use client";

import React, {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type CubeDirection = "left" | "right" | "top" | "bottom";
export type InteractionMode = "autoplay" | "drag" | "scroll";

export interface CubeVideo {
  id: string;
  src: string;
  poster?: string;
  label: string;
  title: string;
}

export interface VideoCubeCarouselProps {
  videos?: CubeVideo[];
  direction?: CubeDirection;
  interaction?: InteractionMode;

  cubeWidth?: number;
  cubeHeight?: number;

  transitionDuration?: number;
  dragSensitivity?: number;

  showContent?: boolean;
  showProgress?: boolean;
  pauseOnHover?: boolean;

  className?: string;
  style?: CSSProperties;

  scrollRotation?: number;
  onIndexChange?: (index: number) => void;
}

export const DEFAULT_SEO_VIDEOS: CubeVideo[] = [
  {
    id: "seo-services-chennai",
    src: "https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    label: "01 / 05 — Strategic SEO",
    title: "Seo Services\nChennai",
  },
  {
    id: "local-seo-chennai",
    src: "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
    label: "02 / 05 — Geo Visibility",
    title: "Local Seo\nChennai",
  },
  {
    id: "gmb-optimization-chennai",
    src: "https://videos.pexels.com/video-files/3255275/3255275-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1200&auto=format&fit=crop",
    label: "03 / 05 — Maps Ranking",
    title: "GMB Optimization\nChennai",
  },
  {
    id: "best-seo-agency-chennai",
    src: "https://videos.pexels.com/video-files/9620654/9620654-hd_1080_1920_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    label: "04 / 05 — Proven Results",
    title: "Best Seo Agency\nChennai",
  },
  {
    id: "website-seo-services-india",
    src: "https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
    label: "05 / 05 — National Presence",
    title: "Website Seo Services\nIndia",
  },
];

function wrapIndex(value: number, total: number) {
  if (total <= 0) return 0;
  return ((value % total) + total) % total;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export default function VideoCubeCarousel({
  videos = DEFAULT_SEO_VIDEOS,
  direction = "right",
  interaction = "scroll",

  cubeWidth = 560,
  cubeHeight = 360,

  transitionDuration = 700,
  dragSensitivity = 1,

  showContent = true,
  showProgress = true,
  pauseOnHover = true,

  className = "",
  style,

  scrollRotation,
  onIndexChange,
}: VideoCubeCarouselProps) {
  const videoItems = videos.length > 0 ? videos : DEFAULT_SEO_VIDEOS;
  const videoCount = videoItems.length;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [internalRotation, setInternalRotation] = useState(0);
  const [responsiveScale, setResponsiveScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Active rotation is controlled by scrollRotation if provided, otherwise internal
  const currentRotation =
    scrollRotation !== undefined ? scrollRotation : internalRotation;

  const isHorizontal = direction === "left" || direction === "right";
  const cubeDepth = isHorizontal ? cubeWidth : cubeHeight;
  const halfDepth = cubeDepth / 2;

  // Derive which item is facing the front camera
  const frontIndex = wrapIndex(
    Math.round(currentRotation / 90),
    videoCount
  );

  useEffect(() => {
    onIndexChange?.(frontIndex);
  }, [frontIndex, onIndexChange]);

  // Dynamic assignment of video items to the 4 physical face slots (0, 90, 180, 270 deg)
  // When a slot turns to the back side (away from camera), it seamlessly prepares the next item!
  const getSlotVideo = (slotIndex: number) => {
    const slotBaseAngle = slotIndex * 90;
    // Calculate cycle for this specific slot relative to total rotation
    const cycle = Math.floor(
      (currentRotation - slotBaseAngle + 180) / 360
    );
    const itemIndex = wrapIndex(slotIndex + cycle * 4, videoCount);
    return videoItems[itemIndex] || videoItems[0];
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeCarousel = () => {
      const bounds = container.getBoundingClientRect();
      const availableWidth = Math.max(260, bounds.width - 24);
      const availableHeight = Math.max(200, bounds.height - 40);

      const widthScale = availableWidth / cubeWidth;
      const heightScale = availableHeight / cubeHeight;

      setResponsiveScale(Math.min(1, widthScale, heightScale));
    };

    resizeCarousel();
    const observer = new ResizeObserver(resizeCarousel);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [cubeHeight, cubeWidth]);

  // Drag interaction when scroll is not active
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originalRotation: number;
  } | null>(null);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (interaction !== "drag") return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Fallback
      }

      setIsDragging(true);
      setIsPaused(true);

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originalRotation: internalRotation,
      };
    },
    [interaction, internalRotation]
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const horizontalDistance = event.clientX - drag.startX;
      const sensitivity = clamp(dragSensitivity, 0.35, 3);
      const movementRotation =
        (horizontalDistance * 90 * sensitivity) / Math.max(1, cubeDepth);

      setInternalRotation(drag.originalRotation - movementRotation);
    },
    [cubeDepth, dragSensitivity]
  );

  const handlePointerRelease = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Fallback
      }

      dragRef.current = null;
      setIsDragging(false);
      setIsPaused(false);

      // Snap to nearest 90 deg
      const snapped = Math.round(internalRotation / 90) * 90;
      setInternalRotation(snapped);
    },
    [internalRotation]
  );

  const cubeTransform = isHorizontal
    ? `rotateY(${-currentRotation}deg)`
    : `rotateX(${-currentRotation}deg)`;

  const rootStyle = {
    ...style,
    "--cube-transition": `${transitionDuration}ms`,
  } as CSSProperties;

  return (
    <>
      <style>{`
        .video-cube {
          position: relative;
          width: 100%;
          height: 100%;
          min-width: 280px;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          isolation: isolate;
          outline: none;
          user-select: none;
          touch-action: none;
          background: transparent;
        }

        .video-cube::after {
          display: none;
        }

        .video-cube__viewport {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          perspective: 1400px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
        }

        .video-cube__scaler {
          position: relative;
          transform-origin: center;
          transform-style: preserve-3d;
        }

        .video-cube__object {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .video-cube__face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #101c38;
          border-radius: 24px;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.12),
            0 25px 50px -12px rgba(0, 0, 0, 0.65);
        }

        .video-cube__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          border: 0;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
          transform: scale(1.02);
          background: #101c38;
        }

        .video-cube__reflection {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.2),
            transparent 30%,
            transparent 70%,
            rgba(255, 255, 255, 0.05)
          );
          mix-blend-mode: screen;
          opacity: 0.5;
        }

        .video-cube__edge-shade {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          box-shadow:
            inset 24px 0 36px rgba(16, 28, 56, 0.7),
            inset -24px 0 36px rgba(16, 28, 56, 0.7);
        }

        .video-cube__content-gradient {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(16, 28, 56, 0.1) 0%,
            rgba(16, 28, 56, 0.6) 45%,
            rgba(16, 28, 56, 0.96) 100%
          );
        }

        .video-cube__content {
          position: absolute;
          left: 32px;
          right: 32px;
          bottom: 30px;
          z-index: 3;
          color: #ffffff;
          pointer-events: none;
        }

        .video-cube__label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          padding: 5px 12px;
          border-radius: 999px;
          background: rgba(4, 129, 162, 0.5);
          border: 1px solid rgba(56, 189, 248, 0.5);
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #38bdf8;
          backdrop-blur: 10px;
          box-shadow: 0 4px 12px rgba(4, 129, 162, 0.3);
        }

        .video-cube__title {
          display: block;
          white-space: pre-line;
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: clamp(26px, 3.2vw, 40px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.04em;
          color: #ffffff;
          text-shadow: 0 4px 24px rgba(16, 28, 56, 0.98);
        }

        .video-cube__drag-layer {
          position: absolute;
          inset: 0;
          z-index: 10;
          cursor: grab;
        }

        .video-cube__drag-layer--active {
          cursor: grabbing;
        }

        .video-cube__progress {
          position: absolute;
          left: 50%;
          bottom: -16px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 8px;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .video-cube__dot {
          width: 7px;
          height: 7px;
          display: block;
          border-radius: 999px;
          background: rgba(222, 226, 230, 0.35);
          transition:
            width 400ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 400ms ease,
            box-shadow 400ms ease;
        }

        .video-cube__dot--active {
          width: 32px;
          background: #38bdf8;
          box-shadow: 0 0 14px rgba(56, 189, 248, 0.9);
        }

        .video-cube__sr-text {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          white-space: nowrap;
        }

        @media (max-width: 650px) {
          .video-cube {
            min-height: 340px;
          }
          .video-cube__face {
            border-radius: 18px;
          }
          .video-cube__content {
            left: 20px;
            right: 20px;
            bottom: 20px;
          }
          .video-cube__progress {
            bottom: -12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .video-cube__dot {
            transition-duration: 1ms !important;
          }
        }
      `}</style>

      <section
        ref={containerRef}
        className={`video-cube ${className}`}
        style={rootStyle}
        tabIndex={0}
        role="region"
        aria-roledescription="3D video carousel"
        aria-label="SEO Services 3D Cube Showcase"
      >
        <div
          className="video-cube__viewport"
          style={{
            width: cubeWidth,
            height: cubeHeight,
          }}
        >
          <div
            className="video-cube__scaler"
            style={{
              width: cubeWidth,
              height: cubeHeight,
              transform: `scale(${responsiveScale})`,
            }}
          >
            <div
              className="video-cube__object"
              style={{
                width: cubeWidth,
                height: cubeHeight,
                transform: cubeTransform,
              }}
            >
              {[0, 1, 2, 3].map((slotIndex) => {
                const video = getSlotVideo(slotIndex);
                const baseRotation = slotIndex * 90;

                const faceTransform = isHorizontal
                  ? `rotateY(${baseRotation}deg) translateZ(${halfDepth}px)`
                  : `rotateX(${baseRotation}deg) translateZ(${halfDepth}px)`;

                return (
                  <article
                    key={slotIndex}
                    className="video-cube__face"
                    style={{
                      width: cubeWidth,
                      height: cubeHeight,
                      transform: faceTransform,
                    }}
                  >
                    <video
                      className="video-cube__video"
                      src={video.src}
                      poster={video.poster}
                      muted
                      playsInline
                      loop
                      autoPlay
                      preload="auto"
                      disablePictureInPicture
                    />

                    <span className="video-cube__reflection" />
                    <span className="video-cube__edge-shade" />

                    {showContent && (
                      <>
                        <span className="video-cube__content-gradient" />
                        <span className="video-cube__content">
                          <span className="video-cube__title">
                            {video.title}
                          </span>
                        </span>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {interaction === "drag" && (
          <div
            className={[
              "video-cube__drag-layer",
              isDragging ? "video-cube__drag-layer--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerRelease}
            onPointerCancel={handlePointerRelease}
            aria-hidden="true"
          />
        )}

        {showProgress && (
          <div className="video-cube__progress" aria-hidden="true">
            {videoItems.map((video, index) => (
              <span
                key={video.id}
                className={[
                  "video-cube__dot",
                  index === frontIndex ? "video-cube__dot--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>
        )}

        <span className="video-cube__sr-text" aria-live="polite">
          Showing SEO Service {frontIndex + 1} of {videoCount}
        </span>
      </section>
    </>
  );
}
