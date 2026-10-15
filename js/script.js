'use strict';


(() => {
  const leadForm = document.querySelector('#lead-form');
  if (!leadForm) return;

  const params = new URLSearchParams(window.location.search);
  const defaults = { utm_source: 'direct', utm_medium: 'none', utm_campaign: 'not_set' };

  for (const [key, fallback] of Object.entries(defaults)) {
    const field = leadForm.elements.namedItem(key);
    if (field) field.value = params.get(key)?.trim() || fallback;
  }

  const requestId = leadForm.elements.namedItem('request_id');

  leadForm.addEventListener('submit', (event) => {
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(leadForm.action)) {
      event.preventDefault();
      document.querySelector('#form-status').textContent = 'Сначала укажите URL опубликованного Apps Script Web App.';
      return;
    }
    if (!requestId.value) requestId.value = 'REQ-' + crypto.randomUUID().toUpperCase();
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { lead_source: 'contact_form' });
    }
    document.querySelector('#form-status').textContent =
      'POST отправляется. Проверьте таблицу по request_id: ' + requestId.value;
  });

  leadForm.addEventListener('reset', () => {
    setTimeout(() => {
      requestId.value = '';
      for (const [key, fallback] of Object.entries(defaults)) {
        const field = leadForm.elements.namedItem(key);
        if (field) field.value = params.get(key)?.trim() || fallback;
      }
      document.querySelector('#form-status').textContent = 'Можно заполнить новую заявку.';
    }, 0);
  });
})();



(function propagateUTM() {
  const button = document.getElementById('lead-link');
  if (!button) return;

  const params = new URLSearchParams(location.search);
  const target = new URL('contacts.html', location.href);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = params.get(key);
    if (value) target.searchParams.set(key, value);
  }
  button.href = target.href;

  button.addEventListener('click', () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', {
        button_name: 'guide_to_form',
        page_section: 'backend_guide',
        transport_type: 'beacon'
      });
    }
  });
})();


const programCta = document.querySelector('#program-cta');
if (programCta) {
  programCta.addEventListener('click', () => {
    const preview = document.querySelector('#program-preview');
    if (preview) preview.hidden = false;
    if (typeof window.gtag === 'function') {
      gtag('event', 'cta_click', { button_name: 'program', page_section: 'hero' });
    }
  });
}