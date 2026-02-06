// ═══════════════════ MOBILE MENU TOGGLE ═══════════════════
(function() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggle) return;

  function toggleMenu() {
    const isActive = toggle.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';

    // Update ARIA attributes
    toggle.setAttribute('aria-expanded', isActive);
    toggle.setAttribute('aria-label', isActive ? 'Menü schließen' : 'Menü öffnen');
  }

  function closeMenu() {
    if (toggle.classList.contains('active')) {
      toggleMenu();
    }
  }

  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking links
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Close menu on window resize to desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    }, 250);
  });
})();
