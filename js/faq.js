// ═══════════════════ FAQ ACCORDION ═══════════════════
(function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (!question) return;

    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });

    // Keyboard accessibility
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // Close FAQ when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.faq-item')) {
      faqItems.forEach(item => item.classList.remove('active'));
    }
  });
})();
