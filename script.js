/**
 * D-TECH-NEWZ Mega Script
 * Implements 50+ features including Real APIs, Games, Tools, and System APIs.
 */

// --- Data & State ---
// Initial Mock Data (Fallback)
const initialArticles = [
    { id: 1, title: "Loading Real News...", category: "System", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000", date: "Just Now", summary: "Fetching the latest tech headlines from around the world...", content: "<p>Please wait while we connect to the global news network.</p>" }
];

const state = {
    articles: [...initialArticles],
    bookmarks: JSON.parse(localStorage.getItem('dtech_bookmarks')) || [],
    xp: parseInt(localStorage.getItem('dtech_xp')) || 0,
    level: 1,
    theme: localStorage.getItem('dtech_theme') || 'dark',
    konami: [],
    konami: [],
    snakeGame: null,
    deferredPrompt: null,
    weatherCities: [
        { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
        { name: "New York", lat: 40.7128, lon: -74.0060 },
        { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
        { name: "London", lat: 51.5074, lon: -0.1278 }
    ]
};

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initVisuals();
    initSystem();
    initContent();
    initGamification();
    initTools();
    initGames();
    initAI();
    setupEvents();
    initPWA();

    // Fetch Real Data
    fetchRealNews();
    fetchRealCrypto();
    fetchRealWeather();
});

// --- PWA Logic ---
function initPWA() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(err => console.error('SW Registration Failed:', err));
    }

    // Install Prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        state.deferredPrompt = e;
        const btn = document.getElementById('installAppBtn');
        if (btn) {
            btn.style.display = 'block';
            btn.addEventListener('click', () => {
                btn.style.display = 'none';
                state.deferredPrompt.prompt();
                state.deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                        updateXP(50);
                        showToast("App Installed! +50 XP");
                    }
                    state.deferredPrompt = null;
                });
            });
        }
    });
}

// --- 0. Real Data Integration ---

async function fetchRealNews() {
    try {
        // Using saurav.tech proxy for NewsAPI to avoid CORS and API key exposure on frontend
        const res = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json');
        const data = await res.json();

        if (data.articles) {
            state.articles = data.articles.map((a, index) => ({
                id: index + 100, // Offset IDs
                title: a.title,
                category: "Tech", // API doesn't give granular categories, default to Tech
                image: a.urlToImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
                date: new Date(a.publishedAt).toLocaleDateString(),
                summary: a.description || "No description available.",
                content: a.content || a.description || "Read the full story at the source.",
                url: a.url
            })).slice(0, 12); // Limit to 12

            renderNews();
            renderHero();
            showToast("Live News Updated 🌍");
        }
    } catch (e) {
        console.error("News Fetch Error:", e);
        showToast("Using Offline News Mode");
    }
}

async function fetchRealCrypto() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,cardano,dogecoin&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();

        const mapping = {
            bitcoin: "BTC", ethereum: "ETH", solana: "SOL",
            ripple: "XRP", cardano: "ADA", dogecoin: "DOGE"
        };

        const tickerData = Object.keys(data).map(key => ({
            symbol: mapping[key],
            price: data[key].usd.toLocaleString(),
            change: data[key].usd_24h_change.toFixed(2) + "%",
            up: data[key].usd_24h_change >= 0
        }));

        renderTicker(tickerData);
    } catch (e) {
        console.error("Crypto Fetch Error:", e);
    }
}

async function fetchRealWeather() {
    const grid = document.getElementById('weatherGrid');
    grid.innerHTML = ''; // Clear mock

    for (const city of state.weatherCities) {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
            const data = await res.json();

            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            let icon = "fa-sun";

            // Simple WMO code mapping
            if (code > 3) icon = "fa-cloud";
            if (code > 50) icon = "fa-cloud-rain";
            if (code > 70) icon = "fa-snowflake";
            if (code > 95) icon = "fa-bolt";

            const div = document.createElement('div');
            div.className = 'weather-item';
            div.innerHTML = `
                <i class="fa-solid ${icon}"></i>
                <span class="weather-temp">${temp}°C</span>
                <span class="weather-city">${city.name}</span>
            `;
            grid.appendChild(div);
        } catch (e) {
            console.error("Weather Fetch Error:", e);
        }
    }
}

