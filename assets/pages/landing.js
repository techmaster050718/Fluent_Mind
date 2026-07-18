/**
 * FluentMind - Landing Page Component
 * Premium, high-converting landing page with GSAP scroll animations.
 */

const LandingPage = {
    render: () => {
        const demoVideoSrc = 'assets/videos/a.mp4';
        return `
        <div class="space-y-24 pb-24">
            
            <!-- 1. HERO SECTION -->
            <section class="relative pt-12 pb-20 lg:pt-24 lg:pb-32 text-center overflow-hidden">
                <!-- Floating Background Elements -->
                <div class="absolute top-20 left-10 w-24 h-24 bg-accent-purple/20 rounded-2xl rotate-12 blur-xl animate-float hidden lg:block"></div>
                <div class="absolute bottom-20 right-10 w-32 h-32 bg-accent-cyan/20 rounded-full blur-xl animate-float hidden lg:block" style="animation-delay: 1s;"></div>

                <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold mb-6 gsap-hero-fade">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
                        </span>
                        v1.0 Now Live: Master English with AI
                    </div>
                    
                    <h1 class="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1] gsap-hero-fade">
                        Speak with Confidence.<br>
                        <span class="text-gradient">Master Every Word.</span>
                    </h1>
                    
                    <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed gsap-hero-fade">
                        The world's most premium English pronunciation and vocabulary platform. 
                        Learn naturally, track your progress, and achieve fluency with AI-powered feedback.
                    </p>

                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 gsap-hero-fade">
                        <a href="#/vocabulary" class="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-base shadow-lg shadow-accent-blue/25 flex items-center justify-center gap-2">
                            Start Learning Free
                            <i data-lucide="arrow-right" class="w-5 h-5"></i>
                        </a>
                        <button onclick="document.getElementById('demo-video').scrollIntoView({behavior: 'smooth'})" class="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-gray-700 dark:text-gray-200 font-semibold text-base hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <i data-lucide="play-circle" class="w-5 h-5 text-accent-blue"></i>
                            Watch Demo
                        </button>
                    </div>

                    <!-- Hero Visual / Mockup -->
                    <div class="mt-16 relative gsap-hero-up">
                        <div class="absolute inset-0 bg-gradient-to-t from-light-bg dark:from-dark-bg via-transparent to-transparent z-10 pointer-events-none h-full"></div>
                        <div class="glass-panel rounded-2xl border border-gray-200/50 dark:border-white/10 p-2 shadow-2xl shadow-accent-blue/5 max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                            <div class="rounded-xl bg-gray-100 dark:bg-dark-cardSec aspect-video flex items-center justify-center relative overflow-hidden group">
                                <video autoplay loop muted playsinline class="w-full h-full object-cover">
                                    <source src="assets/videos/a.mp4" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- PLATFORM DEMO -->
            <section id="demo-video" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
                <div class="glass-card rounded-3xl overflow-hidden border border-gray-200/50 dark:border-white/10">
                    <div class="p-6 sm:p-8 border-b border-gray-200/50 dark:border-white/5">
                        <span class="text-xs font-bold uppercase tracking-widest text-accent-blue">Platform walkthrough</span>
                        <h2 class="font-display text-3xl font-bold text-gray-900 dark:text-white mt-2">See FluentMind in action</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Explore vocabulary, pronunciation practice, and learning modes in one quick video.</p>
                    </div>
                    <div class="relative aspect-video bg-gray-100 dark:bg-dark-cardSec">
                        <video id="platform-demo-player" class="w-full h-full object-cover bg-black" controls preload="auto" playsinline>
                            <source src="${demoVideoSrc}" type="video/mp4">
                            Your browser does not support video playback.
                        </video>
                        <a href="${demoVideoSrc}" target="_blank" rel="noopener noreferrer" class="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 hover:bg-black/85 text-white text-xs font-semibold backdrop-blur-sm transition-colors">
                            <i data-lucide="external-link" class="w-4 h-4"></i> Open video
                        </a>
                        <div id="demo-video-placeholder" class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 pointer-events-none">
                            <div class="w-16 h-16 rounded-full bg-white dark:bg-dark-card shadow-lg flex items-center justify-center mb-4"><i data-lucide="video" class="w-7 h-7 text-accent-blue"></i></div>
                            <p class="font-semibold text-gray-900 dark:text-white">Loading platform demo…</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">The video will be available shortly.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CURATED EXTERNAL LEARNING VIDEOS -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-widest text-accent-red">Learn with video</span>
                        <h2 class="font-display text-3xl font-bold text-gray-900 dark:text-white mt-2">Continue learning on YouTube</h2>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Hand-picked channels for pronunciation, vocabulary, and daily English.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    ${[
                        { title: 'BBC Learning English', desc: 'Everyday English, grammar, vocabulary, and listening practice.', icon: 'tv', color: 'blue', url: 'https://www.youtube.com/@bbclearningenglish' },
                        { title: 'English with Lucy', desc: 'British pronunciation, useful vocabulary, and confident speaking.', icon: 'mic-2', color: 'purple', url: 'https://www.youtube.com/@EnglishwithLucy' },
                        { title: "Rachel's English", desc: 'American English pronunciation, sounds, rhythm, and intonation.', icon: 'audio-lines', color: 'cyan', url: 'https://www.youtube.com/@rachelsenglish' }
                    ].map(video => `
                        <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="group glass-card rounded-2xl p-6 hover:border-accent-${video.color}/40 hover:shadow-xl hover:shadow-accent-${video.color}/5 transition-all">
                            <div class="w-12 h-12 rounded-xl bg-accent-${video.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><i data-lucide="${video.icon}" class="w-6 h-6 text-accent-${video.color}"></i></div>
                            <h3 class="font-bold text-gray-900 dark:text-white">${video.title}</h3>
                            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mt-2">${video.desc}</p>
                            <span class="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-accent-${video.color}">Watch on YouTube <i data-lucide="external-link" class="w-4 h-4"></i></span>
                        </a>`).join('')}
                </div>
            </section>

            <!-- 2. STATS SECTION -->
            <section class="border-y border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div class="gsap-stat">
                            <div class="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-1">100K+</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">Words & Phrases</div>
                        </div>
                        <div class="gsap-stat">
                            <div class="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-1">50K+</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">Active Learners</div>
                        </div>
                        <div class="gsap-stat">
                            <div class="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-1">98%</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">Pronunciation Accuracy</div>
                        </div>
                        <div class="gsap-stat">
                            <div class="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-1">4.9/5</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">User Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 3. CATEGORIES / FEATURES BENTO GRID -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12 gsap-fade-up">
                    <h2 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything you need to master English</h2>
                    <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">A comprehensive ecosystem designed by linguists and elite engineers to accelerate your fluency.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
                    <!-- Card 1: Large -->
                    <div class="md:col-span-2 glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-accent-blue/5 transition-all duration-300 group gsap-fade-up">
                        <div class="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="mic" class="w-6 h-6 text-accent-blue"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Pronunciation Coach</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">Record your voice and get instant, phoneme-level feedback. Compare your speech with native speakers and track your confidence score over time.</p>
                        <a href="#/pronunciation" class="inline-flex items-center text-sm font-semibold text-accent-blue hover:gap-2 transition-all">Try it now <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i></a>
                    </div>

                    <!-- Card 2: Tall -->
                    <div class="md:row-span-2 glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-accent-purple/5 transition-all duration-300 group gsap-fade-up">
                        <div class="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="book-open" class="w-6 h-6 text-accent-purple"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Deep Vocabulary</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">Go beyond definitions. Explore syllable breakdowns, Hindi/English meanings, collocations, word families, and real-world usage examples.</p>
                        <div class="mt-6 space-y-3">
                            <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                                <i data-lucide="check-circle" class="w-4 h-4 text-accent-green"></i>
                                <span class="text-sm text-gray-700 dark:text-gray-300">100,000+ curated entries</span>
                            </div>
                            <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                                <i data-lucide="check-circle" class="w-4 h-4 text-accent-green"></i>
                                <span class="text-sm text-gray-700 dark:text-gray-300">Native audio pronunciations</span>
                            </div>
                            <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                                <i data-lucide="check-circle" class="w-4 h-4 text-accent-green"></i>
                                <span class="text-sm text-gray-700 dark:text-gray-300">Spaced repetition system</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="glass-card rounded-2xl p-6 hover:shadow-xl hover:shadow-accent-cyan/5 transition-all duration-300 group gsap-fade-up">
                        <div class="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="brain-circuit" class="w-6 h-6 text-accent-cyan"></i>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Smart Learning Modes</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">Flashcards, rapid-fire quizzes, typing practice, and listening drills tailored to your weak points.</p>
                    </div>

                    <!-- Card 4 -->
                    <div class="glass-card rounded-2xl p-6 hover:shadow-xl hover:shadow-accent-orange/5 transition-all duration-300 group gsap-fade-up">
                        <div class="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="trophy" class="w-6 h-6 text-accent-orange"></i>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Gamified Progress</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm">Earn XP, maintain daily streaks, unlock badges, and compete on global leaderboards.</p>
                    </div>
                </div>
            </section>

            <!-- 4. TESTIMONIALS -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12 gsap-fade-up">
                    <h2 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Loved by learners worldwide</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${[
                        { name: "Priya Sharma", role: "Software Engineer", text: "The pronunciation AI is a game-changer. It caught subtle vowel mistakes I didn't even know I was making. My interview confidence skyrocketed.", avatar: "PS" },
                        { name: "Rahul Verma", role: "Medical Student", text: "The vocabulary explorer with Hindi meanings and collocations is exactly what I needed for my USMLE prep. The UI is absolutely gorgeous.", avatar: "RV" },
                        { name: "Ananya Gupta", role: "Content Writer", text: "I've tried Duolingo and others, but FluentMind feels like a premium, professional tool. The spaced repetition actually works.", avatar: "AG" }
                    ].map((t, i) => `
                    <div class="glass-card rounded-2xl p-6 gsap-fade-up" style="animation-delay: ${i * 100}ms">
                        <div class="flex items-center gap-1 mb-4">
                            ${[1,2,3,4,5].map(() => `<i data-lucide="star" class="w-4 h-4 text-accent-orange fill-accent-orange"></i>`).join('')}
                        </div>
                        <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">"${t.text}"</p>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-white/10 dark:to-white/5 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
                                ${t.avatar}
                            </div>
                            <div>
                                <div class="text-sm font-semibold text-gray-900 dark:text-white">${t.name}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">${t.role}</div>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </section>

            <!-- 5. FAQ SECTION -->
            <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12 gsap-fade-up">
                    <h2 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                </div>
                <div class="space-y-4" id="faq-container">
                    ${[
                        { q: "Is FluentMind really free to use?", a: "Yes! The core vocabulary explorer, basic learning modes, and pronunciation practice are completely free. We offer a premium tier for advanced AI analytics and offline access." },
                        { q: "How accurate is the Pronunciation AI?", a: "Our AI uses advanced phoneme-level analysis, achieving a 98% accuracy rate compared to professional linguist assessments. It provides specific feedback on stress, intonation, and vowel/consonant clarity." },
                        { q: "Can I learn offline?", a: "Yes. By installing FluentMind as a PWA (Progressive Web App), you can download word packs and practice flashcards without an internet connection." },
                        { q: "Does it support Hindi translations?", a: "Absolutely. Every word entry includes precise Hindi meanings, Hindi example sentences, and cultural usage notes to bridge the gap for native Hindi speakers." }
                    ].map((faq, i) => `
                    <div class="glass-card rounded-xl overflow-hidden gsap-fade-up">
                        <button class="faq-toggle w-full flex items-center justify-between p-5 text-left focus:outline-none" data-index="${i}">
                            <span class="font-semibold text-gray-900 dark:text-white pr-4">${faq.q}</span>
                            <i data-lucide="chevron-down" class="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 faq-icon"></i>
                        </button>
                        <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                            <div class="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                ${faq.a}
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </section>

            <!-- 6. NEWSLETTER / FINAL CTA -->
            <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="relative rounded-3xl overflow-hidden gsap-fade-up">
                    <div class="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple opacity-90"></div>
                    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
                    
                    <div class="relative z-10 px-6 py-16 sm:px-12 sm:py-20 text-center">
                        <h2 class="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Ready to master English?</h2>
                        <p class="text-blue-100 mb-8 max-w-xl mx-auto">Join 50,000+ learners. Get weekly vocabulary tips, pronunciation hacks, and exclusive feature updates.</p>
                        
                        <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onsubmit="event.preventDefault(); Utils.showToast('Subscribed successfully!', 'success');">
                            <input type="email" placeholder="Enter your email" required class="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm">
                            <button type="submit" class="px-6 py-3.5 rounded-xl bg-white text-accent-blue font-bold hover:bg-blue-50 transition-colors shadow-lg">
                                Get Started
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
        `;
    },

    init: () => {
        // 1. Initialize Lucide Icons
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // 2. FAQ Accordion Logic
        const faqToggles = document.querySelectorAll('.faq-toggle');
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                const icon = toggle.querySelector('.faq-icon');
                const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

                // Close all others
                document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = '0px');
                document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });

        const demoPlayer = document.getElementById('platform-demo-player');
        const demoPlaceholder = document.getElementById('demo-video-placeholder');
        if (demoPlayer && demoPlaceholder) {
            demoPlayer.addEventListener('loadedmetadata', () => {
                demoPlaceholder.classList.add('hidden');
            });
            demoPlayer.addEventListener('error', () => {
                demoPlaceholder.classList.remove('hidden');
                demoPlaceholder.classList.remove('pointer-events-none');
                demoPlaceholder.innerHTML = `
                    <div class="w-16 h-16 rounded-full bg-white dark:bg-dark-card shadow-lg flex items-center justify-center mb-4"><i data-lucide="triangle-alert" class="w-7 h-7 text-accent-orange"></i></div>
                    <p class="font-semibold text-gray-900 dark:text-white">This video format cannot be played here.</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">Export <code class="px-1.5 py-0.5 rounded bg-white/60 dark:bg-white/10">a.mp4</code> as H.264 video with AAC audio, then replace the file in <code class="px-1.5 py-0.5 rounded bg-white/60 dark:bg-white/10">assets/videos/</code>.</p>`;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
            demoPlayer.load();
        }

        // 3. GSAP Scroll Animations
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Hero Animations
            gsap.from('.gsap-hero-fade', {
                y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
            });
            gsap.from('.gsap-hero-up', {
                y: 60, opacity: 0, duration: 1, delay: 0.4, ease: 'power3.out'
            });

            // Scroll-triggered sections
            gsap.utils.toArray('.gsap-fade-up').forEach(element => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

            // Stats counter animation
            gsap.utils.toArray('.gsap-stat').forEach((stat, i) => {
                gsap.from(stat, {
                    scrollTrigger: { trigger: stat, start: 'top 90%' },
                    y: 20, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out'
                });
            });
        }
    }
};
