// Sample News Data Array
const newsData = [
    {
        id: 1,
        title: "The Future of AI: Beyond Generative Models",
        description: "Researchers are exploring the next frontier of artificial intelligence, focusing on reasoning and causal understanding.",
        category: "AI",
        date: "Oct 24, 2023"
    },
    {
        id: 2,
        title: "New Quantum Processor Breaks Speed Records",
        description: "A leading tech giant has unveiled a 1000-qubit quantum processor, promising a revolution in computing power.",
        category: "Gadgets",
        date: "Oct 23, 2023"
    },
    {
        id: 3,
        title: "Zero-Day Vulnerability Found in Major OS",
        description: "Cybersecurity experts urge users to update immediately following the discovery of a critical zero-day exploit.",
        category: "Cybersecurity",
        date: "Oct 22, 2023"
    },
    {
        id: 4,
        title: "Smart Glasses: The Next Big Thing?",
        description: "With new releases from major players, smart glasses are poised to become the must-have wearable of the year.",
        category: "Gadgets",
        date: "Oct 21, 2023"
    },
    {
        id: 5,
        title: "Green Tech: Solar Panels Reach New Efficiency",
        description: "Scientists have developed a new material that boosts solar panel efficiency by 40%, making renewable energy more viable.",
        category: "Latest",
        date: "Oct 20, 2023"
    },
    {
        id: 6,
        title: "AI Regulation: Global Leaders Meet",
        description: "World leaders gather to discuss the ethical implications and necessary regulations for the rapidly advancing AI sector.",
        category: "AI",
        date: "Oct 19, 2023"
    },
    {
        id: 7,
        title: "Phishing Attacks on the Rise",
        description: "A new report indicates a 50% increase in sophisticated phishing attacks targeting remote workers.",
        category: "Cybersecurity",
        date: "Oct 18, 2023"
    },
    {
        id: 8,
        title: "Foldable Phones: Here to Stay?",
        description: "Market analysis shows a steady increase in foldable phone adoption as durability concerns fade.",
        category: "Gadgets",
        date: "Oct 17, 2023"
    }
];

// DOM Elements
const newsGrid = document.getElementById('news-grid');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderNews(newsData);
    initTheme();
});

/**
 * Renders news cards to the DOM
 * @param {Array} news - Array of news objects
 */
function renderNews(news) {
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
 * Handle Navigation / Category Filtering
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const category = link.getAttribute('data-category');

        if (category === 'all') {
            renderNews(newsData);
        } else {
            // Filter news based on category (case-insensitive)
            const filteredNews = newsData.filter(item =>
                item.category.toLowerCase() === category.toLowerCase()
            );
            renderNews(filteredNews);
        }
    });
});

/**
 * Theme Management (Dark/Light Mode)
 */
function initTheme() {
    // Check localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Apply and save new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.icon');
    // Change icon based on theme
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
}
