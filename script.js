document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const themeToggle = document.getElementById('dark-mode-toggle');
  const currentYear = document.getElementById('current-year');
  const navLinks = [...document.querySelectorAll('#nav-menu a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const setMenuOpen = (open) => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle('show', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };

  navToggle?.addEventListener('click', () => setMenuOpen(!navMenu.classList.contains('show')));
  navLinks.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));

  const savedTheme = localStorage.getItem('darkMode');
  document.body.classList.toggle('dark-mode', savedTheme === 'enabled');
  themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });

  const updateScrollState = () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
    let current = 'home';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 160) current = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
});
