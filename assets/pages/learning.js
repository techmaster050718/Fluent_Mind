/**
 * FluentMind - Learning Modes Page
 * Interactive Flashcards, Quizzes, and Typing Practice with premium animations.
 */

const LearningPage = {
    currentMode: 'hub',
    flashcardIndex: 0,
    flashcardData: [
        { word: 'Ephemeral', definition: 'Lasting for a very short time.', hindi: 'क्षणिक; अल्पकालिक', example: 'Fashions are ephemeral.' },
        { word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere.', hindi: 'सर्वव्यापक', example: 'His ubiquitous influence.' },
        { word: 'Pragmatic', definition: 'Dealing with things sensibly and realistically.', hindi: 'व्यावहारिक', example: 'A pragmatic approach.' },
        { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing.', hindi: 'वाक्पटु', example: 'An eloquent speech.' }
    ],
    quizData: [
        { question: 'What is the meaning of "Serendipity"?', options: ['Bad luck', 'Happy accident', 'Anger', 'Sadness'], correct: 1 },
        { question: 'Choose the synonym for "Ephemeral":', options: ['Eternal', 'Transient', 'Solid', 'Heavy'], correct: 1 },
        { question: 'What part of speech is "Pragmatic"?', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], correct: 2 }
    ],
    quizIndex: 0,
    quizScore: 0,
    libraryLoaded: false,

    render: () => {
        if (LearningPage.currentMode === 'flashcards') return LearningPage.renderFlashcards();
        if (LearningPage.currentMode === 'quiz') return LearningPage.renderQuiz();
        return LearningPage.renderHub();
    },

    renderHub: () => {
        const modes = [
            { id: 'flashcards', title: 'Flashcards', desc: 'Flip through cards from your complete vocabulary library.', icon: 'layers', color: 'blue', count: LearningPage.flashcardData.length },
            { id: 'quiz', title: 'Quick Quiz', desc: 'Test your knowledge with questions generated from your vocabulary.', icon: 'help-circle', color: 'purple', count: LearningPage.quizData.length },
            { id: 'typing', title: 'Typing Practice', desc: 'Improve spelling and muscle memory by typing words.', icon: 'keyboard', color: 'cyan', count: '2,100' },
            { id: 'listening', title: 'Listening Drill', desc: 'Listen to audio and identify the correct word.', icon: 'headphones', color: 'green', count: '600' },
            { id: 'rapid', title: 'Rapid Fire', desc: 'Fast-paced challenges to test your reflexes.', icon: 'zap', color: 'orange', count: '300' },
            { id: 'weak', title: 'Weak Words', desc: 'Focus on words you previously struggled with.', icon: 'target', color: 'red', count: '45' }
        ];

        return `
        <div class="space-y-8 pb-12 gsap-learning-fade">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Learning Modes</h1>
                    <p class="text-gray-500 dark:text-gray-400 mt-1">Choose a mode to start your practice session</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="px-4 py-2 rounded-xl glass-card flex items-center gap-2">
                        <i data-lucide="flame" class="w-5 h-5 text-accent-orange"></i>
                        <span class="font-bold text-gray-900 dark:text-white">14 Day Streak</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${modes.map(mode => `
                <button onclick="LearningPage.startMode('${mode.id}')" class="group glass-card rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-accent-${mode.color}/5 hover:border-accent-${mode.color}/30 transition-all duration-300 relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-accent-${mode.color}/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                    <div class="relative z-10">
                        <div class="w-12 h-12 rounded-xl bg-accent-${mode.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="${mode.icon}" class="w-6 h-6 text-accent-${mode.color}"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${mode.title}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">${mode.desc}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-gray-500 dark:text-gray-500">${mode.count} items</span>
                            <span class="flex items-center gap-1 text-sm font-semibold text-accent-${mode.color} group-hover:gap-2 transition-all">
                                Start <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </span>
                        </div>
                    </div>
                </button>
                `).join('')}
            </div>
        </div>
        `;
    },

    renderFlashcards: () => {
        const card = LearningPage.flashcardData[LearningPage.flashcardIndex];
        const progress = ((LearningPage.flashcardIndex + 1) / LearningPage.flashcardData.length) * 100;

        return `
        <div class="max-w-2xl mx-auto space-y-8 pb-12">
            <div class="flex items-center justify-between">
                <button onclick="LearningPage.setMode('hub')" class="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-accent-blue transition-colors">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
                </button>
                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400">${LearningPage.flashcardIndex + 1} / ${LearningPage.flashcardData.length}</span>
            </div>

            <div class="w-full h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500" style="width: ${progress}%"></div>
            </div>

            <div class="perspective-1000 h-80 sm:h-96 cursor-pointer" onclick="LearningPage.flipCard()">
                <div id="flashcard-inner" class="relative w-full h-full transition-transform duration-700" style="transform-style: preserve-3d;">
                    <!-- Front -->
                    <div class="absolute inset-0 glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl" style="backface-visibility: hidden;">
                        <span class="text-xs font-bold text-accent-blue uppercase tracking-widest mb-4">Word</span>
                        <h2 class="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">${card.word}</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <i data-lucide="mouse-pointer-click" class="w-4 h-4"></i> Tap to reveal definition
                        </p>
                    </div>
                    <!-- Back -->
                    <div class="absolute inset-0 glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl bg-gradient-to-br from-accent-blue/5 to-accent-purple/5" style="backface-visibility: hidden; transform: rotateY(180deg);">
                        <span class="text-xs font-bold text-accent-purple uppercase tracking-widest mb-4">Definition</span>
                        <p class="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white mb-4 leading-relaxed">${card.definition}</p>
                        <p class="text-base text-accent-orange font-medium mb-6">${card.hindi}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 italic">"${card.example}"</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center gap-4">
                <button onclick="LearningPage.prevCard()" class="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <i data-lucide="chevron-left" class="w-6 h-6 text-gray-600 dark:text-gray-400"></i>
                </button>
                <button onclick="LearningPage.markCard('hard')" class="px-6 py-3 rounded-xl bg-accent-red/10 text-accent-red font-semibold hover:bg-accent-red hover:text-white transition-all">Hard</button>
                <button onclick="LearningPage.markCard('good')" class="px-6 py-3 rounded-xl bg-accent-green/10 text-accent-green font-semibold hover:bg-accent-green hover:text-white transition-all">Good</button>
                <button onclick="LearningPage.markCard('easy')" class="px-6 py-3 rounded-xl bg-accent-blue/10 text-accent-blue font-semibold hover:bg-accent-blue hover:text-white transition-all">Easy</button>
                <button onclick="LearningPage.nextCard()" class="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <i data-lucide="chevron-right" class="w-6 h-6 text-gray-600 dark:text-gray-400"></i>
                </button>
            </div>
        </div>
        `;
    },

    renderQuiz: () => {
        if (LearningPage.quizIndex >= LearningPage.quizData.length) {
            return `
            <div class="max-w-2xl mx-auto text-center space-y-8 py-12">
                <div class="w-24 h-24 mx-auto rounded-full bg-accent-green/10 flex items-center justify-center">
                    <i data-lucide="trophy" class="w-12 h-12 text-accent-green"></i>
                </div>
                <h2 class="font-display text-3xl font-bold text-gray-900 dark:text-white">Quiz Complete!</h2>
                <p class="text-xl text-gray-600 dark:text-gray-400">You scored <span class="font-bold text-accent-blue">${LearningPage.quizScore}</span> out of <span class="font-bold">${LearningPage.quizData.length}</span></p>
                <button onclick="LearningPage.resetQuiz()" class="px-8 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20">Try Again</button>
            </div>
            `;
        }

        const q = LearningPage.quizData[LearningPage.quizIndex];
        const progress = ((LearningPage.quizIndex) / LearningPage.quizData.length) * 100;

        return `
        <div class="max-w-2xl mx-auto space-y-8 pb-12">
            <div class="flex items-center justify-between">
                <button onclick="LearningPage.setMode('hub')" class="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-accent-blue transition-colors">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
                </button>
                <span class="text-sm font-semibold text-gray-500 dark:text-gray-400">Question ${LearningPage.quizIndex + 1} / ${LearningPage.quizData.length}</span>
            </div>

            <div class="w-full h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-500" style="width: ${progress}%"></div>
            </div>

            <div class="glass-card rounded-3xl p-8 text-center">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">${q.question}</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="quiz-options">
                    ${q.options.map((opt, i) => `
                    <button onclick="LearningPage.selectAnswer(${i})" class="quiz-option p-4 rounded-xl border-2 border-gray-200 dark:border-white/10 hover:border-accent-blue dark:hover:border-accent-blue text-left font-medium text-gray-700 dark:text-gray-300 transition-all hover:shadow-lg group">
                        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-bold mr-3 group-hover:bg-accent-blue group-hover:text-white transition-colors">${String.fromCharCode(65 + i)}</span>
                        ${opt}
                    </button>
                    `).join('')}
                </div>
            </div>
        </div>
        `;
    },

    // --- Actions ---
    setMode: (mode) => {
        LearningPage.currentMode = mode;
        document.getElementById('main-content').innerHTML = LearningPage.render();
        LearningPage.init();
    },
    startMode: (mode) => LearningPage.setMode(mode),
    
    flipCard: () => {
        const inner = document.getElementById('flashcard-inner');
        if (inner) {
            const isFlipped = inner.style.transform === 'rotateY(180deg)';
            inner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
        }
    },
    nextCard: () => {
        if (LearningPage.flashcardIndex < LearningPage.flashcardData.length - 1) {
            LearningPage.flashcardIndex++;
            LearningPage.setMode('flashcards');
        }
    },
    prevCard: () => {
        if (LearningPage.flashcardIndex > 0) {
            LearningPage.flashcardIndex--;
            LearningPage.setMode('flashcards');
        }
    },
    markCard: (difficulty) => {
        Utils.showToast(`Marked as ${difficulty}! +10 XP`, 'success');
        LearningPage.nextCard();
    },

    selectAnswer: (index) => {
        const q = LearningPage.quizData[LearningPage.quizIndex];
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((opt, i) => {
            opt.disabled = true;
            if (i === q.correct) {
                opt.classList.add('border-accent-green', 'bg-accent-green/10', 'text-accent-green');
            } else if (i === index && i !== q.correct) {
                opt.classList.add('border-accent-red', 'bg-accent-red/10', 'text-accent-red');
            }
        });

        if (index === q.correct) LearningPage.quizScore++;

        setTimeout(() => {
            LearningPage.quizIndex++;
            LearningPage.setMode('quiz');
        }, 1200);
    },
    resetQuiz: () => {
        LearningPage.quizIndex = 0;
        LearningPage.quizScore = 0;
        LearningPage.setMode('quiz');
    },

    init: async () => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (!LearningPage.libraryLoaded) {
            const words = await DB.getAll(DB.stores.words);
            const fallbackWords = typeof getBuiltInWords === 'function' ? getBuiltInWords() : [];
            const sourceWords = words.length ? words : fallbackWords;
            if (sourceWords.length) {
                LearningPage.flashcardData = sourceWords.map(word => ({
                    word: word.word,
                    definition: word.englishMeaning,
                    hindi: word.hindiMeaning,
                    example: word.examples?.[0]?.en || `Use “${word.word}” in a sentence.`
                }));
                LearningPage.quizData = sourceWords.slice(0, 12).map((word, index) => {
                    const alternatives = sourceWords.filter(item => item.id !== word.id).slice(index + 1, index + 4);
                    const options = [word.easyEnglishMeaning || word.englishMeaning, ...alternatives.map(item => item.easyEnglishMeaning || item.englishMeaning)];
                    return { question: `What is the meaning of “${word.word}”?`, options, correct: 0 };
                });
                LearningPage.libraryLoaded = true;
            }
        }
        if (typeof gsap !== 'undefined') {
            gsap.from('.gsap-learning-fade > *', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        }
    }
};
