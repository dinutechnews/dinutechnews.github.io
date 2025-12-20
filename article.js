

// DOM Elements
const articleContent = document.getElementById('article-content');
const themeToggle = document.getElementById('theme-toggle');

// Get article ID from URL
function getArticleId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Find article by ID
function findArticle(id) {
    return newsData.find(article => article.id === id);
}

/**
 * Generates a fast-loading tech-focused image URL for articles using generated images
 * @param {string} category - The news category
 * @returns {string} Image URL
 */
function generateArticleImage(category) {
    // Generated placeholder images using Lorem Picsum service
    const categorySeeds = {
        'AI': 'ai-technology-brain',
        'Gadgets': 'smartphone-gadget-tech',
        'Cybersecurity': 'security-lock-shield',
        'Latest': 'news-technology-innovation'
    };

    const seed = categorySeeds[category] || 'technology';
    // Use Lorem Picsum to generate consistent images based on seed
    return `https://picsum.photos/seed/${seed}/800/600`;
}

// Render article
function renderArticle(article) {
    if (!article) {
        articleContent.innerHTML = '<p>Article not found.</p>';
        return;
    }

    // Check if article has original image, otherwise use fallback
    const imageUrl = article.image && article.image.trim() !== "" ? article.image : generateArticleImage(article.category);

    // Format content with paragraphs
    const paragraphs = article.content.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');

    articleContent.innerHTML = `
        <div class="article-header">
            <span class="article-category">${article.category}</span>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">Published on ${article.date}</div>
        </div>
        <img src="${imageUrl}" alt="${article.title}" class="article-image" loading="lazy">
        <div class="article-body">
            ${paragraphs}
        </div>
    `;
}

// Initialize article page
function initArticlePage() {
    const articleId = getArticleId();
    const article = findArticle(articleId);
    renderArticle(article);
    initTheme();
}

// Theme Management (Dark/Light Mode)
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.icon');
    icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initArticlePage);
