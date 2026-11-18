// Run before CSS to restore the saved theme without a flash of the wrong palette.
(() => {
  const storageKey = 'titos-theme';
  const root = document.documentElement;
  let theme = 'dark';

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') theme = savedTheme;
  } catch {
    // Theme switching remains available when browser storage is blocked.
  }

  function applyTheme(value) {
    theme = value === 'light' ? 'light' : 'dark';
    root.dataset.theme = theme;
    const isLight = theme === 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLight ? '#f8f6f2' : '#0f1115');
    const toggle = document.querySelector('#theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-checked', String(isLight));
      toggle.title = `Switch to ${isLight ? 'dark' : 'light'} theme`;
    }
  }

  applyTheme(theme);

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(theme);
    document.querySelector('#theme-toggle')?.addEventListener('click', () => {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The current selection still works for this visit without persistence.
      }
    });
  });

  // Keep the choice consistent between tabs, including storage being cleared.
  window.addEventListener('storage', (event) => {
    if (event.key === storageKey || event.key === null) {
      let isLocalStorage = false;
      try { isLocalStorage = event.storageArea === localStorage; } catch { /* Storage unavailable. */ }
      if (isLocalStorage) applyTheme(event.newValue);
    }
  });
})();