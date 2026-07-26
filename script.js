document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const profilePic = document.querySelector('.profile-pic');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const banner = document.getElementById('intro-banner');
  const logoContainer = document.querySelector('.logo-container');
  const currentYear = document.getElementById('current-year');

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  if (darkModeToggle) {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    document.body.classList.toggle('dark-mode', darkModeEnabled);
    darkModeToggle.textContent = darkModeEnabled ? 'Light Mode' : 'Dark Mode';

    darkModeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
      darkModeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    });
  }

  if (profilePic) {
    const toggleProfilePhoto = () => {
      const enlarged = profilePic.classList.toggle('enlarged');
      profilePic.setAttribute('aria-label', enlarged ? 'Restore profile photo size' : 'Enlarge profile photo');
    };
    profilePic.addEventListener('click', toggleProfilePhoto);
    profilePic.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleProfilePhoto();
      }
    });
  }

  if (navToggle && navMenu) {
    const setMenuOpen = (open) => {
      navMenu.classList.toggle('show', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    };

    navToggle.addEventListener('click', () => {
      setMenuOpen(!navMenu.classList.contains('show'));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  const updateHeaderOnScroll = () => {
    const scrolled = window.scrollY > 10;
    if (banner) banner.classList.toggle('hidden', scrolled);
    if (logoContainer) logoContainer.classList.toggle('hide-on-scroll', window.scrollY > 50);
  };

  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
});
