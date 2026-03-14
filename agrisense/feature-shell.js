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

  function formatDate() {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function normalizeBackLabel(text) {
    return (text || "").replace(/^\s*[←<-]+\s*/, "").trim();
  }

  function normalizeLangLabel(value, text) {
    var labels = {
      hi: "हिन्दी",
      en: "English",
      bh: "भोजपुरी",
      mr: "मराठी",
      pa: "ਪੰਜਾਬੀ"
    };

    return labels[value] || (text || "").replace(/^[^\p{L}\p{N}]+/u, "").trim();
  }

  function createThemeToggle() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "page-theme-toggle";
    button.innerHTML = '<span class="page-icon">🌙</span><span class="page-theme-text">Dark Mode</span>';

    function syncLabel() {
      var isDark = document.body.classList.contains("dark-mode");
      button.querySelector(".page-icon").textContent = isDark ? "☀" : "🌙";
      button.querySelector(".page-theme-text").textContent = isDark ? "Light Mode" : "Dark Mode";
    }

    button.addEventListener("click", function () {
      var nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
      document.documentElement.classList.toggle("dark-mode", nextTheme === "dark");
      document.body.classList.toggle("dark-mode", nextTheme === "dark");
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      syncLabel();
    });

    syncLabel();
    return button;
  }

  function findTitleSource() {
    return document.querySelector("#pageTitle, #heading, #title, .page-content > h1.page-source-hidden, .container h1.page-source-hidden, .container h1:not(.page-title), body > h1.page-source-hidden");
  }

  function findSubtitleSource(titleSource) {
    var explicitSubtitle = document.querySelector("#sub, #subtitle, .page-content > p.page-source-hidden, .container > p.page-source-hidden");
    if (explicitSubtitle) return explicitSubtitle;
    if (!titleSource) return null;

    var sibling = titleSource.nextElementSibling;
    if (sibling && sibling.tagName === "P") {
      return sibling;
    }

    var parentParagraph = titleSource.parentElement ? titleSource.parentElement.querySelector("p") : null;
    return parentParagraph && parentParagraph !== titleSource ? parentParagraph : null;
  }

  function createLangPills(select) {
    if (!select) return null;

    var container = document.createElement("div");
    container.className = "page-lang-pills";

    function setActive(value) {
      Array.prototype.forEach.call(container.querySelectorAll(".page-lang-pill"), function (button) {
        button.classList.toggle("active", button.dataset.lang === value);
      });
    }

    Array.prototype.forEach.call(select.options, function (option) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "page-lang-pill";
      button.dataset.lang = option.value;
      button.textContent = normalizeLangLabel(option.value, option.textContent);
      button.addEventListener("click", function () {
        select.value = option.value;
        if (typeof window.changeLang === "function") {
          window.changeLang();
        } else {
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }

        setActive(option.value);
        window.setTimeout(syncHeaderText, 0);
      });
      container.appendChild(button);
    });

    setActive(select.value || select.options[0].value);
    select.classList.add("page-source-hidden");

    if (select.parentElement && select.parentElement.classList.contains("lang-selector")) {
      select.parentElement.classList.add("page-source-hidden");
    }

    select.addEventListener("change", function () {
      setActive(select.value);
      window.setTimeout(syncHeaderText, 0);
    });

    return container;
  }

  function syncHeaderText() {
    var titleSource = findTitleSource();
    var subtitleSource = findSubtitleSource(titleSource);
    var titleTarget = document.querySelector(".page-title");
    var subtitleTarget = document.querySelector(".page-subtitle");
    var backSource = document.querySelector(".back-btn");
    var backTarget = document.querySelector(".page-back .page-back-text");
    var dateTarget = document.querySelector(".page-date-badge span:last-child");

    if (titleTarget && titleSource) {
      titleTarget.textContent = titleSource.textContent.trim();
    }

    if (subtitleTarget) {
      subtitleTarget.textContent = subtitleSource ? subtitleSource.textContent.trim() : "Use this workspace with the same dashboard controls and layout language.";
    }

    if (backSource && backTarget) {
      backTarget.textContent = normalizeBackLabel(backSource.textContent);
    }

    if (dateTarget) {
      dateTarget.textContent = formatDate();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("feature-shell-body");

    var titleSource = findTitleSource();
    var subtitleSource = findSubtitleSource(titleSource);
    var backSource = document.querySelector(".back-btn");
    var langSelect = document.querySelector("#lang");
    var shell = document.createElement("div");
    shell.className = "page-shell";

    var header = document.createElement("header");
    header.className = "page-shell-header";
    header.innerHTML = [
      '<div class="page-header-main">',
      '  <div class="page-header-left"></div>',
      '  <div class="page-actions"></div>',
      '</div>'
    ].join("");

    var headerLeft = header.querySelector(".page-header-left");
    var actions = header.querySelector(".page-actions");

    if (backSource) {
      var backLink = document.createElement("a");
      backLink.href = backSource.getAttribute("href") || "dashboard.html";
      backLink.className = "page-back";
      backLink.innerHTML = '<span class="page-icon">←</span><span class="page-back-text"></span>';
      headerLeft.appendChild(backLink);
      backSource.classList.add("page-source-hidden");
    }

    var titleBlock = document.createElement("div");
    titleBlock.className = "page-title-block";
    titleBlock.innerHTML = [
      '<div class="page-kicker"><span class="page-icon">🌱</span><span>AgriSense AI</span></div>',
      '<h1 class="page-title"></h1>',
      '<p class="page-subtitle"></p>',
      '<div class="page-date-badge"><span class="page-icon">📅</span><span>' + formatDate() + '</span></div>'
    ].join("");
    headerLeft.appendChild(titleBlock);

    var langPills = createLangPills(langSelect);
    if (langPills) {
      actions.appendChild(langPills);
    }

    // Add dark mode toggle into the top action row so position is consistent
    var themeToggle = createThemeToggle();
    actions.appendChild(themeToggle);

    syncHeaderText();

    var content = document.createElement("main");
    content.className = "page-content";

    var movable = Array.prototype.filter.call(document.body.children, function (element) {
      return element.tagName !== "SCRIPT";
    });

    movable.forEach(function (element) {
      content.appendChild(element);
    });

    shell.appendChild(header);
    shell.appendChild(content);
    document.body.insertBefore(shell, document.body.firstChild);

    if (titleSource) {
      titleSource.classList.add("page-source-hidden");
    }
    if (subtitleSource) {
      subtitleSource.classList.add("page-source-hidden");
    }

    Array.prototype.forEach.call(document.querySelectorAll(".card, .form-container, .ask-section, .question-box, .crop-details, .scheme-card, .bottom-section, .price-box, .result-box, .answer-box, #result"), function (element) {
      element.classList.add("page-card");
    });

    document.documentElement.classList.toggle("dark-mode", resolveTheme() === "dark");
    document.body.classList.toggle("dark-mode", resolveTheme() === "dark");
  });
})();
