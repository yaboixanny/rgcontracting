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
  carousel.addEventListener('focusin', event => { if (event.target !== pause && timer) stop(); });
  carousel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' && timer) stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  show(0);
  if (slides.length === 1) carousel.querySelector('.review-controls').hidden = true;
  else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();
  else pause.textContent = 'Play';
});
