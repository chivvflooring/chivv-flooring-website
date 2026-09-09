export function runEstimateCases(api) {
  let passed = 0;
  function check(value, message) { if (!value) throw new Error(message); passed++; }
  check(api.selectedValue(api.services, 'tile-installation') === 'Tile Installation', 'service selection');
  check(api.selectedValue(api.cities, 'buckhead') === 'Buckhead, Atlanta', 'Buckhead selection');
  check(api.selectedValue(api.services, '__proto__') === '', 'prototype query rejected');
  check(api.selectedValue(api.cities, '<script>') === '', 'unknown city ignored');
  check(api.emailRequired('Email (please enter your email above)'), 'email preference requires email');
  check(!api.emailRequired('Phone call') && !api.emailRequired(''), 'other preferences do not require email');
  check(api.photoError([]) === '', 'photo optional');
  check(api.photoError([{type:'image/jpeg', size:5000000}]) === '', '5MB accepted');
  check(api.photoError([{type:'image/png', size:50}]) === '', 'PNG accepted');
  check(api.photoError([{type:'image/webp', size:50}]) === '', 'WebP accepted');
  check(!!api.photoError([{type:'image/jpeg', size:5000001}]), 'oversized file rejected');
  check(!!api.photoError([{type:'text/html', size:20}]), 'unsupported file rejected');
  check(!!api.photoError([{type:'image/jpeg', size:20}, {type:'image/jpeg', size:20}]), 'multiple files rejected');
  function form(serviceValue = '', cityValue = '') {
    const fields = {}, handlers = {};
    for (const name of ['service','city','email','contact-preference','project-photos']) {
      fields[name] = {value:'', files:[], required:false, message:'', handlers:{},
        addEventListener(event, fn){ this.handlers[event] = fn; },
        setCustomValidity(message){ this.message = message; }};
    }
    fields.service.value = serviceValue; fields.city.value = cityValue;
    const feedback = {textContent:''};
    return {fields, handlers, feedback, reports:0,
      querySelector(selector){ return selector === '#form-feedback' ? feedback : fields[selector.match(/name="([^"]+)"/)[1]]; },
      addEventListener(event, fn, capture){ handlers[event] = fn; handlers.capture = capture; },
      checkValidity(){ return !(fields.email.required && !fields.email.value) && !fields['project-photos'].message; },
      reportValidity(){ this.reports++; }
    };
  }
  const f = form();
  api.init(f, {get(key){ return {service:'shower-remodeling', city:'sandy-springs'}[key]; }});
  check(f.fields.service.value === 'Shower Remodeling' && f.fields.city.value === 'Sandy Springs', 'intent carried into form');
  check(f.handlers.capture === true, 'validation precedes attempt tracking');
  f.fields['contact-preference'].value = 'Email (please enter your email above)';
  f.fields['contact-preference'].handlers.change();
  check(f.fields.email.required, 'email required on change');
  let blocked = false;
  f.handlers.submit({preventDefault(){blocked = true;}});
  check(blocked && f.reports === 1, 'missing preferred email blocks native submission');
  f.fields.email.value = 'person@example.com';
  blocked = false;
  f.handlers.submit({preventDefault(){blocked = true;}});
  check(!blocked, 'valid form retains native submission');
  f.fields['contact-preference'].value = 'Phone call';
  f.fields['contact-preference'].handlers.change();
  check(!f.fields.email.required, 'email no longer required after preference changes');
  f.fields['project-photos'].files = [{type:'image/png',size:6000000}];
  f.fields['project-photos'].handlers.change();
  check(!!f.feedback.textContent && !!f.fields['project-photos'].message, 'file error is visible and invalid');
  f.fields['project-photos'].files = [];
  f.fields['project-photos'].handlers.change();
  check(!f.feedback.textContent && !f.fields['project-photos'].message, 'removing photo clears error');
  const restored = form('Hardwood Installation', 'A city outside the suggestions');
  api.init(restored, {get(){return 'tile-installation';}});
  check(restored.fields.service.value === 'Hardwood Installation' && restored.fields.city.value === 'A city outside the suggestions', 'restored values preserved');
  const unknown = form();
  api.init(unknown, {get(){return 'constructor';}});
  check(unknown.fields.service.value === '' && unknown.fields.city.value === '', 'unrecognized queries remain blank');
  return {passed};
}
