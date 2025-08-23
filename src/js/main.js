// src/js/main.js - Arquivo principal JavaScript
/**
 * @file Arquivo principal da aplicação - Cristiano | Bug Hunter
 * @description Coordena todos os módulos e funcionalidades
 * @version 1.0.0
 */

// ==============================================
// IMPORTAÇÕES DE MÓDULOS INTERNOS
// ==============================================

// Importando utilitários (caminho relativo conforme sua estrutura)
import { utils } from './shared/utils.js';
import { AnalyticsService } from './services/analytics.js';
import { ThemeManager } from './services/themeManager.js';

// ==============================================
// CONFIGURAÇÕES GLOBAIS
// ==============================================

const CONFIG = {
    theme: 'dark',
    animations: true,
    debug: false,
    socialLinks: {
        github: 'https://github.com/cristianocode',
        linkedin: 'https://linkedin.com/in/cristiano',
        twitter: 'https://twitter.com/Cristiano_code',
        discord: 'https://discord.com/users/seu_id',
        email: 'mailto:seu.email@exemplo.com'
    },
    paths: {
        images: '/src/assets/images/',
        fonts: '/src/assets/fonts/'
    }
};

// ==============================================
// MÓDULO PRINCIPAL DA APLICAÇÃO
// ==============================================

const App = {
    /**
     * Inicializa a aplicação
     */
    async init() {
        console.log('🐞 Bug Hunter - Inicializando aplicação...');
        
        try {
            // Inicializar serviços
            await this.initServices();
            
            // Inicializar componentes
            this.initTheme();
            this.initAnimations();
            this.initEventListeners();
            this.initSocialLinks();
            this.initScrollEffects();
            
            // Monitoramento
            this.initPerformanceMonitoring();
            
            console.log('✅ Aplicação inicializada com sucesso!');
            
            // Disparar evento de inicialização completa
            window.dispatchEvent(new CustomEvent('appInitialized'));
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.handleInitError(error);
        }
    },

    // ==============================================
    // INICIALIZAÇÃO DE SERVIÇOS
    // ==============================================

    async initServices() {
        // Inicializar Analytics (se configurado)
        if (typeof AnalyticsService !== 'undefined') {
            AnalyticsService.init();
        }

        // Carregar fonts customizadas
        await this.loadCustomFonts();
    },

    async loadCustomFonts() {
        // Exemplo: Carregar fontes personalizadas
        try {
            const font = new FontFace('CustomFont', 'url(/src/assets/fonts/custom-font.woff2)');
            await font.load();
            document.fonts.add(font);
            document.documentElement.style.setProperty('--font-primary', 'CustomFont');
        } catch (error) {
            console.warn('⚠️ Não foi possível carregar fontes customizadas:', error);
        }
    },

    // ==============================================
    // GERENCIAMENTO DE TEMA
    // ==============================================

    initTheme() {
        const themeManager = new ThemeManager();
        themeManager.init();
        
        // Expor themeManager globalmente se necessário
        window.themeManager = themeManager;
    },

    // ==============================================
    // ANIMAÇÕES E EFEITOS VISUAIS
    // ==============================================

    initAnimations() {
        if (!CONFIG.animations) return;
        
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTypewriterEffect();
        this.setupLazyLoading();
    },

    setupScrollAnimations() {
        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    },

    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('[data-hover]');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('hover-active');
            });
            
            el.addEventListener('mouseleave', () => {
                el.classList.remove('hover-active');
            });
        });
    },

    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            
            const type = () => {
                let i = 0;
                const typeNext = () => {
                    if (i < text.length) {
                        el.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeNext, 100);
                    }
                };
                typeNext();
            };

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    type();
                    observer.unobserve(el);
                }
            });
            
            observer.observe(el);
        });
    },

    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    },

    // ==============================================
    // EVENT LISTENERS E INTERAÇÕES
    // ==============================================

    initEventListeners() {
        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Copiar email para clipboard
        const emailBtn = document.querySelector('[data-copy-email]');
        if (emailBtn) {
            emailBtn.addEventListener('click', () => {
                this.copyToClipboard('seu.email@exemplo.com', 'E-mail copiado!');
            });
        }

        // Prevenir comportamento padrão de forms
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => e.preventDefault());
        });

        // Resize debounced
        window.addEventListener('resize', utils.debounce(() => {
            this.handleResize();
        }, 250));
    },

    handleResize() {
        // Atualizar layouts responsivos
        document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
    },

    // ==============================================
    // LINKS SOCIAIS
    // ==============================================

    initSocialLinks() {
        const socialContainer = document.querySelector('[data-social-links]');
        if (!socialContainer) return;

        Object.entries(CONFIG.socialLinks).forEach(([platform, url]) => {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = `social-link social-${platform}`;
            link.innerHTML = `<i class="fab fa-${platform}"></i>`;
            link.setAttribute('aria-label', `${platform} profile`);
            
            socialContainer.appendChild(link);
        });
    },

    // ==============================================
    // EFEITOS DE SCROLL
    // ==============================================

    initScrollEffects() {
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const header = document.querySelector('header');
            if (!header) return;

            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            
            lastScrollY = window.scrollY;
            
            // Atualizar variável CSS de progresso do scroll
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
        };

        window.addEventListener('scroll', utils.debounce(handleScroll, 100));
    },

    // ==============================================
    // MONITORAMENTO DE PERFORMANCE
    // ==============================================

    initPerformanceMonitoring() {
        // Medir tempo de carregamento
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            if (CONFIG.debug) {
                console.log(`⚡ Página carregada em: ${loadTime.toFixed(2)}ms`);
            }
        });

        // Monitorar erros globais
        window.addEventListener('error', (e) => {
            console.error('❌ Erro global:', e.error);
        });

        // Monitorar promessas não tratadas
        window.addEventListener('unhandledrejection', (e) => {
            console.error('❌ Promise rejeitada:', e.reason);
        });
    },

    // ==============================================
    // MANIPULAÇÃO DE ERROS
    // ==============================================

    handleInitError(error) {
        // Mostrar mensagem de erro amigável
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `
            <p>Oops! Algo deu errado ao carregar a página.</p>
            <small>${CONFIG.debug ? error.message : 'Tente recarregar a página.'}</small>
        `;
        
        document.body.appendChild(errorElement);
    },

    // ==============================================
    // UTILITÁRIOS PÚBLICOS
    // ==============================================

    async copyToClipboard(text, successMessage = 'Copiado!') {
        return utils.copyToClipboard(text, successMessage);
    },

    showNotification(message, duration = 2000) {
        return utils.showNotification(message, duration);
    }
};

// ==============================================
// INICIALIZAÇÃO E EXPORTAÇÃO
// ==============================================

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Exportar para uso em outros módulos
export { App, CONFIG };

// Expor globalmente para debugging (apenas em desenvolvimento)
if (CONFIG.debug) {
    window.App = App;
    window.CONFIG = CONFIG;
}
