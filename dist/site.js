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

const dropdowns = [...document.querySelectorAll('.nav-dropdown')];
const hoverNav = window.matchMedia('(hover: hover) and (pointer: fine)');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('toggle', () => {
    if (dropdown.open) dropdowns.filter(other => other !== dropdown).forEach(other => { other.open = false; });
  });
  dropdown.addEventListener('pointerenter', () => { if (hoverNav.matches) dropdown.open = true; });
  dropdown.addEventListener('pointerleave', () => { if (hoverNav.matches) dropdown.open = false; });
  dropdown.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dropdown.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
  });
});
document.addEventListener('click', event => {
  dropdowns.forEach(dropdown => { if (!dropdown.contains(event.target)) dropdown.open = false; });
});

document.querySelectorAll('.driveway-gallery').forEach(gallery => {
  const thumbnails = [...gallery.querySelectorAll('.gallery-thumb')];
  const dialog = gallery.querySelector('.gallery-dialog');
  const image = dialog.querySelector('.gallery-full-image');
  const count = dialog.querySelector('.gallery-count');
  const caption = dialog.querySelector('.gallery-caption');
  let current = 0;
  let trigger;
  const show = index => {
    current = (index + thumbnails.length) % thumbnails.length;
    const original = thumbnails[current].querySelector('img');
    image.src = original.src;
    image.alt = original.alt;
    count.textContent = `${current + 1} / ${thumbnails.length}`;
    caption.textContent = original.alt;
  };
  thumbnails.forEach((thumb, index) => thumb.addEventListener('click', () => {
    trigger = thumb; show(index); dialog.showModal(); dialog.querySelector('.gallery-close').focus();
  }));
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { if (trigger) trigger.focus(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
});
document.querySelectorAll('.review-carousel').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.review-slide')];
  const position = carousel.querySelector('.review-position');
  const pause = carousel.querySelector('.review-pause');
  if (!slides.length) return;
  let current = 0, timer;
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    position.textContent = `${current + 1} / ${slides.length}`;
  };
  const stop = () => { clearInterval(timer); timer = undefined; pause.textContent = 'Play'; };
  const play = () => { if (slides.length > 1 && !timer) { timer = setInterval(() => show(current + 1), 5000); pause.textContent = 'Pause'; } };
  carousel.querySelector('.review-prev').addEventListener('click', () => { stop(); show(current - 1); });
  carousel.querySelector('.review-next').addEventListener('click', () => { stop(); show(current + 1); });
  pause.addEventListener('click', () => { if (timer) stop(); else play(); });
  carousel.addEventListener('focusin', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  show(0);
  if (slides.length === 1) carousel.querySelector('.review-controls').hidden = true;
  else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();
  else pause.textContent = 'Play';
});
