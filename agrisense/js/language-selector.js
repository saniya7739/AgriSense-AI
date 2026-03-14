// Language Selector Component Handler
class LanguageSelector {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentLang = LanguageConfig.getCurrentLanguage();
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Language selector container not found');
            return;
        }

        // Load the language selector HTML
        this.loadSelectorHTML();

        // Listen for language change events
        document.addEventListener('languageChanged', (e) => {
            this.updateActiveButton(e.detail.language);
        });
    }

    async loadSelectorHTML() {
        try {
            const response = await fetch('language-selector-new.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            this.container.innerHTML = html;

            // Initialize buttons after loading
            this.initializeButtons();
        } catch (error) {
            console.error('Failed to load language selector:', error);
            // Fallback to basic selector
            this.createFallbackSelector();
        }
    }

    initializeButtons() {
        const buttons = this.container.querySelectorAll('.lang-pill');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                if (lang) {
                    LanguageConfig.setLanguage(lang);
                }
            });
        });

        // Set initial active state
        this.updateActiveButton(this.currentLang);
    }

    updateActiveButton(lang) {
        const buttons = this.container.querySelectorAll('.lang-pill');
        buttons.forEach(button => {
            if (button.dataset.lang === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    createFallbackSelector() {
        // Simple fallback if HTML loading fails
        this.container.innerHTML = `
            <div class="language-selector-container">
                <div class="language-selector">
                    <button class="lang-pill active" data-lang="hi">हिन्दी</button>
                    <button class="lang-pill" data-lang="en">English</button>
                    <button class="lang-pill" data-lang="bh">भोजपुरी</button>
                    <button class="lang-pill" data-lang="mr">मराठी</button>
                    <button class="lang-pill" data-lang="pa">ਪੰਜਾਬੀ</button>
                </div>
            </div>
        `;
        this.initializeButtons();
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language selector if container exists
    if (document.getElementById('language-selector-container')) {
        new LanguageSelector('language-selector-container');
    }
});