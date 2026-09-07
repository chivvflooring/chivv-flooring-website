
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
      if(event.key === 'Escape') closeNavigation();
    });
  }

  // Only one process card open at a time
  document.querySelectorAll('.process').forEach(function(group){
    const cards = group.querySelectorAll('.step');
    cards.forEach(function(card){
      card.setAttribute('tabindex','0');
      card.setAttribute('role','button');
      card.setAttribute('aria-expanded','false');
      function toggle(){
        const willOpen = !card.classList.contains('open');
        cards.forEach(function(c){c.classList.remove('open'); c.setAttribute('aria-expanded','false');});
        if(willOpen){card.classList.add('open'); card.setAttribute('aria-expanded','true');}
      }
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item){
    const q=item.querySelector('.faq-q');
    if(!q) return;
    q.setAttribute('tabindex','0');
    q.setAttribute('role','button');
    q.setAttribute('aria-expanded','false');
    function toggle(){
      const isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(isOpen));
    }
    q.addEventListener('click',toggle);
    q.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
  });

  // Capture lead-source context in Netlify submissions without requiring analytics.
  const estimateForm = document.querySelector('form[name="estimate-request"]');
  if(estimateForm){
    const params = new URLSearchParams(window.location.search);
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].forEach(function(key){
      const field = estimateForm.querySelector('[name="' + key + '"]');
      if(field && params.get(key)) field.value = params.get(key);
    });
    const landingField = estimateForm.querySelector('[name="landing_page"]');
    if(landingField) landingField.value = window.location.href;
    estimateForm.addEventListener('submit', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'estimate_form_submit', form_name:'estimate-request'});
    });
  }

  document.querySelectorAll('a[href^="tel:"]').forEach(function(link){
    link.addEventListener('click', function(){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'phone_click', phone_number:'678-571-7028'});
    });
  });
});
