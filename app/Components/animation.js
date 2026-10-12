import * as THREE from 'three';

export function mountGallery(root, { assetBase = 'https://sparkk.fr/sk/uploads' } = {}) {
  if (!root) return () => {};

  const controller = new AbortController();
  const on = (el, event, fn) => {
    if (el) el.addEventListener(event, fn, { signal: controller.signal });
  };
  let disposed = false,
    raf = 0,
    release = () => {};
  assetBase = assetBase.replace(/\/$/, '');

  const projects = [
    ['JEC COMPOSITES', 'medium_Capture_d_ecran_2025_03_11_a_23_51_09_8f3111fa9b.png', 'composites-archi'],
    ['ENEDIS APPGRID', 'medium_enedis5_02f854134e.png', 'appgrid-application-tactile'],
    ['HELLFEST', 'medium_hellfest_dcde8690be.png', 'hellfest'],
    ['ODDITY', 'medium_oddity_f3cfdbeafa.jpg', 'oddity-tech'],
    ['MONTREUX COMEDY', 'medium_Main_Image_4892ed8244.jpg', 'montreux-comedy-festival'],
    ['CANNESERIES', 'medium_canneseries_e3ff91c007.jpg', 'canneseries-festival'],
  ];

  const clamp = (v) => Math.max(0, Math.min(1, v));
  const ease = (v) => {
    v = clamp(v);
    return v * v * (3 - 2 * v);
  };
  const range = (p, a, b) => ease((p - a) / (b - a));
  const lerp = THREE.MathUtils.lerp;

  const track = root.querySelector('.track');
  const canvas = root.querySelector('[data-blg=scene]');
  const intro = root.querySelector('.intro');
  const featured = root.querySelector('.featured');
  const discover = root.querySelector('.discover');
  const cue = root.querySelector('.scroll-cue');
  const menu = root.querySelector('[data-blg=menu]');
  const menuButton = root.querySelector('[data-blg=menuButton]');

  if (menuButton && menu) {
    on(menuButton, 'click', () => {
      menu.hidden = !menu.hidden;
      menuButton.setAttribute('aria-expanded', String(!menu.hidden));
    });
    menu.querySelectorAll('a').forEach((a) =>
      on(a, 'click', () => {
        menu.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
      })
    );
    on(window, 'keydown', (e) => {
      if (e.key === 'Escape') {
        menu.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function fallback() {
    const fb = root.querySelector('[data-blg=fallback]');
    if (fb) {
      fb.hidden = false;
      fb.innerHTML = projects
        .map(
          ([name, file, slug]) =>
            `<a href="https://sparkk.fr/en/projet/${slug}"><img src="${assetBase}/${file}" alt="${name}"><p>${name}</p></a>`
        )
        .join('');
    }
    if (intro) intro.hidden = true;
    if (track) track.style.height = '100vh';
    if (canvas) canvas.hidden = true;
    if (cue) cue.hidden = true;
  }

  // Create procedural fallback canvas texture if remote asset is not reachable
  function createFallbackCardTexture(name, index) {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 640;
    const ctx = c.getContext('2d');
    const gradients = [
      ['#0f2b48', '#1a5f7a'],
      ['#142850', '#27496d'],
      ['#0c1b33', '#1e40af'],
      ['#1e1b4b', '#3b82f6'],
      ['#0f172a', '#0284c7'],
      ['#032030', '#006699'],
    ];
    const [c1, c2] = gradients[index % gradients.length];
    const grad = ctx.createLinearGradient(0, 0, 1024, 640);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 640);

    ctx.strokeStyle = 'rgba(158, 218, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 984, 600);

    ctx.fillStyle = '#9edaff';
    ctx.font = 'bold 36px Arial';
    ctx.fillText('FEATURED PROJECT', 60, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px Arial';
    ctx.fillText(name, 60, 220);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '32px Arial';
    ctx.fillText('SPARKK DIGITAL PRODUCTION', 60, 300);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  try {
    release = start() || release;
  } catch (e) {
    console.error('Gallery renderer error:', e);
    fallback();
  }

  function start() {
    if (!canvas) return;
    const stage = root.querySelector('.stage');
    if (!stage) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#061329');

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 150);
    camera.position.set(0, 0.1, 18);

    scene.add(new THREE.HemisphereLight(0xd3efff, 0x07142b, 2.1));
    const key = new THREE.DirectionalLight(0xe8f8ff, 3);
    key.position.set(-4, 8, 6);
    scene.add(key);

    const light = new THREE.PointLight(0x6dbdff, 45, 35);
    light.position.set(4, 2, 6);
    scene.add(light);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    // Voxel sampling of a lightning silhouette
    const polygon = [
      [0.72, 3.4],
      [-1.3, -0.15],
      [-0.12, -0.15],
      [-0.73, -3.45],
      [1.52, 0.7],
      [0.28, 0.7],
      [1.45, 3.4],
    ];

    function inside(x, y) {
      let hit = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i],
          [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
      }
      return hit;
    }

    let seed = 72;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const points = [];
    for (let y = -3.4; y < 3.5; y += 0.24)
      for (let x = -1.4; x < 1.6; x += 0.24)
        if (inside(x, y))
          for (let z = -0.28; z <= 0.3; z += 0.28)
            points.push({
              home: new THREE.Vector3(x, y, z),
              seed: random() * 6.28,
              scale: 0.78 + random() * 0.25,
              cloud: new THREE.Vector3((random() - 0.5) * 8, (random() - 0.5) * 13, (random() - 0.5) * 7),
              scatter: new THREE.Vector3((random() - 0.5) * 28, (random() - 0.5) * 22, random() * 16 - 5),
            });

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.26,
      metalness: 0.16,
      emissive: 0x7dc7ff,
      emissiveIntensity: 0.22,
    });

    const cubes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.232, 0.232, 0.232), material, points.length);
    cubes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    sculpture.add(cubes);

    const palette = [0x163e85, 0x76c7ff, 0xecf9ff, 0x3269b2, 0xa5deff];
    points.forEach((_, i) => cubes.setColorAt(i, new THREE.Color(palette[i % 5])));

    const cards = [],
      ring = new THREE.Group();
    scene.add(ring);

    const textureLoader = new THREE.TextureLoader();

    projects.forEach(([name, file, slug], i) => {
      const card = new THREE.Group();
      card.userData.url = `https://sparkk.fr/en/projet/${slug}`;

      // Create fallback material first
      const fallbackTex = createFallbackCardTexture(name, i);
      const picMat = new THREE.MeshBasicMaterial({ map: fallbackTex, side: THREE.DoubleSide, transparent: true });

      // Try loading primary asset image
      textureLoader.load(
        `${assetBase}/${file}`,
        (loadedTex) => {
          if (disposed) {
            loadedTex.dispose();
            return;
          }
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          picMat.map = loadedTex;
          picMat.needsUpdate = true;
        },
        undefined,
        () => {
          // If assetBase failed, try direct sparkk origin
          textureLoader.load(`https://sparkk.fr/sk/uploads/${file}`, (remoteTex) => {
            if (disposed) {
              remoteTex.dispose();
              return;
            }
            remoteTex.colorSpace = THREE.SRGBColorSpace;
            picMat.map = remoteTex;
            picMat.needsUpdate = true;
          });
        }
      );

      const picture = new THREE.Mesh(new THREE.PlaneGeometry(5.55, 3.4), picMat);
      picture.userData.card = card;
      card.add(picture);

      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 1400;
      labelCanvas.height = 130;
      const ctx = labelCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 77px Arial';
      ctx.textBaseline = 'middle';
      ctx.fillText(name, 2, 65);

      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      labelTexture.colorSpace = THREE.SRGBColorSpace;
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(5.55, 0.52),
        new THREE.MeshBasicMaterial({
          map: labelTexture,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      label.position.y = -1.98;
      card.add(label);
      cards.push(card);
      ring.add(card);
    });

    // A selective bloom pass lights only the cubes
    const size = new THREE.Vector2();
    renderer.getDrawingBufferSize(size);

    const base = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType }),
      bright = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType }),
      blurA = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType }),
      blurB = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });

    const postScene = new THREE.Scene(),
      postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const vertex = 'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}';
    const blurMaterial = new THREE.ShaderMaterial({
      uniforms: { source: { value: null }, step: { value: new THREE.Vector2() } },
      vertexShader: vertex,
      fragmentShader: `uniform sampler2D source;uniform vec2 step;varying vec2 vUv;void main(){vec3 c=texture2D(source,vUv).rgb*.227027;c+=texture2D(source,vUv+step*1.384615).rgb*.316216;c+=texture2D(source,vUv-step*1.384615).rgb*.316216;c+=texture2D(source,vUv+step*3.230769).rgb*.070270;c+=texture2D(source,vUv-step*3.230769).rgb*.070270;gl_FragColor=vec4(c,1.);}`,
    });
    const composite = new THREE.ShaderMaterial({
      uniforms: { base: { value: base.texture }, glow: { value: blurB.texture }, strength: { value: 0.6 } },
      vertexShader: vertex,
      fragmentShader: `uniform sampler2D base;uniform sampler2D glow;uniform float strength;varying vec2 vUv;void main(){vec3 c=texture2D(base,vUv).rgb;vec3 g=texture2D(glow,vUv).rgb;c+=g*strength;c=clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.);gl_FragColor=vec4(pow(c,vec3(1./2.2)),1.);}`,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blurMaterial);
    postScene.add(quad);

    let width = stage.clientWidth || window.innerWidth,
      height = stage.clientHeight || window.innerHeight;

    function resize() {
      if (!stage) return;
      width = stage.clientWidth || window.innerWidth;
      height = stage.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.getDrawingBufferSize(size);
      base.setSize(size.x, size.y);
      [bright, blurA, blurB].forEach((rt) =>
        rt.setSize(Math.max(1, Math.floor(size.x / 4)), Math.max(1, Math.floor(size.y / 4)))
      );
    }
    resize();
    on(window, 'resize', resize);
    const observer = new ResizeObserver(resize);
    observer.observe(stage);

    const dummy = new THREE.Object3D();
    const pos = new THREE.Vector3();
    let p = 0,
      last = performance.now(),
      mouseX = 0,
      mouseY = 0;
    const reduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    const pointer = new THREE.Vector2(),
      ray = new THREE.Raycaster();
    let dragged = false,
      downY = 0;

    on(canvas, 'pointerdown', (e) => {
      downY = e.clientY;
      dragged = false;
    });
    on(canvas, 'pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / width - 0.5;
      mouseY = (e.clientY - rect.top) / height - 0.5;
      if (Math.abs(e.clientY - downY) > 8) dragged = true;
      pointer.set(((e.clientX - rect.left) / width) * 2 - 1, 1 - ((e.clientY - rect.top) / height) * 2);
      ray.setFromCamera(pointer, camera);
      canvas.style.cursor =
        ring.visible && ray.intersectObjects(ring.children, true).some((h) => h.object.userData.card)
          ? 'pointer'
          : 'default';
    });
    on(canvas, 'click', (e) => {
      if (dragged || !ring.visible) return;
      const rect = canvas.getBoundingClientRect();
      pointer.set(((e.clientX - rect.left) / width) * 2 - 1, 1 - ((e.clientY - rect.top) / height) * 2);
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(ring.children, true).find((h) => h.object.userData.card);
      if (hit) window.open(hit.object.userData.card.userData.url, '_blank', 'noopener');
    });

    const background = scene.background;
    const black = new THREE.Color(0x000000);

    function draw(now) {
      if (disposed) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now * 0.001;
      const target = track ? clamp(-track.getBoundingClientRect().top / (track.offsetHeight - height)) : 0;
      p += (target - p) * (reduced ? 1 : 1 - Math.exp(-dt * 8));

      const appear = range(p, 0.075, 0.19),
        form = range(p, 0.2, 0.67),
        scatter = range(p, 0.9, 0.99),
        leave = range(p, 0.78, 0.88);
      const mobile = width < 700;

      if (intro) {
        intro.style.opacity = String(1 - range(p, 0.065, 0.16));
        intro.style.transform = `translateY(${-range(p, 0.065, 0.16) * 85}px)`;
      }

      if (featured) {
        const featureAlpha = range(p, 0.18, 0.27) * (1 - range(p, 0.79, 0.88));
        featured.style.opacity = String(featureAlpha);
      }

      if (discover) {
        const cta = range(p, 0.83, 0.9);
        discover.style.opacity = String(cta);
        discover.style.visibility = cta > 0.02 ? 'visible' : 'hidden';
        discover.style.transform = `translateY(${(1 - cta) * 20}px)`;
      }

      if (cue) {
        cue.style.opacity = String(1 - range(p, 0.01, 0.065));
      }

      sculpture.visible = appear > 0.001;
      sculpture.position.set(lerp(0.5, 0, form), lerp(13, 0, appear), 0);
      const sculptureScale = lerp(1.8, 1.05, form) * (mobile ? 0.85 : 1);
      sculpture.scale.setScalar(sculptureScale);
      sculpture.rotation.set(
        0.06 * (1 - form),
        lerp(p * 9, Math.PI * 2, range(p, 0.73, 0.84)) + (reduced ? 0 : Math.sin(t * 0.28) * 0.1) * (1 - scatter),
        -0.08 * (1 - form)
      );

      for (let i = 0; i < points.length; i++) {
        const d = points[i];
        pos.copy(d.cloud).lerp(d.home, form);
        const noise = (1 - form) * 0.15;
        pos.x += Math.sin(t * 0.45 + d.seed) * noise;
        pos.y += Math.cos(t * 0.4 + d.seed) * noise;
        pos.lerp(d.scatter, scatter);
        dummy.position.copy(pos);
        const rotation = (1 - form) * d.seed + scatter * d.seed;
        dummy.rotation.set(rotation, rotation * 0.7, rotation * 0.5);
        dummy.scale.setScalar(d.scale * lerp(1.7, 1, form));
        dummy.updateMatrix();
        cubes.setMatrixAt(i, dummy.matrix);
      }
      cubes.instanceMatrix.needsUpdate = true;

      const entering = range(p, 0.18, 0.3);
      const ringScale = lerp(0.1, 1, entering) * lerp(1, 0.22, leave);
      ring.scale.setScalar(ringScale * (mobile ? 0.75 : 1));
      ring.visible = entering > 0.001 && leave < 0.999;

      const cursor = lerp(-1.3, 6.1, clamp((p - 0.26) / 0.53));
      cards.forEach((card, i) => {
        const a = ((i - cursor) * Math.PI) / 3;
        card.position.set(Math.sin(a) * 8, -1, Math.cos(a) * 6);
        card.rotation.y = a;
        card.children.forEach((mesh) => (mesh.material.opacity = entering * (1 - leave)));
      });

      camera.position.x += (mouseX * 0.18 - camera.position.x) * 0.035;
      camera.position.y += (mouseY * -0.1 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      renderer.setRenderTarget(base);
      renderer.render(scene, camera);

      const ringVisible = ring.visible;
      ring.visible = false;
      scene.background = black;
      renderer.setRenderTarget(bright);
      renderer.render(scene, camera);
      scene.background = background;
      ring.visible = ringVisible;

      quad.material = blurMaterial;
      blurMaterial.uniforms.source.value = bright.texture;
      blurMaterial.uniforms.step.value.set(2 / bright.width, 0);
      renderer.setRenderTarget(blurA);
      renderer.render(postScene, postCamera);

      blurMaterial.uniforms.source.value = blurA.texture;
      blurMaterial.uniforms.step.value.set(0, 2 / bright.height);
      renderer.setRenderTarget(blurB);
      renderer.render(postScene, postCamera);

      quad.material = composite;
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCamera);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    on(canvas, 'webglcontextlost', (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      fallback();
    });

    return () => {
      observer.disconnect();
      const geometries = new Set(),
        materials = new Set(),
        textures = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        const list = object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : [];
        list.forEach((mat) => {
          materials.add(mat);
          if (mat.map) textures.add(mat.map);
        });
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      [base, bright, blurA, blurB].forEach((t) => t.dispose());
      quad.geometry.dispose();
      blurMaterial.dispose();
      composite.dispose();
      renderer.dispose();
    };
  }

  return () => {
    disposed = true;
    controller.abort();
    cancelAnimationFrame(raf);
    release();
  };
}
