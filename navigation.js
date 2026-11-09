
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
