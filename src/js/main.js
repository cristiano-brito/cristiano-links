/**
 * ARQUIVO PRINCIPAL: Ponto de entrada da aplicação
 * JavaScript puro sem modules
 */

// 📝 ALTERAR: Seus dados pessoais aqui
const USER_CONFIG = {
    email: 'andrade.digital@zohomail.com',
    socialLinks: {
        github: {
            url: 'https://github.com/cristiano-brito',
            icon: 'fab fa-github',
            label: 'GitHub'
        },
        linkedin: {
            url: 'https://www.linkedin.com/in/cristiano-de-andrade-507598198/', 
            icon: 'fab fa-linkedin',
            label: 'LinkedIn'
        },
        email: {
            url: 'mailto:andrade.digital@zohomail.com',
            icon: 'fas fa-envelope',
            label: 'Email'
        }
    }
};

// 🎯 FRASES PARA ROTAÇÃO DO FOOTER (coloque NO INÍCIO do arquivo)
const FOOTER_PHRASES = [
    "Compilado com ♥ e debugado com ☕",
    "Caçando bugs desde 2018",
    "Build: Stable | Bugs: 0 | Café: ∞", 
    "De Salvador para o mundo do código",
    "Transformando café em commits",
    "Code > Coffee > Repeat",
    "On-duty: 24/7 | Bugs hunted: ∞",
    "Powered by coffee and curiosity",
    "Eliminando bugs, criando soluções",
    "Lines of code: ∞ | Cups of coffee: ∞"
];

// 🎨 Theme Manager
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
    }

    init() {
        this.loadSavedTheme();
        this.initThemeToggle();
        console.log('🎨 ThemeManager inicializado');
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
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

// 🔗 Social Links
class SocialLinks {
    constructor() {
        this.socialLinks = USER_CONFIG.socialLinks;
    }

    init() {
        this.renderSocialLinks();
        console.log('🔗 SocialLinks inicializado');
    }

    renderSocialLinks() {
        const container = document.querySelector('[data-social-links]');
        if (!container) {
            console.error('❌ Container [data-social-links] não encontrado');
            return;
        }

        container.innerHTML = Object.entries(this.socialLinks)
            .map(([key, config]) => `
                <a href="${config.url}" 
                class="social-link" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="${config.label}">
                    <i class="${config.icon}"></i>
                    <span>${config.label}</span>
                </a>
            `).join('');

        console.log('🔗 Links sociais renderizados');
    }
}

// ⌨️ Typewriter Effect
class Typewriter {
    init() {
        this.startTypewriterEffects();
        console.log('⌨️ Typewriter inicializado');
    }

    startTypewriterEffects() {
        const elements = document.querySelectorAll('[data-typewriter]');
        if (elements.length === 0) return;

        elements.forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            this.typeText(el, text, 100);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    }
}

// ⚡ Utils
class Utils {
    static async copyToClipboard(text, successMessage = 'Copiado!') {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification(successMessage);
            return true;
        } catch (err) {
            console.error('Falha ao copiar:', err);
            return this.copyToClipboardFallback(text, successMessage);
        }
    }

    static copyToClipboardFallback(text, successMessage) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification(successMessage);
            return true;
        } catch (error) {
            console.error('Fallback também falhou:', error);
            return false;
        }
    }

    static showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    }
}

// 📊 Analytics Service
class AnalyticsService {
    static init() {
        console.log('📊 AnalyticsService inicializado');
    }

    static trackEvent(category, action, label) {
        console.log(`📈 Event: ${category} - ${action} - ${label}`);
    }
}

