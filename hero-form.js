
const heroForm = document.querySelector('#hero-project-form');
if (heroForm) {
  heroForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(heroForm);
    const message = `Hi Ricardo, I'd like to discuss a concrete project.\n\nName: ${data.get('fullName')}\nPhone: ${data.get('phone')}${data.get('email') ? '\nEmail: ' + data.get('email') : ''}\nProject: ${data.get('projectType')}\nLocation: ${data.get('projectLocation')}\nDetails: ${data.get('projectDetails')}`;
    document.querySelector('#hero-summary').value = message;
    document.querySelector('#hero-send').href = `sms:+17723532541?body=${encodeURIComponent(message)}`;
    document.querySelector('#hero-result').hidden = false;
    document.querySelector('#hero-status').textContent = 'Your message is ready. Nothing has been sent.';
    document.querySelector('#hero-summary').focus();
  });
  document.querySelector('#hero-copy').addEventListener('click', async () => {
    const summary = document.querySelector('#hero-summary');
    try {
      await navigator.clipboard.writeText(summary.value);
      document.querySelector('#hero-status').textContent = 'Copied. Paste your message into a text to 772-353-2541.';
    } catch {
      summary.focus(); summary.select();
      document.querySelector('#hero-status').textContent = 'Select and copy the message above.';
    }
  });
}
