/**
 * FluentMind - IndexedDB Storage Layer
 * High-performance, offline-first database wrapper.
 * Designed to be easily swapped with a backend API in the future.
 */

function getBuiltInWords() {
    return [
        ...(typeof BUILT_IN_WORDS === 'undefined' ? [] : BUILT_IN_WORDS),
        ...(typeof PROFESSIONAL_WORDS === 'undefined' ? [] : PROFESSIONAL_WORDS),
        ...(typeof ADVANCED_WORDS === 'undefined' ? [] : ADVANCED_WORDS),
        ...(typeof COMMON_WORDS === 'undefined' ? [] : COMMON_WORDS),
        ...(typeof EXPANDED_WORDS === 'undefined' ? [] : EXPANDED_WORDS),
        ...(typeof ALPHABET_PRACTICE_WORDS === 'undefined' ? [] : ALPHABET_PRACTICE_WORDS),
        ...(typeof EXPANDED_WORDS_2 === 'undefined' ? [] : EXPANDED_WORDS_2)
    ];
}

class FluentDB {
    constructor() {
        this.dbName = APP_CONFIG.database.name;
        this.dbVersion = APP_CONFIG.database.version;
        this.db = null;
        this.stores = APP_CONFIG.database.stores;
    }

    /**
     * Initialize the database and create object stores if they don't exist.
     */
    async init() {
        if (this.db) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // 1. Words Store (The core dictionary)
                if (!db.objectStoreNames.contains(this.stores.words)) {
                    const wordStore = db.createObjectStore(this.stores.words, { keyPath: 'id' });
                    wordStore.createIndex('word', 'word', { unique: true });
                    wordStore.createIndex('firstLetter', 'firstLetter', { unique: false });
                    wordStore.createIndex('category', 'category', { unique: false });
                    wordStore.createIndex('difficulty', 'difficulty', { unique: false });
                    wordStore.createIndex('frequencyRank', 'frequencyRank', { unique: false });
                }

                // 2. Bookmarks Store
                if (!db.objectStoreNames.contains(this.stores.bookmarks)) {
                    const bmStore = db.createObjectStore(this.stores.bookmarks, { keyPath: 'wordId' });
                    bmStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                // 3. History Store
                if (!db.objectStoreNames.contains(this.stores.history)) {
                    const histStore = db.createObjectStore(this.stores.history, { keyPath: 'id', autoIncrement: true });
                    histStore.createIndex('wordId', 'wordId', { unique: false });
                    histStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                // 4. Progress Store (XP, Streaks, Stats)
                if (!db.objectStoreNames.contains(this.stores.progress)) {
                    db.createObjectStore(this.stores.progress, { keyPath: 'key' });
                }

                // 5. Settings Store
                if (!db.objectStoreNames.contains(this.stores.settings)) {
                    db.createObjectStore(this.stores.settings, { keyPath: 'key' });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log(`[FluentDB] Initialized successfully: ${this.dbName}`);
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('[FluentDB] Initialization error:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    /**
     * Generic CRUD Operations
     */
    async getAll(storeName) {
        return this._transaction(storeName, 'readonly', (store) => store.getAll());
    }

    async getById(storeName, id) {
        return this._transaction(storeName, 'readonly', (store) => store.get(id));
    }

    async add(storeName, data) {
        return this._transaction(storeName, 'readwrite', (store) => store.add(data));
    }

    async put(storeName, data) {
        return this._transaction(storeName, 'readwrite', (store) => store.put(data));
    }

    async delete(storeName, id) {
        return this._transaction(storeName, 'readwrite', (store) => store.delete(id));
    }

    async clear(storeName) {
        return this._transaction(storeName, 'readwrite', (store) => store.clear());
    }

    /**
     * Internal helper to manage IndexedDB transactions cleanly.
     */
    _transaction(storeName, mode, callback) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error('Database not initialized. Call init() first.'));
            }

            const transaction = this.db.transaction(storeName, mode);
            const store = transaction.objectStore(storeName);
            const request = callback(store);

            // Read/write helpers return an IDBRequest. Bulk writes do not, so
            // resolve them from the transaction lifecycle instead.
            if (request) {
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            } else {
                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(transaction.error);
                transaction.onabort = () => reject(transaction.error || new Error('Database transaction aborted.'));
            }
        });
    }

