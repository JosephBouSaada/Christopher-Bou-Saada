#!/usr/bin/env node
/**
 * Renders the static plate for every specimen through the site's own viewer,
 * so the poster a visitor sees before the mesh arrives is the same object in
 * the same light. Writes WebP with alpha.
 *
 *   node tools/make-posters.mjs
 *
 * Needs a Chromium. Point PW_CHROME at one, or let it find the Playwright
 * cache / Google Chrome.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const SPECIMENS = [
  ['wh-0784-main-wheel.glb', 'violet'],
];

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.stl': 'model/stl', '.glb': 'model/gltf-binary', '.woff2': 'font/woff2',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png',
};

function serve() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(ROOT, url);
    if (url.endsWith('/')) file = path.join(file, 'index.html');
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end('not found'); return;
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}

function chromePath() {
  if (process.env.PW_CHROME) return process.env.PW_CHROME;
  const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  if (fs.existsSync(cache)) {
    const dirs = fs.readdirSync(cache).filter((d) => d.startsWith('chromium-')).sort();
    for (const d of dirs.reverse()) {
      const p = path.join(cache, d, 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');
      if (fs.existsSync(p)) return p;
    }
  }
  return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}

const { chromium } = require(process.env.PW_MODULE ||
  path.join(os.tmpdir(), 'opencode/pw/node_modules/playwright-core'));

const server = await serve();
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({
  executablePath: chromePath(),
  args: ['--use-gl=angle', '--use-angle=metal', '--enable-unsafe-swiftshader'],
});

const out = path.join(ROOT, 'assets', 'renders');
fs.mkdirSync(out, { recursive: true });

const page = await browser.newPage({
  viewport: { width: 960, height: 720 },
  deviceScaleFactor: 2,
});
page.on('pageerror', (e) => console.error('  page error:', e.message));

for (const [model, finish] of SPECIMENS) {
  const url = `${base}/tools/poster.html?model=../assets/models/${model}&finish=${finish}`;
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction('window.__ready === true', null, { timeout: 30000 });

  for (const view of ['iso', 'front', 'top']) {
    const data = await page.evaluate((v) => {
      const rig = window.__v;
      if (!rig) return null;
      if (v !== 'iso') rig._view(v);
      rig._renderNow();
      return document.querySelector('canvas').toDataURL('image/webp', 0.9);
    }, view);
    if (!data) continue;

    const suffix = view === 'iso' ? '' : `-${view}`;
    const name = model.replace(/\.(stl|glb|gltf)$/i, `${suffix}.webp`);
    const file = path.join(out, name);
    fs.writeFileSync(file, Buffer.from(data.split(',')[1], 'base64'));
    console.log(`${name}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB  [${finish}]`);
  }
}

await browser.close();
server.close();
