const dropdowns = [...document.querySelectorAll('.nav-dropdown')];
const hoverNav = window.matchMedia('(hover: hover) and (pointer: fine)');
dropdowns.forEach(dropdown => {
  const group = dropdown.closest('.nav-group');
  dropdown.addEventListener('toggle', () => {
    if (dropdown.open) dropdowns.filter(other => other !== dropdown).forEach(other => { other.open = false; });
  });
  group.addEventListener('pointerenter', () => { if (hoverNav.matches) dropdown.open = true; });
  group.addEventListener('pointerleave', () => { if (hoverNav.matches) dropdown.open = false; });
  dropdown.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dropdown.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
  });
  group.querySelector(':scope > a').addEventListener('click', () => {
    dropdown.open = false;
    document.querySelector('#nav').classList.remove('open');
    document.querySelector('.menu').setAttribute('aria-expanded', 'false');
  });
});
document.addEventListener('click', event => {
  dropdowns.forEach(dropdown => { if (!dropdown.closest('.nav-group').contains(event.target)) dropdown.open = false; });
});

const floatingCall = document.querySelector('.mobile-call-float');
if (floatingCall) {
  const mobileCall = window.matchMedia('(max-width: 700px)');
  const updateFloatingCall = () => { floatingCall.hidden = !(mobileCall.matches && window.scrollY > 300); };
  window.addEventListener('scroll', updateFloatingCall, {passive: true});
  mobileCall.addEventListener('change', updateFloatingCall);
  updateFloatingCall();
}
