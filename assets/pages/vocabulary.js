/**
 * FluentMind - Vocabulary Explorer Page
 * High-performance word list with sticky alphabet navigation and instant search.
 */

const VocabularyPage = {
    // Mock Data Generator (Simulates 100k+ words)
    generateMockWords: () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const categories = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Idiom', 'Phrasal Verb'];
        const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
        const words = [];
        
        // Generate a representative sample for the demo
        const sampleWords = [
            { w: 'Aberration', d: 'Noun', diff: 'Advanced' }, { w: 'Abyss', d: 'Noun', diff: 'Intermediate' },
            { w: 'Acumen', d: 'Noun', diff: 'Expert' }, { w: 'Aesthetic', d: 'Adj', diff: 'Intermediate' },
            { w: 'Alleviate', d: 'Verb', diff: 'Advanced' }, { w: 'Ambiguous', d: 'Adj', diff: 'Intermediate' },
            { w: 'Benevolent', d: 'Adj', diff: 'Advanced' }, { w: 'Brevity', d: 'Noun', diff: 'Intermediate' },
            { w: 'Cacophony', d: 'Noun', diff: 'Expert' }, { w: 'Candor', d: 'Noun', diff: 'Advanced' },
            { w: 'Catalyst', d: 'Noun', diff: 'Intermediate' }, { w: 'Circumvent', d: 'Verb', diff: 'Advanced' },
            { w: 'Debilitate', d: 'Verb', diff: 'Advanced' }, { w: 'Deference', d: 'Noun', diff: 'Expert' },
            { w: 'Diligent', d: 'Adj', diff: 'Beginner' }, { w: 'Ebullient', d: 'Adj', diff: 'Expert' },
            { w: 'Eclectic', d: 'Adj', diff: 'Advanced' }, { w: 'Ephemeral', d: 'Adj', diff: 'Advanced' },
            { w: 'Equanimity', d: 'Noun', diff: 'Expert' }, { w: 'Erudite', d: 'Adj', diff: 'Expert' },
            { w: 'Fastidious', d: 'Adj', diff: 'Advanced' }, { w: 'Fortitude', d: 'Noun', diff: 'Intermediate' },
            { w: 'Garrulous', d: 'Adj', diff: 'Expert' }, { w: 'Gregarious', d: 'Adj', diff: 'Advanced' },
            { w: 'Harbinger', d: 'Noun', diff: 'Advanced' }, { w: 'Iconoclast', d: 'Noun', diff: 'Expert' },
            { w: 'Juxtapose', d: 'Verb', diff: 'Advanced' }, { w: 'Laconic', d: 'Adj', diff: 'Expert' },
            { w: 'Magnanimous', d: 'Adj', diff: 'Advanced' }, { w: 'Meticulous', d: 'Adj', diff: 'Intermediate' },
            { w: 'Nefarious', d: 'Adj', diff: 'Advanced' }, { w: 'Nonchalant', d: 'Adj', diff: 'Intermediate' },
            { w: 'Obfuscate', d: 'Verb', diff: 'Expert' }, { w: 'Ostentatious', d: 'Adj', diff: 'Advanced' },
            { w: 'Paradigm', d: 'Noun', diff: 'Intermediate' }, { w: 'Pragmatic', d: 'Adj', diff: 'Beginner' },
            { w: 'Quintessential', d: 'Adj', diff: 'Advanced' }, { w: 'Resilient', d: 'Adj', diff: 'Beginner' },
            { w: 'Serendipity', d: 'Noun', diff: 'Advanced' }, { w: 'Sycophant', d: 'Noun', diff: 'Expert' },
            { w: 'Ubiquitous', d: 'Adj', diff: 'Advanced' }, { w: 'Venerable', d: 'Adj', diff: 'Advanced' },
            { w: 'Vicarious', d: 'Adj', diff: 'Intermediate' }, { w: 'Wanderlust', d: 'Noun', diff: 'Beginner' },
            { w: 'Xenophobia', d: 'Noun', diff: 'Advanced' }, { w: 'Yield', d: 'Verb', diff: 'Beginner' },
            { w: 'Zealous', d: 'Adj', diff: 'Intermediate' }
        ];

        sampleWords.forEach(item => {
            words.push({
                id: item.w.toLowerCase(),
                word: item.w,
                type: item.d,
                difficulty: item.diff,
                frequency: Math.floor(Math.random() * 1000) + 1,
                bookmarked: Math.random() > 0.8
            });
        });
        
        return words.sort((a, b) => a.word.localeCompare(b.word));
    },

    render: async () => {
        const savedWords = await DB.getAll(DB.stores.words);
        const builtInWords = typeof getBuiltInWords === 'function' ? getBuiltInWords() : [];
        const sourceWords = savedWords.length ? savedWords : builtInWords;
        const words = sourceWords.length
            ? sourceWords.map(word => ({
                id: word.id,
                word: word.word,
                type: word.grammar || word.type || 'Word',
                difficulty: word.difficulty || 'Intermediate',
                frequency: word.frequencyRank || 9999,
                bookmarked: false
            })).sort((a, b) => a.word.localeCompare(b.word))
            : VocabularyPage.generateMockWords();
        const groupedWords = {};
        
        // Group by first letter
        words.forEach(w => {
            const letter = w.word[0].toUpperCase();
            if (!groupedWords[letter]) groupedWords[letter] = [];
            groupedWords[letter].push(w);
        });

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        // Generate List HTML
        const listHtml = Object.keys(groupedWords).sort().map(letter => `
            <div id="section-${letter}" class="mb-8 scroll-mt-32">
                <div class="sticky top-20 z-20 flex items-center gap-3 py-3 mb-4 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5">
                    <span class="text-3xl font-display font-bold text-gradient">${letter}</span>
                    <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">${groupedWords[letter].length} words</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${groupedWords[letter].map(w => `
                        <a href="#/word/${w.id}" class="group glass-card rounded-xl p-4 hover:shadow-lg hover:shadow-accent-blue/5 hover:border-accent-blue/30 transition-all duration-300 flex items-center justify-between">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-semibold text-gray-900 dark:text-white group-hover:text-accent-blue transition-colors truncate">${w.word}</span>
                                    ${w.bookmarked ? '<i data-lucide="bookmark" class="w-3.5 h-3.5 text-accent-orange fill-accent-orange flex-shrink-0"></i>' : ''}
                                </div>
                                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 font-medium">${w.type}</span>
                                    <span class="capitalize">${w.difficulty}</span>
                                </div>
                            </div>
                            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-accent-blue group-hover:translate-x-1 transition-all"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        `).join('');

        return `
        <div class="flex flex-col lg:flex-row gap-8 pb-12">
            
            <!-- Sidebar: Alphabet Navigation (Desktop) -->
            <aside class="hidden lg:block w-16 flex-shrink-0">
                <div class="sticky top-24 glass-card rounded-2xl p-2 flex flex-col items-center gap-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
                    ${alphabet.map(l => `
                        <button class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-accent-blue/10 hover:text-accent-blue transition-all alphabet-btn" data-letter="${l}">
                            ${l}
                        </button>
                    `).join('')}
                </div>
            </aside>

            <!-- Main Content -->
            <div class="flex-1 min-w-0">
                
                <!-- Header & Search -->
                <div class="mb-8 space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 class="font-display text-3xl font-bold text-gray-900 dark:text-white">Vocabulary Explorer</h1>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse ${Utils.formatNumber(words.length)}+ words and phrases</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="vocab-filter-btn" class="p-2.5 rounded-xl glass-card hover:bg-gray-50 dark:hover:bg-white/10 transition-colors" title="Filters">
                                <i data-lucide="sliders-horizontal" class="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
                            </button>
                            <button id="vocab-sort-btn" class="p-2.5 rounded-xl glass-card hover:bg-gray-50 dark:hover:bg-white/10 transition-colors" title="Sort">
                                <i data-lucide="arrow-up-down" class="w-5 h-5 text-gray-600 dark:text-gray-400"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Search Bar -->
                    <div class="relative group">
                        <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-accent-blue transition-colors"></i>
                        <input type="text" id="vocab-search" placeholder="Search words, definitions, or synonyms..." 
                            class="w-full pl-12 pr-4 py-4 rounded-2xl glass-card border border-transparent focus:border-accent-blue/50 focus:ring-4 focus:ring-accent-blue/10 outline-none text-base transition-all">
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <kbd class="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10">⌘K</kbd>
                        </div>
                    </div>

                    <!-- Mobile Alphabet Strip -->
                    <div class="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        ${alphabet.map(l => `
                            <button class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold glass-card alphabet-btn" data-letter="${l}">
                                ${l}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Word List -->
                <div id="word-list-container">
                    ${listHtml}
                </div>

            </div>
        </div>
        `;
    },

    init: () => {
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // 1. Alphabet Navigation Click
        const alphabetBtns = document.querySelectorAll('.alphabet-btn');
        alphabetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const letter = btn.getAttribute('data-letter');
                const section = document.getElementById(`section-${letter}`);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // 2. Scroll Spy (Highlight active letter in sidebar)
        const sections = document.querySelectorAll('[id^="section-"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id.replace('section-', '');
                    alphabetBtns.forEach(btn => {
                        if (btn.getAttribute('data-letter') === id) {
                            btn.classList.add('bg-accent-blue', 'text-white', 'shadow-lg', 'shadow-accent-blue/20');
                            btn.classList.remove('text-gray-500', 'dark:text-gray-400');
                        } else {
                            btn.classList.remove('bg-accent-blue', 'text-white', 'shadow-lg', 'shadow-accent-blue/20');
                            btn.classList.add('text-gray-500', 'dark:text-gray-400');
                        }
                    });
                }
            });
        }, { rootMargin: '-20% 0px -80% 0px' });

        sections.forEach(section => observer.observe(section));

        // 3. Search Filter (Client-side demo)
        const searchInput = document.getElementById('vocab-search');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                const query = e.target.value.toLowerCase();
                const cards = document.querySelectorAll('#word-list-container a');
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    card.style.display = text.includes(query) ? '' : 'none';
                });
            }, 200));
        }

        document.getElementById('vocab-filter-btn')?.addEventListener('click', () => Utils.showToast('Use search to filter by word, meaning, or synonym.', 'info'));
        document.getElementById('vocab-sort-btn')?.addEventListener('click', () => Utils.showToast('Words are sorted alphabetically.', 'info'));
    }
};
