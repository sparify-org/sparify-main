// ═══════════════════ NEWSLETTER FORM WITH SUPABASE ═══════════════════
import SUPABASE_CONFIG from './config.js';

// Initialize Supabase client (only if config is properly set)
let supabase = null;

if (typeof window.supabase !== 'undefined' &&
    SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_PROJECT_URL') {
  supabase = window.supabase.createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
  );
}

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

        // Disable button during submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Wird angemeldet...';
        }

        try {
            if (supabase) {
                // Use Supabase to save subscriber
                const { data, error } = await supabase
                    .from('subscribers')
                    .insert([
                        {
                            email: email,
                            source: 'website',
                            metadata: {
                                userAgent: navigator.userAgent,
                                timestamp: new Date().toISOString()
                            }
                        }
                    ])
                    .select();

                if (error) {
                    // Handle duplicate email error gracefully
                    if (error.code === '23505') { // Unique constraint violation
                        if (errorMsg) {
                            errorMsg.textContent = 'Diese E-Mail-Adresse ist bereits registriert.';
                            errorMsg.classList.add('show');
                        }
                    } else {
                        throw error;
                    }
                } else {
                    // Success!
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
                }
            } else {
                // Fallback: Simulate success if Supabase is not configured
                console.warn('Supabase is not configured. Please see SETUP.md for instructions.');

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Show success message
                if (successMsg) {
                    successMsg.textContent = 'Vielen Dank! Sie wurden erfolgreich angemeldet. (Demo-Modus - siehe SETUP.md)';
                    successMsg.classList.add('show');
                }

                // Clear input
                if (input) input.value = '';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (successMsg) successMsg.classList.remove('show');
                }, 5000);
            }

        } catch (error) {
            console.error('Newsletter subscription error:', error);

            // Show error message
            if (errorMsg) {
                errorMsg.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
                errorMsg.classList.add('show');
            }
        } finally {
            // Re-enable button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
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
