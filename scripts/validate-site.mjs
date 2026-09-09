// Pure source checks; the CLI supplies repository files. No network or writes.
export function validateSite(files) {
  const errors = [], warnings = [];
  const pages = Object.keys(files).filter(p => p.endsWith('.html'));
  const titles = new Set(), descriptions = new Set(), canonicals = new Set();
  const locs = [...(files['sitemap.xml'] || '').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  function fail(p, message) { errors.push(p + ': ' + message); }
  function resolve(p, target) {
    const parts = target.startsWith('/') ? [] : p.split('/').slice(0,-1);
    for (const part of target.split('/')) {
      if (part === '..') parts.pop();
      else if (part && part !== '.') parts.push(part);
    }
    return parts.join('/') || 'index.html';
  }
  for (const p of pages) {
    const html = files[p], utility = p === '404.html' || p === 'thank-you.html';
    for (const [label, regex, seen] of [
      ['title', /<title>([^<]+)<\/title>/g, titles],
      ['description', /<meta name="description" content="([^"]+)"/g, descriptions]
    ]) {
      const matches = [...html.matchAll(regex)];
      if (matches.length !== 1) fail(p, 'expected one ' + label);
      else if (seen.has(matches[0][1])) fail(p, 'duplicate ' + label);
      else seen.add(matches[0][1]);
    }
    if ((html.match(/<h1(?:\s[^>]*)?>/g) || []).length !== 1) fail(p, 'expected one H1');
    if (!html.includes('tel:+16785717028')) fail(p, 'missing phone link');
    if (!html.includes('name="viewport"')) fail(p, 'missing viewport');
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    if (new Set(ids).size !== ids.length) fail(p, 'duplicate element IDs');
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    if (utility) {
      if (!html.includes('name="robots" content="noindex,follow"')) fail(p, 'utility page must be noindex');
    } else {
      const expected = 'https://chivvflooring.com/' + (p === 'index.html' ? '' : p);
      if (canonical !== expected) fail(p, 'unexpected canonical');
      if (canonicals.has(canonical)) fail(p, 'duplicate canonical');
      canonicals.add(canonical);
      if (!locs.includes(canonical)) fail(p, 'missing from sitemap');
      if (/name="robots"[^>]*noindex/.test(html)) fail(p, 'indexable page blocked');
    }
    for (const match of html.matchAll(/(?:href|src|action)="([^"]+)"/g)) {
      const target = match[1].replaceAll('&amp;', '&');
      if (/^(?:https?:|tel:|mailto:)/.test(target)) continue;
      const [beforeHash, hash] = target.split('#');
      const path = beforeHash.split('?')[0];
      const dest = path ? resolve(p, path) : p;
      if (!(dest in files)) fail(p, 'missing reference ' + target);
      else if (hash && !files[dest].includes('id="' + hash + '"')) fail(p, 'missing fragment ' + target);
      if (p === '404.html' && !target.startsWith('/') && !target.startsWith('#')) fail(p, '404 reference is relative');
    }
    for (const match of html.matchAll(/<img\s[^>]*>/g)) {
      if (!/\salt="[^"]*"/.test(match[0])) fail(p, 'image missing alt');
      if (!/width="\d+"/.test(match[0]) || !/height="\d+"/.test(match[0])) fail(p, 'image missing dimensions');
    }
    let graph = [];
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (!schemas.length) fail(p, 'missing schema');
    for (const match of schemas) {
      try { const data = JSON.parse(match[1]); graph.push(...(data['@graph'] || [data])); }
      catch { fail(p, 'invalid JSON-LD'); }
    }
    if (p.startsWith('services/')) {
      const service = graph.find(x => x['@type'] === 'Service');
      if (!service || service.url !== canonical || service.provider?.['@id'] !== 'https://chivvflooring.com/#business') fail(p, 'invalid Service schema');
    }
    if (!utility && p !== 'index.html') {
      const breadcrumb = graph.find(x => x['@type'] === 'BreadcrumbList');
      if (!breadcrumb || breadcrumb.itemListElement.some((x,i) => x.position !== i+1) || breadcrumb.itemListElement.at(-1).item !== canonical) fail(p, 'invalid breadcrumb');
    }
    if (p.startsWith('areas/')) {
      const text = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] || '').replace(/<[^>]+>/g,' ');
      if (text.trim().split(/\s+/).length < 250) warnings.push(p + ': review short location content');
    }
  }
  if (locs.length !== new Set(locs).size || locs.length !== canonicals.size || locs.some(url => !canonicals.has(url))) errors.push('sitemap.xml: coverage mismatch');
  if (!(files['robots.txt'] || '').includes('Sitemap: https://chivvflooring.com/sitemap.xml')) errors.push('robots.txt: missing sitemap');
  const form = files['contact.html'] || '';
  if (!/name="estimate-request"[^>]*method="POST"/.test(form) || !form.includes('data-netlify="true"') || !form.includes('name="form-name" value="estimate-request"')) errors.push('contact.html: native form configuration');
  if (!form.includes('action="/thank-you.html"')) errors.push('contact.html: success destination');
  if (/<input[^>]*type="file"[^>]*\smultiple/.test(form)) errors.push('contact.html: unsupported multiple files in one Netlify field');
  if (!form.includes('name="bot-field"')) errors.push('contact.html: honeypot missing');
  return {pages:pages.length, indexable:canonicals.size, errors, warnings};
}
