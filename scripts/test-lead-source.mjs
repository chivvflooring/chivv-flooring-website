import fs from 'node:fs';
import vm from 'node:vm';
const code = fs.readFileSync(new URL('../assets/site.js', import.meta.url), 'utf8');

function check(value, message){ if(!value) throw new Error(message); }
function visit(run, storage, href, referrer, hasForm, blocked, confirmation){
  const fields = {};
  const handlers = {};
  const form = {
    querySelector: function(selector){ const name = selector.match(/name="([^"]+)"/)[1]; return fields[name] || (fields[name] = {value:''}); },
    addEventListener: function(event, fn){ handlers[event] = fn; }
  };
  const window = {
    location: new URL(href),
    sessionStorage: {
      getItem: function(key){ if(blocked) throw new Error('disabled'); return storage[key] || null; },
      setItem: function(key, value){ if(blocked) throw new Error('disabled'); storage[key] = value; },
      removeItem: function(key){ if(blocked) throw new Error('disabled'); delete storage[key]; }
    }
  };
  const document = {
    referrer:referrer,
    body:{dataset:confirmation ? {page:'lead-confirmation'} : {}},
    addEventListener: function(event, fn){ if(event === 'DOMContentLoaded') fn(); },
    querySelector: function(selector){ return hasForm && selector === 'form[name="estimate-request"]' ? form : null; },
    querySelectorAll: function(){ return []; }
  };
  run(document, window);
  return {fields:fields, handlers:handlers, window:window};
}
function suite(run){
  const storage = {};
  visit(run, storage, 'https://chivvflooring.com/services/refinishing.html?utm_source=instagram&utm_medium=social&utm_campaign=floor_refresh&email=private', 'https://instagram.com/', false);
  const contact = visit(run, storage, 'https://chivvflooring.com/contact.html', 'https://chivvflooring.com/services/refinishing.html', true);
  check(contact.fields.utm_source.value === 'instagram', 'Source must survive internal navigation');
  check(contact.fields.landing_page.value === 'https://chivvflooring.com/services/refinishing.html', 'Landing page must remain original and exclude query');
  check(contact.fields.referrer_host.value === 'instagram.com', 'External referrer must survive');
  check(!JSON.stringify(storage).includes('private'), 'Arbitrary query must not be stored');
  contact.handlers.submit();
  check(contact.window.dataLayer[0].event === 'estimate_form_attempt', 'Submission attempt must not claim delivery');
  const confirmation = visit(run, storage, 'https://chivvflooring.com/thank-you.html', 'https://chivvflooring.com/contact.html', false, false, true);
  check(confirmation.window.dataLayer[0].event === 'generate_lead', 'Confirmation must report a delivered lead');
  const refresh = visit(run, storage, 'https://chivvflooring.com/thank-you.html', '', false, false, true);
  check(!refresh.window.dataLayer, 'Confirmation refresh must not duplicate a lead');
  const facebook = visit(run, storage, 'https://chivvflooring.com/contact.html?utm_source=facebook&utm_medium=social', '', true);
  check(facebook.fields.utm_source.value === 'facebook' && facebook.fields.utm_campaign.value === '', 'New campaign must replace old campaign without mixing');
  const blocked = visit(run, {}, 'https://chivvflooring.com/contact.html?utm_source=instagram', '', true, true);
  check(blocked.fields.utm_source.value === 'instagram', 'Blocked storage must not break form');
  const broken = visit(run, {chivv_lead_source_v1:'not json'}, 'https://chivvflooring.com/contact.html', '', true);
  check(broken.fields.utm_source.value === '', 'Malformed storage must recover');
  const stale = {chivv_lead_source_v1:JSON.stringify({captured_at:Date.now()-1800001,utm_source:'old'})};
  const expired = visit(run, stale, 'https://chivvflooring.com/contact.html', '', true);
  check(expired.fields.utm_source.value === '', 'Expired source must not be reused');
  const direct = visit(run, {}, 'https://chivvflooring.com/contact.html', '', true);
  check(direct.fields.utm_source.value === '' && direct.fields.referrer_host.value === '', 'Direct traffic must not be invented');
}

suite(function(document, window){ vm.runInNewContext(code, {document, window, URL, URLSearchParams, Date}); });
console.log('Lead attribution checks passed.');
