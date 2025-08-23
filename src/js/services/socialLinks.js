export class SocialLinks {
    constructor() {
        this.socialLinks = this.getSocialLinksConfig();
    }

    init() {
        this.renderSocialLinks();
        console.log('🔗 SocialLinks inicializado');
    }

    getSocialLinksConfig() {
        return {
            github: {
                url: 'https://github.com/cristianocode',
                icon: 'fab fa-github',
                label: 'GitHub'
            },
            linkedin: {
                url: 'https://linkedin.com/in/cristiano',
                icon: 'fab fa-linkedin',
                label: 'LinkedIn'
            },
            email: {
                url: 'mailto:seu.email@exemplo.com',
                icon: 'fas fa-envelope',
                label: 'Email'
            }
        };
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