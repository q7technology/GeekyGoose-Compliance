(() => {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  if (!btn || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('nav-open', open);
  };

  btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

  // Close on link click (mobile)
  nav.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.tagName === 'A' && nav.classList.contains('open')) setOpen(false);
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
  });
})();
