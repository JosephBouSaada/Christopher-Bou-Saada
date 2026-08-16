#!/usr/bin/env node
/**
 * Generates the placeholder specimen meshes used by the site before
 * Christopher's real CAD exports land.
 *
 * These are NOT Christopher's work. They are parametric stand-ins authored so
 * the layout, the loader, and the finish system can be judged at full
 * fidelity. Delete this file and everything in assets/models/ the moment real
 * exports arrive.
 *
 *   node tools/make-specimens.mjs
 *
 * Writes binary STL for every specimen plus one GLB, so both loader paths
 * ship exercised rather than assumed.
 */
import * as THREE from '../vendor/three/three.module.min.js';
import { mergeGeometries } from '../vendor/three/BufferGeometryUtils.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'models');
fs.mkdirSync(OUT, { recursive: true });

/* ---------------------------------------------------------------- helpers */

const TAU = Math.PI * 2;

/** Rounded rectangle centred on the origin. */
function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function circlePath(cx, cy, r) {
  const p = new THREE.Path();
  p.absarc(cx, cy, r, 0, TAU, true);
  return p;
}

/** Adds a bolt circle of holes to a shape. */
function boltCircle(shape, count, pcd, dia, phase = 0) {
  for (let i = 0; i < count; i++) {
    const a = phase + (i / count) * TAU;
    shape.holes.push(circlePath(Math.cos(a) * pcd / 2, Math.sin(a) * pcd / 2, dia / 2));
  }
  return shape;
}

/** Strips a geometry to plain non-indexed position + normal so merges never
 *  trip over mismatched attribute sets between extrudes and lathes. */
function plain(g) {
  const n = g.index ? g.toNonIndexed() : g;
  if (!n.getAttribute('normal')) n.computeVertexNormals();
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', n.getAttribute('position'));
  out.setAttribute('normal', n.getAttribute('normal'));
  return out;
}

function extrude(shape, depth, bevel = 0.4) {
  // A real machined edge break is a single small chamfer, not a fillet.
  // Multi-segment bevels round the part into a soap bar under any smoothing.
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 1,
    curveSegments: 32,
  });
  g.translate(0, 0, -depth / 2);
  return g;
}

/** Solid of revolution from a closed cross-section loop [[radius, axial], ...]. */
function lathe(profile, segments = 72) {
  const pts = profile.map(([r, y]) => new THREE.Vector2(r, y));
  const g = new THREE.LatheGeometry(pts, segments);
  g.computeVertexNormals();
  return g;
}

/* ------------------------------------------------------------ STL writer */

function writeSTL(geometry, file) {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  const pos = g.getAttribute('position');
  const tris = pos.count / 3;
  const buf = Buffer.alloc(84 + tris * 50);
  buf.write('specimen mesh - placeholder geometry'.padEnd(80, ' '), 0, 80, 'ascii');
  buf.writeUInt32LE(tris, 80);

  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const ab = new THREE.Vector3(), ac = new THREE.Vector3(), n = new THREE.Vector3();
  let o = 84;
  for (let i = 0; i < tris; i++) {
    a.fromBufferAttribute(pos, i * 3 + 0);
    b.fromBufferAttribute(pos, i * 3 + 1);
    c.fromBufferAttribute(pos, i * 3 + 2);
    ab.subVectors(b, a); ac.subVectors(c, a); n.crossVectors(ab, ac).normalize();
    buf.writeFloatLE(n.x, o); buf.writeFloatLE(n.y, o + 4); buf.writeFloatLE(n.z, o + 8);
    buf.writeFloatLE(a.x, o + 12); buf.writeFloatLE(a.y, o + 16); buf.writeFloatLE(a.z, o + 20);
    buf.writeFloatLE(b.x, o + 24); buf.writeFloatLE(b.y, o + 28); buf.writeFloatLE(b.z, o + 32);
    buf.writeFloatLE(c.x, o + 36); buf.writeFloatLE(c.y, o + 40); buf.writeFloatLE(c.z, o + 44);
    buf.writeUInt16LE(0, o + 48);
    o += 50;
  }
  fs.writeFileSync(file, buf);
  return tris;
}

/* ------------------------------------------------------------ GLB writer */

