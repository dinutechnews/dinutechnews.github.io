// ===================================
// D-TECH NEWZ - Tech News Platform with Enhanced Theme
// Complete Technical Article Platform
// ===================================

// === Configuration ===
const CONFIG = {
    // Visitor Counter
    visitorCounter: {
        apiKey: '$2a$10$sjcg7fZVaaHHSSVOGsdmtOXAm1LJocPG4tc2KJVYDOsn7LnLy.A1u',
        binId: '6937c17643b1c97be9e13df2',
        apiUrl: 'https://api.jsonbin.io/v3/b/'
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
        authorAvatar: "<i class=\"fas fa-code\"></i>",
        readingTime: 8,
        excerpt: "Exploring the next generation of AI language models and their potential impact on technology, society, and human creativity.",
        content: `<p>Artificial Intelligence continues to evolve at an unprecedented pace...</p>`,
        featured: true,
        views: 0,
        likes: 0
    },
    {
        id: 2,
        title: "Quantum Computing Breakthrough: 1000-Qubit Processor",
        category: "Computing",
        tags: ["Quantum", "Hardware", "Innovation"],
        date: "2025-12-07",
        author: "Prof. Michael Zhang",
        authorAvatar: "<i class=\"fas fa-flask\"></i>",
        readingTime: 12,
        excerpt: "Scientists achieve a major milestone with the world's first stable 1000-qubit quantum processor, bringing us closer to practical quantum computing.",
        content: `<p>In a groundbreaking achievement...</p>`,
        featured: true,
        views: 0,
        likes: 0
    },
    {
        id: 3,
        title: "5G Evolution: Understanding 6G Technology",
        category: "Networks",
        tags: ["5G", "6G", "Connectivity"],
        date: "2025-12-06",
        author: "Emma Rodriguez",
        authorAvatar: "<i class=\"fas fa-rocket\"></i>",
        readingTime: 6,
        excerpt: "As 5G networks mature, researchers are already developing 6G technology that promises speeds up to 100 times faster.",
        content: `<p>The telecommunications industry...</p>`,
        featured: false,
        views: 0,
        likes: 0
    },
    {
        id: 4,
        title: "Cybersecurity in 2025: Zero Trust Architecture",
        category: "Security",
        tags: ["Cybersecurity", "Zero Trust", "Enterprise"],
        date: "2025-12-05",
        author: "Alex Kumar",
        authorAvatar: "<i class=\"fas fa-shield-halved\"></i>",
        readingTime: 10,
        excerpt: "Learn how Zero Trust Architecture is revolutionizing enterprise security and protecting against modern cyber threats.",
        content: `<p>Traditional perimeter-based security...</p>`,
        featured: false,
        views: 0,
        likes: 0
    },
    {
        id: 5,
        title: "Sustainable Tech: Carbon-Neutral Data Centers",
        category: "Green Tech",
        tags: ["Sustainability", "Data Centers", "Environment"],
        date: "2025-12-04",
        author: "Dr. Lisa Green",
        authorAvatar: "<i class=\"fas fa-seedling\"></i>",
        readingTime: 7,
        excerpt: "Major tech companies are investing billions in carbon-neutral data centers powered by renewable energy sources.",
        content: `<p>The environmental impact of technology...</p>`,
        featured: false,
        views: 0,
        likes: 0
    },
    {
        id: 6,
        title: "Web3 Revolution: Decentralized Internet Explained",
        category: "Blockchain",
        tags: ["Web3", "Blockchain", "Decentralization"],
        date: "2025-12-03",
        author: "Chris Nakamoto",
        authorAvatar: "<i class=\"fas fa-cubes\"></i>",
        readingTime: 9,
        excerpt: "Understanding the shift from Web2 to Web3 and how blockchain technology is reshaping the internet as we know it.",
        content: `<p>The internet is undergoing...</p>`,
        featured: false,
        views: 0,
        likes: 0
    },
    {
        id: 7,
        title: "Edge Computing: Processing at the Source",
        category: "Computing",
        tags: ["Edge Computing", "IoT", "Cloud"],
        date: "2025-12-02",
        author: "David Park",
        authorAvatar: "<i class=\"fas fa-database\"></i>",
        readingTime: 8,
        excerpt: "Edge computing brings data processing closer to the source, reducing latency and enabling real-time applications.",
        content: `<p>As IoT devices proliferate...</p>`,
        featured: false,
        views: 0,
        likes: 0
    },
    {
        id: 8,
        title: "Neural Interfaces: Brain-Computer Integration",
        category: "AI",
        tags: ["BCI", "Neuroscience", "Future Tech"],
        date: "2025-12-01",
        author: "Dr. Nina Patel",
        authorAvatar: "<i class=\"fas fa-brain\"></i>",
        readingTime: 11,
        excerpt: "Recent advances in brain-computer interfaces are opening new possibilities for human-machine interaction.",
        content: `<p>The boundary between human and machine...</p>`,
        featured: false,
        views: 0,
        likes: 0
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
    // initSearch(); // Unused
    // initMenuToggle(); // Unused
    waitForDB().then(() => {
        initVisitorCounter();
        renderStats();
        renderArticles();
    });
    initTheme();
    initBookmarks();
    initCategoryFilter();
    initHamburgerMenu();
    initGiscusComments();
    initAdSense();
    initNewsletterForm();
    initSmoothScroll();
});

