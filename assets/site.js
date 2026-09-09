
document.addEventListener('DOMContentLoaded', function(){
  // Accessible mobile navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.navlinks');
  if(navToggle && navigation){
    function closeNavigation(){
      navigation.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
      navToggle.setAttribute('aria-label','Open navigation');
    }
    navToggle.addEventListener('click', function(){
      const willOpen = !navigation.classList.contains('open');
      navigation.classList.toggle('open', willOpen);
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
    });
    navigation.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', closeNavigation);
    });
    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape' && navigation.classList.contains('open')) {
        closeNavigation();
        navToggle.focus();
      }
    });
  }

  // Process and FAQ content uses native details/summary elements.

  // Preserve the first landing source within this browser tab for up to 30 minutes.
  // Store only campaign fields and paths, never form contents or arbitrary query strings.
  const sourceKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'];
  const sourceStorageKey = 'chivv_lead_source_v1';
  const params = new URLSearchParams(window.location.search);
  const now = Date.now();
  let source = null;
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(sourceStorageKey));
    if(saved && typeof saved === 'object' && typeof saved.captured_at === 'number' &&
       now >= saved.captured_at && now - saved.captured_at < 30 * 60 * 1000) source = saved;
  } catch(error) { /* Lead submission must work when browser storage is unavailable. */ }
  const taggedArrival = sourceKeys.some(function(key){ return Boolean(params.get(key)); });
  if(!source || taggedArrival){
    source = {captured_at:now, landing_page:window.location.origin + window.location.pathname};
    sourceKeys.forEach(function(key){ source[key] = (params.get(key) || '').slice(0,200); });
    try {
      const referrer = new URL(document.referrer);
      source.referrer_host = referrer.origin === window.location.origin ? '' : referrer.hostname;
    } catch(error) { source.referrer_host = ''; }
    try { window.sessionStorage.setItem(sourceStorageKey, JSON.stringify(source)); } catch(error) {}
  }
  const estimateForm = document.querySelector('form[name="estimate-request"]');
  if(estimateForm){
    sourceKeys.concat(['landing_page','referrer_host']).forEach(function(key){
      const field = estimateForm.querySelector('[name="' + key + '"]');
      if(field) field.value = typeof source[key] === 'string' ? source[key].slice(0,500) : '';
    });
    estimateForm.addEventListener('submit', function(event){
      if(event && event.defaultPrevented) return;
      // An attempt is not a delivered lead. Confirm delivery in Netlify before reporting conversions.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'estimate_form_attempt', form_name:'estimate-request'});
    });
  }

  document.querySelectorAll('a[href^="tel:"]').forEach(function(link){
    link.addEventListener('click', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'phone_click', phone_number:'678-571-7028'});
    });
  });
});
