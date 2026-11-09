
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
