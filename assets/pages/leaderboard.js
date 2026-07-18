/**
 * FluentMind - Leaderboard & Achievements Page
 * Premium gamification UI with rankings, badges, and stats.
 */

const LeaderboardPage = {
    render: async () => {
        const userStats = await Gamification.initUserProgress();
        const leaderboard = await Gamification.getLeaderboard();
        
        const nextLevelXP = Math.pow(userStats.level, 2) * 100;
        const currentLevelXP = Math.pow(userStats.level - 1, 2) * 100;
        const progressToNext = ((userStats.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

        return `
        <div class="space-y-8 pb-12 gsap-leader-fade">
            <div>
                <h1 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <i data-lucide="trophy" class="w-8 h-8 text-accent-orange"></i>
                    Leaderboard & Achievements
                </h1>
                <p class="text-gray-500 dark:text-gray-400 mt-1">Compete with learners worldwide and unlock exclusive badges</p>
            </div>

            <!-- User Stats Summary -->
            <div class="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div class="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    
                    <!-- Avatar & Rank -->
                    <div class="flex items-center gap-6">
                        <div class="relative">
                            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-accent-blue/20">
                                AO
                            </div>
                            <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent-orange flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-dark-bg shadow-lg">
                                #${leaderboard.find(u => u.isCurrentUser)?.rank || '-'}
                            </div>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Abhay Ojha</h2>
                            <p class="text-accent-blue font-semibold">Level ${userStats.level} • ${Utils.formatNumber(userStats.xp)} XP</p>
                        </div>
                    </div>

                    <!-- Progress Bar -->
                    <div class="flex-1 w-full">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Progress to Level ${userStats.level + 1}</span>
                            <span class="text-sm font-bold text-gray-900 dark:text-white">${Math.round(progressToNext)}%</span>
                        </div>
                        <div class="w-full h-3 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full transition-all duration-1000" style="width: ${progressToNext}%"></div>
                        </div>
                        <div class="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
                            <span>${Utils.formatNumber(currentLevelXP)} XP</span>
                            <span>${Utils.formatNumber(nextLevelXP)} XP</span>
                        </div>
                    </div>

                    <!-- Quick Stats -->
                    <div class="grid grid-cols-3 gap-4 md:gap-6 text-center">
                        <div>
                            <div class="text-2xl font-bold text-accent-orange flex items-center justify-center gap-1"><i data-lucide="flame" class="w-5 h-5"></i> ${userStats.streak}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Day Streak</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-accent-green">${userStats.wordsLearned}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Words</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-accent-purple">${userStats.badges.length}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Badges</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <!-- Global Leaderboard -->
                <div class="lg:col-span-2 glass-card rounded-2xl p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i data-lucide="globe" class="w-5 h-5 text-accent-blue"></i> Global Rankings
                        </h3>
                        <select class="text-xs font-medium bg-gray-100 dark:bg-white/5 border-none rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-accent-blue">
                            <option>This Week</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    
                    <div class="space-y-3">
                        ${leaderboard.map(user => `
                            <div class="flex items-center gap-4 p-3 rounded-xl ${user.isCurrentUser ? 'bg-accent-blue/5 border border-accent-blue/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'} transition-colors">
                                <div class="w-8 text-center font-bold ${user.rank <= 3 ? 'text-accent-orange' : 'text-gray-500 dark:text-gray-400'}">
                                    ${user.rank <= 3 ? `<i data-lucide="${user.rank === 1 ? 'crown' : user.rank === 2 ? 'medal' : 'award'}" class="w-5 h-5 inline"></i>` : `#${user.rank}`}
                                </div>
                                <div class="w-10 h-10 rounded-full bg-gradient-to-br ${user.isCurrentUser ? 'from-accent-blue to-accent-purple' : 'from-gray-200 to-gray-300 dark:from-white/10 dark:to-white/5'} flex items-center justify-center text-xs font-bold ${user.isCurrentUser ? 'text-white' : 'text-gray-700 dark:text-gray-300'}">
                                    ${user.avatar}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="font-semibold text-gray-900 dark:text-white truncate ${user.isCurrentUser ? 'text-accent-blue' : ''}">${user.name}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">Level ${user.level}</div>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-gray-900 dark:text-white">${Utils.formatNumber(user.xp)}</div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">XP</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Achievements / Badges -->
                <div class="glass-card rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <i data-lucide="award" class="w-5 h-5 text-accent-purple"></i> Badges
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${Object.entries(Gamification.BADGES).map(([id, badge]) => {
                            const isUnlocked = userStats.badges.includes(id);
                            return `
                            <div class="flex flex-col items-center p-4 rounded-xl ${isUnlocked ? 'bg-accent-purple/5 border border-accent-purple/20' : 'bg-gray-50 dark:bg-white/5 opacity-60'} text-center transition-all hover:scale-105 cursor-pointer group">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2 ${isUnlocked ? 'bg-accent-purple/20' : 'bg-gray-200 dark:bg-white/10'} group-hover:scale-110 transition-transform">
                                    <i data-lucide="${badge.icon}" class="w-6 h-6 ${isUnlocked ? 'text-accent-purple' : 'text-gray-400 dark:text-gray-600'}"></i>
                                </div>
                                <span class="text-xs font-bold ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}">${badge.name}</span>
                                <span class="text-[10px] text-gray-500 dark:text-gray-500 mt-1 leading-tight">${badge.desc}</span>
                                ${!isUnlocked ? '<i data-lucide="lock" class="w-3 h-3 text-gray-400 mt-2"></i>' : ''}
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    init: () => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (typeof gsap !== 'undefined') {
            gsap.from('.gsap-leader-fade > *', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        }
    }
};