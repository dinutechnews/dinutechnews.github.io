// ===================================
// D-TECH NEWZ - Glassmorphism Theme
// Complete Technical Article Platform
// ===================================

// === Configuration ===
const CONFIG = {
    // Cloud Storage Visitor Counter
    visitorCounter: {
        apiKey: '$2a$10$sjcg7fZVaaHHSSVOGsdmtOXAm1LJocPG4tc2KJVYDOsn7LnLy.A1u',
        binId: '6937c17643b1c97be9e13df2',
        apiUrl: 'https://api.jsonbin.io/v3/b/'
    },

    // Giscus Comments
    giscus: {
        repo: 'dinutechnews.github.io',
        repoId: 'R_kgDOQkEeMw',
        category: 'General',
        categoryId: 'DIC_kwDOQkEeM84Czgtg'
    },

    // Pagination
    articlesPerPage: 6,

    // Local Storage Keys
    storageKeys: {
        theme: 'dtechnews_theme',
        bookmarks: 'dtechnews_bookmarks',
        visited: 'dtechnews_visited'
    }
};

// === Sample Articles Database ===
const articlesDatabase = [
    {
        id: 1,
        title: "The Future of AI: GPT-5 and Beyond",
        category: "AI",
        tags: ["GPT", "Machine Learning", "NLP"],
        date: "2025-12-08",
        author: "Dr. Sarah Chen",
        authorAvatar: "👩‍💻",
        readingTime: 8,
        excerpt: "Exploring the next generation of AI language models and their potential impact on technology, society, and human creativity.",
        content: `<p>Artificial Intelligence continues to evolve at an unprecedented pace...</p>`,
        featured: true,
        views: 15420,
        likes: 342
    },
    {
        id: 2,
        title: "Quantum Computing Breakthrough: 1000-Qubit Processor",
        category: "Computing",
        tags: ["Quantum", "Hardware", "Innovation"],
        date: "2025-12-07",
        author: "Prof. Michael Zhang",
        authorAvatar: "👨‍🔬",
        readingTime: 12,
        excerpt: "Scientists achieve a major milestone with the world's first stable 1000-qubit quantum processor, bringing us closer to practical quantum computing.",
        content: `<p>In a groundbreaking achievement...</p>`,
        featured: true,
        views: 12890,
        likes: 289
    },
    {
        id: 3,
        title: "5G Evolution: Understanding 6G Technology",
        category: "Networks",
        tags: ["5G", "6G", "Connectivity"],
        date: "2025-12-06",
        author: "Emma Rodriguez",
        authorAvatar: "👩‍💼",
        readingTime: 6,
        excerpt: "As 5G networks mature, researchers are already developing 6G technology that promises speeds up to 100 times faster.",
        content: `<p>The telecommunications industry...</p>`,
        featured: false,
        views: 9234,
        likes: 178
    },
    {
        id: 4,
        title: "Cybersecurity in 2025: Zero Trust Architecture",
        category: "Security",
        tags: ["Cybersecurity", "Zero Trust", "Enterprise"],
        date: "2025-12-05",
        author: "Alex Kumar",
        authorAvatar: "🛡️",
        readingTime: 10,
        excerpt: "Learn how Zero Trust Architecture is revolutionizing enterprise security and protecting against modern cyber threats.",
        content: `<p>Traditional perimeter-based security...</p>`,
        featured: false,
        views: 11567,
        likes: 234
    },
    {
        id: 5,
        title: "Sustainable Tech: Carbon-Neutral Data Centers",
        category: "Green Tech",
        tags: ["Sustainability", "Data Centers", "Environment"],
        date: "2025-12-04",
        author: "Dr. Lisa Green",
        authorAvatar: "🌱",
        readingTime: 7,
        excerpt: "Major tech companies are investing billions in carbon-neutral data centers powered by renewable energy sources.",
        content: `<p>The environmental impact of technology...</p>`,
        featured: false,
        views: 8901,
        likes: 156
    },
    {
        id: 6,
        title: "Web3 Revolution: Decentralized Internet Explained",
        category: "Blockchain",
        tags: ["Web3", "Blockchain", "Decentralization"],
        date: "2025-12-03",
        author: "Chris Nakamoto",
        authorAvatar: "⛓️",
        readingTime: 9,
        excerpt: "Understanding the shift from Web2 to Web3 and how blockchain technology is reshaping the internet as we know it.",
        content: `<p>The internet is undergoing...</p>`,
        featured: false,
        views: 13245,
        likes: 298
    },
    {
        id: 7,
        title: "Edge Computing: Processing at the Source",
        category: "Computing",
        tags: ["Edge Computing", "IoT", "Cloud"],
        date: "2025-12-02",
        author: "David Park",
        authorAvatar: "💾",
        readingTime: 8,
        excerpt: "Edge computing brings data processing closer to the source, reducing latency and enabling real-time applications.",
        content: `<p>As IoT devices proliferate...</p>`,
        featured: false,
        views: 7654,
        likes: 143
    },
    {
        id: 8,
        title: "Neural Interfaces: Brain-Computer Integration",
        category: "AI",
        tags: ["BCI", "Neuroscience", "Future Tech"],
        date: "2025-12-01",
        author: "Dr. Nina Patel",
        authorAvatar: "🧠",
        readingTime: 11,
        excerpt: "Recent advances in brain-computer interfaces are opening new possibilities for human-machine interaction.",
        content: `<p>The boundary between human and machine...</p>`,
        featured: false,
        views: 10234,
        likes: 267
    }
];

