/**
 * Marora Ventures — Main JavaScript
 * Zero-dependency, lightweight, accessible client script.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCategoryFilter();
  initModal();
  initClipboard();
});

/* ==========================================================================
   1. Theme Management (Option C: System Default + Manual Toggle)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('mv-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('mv-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // Listen for OS preference change if user hasn't overridden
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('mv-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    const isDark = theme === 'dark';
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggleBtn.innerHTML = isDark ? `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ` : `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}

/* ==========================================================================
   2. Category Filter Engine
   ========================================================================== */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');

  // Compute live counts
  filterBtns.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    let count = 0;
    if (filter === 'all') {
      count = cards.length;
    } else {
      cards.forEach(card => {
        const categories = (card.getAttribute('data-categories') || '').split(',').map(s => s.trim().toLowerCase());
        if (categories.includes(filter.toLowerCase())) {
          count++;
        }
      });
    }
    const countBadge = btn.querySelector('.filter-count');
    if (countBadge) {
      countBadge.textContent = count;
    }
  });

  // Filter click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter').toLowerCase();

      cards.forEach(card => {
        const categories = (card.getAttribute('data-categories') || '').split(',').map(s => s.trim().toLowerCase());
        const isMatch = filter === 'all' || categories.includes(filter);

        if (isMatch) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   3. Modal Management (AzASIN Waitlist / MVP Early Access)
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('waitlist-modal');
  const openBtns = document.querySelectorAll('.open-waitlist-btn');
  const closeBtn = document.getElementById('modal-close-btn');
  const waitlistForm = document.getElementById('waitlist-form');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    const input = modal.querySelector('input[name="email"]');
    if (input) setTimeout(() => input.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = waitlistForm.querySelector('input[name="email"]');
      const emailVal = emailInput ? emailInput.value.trim() : '';

      if (emailVal) {
        const subject = encodeURIComponent('AzASIN MVP Early Access Request');
        const body = encodeURIComponent(`Hi Manav & Marora Ventures,\n\nI would like early access to AzASIN.\nMy email: ${emailVal}\n\nThanks!`);
        window.location.href = `mailto:maroraventures@gmail.com?subject=${subject}&body=${body}`;
        
        closeModal();
        showToast('Thank you! Opening your email client to confirm access.');
      }
    });
  }
}

/* ==========================================================================
   4. Clipboard & Toast Feedback
   ========================================================================== */
function initClipboard() {
  const copyElements = document.querySelectorAll('[data-copy]');

  copyElements.forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy') || 'maroraventures@gmail.com';
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied ${textToCopy} to clipboard!`);
      } catch (err) {
        window.prompt('Copy email:', textToCopy);
      }
    });
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}