    /**
     * Synchronize the built-in dictionary, including new words added in later releases.
     */
    async seedWordsIfEmpty() {
        try {
            const count = await this._transaction(this.stores.words, 'readonly', store => store.count());
            const builtInWords = getBuiltInWords();
            // Only a brand-new installation needs the JSON request. Existing
            // users receive newly added seed words directly from JavaScript.
            let jsonWords = [];
            if (count === 0) {
                const response = await fetch('assets/data/word.json');
                jsonWords = await response.json();
            }
            const words = [...jsonWords, ...builtInWords];

            if (words.length) await this._transaction(this.stores.words, 'readwrite', store => words.forEach(word => store.put(word)));

            console.log(`[FluentDB] Synced ${builtInWords.length} built-in words successfully.`);
            return count + words.length;
        } catch (error) {
            console.error('[FluentDB] Failed to seed words:', error);
            return 0;
        }
    }

    /**
     * High-performance Fuzzy Search across multiple fields.
     */
    async searchWords(query) {
        if (!query || query.trim() === '') return [];
        
        const allWords = await this.getAll(this.stores.words);
        const lowerQuery = query.toLowerCase().trim();
        
        // 1. Exact match or starts-with (Highest priority)
        const exactMatches = allWords.filter(w => 
            w.word.toLowerCase() === lowerQuery || 
            w.word.toLowerCase().startsWith(lowerQuery)
        );

        // 2. Fuzzy match / Includes (Medium priority)
        const fuzzyMatches = allWords.filter(w => {
            if (exactMatches.includes(w)) return false;
            return Utils.fuzzyMatch(w.word, lowerQuery) || 
                   w.englishMeaning.toLowerCase().includes(lowerQuery) ||
                   w.hindiMeaning.includes(lowerQuery) ||
                   w.synonyms.some(s => s.toLowerCase().includes(lowerQuery));
        });

        // Sort by frequency rank (lower rank = more common)
        const sortFn = (a, b) => a.frequencyRank - b.frequencyRank;
        
        return [
            ...exactMatches.sort(sortFn),
            ...fuzzyMatches.sort(sortFn)
        ].slice(0, 50); // Limit results for UI performance
    }

    /**
     * Get words grouped by first letter for the Vocabulary Explorer.
     */
    async getWordsByLetter(letter) {
        const upperLetter = letter.toUpperCase();
        return this._transaction(this.stores.words, 'readonly', (store) => {
            const index = store.index('firstLetter');
            return new Promise((resolve, reject) => {
                const request = index.getAll(upperLetter);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    }

    /**
     * Gamification & Progress Helpers
     */
    async addXP(amount) {
        const progress = await this.getById(this.stores.progress, 'userStats') || { key: 'userStats', xp: 0, level: 1 };
        progress.xp += amount;
        progress.level = Math.floor(progress.xp / 500) + 1;
        await this.put(this.stores.progress, progress);
        return progress;
    }

    async toggleBookmark(wordId) {
        const existing = await this.getById(this.stores.bookmarks, wordId);
        if (existing) {
            await this.delete(this.stores.bookmarks, wordId);
            return false; // Removed
        } else {
            await this.add(this.stores.bookmarks, { wordId, timestamp: Date.now() });
            return true; // Added
        }
    }

    async addToHistory(wordId) {
        await this.add(this.stores.history, { wordId, timestamp: Date.now() });
        
        // Keep history limited to last 100 items to prevent bloat
        const history = await this.getAll(this.stores.history);
        if (history.length > 100) {
            history.sort((a, b) => a.timestamp - b.timestamp);
            const toDelete = history.slice(0, history.length - 100);
            for (const item of toDelete) {
                await this.delete(this.stores.history, item.id);
            }
        }
    }
}

// Global Database Instance
const DB = new FluentDB();
