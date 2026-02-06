// ═══════════════════ NEWSLETTER FORM ═══════════════════
(function () {
    const form = document.getElementById('newsletter-form');
    const input = document.getElementById('newsletter-email');
    const successMsg = document.getElementById('newsletter-success');
    const errorMsg = document.getElementById('newsletter-error');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Hide previous messages
        if (successMsg) successMsg.classList.remove('show');
        if (errorMsg) errorMsg.classList.remove('show');

        const email = input ? input.value.trim() : '';

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (errorMsg) {
                errorMsg.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
                errorMsg.classList.add('show');
            }
            return;
        }

        // TODO: Replace with actual newsletter service integration
        // For now, just show success message
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Show success message
            if (successMsg) {
                successMsg.textContent = 'Vielen Dank! Sie wurden erfolgreich angemeldet.';
                successMsg.classList.add('show');
            }

            // Clear input
            if (input) input.value = '';

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMsg) successMsg.classList.remove('show');
            }, 5000);

        } catch (error) {
            // Show error message
            if (errorMsg) {
                errorMsg.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
                errorMsg.classList.add('show');
            }
        }
    });

    // Real-time validation feedback
    if (input) {
        input.addEventListener('blur', () => {
            const email = input.value.trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                input.style.borderColor = 'rgb(239, 68, 68)';
            } else {
                input.style.borderColor = '';
            }
        });

        input.addEventListener('input', () => {
            input.style.borderColor = '';
            if (errorMsg) errorMsg.classList.remove('show');
        });
    }
})();

// ═══════════════════ NEWSLETTER SERVICE INTEGRATION GUIDE ═══════════════════
/*
  To integrate with a newsletter service (Mailchimp, ConvertKit, etc.):

  1. Mailchimp Integration:
     - Replace the try block with:
       const response = await fetch('YOUR_MAILCHIMP_ENDPOINT', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email })
       });

  2. ConvertKit Integration:
     - Use ConvertKit's API:
       const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           api_key: 'YOUR_API_KEY',
           email: email
         })
       });

  3. Custom Backend:
     - Send to your own server endpoint:
       const response = await fetch('/api/newsletter/subscribe', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email })
       });
*/
