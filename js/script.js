'use strict';

// ---- UTM: читаем метки из URL ----
function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source:   params.get('utm_source')   || 'not_set',
    utm_medium:   params.get('utm_medium')   || 'not_set',
    utm_campaign: params.get('utm_campaign') || 'not_set',
    utm_content:  params.get('utm_content')  || 'not_set'
  };
}

// ---- Форма ----
const form = document.querySelector('#contact-form');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const utm = getUTMParams();

    const payload = {
      name:      document.getElementById('visitor-name')?.value || '',
      topic:     document.getElementById('topic')?.value || '',
      direction: 'backend',
      ...utm
    };

    // Отправка на ваш бэкенд / в Google Sheets
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Ошибка отправки');

      document.querySelector('#form-status').textContent =
        'Готово! Заявка отправлена.';
      form.reset();
    } catch (err) {
      console.error(err);
      document.querySelector('#form-status').textContent =
        'Ошибка отправки. Проверьте консоль.';
    }
  });
}