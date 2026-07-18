/**
 * FluentMind - Utility Functions
 * High-performance, reusable helper functions
 */

const Utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => { clearTimeout(timeout); func(...args); };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatNumber: (num) => new Intl.NumberFormat('en-US').format(num),

    generateId: () => Date.now().toString(36) + Math.random().toString(36).substr(2),

    capitalize: (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '',

    fuzzyMatch: (text, pattern) => {
        const regex = new RegExp(pattern.split('').join('.*'), 'i');
        return regex.test(text);
    },

    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    },

    showToast: (message, type = 'success') => {
        const toast = document.createElement('div');
        const colors = {
            success: 'bg-accent-green/20 text-accent-green border-accent-green/30',
            error: 'bg-accent-red/20 text-accent-red border-accent-red/30',
            info: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30'
        };
        
        toast.className = `fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl border backdrop-blur-md glass-panel ${colors[type]} shadow-2xl transform translate-y-10 opacity-0 transition-all duration-300 flex items-center gap-3`;
        toast.innerHTML = `
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}" class="w-5 h-5"></i>
            <span class="font-medium text-sm">${message}</span>
        `;
        
        document.body.appendChild(toast);
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        });
        
        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};