async function waitForDB() {
    let attempts = 0;
    while (!window.db && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    if (!window.db) {
        console.warn('Firebase DB not initialized after waiting. Some features may not work.');
    }
}



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
        themeToggle.innerHTML = state.theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
}

// === Search Toggle Fix ===
function initSearchToggle() {
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');

    if (searchToggle && searchContainer) {
        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            searchContainer.classList.toggle('active');

            // Focus search input when opened
            if (searchContainer.classList.contains('active')) {
                const searchInput = searchContainer.querySelector('#search-input');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 300);
                }
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target) && !searchToggle.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });
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

// === Menu Toggle ===
function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (!menuToggle || !dropdownMenu) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // Close dropdown when clicking on a link
    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
        });
    });
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
async function renderStats() {
    const totalArticles = articlesDatabase.length;
    const totalViews = await getTotalViews();
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
async function renderArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;

    const startIdx = (state.currentPage - 1) * CONFIG.articlesPerPage;
    const endIdx = startIdx + CONFIG.articlesPerPage;
    const articlesToShow = state.filteredArticles.slice(startIdx, endIdx);

    if (articlesToShow.length === 0) {
        articlesGrid.innerHTML = '<div class="loading">No articles found. Try a different search or category.</div>';
        return;
    }

    // Fetch stats for all articles being displayed
    const articlesWithStats = await Promise.all(
        articlesToShow.map(async (article) => {
            const stats = await getArticleStats(article.id);
            const userLiked = await hasUserLiked(article.id);
            return { ...article, ...stats, userLiked };
        })
    );

    articlesGrid.innerHTML = articlesWithStats.map(article => `
    <article class="article-card" data-id="${article.id}">
      <div class="article-meta">
        <span class="article-category">${article.category}</span>
        <span class="article-date"><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
        <span class="article-reading-time"><i class="fas fa-clock"></i> ${article.readingTime} min read</span>
      </div>
      <h2>
        <a href="article.html?id=${article.id}" onclick="incrementArticleView(${article.id})">${article.title}</a>
      </h2>
      <p class="article-excerpt">${article.excerpt}</p>
      <div class="article-tags">
        ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
      </div>
      <div class="article-stats">
        <span class="stat-item"><i class="fas fa-eye"></i> ${formatNumber(article.views)} views</span>
        <span class="stat-item"><i class="fas fa-heart"></i> ${formatNumber(article.likes)} likes</span>
      </div>
      <div class="article-footer">
        <a href="article.html?id=${article.id}" onclick="incrementArticleView(${article.id})" class="read-more">
          Read More <i class="fas fa-arrow-right"></i>
        </a>
        <div class="article-actions">
          <button class="action-btn like-btn ${article.userLiked ? 'active' : ''}"
                  data-id="${article.id}"
                  title="${article.userLiked ? 'Unlike' : 'Like'}">
            <i class="fa${article.userLiked ? 's' : 'r'} fa-heart"></i>
          </button>
          <button class="action-btn bookmark-btn ${state.bookmarks.has(article.id) ? 'active' : ''}"
                  data-id="${article.id}"
                  title="Bookmark">
            <i class="fa${state.bookmarks.has(article.id) ? 's' : 'r'} fa-bookmark"></i>
          </button>
          <button class="action-btn share-btn"
                  data-id="${article.id}"
                  title="Share">
            <i class="fas fa-share"></i>
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
      <i class="fas fa-chevron-left"></i> Prev
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
      Next <i class="fas fa-chevron-right"></i>
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
    console.log('Initializing article actions...');

    // Like buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    console.log('Found like buttons:', likeButtons.length);

    likeButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('Like button clicked, article ID:', btn.dataset.id);

            const articleId = parseInt(btn.dataset.id);
            const liked = await toggleArticleLike(articleId);
            console.log('Toggle result:', liked);

            // Update button state
            btn.classList.toggle('active', liked);
            btn.innerHTML = `<i class="fa${liked ? 's' : 'r'} fa-heart"></i>`;
            btn.title = liked ? 'Unlike' : 'Like';

            // Update stats display
            const articleCard = btn.closest('.article-card');
            const statsContainer = articleCard.querySelector('.article-stats');
            if (statsContainer) {
                const stats = await getArticleStats(articleId);
                console.log('Updated stats:', stats);
                statsContainer.innerHTML = `
                    <span class="stat-item"><i class="fas fa-eye"></i> ${formatNumber(stats.views)} views</span>
                    <span class="stat-item"><i class="fas fa-heart"></i> ${formatNumber(stats.likes)} likes</span>
                `;
            }
        });
    });

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

async function incrementArticleView(articleId) {
    // Increment views in Firestore
    await incrementArticleViews(articleId);
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

// === Firebase Database Functions ===
async function getArticleStats(articleId) {
    try {
        if (!window.db) {
            // Demo mode: Count actual likes from localStorage
            const storedViews = parseInt(localStorage.getItem(`dtechnews_article_views_${articleId}`) || '0');

            // Count how many users have liked this article
            let likeCount = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(`demo_like_${articleId}_`)) {
                    if (localStorage.getItem(key) === 'true') {
                        likeCount++;
                    }
                }
            }

            return {
                views: storedViews,
                likes: likeCount
            };
        }

        const docRef = doc(window.db, 'articles', articleId.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                views: data.views || 0,
                likes: data.likes || 0
            };
        } else {
            // Initialize with default values
            await setDoc(docRef, { views: 0, likes: 0 });
            return { views: 0, likes: 0 };
        }
    } catch (error) {
        console.error('Error getting article stats:', error);
        // Fallback to demo mode on error
        const storedViews = parseInt(localStorage.getItem(`dtechnews_article_views_${articleId}`) || '0');

        // Count likes in fallback mode too
        let likeCount = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(`demo_like_${articleId}_`)) {
                if (localStorage.getItem(key) === 'true') {
                    likeCount++;
                }
            }
        }

        return {
            views: storedViews,
            likes: likeCount
        };
    }
}

async function incrementArticleViews(articleId) {
    try {
        if (!window.db) return;

        const docRef = doc(window.db, 'articles', articleId.toString());
        await updateDoc(docRef, {
            views: increment(1)
        });
    } catch (error) {
        console.error('Error incrementing views:', error);
    }
}

async function incrementArticleLikes(articleId) {
    try {
        if (!window.db) return;

        const docRef = doc(window.db, 'articles', articleId.toString());
        await updateDoc(docRef, {
            likes: increment(1)
        });
    } catch (error) {
        console.error('Error incrementing likes:', error);
    }
}

async function decrementArticleLikes(articleId) {
    try {
        if (!window.db) return;

        const docRef = doc(window.db, 'articles', articleId.toString());
        await updateDoc(docRef, {
            likes: increment(-1)
        });
    } catch (error) {
        console.error('Error decrementing likes:', error);
    }
}

async function toggleArticleLike(articleId) {
    console.log('toggleArticleLike called for article:', articleId);
    console.log('window.db available:', !!window.db);

    try {
        if (!window.db) {
            console.log('Using demo mode for likes');
            // Demo mode: Use localStorage to simulate likes
            const userId = getUserId();
            const likeKey = `demo_like_${articleId}_${userId}`;
            const currentlyLiked = localStorage.getItem(likeKey) === 'true';
            console.log('Currently liked:', currentlyLiked);

            if (currentlyLiked) {
                localStorage.removeItem(likeKey);
                console.log('Removed like, returning false');
                return false; // Now unliked
            } else {
                localStorage.setItem(likeKey, 'true');
                console.log('Added like, returning true');
                return true; // Now liked
            }
        }

        console.log('Using Firebase mode for likes');
        const userId = getUserId();
        const likeRef = doc(window.db, 'likes', `${articleId}_${userId}`);
        const likeSnap = await getDoc(likeRef);

        const articleRef = doc(window.db, 'articles', articleId.toString());

        if (likeSnap.exists()) {
            console.log('User already liked, removing like');
            // User already liked, remove like
            await decrementArticleLikes(articleId);
            // Note: In a real app, you'd delete the like document
            return false;
        } else {
            console.log('User has not liked, adding like');
            // User hasn't liked, add like
            await setDoc(likeRef, { userId, articleId, timestamp: new Date() });
            await incrementArticleLikes(articleId);
            return true;
        }
    } catch (error) {
        console.error('Error toggling like:', error);
        // Fallback to demo mode on error
        console.log('Error occurred, falling back to demo mode');
        const userId = getUserId();
        const likeKey = `demo_like_${articleId}_${userId}`;
        const currentlyLiked = localStorage.getItem(likeKey) === 'true';

        if (currentlyLiked) {
            localStorage.removeItem(likeKey);
            return false;
        } else {
            localStorage.setItem(likeKey, 'true');
            return true;
        }
    }
}

async function hasUserLiked(articleId) {
    try {
        if (!window.db) {
            // Demo mode: Check localStorage
            const userId = getUserId();
            const likeKey = `demo_like_${articleId}_${userId}`;
            return localStorage.getItem(likeKey) === 'true';
        }

        const userId = getUserId();
        const likeRef = doc(window.db, 'likes', `${articleId}_${userId}`);
        const likeSnap = await getDoc(likeRef);
        return likeSnap.exists();
    } catch (error) {
        console.error('Error checking like status:', error);
        // Fallback to demo mode on error
        const userId = getUserId();
        const likeKey = `demo_like_${articleId}_${userId}`;
        return localStorage.getItem(likeKey) === 'true';
    }
}

function getUserId() {
    let userId = localStorage.getItem('dtechnews_user_id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now();
        localStorage.setItem('dtechnews_user_id', userId);
    }
    return userId;
}

async function getTotalViews() {
    try {
        if (!window.db) return 0;

        // This is a simplified approach - in a real app you'd use aggregation queries
        // For now, we'll sum up views from all articles
        let totalViews = 0;
        for (const article of articlesDatabase) {
            const stats = await getArticleStats(article.id);
            totalViews += stats.views;
        }
        return totalViews;
    } catch (error) {
        console.error('Error getting total views:', error);
        return 0;
    }
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
    script.setAttribute('data-input-position', 'bottom');
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