function writeGLB(geometry, file, color = [0.72, 0.74, 0.76]) {
  const g = geometry.index ? geometry : geometry.clone();
  if (!g.index) {
    // Build a trivial index so the GLB stays compact and normals survive.
    const count = g.getAttribute('position').count;
    g.setIndex(Array.from({ length: count }, (_, i) => i));
  }
  g.computeBoundingBox();

  const pos = g.getAttribute('position');
  const nor = g.getAttribute('normal');
  const idx = g.getIndex();

  const posBytes = Buffer.from(pos.array.buffer, pos.array.byteOffset, pos.array.byteLength);
  const norBytes = Buffer.from(nor.array.buffer, nor.array.byteOffset, nor.array.byteLength);
  const indices = new Uint32Array(idx.array);
  const idxBytes = Buffer.from(indices.buffer);

  const pad4 = (n) => (4 - (n % 4)) % 4;
  const parts = [];
  let offset = 0;
  const view = (bytes, target) => {
    const padding = pad4(offset);
    if (padding) { parts.push(Buffer.alloc(padding)); offset += padding; }
    const v = { buffer: 0, byteOffset: offset, byteLength: bytes.length, target };
    parts.push(bytes); offset += bytes.length;
    return v;
  };
  const vPos = view(posBytes, 34962);
  const vNor = view(norBytes, 34962);
  const vIdx = view(idxBytes, 34963);

  const bin = Buffer.concat(parts);
  const bb = g.boundingBox;

  const json = {
    asset: { version: '2.0', generator: 'make-specimens.mjs (placeholder geometry)' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material: 0 }] }],
    materials: [{
      pbrMetallicRoughness: {
        baseColorFactor: [...color, 1],
        metallicFactor: 0.9,
        roughnessFactor: 0.35,
      },
      doubleSided: false,
    }],
    accessors: [
      { bufferView: 0, componentType: 5126, count: pos.count, type: 'VEC3',
        min: [bb.min.x, bb.min.y, bb.min.z], max: [bb.max.x, bb.max.y, bb.max.z] },
      { bufferView: 1, componentType: 5126, count: nor.count, type: 'VEC3' },
      { bufferView: 2, componentType: 5125, count: indices.length, type: 'SCALAR' },
    ],
    bufferViews: [vPos, vNor, vIdx],
    buffers: [{ byteLength: bin.length }],
  };

  let jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
  if (pad4(jsonBuf.length)) jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(pad4(jsonBuf.length), 0x20)]);
  const binBuf = pad4(bin.length) ? Buffer.concat([bin, Buffer.alloc(pad4(bin.length))]) : bin;

  const header = Buffer.alloc(12);
  header.write('glTF', 0, 4, 'ascii');
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonBuf.length + 8 + binBuf.length, 8);

  const jsonChunk = Buffer.alloc(8);
  jsonChunk.writeUInt32LE(jsonBuf.length, 0);
  jsonChunk.write('JSON', 4, 4, 'ascii');

  const binChunk = Buffer.alloc(8);
  binChunk.writeUInt32LE(binBuf.length, 0);
  binChunk.write('BIN\0', 4, 4, 'ascii');

  fs.writeFileSync(file, Buffer.concat([header, jsonChunk, jsonBuf, binChunk, binBuf]));
}

/* ----------------------------------------------------------- the specimens */

/** MB-0142 — motor mount face plate with a bearing boss. */
function motorMount() {
  const plate = roundedRect(132, 96, 10);
  plate.holes.push(circlePath(0, 0, 26));
  boltCircle(plate, 4, 108, 9, Math.PI / 4);
  plate.holes.push(circlePath(0, 38, 5));
  plate.holes.push(circlePath(0, -38, 5));
  const base = extrude(plate, 12, 0.5);

  const boss = new THREE.Shape();
  boss.absarc(0, 0, 38, 0, TAU, false);
  boss.holes.push(circlePath(0, 0, 26));
  const ring = extrude(boss, 26, 0.5);
  ring.translate(0, 0, 7); // the boss stands proud of one face, flush on the other

  const g = mergeGeometries([base, ring].map(plain), false);
  g.computeVertexNormals();
  g.rotateX(-Math.PI / 2);
  return g;
}

/** PL-0206 — V-belt pulley, turned. */
function vBeltPulley() {
  const g = lathe([
    [9, -13], [30, -13], [30, -9], [46, -9], [49, -6.5], [49, -2.4],
    [40.5, 0], [49, 2.4], [49, 6.5], [46, 9], [30, 9], [30, 13], [9, 13], [9, -13],
  ]);
  // Keyway relief: a shallow slot cut visually by a small merged prism.
  const key = new THREE.BoxGeometry(3.2, 26.5, 4);
  key.translate(0, 0, 9.6);
  const merged = mergeGeometries([g, key].map(plain), false);
  merged.computeVertexNormals();
  return merged;
}

