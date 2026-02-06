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
    document.querySelector('.features'),
    document.querySelector('.team'),
    document.querySelector('.cta-wrap'),
    ...document.querySelectorAll('.feat-card'),
    ...document.querySelectorAll('.member')
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

// ═══════════════════ SAVINGS CALCULATOR ═══════════════════
(function() {
  const slider = document.getElementById('monthly-money');
  const monthlyValue = document.getElementById('monthly-value');
  const yearlySavings = document.getElementById('yearly-savings');
  const savingsBarFill = document.getElementById('savings-bar-fill');

  if (!slider) return;

  const SAVINGS_RATE = 0.20; // 20% savings rate
  const MAX_YEARLY = 500 * 12 * SAVINGS_RATE; // Max possible yearly savings

  function updateCalculator() {
    const monthly = parseInt(slider.value);
    const yearly = Math.round(monthly * 12 * SAVINGS_RATE);
    const percentage = (yearly / MAX_YEARLY) * 100;

    // Update progress for gradient
    const sliderProgress = ((monthly - 10) / (500 - 10)) * 100;
    slider.style.setProperty('--slider-progress', `${sliderProgress}%`);

    // Update values
    monthlyValue.textContent = monthly;
    yearlySavings.textContent = yearly;
    savingsBarFill.style.width = `${percentage}%`;
  }

  slider.addEventListener('input', updateCalculator);
  updateCalculator(); // Initial calculation
})();

// ═══════════════════ MOBILE MENU TOGGLE ═══════════════════
(function() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggle) return;

  function toggleMenu() {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = toggle.classList.contains('active') ? 'hidden' : '';
  }

  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // Close menu when clicking links
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });
})();
