// Sample News Data Array (Expanded for Pagination)
const newsData = [
    { id: 1, title: "The Future of AI: Beyond Generative Models", description: "Researchers are exploring the next frontier of artificial intelligence, focusing on reasoning and causal understanding.", category: "AI", date: "Oct 24, 2023" },
    { id: 2, title: "New Quantum Processor Breaks Speed Records", description: "A leading tech giant has unveiled a 1000-qubit quantum processor, promising a revolution in computing power.", category: "Gadgets", date: "Oct 23, 2023" },
    { id: 3, title: "Zero-Day Vulnerability Found in Major OS", description: "Cybersecurity experts urge users to update immediately following the discovery of a critical zero-day exploit.", category: "Cybersecurity", date: "Oct 22, 2023" },
    { id: 4, title: "Smart Glasses: The Next Big Thing?", description: "With new releases from major players, smart glasses are poised to become the must-have wearable of the year.", category: "Gadgets", date: "Oct 21, 2023" },
    { id: 5, title: "Green Tech: Solar Panels Reach New Efficiency", description: "Scientists have developed a new material that boosts solar panel efficiency by 40%, making renewable energy more viable.", category: "Latest", date: "Oct 20, 2023" },
    { id: 6, title: "AI Regulation: Global Leaders Meet", description: "World leaders gather to discuss the ethical implications and necessary regulations for the rapidly advancing AI sector.", category: "AI", date: "Oct 19, 2023" },
    { id: 7, title: "Phishing Attacks on the Rise", description: "A new report indicates a 50% increase in sophisticated phishing attacks targeting remote workers.", category: "Cybersecurity", date: "Oct 18, 2023" },
    { id: 8, title: "Foldable Phones: Here to Stay?", description: "Market analysis shows a steady increase in foldable phone adoption as durability concerns fade.", category: "Gadgets", date: "Oct 17, 2023" },
    { id: 9, title: "SpaceX Launches New Satellite Constellation", description: "The latest launch aims to provide global internet coverage to even the most remote areas of the planet.", category: "Latest", date: "Oct 16, 2023" },
    { id: 10, title: "The Rise of Edge Computing", description: "Processing data closer to the source is becoming critical for IoT devices and real-time applications.", category: "Latest", date: "Oct 15, 2023" },
    { id: 11, title: "New Battery Tech Charges in Minutes", description: "A breakthrough in solid-state batteries could allow EVs to charge fully in under 10 minutes.", category: "Gadgets", date: "Oct 14, 2023" },
    { id: 12, title: "Cyber Warfare: The New Battlefield", description: "Nations are increasingly investing in cyber capabilities, raising concerns about digital sovereignty.", category: "Cybersecurity", date: "Oct 13, 2023" },
    { id: 13, title: "AI in Healthcare: Diagnosing Diseases", description: "AI algorithms are now outperforming human doctors in detecting early signs of certain cancers.", category: "AI", date: "Oct 12, 2023" },
    { id: 14, title: "VR Headsets: Lighter and Faster", description: "The next generation of VR headsets promises to be comfortable enough for all-day wear.", category: "Gadgets", date: "Oct 11, 2023" },
    { id: 15, title: "Blockchain Beyond Crypto", description: "Industries from supply chain to voting are adopting blockchain technology for transparency and security.", category: "Latest", date: "Oct 10, 2023" },
    { id: 16, title: "5G Expansion Continues Globally", description: "Telecommunications companies are racing to complete their 5G networks, unlocking new possibilities for mobile tech.", category: "Latest", date: "Oct 09, 2023" },
    { id: 17, title: "Ethical AI: Bias in Algorithms", description: "A new study highlights the persistent issue of bias in machine learning models and proposes solutions.", category: "AI", date: "Oct 08, 2023" },
    { id: 18, title: "Ransomware Attacks Hit Hospitals", description: "Critical infrastructure remains a prime target for ransomware gangs, putting lives at risk.", category: "Cybersecurity", date: "Oct 07, 2023" },
    { id: 19, title: "Smart Homes: Interoperability Standards", description: "Matter, the new smart home standard, finally allows devices from different brands to work together seamlessly.", category: "Gadgets", date: "Oct 06, 2023" },
    { id: 20, title: "Tech Layoffs: Industry Analysis", description: "Experts analyze the recent wave of layoffs in the tech sector and what it means for the future of innovation.", category: "Latest", date: "Oct 05, 2023" }
];

// DOM Elements
const newsGrid = document.getElementById('news-grid');
const paginationContainer = document.getElementById('pagination');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

// State
const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let currentCategory = 'all';
let filteredNews = [...newsData];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    filterNews('all'); // Initial render
    initTheme();
});

/**
 * Filters news data based on category and resets pagination
 * @param {string} category 
 */
function filterNews(category) {
    currentCategory = category;
    currentPage = 1;

    if (category === 'all') {
        filteredNews = [...newsData];
    } else {
        filteredNews = newsData.filter(item =>
            item.category.toLowerCase() === category.toLowerCase()
        );
    }

    renderApp();
}

/**
 * Renders the application (News Grid + Pagination)
 */
function renderApp() {
    // Calculate total pages
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

    // Get current page data
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageData = filteredNews.slice(startIndex, endIndex);

    renderNewsGrid(pageData);
    renderPagination(totalPages);
}

/**
 * Renders news cards to the DOM
 * @param {Array} news - Array of news objects for the current page
 */
function renderNewsGrid(news) {
    // Clear existing content
    newsGrid.innerHTML = '';

    // Handle empty state
    if (news.length === 0) {
        newsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No news found for this category.</p>';
        return;
    }

    // Generate and append cards
    news.forEach(item => {
        const card = document.createElement('article');
        card.className = 'news-card';

        card.innerHTML = `
            <div class="card-content">
                <div class="card-meta">
                    <span class="category-tag">${item.category}</span>
                    <span class="publish-date">${item.date}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
                <a href="#" class="read-more">Read Article &rarr;</a>
            </div>
        `;

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
    backBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderApp();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderApp();
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
 * Handle Navigation / Category Filtering
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const category = link.getAttribute('data-category');
        filterNews(category);
    });
});

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
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
}
