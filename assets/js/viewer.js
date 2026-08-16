/* ==========================================================================
   Specimen viewer — real geometry, art-directed finish.

   STL carries no material data, so the finish is ours to author: one studio
   environment, one physically-based aluminium, and creased edge lines so the
   part reads as a machined object rather than a game asset.

   Loads on intent, renders on demand, sleeps when off screen.
   ========================================================================== */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import { STLLoader } from 'three/addons/STLLoader.js';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/RoomEnvironment.js';
import { toCreasedNormals } from 'three/addons/BufferGeometryUtils.js';

const FINISHES = window.__FINISHES;
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Box-projected UVs. STL has none, and a tiling grain map needs some. */
function boxProjectUVs(geometry) {
  if (geometry.getAttribute('uv')) return geometry;
  const pos = geometry.getAttribute('position');
  const nor = geometry.getAttribute('normal');
  geometry.computeBoundingBox();
  const size = geometry.boundingBox.getSize(new THREE.Vector3());
  const k = 1 / (Math.max(size.x, size.y, size.z) || 1);
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const nx = Math.abs(nor.getX(i));
    const ny = Math.abs(nor.getY(i));
    const nz = Math.abs(nor.getZ(i));
    let u, v;
    if (nx >= ny && nx >= nz) { u = pos.getZ(i); v = pos.getY(i); }
    else if (ny >= nz) { u = pos.getX(i); v = pos.getZ(i); }
    else { u = pos.getX(i); v = pos.getY(i); }
    uv[i * 2] = u * k;
    uv[i * 2 + 1] = v * k;
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return geometry;
}

let sharedGrain = null;
/** The blasted / anodised tooth: fine isotropic noise, driving roughness and
 *  a shallow bump so light actually scatters off the surface. */
function grainTexture(renderer) {
  if (sharedGrain) return sharedGrain;
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = 148 + Math.random() * 107;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(14, 14);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  sharedGrain = t;
  return t;
}

let sharedEnv = null;
function environment(renderer) {
  if (sharedEnv) return sharedEnv;
  const pmrem = new THREE.PMREMGenerator(renderer);
  sharedEnv = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return sharedEnv;
}

