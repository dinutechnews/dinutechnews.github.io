/**
 * D-TECH-NEWZ Main Script
 * Handles data rendering, interactivity, and advanced features.
 */

// --- Mock Data ---
const articles = [
    {
        id: 1,
        title: "The Future of AI: Beyond Generative Models",
        category: "AI",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
        date: "2025-12-18",
        summary: "As LLMs reach maturity, the next frontier involves reasoning agents and physical world interaction. We explore what's next for Artificial Intelligence.",
        content: `
            <p>Artificial Intelligence has seen explosive growth in the last few years, primarily driven by Generative Pre-trained Transformers (GPT). However, researchers are now looking beyond text generation.</p>
            <p>The next phase, often termed "Actionable AI", involves agents that can not only understand language but also execute complex tasks in the real world. From coding assistants that can deploy software to robots that can navigate unstructured environments, the scope is widening.</p>
            <p>Key developments to watch include:</p>
            <ul>
                <li><strong>Reasoning Engines:</strong> AI that can plan multiple steps ahead.</li>
                <li><strong>Embodied AI:</strong> Intelligence integrated into physical robots.</li>
                <li><strong>Neuromorphic Computing:</strong> Hardware designed to mimic the human brain's efficiency.</li>
            </ul>
        `
    },
    {
        id: 2,
        title: "Quantum Computing: The 2026 Breakthrough?",
        category: "Hardware",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000",
        date: "2025-12-17",
        summary: "IBM and Google are racing to reach quantum advantage. New error-correction techniques might finally make quantum PCs a reality.",
        content: `
            <p>Quantum computing has long been the "always 10 years away" technology. However, recent breakthroughs in error correction are changing the timeline.</p>
            <p>Traditional computers use bits (0 or 1), while quantum computers use qubits, which can exist in multiple states simultaneously. This allows them to solve specific problems—like protein folding or cryptography—exponentially faster.</p>
        `
    },
    {
        id: 3,
        title: "Apple Vision Pro 2: Cheaper, Lighter, Faster",
        category: "Mobile",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
        date: "2025-12-16",
        summary: "Rumors suggest the next iteration of Apple's spatial computer will drop the external battery and cost half as much.",
        content: `
            <p>The original Vision Pro was a technical marvel but a commercial niche. The Vision Pro 2 aims to change that.</p>
            <p>Insiders report a switch to Micro-OLED displays that are cheaper to manufacture, along with a new "Air" model that offloads processing to a connected iPhone.</p>
        `
    },
    {
        id: 4,
        title: "Rust vs C++: The Kernel Wars",
        category: "Software",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        date: "2025-12-15",
        summary: "Linux kernel development is seeing a massive shift towards Rust. Here is why memory safety is becoming the top priority.",
        content: `
            <p>For decades, C and C++ have ruled systems programming. But memory safety bugs—buffer overflows, use-after-free—account for 70% of all security vulnerabilities.</p>
            <p>Rust offers a solution: memory safety without garbage collection. The Linux kernel has officially adopted Rust support, and drivers are now being rewritten at a rapid pace.</p>
        `
    },
    {
        id: 5,
        title: "SpaceX Starship: Mars Colonization Plan",
        category: "Hardware",
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1000",
        date: "2025-12-14",
        summary: "The latest Starship test flight achieved orbit and successfully refueled. Elon Musk updates the timeline for the first human landing.",
        content: `
            <p>Starship is the largest rocket ever built. Its goal is simple but ambitious: make life multi-planetary.</p>
            <p>The recent IFT-6 mission demonstrated successful orbital refueling, a critical technology for long-duration missions to Mars.</p>
        `
    },
    {
        id: 6,
        title: "Unreal Engine 6: Photorealism in Real-Time",
        category: "Gaming",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000",
        date: "2025-12-13",
        summary: "Epic Games teases the next generation of game engines. Nanite and Lumen get massive upgrades for open-world rendering.",
        content: `
            <p>Video game graphics are hitting a point of diminishing returns, but Unreal Engine 6 focuses on lighting and physics.</p>
            <p>The new "Neural Rendering" pipeline uses AI to upscale textures and simulate realistic fluid dynamics in real-time, allowing for worlds that look indistinguishable from film.</p>
        `
    }
];

