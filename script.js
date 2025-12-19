/* --- D-TECH NEWZ CORE (Top 10 Features) --- */

const state = {
    news: [],
    bookmarks: JSON.parse(localStorage.getItem('dtech_bookmarks')) || [],
    theme: localStorage.getItem('dtech_theme') || 'dark',
    category: 'all',
    searchQuery: '',
    deferredPrompt: null,
    weatherCities: ['San Francisco', 'New York', 'London', 'Tokyo', 'Bangalore'],
    cryptoIds: ['bitcoin', 'ethereum', 'solana', 'cardano', 'ripple']
};

// --- 1. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initPWA();
    initSystemStatus();
    fetchNews();
    fetchCrypto();
    fetchWeather();
    setupEventListeners();
    updateBookmarkCount();
});

// --- 2. Theme System ---
function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('dtech_theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const btn = document.getElementById('themeToggle');
    btn.innerHTML = state.theme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
}

// --- 3. PWA Support ---
function initPWA() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker Registered'));
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        state.deferredPrompt = e;
        showInstallButton();
    });
}

function showInstallButton() {
    const sysBar = document.querySelector('.system-bar');
    if (!document.getElementById('installBtn')) {
        const btn = document.createElement('div');
        btn.className = 'sys-item';
        btn.innerHTML = '<button id="installBtn" class="sys-btn">Install App</button>';
        sysBar.prepend(btn);

        document.getElementById('installBtn').addEventListener('click', async () => {
            if (state.deferredPrompt) {
                state.deferredPrompt.prompt();
                const { outcome } = await state.deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    state.deferredPrompt = null;
                    btn.remove();
                }
            }
        });
    }
}

// --- 4. System Status ---
function initSystemStatus() {
    // Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 1000);

    // Network
    function updateNet() {
        const status = document.getElementById('netStatus');
        status.textContent = navigator.onLine ? 'Online' : 'Offline';
        status.style.color = navigator.onLine ? 'var(--primary)' : 'var(--secondary)';
    }
    window.addEventListener('online', updateNet);
    window.addEventListener('offline', updateNet);
    updateNet();

    // Battery
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const updateBattery = () => {
                document.getElementById('batteryStatus').textContent = `${Math.round(battery.level * 100)}%`;
            };
            battery.addEventListener('levelchange', updateBattery);
            updateBattery();
        });
    }
}

// --- 5. Data Fetching (News, Crypto, Weather) ---
async function fetchNews() {
    // Mock Data for Demo (Replace with real API if needed)
    const mockNews = [
        { title: "AI Breakthrough: GPT-5 Announced", category: "AI", image: "couple-bench-overlooking-mountain-landscape.jpg", excerpt: "OpenAI reveals the next generation of language models with reasoning capabilities." },
        { title: "iPhone 16 Pro Leaks", category: "Mobile", image: "couple-bench-overlooking-mountain-landscape.jpg", excerpt: "New titanium design and periscope lens confirmed for the upcoming flagship." },
        { title: "NVIDIA's New GPU Architecture", category: "Hardware", image: "couple-bench-overlooking-mountain-landscape.jpg", excerpt: "Blackwell architecture promises 5x performance leap in AI training." },
        { title: "SpaceX Starship Successful Launch", category: "Tech", image: "couple-bench-overlooking-mountain-landscape.jpg", excerpt: "The massive rocket reached orbit for the first time in historic test." },
        { title: "Android 15 Features Revealed", category: "Software", image: "couple-bench-overlooking-mountain-landscape.jpg", excerpt: "Google focuses on privacy and satellite connectivity in the next OS update." },
        { title: "Cyberpunk 2077 Sequel Teased", category: "Gaming", image: "couple-bench-overlooking-mountain-landscape.jpg", excerpt: "CD Projekt Red hints at Project Orion with new concept art." }
    ];

    // Duplicate for grid filling
    state.news = [...mockNews, ...mockNews, ...mockNews].map((item, index) => ({ ...item, id: index }));
    renderNews();
}

