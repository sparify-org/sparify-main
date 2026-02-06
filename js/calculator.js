// ═══════════════════ SAVINGS CALCULATOR ═══════════════════
(function() {
  const slider = document.getElementById('monthly-money');
  const monthlyValue = document.getElementById('monthly-value');
  const yearlySavings = document.getElementById('yearly-savings');
  const savingsBarFill = document.getElementById('savings-bar-fill');

  if (!slider) return;

  const SAVINGS_RATE = 0.20; // 20% savings rate
  const MAX_YEARLY = 500 * 12 * SAVINGS_RATE; // Max possible yearly savings

  function animateValue(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(start + (end - start) * progress);

      element.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function updateCalculator() {
    const monthly = parseInt(slider.value);
    const yearly = Math.round(monthly * 12 * SAVINGS_RATE);
    const percentage = (yearly / MAX_YEARLY) * 100;

    // Update progress for gradient
    const sliderProgress = ((monthly - 10) / (500 - 10)) * 100;
    slider.style.setProperty('--slider-progress', `${sliderProgress}%`);

    // Update values with animation
    const currentMonthly = parseInt(monthlyValue.textContent) || 0;
    const currentYearly = parseInt(yearlySavings.textContent) || 0;

    animateValue(monthlyValue, currentMonthly, monthly, 300);
    animateValue(yearlySavings, currentYearly, yearly, 500);
    savingsBarFill.style.width = `${percentage}%`;
  }

  slider.addEventListener('input', updateCalculator);
  updateCalculator(); // Initial calculation
})();
