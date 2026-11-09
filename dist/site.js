const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));document.querySelector('nav').classList.toggle('open',!open)});const form=document.querySelector('#project-form');if(form){const service=new URLSearchParams(location.search).get('service');if([...form.service.options].some(o=>o.value===service))form.service.value=service;form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);document.querySelector('#summary').value=`Concrete project for RG Contracting Services\nName: ${data.get('name')}\nLocation: ${data.get('location')}\nService: ${form.service.selectedOptions[0].text}\nProject: ${data.get('details')}`;document.querySelector('#result').hidden=false;document.querySelector('#status').textContent='Your summary is ready. No inquiry has been sent.';});document.querySelector('#copy').addEventListener('click',async()=>{const s=document.querySelector('#summary');try{await navigator.clipboard.writeText(s.value);document.querySelector('#status').textContent='Copied. Save these details for your conversation with Ricardo.'}catch{s.focus();s.select();document.querySelector('#status').textContent='Select and copy the summary above.'}})}
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
