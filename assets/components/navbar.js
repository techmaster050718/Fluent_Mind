/**
 * FluentMind - Navbar Component
 * Premium, sticky, glassmorphic navigation with theme toggle and search trigger.
 */

const Navbar = {
    render: () => {
        return `
        <nav class="glass-panel border-b border-gray-200/50 dark:border-white/5 transition-all duration-300" id="main-navbar">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Left: Logo & Mobile Menu -->
                    <div class="flex items-center gap-4">
                        <button id="mobile-menu-btn" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Open menu">
                            <i data-lucide="menu" class="w-6 h-6 text-gray-700 dark:text-gray-300"></i>
                        </button>
                        <a href="#/" class="flex items-center gap-2 group" aria-label="FluentMind Home">
                            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/20 group-hover:shadow-accent-blue/40 transition-shadow duration-300">
                                <i data-lucide="languages" class="w-5 h-5 text-white"></i>
                            </div>
                            <span class="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                                Fluent<span class="text-gradient">Mind</span>
                            </span>
                        </a>
                    </div>

                    <!-- Center: Desktop Search Trigger -->
                    <div class="hidden md:flex flex-1 max-w-lg mx-8">
                        <button id="search-trigger-btn" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-accent-blue/50 dark:hover:border-accent-blue/30 transition-all duration-200 group">
                            <i data-lucide="search" class="w-4 h-4 text-gray-400 group-hover:text-accent-blue transition-colors"></i>
                            <span class="text-sm text-gray-500 dark:text-gray-400 flex-1 text-left">Search words, phrases, or idioms...</span>
                            <kbd class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-cardSec border border-gray-200 dark:border-white/10 rounded-md">
                                <span class="text-[10px]">⌘</span>K
                            </kbd>
                        </button>
                    </div>

                    <!-- Right: Actions & User -->
                    <div class="flex items-center gap-2 sm:gap-4">
                        <!-- Theme Toggle -->
                        <button id="theme-toggle-btn" class="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Toggle theme">
                            <i data-lucide="sun" class="w-5 h-5 text-gray-600 dark:text-gray-400 hidden dark:block"></i>
                            <i data-lucide="moon" class="w-5 h-5 text-gray-600 dark:text-gray-400 block dark:hidden"></i>
                        </button>

                        <!-- Notifications -->
                        <button id="notifications-btn" class="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Notifications" aria-expanded="false">
                            <i data-lucide="bell" class="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
                            <span class="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full ring-2 ring-white dark:ring-dark-bg"></span>
                        </button>

                        <!-- User Profile / XP Summary -->
                        <button id="profile-btn" class="hidden sm:flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-accent-purple/50 transition-all duration-200">
                            <div class="flex flex-col items-end mr-1">
                                <span class="text-xs font-semibold text-gray-900 dark:text-white">Level 5</span>
                                <span class="text-[10px] text-accent-purple font-medium">1,250 XP</span>
                            </div>
                            <img src="assets/icons/a.jpg" alt="Profile" class="w-8 h-8 rounded-full object-cover shadow-md" loading="lazy">
                        </button>
                        <div id="notifications-panel" class="hidden absolute right-4 top-14 w-80 rounded-2xl glass-panel border border-gray-200/50 dark:border-white/10 shadow-2xl p-3 z-50">
                            <p class="px-3 py-2 text-sm font-bold text-gray-900 dark:text-white">Notifications</p>
                            <a href="#/learning" class="block rounded-xl p-3 hover:bg-accent-blue/10 transition-colors"><p class="text-sm font-semibold">Daily practice is ready</p><p class="text-xs text-gray-500 mt-1">Continue your flashcards to protect your streak.</p></a>
                            <a href="#/pronunciation" class="block rounded-xl p-3 hover:bg-accent-purple/10 transition-colors"><p class="text-sm font-semibold">New pronunciation words</p><p class="text-xs text-gray-500 mt-1">Choose a word and practice its syllables.</p></a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        `;
    },

    init: () => {
        // Theme Toggle Logic
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const html = document.documentElement;
                const isDark = html.classList.toggle('dark');
                localStorage.setItem(APP_CONFIG.theme.storageKey, isDark ? 'dark' : 'light');
            });
        }

        // Search Modal Trigger
        const searchBtn = document.getElementById('search-trigger-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => SearchModal.open());
        }

        // Mobile Menu Trigger
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar-drawer');
                if (sidebar) {
                    sidebar.classList.remove('-translate-x-full');
                    sidebar.classList.add('translate-x-0');
                }
            });
        }

        // Ensure overlay is shown when sidebar opens from mobile menu
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                const overlay = document.getElementById('sidebar-overlay');
                if (overlay) {
                    overlay.classList.remove('hidden');
                    overlay.classList.remove('opacity-0');
                    requestAnimationFrame(() => overlay.classList.add('opacity-100'));
                }
            });
        }

        const notificationsBtn = document.getElementById('notifications-btn');
        const notificationsPanel = document.getElementById('notifications-panel');
        if (notificationsBtn && notificationsPanel) {
            notificationsBtn.addEventListener('click', () => {
                const isOpen = notificationsPanel.classList.toggle('hidden') === false;
                notificationsBtn.setAttribute('aria-expanded', String(isOpen));
            });
        }

        const profileBtn = document.getElementById('profile-btn');
        if (profileBtn) profileBtn.addEventListener('click', () => window.location.hash = '#/dashboard');

        // Keyboard Shortcut for Search (Cmd/Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                SearchModal.open();
            }
            if (e.key === 'Escape') {
                SearchModal.close();
            }
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
};