// --- 1. Visuals & UI Pack ---
function initVisuals() {
    // Custom Cursor
    const cursor = document.getElementById('customCursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .news-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + "%";

        // Back to Top
        const btn = document.getElementById('backToTop');
        if (winScroll > 300) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });

    // Theme
    document.documentElement.setAttribute('data-theme', state.theme);
    document.getElementById('themeToggle').addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('dtech_theme', state.theme);
        document.documentElement.setAttribute('data-theme', state.theme);
        document.querySelector('#themeToggle i').className = state.theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    });
}

// --- 2. System Status ---
function initSystem() {
    // Network
    const netStatus = document.getElementById('netStatus');
    const updateNet = () => {
        netStatus.textContent = navigator.onLine ? "Online" : "Offline";
        netStatus.style.color = navigator.onLine ? "#00ff88" : "#ff3333";
    };
    window.addEventListener('online', updateNet);
    window.addEventListener('offline', updateNet);
    updateNet();

    // Battery
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            const updateBat = () => {
                document.getElementById('batteryStatus').textContent = Math.round(battery.level * 100) + "%";
            };
            battery.addEventListener('levelchange', updateBat);
            updateBat();
        });
    }

    // Binary Clock
    setInterval(() => {
        const now = new Date();
        const time = now.getHours().toString(2).padStart(4, '0') + ':' + now.getMinutes().toString(2).padStart(6, '0');
        document.getElementById('binaryClock').textContent = time;
    }, 1000);

    // Live Readers (Mock)
    setInterval(() => {
        const count = 1200 + Math.floor(Math.random() * 50);
        document.getElementById('liveReaders').textContent = count.toLocaleString() + " Online";
    }, 3000);
}

// --- 3. Content Rendering ---
function initContent() {
    renderTicker([]); // Init empty
    renderPoll();
    renderNews(); // Init with placeholder
}

function renderTicker(data) {
    const ticker = document.getElementById('cryptoTicker');
    if (data.length === 0) {
        ticker.innerHTML = '<div class="ticker-item">Loading Market Data...</div>';
        return;
    }

    const tickerContent = data.map(i => `
        <div class="ticker-item"><strong>${i.symbol}</strong> <span>$${i.price}</span> <span class="${i.up ? 'ticker-up' : 'ticker-down'}">${i.change}</span></div>
    `).join('');
    ticker.innerHTML = tickerContent + tickerContent; // Duplicate for loop
}

function renderHero() {
    if (state.articles.length === 0) return;
    const hero = state.articles[0];
    const section = document.getElementById('heroSection');
    section.innerHTML = `
        <div class="hero-card" onclick="openArticle(${hero.id})">
            <img src="${hero.image}" alt="${hero.title}">
            <div class="hero-overlay">
                <span class="hero-tag">${hero.category}</span>
                <h1 class="hero-title">${hero.title}</h1>
                <div class="hero-meta">
                    <span><i class="fa-regular fa-calendar"></i> ${hero.date}</span>
                </div>
            </div>
        </div>
    `;
}

