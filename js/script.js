// ═══════════════════ SCROLL HANDLING ═══════════════════
const nav = document.getElementById('nav');
const doc = document.documentElement;

// OPTIMIZED: Scroll handling with throttling
(function(){
  let ticking = false;
  let lastScrollY = 0;

  function update(){
    ticking = false;
    const y = window.scrollY;

    // Only update if scroll changed significantly (throttle micro-updates)
    if (Math.abs(y - lastScrollY) < 1) return;
    lastScrollY = y;

    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const s = Math.min(1, Math.max(0, y / max));
    doc.style.setProperty('--scroll', s.toFixed(4));

    // nav show after 80px
    if (y > 80){
      nav.classList.add('visible');
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('visible');
      nav.classList.remove('scrolled');
    }
  }

  function onScroll(){
    if(!ticking){
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener('scroll', onScroll, { passive:true });

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(update, 100);
  });
})();

// ═══════════════════ MOUSE/TOUCH PARALLAX ═══════════════════
// OPTIMIZED: Mouse/touch parallax with smoothing and throttling
(function(){
  let raf = null;
  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;

  // Smooth interpolation
  function lerp(start, end, factor){
    return start + (end - start) * factor;
  }

  function animate(){
    // Smooth damping
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);

    doc.style.setProperty('--mx', currentX.toFixed(4));
    doc.style.setProperty('--my', currentY.toFixed(4));

    // Continue animation if values haven't settled
    if (Math.abs(currentX - targetX) > 0.001 || Math.abs(currentY - targetY) > 0.001){
      raf = requestAnimationFrame(animate);
    } else {
      raf = null;
    }
  }

  function onMove(e){
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;

    targetX = Math.max(-1, Math.min(1, x));
    targetY = Math.max(-1, Math.min(1, y));

    if(!raf) {
      raf = requestAnimationFrame(animate);
    }
  }

  // Throttle mouse events
  let mouseTicking = false;
  window.addEventListener('mousemove', (e)=>{
    if(!mouseTicking){
      mouseTicking = true;
      requestAnimationFrame(()=>{
        mouseTicking = false;
        onMove(e);
      });
    }
  }, { passive:true });

  // Touch support
  window.addEventListener('touchmove', (e)=>{
    if(!e.touches || !e.touches[0]) return;
    onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
  }, { passive:true });
})();

// ═══════════════════ SCROLL REVEAL ═══════════════════
// OPTIMIZED: Scroll reveal with better performance
(function(){
  const targets = [
    document.querySelector('.problem-section'),
    document.querySelector('.solution-section'),
    document.querySelector('.app-showcase'),
    document.querySelector('.box-showcase'),
    document.querySelector('.calculator-section'),
    document.querySelector('.team-section'),
    ...document.querySelectorAll('.problem-card'),
    ...document.querySelectorAll('.app-feature-card'),
    ...document.querySelectorAll('.box-feature-item'),
    ...document.querySelectorAll('.team-member'),
    ...document.querySelectorAll('.reveal')
  ].filter(Boolean);

  targets.forEach(el => el.classList.add('reveal'));

  // Use IntersectionObserver with optimized options
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        // Use requestAnimationFrame to batch DOM changes
        requestAnimationFrame(()=>{
          e.target.classList.add('in');
        });
        io.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '50px' // Start animation slightly before element enters viewport
  });

  targets.forEach(el => io.observe(el));
})();

// ═══════════════════ DARK MODE ═══════════════════
function initDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');
  const toggle = document.getElementById('theme-toggle');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Initialize
  if (storedTheme) {
    setTheme(storedTheme);
  } else if (prefersDark.matches) {
    setTheme('dark');
  }

  // Toggle handler
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Listen for system preference changes
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// Call on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
  initDarkMode();
}

// ═══════════════════ ACTIVE NAV HIGHLIGHTING ═══════════════════
(function() {
  const sections = ['hero', 'problem', 'solution', 'app', 'box', 'team'];

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100; // Offset for sticky header

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      const navLink = document.querySelector(`a[href="#${sectionId}"]`);

      if (section && navLink) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  // Update on scroll (throttled via requestAnimationFrame)
  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      navTicking = true;
      requestAnimationFrame(() => {
        navTicking = false;
        updateActiveNavLink();
      });
    }
  }, { passive: true });

  // Initial update
  updateActiveNavLink();
})();

// ═══════════════════ SMOOTH SCROLL WITH OFFSET ═══════════════════
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Header height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// ═══════════════════ IMAGE LAZY LOADING FALLBACK ═══════════════════
// For browsers that don't support native lazy loading
(function() {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    return;
  }

  // Fallback: Use IntersectionObserver for lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (lazyImages.length === 0) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
})();
