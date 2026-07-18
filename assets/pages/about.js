/**
 * FluentMind - About Developer Page
 * Premium portfolio view for Abhay Ojha.
 */

const AboutPage = {
    render: () => {
        const dev = APP_CONFIG.developer;
        
        return `
        <div class="max-w-5xl mx-auto pb-24 space-y-12 gsap-about-fade">
            
            <!-- Hero Profile -->
            <section class="relative glass-card rounded-3xl p-8 sm:p-12 overflow-hidden">
                <div class="absolute top-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div class="relative group">
                        <div class="w-32 h-32 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-cyan p-1 shadow-2xl shadow-accent-blue/20 group-hover:rotate-3 transition-transform duration-300">
                            <img src="assets/icons/a.jpg" alt="${dev.name}" class="w-full h-full rounded-xl object-cover" loading="lazy">
                        </div>
                        <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent-green flex items-center justify-center border-4 border-white dark:border-dark-bg shadow-lg">
                            <i data-lucide="check" class="w-5 h-5 text-white"></i>
                        </div>
                    </div>
                    
                    <div class="flex-1 text-center md:text-left">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-semibold mb-3">
                            <span class="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
                            Available for opportunities
                        </div>
                        <h1 class="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">${dev.name}</h1>
                        <p class="text-xl text-accent-blue font-semibold mb-4">${dev.role}</p>
                        <p class="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                            Elite Staff Software Engineer & Product Designer with a passion for building world-class digital experiences. 
                            Creator of <strong>FluentMind</strong>, combining linguistic precision with cutting-edge web technologies to redefine how the world learns English.
                        </p>
                        
                        <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                            <a href="mailto:${dev.email}" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-card shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-200">
                                <i data-lucide="mail" class="w-4 h-4 text-accent-purple"></i> ${dev.email}
                            </a>
                            <a href="tel:${dev.phone}" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-card shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-200">
                                <i data-lucide="phone" class="w-4 h-4 text-accent-green"></i> ${dev.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Skills & Expertise -->
            <section>
                <h2 class="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <i data-lucide="code-2" class="w-6 h-6 text-accent-cyan"></i> Core Expertise
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${[
                        { title: 'Frontend Engineering', skills: ['HTML5/CSS3', 'Vanilla JS (ES6+)', 'React/Next.js', 'Tailwind CSS', 'GSAP Animations', 'Web Performance'] },
                        { title: 'System Architecture', skills: ['Scalable Design', 'IndexedDB/Offline-First', 'PWA Development', 'API Design', 'State Management', 'Security Best Practices'] },
                        { title: 'UI/UX Design', skills: ['Design Systems', 'Figma/Prototyping', 'Motion Design', 'Accessibility (WCAG)', 'User Research', 'Responsive Design'] },
                        { title: 'Tools & Workflow', skills: ['Git/GitHub', 'CI/CD Pipelines', 'Agile/Scrum', 'Testing (Jest/Cypress)', 'Webpack/Vite', 'Cloud (AWS/Vercel)'] }
                    ].map(cat => `
                        <div class="glass-card rounded-2xl p-6">
                            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">${cat.title}</h3>
                            <div class="flex flex-wrap gap-2">
                                ${cat.skills.map(skill => `
                                    <span class="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-accent-blue/10 hover:text-accent-blue transition-colors cursor-default">
                                        ${skill}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Featured Projects -->
            <section>
                <h2 class="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <i data-lucide="folder-kanban" class="w-6 h-6 text-accent-orange"></i> Featured Projects
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Project 1: FluentMind -->
                    <div class="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div class="h-48 bg-gradient-to-br from-accent-blue to-accent-purple relative overflow-hidden">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <i data-lucide="languages" class="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform"></i>
                            </div>
                            <div class="absolute top-4 right-4 px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-xs font-bold">FLAGSHIP</div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">FluentMind</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">The world's most premium English learning platform. Features AI pronunciation, 100k+ words, and offline-first architecture.</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-[10px] font-bold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded">Vanilla JS</span>
                                <span class="text-[10px] font-bold text-accent-purple bg-accent-purple/10 px-2 py-0.5 rounded">IndexedDB</span>
                                <span class="text-[10px] font-bold text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded">PWA</span>
                            </div>
                            <a href="#/" class="text-sm font-semibold text-accent-blue flex items-center gap-1 hover:gap-2 transition-all">View Live <i data-lucide="arrow-right" class="w-4 h-4"></i></a>
                        </div>
                    </div>

                    <!-- Project 2: Placeholder -->
                    <div class="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 opacity-75">
                        <div class="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-white/5 dark:to-white/10 relative overflow-hidden flex items-center justify-center">
                            <i data-lucide="plus-circle" class="w-12 h-12 text-gray-400"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">More Projects Coming Soon</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Currently architecting next-generation tools for productivity and education.</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-[10px] font-bold text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded">In Development</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-500">Stay Tuned</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact CTA -->
            <section class="text-center py-12">
                <h2 class="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4">Let's Build Something Extraordinary</h2>
                <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">Open to consulting, senior engineering roles, and ambitious product collaborations.</p>
                <a href="mailto:${dev.email}" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold shadow-xl shadow-accent-blue/20 hover:scale-105 transition-transform">
                    <i data-lucide="send" class="w-5 h-5"></i> Get in Touch
                </a>
            </section>

        </div>
        `;
    },

    init: () => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (typeof gsap !== 'undefined') {
            gsap.from('.gsap-about-fade > *', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        }
    }
};