export function mountViewer(root) {
  const canvas = root.querySelector('.viewer__canvas');
  const stateEl = root.querySelector('.viewer__state');
  const stateText = root.querySelector('[data-state-text]');
  const bar = root.querySelector('.viewer__bar i');
  const src = root.dataset.model;
  if (!canvas || !src) return null;

  /* ---- renderer ---------------------------------------------------- */
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: true, powerPreference: 'high-performance',
    });
  } catch (err) {
    fail('WebGL unavailable — showing the rendered plate');
    return null;
  }
  if (!renderer.capabilities.isWebGL2 && !renderer.getContext()) {
    fail('WebGL unavailable — showing the rendered plate');
    return null;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.environment = environment(renderer);
  scene.environmentIntensity = 0.95;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 4000);

  /* ---- light: one key with a real shadow, one cool fill -------------- */
  const key = new THREE.DirectionalLight(0xfff4e2, 1.9);
  key.position.set(2.2, 3.4, 2.0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0012;
  key.shadow.normalBias = 0.02;
  scene.add(key, key.target);

  const fill = new THREE.DirectionalLight(0x9fc4e8, 0.85);
  fill.position.set(-2.6, 1.2, -1.6);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 1.1);
  rim.position.set(-0.6, 1.6, -3.2);
  scene.add(rim);

  /* ---- the specimen -------------------------------------------------- */
  const pivot = new THREE.Group();
  scene.add(pivot);

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xb9bec2, metalness: 0.95, roughness: 0.55,
    envMapIntensity: 1.0,
    // Push the surface back a hair so the edge lines sit in front of it
    // instead of fighting it for the same depth.
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
  });
  const grain = grainTexture(renderer);
  material.roughnessMap = grain;
  material.bumpMap = grain;
  material.bumpScale = 0.035;

  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0xe4ecf1, transparent: true, opacity: 0.55, depthWrite: false,
  });

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.ShadowMaterial({ opacity: 0.5 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  /* ---- controls ------------------------------------------------------ */
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.enablePan = false;
  controls.rotateSpeed = 0.85;
  controls.zoomSpeed = 0.7;
  controls.autoRotate = !REDUCED && root.dataset.spin !== 'off';
  controls.autoRotateSpeed = 0.85;
  controls.minPolarAngle = 0.18;
  controls.maxPolarAngle = Math.PI - 0.18;

  let needsRender = true;
  const invalidate = () => { needsRender = true; };
  controls.addEventListener('change', invalidate);
  controls.addEventListener('start', () => {
    controls.autoRotate = false;
    root.dataset.touched = 'yes';
  });

  /* ---- fit ------------------------------------------------------------ */
  let home = { pos: new THREE.Vector3(), target: new THREE.Vector3() };

  function frame(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());

    object.position.sub(centre);
    object.position.y += size.y / 2;

    const radius = Math.max(size.x, size.y, size.z) * 0.5 || 1;
    // Solve both axes. The vertical FOV alone is not a fit: on a portrait
    // frame the horizontal FOV is the narrower one, and a wide part overflows
    // it however generous the padding looks. Portrait surfaces may declare
    // their own framing rather than inherit a landscape composition.
    const pad = parseFloat(
      (camera.aspect < 1 && root.dataset.fitPortrait) || root.dataset.fit || '1.3'
    );
    const halfV = (camera.fov * Math.PI) / 360;
    const halfH = Math.atan(Math.tan(halfV) * camera.aspect);
    const dist = Math.max(radius / Math.sin(halfV), radius / Math.sin(halfH)) * pad;

    camera.near = dist / 120;
    camera.far = dist * 24;

    const target = new THREE.Vector3(0, size.y / 2, 0);
    camera.position.set(dist * 0.62, size.y / 2 + dist * 0.44, dist * 0.78);
    controls.target.copy(target);
    controls.minDistance = dist * 0.42;
    controls.maxDistance = dist * 2.6;

    home = { pos: camera.position.clone(), target: target.clone() };

    const span = radius * 7;
    shadowPlane.scale.set(span, span, 1);
    shadowPlane.position.y = 0.001;

    key.position.set(radius * 2.4, radius * 3.6, radius * 2.2);
    key.target.position.copy(target);
    const s = key.shadow.camera;
    s.left = -radius * 2.2; s.right = radius * 2.2;
    s.top = radius * 2.2; s.bottom = -radius * 2.2;
    s.near = radius * 0.4; s.far = radius * 12;
    s.updateProjectionMatrix();

    fill.position.set(-radius * 3, radius * 1.4, -radius * 2);
    rim.position.set(-radius * 0.8, radius * 1.8, -radius * 3.4);

    camera.updateProjectionMatrix();
    controls.update();
    invalidate();
  }

  /* ---- load ------------------------------------------------------------ */
  const ext = src.split('?')[0].split('.').pop().toLowerCase();

  function onProgress(evt) {
    if (!bar || !evt.lengthComputable) return;
    const pct = Math.round((evt.loaded / evt.total) * 100);
    bar.style.setProperty('--p', String(pct / 100));
    if (stateText) stateText.textContent = `Loading specimen · ${pct}%`;
  }

  function fail(message) {
    root.classList.add('is-failed');
    root.classList.remove('is-live');
    if (stateText) stateText.textContent = message;
    if (bar) bar.parentElement.style.display = 'none';
  }

  function receive(object) {
    pivot.add(object);
    object.traverse((n) => {
      if (!n.isMesh) return;
      n.castShadow = true;
      n.receiveShadow = true;
      n.material = material;
      const eg = new THREE.EdgesGeometry(n.geometry, 26);
      const lines = new THREE.LineSegments(eg, edgeMaterial);
      lines.raycast = () => {};
      n.add(lines);
    });
    // Frame against the real aspect, not the 1:1 the camera was born with.
    if (root.clientWidth && root.clientHeight) {
      camera.aspect = root.clientWidth / root.clientHeight;
    }
    frame(pivot);
    root.classList.add('is-live');
    root.classList.remove('is-failed');
    if (stateEl) stateEl.hidden = true;
    applyFinish(root.dataset.finish || 'natural');
    start();
  }

  if (ext === 'stl') {
    new STLLoader().load(src, (geometry) => {
      const g = boxProjectUVs(toCreasedNormals(geometry.toNonIndexed(), (20 * Math.PI) / 180));
      receive(new THREE.Mesh(g, material));
    }, onProgress, () => fail('Specimen could not be loaded'));
  } else if (ext === 'glb' || ext === 'gltf') {
    new GLTFLoader().load(src, (gltf) => receive(gltf.scene), onProgress,
      () => fail('Specimen could not be loaded'));
  } else {
    fail('Unsupported model format');
    return null;
  }

  /* ---- finish ---------------------------------------------------------- */
  function applyFinish(name) {
    const f = FINISHES[name] || FINISHES.natural;
    material.color.setHex(f.color);
    material.metalness = f.metalness;
    material.roughness = f.roughness;
    material.needsUpdate = true;
    // Dark finishes swallow the wireframe; lift the edges to keep the
    // machined read.
    edgeMaterial.opacity = f.edge;
    edgeMaterial.color.setHex(f.edgeColor);
    root.dataset.finish = name;
    invalidate();
  }

  /* ---- loop ------------------------------------------------------------ */
  let running = false;
  /* Two independent reasons to stop drawing, tracked separately. Folding them
     into one flag latches it: once a tab switch clears it, the return event
     recomputes from the already-false value and the loop never draws again. */
  let inView = true;
  let pageVisible = true;
  let raf = 0;

  function resize() {
    const w = root.clientWidth;
    const h = root.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;

    const shift = (root.dataset.shift || '').split(',').map(Number);
    if (shift.length === 2 && w >= 900) {
      camera.setViewOffset(w, h, shift[0] * w, shift[1] * h, w, h);
    } else {
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
    invalidate();
  }

  function tick() {
    raf = requestAnimationFrame(tick);
    if (!inView || !pageVisible) return;
    const moved = controls.update();
    if (moved || needsRender) {
      needsRender = false;
      renderer.render(scene, camera);
    }
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    tick();
  }

  const ro = new ResizeObserver(resize);
  ro.observe(root);

  const io = new IntersectionObserver((entries) => {
    inView = entries[0].isIntersecting;
    if (inView) invalidate();
  }, { rootMargin: '120px' });
  io.observe(root);

  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    invalidate();
  });

  /* ---- keyboard: the viewer is operable without a pointer -------------- */
  canvas.addEventListener('keydown', (e) => {
    const step = 0.12;
    const spherical = new THREE.Spherical().setFromVector3(
      camera.position.clone().sub(controls.target)
    );
    let handled = true;
    switch (e.key) {
      case 'ArrowLeft': spherical.theta -= step; break;
      case 'ArrowRight': spherical.theta += step; break;
      case 'ArrowUp': spherical.phi = Math.max(0.2, spherical.phi - step); break;
      case 'ArrowDown': spherical.phi = Math.min(Math.PI - 0.2, spherical.phi + step); break;
      case '+': case '=': spherical.radius = Math.max(controls.minDistance, spherical.radius * 0.88); break;
      case '-': case '_': spherical.radius = Math.min(controls.maxDistance, spherical.radius * 1.14); break;
      case 'r': case 'R': reset(); return;
      default: handled = false;
    }
    if (!handled) return;
    e.preventDefault();
    controls.autoRotate = false;
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
    controls.update();
    invalidate();
  });

  function reset() {
    camera.position.copy(home.pos);
    controls.target.copy(home.target);
    controls.autoRotate = !REDUCED && root.dataset.spin !== 'off';
    controls.update();
    invalidate();
  }

  const resetBtn = root.querySelector('.viewer__reset');
  if (resetBtn) resetBtn.addEventListener('click', reset);

  return {
    setFinish: applyFinish,
    reset,
    /* Handles used only by tools/make-posters.mjs. */
    _renderNow: () => { controls.update(); renderer.render(scene, camera); },
    _view: (name) => {
      const d = camera.position.distanceTo(controls.target);
      const t = controls.target;
      if (name === 'front') camera.position.set(t.x, t.y + d * 0.06, t.z + d);
      else if (name === 'top') camera.position.set(t.x, t.y + d, t.z + d * 0.001);
      else if (name === 'side') camera.position.set(t.x + d, t.y + d * 0.06, t.z);
      controls.update();
      invalidate();
    },
  };
}