// 🎯 Main App
class App {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
    this.animationObserver = null;
    this.footerInterval = null;
  }

  init() {
    if (this.isInitialized) return;

    try {
      console.log("🚀 Iniciando aplicação...");

      // 1. Inicializar serviços
      this.initServices();

      // 2. Inicializar componentes
      this.initComponents();

      // 3. Inicializar animações
      this.initAnimations();

      // 4. Configurar event listeners
      this.initEventListeners();

      // 5. Inicializar rotação do footer ✅ ADICIONAR ESTA LINHA
      this.initFooterRotation();

      this.isInitialized = true;
      console.log("✅ Aplicação inicializada com sucesso");
    } catch (error) {
      console.error("❌ Erro na inicialização:", error);
      this.handleError(error);
    }
  }

  initServices() {
    // 🎨 Serviço de Tema
    this.modules.theme = new ThemeManager();
    this.modules.theme.init();

    // 📊 Serviço de Analytics
    AnalyticsService.init();
  }

  initComponents() {
    // 🔗 Componente de Links Sociais
    this.modules.socialLinks = new SocialLinks();
    this.modules.socialLinks.init();

    // ⌨️ Componente Typewriter
    this.modules.typewriter = new Typewriter();
    this.modules.typewriter.init();
  }

  initAnimations() {
    // 🔍 Observador de Intersection para animações
    this.animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            this.animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // 👀 Observar todos os elementos com data-animate
    const animatedElements = document.querySelectorAll("[data-animate]");

    if (animatedElements.length === 0) {
      console.warn("⚠️ Nenhum elemento com [data-animate] encontrado");
      return;
    }

    animatedElements.forEach((el) => {
      this.animationObserver.observe(el);
    });

    console.log(`🎭 ${animatedElements.length} elementos para animar`);
  }

  initEventListeners() {
    // 📧 Copiar email (JÁ EXISTE)
    const emailBtn = document.querySelector("[data-copy-email]");
    if (emailBtn) {
      emailBtn.addEventListener("click", () => {
        Utils.copyToClipboard(USER_CONFIG.email, "📧 Email copiado!");
      });
    }

    // 🆕 BOTÃO DE DOWNLOAD DO CV (ADICIONE ISSO)
    const downloadCvBtn = document.querySelector('[data-download-cv]');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            // ✅ Funciona localmente e em produção
            window.open('cv-cristiano-andrade.pdf', '_blank');
        });
    }

    // 🖱️ Smooth scroll para links internos (JÁ EXISTE)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    if (internalLinks.length > 0) {
      internalLinks.forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });
    }
  }

  handleError(error) {
    console.error("Erro na aplicação:", error);

    // Mostrar mensagem de erro amigável
    const errorElement = document.createElement("div");
    errorElement.className = "notification";
    errorElement.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Oops! Algo deu errado.</span>
        `;

    document.body.appendChild(errorElement);

    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.remove();
      }
    }, 5000);
  }

  initFooterRotation() {
    const credentialEl = document.querySelector(".credentials small");
    if (!credentialEl) {
      console.warn("⚠️ Elemento .credentials small não encontrado");
      return;
    }

    let currentIndex = 0;

    const rotatePhrase = () => {
      credentialEl.style.opacity = "0";

      setTimeout(() => {
        credentialEl.textContent = FOOTER_PHRASES[currentIndex];
        credentialEl.style.opacity = "1";

        currentIndex = (currentIndex + 1) % FOOTER_PHRASES.length;
      }, 500);
    };

    // ✅ Usar this.footerInterval em vez de setInterval direto
    this.footerInterval = setInterval(rotatePhrase, 5000);

    currentIndex = Math.floor(Math.random() * FOOTER_PHRASES.length);
    rotatePhrase();

    console.log("🔄 Footer rotation initialized");
  }

  // 🧹 NOVA FUNÇÃO DESTROY - Adicione no final da classe App
  destroy() {
    console.log("🛑 Destruindo aplicação...");

    // 1. Parar observador de animações
    if (this.animationObserver) {
      this.animationObserver.disconnect();
      this.animationObserver = null;
    }

    // 2. Parar rotação do footer
    if (this.footerInterval) {
      clearInterval(this.footerInterval);
      this.footerInterval = null;
    }

    // 3. Remover event listeners (se necessário)
    // Você pode adicionar remoção de event listeners específicos aqui

    // 4. Limpar módulos
    this.modules = {};

    this.isInitialized = false;
    console.log("✅ Aplicação destruída com sucesso");
  }
}

// ⏳ Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.app = new App();
        window.app.init();
    });
} else {
    // DOM já está pronto
    window.app = new App();
    window.app.init();
}