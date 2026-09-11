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
  if (!html.includes('sms:+16785717028')) errors.push(`${relative}: missing required text CTA`);
  if (relative === 'index.html' || relative.startsWith('services/') || relative.startsWith('areas/')) {
    const heroActions = html.match(/<div class="hero-actions">([\s\S]*?)<\/div>/i)?.[1] || '';
    if (!heroActions.includes('contact.html') || !heroActions.includes('tel:+16785717028') || !heroActions.includes('sms:+16785717028')) {
      errors.push(`${relative}: hero must offer Estimate, Call, and Text actions`);
    }
  }
  if (html.includes('https://www.chivvflooring.com')) errors.push(`${relative}: found forbidden www canonical hostname`);
  if (!isUtilityPage) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/i)?.[1];
    const expectedPath = relative === 'index.html' ? '/' : `/${relative}`;
    const expectedCanonical = `https://chivvflooring.com${expectedPath}`;
    if (!canonical) errors.push(`${relative}: missing canonical URL`);
    else if (canonical !== expectedCanonical) errors.push(`${relative}: canonical must be ${expectedCanonical}`);
    else if (canonicalUrls.has(canonical)) errors.push(`${relative}: duplicate canonical ${canonical}`);
    else {
      canonicalUrls.add(canonical);
    }
  } else if (!html.includes('name="robots" content="noindex,follow"')) {
    errors.push(`${relative}: utility page must be noindex,follow`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|tel:|sms:|mailto:|#)/.test(target)) continue;
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

  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(script[1]);
      const serialized = JSON.stringify(data);
      if (!serialized.includes('https://chivvflooring.com/#business') && !isUtilityPage) {
        errors.push(`${relative}: structured data does not reference the canonical business entity`);
      }
      if (/"(?:streetAddress|postalCode)"/.test(serialized)) errors.push(`${relative}: unverified street address in structured data`);
    } catch (error) {
      errors.push(`${relative}: invalid JSON-LD (${error.message})`);
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
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const url of sitemapUrls) {
  if (!canonicalUrls.has(url)) errors.push(`sitemap.xml: non-canonical or non-indexable URL ${url}`);
}
if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap.xml: duplicate URL');
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (!robots.includes('User-agent: *') || !robots.includes('Allow: /') || !robots.includes('Sitemap: https://chivvflooring.com/sitemap.xml')) {
  errors.push('robots.txt: expected crawl and sitemap directives');
}

const contact = fs.readFileSync(path.join(root, 'contact.html'), 'utf8');
if (!/<form[^>]+name="estimate-request"[^>]+method="POST"[^>]+action="\/thank-you\.html"[^>]+enctype="multipart\/form-data"[^>]+data-netlify="true"[^>]+netlify-honeypot="bot-field"/i.test(contact)) {
  errors.push('contact.html: Netlify form configuration or thank-you action is incomplete');
}
for (const field of ['name','phone','email','city','service','square-feet','timeline','project','project-photos','landing_page','page_context','referrer_host','utm_source','utm_medium','utm_campaign']) {
  if (!contact.includes(`name="${field}"`)) errors.push(`contact.html: missing estimate field ${field}`);
}
const trackingScript = fs.readFileSync(path.join(root, 'assets/site.js'), 'utf8');
for (const eventName of ['phone_click','text_click','estimate_cta_click','estimate_form_attempt','generate_lead']) {
  if (!trackingScript.includes(`event:'${eventName}'`)) errors.push(`assets/site.js: missing event ${eventName}`);
}
for (const contextName of ['landing_page','page_context','referrer_host','utm_source','utm_medium','utm_campaign']) {
  if (!trackingScript.includes(contextName)) errors.push(`assets/site.js: missing attribution context ${contextName}`);
}

console.log(`Audited ${htmlFiles.length} HTML pages.`);
warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
errors.forEach((error) => console.error(`ERROR: ${error}`));
if (errors.length) process.exit(1);
console.log(`PASS: ${canonicalUrls.size} indexable canonical URLs, local links, metadata, JSON-LD, CTAs, Netlify form configuration, robots, and exact sitemap coverage verified.`);