/** PC-0318 — planetary carrier plate. */
function planetCarrier() {
  const disc = new THREE.Shape();
  disc.absarc(0, 0, 55, 0, TAU, false);
  disc.holes.push(circlePath(0, 0, 15));
  boltCircle(disc, 3, 70, 12);
  boltCircle(disc, 6, 96, 6.5, Math.PI / 6);
  const plate = extrude(disc, 14, 0.5);

  const bosses = [];
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * TAU;
    const b = new THREE.Shape();
    b.absarc(0, 0, 11, 0, TAU, false);
    b.holes.push(circlePath(0, 0, 6));
    const bg = extrude(b, 24, 0.4);
    bg.translate(Math.cos(a) * 35, Math.sin(a) * 35, 5);
    bosses.push(bg);
  }
  const g = mergeGeometries([plate, ...bosses].map(plain), false);
  g.computeVertexNormals();
  g.rotateX(-Math.PI / 2);
  return g;
}

/** MN-0421 — hydraulic manifold block. */
function manifoldBlock() {
  const face = roundedRect(96, 64, 6);
  face.holes.push(circlePath(-26, 14, 7));
  face.holes.push(circlePath(26, 14, 7));
  face.holes.push(circlePath(-26, -14, 7));
  face.holes.push(circlePath(26, -14, 7));
  face.holes.push(circlePath(0, 0, 10));
  [[-40, 24], [40, 24], [-40, -24], [40, -24]].forEach(([x, y]) =>
    face.holes.push(circlePath(x, y, 3.4)));
  const g = extrude(face, 42, 0.6);
  g.computeVertexNormals();
  return g;
}

/** SH-0537 — flanged spindle housing. */
function spindleHousing() {
  const body = lathe([
    [18, -34], [34, -34], [34, 20], [30, 26], [26, 30], [18, 30], [18, -34],
  ]);
  const flange = new THREE.Shape();
  flange.absarc(0, 0, 62, 0, TAU, false);
  flange.holes.push(circlePath(0, 0, 34));
  boltCircle(flange, 6, 108, 9);
  const fg = extrude(flange, 12, 0.5);
  fg.rotateX(-Math.PI / 2);
  fg.translate(0, -28, 0);
  const g = mergeGeometries([body, fg].map(plain), false);
  g.computeVertexNormals();
  return g;
}

/** TL-0663 — formed sheet-metal chassis rail. */
function chassisRail() {
  const t = 2.5, w = 46, h = 30, r = 4;
  const s = new THREE.Shape();
  s.moveTo(-w / 2, h);
  s.lineTo(-w / 2, r);
  s.quadraticCurveTo(-w / 2, 0, -w / 2 + r, 0);
  s.lineTo(w / 2 - r, 0);
  s.quadraticCurveTo(w / 2, 0, w / 2, r);
  s.lineTo(w / 2, h);
  s.lineTo(w / 2 - t, h);
  s.lineTo(w / 2 - t, r);
  s.quadraticCurveTo(w / 2 - t, t, w / 2 - t - r, t);
  s.lineTo(-w / 2 + t + r, t);
  s.quadraticCurveTo(-w / 2 + t, t, -w / 2 + t, r);
  s.lineTo(-w / 2 + t, h);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 168, bevelEnabled: false, curveSegments: 16 });
  g.translate(0, -h / 2, -84);
  g.computeVertexNormals();
  return g;
}

/* ---------------------------------------------------------------- emit */

const specimens = [
  ['mb-0142-motor-mount', motorMount()],
  ['pl-0206-v-belt-pulley', vBeltPulley()],
  ['pc-0318-planet-carrier', planetCarrier()],
  ['mn-0421-manifold-block', manifoldBlock()],
  ['sh-0537-spindle-housing', spindleHousing()],
  ['tl-0663-chassis-rail', chassisRail()],
];

for (const [name, geo] of specimens) {
  const file = path.join(OUT, `${name}.stl`);
  const tris = writeSTL(geo, file);
  console.log(`${name}.stl  ${tris} triangles  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
}

// One specimen also ships as GLB so the glTF path is exercised, not assumed.
const glbSource = specimens.find(([n]) => n.startsWith('pl-0206'))[1];
writeGLB(glbSource, path.join(OUT, 'pl-0206-v-belt-pulley.glb'), [0.79, 0.62, 0.24]);
console.log(`pl-0206-v-belt-pulley.glb  ${(fs.statSync(path.join(OUT, 'pl-0206-v-belt-pulley.glb')).size / 1024).toFixed(0)} KB`);
