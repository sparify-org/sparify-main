// ═══════════════════ NEWSLETTER FORM WITH SUPABASE ═══════════════════
import SUPABASE_CONFIG from './config.js';

// Initialize Supabase client
let supabaseClient = null;

// Wait for DOM and Supabase library to be ready
function initSupabase() {
  if (typeof window.supabase !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    try {
      supabaseClient = window.supabase.createClient(
        SUPABASE_CONFIG.url,
        SUPABASE_CONFIG.anonKey
      );
      console.log('Supabase client initialized successfully');
      return true;
    } catch (e) {
      console.error('Failed to initialize Supabase:', e);
      return false;
    }
  }
  return false;
}

(function () {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const successMsg = document.getElementById('newsletter-success');
  const errorMsg = document.getElementById('newsletter-error');

  if (!form) return;

  // Initialize Supabase when form is found
  initSupabase();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Try to initialize Supabase if not already done
    if (!supabaseClient) {
      initSupabase();
    }

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
      if (supabaseClient) {
        console.log('Attempting to subscribe:', email);

        // Use Supabase to save subscriber
        const { data, error } = await supabaseClient
          .from('subscribers')
          .insert([
            {
              email: email,
              source: 'website',
              metadata: {
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                referrer: document.referrer || 'direct'
              }
            }
          ]);

        console.log('Supabase response:', { data, error });

        if (error) {
          // Handle duplicate email error gracefully
          if (error.code === '23505') {
            if (errorMsg) {
              errorMsg.textContent = 'Diese E-Mail-Adresse ist bereits registriert.';
              errorMsg.classList.add('show');
            }
          } else {
            console.error('Supabase error:', error);
            throw error;
          }
        } else {
          // Success!
          console.log('Subscription successful:', data);
          if (successMsg) {
            successMsg.textContent = '🎉 Willkommen in der Sparify-Community!';
            successMsg.classList.add('show');

            // Add a small pulse animation to the form
            form.style.animation = 'none';
            form.offsetHeight; // trigger reflow
            form.style.animation = 'pulse-soft 1s ease-in-out';
          }

          // Clear input
          if (input) input.value = '';

          // Hide success message after 8 seconds
          setTimeout(() => {
            if (successMsg) successMsg.classList.remove('show');
          }, 8000);
        }
      } else {
        // Supabase not available - show error
        console.error('Supabase client not initialized');
        if (errorMsg) {
          errorMsg.textContent = 'Newsletter-Service vorübergehend nicht verfügbar.';
          errorMsg.classList.add('show');
        }
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
