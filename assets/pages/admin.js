/**
 * FluentMind - Admin Panel Page
 * CRUD operations, bulk import, and analytics for the vocabulary database.
 */

const AdminPage = {
    currentView: 'dashboard', // dashboard, words, import

    render: () => {
        return `
        <div class="space-y-8 pb-12 gsap-admin-fade">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <i data-lucide="shield-check" class="w-8 h-8 text-accent-purple"></i>
                        Admin Panel
                    </h1>
                    <p class="text-gray-500 dark:text-gray-400 mt-1">Manage vocabulary, users, and platform analytics</p>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex gap-2 border-b border-gray-200 dark:border-white/5 overflow-x-auto">
                ${['dashboard', 'words', 'import'].map(tab => `
                    <button onclick="AdminPage.switchTab('${tab}')" class="admin-tab px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${AdminPage.currentView === tab ? 'text-accent-blue border-b-2 border-accent-blue' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent'}" data-tab="${tab}">
                        ${tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                `).join('')}
            </div>

            <!-- Content Area -->
            <div id="admin-content">
                ${AdminPage.renderContent()}
            </div>
        </div>
        `;
    },

    renderContent: () => {
        if (AdminPage.currentView === 'words') return AdminPage.renderWordsManager();
        if (AdminPage.currentView === 'import') return AdminPage.renderImport();
        return AdminPage.renderDashboard();
    },

    renderDashboard: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            ${[
                { label: 'Total Words', value: '104,520', icon: 'book-open', color: 'blue', trend: '+120 this week' },
                { label: 'Active Users', value: '52,340', icon: 'users', color: 'purple', trend: '+5% vs last month' },
                { label: 'Daily Searches', value: '18,402', icon: 'search', color: 'cyan', trend: '+12% vs yesterday' },
                { label: 'Server Load', value: '24%', icon: 'activity', color: 'green', trend: 'Healthy' }
            ].map(stat => `
                <div class="glass-card rounded-2xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-10 h-10 rounded-xl bg-accent-${stat.color}/10 flex items-center justify-center">
                            <i data-lucide="${stat.icon}" class="w-5 h-5 text-accent-${stat.color}"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">${stat.value}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${stat.label}</div>
                    <div class="text-xs text-accent-green font-medium mt-2">${stat.trend}</div>
                </div>
            `).join('')}
        </div>

        <div class="glass-card rounded-2xl p-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div class="space-y-3">
                ${[
                    { action: 'Added 50 new words to "Technology" category', time: '2 hours ago', icon: 'plus-circle', color: 'green' },
                    { action: 'User "Priya S." reached Level 10', time: '4 hours ago', icon: 'trophy', color: 'orange' },
                    { action: 'Bulk import of 1,200 idioms completed', time: '1 day ago', icon: 'upload-cloud', color: 'blue' },
                    { action: 'Database backup completed successfully', time: '2 days ago', icon: 'database', color: 'purple' }
                ].map(act => `
                    <div class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div class="w-8 h-8 rounded-full bg-accent-${act.color}/10 flex items-center justify-center flex-shrink-0">
                            <i data-lucide="${act.icon}" class="w-4 h-4 text-accent-${act.color}"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-900 dark:text-white truncate">${act.action}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">${act.time}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    renderWordsManager: () => `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div class="relative w-full sm:w-80">
                <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                <input type="text" id="admin-search" placeholder="Search words..." class="w-full pl-10 pr-4 py-2.5 rounded-xl glass-card border border-transparent focus:border-accent-blue/50 outline-none text-sm">
            </div>
            <button onclick="AdminPage.openWordModal()" class="px-4 py-2.5 rounded-xl bg-accent-blue text-white font-semibold text-sm hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20 flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4"></i> Add New Word
            </button>
        </div>

        <div class="glass-card rounded-2xl overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
                        <tr>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Word</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Difficulty</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Freq. Rank</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-white/5" id="admin-words-table">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Word Edit Modal (Hidden by default) -->
        <div id="word-modal" class="fixed inset-0 z-[70] hidden">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="AdminPage.closeWordModal()"></div>
            <div class="absolute inset-x-0 top-[5vh] mx-auto max-w-3xl px-4 max-h-[90vh] overflow-y-auto">
                <div class="glass-panel rounded-2xl shadow-2xl p-6 sm:p-8">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white" id="modal-title">Add New Word</h2>
                        <button onclick="AdminPage.closeWordModal()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                            <i data-lucide="x" class="w-5 h-5 text-gray-500"></i>
                        </button>
                    </div>
                    
                    <form id="word-form" class="space-y-6">
                        <input type="hidden" id="form-id">
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Word *</label>
                                <input type="text" id="form-word" required class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-accent-blue outline-none text-sm">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pronunciation (IPA)</label>
                                <input type="text" id="form-pronunciation" placeholder="/ˈwɜːrd/" class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-accent-blue outline-none text-sm font-mono">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grammar</label>
                                <select id="form-grammar" class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-accent-blue outline-none text-sm">
                                    <option>Noun</option><option>Verb</option><option>Adjective</option><option>Adverb</option><option>Idiom</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                                <select id="form-difficulty" class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-accent-blue outline-none text-sm">
                                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency Rank</label>
                                <input type="number" id="form-frequency" value="1000" class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-accent-blue outline-none text-sm">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">English Meaning *</label>
                            <textarea id="form-english" required rows="2" class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-accent-blue outline-none text-sm"></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hindi Meaning *</label>
                            <textarea id="form-hindi" required rows="2" class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-accent-blue outline-none text-sm"></textarea>
                        </div>

                        <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-white/5">
                            <button type="button" onclick="AdminPage.closeWordModal()" class="px-6 py-2.5 rounded-xl glass-card text-gray-700 dark:text-gray-200 font-semibold text-sm">Cancel</button>
                            <button type="submit" class="px-6 py-2.5 rounded-xl bg-accent-blue text-white font-semibold text-sm hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20">Save Word</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,

    renderImport: () => `
        <div class="glass-card rounded-2xl p-8 text-center">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-accent-purple/10 flex items-center justify-center mb-6">
                <i data-lucide="upload-cloud" class="w-8 h-8 text-accent-purple"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Bulk Import Vocabulary</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Upload a JSON or CSV file to add thousands of words at once. Ensure your file matches the FluentMind schema.</p>
            
            <div id="drop-zone" class="border-2 border-dashed border-gray-300 dark:border-white/10 rounded-2xl p-12 hover:border-accent-blue dark:hover:border-accent-blue/50 transition-colors cursor-pointer group">
                <i data-lucide="file-json" class="w-12 h-12 mx-auto text-gray-400 group-hover:text-accent-blue transition-colors mb-4"></i>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Drag & drop your file here, or <span class="text-accent-blue underline">browse</span></p>
                <p class="text-xs text-gray-500 dark:text-gray-500">Supports .json and .csv up to 50MB</p>
                <input type="file" id="file-input" class="hidden" accept=".json,.csv">
            </div>

            <div id="import-status" class="mt-6 hidden">
                <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-green/10 text-accent-green text-sm font-medium">
                    <i data-lucide="check-circle" class="w-4 h-4"></i>
                    <span id="import-message">Successfully imported 0 words!</span>
                </div>
            </div>
        </div>
    `,

    switchTab: (tab) => {
        AdminPage.currentView = tab;
        document.getElementById('admin-content').innerHTML = AdminPage.renderContent();
        document.querySelectorAll('.admin-tab').forEach(t => {
            t.classList.toggle('text-accent-blue', t.dataset.tab === tab);
            t.classList.toggle('border-accent-blue', t.dataset.tab === tab);
            t.classList.toggle('text-gray-500', t.dataset.tab !== tab);
            t.classList.toggle('dark:text-gray-400', t.dataset.tab !== tab);
        });
        AdminPage.init();
    },

    openWordModal: (word = null) => {
        const modal = document.getElementById('word-modal');
        const title = document.getElementById('modal-title');
        modal.classList.remove('hidden');
        
        if (word) {
            title.textContent = `Edit: ${word.word}`;
            document.getElementById('form-id').value = word.id;
            document.getElementById('form-word').value = word.word;
            document.getElementById('form-pronunciation').value = word.pronunciation || '';
            document.getElementById('form-grammar').value = word.grammar || 'Noun';
            document.getElementById('form-difficulty').value = word.difficulty || 'Beginner';
            document.getElementById('form-frequency').value = word.frequencyRank || 1000;
            document.getElementById('form-english').value = word.englishMeaning || '';
            document.getElementById('form-hindi').value = word.hindiMeaning || '';
        } else {
            title.textContent = 'Add New Word';
            document.getElementById('word-form').reset();
            document.getElementById('form-id').value = '';
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    },

    closeWordModal: () => {
        document.getElementById('word-modal').classList.add('hidden');
    },

    async loadWordsTable() {
        const tableBody = document.getElementById('admin-words-table');
        if (!tableBody) return;

        const words = await DB.getAll(APP_CONFIG.database.stores.words);
        const displayWords = words.slice(0, 20); // Show first 20 for demo

        tableBody.innerHTML = displayWords.map(w => `
            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td class="px-6 py-4">
                    <div class="font-semibold text-gray-900 dark:text-white">${w.word}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">${w.pronunciation || ''}</div>
                </td>
                <td class="px-6 py-4 hidden md:table-cell">
                    <span class="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-gray-400">${w.category || 'General'}</span>
                </td>
                <td class="px-6 py-4 hidden lg:table-cell">
                    <span class="text-sm text-gray-700 dark:text-gray-300">${w.difficulty || 'N/A'}</span>
                </td>
                <td class="px-6 py-4 hidden lg:table-cell">
                    <span class="text-sm text-gray-700 dark:text-gray-300">#${w.frequencyRank || 'N/A'}</span>
                </td>
                <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button onclick="AdminPage.editWord('${w.id}')" class="p-2 rounded-lg hover:bg-accent-blue/10 text-gray-500 hover:text-accent-blue transition-colors" title="Edit">
                            <i data-lucide="edit-2" class="w-4 h-4"></i>
                        </button>
                        <button onclick="AdminPage.deleteWord('${w.id}')" class="p-2 rounded-lg hover:bg-accent-red/10 text-gray-500 hover:text-accent-red transition-colors" title="Delete">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    },

    async editWord(id) {
        const word = await DB.getById(APP_CONFIG.database.stores.words, id);
        if (word) AdminPage.openWordModal(word);
    },

    async deleteWord(id) {
        if (confirm('Are you sure you want to delete this word?')) {
            await DB.delete(APP_CONFIG.database.stores.words, id);
            Utils.showToast('Word deleted successfully', 'success');
            AdminPage.loadWordsTable();
        }
    },

    init: () => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        if (AdminPage.currentView === 'words') {
            AdminPage.loadWordsTable();
            
            const form = document.getElementById('word-form');
            if (form) {
                form.onsubmit = async (e) => {
                    e.preventDefault();
                    const id = document.getElementById('form-id').value || document.getElementById('form-word').value.toLowerCase().replace(/\s+/g, '-');
                    
                    const wordData = {
                        id: id,
                        word: document.getElementById('form-word').value,
                        firstLetter: document.getElementById('form-word').value[0].toUpperCase(),
                        pronunciation: document.getElementById('form-pronunciation').value,
                        grammar: document.getElementById('form-grammar').value,
                        difficulty: document.getElementById('form-difficulty').value,
                        frequencyRank: parseInt(document.getElementById('form-frequency').value),
                        englishMeaning: document.getElementById('form-english').value,
                        hindiMeaning: document.getElementById('form-hindi').value,
                        category: 'General',
                        syllables: [],
                        synonyms: [],
                        antonyms: [],
                        collocations: [],
                        wordFamily: [],
                        relatedWords: [],
                        examples: [],
                        audioPath: { slow: '', normal: '' },
                        tags: [],
                        notes: ''
                    };

                    await DB.put(APP_CONFIG.database.stores.words, wordData);
                    Utils.showToast('Word saved successfully!', 'success');
                    AdminPage.closeWordModal();
                    AdminPage.loadWordsTable();
                };
            }
        }

        if (AdminPage.currentView === 'import') {
            const dropZone = document.getElementById('drop-zone');
            const fileInput = document.getElementById('file-input');
            
            if (dropZone && fileInput) {
                dropZone.onclick = () => fileInput.click();
                
                fileInput.onchange = async (e) => {
                    const file = e.target.files[0];
                    if (file) await AdminPage.processImport(file);
                };

                dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('border-accent-blue', 'bg-accent-blue/5'); };
                dropZone.ondragleave = () => { dropZone.classList.remove('border-accent-blue', 'bg-accent-blue/5'); };
                dropZone.ondrop = async (e) => {
                    e.preventDefault();
                    dropZone.classList.remove('border-accent-blue', 'bg-accent-blue/5');
                    const file = e.dataTransfer.files[0];
                    if (file) await AdminPage.processImport(file);
                };
            }
        }

        if (typeof gsap !== 'undefined') {
            gsap.from('.gsap-admin-fade > *', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        }
    },

    async processImport(file) {
        const statusDiv = document.getElementById('import-status');
        const msgSpan = document.getElementById('import-message');
        
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (!Array.isArray(data)) throw new Error('JSON must be an array of words.');

            let count = 0;
            for (const word of data) {
                if (word.word && word.englishMeaning) {
                    word.id = word.id || word.word.toLowerCase().replace(/\s+/g, '-');
                    word.firstLetter = word.word[0].toUpperCase();
                    await DB.put(APP_CONFIG.database.stores.words, word);
                    count++;
                }
            }

            msgSpan.textContent = `Successfully imported ${count} words!`;
            statusDiv.classList.remove('hidden');
            Utils.showToast(`Imported ${count} words!`, 'success');
        } catch (err) {
            msgSpan.textContent = `Error: ${err.message}`;
            statusDiv.classList.remove('hidden');
            statusDiv.querySelector('div').classList.remove('bg-accent-green/10', 'text-accent-green');
            statusDiv.querySelector('div').classList.add('bg-accent-red/10', 'text-accent-red');
            Utils.showToast('Import failed. Check file format.', 'error');
        }
    }
};