const leadForm = document.querySelector('#lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Ждём, пока gtag точно загрузится
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        lead_source: 'contact_form'
      });
      console.log('generate_lead отправлен');
    } else {
      console.warn('gtag не загружен — событие НЕ отправлено');
    }

    document.querySelector('#form-status').textContent =
      'Учебная форма проверена. Данные не отправлены.';
  });
}