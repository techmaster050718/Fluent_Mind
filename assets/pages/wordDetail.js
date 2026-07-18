/**
 * FluentMind - Word Detail Page
 * Rich, semantic word view with audio, definitions, and related data.
 */

const WordDetailPage = {
    getWordData: (wordId) => {
        const fallbackWords = typeof getBuiltInWords === 'function' ? getBuiltInWords() : [];
        const matchedWord = fallbackWords.find(word =>
            word.id === wordId ||
            word.word.toLowerCase() === String(wordId).toLowerCase()
        );

        if (!matchedWord) return null;

        return {
            word: matchedWord.word,
            phonetic: matchedWord.pronunciation,
            syllables: matchedWord.syllables || [matchedWord.word.toLowerCase()],
            audio: { slow: `${matchedWord.id}_slow.mp3`, normal: `${matchedWord.id}.mp3` },
            definitions: [{ type: matchedWord.grammar, meaning: matchedWord.englishMeaning, hindi: matchedWord.hindiMeaning }],
            examples: matchedWord.examples || [],
            synonyms: matchedWord.synonyms || [],
            antonyms: matchedWord.antonyms || [],
            collocations: matchedWord.collocations || [],
            wordFamily: matchedWord.wordFamily || [],
            frequency: matchedWord.frequencyRank,
            difficulty: matchedWord.difficulty,
            category: matchedWord.category
        };
    },

    render: async (wordId) => {
        const savedWord = await DB.getById(DB.stores.words, wordId);
        const fallbackWords = typeof getBuiltInWords === 'function' ? getBuiltInWords() : [];
        const builtInWord = fallbackWords.find(word => word.id === wordId);
        const word = savedWord || builtInWord;

        if (!word) {
            return `
            <div class="max-w-4xl mx-auto py-24 text-center">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Word not found</h1>
                <p class="text-gray-500 dark:text-gray-400 mt-4">We couldn\'t find “${wordId}” in the shared vocabulary database.</p>
                <a href="#/vocabulary" class="mt-6 inline-flex px-6 py-3 rounded-xl bg-accent-blue text-white">Browse Vocabulary</a>
            </div>
            `;
        }
        const data = {
            word: word.word,
            phonetic: word.pronunciation,
            syllables: word.syllables,
            definitions: [{
                type: word.grammar,
                meaning: word.englishMeaning,
                hindi: word.hindiMeaning
            }],
            examples: word.examples || [],
            synonyms: word.synonyms || [],
            antonyms: word.antonyms || [],
            collocations: word.collocations || [],
            wordFamily: word.wordFamily || [],
            frequency: word.frequencyRank,
            difficulty: word.difficulty,
            category: word.category
        };
        
        // Syllable visualizer
        const syllableHtml = data.syllables.map((s, i) => `
            <span class="inline-flex items-center">
                <span class="px-2 py-1 rounded-lg bg-accent-blue/10 text-accent-blue font-mono text-sm font-bold">${s}</span>
                ${i < data.syllables.length - 1 ? '<span class="mx-1 text-gray-400">•</span>' : ''}
            </span>
        `).join('');

        return `
        <div class="max-w-4xl mx-auto pb-12 space-y-8 gsap-word-fade">
            
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <a href="#/vocabulary" class="hover:text-accent-blue transition-colors">Vocabulary</a>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
                <span class="text-gray-900 dark:text-white font-medium">${data.word}</span>
            </nav>

            <!-- Hero Section -->
            <div class="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                
                <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-bold uppercase tracking-wider">${data.difficulty}</span>
                            <span class="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">${data.category}</span>
                        </div>
                        
                        <h1 class="font-display text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                            ${data.word}
                        </h1>
                        
                        <div class="flex flex-wrap items-center gap-4 mb-6">
                            <span class="text-xl text-gray-500 dark:text-gray-400 font-mono">${data.phonetic}</span>
                            <div class="flex items-center gap-1 text-sm text-accent-orange">
                                ${Array(5).fill(0).map((_, i) => `<i data-lucide="star" class="w-4 h-4 ${i < 4 ? 'fill-accent-orange' : ''}"></i>`).join('')}
                                <span class="ml-2 text-gray-500 dark:text-gray-400">Freq. Rank #${data.frequency}</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Syllables</span>
                        </div>
                        <div class="flex flex-wrap items-center gap-1">
                            ${syllableHtml}
                        </div>
                    </div>

                    <!-- Audio Controls -->
                    <div class="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5">
                        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pronunciation</span>
                        <div class="flex items-center gap-4">
                            <button id="play-slow-btn" class="w-14 h-14 rounded-full bg-white dark:bg-dark-card shadow-lg flex items-center justify-center hover:scale-110 transition-transform group" title="Slow Pronunciation">
                                <i data-lucide="turtle" class="w-6 h-6 text-accent-blue group-hover:text-accent-cyan"></i>
                            </button>
                            <button id="play-normal-btn" class="w-20 h-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple shadow-xl shadow-accent-blue/30 flex items-center justify-center hover:scale-105 transition-transform group relative" title="Normal Pronunciation">
                                <i data-lucide="play" class="w-8 h-8 text-white ml-1"></i>
                                <span class="absolute inset-0 rounded-full bg-accent-blue/20 animate-ping opacity-0 group-hover:opacity-100"></span>
                            </button>
                            <button id="record-btn" class="w-14 h-14 rounded-full bg-white dark:bg-dark-card shadow-lg flex items-center justify-center hover:scale-110 transition-transform group" title="Record Your Voice">
                                <i data-lucide="mic" class="w-6 h-6 text-accent-red group-hover:text-accent-orange"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Action Bar -->
                <div class="flex items-center gap-3 mt-8 pt-8 border-t border-gray-200/50 dark:border-white/5">
                    <button id="bookmark-btn" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-accent-orange/10 hover:text-accent-orange transition-colors text-sm font-medium">
                        <i data-lucide="bookmark" class="w-4 h-4"></i> Save
                    </button>
                    <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-accent-blue/10 hover:text-accent-blue transition-colors text-sm font-medium">
                        <i data-lucide="share-2" class="w-4 h-4"></i> Share
                    </button>
                    <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-accent-purple/10 hover:text-accent-purple transition-colors text-sm font-medium">
                        <i data-lucide="sticky-note" class="w-4 h-4"></i> Add Note
                    </button>
                    <button class="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors text-sm font-medium shadow-lg shadow-accent-blue/20">
                        <i data-lucide="brain" class="w-4 h-4"></i> Practice Word
                    </button>
                </div>
            </div>

            <!-- Definitions Section -->
            <div class="space-y-6">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i data-lucide="book-text" class="w-5 h-5 text-accent-blue"></i> Meanings & Definitions
                </h2>
                <div class="space-y-4">
                    ${data.definitions.map((def, i) => `
                    <div class="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue font-bold">
                                ${i + 1}
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="px-2 py-0.5 rounded bg-accent-purple/10 text-accent-purple text-xs font-bold uppercase">${def.type}</span>
                                </div>
                                <p class="text-lg text-gray-900 dark:text-white font-medium leading-relaxed mb-3">
                                    ${def.meaning}
                                </p>
                                <div class="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border-l-4 border-accent-orange">
                                    <p class="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                        <span class="text-accent-orange font-bold">Hindi:</span> ${def.hindi}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Examples Section -->
            <div class="glass-card rounded-2xl p-6">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <i data-lucide="message-square-quote" class="w-5 h-5 text-accent-green"></i> Usage Examples
                </h2>
                <div class="space-y-4">
                    ${data.examples.map(ex => `
                    <div class="pl-4 border-l-2 border-accent-green/30 hover:border-accent-green transition-colors">
                        <p class="text-gray-900 dark:text-white font-medium italic mb-2">"${ex.en}"</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${ex.hi}</p>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Relations Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Synonyms -->
                <div class="glass-card rounded-2xl p-6">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i data-lucide="check-circle" class="w-5 h-5 text-accent-green"></i> Synonyms
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        ${data.synonyms.map(s => `<span class="px-3 py-1.5 rounded-lg bg-accent-green/10 text-accent-green text-sm font-medium hover:bg-accent-green hover:text-white transition-colors cursor-pointer">${s}</span>`).join('')}
                    </div>
                </div>

                <!-- Antonyms -->
                <div class="glass-card rounded-2xl p-6">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i data-lucide="x-circle" class="w-5 h-5 text-accent-red"></i> Antonyms
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        ${data.antonyms.map(a => `<span class="px-3 py-1.5 rounded-lg bg-accent-red/10 text-accent-red text-sm font-medium hover:bg-accent-red hover:text-white transition-colors cursor-pointer">${a}</span>`).join('')}
                    </div>
                </div>

                <!-- Collocations -->
                <div class="glass-card rounded-2xl p-6">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i data-lucide="link" class="w-5 h-5 text-accent-cyan"></i> Collocations
                    </h3>
                    <ul class="space-y-2">
                        ${data.collocations.map(c => `<li class="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-accent-cyan"></i> ${c}</li>`).join('')}
                    </ul>
                </div>

                <!-- Word Family -->
                <div class="glass-card rounded-2xl p-6">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i data-lucide="git-branch" class="w-5 h-5 text-accent-purple"></i> Word Family
                    </h3>
                    <ul class="space-y-2">
                        ${data.wordFamily.map(w => `<li class="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"><i data-lucide="chevron-right" class="w-3 h-3 text-accent-purple"></i> ${w}</li>`).join('')}
                    </ul>
                </div>
            </div>

        </div>
        `;
    },

    init: () => {
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Audio Logic (Using Web Speech API for demo)
        const playBtn = document.getElementById('play-normal-btn');
        const slowBtn = document.getElementById('play-slow-btn');
        const word = document.querySelector('h1').textContent;

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                const utterance = new SpeechSynthesisUtterance(word);
                utterance.rate = 1.0;
                utterance.lang = 'en-US';
                speechSynthesis.speak(utterance);
                
                // Visual feedback
                playBtn.classList.add('scale-90');
                setTimeout(() => playBtn.classList.remove('scale-90'), 200);
            });
        }

        if (slowBtn) {
            slowBtn.addEventListener('click', () => {
                const utterance = new SpeechSynthesisUtterance(word);
                utterance.rate = 0.6;
                utterance.lang = 'en-US';
                speechSynthesis.speak(utterance);
            });
        }

        // Record Button Placeholder
        const recordBtn = document.getElementById('record-btn');
        if (recordBtn) {
            recordBtn.addEventListener('click', () => {
                Utils.showToast('Microphone access required for AI analysis.', 'info');
            });
        }

        // Bookmark Toggle
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => {
                const icon = bookmarkBtn.querySelector('svg, i');
                const isSaved = bookmarkBtn.classList.contains('bg-accent-orange/10');
                if (isSaved) {
                    bookmarkBtn.classList.remove('bg-accent-orange/10', 'text-accent-orange');
                    Utils.showToast('Removed from bookmarks', 'info');
                } else {
                    bookmarkBtn.classList.add('bg-accent-orange/10', 'text-accent-orange');
                    Utils.showToast('Word saved to bookmarks!', 'success');
                }
            });
        }

        // GSAP Animation
        if (typeof gsap !== 'undefined') {
            gsap.from('.gsap-word-fade > *', {
                y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
            });
        }
    }
};
