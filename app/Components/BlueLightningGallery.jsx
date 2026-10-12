"use client";

import React, { useEffect, useId, useRef } from "react";
import { mountGallery } from "./animation";
import "./BlueLightningGallery.css";

export default function BlueLightningGallery({
  assetBase = "https://sparkk.fr/sk/uploads",
  className = "",
}) {
  const root = useRef(null);
  const sectionId = useId();

  useEffect(() => {
    if (root.current) {
      const cleanup = mountGallery(root.current, { assetBase });
      return () => {
        if (typeof cleanup === "function") cleanup();
      };
    }
  }, [assetBase]);

  return (
    <div ref={root} className={`blg-root ${className}`}>
      <section id={sectionId} aria-label="Featured projects" className="track">
        <div className="stage">
          <header>
            <a href={`#${sectionId}`} aria-label="Back to start" className="logo">
              SPARKK
            </a>
            <div className="nav-right">
              <span>EN · FR</span>
              <button
                data-blg="menuButton"
                aria-expanded="false"
                aria-controls={`${sectionId}-menu`}
              >
                MENU
              </button>
            </div>
          </header>

          <nav data-blg="menu" id={`${sectionId}-menu`} hidden>
            <a href={`#${sectionId}`}>Featured projects</a>
            <a href="https://sparkk.fr/en/projets" target="_blank" rel="noopener">
              All achievements ↗
            </a>
          </nav>

          <canvas
            data-blg="scene"
            aria-label="A blue and white lightning sculpture surrounded by rotating project images"
          ></canvas>

          <div className="intro">
            <span className="micro">WHO WE ARE</span>
            <p>
              Based in Nantes, SPARKK
              <br />
              is a web agency specialized
              <br />
              in creating custom websites
              <br />
              and developing digital solutions
              <br />
              since 2013.
            </p>
          </div>

          <span className="featured micro">FEATURED PROJECTS</span>

          <div className="social">
            <a
              href="https://www.facebook.com/sparkk.fr"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="https://www.instagram.com/sparkk.fr/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              ig
            </a>
            <a
              href="https://www.linkedin.com/company/sparkk/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>

          <a
            className="discover"
            href="https://sparkk.fr/en/projets"
            target="_blank"
            rel="noopener"
          >
            DISCOVER OUR ACHIEVEMENTS <span>↗</span>
          </a>

          <div className="scroll-cue">
            SCROLL TO EXPLORE <span>↓</span>
          </div>

          <div data-blg="fallback" hidden></div>

          <ol className="accessible-projects">
            <li>
              <a href="https://sparkk.fr/en/projet/composites-archi">
                JEC Composites
              </a>
            </li>
            <li>
              <a href="https://sparkk.fr/en/projet/appgrid-application-tactile">
                Enedis Appgrid
              </a>
            </li>
            <li>
              <a href="https://sparkk.fr/en/projet/hellfest">Hellfest</a>
            </li>
            <li>
              <a href="https://sparkk.fr/en/projet/oddity-tech">Oddity</a>
            </li>
            <li>
              <a href="https://sparkk.fr/en/projet/montreux-comedy-festival">
                Montreux Comedy
              </a>
            </li>
            <li>
              <a href="https://sparkk.fr/en/projet/canneseries-festival">
                Canneseries
              </a>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
