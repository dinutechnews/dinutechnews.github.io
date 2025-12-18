document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (window.location.pathname.includes('article.html')) {
                loadArticle(data);
            } else {
                loadHomepage(data);
            }
        })
        .catch(error => console.error('Error loading data:', error));
});

function loadHomepage(articles) {
    const heroContainer = document.getElementById('hero-container');
    const articleFeed = document.getElementById('article-feed');
    const trendingFeed = document.getElementById('trending-feed');

    // Hero Article (First one)
    const heroArticle = articles[0];
    if (heroContainer && heroArticle) {
        heroContainer.innerHTML = `
            <img src="${heroArticle.image}" alt="${heroArticle.title}">
            <div class="hero-content">
                <span class="hero-tag">${heroArticle.category}</span>
                <h1 class="hero-title"><a href="article.html?id=${heroArticle.id}">${heroArticle.title}</a></h1>
                <div class="hero-meta">
                    <span>${heroArticle.author}</span> • <span>${heroArticle.date}</span>
                </div>
            </div>
        `;
    }

    // Main Feed (Rest of the articles)
    if (articleFeed) {
        articleFeed.innerHTML = ''; // Clear loading
        articles.slice(1).forEach(article => {
            const card = document.createElement('div');
            card.className = 'article-card';
            card.innerHTML = `
                <div class="article-image">
                    <a href="article.html?id=${article.id}">
                        <img src="${article.image}" alt="${article.title}">
                    </a>
                </div>
                <div class="article-content">
                    <div class="article-category">${article.category}</div>
                    <h2 class="article-title"><a href="article.html?id=${article.id}">${article.title}</a></h2>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span>${article.author}</span> • <span>${article.date}</span>
                    </div>
                </div>
            `;
            articleFeed.appendChild(card);
        });
    }

    // Trending Feed (Random or last few)
    if (trendingFeed) {
        articles.slice(0, 3).forEach(article => {
            const miniCard = document.createElement('div');
            miniCard.className = 'mini-card';
            miniCard.innerHTML = `
                <div class="article-category">${article.category}</div>
                <h3 class="article-title"><a href="article.html?id=${article.id}">${article.title}</a></h3>
            `;
            trendingFeed.appendChild(miniCard);
        });
    }
}

function loadArticle(articles) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const container = document.getElementById('article-container');

    const article = articles.find(a => a.id === id);

    if (article && container) {
        document.title = `${article.title} | D-Tech Newz`;
        container.innerHTML = `
            <div class="single-header">
                <span class="single-category">${article.category}</span>
                <h1 class="single-title">${article.title}</h1>
                <div class="single-meta">
                    <span>By ${article.author}</span>
                    <span>${article.date}</span>
                </div>
            </div>
            <img src="${article.image}" alt="${article.title}" class="single-image">
            <div class="single-content">
                ${article.content}
            </div>
        `;
    } else if (container) {
        container.innerHTML = '<h1>Article not found</h1><p><a href="index.html">Go back home</a></p>';
    }
}
