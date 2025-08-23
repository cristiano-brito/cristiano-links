/**
 * SERVIÇO: Gerenciador de Tema
 * Responsabilidade: Controlar tema claro/escuro e preferências do usuário
 */

// ⚙️ CONFIGURAÇÃO - Alterar cores se desejar paleta diferente
const THEME_CONFIG = {
    colors: {
        dark: {
            primary: '#0a0a0a',
            secondary: '#00ff88', // 🟢 Verde - Cor do "Bug Hunter"
            accent: '#ff6b35',    // 🟠 Laranja - Cor de destaque
            text: '#f0f0f0'
        },
        light: {
            primary: '#ffffff',
            secondary: '#007a5a', // 🟢 Verde mais escuro para light mode
            accent: '#e64a19',    // 🟠 Laranja mais escuro
            text: '#333333'
        }
    }
};

export class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
    }

    init() {
        this.loadSavedTheme();
        this.initThemeToggle();
        console.log('🎨 ThemeManager inicializado');
    }

    loadSavedTheme() {
        // 📝 ALTERAR: Se quiser tema padrão diferente, mude 'dark' para 'light'
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        this.applyThemeColors(theme);
        this.updateThemeIcon();
    }

    applyThemeColors(theme) {
        const colors = THEME_CONFIG.colors[theme];
        Object.entries(colors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--color-${key}`, value);
        });
    }

    initThemeToggle() {
        const themeBtn = document.querySelector('[data-theme-toggle]');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const icon = document.querySelector('[data-theme-icon]');
        if (icon) {
            icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}