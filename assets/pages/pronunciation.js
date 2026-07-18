/**
 * FluentMind - Pronunciation AI Page
 * Real-time audio visualizer, recording states, and phoneme feedback.
 */

const PronunciationPage = {
    state: 'idle', // idle, recording, analyzing, result
    visualizerAnim: null,
    targetWord: 'Accountable',
    targetPronunciation: '/əˈkaʊn.tə.bəl/',
    targetSyllables: ['ac', 'count', 'a', 'ble'],
    practiceWords: [],
    currentWordIndex: 0,
    phonemes: [
        { text: 'ac', score: 95, status: 'good' },
        { text: 'count', score: 88, status: 'good' },
        { text: 'a', score: 65, status: 'warn' },
        { text: 'ble', score: 92, status: 'good' }
    ],

    render: () => {
        return `
        <div class="max-w-4xl mx-auto space-y-8 pb-12 gsap-pron-fade">
            <div>
                <h1 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Pronunciation AI</h1>
                <p class="text-gray-500 dark:text-gray-400 mt-1">Record your voice and get instant, phoneme-level feedback</p>
            </div>

            <!-- Target Word Card -->
            <div class="glass-card rounded-3xl p-8 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5"></div>
                <div class="relative z-10">
                    <span class="text-xs font-bold text-accent-blue uppercase tracking-widest mb-2 block">Practice Word</span>
                    <h2 class="font-display text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4">${PronunciationPage.targetWord}</h2>
                    <p class="text-lg text-gray-500 dark:text-gray-400 font-mono mb-2">${PronunciationPage.targetPronunciation}</p>
                    <p class="text-xl text-accent-purple font-semibold mb-6 tracking-widest">${(PronunciationPage.targetSyllables || []).join(' • ')}</p>
                    <label class="sr-only" for="practice-word-select">Choose a practice word</label>
                    <select id="practice-word-select" class="mb-6 w-full max-w-xs px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-card/80 border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-200 outline-none focus:border-accent-blue">
                        <option>Loading practice words…</option>
                    </select>
                    
                    <button onclick="PronunciationPage.playTargetAudio()" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-dark-card shadow-lg hover:shadow-xl transition-all text-gray-700 dark:text-gray-200 font-medium">
                        <i data-lucide="volume-2" class="w-5 h-5 text-accent-blue"></i> Listen to Native
                    </button>
                </div>
            </div>

            <!-- Visualizer & Mic Area -->
            <div class="glass-card rounded-3xl p-8 flex flex-col items-center">
                <div class="w-full h-32 sm:h-40 relative mb-8">
                    <canvas id="audio-visualizer" class="w-full h-full rounded-2xl"></canvas>
                    <div id="visualizer-overlay" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span id="visualizer-status" class="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-dark-card/80 px-4 py-2 rounded-full backdrop-blur-sm">Ready to record</span>
                    </div>
                </div>

                <button id="mic-btn" onclick="PronunciationPage.toggleRecording()" class="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent-red to-accent-orange shadow-2xl shadow-accent-red/30 flex items-center justify-center hover:scale-105 transition-transform group">
                    <i data-lucide="mic" class="w-10 h-10 text-white"></i>
                    <span class="absolute inset-0 rounded-full bg-accent-red/20 animate-ping opacity-0 group-hover:opacity-100"></span>
                </button>
                <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Tap to start recording</p>
            </div>

            <!-- Results Area (Hidden by default) -->
            <div id="results-area" class="hidden space-y-6">
                <!-- Score -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div class="glass-card rounded-2xl p-6 text-center">
                        <div class="text-3xl font-bold text-accent-green mb-1">88%</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Overall Accuracy</div>
                    </div>
                    <div class="glass-card rounded-2xl p-6 text-center">
                        <div class="text-3xl font-bold text-accent-blue mb-1">92%</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Confidence Score</div>
                    </div>
                    <div class="glass-card rounded-2xl p-6 text-center">
                        <div class="text-3xl font-bold text-accent-purple mb-1">+25</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">XP Earned</div>
                    </div>
                </div>

                <!-- Phoneme Breakdown -->
                <div class="glass-card rounded-2xl p-6">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i data-lucide="audio-waveform" class="w-5 h-5 text-accent-cyan"></i> Phoneme Analysis
                    </h3>
                    <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                        ${PronunciationPage.phonemes.map(p => {
                            const colors = {
                                good: 'bg-accent-green/10 text-accent-green border-accent-green/30',
                                warn: 'bg-accent-orange/10 text-accent-orange border-accent-orange/30',
                                bad: 'bg-accent-red/10 text-accent-red border-accent-red/30'
                            };
                            return `
                            <div class="flex flex-col items-center p-3 rounded-xl border ${colors[p.status]} transition-all hover:scale-105 cursor-pointer">
                                <span class="text-xl font-bold font-mono">${p.text}</span>
                                <span class="text-xs font-semibold mt-1">${p.score}%</span>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Tips -->
                <div class="glass-card rounded-2xl p-6 border-l-4 border-accent-orange">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <i data-lucide="lightbulb" class="w-5 h-5 text-accent-orange"></i> Speaking Tips
                    </h3>
                    <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0"></i> Great job on the first two syllables! Your stress pattern is very natural.</li>
                        <li class="flex items-start gap-2"><i data-lucide="alert-circle" class="w-4 h-4 text-accent-orange mt-0.5 flex-shrink-0"></i> On "dip", try opening your mouth slightly wider for the short 'i' sound.</li>
                        <li class="flex items-start gap-2"><i data-lucide="alert-circle" class="w-4 h-4 text-accent-red mt-0.5 flex-shrink-0"></i> The ending "ty" sounds a bit flat. Ensure your tongue touches the roof of your mouth for the 't'.</li>
                    </ul>
                </div>

                <div class="flex justify-center gap-4">
                    <button onclick="PronunciationPage.resetState()" class="px-8 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20 flex items-center gap-2">
                        <i data-lucide="rotate-ccw" class="w-5 h-5"></i> Try Again
                    </button>
                    <button onclick="PronunciationPage.nextWord()" class="px-8 py-3 rounded-xl glass-card text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center gap-2">
                        Next Word <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    },

    init: async () => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (!PronunciationPage.practiceWords.length) {
            const words = await DB.getAll(DB.stores.words);
            const fallbackWords = typeof getBuiltInWords === 'function' ? getBuiltInWords() : [];
            PronunciationPage.practiceWords = (words.length ? words : fallbackWords).filter(word => word.syllables?.length && word.pronunciation);
        }
        const select = document.getElementById('practice-word-select');
        if (select && PronunciationPage.practiceWords.length) {
            select.innerHTML = PronunciationPage.practiceWords.map((word, index) =>
                `<option value="${index}">${word.word}</option>`
            ).join('');
            select.value = String(PronunciationPage.currentWordIndex);
            select.addEventListener('change', event => PronunciationPage.setPracticeWord(Number(event.target.value)));
        }
        PronunciationPage.initVisualizer();
        
        if (typeof gsap !== 'undefined') {
            gsap.from('.gsap-pron-fade > *', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        }
    },

    initVisualizer: () => {
        const canvas = document.getElementById('audio-visualizer');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const bars = 64;
        const barWidth = canvas.offsetWidth / bars;
        let phases = Array.from({ length: bars }, () => Math.random() * Math.PI * 2);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            const centerY = canvas.offsetHeight / 2;

            for (let i = 0; i < bars; i++) {
                const x = i * barWidth;
                let amplitude = 10; // Idle state
                
                if (PronunciationPage.state === 'recording') {
                    // Simulate audio data with sine waves
                    amplitude = 20 + Math.sin(phases[i]) * 40 + Math.random() * 20;
                    phases[i] += 0.15;
                }

                const gradient = ctx.createLinearGradient(0, centerY - amplitude, 0, centerY + amplitude);
                gradient.addColorStop(0, '#4F8CFF');
                gradient.addColorStop(0.5, '#8B5CF6');
                gradient.addColorStop(1, '#00D4FF');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(x + 2, centerY - amplitude, barWidth - 4, amplitude * 2, 4);
                ctx.fill();
            }

            PronunciationPage.visualizerAnim = requestAnimationFrame(draw);
        };
        draw();
    },

    toggleRecording: () => {
        if (PronunciationPage.state === 'idle') {
            PronunciationPage.state = 'recording';
            document.getElementById('visualizer-status').textContent = 'Listening...';
            document.getElementById('mic-btn').classList.add('ring-4', 'ring-accent-red/30', 'scale-110');
            
            // Simulate recording for 3 seconds
            setTimeout(() => {
                PronunciationPage.state = 'analyzing';
                document.getElementById('visualizer-status').textContent = 'Analyzing...';
                document.getElementById('mic-btn').classList.remove('ring-4', 'ring-accent-red/30', 'scale-110');
                
                setTimeout(() => {
                    PronunciationPage.state = 'result';
                    document.getElementById('results-area').classList.remove('hidden');
                    document.getElementById('visualizer-status').textContent = 'Analysis Complete';
                    Utils.showToast('Great job! +25 XP', 'success');
                }, 1500);
            }, 3000);
        }
    },

    resetState: () => {
        PronunciationPage.state = 'idle';
        document.getElementById('results-area').classList.add('hidden');
        document.getElementById('visualizer-status').textContent = 'Ready to record';
    },

    nextWord: () => {
        if (!PronunciationPage.practiceWords.length) return;
        PronunciationPage.setPracticeWord((PronunciationPage.currentWordIndex + 1) % PronunciationPage.practiceWords.length);
    },

    setPracticeWord: (index) => {
        const safeIndex = Number.isInteger(index) ? index : 0;
        const fallbackIndex = safeIndex >= 0 && safeIndex < PronunciationPage.practiceWords.length ? safeIndex : 0;
        PronunciationPage.currentWordIndex = fallbackIndex;
        const word = PronunciationPage.practiceWords[fallbackIndex] || PronunciationPage.practiceWords[0];
        if (!word) return;
        PronunciationPage.targetWord = word.word || 'Accountable';
        PronunciationPage.targetPronunciation = word.pronunciation || '/əˈkaʊn.tə.bəl/';
        
        const syllables = Array.isArray(word.syllables) && word.syllables.length ? word.syllables : [word.word.toLowerCase()];
        PronunciationPage.targetSyllables = syllables;
        
        PronunciationPage.phonemes = syllables.map((text, idx) => ({ text, score: 82 + (idx % 3) * 5, status: idx % 3 === 2 ? 'warn' : 'good' }));
        cancelAnimationFrame(PronunciationPage.visualizerAnim);
        document.getElementById('main-content').innerHTML = PronunciationPage.render();
        PronunciationPage.init();
    },

    playTargetAudio: () => {
        const utterance = new SpeechSynthesisUtterance(PronunciationPage.targetWord);
        utterance.rate = 0.9;
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
};