// --- State Management ---
const state = {
    articles: [...articles],
    filter: 'all',
    searchQuery: '',
    bookmarks: JSON.parse(localStorage.getItem('dtech_bookmarks')) || [],
    theme: localStorage.getItem('dtech_theme') || 'dark',
    ttsPlaying: false,
    currentUtterance: null
};

// --- DOM Elements ---
const dom = {
    heroSection: document.getElementById('heroSection'),
    newsGrid: document.getElementById('newsGrid'),
    trendingList: document.getElementById('trendingList'),
    searchInput: document.getElementById('searchInput'),
    categoryList: document.getElementById('categoryList'),
    themeToggle: document.getElementById('themeToggle'),
    bookmarksBtn: document.getElementById('bookmarksBtn'),
    bookmarkCount: document.getElementById('bookmarkCount'),
    modalOverlay: document.getElementById('modalOverlay'),
    articleModal: document.getElementById('articleModal'),
    closeArticleModal: document.getElementById('closeArticleModal'),
    articleModalContent: document.getElementById('articleModalContent'),
    modalBookmarkBtn: document.getElementById('modalBookmarkBtn'),
    modalShareBtn: document.getElementById('modalShareBtn'),
    modalTTSBtn: document.getElementById('modalTTSBtn'),
    bookmarksModal: document.getElementById('bookmarksModal'),
    closeBookmarksModal: document.getElementById('closeBookmarksModal'),
    bookmarksList: document.getElementById('bookmarksList'),
    ttsPlayer: document.getElementById('ttsPlayer'),
    ttsTitle: document.getElementById('ttsTitle'),
    ttsPlayPause: document.getElementById('ttsPlayPause'),
    ttsStop: document.getElementById('ttsStop')
};

// --- Initialization ---
function init() {
    applyTheme(state.theme);
    renderHero();
    renderNews();
    renderTrending();
    updateBookmarkCount();
    setupEventListeners();
}

// --- Rendering ---
function renderHero() {
    // Pick the first article as Hero for now, or random
    const heroArticle = state.articles[0];

    dom.heroSection.innerHTML = `
        <div class="hero-card" onclick="openArticle(${heroArticle.id})">
            <img src="${heroArticle.image}" alt="${heroArticle.title}">
            <div class="hero-overlay">
                <span class="hero-tag">${heroArticle.category}</span>
                <h1 class="hero-title">${heroArticle.title}</h1>
                <div class="hero-meta">
                    <span><i class="fa-regular fa-calendar"></i> ${heroArticle.date}</span>
                    <span style="margin-left: 15px;"><i class="fa-regular fa-clock"></i> ${calculateReadingTime(heroArticle.content + heroArticle.summary)} min read</span>
                </div>
            </div>
        </div>
    `;
}

