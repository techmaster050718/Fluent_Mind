/**
 * FluentMind - Application Core & Router
 * Bootstraps the app, manages state, and handles client-side routing.
 */

const App = {
    currentPage: null,
    
    /**
     * Main Initialization Sequence
     */
    async init() {
        console.log(`[App] Initializing ${APP_CONFIG.name} v${APP_CONFIG.version}...`);
        
        // 1. Show Loading State
        this.showLoading(true);

        try {
            // 2. Initialize Database & Seed Data
            await DB.init();
            await DB.seedWordsIfEmpty();
            await Gamification.initUserProgress();
            console.log('[App] Database ready.');

            // 3. Render Shell Components
            this.renderShell();

            // 4. Setup Router
            this.setupRouter();

            // 5. Register Service Worker (PWA)
            this.registerServiceWorker();

            // 6. Handle Initial Route
            this.handleRoute();

        } catch (error) {
            console.error('[App] Initialization failed:', error);
            Utils.showToast('Failed to initialize app. Please refresh.', 'error');
        } finally {
            this.showLoading(false);
        }
    },

    /**
     * Render the static shell (Navbar, Sidebar, Footer)
     */
    renderShell() {
        document.getElementById('navbar-container').innerHTML = Navbar.render();
        Navbar.init();

        // Sidebar is injected into main content area for layout flexibility
        const mainContent = document.getElementById('main-content');
        const sidebarWrapper = document.createElement('div');
        sidebarWrapper.id = 'sidebar-wrapper';
        sidebarWrapper.innerHTML = Sidebar.render();
        mainContent.parentElement.insertBefore(sidebarWrapper, mainContent);
        Sidebar.init();

        document.getElementById('footer-container').innerHTML = Footer.render();
        Footer.init();

        // Inject Search Modal
        const modalContainer = document.getElementById('modals-container');
        modalContainer.innerHTML = SearchModal.render();
        SearchModal.init();
    },

    /**
     * Simple Hash-based Router
     */
    setupRouter() {
        window.addEventListener('hashchange', () => this.handleRoute());
    },

    async handleRoute() {
        const hash = window.location.hash || '#/';
        const mainContent = document.getElementById('main-content');
        
        // Remove sidebar wrapper for landing page (full width)
        const sidebarWrapper = document.getElementById('sidebar-wrapper');
        if (hash === '#/' || hash === '#/about') {
            if (sidebarWrapper) sidebarWrapper.style.display = 'none';
            mainContent.classList.remove('lg:pl-64'); // Adjust if sidebar was pushing content
        } else {
            if (sidebarWrapper) sidebarWrapper.style.display = 'block';
            mainContent.classList.add('lg:pl-64'); // Push content right to make room for fixed sidebar
        }

        // Transition Effect
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(10px)';
        
        await new Promise(r => setTimeout(r, 60)); // Keep navigation responsive

        // Route Matching
        let pageHtml = '';
        let pageInit = null;

        if (hash === '#/' || hash === '') {
            pageHtml = LandingPage.render();
            pageInit = LandingPage.init;
        } 
        else if (hash === '#/dashboard') {
            pageHtml = DashboardPage.render();
            pageInit = DashboardPage.init;
        } 
        else if (hash === '#/vocabulary') {
            pageHtml = await VocabularyPage.render();
            pageInit = VocabularyPage.init;
        } 
        else if (hash.startsWith('#/word/')) {
            const wordId = hash.split('/')[2];
            pageHtml = await WordDetailPage.render(wordId);
            pageInit = WordDetailPage.init;
            DB.addToHistory(wordId); // Track history
        } 
        else if (hash === '#/learning') {
            pageHtml = LearningPage.render();
            pageInit = LearningPage.init;
        } 
        else if (hash === '#/pronunciation') {
            pageHtml = PronunciationPage.render();
            pageInit = PronunciationPage.init;
        } 
        else if (hash === '#/admin') {
            pageHtml = AdminPage.render();
            pageInit = AdminPage.init;
        } 
        else if (hash === '#/leaderboard') {
            pageHtml = await LeaderboardPage.render();
            pageInit = LeaderboardPage.init;
        } 
        else if (hash === '#/about') {
            pageHtml = AboutPage.render();
            pageInit = AboutPage.init;
        } 
        else {
            pageHtml = this.render404();
        }

        // Render Content
        mainContent.innerHTML = pageHtml;
        
        // Update Sidebar Active Link
        if (typeof Sidebar !== 'undefined' && Sidebar.updateActiveLink) {
            Sidebar.updateActiveLink(hash);
        }
        
        // Fade In
        requestAnimationFrame(() => {
            mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        });

        // Initialize Page Specific Logic
        if (pageInit) pageInit();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'auto' });
    },

    render404() {
        return `
        <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div class="w-24 h-24 rounded-full bg-accent-red/10 flex items-center justify-center mb-6">
                <i data-lucide="alert-triangle" class="w-12 h-12 text-accent-red"></i>
            </div>
            <h1 class="font-display text-4xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
            <p class="text-gray-500 dark:text-gray-400 mb-8">The page you are looking for does not exist or has been moved.</p>
            <a href="#/" class="px-6 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20">
                Go Home
            </a>
        </div>
        `;
    },

    showLoading(show) {
        const skeleton = document.getElementById('loading-skeleton');
        if (skeleton) {
            skeleton.style.display = show ? 'block' : 'none';
        }
    },

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('[App] Service Worker registered:', reg.scope))
                    .catch(err => console.warn('[App] Service Worker registration failed:', err));
            });
        }
    }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
