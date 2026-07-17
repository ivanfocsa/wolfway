/**
 * Client-side form validation utility.
 * Validates required fields, email format, and phone format.
 * Submits form data to the /api/send server route in the background.
 */
export function validateForm(
  form: HTMLFormElement,
  successId: string,
  errorId: string
): void {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const successEl = document.getElementById(successId);
    const errorEl = document.getElementById(errorId);
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    // Reset states
    successEl?.classList.add('hidden');
    errorEl?.classList.add('hidden');
    form.querySelectorAll('.form-error').forEach((el) => el.classList.add('hidden'));
    form.querySelectorAll('.border-red-500').forEach((el) => {
      el.classList.remove('border-red-500');
    });

    let isValid = true;

    // Validate required fields
    const requiredInputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      '[required]'
    );

    requiredInputs.forEach((input) => {
      // Handle radio buttons
      if (input instanceof HTMLInputElement && input.type === 'radio') {
        const name = input.name;
        const checked = form.querySelector<HTMLInputElement>(
          `input[name="${name}"]:checked`
        );
        if (!checked) {
          isValid = false;
          const fieldset = input.closest('fieldset');
          const error = fieldset?.querySelector('.form-error');
          error?.classList.remove('hidden');
        }
        return;
      }

      const value = input.value.trim();

      if (!value) {
        isValid = false;
        input.classList.add('border-red-500');
        const error = input.parentElement?.querySelector('.form-error');
        error?.classList.remove('hidden');
        return;
      }

      // Email validation
      if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          input.classList.add('border-red-500');
          const error = input.parentElement?.querySelector('.form-error');
          error?.classList.remove('hidden');
        }
      }

      // Phone validation
      if (input.type === 'tel' && value) {
        const phoneRegex = /^[+]?[\d\s().-]{7,}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          input.classList.add('border-red-500');
          const error = input.parentElement?.querySelector('.form-error');
          error?.classList.remove('hidden');
        }
      }
    });

    if (isValid) {
      // 1. Show loading state on submit button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = `
          <span class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        `;
      }

      try {
        // 2. Compile form payload
        const formData = new FormData(form);

        // 3. Post data to Resend API endpoint
        const response = await fetch('/api/send', {
          method: 'POST',
          body: formData,
        });

        const result = (await response.json()) as { success: boolean; error?: string };

        if (response.ok && result.success) {
          // Success
          successEl?.classList.remove('hidden');
          form.reset();
          successEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          // Server returned error (e.g. missing API key)
          console.error('Submission failed:', result.error);
          if (errorEl) {
            const textEl = errorEl.querySelector('p');
            if (textEl) {
              textEl.innerText = result.error || 'Server error. Please try again later.';
            }
            errorEl.classList.remove('hidden');
          }
        }
      } catch (err) {
        console.error('Network error during form submission:', err);
        if (errorEl) {
          const textEl = errorEl.querySelector('p');
          if (textEl) {
            textEl.innerText = 'Network error. Please check your connection and try again.';
          }
          errorEl.classList.remove('hidden');
        }
      } finally {
        // 4. Restore original button content
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    } else {
      errorEl?.classList.remove('hidden');
      // Focus first invalid field
      const firstError = form.querySelector('.border-red-500') as HTMLElement | null;
      firstError?.focus();
    }
  });

  // Clear error on input
  form.addEventListener('input', (e) => {
    const target = e.target as HTMLElement;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement
    ) {
      target.classList.remove('border-red-500');
      const error = target.parentElement?.querySelector('.form-error');
      error?.classList.add('hidden');
    }
  });
}
