// DOM Elements
const newsGrid = document.getElementById('news-grid');
const paginationContainer = document.getElementById('pagination');
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');

// State
const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let currentCategory = 'all';
let filteredNews = [...newsData];

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await filterNews(''); // Initial render
    initTheme();

    // Search functionality
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        await filterNews(searchTerm);
    });
});

/**
 * Filters news data based on search term and resets pagination
 * @param {string} searchTerm
 */
async function filterNews(searchTerm) {
    currentPage = 1;

    filteredNews = newsData.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );

    await renderApp();
}

/**
 * Renders the application (News Grid + Pagination)
 */
async function renderApp() {
    // Calculate total pages
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

    // Get current page data
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageData = filteredNews.slice(startIndex, endIndex);

    await renderNewsGrid(pageData);
    renderPagination(totalPages);
}

/**
 * Generates a fast-loading tech-focused image URL based on category using generated images
 * @param {string} category - The news category
 * @returns {string} Image URL
 */
function generateFastImage(category) {
    // Generated placeholder images using Lorem Picsum service
    const categorySeeds = {
        'AI': 'ai-technology-brain',
        'Gadgets': 'smartphone-gadget-tech',
        'Cybersecurity': 'security-lock-shield',
        'Latest': 'news-technology-innovation'
    };

    const seed = categorySeeds[category] || 'technology';
    // Use Lorem Picsum to generate consistent images based on seed
    return `https://picsum.photos/seed/${seed}/160/90`;
}

/**
 * Ensures all news items have image URLs - uses original image if available, otherwise fallback
 * @param {Array} news - Array of news items
 * @returns {Array} News items with image URLs
 */
function cacheImagesForNews(news) {
    return news.map((item) => {
        if (!item.imageUrl) {
            // Check if item has an original image field, otherwise use fallback
            item.imageUrl = item.image && item.image.trim() !== "" ? item.image : generateFastImage(item.category);
        }
        return item;
    });
}

/**
 * Renders news cards to the DOM
 * @param {Array} news - Array of news objects for the current page
 */
async function renderNewsGrid(news) {
    // Clear existing content
    newsGrid.innerHTML = '';

    // Handle empty state
    if (news.length === 0) {
        newsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No news found for this category.</p>';
        return;
    }

    // Cache images for news items if not already cached
    const newsWithImages = cacheImagesForNews(news);

    // Generate and append cards
    newsWithImages.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'news-card';

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}" class="card-image">
            <div class="card-content">
                <div class="card-meta">
                    <span class="category-tag">${item.category}</span>
                    <span class="publish-date">${item.date}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
            </div>
            <div class="card-loading-overlay">
                <div class="loading-spinner"></div>
                <p>Loading article...</p>
            </div>
        `;

        // Make card clickable
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const overlay = card.querySelector('.card-loading-overlay');
            overlay.classList.add('active');
            setTimeout(() => {
                overlay.classList.remove('active');
                // Redirect to article page
                window.location.href = `article.html?id=${item.id}`;
            }, 1000);
        });

        newsGrid.appendChild(card);
    });
}

/**
 * Renders pagination controls
 * @param {number} totalPages 
 */
function renderPagination(totalPages) {
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return; // Don't show pagination if only 1 page

    // Back Button
    const backBtn = document.createElement('button');
    backBtn.className = 'pagination-btn';
    backBtn.textContent = '← Back';
    backBtn.disabled = currentPage === 1;
    backBtn.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            await renderApp();
        }
    });

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', async () => {
        if (currentPage < totalPages) {
            currentPage++;
            await renderApp();
        }
    });

    paginationContainer.appendChild(backBtn);

    // Optional: Page Indicator
    // const indicator = document.createElement('span');
    // indicator.textContent = `Page ${currentPage} of ${totalPages}`;
    // paginationContainer.appendChild(indicator);

    paginationContainer.appendChild(nextBtn);
}



/**
 * Theme Management (Dark/Light Mode)
 */
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


