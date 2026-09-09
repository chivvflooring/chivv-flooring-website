import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = process.cwd();
const out = path.join(root, 'review-results');
await mkdir(out, {recursive:true});
const mime = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp', '.jpg':'image/jpeg', '.xml':'application/xml', '.txt':'text/plain'};
const server = createServer(async (req,res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  try {
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type':mime[path.extname(file)] || 'application/octet-stream'}).end(data);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html'}).end(await readFile(path.join(root,'404.html')));
  }
});
await new Promise(resolve => server.listen(4173,'127.0.0.1',resolve));
const origin = 'http://127.0.0.1:4173';
const pages = (await readdir(root)).filter(p=>p.endsWith('.html'));
for (const dir of ['services','areas']) for (const p of await readdir(path.join(root,dir))) if(p.endsWith('.html')) pages.push(dir+'/'+p);
const browser = await chromium.launch();
const results = [];
try {
  for (const width of [390,1440]) {
    const context = await browser.newContext({viewport:{width,height:900}});
    const page = await context.newPage();
    for (const route of pages) {
      const errors = [];
      const handler = err => errors.push(err.message);
      page.on('pageerror', handler);
      const response = await page.goto(origin+'/'+route);
      assert.equal(response.status(),200,route+' HTTP');
      await page.locator('h1').waitFor({state:'visible'});
      assert.equal(await page.locator('h1').count(),1,route+' H1');
      await page.evaluate(()=>document.fonts.ready);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1), route+' horizontal overflow at '+width);
      const broken = await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete && i.naturalWidth===0).map(i=>i.src));
      assert.deepEqual(broken,[],route+' images');
      assert.deepEqual(errors,[],route+' JavaScript');
      assert(await page.locator('a[href="tel:+16785717028"]').count()>0,route+' phone');
      await page.screenshot({path:path.join(out,width+'-'+route.replaceAll('/','-')+'.png'),fullPage:true});
      results.push({route,width,passed:true});
      page.off('pageerror',handler);
    }
    if (width===390) {
      await page.goto(origin+'/');
      const toggle=page.locator('.nav-toggle');
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'),'true');
      await page.keyboard.press('Escape');
      assert.equal(await toggle.getAttribute('aria-expanded'),'false');
      assert(await toggle.evaluate(el=>el===document.activeElement));
    }
    await page.goto(origin+'/services/shower-remodeling.html?utm_source=review&utm_campaign=qa');
    await page.locator('.hero-actions a.btn').first().click();
    assert.equal(await page.locator('[name="service"]').inputValue(),'Shower Remodeling');
    assert.equal(await page.locator('[name="utm_source"]').inputValue(),'review');
    await page.goto(origin+'/areas/buckhead.html');
    await page.locator('.hero-actions a.btn').first().click();
    assert.equal(await page.locator('[name="city"]').inputValue(),'Buckhead, Atlanta');
    await page.locator('[name="name"]').fill('LOCAL REVIEW TEST');
    await page.locator('[name="phone"]').fill('678-571-7028');
    await page.locator('[name="service"]').selectOption({label:'Tile Installation'});
    await page.locator('[name="contact-preference"]').selectOption({label:'Email (please enter your email above)'});
    assert(await page.locator('[name="email"]').evaluate(el=>el.required));
    assert.equal(await page.locator('form').evaluate(form=>form.checkValidity()),false);
    await page.locator('[name="email"]').fill('review@example.com');
    assert.equal(await page.locator('form').evaluate(form=>form.checkValidity()),true);
    // Inspect native multipart submission locally. Never send a lead to an external host.
    let submission = '';
    await page.route('**/thank-you.html', async route => {
      if(route.request().method()==='POST') {
        submission = route.request().postData() || '';
        await route.fulfill({status:200,contentType:'text/html',body:'<h1>Local form test only</h1>'});
      } else await route.continue();
    });
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/thank-you.html');
    assert(submission.includes('estimate-request') && submission.includes('Tile Installation'),'native form payload');
    const missing = await page.goto(origin+'/areas/not-a-real-page');
    assert.equal(missing.status(),404);
    await page.locator('h1').waitFor({state:'visible'});
    assert.equal(await page.locator('link[rel="stylesheet"]').getAttribute('href'),'/assets/styles.css?v=20260909b');
    await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  const page=await nojs.newPage();
  await page.goto(origin+'/');
  assert(await page.locator('#primary-navigation').isVisible(),'no-JS mobile navigation');
  await page.locator('details summary').first().click();
  assert(await page.locator('details').first().evaluate(el=>el.open),'no-JS FAQ');
  await nojs.close();
  await writeFile(path.join(out,'results.json'),JSON.stringify({status:'passed',pageRenders:results,scope:'Local HTTP review only; not Netlify delivery, redirects or production.'},null,2));
  console.log('PASS: '+results.length+' desktop/mobile page renders, navigation, attribution, native local form, 404 and no-JS checks.');
} catch(error) {
  await writeFile(path.join(out,'results.json'),JSON.stringify({status:'failed',pageRenders:results,error:String(error)},null,2));
  throw error;
} finally {
  await browser.close();
  server.close();
}
