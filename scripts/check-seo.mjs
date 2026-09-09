import fs from 'node:fs';
import path from 'node:path';
import { validateSite } from './validate-site.mjs';
import { runSeoCases } from './seo-cases.mjs';
const files = {};
function read(dir = '.') {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    if (['.git','node_modules'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) read(full);
    else files[full.replaceAll('\\', '/').replace(/^\.\//, '')] = /\.(?:jpg|webp|png)$/.test(full) ? '' : fs.readFileSync(full, 'utf8');
  }
}
read();
const result = validateSite(files);
console.log(JSON.stringify(result, null, 2));
if (result.errors.length) process.exitCode = 1;
else console.log(runSeoCases(validateSite, files));
