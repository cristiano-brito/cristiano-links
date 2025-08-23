// src/js/shared/utils.js
/**
 * @file Utilitários compartilhados
 * @description Funções auxiliares reutilizáveis
 */

export const utils = {
    /**
     * Debounce function para eventos
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Copiar texto para clipboard
     */
    async copyToClipboard(text, successMessage = 'Copiado!') {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification(successMessage);
            return true;
        } catch (err) {
            console.error('Falha ao copiar:', err);
            // Fallback para método antigo
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showNotification(successMessage);
                return true;
            } catch (fallbackError) {
                console.error('Fallback também falhou:', fallbackError);
                return false;
            }
        }
    },

    /**
     * Mostrar notificação temporária
     */
    showNotification(message, duration = 2000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--secondary-color);
            color: var(--primary-color);
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    /**
     * Formatar dados
     */
    formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR');
    },

    /**
     * Validar email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};