/**
 * FluentMind - Gamification Engine
 * Handles XP, levels, streaks, and achievements.
 */

const Gamification = {
    BADGES: {
        first_word: { name: 'First Steps', icon: 'rocket', desc: 'Learn your first word', xpReq: 0 },
        word_smith: { name: 'Word Smith', icon: 'book-text', desc: 'Learn 50 words', xpReq: 500 },
        streak_3: { name: 'On Fire', icon: 'flame', desc: 'Maintain a 3-day streak', xpReq: 0 },
        streak_7: { name: 'Week Warrior', icon: 'flame', desc: 'Maintain a 7-day streak', xpReq: 0 },
        polyglot: { name: 'Polyglot', icon: 'languages', desc: 'Learn words in 5 categories', xpReq: 0 },
        perfectionist: { name: 'Perfectionist', icon: 'target', desc: 'Get 100% on a 20-question quiz', xpReq: 0 },
        century: { name: 'Century', icon: 'award', desc: 'Learn 100 words', xpReq: 1000 },
        master: { name: 'Fluent Master', icon: 'crown', desc: 'Reach Level 10', xpReq: 5000 }
    },

    /**
     * Initialize user progress in DB if it doesn't exist.
     */
    async initUserProgress() {
        const existing = await DB.getById(APP_CONFIG.database.stores.progress, 'userStats');
        if (!existing) {
            const defaultStats = {
                key: 'userStats',
                xp: 0,
                level: 1,
                coins: 0,
                streak: 0,
                lastActiveDate: null,
                wordsLearned: 0,
                quizzesTaken: 0,
                badges: ['first_word'],
                dailyGoal: APP_CONFIG.gamification.dailyGoal,
                todayXP: 0,
                history: [] // Array of { date: 'YYYY-MM-DD', xp: number }
            };
            await DB.put(APP_CONFIG.database.stores.progress, defaultStats);
            return defaultStats;
        }
        return existing;
    },

    /**
     * Add XP and handle level-ups.
     */
    async addXP(amount, reason = 'General Practice') {
        const stats = await this.initUserProgress();
        stats.xp += amount;
        stats.todayXP += amount;
        
        const newLevel = this.calculateLevel(stats.xp);
        const leveledUp = newLevel > stats.level;
        stats.level = newLevel;

        // Update daily history
        const today = new Date().toISOString().split('T')[0];
        const todayRecord = stats.history.find(h => h.date === today);
        if (todayRecord) {
            todayRecord.xp += amount;
        } else {
            stats.history.push({ date: today, xp: amount });
        }

        await DB.put(APP_CONFIG.database.stores.progress, stats);

        if (leveledUp) {
            Utils.showToast(`🎉 Level Up! You are now Level ${newLevel}!`, 'success');
        } else {
            Utils.showToast(`+${amount} XP (${reason})`, 'success');
        }

        return stats;
    },

    /**
     * Calculate level based on total XP (Exponential curve).
     */
    calculateLevel(xp) {
        return Math.floor(Math.sqrt(xp / 100)) + 1;
    },

    /**
     * Check and update daily streak.
     */
    async checkAndUpdateStreak() {
        const stats = await this.initUserProgress();
        const today = new Date().toISOString().split('T')[0];
        const lastActive = stats.lastActiveDate;

        if (lastActive === today) return stats; // Already active today

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActive === yesterdayStr) {
            stats.streak += 1;
            Utils.showToast(`🔥 Streak extended to ${stats.streak} days!`, 'success');
        } else if (lastActive !== today) {
            stats.streak = 1; // Reset streak if missed a day
            Utils.showToast('Streak reset. Start a new one today!', 'info');
        }

        stats.lastActiveDate = today;
        
        // Check streak badges
        if (stats.streak >= 3 && !stats.badges.includes('streak_3')) {
            stats.badges.push('streak_3');
            Utils.showToast('🏆 Badge Unlocked: On Fire!', 'success');
        }
        if (stats.streak >= 7 && !stats.badges.includes('streak_7')) {
            stats.badges.push('streak_7');
            Utils.showToast('🏆 Badge Unlocked: Week Warrior!', 'success');
        }

        await DB.put(APP_CONFIG.database.stores.progress, stats);
        return stats;
    },

    /**
     * Get leaderboard data (Mocked for now, structured for future API).
     */
    async getLeaderboard() {
        const userStats = await this.initUserProgress();
        
        // Mock global leaderboard
        const mockUsers = [
            { rank: 1, name: 'Aarav K.', xp: 15420, level: 12, avatar: 'AK' },
            { rank: 2, name: 'Sofia M.', xp: 14200, level: 11, avatar: 'SM' },
            { rank: 3, name: 'Liam W.', xp: 12850, level: 11, avatar: 'LW' },
            { rank: 4, name: 'Priya S.', xp: 11300, level: 10, avatar: 'PS' },
            { rank: 5, name: 'Noah B.', xp: 9800, level: 9, avatar: 'NB' },
            { rank: 6, name: 'Emma C.', xp: 8500, level: 9, avatar: 'EC' },
            { rank: 7, name: 'Rahul V.', xp: 7200, level: 8, avatar: 'RV' },
            { rank: 8, name: 'Olivia P.', xp: 6100, level: 7, avatar: 'OP' },
            { rank: 9, name: 'Kenji T.', xp: 5400, level: 7, avatar: 'KT' },
            { rank: 10, name: 'Isabella R.', xp: 4800, level: 6, avatar: 'IR' }
        ];

        // Insert current user
        const currentUser = {
            rank: 0, // Will calculate
            name: 'You (Abhay)',
            xp: userStats.xp,
            level: userStats.level,
            avatar: 'AO',
            isCurrentUser: true
        };

        // Find user's rank
        let userRank = mockUsers.length + 1;
        for (let i = 0; i < mockUsers.length; i++) {
            if (currentUser.xp >= mockUsers[i].xp) {
                userRank = i + 1;
                break;
            }
        }
        currentUser.rank = userRank;
        mockUsers.splice(userRank - 1, 0, currentUser);

        return mockUsers.slice(0, 15); // Top 15
    }
};