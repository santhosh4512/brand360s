/** Independent scroll section. Pass a lottie-web instance and the supplied JSON. */
export function mountGameChangers(root, lottie, animationData) {
  if (!root) return () => {};
  root.classList.add("gc-design");
  root.innerHTML = `<section class="gc-track" aria-label="Why Businesses Choose BRAND 360s"><div class="gc-stage"><div class="gc-art" aria-hidden="true"></div><div class="gc-copy"><p class="gc-kicker" aria-label="Why Businesses Choose"><span class="gc-line" data-text="WHY BUSINESSES CHOOSE" aria-hidden="true"></span></p><h2 class="gc-title" aria-label="BRAND 360s"><span class="gc-line" data-text="BRAND 360S" aria-hidden="true"></span></h2></div><div class="gc-end"><div class="gc-end-inner"><div class="gc-end-left"><h3 class="gc-end-statement">We combine strategic storytelling with professional presentation design to deliver clear, impactful decks. Our solutions also connect with <a href="https://brand360s.com/services/website-design-company-in-chennai/" target="_blank" rel="noopener noreferrer" class="gc-end-link">corporate websites and user-focused web design</a> to strengthen brand credibility.</h3></div><div class="gc-end-right"><div class="gc-credits-stream"><div class="gc-square-card"><img src="/images/process_step1.jpg" alt="Crisp, modern, boardroom-level design" class="gc-card-bg-img" /><div class="gc-card-overlay"></div><div class="gc-card-inner"><div class="gc-card-content"><h4 class="gc-card-title">Crisp, modern, boardroom-level design</h4></div></div></div><div class="gc-square-card"><img src="/images/brand-story-writing.webp" alt="Storytelling that strengthens your pitch" class="gc-card-bg-img" /><div class="gc-card-overlay"></div><div class="gc-card-inner"><div class="gc-card-content"><h4 class="gc-card-title">Storytelling that strengthens your pitch</h4></div></div></div><div class="gc-square-card"><img src="/images/process_step2.jpg" alt="Clean structure for fast comprehension" class="gc-card-bg-img" /><div class="gc-card-overlay"></div><div class="gc-card-inner"><div class="gc-card-content"><h4 class="gc-card-title">Clean structure for fast comprehension</h4></div></div></div><div class="gc-square-card"><img src="/images/seo-analytics-hero.jpg" alt="Custom infographics & data visualisation" class="gc-card-bg-img" /><div class="gc-card-overlay"></div><div class="gc-card-inner"><div class="gc-card-content"><h4 class="gc-card-title">Custom infographics & data visualisation</h4></div></div></div><div class="gc-square-card"><img src="/images/process_step3.jpg" alt="Perfect brand consistency" class="gc-card-bg-img" /><div class="gc-card-overlay"></div><div class="gc-card-inner"><div class="gc-card-content"><h4 class="gc-card-title">Perfect brand consistency</h4></div></div></div><div class="gc-square-card"><img src="/images/process_step5.jpg" alt="Editable, easy-to-present files" class="gc-card-bg-img" /><div class="gc-card-overlay"></div><div class="gc-card-inner"><div class="gc-card-content"><h4 class="gc-card-title">Editable, easy-to-present files</h4></div></div></div><div class="gc-square-card"><img src="/images/seo-growth-hero.jpg" alt="Fast delivery" class="gc-card-bg-img" /><div class="gc-card-overlay"></div><div class="gc-card-inner"><div class="gc-card-content"><h4 class="gc-card-title">Fast delivery</h4></div></div></div><div class="gc-square-card"><img src="/images/process_step4.jpg" alt="Founder-led creative direction" class="gc-card-bg-img" /><div class="gc-card-overlay"></div><div class="gc-card-inner"><div class="gc-card-content"><h4 class="gc-card-title">Founder-led creative direction</h4></div></div></div></div></div><p class="gc-status" role="status"></p></div></section>`;
  const track = root.querySelector(".gc-track"),
    copy = root.querySelector(".gc-copy"),
    end = root.querySelector(".gc-end"),
    endLeft = root.querySelector(".gc-end-left"),
    stream = root.querySelector(".gc-credits-stream");
  const lines = [...root.querySelectorAll("[data-text]")].map((line) => {
    return [...line.dataset.text].map((char) => {
      const span = document.createElement("span");
      span.className = "gc-char";
      span.textContent = char === " " ? "\u00a0" : char;
      line.appendChild(span);
      return span;
    });
  });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const anim = lottie.loadAnimation({
    container: root.querySelector(".gc-art"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: { preserveAspectRatio: "xMidYMid slice", progressiveLoad: false },
  });
  let ready = false,
    raf = 0,
    disposed = false;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  function draw() {
    raf = 0;
    if (disposed || !track) return;
    const rect = track.getBoundingClientRect();
    const p = clamp(-rect.top / Math.max(1, track.offsetHeight - window.innerHeight));
    // Lottie ball expansion finishes and covers screen fully by p = 0.40
    const lottieProgress = clamp(p / 0.40);
    const frame = reduced.matches ? 113 : Math.min(239, lottieProgress * 239);
    if (ready) anim.goToAndStop(frame, true);

    lines.forEach((chars, lineIndex) =>
      chars.forEach((el, i) => {
        const start = (lineIndex === 0 ? -0.05 : 0.0) + i * 0.015;
        const t = reduced.matches ? 1 : clamp((p - start) / 0.20);
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -8 * t);
        el.style.opacity = clamp(t / 0.35);
        el.style.transform = `translateX(${60 * (1 - eased)}px) scaleY(${0.96 + 0.04 * eased}) skewX(${10 * (1 - eased)}deg)`;
      })
    );
    // Initial text fades out as ball expands
    if (copy) copy.style.opacity = reduced.matches ? 1 : 1 - clamp((p - 0.28) / 0.10);

    // Blue background takes over right as ball expansion completes
    const final = reduced.matches ? 1 : clamp((p - 0.38) / 0.06);
    if (end) {
      end.style.visibility = final > 0 ? "visible" : "hidden";
      end.style.opacity = final;
      end.setAttribute("aria-hidden", String(final === 0));
    }

    // ONLY AFTER blue color has fully spread (p >= 0.44), reveal content
    if (endLeft) {
      const leftT = reduced.matches ? 1 : clamp((p - 0.44) / 0.12);
      endLeft.style.opacity = leftT;
      endLeft.style.transform = `translateY(${24 * (1 - leftT)}px)`;
    }
    if (stream) {
      const streamT = reduced.matches ? 0.5 : clamp((p - 0.44) / 0.52);
      const streamHeight = stream.scrollHeight;
      const vhUnit = window.innerHeight || 800;
      const totalVh = (streamHeight / vhUnit) * 100;
      const currentTranslateVh = 65 - streamT * (65 + totalVh - 45);
      stream.style.transform = `translateY(${currentTranslateVh}vh)`;
    }
  }
  function schedule() {
    if (!raf) raf = requestAnimationFrame(draw);
  }
  anim.addEventListener("DOMLoaded", () => {
    ready = true;
    schedule();
  });
  anim.addEventListener("data_failed", () => {
    const status = root.querySelector(".gc-status");
    if (status) status.textContent = "The animation could not be loaded.";
  });
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  reduced.addEventListener("change", schedule);
  draw();
  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    reduced.removeEventListener("change", schedule);
    anim.destroy();
    root.replaceChildren();
  };
}
