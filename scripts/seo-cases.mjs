export function runSeoCases(validate, files) {
  let passed = 0;
  function expectFailure(change, label) {
    const copy = {...files}; change(copy);
    if (!validate(copy).errors.length) throw new Error('Audit missed: ' + label);
    passed++;
  }
  if (validate(files).errors.length) throw new Error('Baseline failed');
  passed++;
  expectFailure(f => { delete f['services/tile-installation.html']; }, 'missing page');
  expectFailure(f => { f['index.html'] += '<a href="/#not-a-real-id">Broken</a>'; }, 'missing anchor');
  expectFailure(f => { f['contact.html'] = f['contact.html'].replace(/<title>[^<]+<\/title>/, f['index.html'].match(/<title>[^<]+<\/title>/)[0]); }, 'duplicate title');
  expectFailure(f => { f['sitemap.xml'] = f['sitemap.xml'].replace('<urlset ', '<url><loc>https://chivvflooring.com/</loc></url><urlset '); }, 'duplicate sitemap entry');
  expectFailure(f => { f['services/tile-installation.html'] = f['services/tile-installation.html'].replace('"@type":"Service"', '"@type":"Thing"'); }, 'missing service schema');
  expectFailure(f => { f['areas/buckhead.html'] = f['areas/buckhead.html'].replace('"@type":"BreadcrumbList"', '"@type":"Thing"'); }, 'missing breadcrumb schema');
  expectFailure(f => { f['index.html'] = f['index.html'].replace('rel="canonical" href="https://chivvflooring.com/"', 'rel="canonical" href="https://example.com/"'); }, 'wrong canonical');
  expectFailure(f => { f['404.html'] = f['404.html'].replace('href="/contact.html"', 'href="contact.html"'); }, 'nested 404 reference');
  expectFailure(f => { f['contact.html'] = f['contact.html'].replace('type="file"', 'type="file" multiple'); }, 'multiple Netlify uploads');
  expectFailure(f => { f['index.html'] = f['index.html'].replace('"@context":', '"@context"'); }, 'malformed schema');
  return {passed};
}
