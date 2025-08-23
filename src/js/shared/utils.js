/**
 * UTILITÁRIOS: Funções auxiliares
 * Responsabilidade: Funções reutilizáveis entre componentes
 */

export class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static async copyToClipboard(text, successMessage = 'Copiado!') {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification(successMessage);
            return true;
        } catch (err) {
            console.error('Falha ao copiar:', err);
            return false;
        }
    }

    static showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-secondary);
            color: var(--color-primary);
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, duration);
    }

    static formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR');
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}