function renderNews() {
    dom.newsGrid.innerHTML = '';

    const filtered = state.articles.filter(article => {
        const matchesCategory = state.filter === 'all' || article.category === state.filter;
        const matchesSearch = article.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            article.summary.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        dom.newsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No articles found.</p>';
        return;
    }

    // Skip the first one if it's the hero and we are in 'all' view? 
    // For simplicity, let's show all matching in grid, or skip hero if filter is 'all'.
    // Let's just show all for now to populate the grid.

    filtered.forEach(article => {
        // Don't show hero in grid if showing all
        if (state.filter === 'all' && article.id === state.articles[0].id) return;

        const card = document.createElement('div');
        card.className = 'news-card';
        card.onclick = () => openArticle(article.id);

        card.innerHTML = `
            <div class="card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="card-tag">${article.category}</span>
                <h3 class="card-title">${article.title}</h3>
                <p class="card-excerpt">${article.summary}</p>
                <div class="card-footer">
                    <span>${article.date}</span>
                    <div class="read-time">
                        <i class="fa-regular fa-clock"></i>
                        ${calculateReadingTime(article.content + article.summary)} min
                    </div>
                </div>
            </div>
        `;
        dom.newsGrid.appendChild(card);
    });
}

function renderTrending() {
    // Just pick random 3 for trending
    const trending = [...state.articles].sort(() => 0.5 - Math.random()).slice(0, 3);

    dom.trendingList.innerHTML = trending.map(article => `
        <div class="trending-item" onclick="openArticle(${article.id})" style="display: flex; gap: 10px; margin-bottom: 15px; cursor: pointer;">
            <img src="${article.image}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
            <div>
                <h4 style="font-size: 0.9rem; margin-bottom: 5px; line-height: 1.3;">${article.title}</h4>
                <span style="font-size: 0.7rem; color: var(--text-muted);">${article.date}</span>
            </div>
        </div>
    `).join('');
}

// --- Logic & Helpers ---
function calculateReadingTime(text) {
    const wpm = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dtech_theme', theme);

    const icon = dom.themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-moon';
    } else {
        icon.className = 'fa-solid fa-sun';
    }
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(state.theme);
}

// --- Event Listeners ---
function setupEventListeners() {
    // Theme
    dom.themeToggle.addEventListener('click', toggleTheme);

    // Search
    dom.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderNews();
    });

    // Categories
    dom.categoryList.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
            // Update UI
            dom.categoryList.querySelector('.active').classList.remove('active');
            li.classList.add('active');

            // Update State
            state.filter = li.dataset.category;
            renderNews();
        });
    });

    // Modals
    dom.closeArticleModal.addEventListener('click', closeArticleModal);
    dom.closeBookmarksModal.addEventListener('click', () => {
        dom.bookmarksModal.classList.remove('active');
        dom.modalOverlay.classList.remove('active');
    });
    dom.modalOverlay.addEventListener('click', () => {
        closeArticleModal();
        dom.bookmarksModal.classList.remove('active');
        dom.modalOverlay.classList.remove('active');
    });

    // Bookmarks Button (Header)
    dom.bookmarksBtn.addEventListener('click', openBookmarksModal);

    // Article Modal Actions
    dom.modalBookmarkBtn.addEventListener('click', toggleBookmarkCurrent);
    dom.modalShareBtn.addEventListener('click', shareCurrentArticle);
    dom.modalTTSBtn.addEventListener('click', toggleTTSCurrent);

    // TTS Player Controls
    dom.ttsPlayPause.addEventListener('click', () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            dom.ttsPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            dom.ttsPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });
    dom.ttsStop.addEventListener('click', stopTTS);
}

// --- Article Modal Logic ---
let currentArticleId = null;

function openArticle(id) {
    const article = state.articles.find(a => a.id === id);
    if (!article) return;

    currentArticleId = id;

    // Populate Modal
    dom.articleModalContent.innerHTML = `
        <img src="${article.image}" class="article-full-image" alt="${article.title}">
        <div class="article-body">
            <div class="article-meta">
                <span class="card-tag">${article.category}</span>
                <span>${article.date}</span>
                <span>${calculateReadingTime(article.content)} min read</span>
            </div>
            <h1>${article.title}</h1>
            <div class="article-text">
                ${article.content}
            </div>
        </div>
    `;

    // Update Bookmark Button State
    updateBookmarkBtnState();

    // Show Modal
    dom.modalOverlay.classList.add('active');
    dom.articleModal.classList.add('active');
}

function closeArticleModal() {
    dom.articleModal.classList.remove('active');
    dom.modalOverlay.classList.remove('active');
    currentArticleId = null;
}

