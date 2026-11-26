document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const themeToggle = document.getElementById('dark-mode-toggle');
  const currentYear = document.getElementById('current-year');
  const profileButton = document.getElementById('profile-photo-button');
  const profilePic = document.querySelector('.profile-pic');
  const identityPanel = document.querySelector('.identity-panel');
  const allNavLinks = [...document.querySelectorAll('#nav-menu a')];
  const navLinks = allNavLinks.filter(link => link.getAttribute('href')?.startsWith('#'));
  const sections = [...document.querySelectorAll('main section[id]')];

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const setMenuOpen = (open) => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle('show', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };

  navToggle?.addEventListener('click', () => setMenuOpen(!navMenu.classList.contains('show')));
  allNavLinks.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));

  const groups = [...document.querySelectorAll('.nav-group details')];
  groups.forEach(group => group.addEventListener('toggle', () => {
    if (group.open) groups.forEach(other => { if (other !== group) other.open = false; });
  }));
  document.addEventListener('click', event => {
    groups.forEach(group => { if (!group.contains(event.target)) group.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const open = groups.find(group => group.open);
      groups.forEach(group => { group.open = false; });
      if (open) open.querySelector('summary')?.focus();
      else if (navMenu?.classList.contains('show')) { setMenuOpen(false); navToggle?.focus(); }
    }
  });
  allNavLinks.forEach(link => link.addEventListener('click', () => groups.forEach(group => { group.open = false; })));

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('darkMode'); } catch {}
  document.body.classList.toggle('dark-mode', savedTheme === 'enabled');
  themeToggle?.setAttribute('aria-pressed', String(savedTheme === 'enabled'));
  themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    try { localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled'); } catch {}
    themeToggle.setAttribute('aria-pressed', String(isDark));
  });

  const toggleProfilePhoto = () => {
    if (!profileButton || !profilePic) return;
    const enlarged = profilePic.classList.toggle('enlarged');
    profileButton.setAttribute('aria-expanded', String(enlarged));
    profileButton.setAttribute('aria-label', enlarged ? 'Restore profile photo size' : 'Enlarge profile photo');
  };

  profileButton?.addEventListener('click', toggleProfilePhoto);

  const updateScrollState = () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
    identityPanel?.classList.toggle('hide-on-scroll', window.scrollY > 50);
    let current = 'home';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 160) current = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
});