// === State Management ===
const state = {
    currentPage: 1,
    selectedCategory: 'All',
    searchQuery: '',
    bookmarks: new Set(),
    theme: 'light',
    filteredArticles: [...articlesDatabase]
};

// === Initialize App ===
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initBookmarks();
    initVisitorCounter();
    initSearch();
    initCategoryFilter();
    initHamburgerMenu();
    renderStats();
    renderArticles();
    initGiscusComments();
    initAdSense();
    initNewsletterForm();
    initSmoothScroll();
});

// === Theme Management ===
function initTheme() {
    const savedTheme = localStorage.getItem(CONFIG.storageKeys.theme) || 'light';
    state.theme = savedTheme;

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon();
    }
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(CONFIG.storageKeys.theme, state.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = state.theme === 'light' ? '😎' : '🥱';
    }
}

// === Search Functionality ===
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    if (searchToggle && searchContainer) {
        searchToggle.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput?.focus();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

function handleSearch(e) {
    state.searchQuery = e.target.value.toLowerCase();
    state.currentPage = 1;
    filterArticles();
    renderArticles();
}

// === Hamburger Menu ===
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenu = document.getElementById('close-menu');

    if (!hamburgerBtn || !mobileMenu || !menuOverlay) return;

    // Open menu
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.add('active');
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    });

    // Close menu
    const closeMenuHandler = () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMenuHandler);
    }

    menuOverlay.addEventListener('click', closeMenuHandler);

    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenuHandler);
    });
}

// === Category Filter ===
function initCategoryFilter() {
    const categoryTags = document.querySelectorAll('.category-tag');

    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            state.selectedCategory = tag.dataset.category;
            state.currentPage = 1;
            filterArticles();
            renderArticles();
        });
    });
}

function filterArticles() {
    state.filteredArticles = articlesDatabase.filter(article => {
        const matchesCategory = state.selectedCategory === 'All' || article.category === state.selectedCategory;
        const matchesSearch = !state.searchQuery ||
            article.title.toLowerCase().includes(state.searchQuery) ||
            article.excerpt.toLowerCase().includes(state.searchQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(state.searchQuery));

        return matchesCategory && matchesSearch;
    });
}

