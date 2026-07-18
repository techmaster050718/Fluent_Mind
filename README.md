<div align="center">
  <img src="assets/icons/192.png" alt="FluentMind Logo" width="120" />
  <h1>FluentMind</h1>
  <p><strong>Master English Pronunciation & Vocabulary with AI</strong></p>
</div>

---

**FluentMind** is a premium, AI-powered English learning web application designed to help users master vocabulary and pronunciation with real-time phoneme feedback. Built entirely with Vanilla JavaScript, it features a sleek glassmorphism UI, a spaced-repetition flashcard system, and offline capabilities via IndexedDB. Users can track their progress through a gamified XP system, complete daily goals, and unlock achievements as they climb the leaderboard. The project demonstrates advanced DOM manipulation, client-side routing, and modern CSS architecture without relying on heavy frontend frameworks.

## ✨ Features

- **Pronunciation AI**: Get real-time, syllable-level visual feedback on your spoken English.
- **Vocabulary Explorer**: Browse hundreds of categorized words with IPA pronunciation, definitions, and native audio playback.
- **Gamified Learning**: Earn XP through flashcards and quizzes, maintain a daily streak, and unlock titles like "Fluent Master".
- **Spaced Repetition Flashcards**: A built-in study mode that optimizes memorization by testing you at perfect intervals.
- **Progressive Web App (PWA)**: Installable on Desktop & Mobile. Works entirely offline thanks to local IndexedDB storage and Service Workers.
- **Premium Glassmorphism UI**: Beautiful dark/light mode designs featuring CSS aurora gradients and smooth GSAP animations.
- **Framework-less SPA**: A highly optimized Single Page Application built purely with modern Vanilla JavaScript.

## 🛠 Tech Stack

- **Frontend Core**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Styling**: TailwindCSS (via CDN), custom glassmorphism utilities, Lucide Icons
- **Animations**: GSAP (GreenSock) for high-performance scroll and layout animations
- **Data & Storage**: IndexedDB (client-side database), Service Workers for offline caching
- **Audio/Speech**: Web Speech API for native text-to-speech

## 🚀 Running Locally

Because FluentMind uses a service worker and ES modules, it must be run on a local development server (opening the `index.html` file directly in the browser will result in CORS errors).

1. **Clone the repository:**
   ```bash
   git clone https://github.com/techmaster050718/Fluent_Mind.git
   cd Fluent_Mind
   ```

2. **Serve the project:**
   You can use any local web server. For example, using Python or Node:
   
   **Using Python 3:**
   ```bash
   python3 -m http.server 3000
   ```
   
   **Using Node (npx):**
   ```bash
   npx serve .
   ```
   
   **Using VS Code:**
   Simply install the **Live Server** extension and click "Go Live" at the bottom of your editor.

3. **Open your browser:**
   Navigate to `http://localhost:3000` (or whichever port your server is running on).

## 📂 Project Structure

```text
Fluent_Mind/
├── index.html               # Main entry point & app shell
├── sw.js                    # Service Worker for offline caching
├── assets/
│   ├── css/                 # Custom Tailwind directives & base styles
│   ├── js/                  # Core logic (Router, Storage, Gamification)
│   ├── components/          # Reusable UI components (Navbar, Sidebar)
│   ├── pages/               # Route views (Landing, Vocabulary, Pronunciation)
│   ├── data/                # JSON seed data for initial word population
│   ├── icons/               # PWA icons and developer avatars
│   └── videos/              # Video assets for the landing page
```

## 🤝 Contribution

This project serves as a masterclass in building complex, modern web applications without relying on frameworks like React or Vue. Contributions to expand the vocabulary database, improve the pronunciation algorithm, or refine the UI are always welcome!

---
<div align="center">
  <i>Built with linguistic precision and cutting-edge web tech.</i>
</div>
