import fs from 'node:fs';
import vm from 'node:vm';
import { runEstimateCases } from './estimate-cases.mjs';
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../assets/estimate-form.js', import.meta.url), 'utf8'), context);
console.log(runEstimateCases(context.window.ChivvEstimate));
