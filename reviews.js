document.querySelectorAll('.review-carousel').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.review-slide')];
  const position = carousel.querySelector('.review-position');
  if (!slides.length) return;
  const perGroup = 6;
  const groups = Math.ceil(slides.length / perGroup);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer;
  const show = index => {
    current = (index + groups) % groups;
    const start = current * perGroup;
    slides.forEach((slide, i) => { slide.hidden = ((i - start + slides.length) % slides.length) >= Math.min(perGroup, slides.length); });
    position.textContent = `Group ${current + 1} of ${groups}`;
  };
  const stop = () => { clearInterval(timer); timer = undefined; };
  const play = () => { if (groups > 1 && !timer && !reducedMotion.matches && !document.hidden) timer = setInterval(() => show(current + 1), 5000); };
  carousel.querySelector('.review-prev').addEventListener('click', () => show(current - 1));
  carousel.querySelector('.review-next').addEventListener('click', () => show(current + 1));
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) play(); });
  carousel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') stop(); });
  carousel.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse' && !carousel.contains(document.activeElement)) play(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else if (!carousel.contains(document.activeElement) && !carousel.matches(':hover')) play(); });
  show(0);
  if (groups === 1) carousel.querySelector('.review-controls').hidden = true;
  else play();
});
