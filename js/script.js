let container = document.getElementById('articles-container');
var myModal = new bootstrap.Modal(document.getElementById('articleModal'));
let sortCriteria = 'views'; // Default sorting criteria is by views
let currentCategory = 'All'; // Default category is All
let searchQuery = ''; // Default search query is empty
let data = { articles: [] }; // Initial empty data

// Load JSON file
fetch('articles.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData; // Store the fetched data
        filterArticles(); // Filter and display articles after loading data
    })
    .catch(error => {
        console.error('Error loading articles data:', error);
    });

// Handle filter change
function handleFilterChange() {
    currentCategory = document.getElementById('filterDropdown').value;
    filterArticles(); // Reapply the filtering based on selected category
}

// Handle search input change
function handleSearchChange() {
    searchQuery = document.getElementById('searchBar').value.toLowerCase();
    filterArticles(); // Reapply the filtering based on search query
}

// Apply filtering and sorting
function filterArticles() {
    // Filter articles based on category and search query
    let filteredArticles = data.articles.filter(article => {
        const matchesCategory = currentCategory === 'All' || article.category === currentCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery) || article.summary.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    // Sort articles based on the selected criteria
    if (sortCriteria === 'views') {
        filteredArticles.sort((a, b) => b.views - a.views);
    } else if (sortCriteria === 'title') {
        filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Handle no articles case
    let firstArticle = filteredArticles[0];
    if (firstArticle) {
        let mainArticleHTML = `
        <div class="row main gx-4 gx-lg-5  align-items-center my-5 article-title">
            <div class="col-lg-7 card-image-top">
                <img class="img-fluid rounded mb-4 mb-lg-0" src="${firstArticle.image_url}" alt="Article Image" />
            </div>
            <div class="col-lg-5">
                <h1 class="article-title">${firstArticle.title}</h1>
                <p class="article-summary">${firstArticle.summary.length > 100 ? firstArticle.summary.substring(0, 100) + "…" : firstArticle.summary}</p>
                <a class="btn btn-primary" href="#!" data-bs-toggle="modal" data-bs-target="#articleModal" data-article-id="${firstArticle.id}">Read More</a>
            </div>
        </div>`;
        document.getElementById('article-main-container').innerHTML = mainArticleHTML;
        filteredArticles = filteredArticles.slice(1); // Remove the first article from the list
    } else {
        document.getElementById('article-main-container').innerHTML = '<p>No articles available</p>';
    }

    // Clear the previous articles and display the filtered ones
    let articlesHTML = '';
    filteredArticles.forEach((article) => {
        articlesHTML += `
        <div class="col-md-4 mb-4">
            <a href="#!" class="article card h-100 border-0 shadow-sm text-decoration-none" data-bs-toggle="modal" data-bs-target="#articleModal" data-article-id="${article.id}">
                <img src="${article.image_url}" alt="Article Image" class="card-img-top article-img">
                <div class="card-body">
                    <h2 class="card-title article-title">${article.title.length > 50 ? article.title.substring(0, 50) + "…" : article.title }</h2>
                    <p class="card-text article-summary">${article.summary.length > 100 ? article.summary.substring(0, 100) + "…" : article.summary}</p>
                </div>
            </a>
        </div>`;
    });

    // Inject the HTML at once
    container.innerHTML = articlesHTML;

    // Reapply modal event listeners after the DOM is updated
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior

            // Get the article ID
            let articleId = e.target.closest('[data-bs-toggle="modal"]').getAttribute('data-article-id');
            console.log('Article ID:', articleId); // Log the article ID for debugging

            // Look for the article in the data.articles array
            let article = data.articles.find(a => a.id == articleId);

            // Check if the article is found
            if (article) {
                console.log('Article Found:', article); // Log the found article for debugging

                // Increment views when modal is opened
                article.views++;

                // Set modal content
                document.getElementById('modalTitle').textContent = article.title;
                document.getElementById('modalImage').src = article.image_url;
                document.getElementById('modalSummary').textContent = article.summary;
                document.getElementById('modalViews').textContent = article.views;

                // Show the modal
                myModal.show();
            } else {
                console.log('Article not found');
            }
        });
    });
}

// Handle sorting
function sortArticles(criteria) {
    sortCriteria = criteria; // Update the sorting criteria based on the button clicked
    filterArticles(); // Reapply the filtering and sorting with the new criteria
}

function toggleDarkMode() {
    const body = document.body;
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const modalContent = document.querySelector(".modal-content");
    const toggleButton = document.getElementById("toggleDarkMode");
    const articleModules = document.querySelectorAll("#articles-container .article-module");

    // Toggle dark mode classes
    body.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
    footer.classList.toggle("dark-mode");
    modalContent.classList.toggle("dark-mode");

    // Apply dark mode class to each article module
    articleModules.forEach(module => module.classList.toggle("dark-mode"));

    // Toggle dark mode on buttons and lines
    document.querySelectorAll(".btn-secondary").forEach(button => button.classList.toggle("dark-mode"));
    document.querySelectorAll(".line").forEach(line => line.classList.toggle("dark-mode"));

    // Change button text
    if (body.classList.contains("dark-mode")) {
        toggleButton.textContent = "🌞 Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        toggleButton.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
}

// Apply saved theme on load
window.addEventListener("load", () => {
    const toggleButton = document.getElementById("toggleDarkMode");
    if (localStorage.getItem("theme") === "dark") {
        toggleDarkMode();  // This will also set the button text
        toggleButton.textContent = "🌞 Light Mode";
    }
});