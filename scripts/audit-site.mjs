import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ignoredDirectories = new Set(['.git', 'node_modules']);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const errors = [];
const warnings = [];
const canonicalUrls = new Set();

for (const file of htmlFiles) {
  const relative = path.relative(root, file);
  const html = fs.readFileSync(file, 'utf8');
  const isUtilityPage = relative === '404.html' || relative === 'thank-you.html';
  const count = (pattern) => (html.match(pattern) || []).length;

  if (count(/<title>[^<]+<\/title>/gi) !== 1) errors.push(`${relative}: expected one title`);
  if (count(/<meta name="description" content="[^"]+">/gi) !== 1) errors.push(`${relative}: expected one meta description`);
  if (count(/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/gi) !== 1) errors.push(`${relative}: expected one h1`);
  if (!html.includes('678-571-7028') || !html.includes('tel:+16785717028')) errors.push(`${relative}: missing required phone CTA`);
  if (html.includes('https://www.chivvflooring.com')) errors.push(`${relative}: found forbidden www canonical hostname`);
  if (!isUtilityPage) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/i)?.[1];
    if (!canonical) errors.push(`${relative}: missing canonical URL`);
    else if (canonicalUrls.has(canonical)) errors.push(`${relative}: duplicate canonical ${canonical}`);
    else canonicalUrls.add(canonical);
  } else if (!html.includes('name="robots" content="noindex,follow"')) {
    errors.push(`${relative}: utility page must be noindex,follow`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|tel:|mailto:|#)/.test(target)) continue;
    const cleanTarget = target.split('#')[0].split('?')[0];
    if (!cleanTarget) continue;
    const resolved = cleanTarget.startsWith('/')
      ? path.join(root, cleanTarget)
      : path.resolve(path.dirname(file), cleanTarget);
    if (!fs.existsSync(resolved)) errors.push(`${relative}: broken local reference ${target}`);
  }

  for (const image of html.matchAll(/<img\s[^>]*>/gi)) {
    if (!/\salt="[^"]*"/i.test(image[0])) errors.push(`${relative}: image missing alt text`);
    if (!/\swidth="\d+"/i.test(image[0]) || !/\sheight="\d+"/i.test(image[0])) {
      warnings.push(`${relative}: image missing intrinsic dimensions`);
    }
  }
}

for (const required of ['index.html', 'robots.txt', 'sitemap.xml', '_headers']) {
  if (!fs.existsSync(path.join(root, required))) errors.push(`missing required file: ${required}`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
if (sitemap.includes('https://www.chivvflooring.com')) errors.push('sitemap.xml: found forbidden www hostname');
for (const canonical of canonicalUrls) {
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) errors.push(`sitemap.xml: missing ${canonical}`);
}

console.log(`Audited ${htmlFiles.length} HTML pages.`);
warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
errors.forEach((error) => console.error(`ERROR: ${error}`));
if (errors.length) process.exit(1);
console.log(`PASS: ${canonicalUrls.size} indexable canonical URLs, local links, metadata, phone CTAs, and sitemap entries verified.`);
