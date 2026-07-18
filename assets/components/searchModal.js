/**
 * FluentMind - Search Modal Component
 * Premium command palette with fuzzy search, voice input, and keyboard navigation.
 */

const SearchModal = {
    render: () => {
        return `
        <div id="search-modal" class="fixed inset-0 z-[60] hidden" role="dialog" aria-modal="true" aria-labelledby="search-title">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 opacity-0" id="search-backdrop"></div>
            
            <!-- Modal Panel -->
            <div class="absolute inset-x-0 top-[10vh] mx-auto max-w-2xl px-4 transform scale-95 opacity-0 transition-all duration-300" id="search-panel">
                <div class="glass-panel rounded-2xl shadow-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden flex flex-col max-h-[70vh]">
                    
                    <!-- Search Input Area -->
                    <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-200/50 dark:border-white/5">
                        <i data-lucide="search" class="w-5 h-5 text-gray-400 flex-shrink-0"></i>
                        <input 
                            type="text" 
                            id="search-input" 
                            class="flex-1 bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder-gray-400" 
                            placeholder="Search words, phrases, or idioms..." 
                            autocomplete="off"
                            aria-label="Search vocabulary"
                        >
                        <!-- Voice Search Trigger -->
                        <button id="voice-search-btn" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-accent-red transition-colors" title="Voice Search">
                            <i data-lucide="mic" class="w-5 h-5"></i>
                        </button>
                        <button id="close-search-btn" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Close search">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>

                    <!-- Filters (Optional, shown on focus) -->
                    <div class="px-4 py-2 flex gap-2 border-b border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
                        <button class="px-3 py-1 text-xs font-medium rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">All</button>
                        <button class="px-3 py-1 text-xs font-medium rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all">Words</button>
                        <button class="px-3 py-1 text-xs font-medium rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all">Idioms</button>
                        <button class="px-3 py-1 text-xs font-medium rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all">Phrasal Verbs</button>
                    </div>

                    <!-- Results Area -->
                    <div id="search-results" class="overflow-y-auto flex-1 p-2 space-y-1">
                        <!-- Recent Searches (Default State) -->
                        <div id="recent-searches">
                            <div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider">Recent Searches</div>
                            <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-left group transition-colors">
                                <i data-lucide="clock" class="w-4 h-4 text-gray-400 group-hover:text-accent-blue"></i>
                                <span class="text-sm text-gray-700 dark:text-gray-300">Accountable</span>
                                <span class="ml-auto text-xs text-gray-400">Adjective</span>
                            </button>
                            <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-left group transition-colors">
                                <i data-lucide="clock" class="w-4 h-4 text-gray-400 group-hover:text-accent-blue"></i>
                                <span class="text-sm text-gray-700 dark:text-gray-300">Resilient</span>
                                <span class="ml-auto text-xs text-gray-400">Adjective</span>
                            </button>
                        </div>
                        
                        <!-- Dynamic Results will be injected here -->
                    </div>

                    <!-- Footer / Shortcuts -->
                    <div class="px-4 py-3 bg-gray-50/80 dark:bg-black/30 border-t border-gray-200/50 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                        <div class="flex items-center gap-4">
                            <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-white dark:bg-dark-cardSec border border-gray-200 dark:border-white/10 rounded text-[10px]">↑</kbd><kbd class="px-1.5 py-0.5 bg-white dark:bg-dark-cardSec border border-gray-200 dark:border-white/10 rounded text-[10px]">↓</kbd> to navigate</span>
                            <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-white dark:bg-dark-cardSec border border-gray-200 dark:border-white/10 rounded text-[10px]">↵</kbd> to select</span>
                        </div>
                        <span class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-white dark:bg-dark-cardSec border border-gray-200 dark:border-white/10 rounded text-[10px]">esc</kbd> to close</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    open: () => {
        const modal = document.getElementById('search-modal');
        const backdrop = document.getElementById('search-backdrop');
        const panel = document.getElementById('search-panel');
        const input = document.getElementById('search-input');

        if (!modal) return;

        modal.classList.remove('hidden');
        // Trigger reflow for animation
        void modal.offsetWidth;
        
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('scale-95', 'opacity-0');
        panel.classList.add('scale-100', 'opacity-100');
        
        setTimeout(() => input.focus(), 100);
    },

    close: () => {
        const modal = document.getElementById('search-modal');
        const backdrop = document.getElementById('search-backdrop');
        const panel = document.getElementById('search-panel');

        if (!modal) return;

        backdrop.classList.add('opacity-0');
        panel.classList.remove('scale-100', 'opacity-100');
        panel.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
            document.getElementById('search-input').value = ''; // Clear input
        }, 300);
    },

    init: () => {
        const closeBtn = document.getElementById('close-search-btn');
        const backdrop = document.getElementById('search-backdrop');
        const input = document.getElementById('search-input');

        if (closeBtn) closeBtn.addEventListener('click', SearchModal.close);
        if (backdrop) backdrop.addEventListener('click', SearchModal.close);

        if (input) {
            input.addEventListener('input', Utils.debounce(async (e) => {
                const query = e.target.value.trim();
                const results = document.getElementById('search-results');
                if (query.length > 0) {
                    let words = await DB.searchWords(query);
                    if (!words.length) {
                        const fallbackWords = typeof getBuiltInWords === 'function' ? getBuiltInWords() : [];
                        const lowerQuery = query.toLowerCase();
                        words = fallbackWords.filter(word =>
                            word.word.toLowerCase().includes(lowerQuery) ||
                            word.englishMeaning.toLowerCase().includes(lowerQuery) ||
                            word.hindiMeaning.toLowerCase().includes(lowerQuery) ||
                            word.synonyms?.some(s => s.toLowerCase().includes(lowerQuery))
                        );
                    }
                    results.innerHTML = words.length ? words.map(word => `
                        <a href="#/word/${word.id}" class="search-result flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-accent-blue/10 transition-colors">
                            <i data-lucide="book-open" class="w-4 h-4 text-accent-blue"></i><span class="flex-1 font-semibold">${word.word}</span><span class="text-xs text-gray-500">${word.grammar}</span>
                        </a>`).join('') : '<p class="p-4 text-sm text-gray-500">No matching words found.</p>';
                    results.querySelectorAll('.search-result').forEach(link => link.addEventListener('click', SearchModal.close));
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                } else {
                    results.innerHTML = document.getElementById('recent-searches')?.outerHTML || '';
                }
            }, 300));
        }

        const voiceBtn = document.getElementById('voice-search-btn');
        if (voiceBtn) voiceBtn.addEventListener('click', () => Utils.showToast('Voice search will use your browser microphone when available.', 'info'));

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
};
