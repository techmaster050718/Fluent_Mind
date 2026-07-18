/**
 * FluentMind - Global Configuration
 * Developer: Abhay Ojha
 * Contact: techmaster050718@gmail.com | +91 9580239104
 */

const APP_CONFIG = {
    name: "FluentMind",
    version: "1.0.0",
    description: "World's Most Premium English Pronunciation & Vocabulary Learning Platform",
    developer: {
        name: "Abhay Ojha",
        email: "techmaster050718@gmail.com",
        phone: "+91 9580239104",
        role: "Elite Staff Software Engineer & Product Designer"
    },
    theme: {
        default: 'dark',
        storageKey: 'fluentmind-theme'
    },
    database: {
        name: 'FluentMindDB',
        version: 1,
        stores: {
            words: 'words',
            bookmarks: 'bookmarks',
            history: 'history',
            progress: 'progress',
            settings: 'settings'
        }
    },
    pagination: {
        wordsPerPage: 50,
        recentSearches: 10
    },
    gamification: {
        xpPerWord: 10,
        xpPerCorrectPronunciation: 25,
        dailyGoal: 50
    }
};

// Initialize Theme on Load
(function initTheme() {
    const savedTheme = localStorage.getItem(APP_CONFIG.theme.storageKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();