/**
 * FluentMind - Dashboard Page
 * Premium analytics, streaks, heatmaps, and progress tracking.
 * Uses custom SVG charts for zero-dependency, high-performance rendering.
 */

const DashboardPage = {
    // Mock data for demonstration (Seamlessly replaced by DB in Part 7)
    mockData: {
        stats: {
            xp: 1250,
            wordsLearned: 342,
            accuracy: 88,
            timeSpent: 45
        },
        dailyGoal: { current: 35, target: 50 },
        continueLearning: [
            { word: 'Serendipity', progress: 60, type: 'Flashcards', icon: 'layers' },
            { word: 'Ephemeral', progress: 20, type: 'Pronunciation', icon: 'mic' },
            { word: 'Ubiquitous', progress: 85, type: 'Quiz', icon: 'help-circle' }
        ],
        weeklyProgress: [
            { day: 'Mon', xp: 40 }, { day: 'Tue', xp: 65 }, { day: 'Wed', xp: 30 },
            { day: 'Thu', xp: 80 }, { day: 'Fri', xp: 50 }, { day: 'Sat', xp: 35 }, { day: 'Sun', xp: 0 }
        ],
        achievements: [
            { name: 'First Steps', icon: 'rocket', unlocked: true, color: 'text-accent-blue' },
            { name: 'Word Smith', icon: 'book-text', unlocked: true, color: 'text-accent-purple' },
            { name: 'Streak Master', icon: 'flame', unlocked: true, color: 'text-accent-orange' },
            { name: 'Polyglot', icon: 'languages', unlocked: false, color: 'text-gray-400' },
            { name: 'Perfectionist', icon: 'target', unlocked: false, color: 'text-gray-400' },
            { name: 'Century', icon: 'award', unlocked: false, color: 'text-gray-400' }
        ]
    },

    render: () => {
        const data = DashboardPage.mockData;
        const formattedDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // 1. Generate Heatmap (52 weeks x 7 days)
        const generateHeatmap = () => {
            let html = '<div class="flex gap-1.5 overflow-x-auto pb-2 -mx-2 px-2">';
            for (let w = 0; w < 52; w++) {
                html += '<div class="flex flex-col gap-1.5">';
                for (let d = 0; d < 7; d++) {
                    const intensity = Math.floor(Math.random() * 5);
                    const colors = [
                        'bg-gray-100 dark:bg-white/5',
                        'bg-accent-green/20 dark:bg-accent-green/20',
                        'bg-accent-green/40 dark:bg-accent-green/40',
                        'bg-accent-green/60 dark:bg-accent-green/60',
                        'bg-accent-green dark:bg-accent-green'
                    ];
                    html += `<div class="w-3 h-3 rounded-sm ${colors[intensity]} transition-all hover:scale-125 hover:ring-2 hover:ring-accent-blue/50 cursor-pointer" title="Week ${w+1}, Day ${d+1}"></div>`;
                }
                html += '</div>';
            }
            html += '</div>';
            return html;
        };

        // 2. Generate Weekly Bar Chart (Custom SVG/CSS)
        const generateWeeklyChart = () => {
            const maxVal = Math.max(...data.weeklyProgress.map(d => d.xp), 1);
            let barsHtml = data.weeklyProgress.map((d, i) => {
                const heightPercent = (d.xp / maxVal) * 100;
                return `
                <div class="flex flex-col items-center gap-2 flex-1 group">
                    <div class="w-full flex flex-col justify-end h-32 relative">
                        <div class="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 rounded-lg bg-dark-card dark:bg-white text-white dark:text-dark-bg text-xs font-bold whitespace-nowrap shadow-lg z-10 transition-all">
                            ${d.xp} XP
                        </div>
                        <div class="w-full rounded-t-lg bg-gradient-to-t from-accent-blue to-accent-cyan transition-all duration-1000 ease-out chart-bar relative overflow-hidden" 
                             style="height: 0%;" 
                             data-height="${heightPercent}%">
                            <div class="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${d.day}</span>
                </div>
                `;
            }).join('');
            return `<div class="flex items-end gap-2 sm:gap-4 h-40">${barsHtml}</div>`;
        };

        // 3. Generate Circular Progress Ring
        const generateCircularProgress = (current, target) => {
            const percent = Math.min((current / target) * 100, 100);
            const circumference = 2 * Math.PI * 40;
            const offset = circumference - (percent / 100) * circumference;
            
            return `
            <div class="relative w-32 h-32 mx-auto">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8" class="text-gray-200 dark:text-white/5" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#goal-gradient)" stroke-width="8" stroke-linecap="round" 
                            stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" 
                            class="transition-all duration-1000 ease-out circular-progress" data-offset="${offset}" />
                    <defs>
                        <linearGradient id="goal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#34D399" />
                            <stop offset="100%" stop-color="#00D4FF" />
                        </linearGradient>
                    </defs>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-2xl font-bold text-gray-900 dark:text-white">${current}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">/ ${target} XP</span>
                </div>
            </div>
            `;
        };

        // 4. Generate Continue Learning List
        const continueLearningHtml = data.continueLearning.map(item => `
            <button type="button" data-dashboard-route="#/learning" class="dashboard-continue w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer text-left">
                <div class="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i data-lucide="${item.icon}" class="w-5 h-5 text-accent-blue"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">${item.word}</span>
                        <span class="text-xs font-bold text-accent-blue ml-2">${item.progress}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full transition-all duration-1000" style="width: ${item.progress}%"></div>
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">${item.type}</span>
                </div>
                <span class="p-2 rounded-lg bg-accent-blue text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 shadow-lg shadow-accent-blue/20" aria-hidden="true">
                    <i data-lucide="play" class="w-4 h-4"></i>
                </span>
            </button>
        `).join('');

        // 5. Generate Achievements Grid
        const achievementsHtml = data.achievements.map(badge => `
            <button type="button" data-achievement="${badge.name}" class="dashboard-achievement flex flex-col items-center p-3 rounded-xl ${badge.unlocked ? 'glass-card' : 'bg-gray-50 dark:bg-white/2'} transition-all hover:scale-105 cursor-pointer group">
                <div class="w-10 h-10 rounded-full flex items-center justify-center mb-2 ${badge.unlocked ? 'bg-accent-blue/10' : 'bg-gray-200 dark:bg-white/5'} transition-colors">
                    <i data-lucide="${badge.icon}" class="w-5 h-5 ${badge.unlocked ? badge.color : 'text-gray-400 dark:text-gray-600'}"></i>
                </div>
                <span class="text-[10px] font-medium text-center ${badge.unlocked ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}">${badge.name}</span>
                ${!badge.unlocked ? '<i data-lucide="lock" class="w-3 h-3 text-gray-400 mt-1"></i>' : ''}
            </button>
        `).join('');

        return `
        <div class="space-y-8 pb-12 gsap-dashboard-fade">
            
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Welcome back, Abhay 👋</h1>
                    <p class="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">${formattedDate} • Let's keep your streak alive!</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-accent-orange/20">
                        <i data-lucide="flame" class="w-5 h-5 text-accent-orange"></i>
                        <span class="font-bold text-gray-900 dark:text-white">14</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">Day Streak</span>
                    </div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                ${[
                    { label: 'Total XP', value: data.stats.xp, icon: 'zap', color: 'text-accent-orange', bg: 'bg-accent-orange/10', trend: '+12%', route: '#/leaderboard' },
                    { label: 'Words Learned', value: data.stats.wordsLearned, icon: 'book-open', color: 'text-accent-blue', bg: 'bg-accent-blue/10', trend: '+24', route: '#/vocabulary' },
                    { label: 'Accuracy', value: data.stats.accuracy + '%', icon: 'target', color: 'text-accent-green', bg: 'bg-accent-green/10', trend: '+2%', route: '#/pronunciation' },
                    { label: 'Time Spent', value: data.stats.timeSpent + 'h', icon: 'clock', color: 'text-accent-purple', bg: 'bg-accent-purple/10', trend: '+5h', route: '#/learning' }
                ].map(stat => `
                <button type="button" data-dashboard-route="${stat.route}" class="dashboard-stat w-full text-left glass-card rounded-2xl p-5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 group">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i data-lucide="${stat.icon}" class="w-5 h-5 ${stat.color}"></i>
                        </div>
                        <span class="text-xs font-semibold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-full">${stat.trend}</span>
                    </div>
                    <div class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">${stat.value}</div>
                    <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">${stat.label}</div>
                </button>
                `).join('')}
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Left Column (2/3 width) -->
                <div class="lg:col-span-2 space-y-6">
                    
                    <!-- Daily Goal & Continue Learning -->
                    <div class="glass-card rounded-2xl p-6">
                        <div class="flex flex-col sm:flex-row items-center gap-8">
                            <!-- Circular Progress -->
                            <div class="flex-shrink-0">
                                ${generateCircularProgress(data.dailyGoal.current, data.dailyGoal.target)}
                                <p class="text-center text-sm font-medium text-gray-600 dark:text-gray-400 mt-3">Daily Goal</p>
                            </div>
                            
                            <!-- Continue Learning List -->
                            <div class="flex-1 w-full">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="font-semibold text-gray-900 dark:text-white">Continue Learning</h3>
                                    <a href="#/learning" class="text-sm text-accent-blue hover:underline font-medium">View All</a>
                                </div>
                                <div class="space-y-2">
                                    ${continueLearningHtml}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Learning Heatmap -->
                    <div class="glass-card rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="font-semibold text-gray-900 dark:text-white">Learning Activity</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Your consistency over the past year</p>
                            </div>
                            <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span>Less</span>
                                <div class="flex gap-1">
                                    <div class="w-2.5 h-2.5 rounded-sm bg-gray-100 dark:bg-white/5"></div>
                                    <div class="w-2.5 h-2.5 rounded-sm bg-accent-green/20"></div>
                                    <div class="w-2.5 h-2.5 rounded-sm bg-accent-green/40"></div>
                                    <div class="w-2.5 h-2.5 rounded-sm bg-accent-green/60"></div>
                                    <div class="w-2.5 h-2.5 rounded-sm bg-accent-green"></div>
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                        ${generateHeatmap()}
                    </div>
                </div>

                <!-- Right Column (1/3 width) -->
                <div class="space-y-6">
                    
                    <!-- Weekly Progress Chart -->
                    <div class="glass-card rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="font-semibold text-gray-900 dark:text-white">Weekly Progress</h3>
                            <select class="text-xs font-medium bg-gray-100 dark:bg-white/5 border-none rounded-lg px-2 py-1 text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-accent-blue">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>
                        ${generateWeeklyChart()}
                    </div>

                    <!-- Achievements -->
                    <div class="glass-card rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold text-gray-900 dark:text-white">Achievements</h3>
                            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">3/6 Unlocked</span>
                        </div>
                        <div class="grid grid-cols-3 gap-3">
                            ${achievementsHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    init: () => {
        if (typeof lucide !== 'undefined') lucide.createIcons();

        document.querySelectorAll('[data-dashboard-route]').forEach(control => {
            control.addEventListener('click', () => window.location.hash = control.dataset.dashboardRoute);
        });
        document.querySelectorAll('.dashboard-achievement').forEach(control => {
            control.addEventListener('click', () => Utils.showToast(`${control.dataset.achievement}: keep practicing to unlock more progress.`, 'info'));
        });

        // Animate Weekly Chart Bars
        const bars = document.querySelectorAll('.chart-bar');
        setTimeout(() => {
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.height = bar.getAttribute('data-height');
                }, index * 100);
            });
        }, 300);

        // Animate Circular Progress
        const circle = document.querySelector('.circular-progress');
        if (circle) {
            setTimeout(() => {
                circle.style.strokeDashoffset = circle.getAttribute('data-offset');
            }, 300);
        }

        // GSAP Entrance Animations
        if (typeof gsap !== 'undefined') {
            gsap.from('.gsap-dashboard-fade > *', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    }
};
