const contact_form = document.querySelector('#contact-form');
if (contact_form) {
  contact_form.addEventListener('submit', (event) => {
    event.preventDefault();
     gtag('event', 'generate_lead', {
    'lead_source': 'contact_form'
});
{
      gtag('event', 'generate_lead', {
        lead_source: 'contact_form'
      });
    }
    document.querySelector('#form-status').textContent =
      'Учебная форма проверена. Данные не отправлены.';
  });
}