// === Render Stats ===
function renderStats() {
    const totalArticles = articlesDatabase.length;
    const totalViews = articlesDatabase.reduce((sum, article) => sum + article.views, 0);
    const totalCategories = new Set(articlesDatabase.map(a => a.category)).size;

    const statsHTML = `
    <div class="stat-card">
      <div class="stat-label">Total Articles</div>
      <div class="stat-value">${totalArticles}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Total Views</div>
      <div class="stat-value">${formatNumber(totalViews)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Categories</div>
      <div class="stat-value">${totalCategories}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Visitors</div>
      <div class="stat-value" id="visitor-count">0</div>
    </div>
  `;

    const statsBar = document.getElementById('stats-bar');
    if (statsBar) {
        statsBar.innerHTML = statsHTML;
    }
}

// === Render Articles ===
function renderArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;

    const startIdx = (state.currentPage - 1) * CONFIG.articlesPerPage;
    const endIdx = startIdx + CONFIG.articlesPerPage;
    const articlesToShow = state.filteredArticles.slice(startIdx, endIdx);

    if (articlesToShow.length === 0) {
        articlesGrid.innerHTML = '<div class="loading">No articles found. Try a different search or category.</div>';
        return;
    }

    articlesGrid.innerHTML = articlesToShow.map(article => `
    <article class="article-card" data-id="${article.id}">
      <div class="article-meta">
        <span class="article-category">${article.category}</span>
        <span class="article-date">📅 ${formatDate(article.date)}</span>
        <span class="article-reading-time">⏱️ ${article.readingTime} min read</span>
      </div>
      <h2>
        <a href="article.html?id=${article.id}">${article.title}</a>
      </h2>
      <p class="article-excerpt">${article.excerpt}</p>
      <div class="article-tags">
        ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
      </div>
      <div class="article-footer">
        <a href="article.html?id=${article.id}" class="read-more">
          Read More →
        </a>
        <div class="article-actions">
          <button class="action-btn bookmark-btn ${state.bookmarks.has(article.id) ? 'active' : ''}" 
                  data-id="${article.id}" 
                  title="Bookmark">
            ${state.bookmarks.has(article.id) ? '🔖' : '📑'}
          </button>
          <button class="action-btn share-btn" 
                  data-id="${article.id}" 
                  title="Share">
            🔗
          </button>
        </div>
      </div>
    </article>
  `).join('');

    initArticleActions();
    renderPagination();
}

// === Pagination ===
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(state.filteredArticles.length / CONFIG.articlesPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = `
    <button class="page-btn" onclick="changePage(${state.currentPage - 1})" 
            ${state.currentPage === 1 ? 'disabled' : ''}>
      ← Prev
    </button>
  `;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= state.currentPage - 1 && i <= state.currentPage + 1)) {
            paginationHTML += `
        <button class="page-btn ${i === state.currentPage ? 'active' : ''}" 
                onclick="changePage(${i})">
          ${i}
        </button>
      `;
        } else if (i === state.currentPage - 2 || i === state.currentPage + 2) {
            paginationHTML += `<span class="page-btn" style="border:none;cursor:default;">...</span>`;
        }
    }

    paginationHTML += `
    <button class="page-btn" onclick="changePage(${state.currentPage + 1})" 
            ${state.currentPage === totalPages ? 'disabled' : ''}>
      Next →
    </button>
  `;

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(state.filteredArticles.length / CONFIG.articlesPerPage);
    if (page < 1 || page > totalPages) return;

    state.currentPage = page;
    renderArticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === Article Actions ===
function initArticleActions() {
    // Bookmark buttons
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const articleId = parseInt(btn.dataset.id);
            toggleBookmark(articleId);
        });
    });

    // Share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const articleId = parseInt(btn.dataset.id);
            shareArticle(articleId);
        });
    });
}

// === Bookmarks ===
function initBookmarks() {
    const saved = localStorage.getItem(CONFIG.storageKeys.bookmarks);
    if (saved) {
        state.bookmarks = new Set(JSON.parse(saved));
    }
}

