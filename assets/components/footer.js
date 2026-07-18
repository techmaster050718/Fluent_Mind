/**
 * FluentMind - Footer Component
 * Premium glassmorphic footer with developer credits and legal links.
 */

const Footer = {
    render: () => {
        const currentYear = new Date().getFullYear();
        return `
        <footer class="relative mt-auto border-t border-gray-200/50 dark:border-white/5 glass-panel">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    <!-- Brand & Developer Info -->
                    <div class="md:col-span-2 space-y-4">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                                <i data-lucide="languages" class="w-5 h-5 text-white"></i>
                            </div>
                            <span class="font-display font-bold text-xl text-gray-900 dark:text-white">
                                Fluent<span class="text-gradient">Mind</span>
                            </span>
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                            The world's most premium English pronunciation and vocabulary learning platform. 
                            Designed and engineered for excellence.
                        </p>
                        <div class="pt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div class="flex items-center gap-3">
                                <img src="assets/icons/a.jpg" alt="${APP_CONFIG.developer.name}" class="w-8 h-8 rounded-full object-cover shadow-md border border-gray-200 dark:border-white/10" loading="lazy">
                                <span>Designed & Developed by <strong class="text-gray-900 dark:text-white">${APP_CONFIG.developer.name}</strong></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i data-lucide="mail" class="w-4 h-4 text-accent-purple"></i>
                                <a href="mailto:${APP_CONFIG.developer.email}" class="hover:text-accent-purple transition-colors">${APP_CONFIG.developer.email}</a>
                            </div>
                            <div class="flex items-center gap-2">
                                <i data-lucide="phone" class="w-4 h-4 text-accent-cyan"></i>
                                <a href="tel:${APP_CONFIG.developer.phone}" class="hover:text-accent-cyan transition-colors">${APP_CONFIG.developer.phone}</a>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
                        <ul class="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#/vocabulary" class="hover:text-accent-blue transition-colors">Vocabulary Explorer</a></li>
                            <li><a href="#/learning" class="hover:text-accent-blue transition-colors">Learning Modes</a></li>
                            <li><a href="#/pronunciation" class="hover:text-accent-blue transition-colors">Pronunciation AI</a></li>
                            <li><a href="#/dashboard" class="hover:text-accent-blue transition-colors">Dashboard</a></li>
                        </ul>
                    </div>

                    <!-- Legal & Support -->
                    <div>
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Legal & Support</h3>
                        <ul class="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><a href="#/privacy" class="hover:text-accent-blue transition-colors">Privacy Policy</a></li>
                            <li><a href="#/terms" class="hover:text-accent-blue transition-colors">Terms of Service</a></li>
                            <li><a href="#/about" class="hover:text-accent-blue transition-colors">About Developer</a></li>
                            <li><a href="mailto:${APP_CONFIG.developer.email}" class="hover:text-accent-blue transition-colors">Contact Support</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="mt-12 pt-8 border-t border-gray-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p class="text-xs text-gray-500 dark:text-gray-500">
                        © ${currentYear} ${APP_CONFIG.name}. All rights reserved. v${APP_CONFIG.version}
                    </p>
                    <button id="back-to-top-btn" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 group">
                        <span>Back to Top</span>
                        <i data-lucide="arrow-up" class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"></i>
                    </button>
                </div>
            </div>
        </footer>
        `;
    },

    init: () => {
        const backToTopBtn = document.getElementById('back-to-top-btn');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
};