(function () {
  var THEME_STORAGE_KEY = "agrisense-dashboard-theme";

  function resolveTheme() {
    try {
      var savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
    } catch (error) {
      // Ignore localStorage access issues and fall back to system preference.
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(mode) {
    var isDark = mode === "dark";
    document.documentElement.classList.toggle("dark-mode", isDark);
    if (document.body) {
      document.body.classList.toggle("dark-mode", isDark);
    }
  }

  applyTheme(resolveTheme());
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(resolveTheme());
  });

  window.addEventListener("storage", function (event) {
    if (event.key === THEME_STORAGE_KEY) {
      applyTheme(resolveTheme());
    }
  });
})();
