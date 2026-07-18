/**
 * FluentMind - Sidebar Component
 * Responsive navigation with active states and smooth animations.
 */

const Sidebar = {
    render: () => {
        const navItems = [
            { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', href: '#/dashboard' },
            { id: 'vocabulary', label: 'Vocabulary Explorer', icon: 'book-open', href: '#/vocabulary' },
            { id: 'learning', label: 'Learning Modes', icon: 'brain-circuit', href: '#/learning' },
            { id: 'pronunciation', label: 'Pronunciation AI', icon: 'mic', href: '#/pronunciation' },
            { id: 'admin', label: 'Admin Panel', icon: 'shield-check', href: '#/admin' },
            { id: 'about', label: 'About Developer', icon: 'user', href: '#/about' },
        ];

        const currentHash = window.location.hash || '#/';

        return `
        <aside id="sidebar-drawer" class="fixed inset-y-0 left-0 z-50 w-64 glass-panel border-r border-gray-200/50 dark:border-white/5 transform -translate-x-full lg:translate-x-0 lg:h-[calc(100vh-4rem)] lg:top-16 transition-transform duration-300 ease-out flex flex-col">
            <!-- Mobile Close Button -->
            <div class="lg:hidden flex justify-end p-4">
                <button id="close-sidebar-btn" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
                    <i data-lucide="x" class="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
                </button>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                ${navItems.map(item => {
                    const isActive = currentHash === item.href || (currentHash === '#/' && item.id === 'dashboard');
                    const activeClasses = isActive 
                        ? 'bg-accent-blue/10 text-accent-blue dark:bg-accent-blue/15 dark:text-accent-blue border-l-2 border-accent-blue' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border-l-2 border-transparent';
                    
                    return `
                    <a href="${item.href}" class="flex items-center gap-3 px-3 py-2.5 rounded-r-xl text-sm font-medium transition-all duration-200 ${activeClasses} group">
                        <i data-lucide="${item.icon}" class="w-5 h-5 ${isActive ? 'text-accent-blue' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'} transition-colors"></i>
                        ${item.label}
                    </a>
                    `;
                }).join('')}
            </nav>

            <!-- Sidebar Footer: Daily Goal Mini -->
            <div class="p-4 border-t border-gray-200/50 dark:border-white/5">
                <div class="glass-card rounded-xl p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-semibold text-gray-600 dark:text-gray-400">Daily Goal</span>
                        <span class="text-xs font-bold text-accent-green">35/50 XP</span>
                    </div>
                    <div class="w-full h-2 bg-gray-200 dark:bg-dark-cardSec rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-accent-green to-accent-cyan rounded-full transition-all duration-1000" style="width: 70%"></div>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Mobile Overlay -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden lg:hidden transition-opacity duration-300 opacity-0"></div>
        `;
    },

    init: () => {
        const closeBtn = document.getElementById('close-sidebar-btn');
        const overlay = document.getElementById('sidebar-overlay');
        const drawer = document.getElementById('sidebar-drawer');

        const closeSidebar = () => {
            if (!drawer) return;
            drawer.classList.remove('translate-x-0');
            drawer.classList.add('-translate-x-full');
            if (overlay) {
                overlay.classList.remove('opacity-100');
                overlay.classList.add('opacity-0');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            }
        };

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }

        // Open overlay when drawer opens (handled by Navbar, but we sync overlay here)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (drawer.classList.contains('translate-x-0')) {
                        if (overlay) {
                            overlay.classList.remove('hidden');
                            overlay.classList.remove('opacity-0');
                            requestAnimationFrame(() => overlay.classList.add('opacity-100'));
                        }
                    }
                }
            });
        });
        observer.observe(drawer, { attributes: true });

        // Close sidebar when a navigation link is clicked (mobile behavior)
        drawer.addEventListener('click', (e) => {
            const anchor = e.target.closest && e.target.closest('a');
            if (!anchor) return;
            // Let the link navigate, but close drawer on small screens
            if (window.innerWidth < 1024) {
                closeSidebar();
            }
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
    },

    updateActiveLink: (currentHash) => {
        const drawer = document.getElementById('sidebar-drawer');
        if (!drawer) return;
        const links = drawer.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = currentHash === href || (currentHash === '#/' && href === '#/dashboard');
            const icon = link.querySelector('i');
            
            if (isActive) {
                link.className = 'flex items-center gap-3 px-3 py-2.5 rounded-r-xl text-sm font-medium transition-all duration-200 bg-accent-blue/10 text-accent-blue dark:bg-accent-blue/15 dark:text-accent-blue border-l-2 border-accent-blue group';
                if (icon) icon.className = 'w-5 h-5 text-accent-blue transition-colors lucide lucide-' + icon.getAttribute('data-lucide');
            } else {
                link.className = 'flex items-center gap-3 px-3 py-2.5 rounded-r-xl text-sm font-medium transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border-l-2 border-transparent group';
                if (icon) icon.className = 'w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors lucide lucide-' + icon.getAttribute('data-lucide');
            }
        });
    }
};