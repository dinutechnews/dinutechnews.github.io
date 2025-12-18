// Mock Data for fallback
const MOCK_DATA = [
    {
        id: '1',
        title: "The Future of AI: Generative Models Take Center Stage",
        excerpt: "Generative AI is reshaping industries from creative arts to software development, promising a new era of productivity.",
        content: "<p>Artificial Intelligence has taken a massive leap forward with the advent of generative models. From DALL-E creating art to GPT-4 writing code, the landscape of technology is shifting beneath our feet.</p><h2>The Impact on Creativity</h2><p>Artists and writers are finding new collaborators in machines. While some fear displacement, others see an unprecedented opportunity for augmentation.</p><h2>Coding with AI</h2><p>Developers are now pair-programming with AI assistants, reducing boilerplate code and focusing on complex logic. The efficiency gains are palpable across the industry.</p>",
        author: "Sarah Connor",
        date: "Dec 19, 2025",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
        category: "AI"
    },
    {
        id: '2',
        title: "Startup 'GreenTech' Raises $50M Series A",
        excerpt: "A new player in the sustainable energy sector has secured significant funding to scale its carbon capture technology.",
        content: "<p>GreenTech, a San Francisco-based startup, announced today that it has raised $50 million in Series A funding led by Sequoia Capital.</p><p>The company's proprietary carbon capture technology promises to reduce industrial emissions by up to 40% at a fraction of the current cost.</p>",
        author: "Mike Ross",
        date: "Dec 18, 2025",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
        category: "Startups"
    },
    {
        id: '3',
        title: "Review: The New Pixel 10 Pro",
        excerpt: "Google's latest flagship phone offers an incredible camera and all-day battery life, but is it worth the upgrade?",
        content: "<p>The Pixel 10 Pro is here, and it's a beast. With the new Tensor G5 chip, performance is smoother than ever.</p><h2>Camera</h2><p>As expected, the camera is the star of the show. Night Sight is faster, and the new zoom capabilities are mind-blowing.</p>",
        author: "David Smith",
        date: "Dec 17, 2025",
        image: "https://images.unsplash.com/photo-1598327775666-35cf88aea00c?auto=format&fit=crop&q=80&w=1000",
        category: "Gadgets"
    },
    {
        id: '4',
        title: "Crypto Markets Rally as Regulations Clarify",
        excerpt: "Bitcoin and Ethereum see double-digit gains following new SEC guidelines on digital assets.",
        content: "<p>The cryptocurrency market breathed a sigh of relief this week as the SEC released clear guidelines for digital asset classification.</p>",
        author: "Alice Wonderland",
        date: "Dec 16, 2025",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1000",
        category: "Fintech"
    },
    {
        id: '5',
        title: "SpaceX Successfully Launches Starship V3",
        excerpt: "The massive rocket achieved orbit and returned safely, marking a major milestone for Mars colonization plans.",
        content: "<p>SpaceX has done it again. Starship V3 lifted off from Starbase, Texas this morning, carrying a payload of Starlink satellites.</p>",
        author: "Elon M.",
        date: "Dec 15, 2025",
        image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&q=80&w=1000",
        category: "Space"
    }
];

// Firebase Configuration (Placeholder)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};

// State
let db = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Try to init Firebase if keys are present
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        try {
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
            const { getFirestore, collection, getDocs, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

            const app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            window.firestore = { collection, getDocs, doc, getDoc }; // Expose for helpers
            console.log("Firebase initialized");
        } catch (e) {
            console.error("Firebase init failed, falling back to mock", e);
        }
    }

    // Router Logic
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (path.includes('article.html')) {
        const id = params.get('id');
        loadArticle(id);
    } else {
        const category = params.get('category');
        loadHome(category);
    }
});

// Data Fetching
async function getArticles() {
    if (db && window.firestore) {
        try {
            const { collection, getDocs } = window.firestore;
            const querySnapshot = await getDocs(collection(db, "articles"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {
            console.error("Fetch failed", e);
            return MOCK_DATA;
        }
    }
    return MOCK_DATA;
}

async function getArticleById(id) {
    if (db && window.firestore) {
        try {
            const { doc, getDoc } = window.firestore;
            const docRef = doc(db, "articles", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
        } catch (e) {
            console.error("Fetch failed", e);
        }
    }
    return MOCK_DATA.find(a => a.id === id);
}

// Rendering
async function loadHome(category) {
    const heroContainer = document.getElementById('hero-container');
    const feedContainer = document.getElementById('feed-container');

    let articles = await getArticles();

    if (category) {
        articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
        // Hide hero on category pages if desired, or just show first matching as hero
    }

    if (articles.length === 0) {
        feedContainer.innerHTML = '<p>No articles found.</p>';
        return;
    }

    // Hero (First article)
    const hero = articles[0];
    if (heroContainer) {
        heroContainer.innerHTML = `
            <a href="article.html?id=${hero.id}">
                <img src="${hero.image}" alt="${hero.title}">
                <div class="hero-overlay">
                    <span class="category-tag">${hero.category}</span>
                    <h1 class="hero-title">${hero.title}</h1>
                    <div class="meta">
                        <span>${hero.author}</span> • <span>${hero.date}</span>
                    </div>
                </div>
            </a>
        `;
    }

    // Feed (Rest)
    if (feedContainer) {
        feedContainer.innerHTML = articles.slice(1).map(article => `
            <article class="article-card">
                <div class="card-image">
                    <a href="article.html?id=${article.id}">
                        <img src="${article.image}" alt="${article.title}">
                    </a>
                </div>
                <div class="card-content">
                    <span class="card-category">${article.category}</span>
                    <h2 class="card-title">
                        <a href="article.html?id=${article.id}">${article.title}</a>
                    </h2>
                    <p class="card-excerpt">${article.excerpt}</p>
                    <div class="meta">
                        <span>${article.author}</span> • <span>${article.date}</span>
                    </div>
                </div>
            </article>
        `).join('');
    }
}

async function loadArticle(id) {
    const container = document.getElementById('article-content');
    if (!container) return;

    const article = await getArticleById(id);

    if (!article) {
        container.innerHTML = '<h1>Article not found</h1>';
        return;
    }

    document.title = `${article.title} | D-Tech Newz`;

    container.innerHTML = `
        <header class="single-header">
            <span class="category-tag">${article.category}</span>
            <h1 class="single-title">${article.title}</h1>
            <div class="meta">
                <span>By <strong>${article.author}</strong></span> • <span>${article.date}</span>
            </div>
        </header>
        <img src="${article.image}" alt="${article.title}" class="single-image">
        <div class="article-body">
            ${article.content}
        </div>
    `;
}
