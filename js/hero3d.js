/* Hero 3D crystal. Loaded on demand from main.js; any failure leaves the static render image in place. */
import * as THREE from "../vendor/three.module.min.js";

export function start(canvas, box, opts) {
  opts = opts || {};
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !opts.lite, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.lite ? 1.25 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0.1, 7);

  scene.add(new THREE.AmbientLight(0x8aa0a0, 0.55));
  var key = new THREE.DirectionalLight(0xdfe8ff, 2.2); key.position.set(-3, 4, 5); scene.add(key);
  var glow = new THREE.PointLight(0x9be22b, 28, 12); glow.position.set(0, -0.5, 2.2); scene.add(glow);
  var rim = new THREE.PointLight(0x4cc9a0, 14, 14); rim.position.set(3.5, 2, -2); scene.add(rim);

  var crystal = new THREE.Group(); scene.add(crystal);

  /* dark rocky core, displaced per-vertex (same input => same output, so faces stay joined) */
  var core = new THREE.IcosahedronGeometry(1.15, opts.lite ? 1 : 2), pos = core.attributes.position, v = new THREE.Vector3();
  for (var i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    var d = 1 + 0.16 * Math.sin(v.x * 5 + 1.3) * Math.sin(v.y * 4.2) * Math.sin(v.z * 5.6 + .4) + 0.05 * Math.sin(v.x * 13 + v.z * 11);
    v.multiplyScalar(d); pos.setXYZ(i, v.x, v.y, v.z);
  }
  core.computeVertexNormals();
  crystal.add(new THREE.Mesh(core, new THREE.MeshStandardMaterial({ color: 0x1a1f1c, roughness: 0.85, metalness: 0.25, flatShading: true })));

  /* emerald shards radiating from a Fibonacci sphere */
  var shardMat = new THREE.MeshPhysicalMaterial({ color: 0x74d61c, emissive: 0x1f5a00, emissiveIntensity: 0.7, roughness: 0.12, metalness: 0,
    clearcoat: 1, transparent: true, opacity: 0.92, flatShading: true });
  var N = opts.lite ? 20 : 30, up = new THREE.Vector3(0, 1, 0), seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  for (var k = 0; k < N; k++) {
    var y = 1 - (k / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = k * 2.399963;
    var dir = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r);
    var len = 0.4 + rnd() * 0.8, rad = 0.17 + rnd() * 0.2;
    var m = new THREE.Mesh(new THREE.ConeGeometry(rad, len, 5 + (k % 2), 1), shardMat);
    m.quaternion.setFromUnitVectors(up, dir);
    m.rotateY(rnd() * 3); m.position.copy(dir).multiplyScalar(0.95 + len * 0.4);
    crystal.add(m);
  }

  /* two dark arches echoing the render */
  var arches = new THREE.Group(); scene.add(arches);
  var archMat = new THREE.MeshStandardMaterial({ color: 0x4a5558, roughness: 0.4, metalness: 0.75 });
  [-1, 1].forEach(function (side) {
    var arch = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.13, 10, 120, Math.PI * 0.62), archMat);
    arch.rotation.z = side < 0 ? Math.PI * 0.69 : -Math.PI * 0.31;
    arch.rotation.y = side * 0.35; arches.add(arch);
  });

  /* drifting dust */
  var DN = opts.lite ? 120 : 260, dp = new Float32Array(DN * 3);
  for (var j = 0; j < DN; j++) { dp[j * 3] = (rnd() - .5) * 9; dp[j * 3 + 1] = (rnd() - .5) * 6; dp[j * 3 + 2] = (rnd() - .5) * 6 - 1; }
  var dg = new THREE.BufferGeometry(); dg.setAttribute("position", new THREE.BufferAttribute(dp, 3));
  var dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0xb6f06a, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(dust);

  /* interaction: pointer parallax, drag-to-spin with inertia, click impulse, scroll depth */
  var tx = 0, ty = 0, cx = 0, cy = 0, spin = 0, drag = false, moved = 0, lx = 0, sy = 0;
  var running = false, visible = true, last = 0, first = true, raf = 0;
  var rect = null;
  box.addEventListener("pointermove", function (e) {
    var b = rect || (rect = box.getBoundingClientRect());
    tx = ((e.clientX - b.left) / b.width - 0.5) * 2; ty = ((e.clientY - b.top) / b.height - 0.5) * 2;
    if (drag) { var dx = e.clientX - lx; lx = e.clientX; moved += Math.abs(dx); spin = dx * 0.06; }
  });
  box.addEventListener("pointerdown", function (e) { drag = true; moved = 0; lx = e.clientX; });
  addEventListener("pointerup", function () { if (drag && moved < 5) spin = 7; drag = false; });
  box.addEventListener("pointerleave", function () { tx = ty = 0; });
  addEventListener("scroll", function () { sy = Math.min(window.scrollY / window.innerHeight, 1.2); rect = null; }, { passive: true });

  function resize() {
    var w = box.clientWidth, h = box.clientHeight; if (!w || !h) return;
    rect = null; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(box); resize();

  function frame(t) {
    raf = 0; if (!running) return;
    var dt = Math.min((t - last) / 1000, 0.05); last = t;
    cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
    spin += (0 - spin) * Math.min(dt * 2.2, 1);
    crystal.rotation.y += dt * (0.22 + spin);
    crystal.rotation.x = cy * 0.35 + sy * 0.5;
    crystal.position.x = cx * 0.25; crystal.position.y = -sy * 0.5 + Math.sin(t / 1400) * 0.06;
    var s = 1 + Math.sin(t / 1100) * 0.012; crystal.scale.setScalar(s);
    arches.rotation.y = cx * 0.2; dust.rotation.y -= dt * 0.03; dust.rotation.x = cy * 0.08;
    camera.position.z = 7 + sy * 1.6; camera.position.x = cx * 0.25; camera.lookAt(0, 0, 0);
    glow.intensity = 26 + Math.sin(t / 900) * 5;
    renderer.render(scene, camera);
    if (first) { first = false; box.classList.add("is-3d"); var c = box.querySelector(".hero-caption"); if (c) c.textContent = "Live 3D — move, drag or click"; }
    raf = requestAnimationFrame(frame);
  }
  function update() {
    var should = visible && !document.hidden;
    if (should && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!should) { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
  }
  new IntersectionObserver(function (es) { visible = es[0].isIntersecting; update(); }).observe(box);
  document.addEventListener("visibilitychange", update);
  canvas.addEventListener("webglcontextlost", function (e) {
    e.preventDefault(); running = false; box.classList.remove("is-3d"); document.documentElement.classList.remove("w3d");
    var c = box.querySelector(".hero-caption"); if (c) c.textContent = "Crystal Monolith — 3D render";
  });
  update();
}
