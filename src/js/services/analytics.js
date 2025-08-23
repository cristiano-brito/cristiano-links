/**
 * SERVIÇO: Analytics e Monitoramento
 * Responsabilidade: Tracking de eventos e performance
 */

export class AnalyticsService {
    static init() {
        this.setupPerformanceMonitoring();
        this.setupErrorTracking();
        console.log('📊 AnalyticsService inicializado');
    }

    static setupPerformanceMonitoring() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.trackEvent('performance', 'page-load', `${loadTime.toFixed(2)}ms`);
        });
    }

    static setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.trackEvent('error', 'global-error', e.message);
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.trackEvent('error', 'unhandled-rejection', e.reason);
        });
    }

    static trackEvent(category, action, label) {
        // 📝 ALTERAR: Integrar com Google Analytics ou outro serviço
        console.log(`📈 Event: ${category} - ${action} - ${label}`);
        
        // Exemplo de integração com Google Analytics:
        // if (typeof gtag !== 'undefined') {
        //   gtag('event', action, {
        //     'event_category': category,
        //     'event_label': label
        //   });
        // }
    }

    static trackError(error) {
        this.trackEvent('error', 'js-error', error.message);
    }
}