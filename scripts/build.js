#!/usr/bin/env node
/*
 * Builds the single-file websites index.html (Khmer) and index-en.html (English)
 * from the source in src/.
 *
 *   src/index.html     Khmer page content (text, SVG figures, TeX equations)
 *   src/index.en.html  English page content (same structure, English text)
 *   src/i18n/js.en.json  English versions of the text used by the widgets
 *   src/styles.css  page styles
 *   src/app.js      interactive widgets
 *
 * What the build does:
 *   1. Inlines styles.css and app.js into the page.
 *   2. Typesets every equation with KaTeX ahead of time, so the site needs
 *      no JavaScript math library and equations appear instantly:
 *        \( ... \)  inline math        \[ ... \]  display math
 *        \ce{...}   chemical equations (mhchem)
 *        <tx x="" y="" [w=""] [h=""] [id=""] [cls=""]>TeX</tx>
 *                   a math label placed inside an SVG figure
 *   3. Embeds the KaTeX stylesheet and fonts, so math works offline.
 *
 * Usage:  npm install   then   npm run build
 */
const fs = require('fs');
const path = require('path');
const katex = require('katex');
require('katex/contrib/mhchem');

const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

function build(srcFile, outFile, jsDict) {
let html = read(srcFile);
const opts = { throwOnError: true, strict: 'ignore', trust: true };
let count = 0, errors = 0;

function tex(source, displayMode) {
  count++;
  try {
    return katex.renderToString(source, { ...opts, displayMode });
  } catch (e) {
    errors++;
    console.error('TeX error in: ' + source.trim() + '\n  ' + e.message);
    return source;
  }
}

// 1. SVG math labels
html = html.replace(/<tx([^>]*)>([\s\S]*?)<\/tx>/g, (m, attrs, t) => {
  const get = (k) => { const r = attrs.match(new RegExp('\\b' + k + '="([^"]*)"')); return r ? r[1] : null; };
  const x = +get('x'), y = +get('y'), w = +(get('w') || 40), h = +(get('h') || 30);
  const id = get('id'), cls = get('cls');
  return `<foreignObject ${id ? `id="${id}" ` : ''}x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" style="overflow:visible">` +
    `<div xmlns="http://www.w3.org/1999/xhtml" class="fo${cls ? ' ' + cls : ''}">${tex(t, false)}</div></foreignObject>`;
});

// 2. display and inline math (skipping <script> blocks)
html = html.split(/(<script>[\s\S]*?<\/script>)/).map((part) => part.startsWith('<script>') ? part : part
  .replace(/\\\[([\s\S]*?)\\\]/g, (m, t) => tex(t, true))
  .replace(/\\\(([\s\S]*?)\\\)/g, (m, t) => tex(t, false))).join('');

// 3. KaTeX CSS with fonts embedded as data URIs
const kdir = path.dirname(require.resolve('katex/dist/katex.min.css'));
let kcss = fs.readFileSync(path.join(kdir, 'katex.min.css'), 'utf8');
kcss = kcss.replace(/src:url\(fonts\/([^)]+)\.woff2\) format\("woff2"\)[^;}]*/g, (m, f) =>
  `src:url(data:font/woff2;base64,${fs.readFileSync(path.join(kdir, 'fonts', f + '.woff2')).toString('base64')}) format("woff2")`);

html = html
  .replace('/*KATEXCSS*/', () => kcss)
  .replace('/*STYLES*/', () => read('src/styles.css'))
  .replace('/*SCRIPT*/', () => translateJs(read('src/app.js'), jsDict))
  .replace(/\/\*ELINFO:([^*]+)\*\//g, (m, f) => read(f.trim()));

fs.writeFileSync(path.join(root, outFile), html);
console.log(`Built ${outFile}: ${count} equations, ${Math.round(html.length / 1024)} KB` + (errors ? `, ${errors} errors` : ''));
if (errors) process.exitCode = 1;
count = 0; errors = 0;
}

/* Replace Khmer string literals in app.js with their English versions (src/i18n/js.en.json). */
function translateJs(js, dict) {
  if (!dict) return js;
  Object.keys(dict).sort((a, b) => b.length - a.length).forEach((k) => {
    js = js.split(JSON.stringify(k)).join(JSON.stringify(dict[k]));
  });
  return js;
}

build('src/index.html', 'index.html', null);
build('src/index.en.html', 'index-en.html', JSON.parse(read('src/i18n/js.en.json')));