function toggleBookmark(articleId) {
    if (state.bookmarks.has(articleId)) {
        state.bookmarks.delete(articleId);
    } else {
        state.bookmarks.add(articleId);
    }

    localStorage.setItem(CONFIG.storageKeys.bookmarks, JSON.stringify([...state.bookmarks]));
    renderArticles();
}

// === Share Article ===
function shareArticle(articleId) {
    const article = articlesDatabase.find(a => a.id === articleId);
    if (!article) return;

    const url = `${window.location.origin}/article.html?id=${articleId}`;

    if (navigator.share) {
        navigator.share({
            title: article.title,
            text: article.excerpt,
            url: url
        }).catch(err => console.log('Share failed:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// === Visitor Counter ===
async function initVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    if (!counterElement) return;

    try {
        const hasVisited = localStorage.getItem(CONFIG.storageKeys.visited);

        if (!hasVisited) {
            await incrementVisitorCount();
            localStorage.setItem(CONFIG.storageKeys.visited, 'true');
        }

        const count = await getVisitorCount();
        animateCounter(counterElement, count);
    } catch (error) {
        console.error('Visitor counter error:', error);
        counterElement.textContent = '---';
    }
}

async function getVisitorCount() {
    if (CONFIG.visitorCounter.binId === '6937c17643b1c97be9e13df2') {
        return getLocalVisitorCount();
    }

    try {
        const response = await fetch(
            `${CONFIG.visitorCounter.apiUrl}${CONFIG.visitorCounter.binId}/latest`,
            { headers: { 'X-Master-Key': CONFIG.visitorCounter.apiKey } }
        );

        if (!response.ok) throw new Error('Failed to fetch count');
        const data = await response.json();
        return data.record.count || 0;
    } catch (error) {
        return getLocalVisitorCount();
    }
}

async function incrementVisitorCount() {
    if (CONFIG.visitorCounter.binId === '6937c17643b1c97be9e13df2') {
        incrementLocalVisitorCount();
        return;
    }

    try {
        const currentCount = await getVisitorCount();
        await fetch(
            `${CONFIG.visitorCounter.apiUrl}${CONFIG.visitorCounter.binId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': CONFIG.visitorCounter.apiKey
                },
                body: JSON.stringify({ count: currentCount + 1 })
            }
        );
    } catch (error) {
        incrementLocalVisitorCount();
    }
}

function getLocalVisitorCount() {
    return parseInt(localStorage.getItem('dtechnews_total_visitors') || '0');
}

function incrementLocalVisitorCount() {
    const count = getLocalVisitorCount();
    localStorage.setItem('dtechnews_total_visitors', (count + 1).toString());
}

function animateCounter(element, targetCount) {
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current = Math.min(Math.floor(increment * step), targetCount);
        element.textContent = formatNumber(current);

        if (step >= steps) {
            clearInterval(timer);
            element.textContent = formatNumber(targetCount);
        }
    }, duration / steps);
}

// === Giscus Comments ===
function initGiscusComments() {
    const commentsContainer = document.getElementById('giscus-comments');
    if (!commentsContainer) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'dinutechnews/dinutechnews.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOQl7m4w');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOQl7m484Czm2d');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    commentsContainer.appendChild(script);
}

// === AdSense ===
function initAdSense() {
    if (window.adsbygoogle) {
        const ads = document.querySelectorAll('.adsbygoogle');
        ads.forEach(ad => {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('AdSense error:', e);
            }
        });
    }
}

// === Newsletter ===
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;

        // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
        console.log('Newsletter signup:', email);
        alert('Thank you for subscribing! 🎉');
        form.reset();
    });
}

// === Smooth Scroll ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// === Utility Functions ===
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatNumber(num) {
    return num.toLocaleString();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === Export for use in other pages ===
window.DTechNews = {
    articles: articlesDatabase,
    formatDate,
    formatNumber,
    initGiscusComments,
    initAdSense,
    state
};