async function fetchCrypto() {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${state.cryptoIds.join(',')}&vs_currencies=usd&include_24hr_change=true`);
        const data = await response.json();
        const ticker = document.getElementById('cryptoTicker');

        let html = '';
        state.cryptoIds.forEach(id => {
            if (data[id]) {
                const price = data[id].usd;
                const change = data[id].usd_24h_change.toFixed(2);
                const colorClass = change >= 0 ? 'ticker-up' : 'ticker-down';
                const arrow = change >= 0 ? '▲' : '▼';
                html += `
                    <div class="ticker-item">
                        <span>${id.toUpperCase()}</span>
                        <span>$${price}</span>
                        <span class="${colorClass}">${arrow} ${Math.abs(change)}%</span>
                    </div>
                `;
            }
        });
        ticker.innerHTML = html + html; // Duplicate for seamless scroll
    } catch (e) {
        console.error('Crypto Error', e);
    }
}

async function fetchWeather() {
    // Mock Weather for Demo
    const grid = document.getElementById('weatherGrid');
    grid.innerHTML = state.weatherCities.map(city => `
        <div class="weather-item">
            <div style="font-size: 0.8rem; color: var(--text-muted)">${city}</div>
            <div class="weather-temp">${Math.floor(Math.random() * 15) + 15}°C</div>
        </div>
    `).join('');
}

// --- 6. Rendering ---
function renderNews() {
    const grid = document.getElementById('newsGrid');
    const hero = document.getElementById('heroSection');

    const filtered = state.news.filter(item => {
        const matchCat = state.category === 'all' || item.category === state.category;
        const matchSearch = item.title.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No news found.</p>';
        return;
    }

    // Hero (First Item)
    const heroItem = filtered[0];
    hero.innerHTML = `
        <div class="hero-card" onclick="openArticle(${heroItem.id})">
            <img src="${heroItem.image}" alt="${heroItem.title}">
            <div class="hero-overlay">
                <span class="card-tag">${heroItem.category}</span>
                <h2 class="hero-title">${heroItem.title}</h2>
            </div>
        </div>
    `;

    // Grid (Rest)
    grid.innerHTML = filtered.slice(1).map(item => `
        <div class="news-card" onclick="openArticle(${item.id})">
            <div class="card-image">
                <img src="${item.image}" loading="lazy" alt="${item.title}">
            </div>
            <div class="card-content">
                <div>
                    <div class="card-tag">${item.category}</div>
                    <h3 class="card-title">${item.title}</h3>
                </div>
                <p class="card-excerpt">${item.excerpt}</p>
            </div>
        </div>
    `).join('');
}

// --- 7. Article Modal & TTS ---
window.openArticle = (id) => {
    const article = state.news.find(n => n.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const content = document.getElementById('articleModalContent');
    const overlay = document.getElementById('modalOverlay');

    content.innerHTML = `
        <img src="${article.image}" style="width:100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
        <span class="card-tag">${article.category}</span>
        <h1>${article.title}</h1>
        <p style="margin-top: 20px; line-height: 1.8; font-size: 1.1rem;">
            ${article.excerpt} ${article.excerpt} ${article.excerpt}
            </p>
    `;

    // Setup Actions
    document.getElementById('modalBookmarkBtn').onclick = () => toggleBookmark(article);
    document.getElementById('modalShareBtn').onclick = () => shareArticle(article);
    document.getElementById('modalTTSBtn').onclick = () => playTTS(article.title + ". " + article.excerpt);

    modal.classList.add('active');
    overlay.classList.add('active');
};

function closeModals() {
    document.querySelectorAll('.modal, .modal-overlay').forEach(el => el.classList.remove('active'));
    stopTTS();
}

// --- 8. Bookmarks ---
function toggleBookmark(article) {
    const index = state.bookmarks.findIndex(b => b.id === article.id);
    if (index === -1) {
        state.bookmarks.push(article);
        alert('Saved to bookmarks!');
    } else {
        state.bookmarks.splice(index, 1);
        alert('Removed from bookmarks.');
    }
    localStorage.setItem('dtech_bookmarks', JSON.stringify(state.bookmarks));
    updateBookmarkCount();
    renderBookmarks();
}

function updateBookmarkCount() {
    document.getElementById('bookmarkCount').textContent = state.bookmarks.length;
}

function renderBookmarks() {
    const list = document.getElementById('bookmarksList');
    if (state.bookmarks.length === 0) {
        list.innerHTML = '<p>No saved articles.</p>';
        return;
    }
    list.innerHTML = state.bookmarks.map(item => `
        <div class="news-card" onclick="openArticle(${item.id}); closeModals();">
            <div class="card-content">
                <h4>${item.title}</h4>
            </div>
        </div>
    `).join('');
}

// --- 9. AI Chat (D-Bot) ---
function initChat() {
    const chat = document.getElementById('aiChat');
    const header = document.getElementById('chatHeader');
    const close = document.getElementById('closeChat');
    const send = document.getElementById('sendChat');
    const input = document.getElementById('chatInput');
    const msgs = document.getElementById('chatMessages');

    header.onclick = () => chat.classList.toggle('collapsed');
    close.onclick = (e) => { e.stopPropagation(); chat.classList.add('collapsed'); };

    function addMsg(text, type) {
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.textContent = text;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        addMsg(text, 'user');
        input.value = '';

        setTimeout(() => {
            let reply = "I'm focused on tech news. Ask me about AI, Mobile, or Gaming!";
            if (text.toLowerCase().includes('ai')) reply = "AI is booming! GPT-5 and Gemini are leading the charge.";
            if (text.toLowerCase().includes('crypto')) reply = "Crypto is volatile. Check the ticker below for live prices.";
            addMsg(reply, 'bot');
        }, 1000);
    }

    send.onclick = handleSend;
    input.onkeypress = (e) => e.key === 'Enter' && handleSend();
}

// --- 10. TTS (Reading Mode) ---
let synth = window.speechSynthesis;
let utterance = null;

function playTTS(text) {
    stopTTS();
    utterance = new SpeechSynthesisUtterance(text);
    document.getElementById('ttsPlayer').style.display = 'flex';
    synth.speak(utterance);

    utterance.onend = () => {
        document.getElementById('ttsPlayer').style.display = 'none';
    };
}

function stopTTS() {
    if (synth.speaking) synth.cancel();
    document.getElementById('ttsPlayer').style.display = 'none';
}

// --- Event Listeners ---
function setupEventListeners() {
    // Theme
    document.getElementById('themeToggle').onclick = toggleTheme;

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderNews();
    });

    // Categories
    document.querySelectorAll('.category-list li').forEach(li => {
        li.onclick = () => {
            document.querySelector('.category-list li.active').classList.remove('active');
            li.classList.add('active');
            state.category = li.dataset.category;
            renderNews();
        };
    });

    // Bookmarks
    document.getElementById('bookmarksBtn').onclick = () => {
        renderBookmarks();
        document.getElementById('bookmarksModal').classList.add('active');
        document.getElementById('modalOverlay').classList.add('active');
    };

    // Modals
    document.getElementById('modalOverlay').onclick = closeModals;
    document.getElementById('closeArticleModal').onclick = closeModals;
    document.getElementById('closeBookmarksModal').onclick = closeModals;

    // TTS Controls
    document.getElementById('ttsStop').onclick = stopTTS;

    // Init Chat
    initChat();
}

// Share
function shareArticle(article) {
    if (navigator.share) {
        navigator.share({
            title: article.title,
            text: article.excerpt,
            url: window.location.href
        });
    } else {
        alert('Share not supported on this device.');
    }
}