// --- Bookmarks Logic ---
function toggleBookmarkCurrent() {
    if (!currentArticleId) return;

    const index = state.bookmarks.indexOf(currentArticleId);
    if (index === -1) {
        state.bookmarks.push(currentArticleId);
        showToast('Article saved to bookmarks');
    } else {
        state.bookmarks.splice(index, 1);
        showToast('Article removed from bookmarks');
    }

    localStorage.setItem('dtech_bookmarks', JSON.stringify(state.bookmarks));
    updateBookmarkCount();
    updateBookmarkBtnState();
}

function updateBookmarkCount() {
    dom.bookmarkCount.textContent = state.bookmarks.length;
}

function updateBookmarkBtnState() {
    const isBookmarked = state.bookmarks.includes(currentArticleId);
    const icon = dom.modalBookmarkBtn.querySelector('i');
    const text = dom.modalBookmarkBtn.lastChild; // The text node

    if (isBookmarked) {
        icon.className = 'fa-solid fa-bookmark';
        dom.modalBookmarkBtn.style.background = 'var(--primary)';
        dom.modalBookmarkBtn.style.color = '#000';
    } else {
        icon.className = 'fa-regular fa-bookmark';
        dom.modalBookmarkBtn.style.background = 'rgba(255, 255, 255, 0.05)';
        dom.modalBookmarkBtn.style.color = 'var(--text-main)';
    }
}

function openBookmarksModal() {
    dom.bookmarksList.innerHTML = '';

    if (state.bookmarks.length === 0) {
        dom.bookmarksList.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-muted);">No saved articles yet.</p>';
    } else {
        state.bookmarks.forEach(id => {
            const article = state.articles.find(a => a.id === id);
            if (article) {
                const item = document.createElement('div');
                item.style.cssText = 'padding: 15px; border-bottom: 1px solid var(--border-glass); cursor: pointer; display: flex; gap: 15px;';
                item.onclick = () => {
                    dom.bookmarksModal.classList.remove('active');
                    openArticle(article.id);
                };
                item.innerHTML = `
                    <img src="${article.image}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div>
                        <h4 style="margin-bottom: 5px;">${article.title}</h4>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${article.date}</span>
                    </div>
                `;
                dom.bookmarksList.appendChild(item);
            }
        });
    }

    dom.modalOverlay.classList.add('active');
    dom.bookmarksModal.classList.add('active');
}

// --- Share Logic ---
async function shareCurrentArticle() {
    if (!currentArticleId) return;
    const article = state.articles.find(a => a.id === currentArticleId);

    if (navigator.share) {
        try {
            await navigator.share({
                title: article.title,
                text: article.summary,
                url: window.location.href // Ideally this would be a permalink
            });
        } catch (err) {
            console.log('Share failed:', err);
        }
    } else {
        // Fallback
        navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
        showToast('Link copied to clipboard!');
    }
}

// --- Text-to-Speech Logic ---
function toggleTTSCurrent() {
    if (!currentArticleId) return;

    // If already playing this article, stop it
    if (state.ttsPlaying && state.currentUtterance && state.currentUtterance.articleId === currentArticleId) {
        stopTTS();
        return;
    }

    // Stop any existing
    stopTTS();

    const article = state.articles.find(a => a.id === currentArticleId);

    // Create text to read (strip HTML)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = article.title + ". " + article.content;
    const text = tempDiv.textContent || tempDiv.innerText || "";

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.articleId = currentArticleId;

    utterance.onend = () => {
        stopTTS();
    };

    window.speechSynthesis.speak(utterance);
    state.currentUtterance = utterance;
    state.ttsPlaying = true;

    // Show Player
    dom.ttsTitle.textContent = article.title;
    dom.ttsPlayer.classList.add('active');
    dom.ttsPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function stopTTS() {
    window.speechSynthesis.cancel();
    state.ttsPlaying = false;
    state.currentUtterance = null;
    dom.ttsPlayer.classList.remove('active');
}

// --- Toast Notification Helper ---
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary);
        color: #000;
        padding: 10px 20px;
        border-radius: 20px;
        font-weight: bold;
        z-index: 3000;
        animation: fadeIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Run
document.addEventListener('DOMContentLoaded', init);