function renderNews() {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = state.articles.slice(1).map(a => `
        <div class="news-card" onclick="openArticle(${a.id})">
            <div class="card-image"><img src="${a.image}" loading="lazy"></div>
            <div class="card-content">
                <span class="card-tag">${a.category}</span>
                <h3 class="card-title">${a.title}</h3>
                <p class="card-excerpt">${a.summary}</p>
            </div>
        </div>
    `).join('');

    // Init 3D Tilt
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

function renderPoll() {
    const opts = document.getElementById('pollOptions');
    opts.innerHTML = `
        <div class="poll-option" onclick="vote(this)"><div class="poll-bar-bg"><div class="poll-text"><span>AGI</span></div></div></div>
        <div class="poll-option" onclick="vote(this)"><div class="poll-bar-bg"><div class="poll-text"><span>Quantum</span></div></div></div>
        <div class="poll-option" onclick="vote(this)"><div class="poll-bar-bg"><div class="poll-text"><span>Metaverse</span></div></div></div>
    `;
}

window.vote = (el) => {
    if (el.classList.contains('voted')) return;
    el.classList.add('voted');
    el.querySelector('.poll-bar-bg').style.background = 'rgba(0, 242, 255, 0.2)';
    updateXP(5);
    showToast("Vote Recorded!");
};

// --- 4. Gamification ---
function initGamification() {
    updateXP(0); // Init UI
}

function updateXP(amount) {
    state.xp += amount;
    state.level = Math.floor(state.xp / 100) + 1;
    localStorage.setItem('dtech_xp', state.xp);

    document.getElementById('userLevel').textContent = state.level;
    const progress = state.xp % 100;
    document.getElementById('xpFill').style.width = progress + "%";

    if (amount > 0) showToast(`+${amount} XP`);
}

// --- 5. Tools & Games ---
function initTools() {
    document.getElementById('toolboxBtn').addEventListener('click', () => {
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('toolboxModal').classList.add('active');
    });

    // Calculator Logic (Simple)
    document.getElementById('toolCalc').addEventListener('click', () => {
        const content = document.getElementById('toolContent');
        content.innerHTML = `
            <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:5px; margin-top:20px;">
                <input id="calcDisp" style="grid-column:1/-1; padding:10px; margin-bottom:10px; background:rgba(0,0,0,0.5); color:white; border:none;" readonly>
                ${[7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '=', '+'].map(b => `<button onclick="calc('${b}')" style="padding:10px; background:rgba(255,255,255,0.1); border:none; color:white; cursor:pointer;">${b}</button>`).join('')}
            </div>
        `;
    });

    // QR Gen
    document.getElementById('toolQR').addEventListener('click', () => {
        const content = document.getElementById('toolContent');
        content.innerHTML = `
            <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
                <input id="qrInput" placeholder="Enter URL..." style="padding:10px; background:rgba(255,255,255,0.1); border:none; color:white;">
                <button onclick="genQR()" style="padding:10px; background:var(--primary); border:none; font-weight:bold;">Generate</button>
                <img id="qrImg" style="margin-top:10px; display:none; background:white; padding:10px;">
            </div>
        `;
    });
}

window.calc = (val) => {
    const disp = document.getElementById('calcDisp');
    if (val === '=') { try { disp.value = eval(disp.value); } catch { disp.value = 'Err'; } }
    else disp.value += val;
};

window.genQR = () => {
    const input = document.getElementById('qrInput').value;
    if (!input) return;
    const img = document.getElementById('qrImg');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(input)}`;
    img.style.display = 'block';
};

function initGames() {
    document.getElementById('gameBtn').addEventListener('click', () => {
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('gamesModal').classList.add('active');
    });

    document.getElementById('startSnakeBtn').addEventListener('click', startSnake);
}

function startSnake() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 1, dy = 0;
    let score = 0;

    if (state.snakeGame) clearInterval(state.snakeGame);

    state.snakeGame = setInterval(() => {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            document.getElementById('snakeScore').textContent = "Score: " + score;
            food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
            updateXP(5);
        } else {
            snake.pop();
        }

        // Draw
        ctx.fillStyle = 'black'; ctx.fillRect(0, 0, 400, 400);
        ctx.fillStyle = '#00f2ff';
        snake.forEach(s => ctx.fillRect(s.x * 20, s.y * 20, 18, 18));
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(food.x * 20, food.y * 20, 18, 18);

        // Collision (Simple)
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            clearInterval(state.snakeGame);
            alert('Game Over! XP Gained: ' + (score / 2));
        }
    }, 100);

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
        if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
        if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
        if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
    });
}

// --- 6. AI Chat (Upgraded) ---
function initAI() {
    const chat = document.getElementById('aiChat');
    document.getElementById('chatHeader').addEventListener('click', () => {
        chat.classList.toggle('collapsed');
    });

    const send = () => {
        const input = document.getElementById('chatInput');
        const text = input.value.trim().toLowerCase();
        if (!text) return;

        const msgs = document.getElementById('chatMessages');
        msgs.innerHTML += `<div class="msg user">${input.value}</div>`;
        input.value = '';

        // Smart Responses
        let reply = "I'm not sure about that, but I'm learning!";

        if (text.includes('hello') || text.includes('hi')) reply = "Hello! Ready to talk tech?";
        else if (text.includes('news')) reply = "I've updated the feed with the latest headlines from NewsAPI.";
        else if (text.includes('crypto') || text.includes('price')) reply = "Check the ticker at the top for live CoinGecko prices!";
        else if (text.includes('weather')) reply = "I'm pulling weather data from Open-Meteo for major tech hubs.";
        else if (text.includes('snake')) reply = "You can play Snake in the Game Center (Controller icon)!";
        else if (text.includes('who are you')) reply = "I am D-Bot, your AI news assistant.";

        setTimeout(() => {
            msgs.innerHTML += `<div class="msg bot">${reply}</div>`;
            msgs.scrollTop = msgs.scrollHeight;
        }, 800);
    };

    document.getElementById('sendChat').addEventListener('click', send);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') send();
    });
}

// --- 7. Events & Easter Eggs ---
function setupEvents() {
    // Konami Code
    document.addEventListener('keydown', (e) => {
        state.konami.push(e.key);
        if (state.konami.length > KONAMI_CODE.length) state.konami.shift();
        if (JSON.stringify(state.konami) === JSON.stringify(KONAMI_CODE)) {
            activateMatrix();
        }
    });

    // Modal Close
    document.querySelectorAll('.close-modal, #modalOverlay').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target === el || el.classList.contains('close-modal')) {
                document.querySelectorAll('.modal, #modalOverlay').forEach(m => m.classList.remove('active'));
                if (state.snakeGame) clearInterval(state.snakeGame);
            }
        });
    });

    // Back to Top
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Accessibility
    document.getElementById('a11yBtn').addEventListener('click', () => {
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('a11yModal').classList.add('active');
    });

    document.getElementById('toggleDyslexia').addEventListener('click', (e) => {
        document.body.classList.toggle('dyslexia-mode');
        e.target.textContent = document.body.classList.contains('dyslexia-mode') ? "On" : "Off";
    });

    document.getElementById('toggleContrast').addEventListener('click', (e) => {
        document.body.classList.toggle('high-contrast');
        e.target.textContent = document.body.classList.contains('high-contrast') ? "On" : "Off";
    });
}

window.adjustFontSize = (change) => {
    const current = parseFloat(getComputedStyle(document.documentElement).fontSize);
    document.documentElement.style.fontSize = (current + change) + 'px';
};

function activateMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01";
    const drops = Array(Math.floor(canvas.width / 20)).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = '20px monospace';

        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 20, y * 20);
            if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 50);

    showToast("MATRIX MODE ACTIVATED");
}

function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:var(--primary); color:black; padding:10px 20px; border-radius:20px; z-index:9999; font-weight:bold; box-shadow:0 5px 15px rgba(0,0,0,0.3);";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// --- Helpers ---
window.openArticle = (id) => {
    const article = state.articles.find(a => a.id === id);
    if (!article) return;

    const content = document.getElementById('articleModalContent');
    content.innerHTML = `
        <img src="${article.image}" style="width:100%; height:300px; object-fit:cover;">
        <div style="padding:20px;">
            <span style="color:var(--primary); font-weight:bold;">${article.category}</span>
            <h1 style="font-size:2rem; margin:10px 0;">${article.title}</h1>
            <p style="color:var(--text-muted); line-height:1.6;">${article.content}</p>
            ${article.url ? `<a href="${article.url}" target="_blank" style="display:inline-block; margin-top:20px; color:var(--primary);">Read Full Story <i class="fa-solid fa-external-link"></i></a>` : ''}
        </div>
    `;

    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('articleModal').classList.add('active');
    updateXP(10);
};
