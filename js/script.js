let container = document.getElementById('articles-container');
var myModal = new bootstrap.Modal(document.getElementById('articleModal'));
let sortCriteria = 'views'; // Default sorting criteria is by views
let currentCategory = 'All'; // Default category is All
let data = { articles: [] }; // Initial empty data

// Load JSON file
fetch('articles.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData; // Store the fetched data
        filterArticlesByCategory('All'); // Filter and display articles after loading data
    })
    .catch(error => {
        console.error('Error loading articles data:', error);
    });

function sortArticles(criteria) {
    sortCriteria = criteria; // Update the sorting criteria based on the button clicked
    filterArticlesByCategory(currentCategory); // Reapply the filtering and sorting with the new criteria
}

function filterArticlesByCategory(category) {
    let filteredArticles = category === 'All' ? data.articles : data.articles.filter(article => article.category === category);

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
        <div class="row gx-4 gx-lg-5 align-items-center my-5 article-title">
            <div class="col-lg-7">
                <img class="img-fluid rounded mb-4 mb-lg-0" src="${firstArticle.image_url}" alt="Article Image" />
            </div>
            <div class="col-lg-5">
                <h1 class="font-weight-light">${firstArticle.title}</h1>
                <p>${firstArticle.summary.substring(0, 100)}…</p>
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
        let truncatedTitle = article.title.length > 50 ?
            article.title.substring(0, 50) + "…" :
            article.title;
        articlesHTML += `
        <div class="col-md-4 mb-4">
            <a href="#!" class="article card h-100 border-0 shadow-sm text-decoration-none" data-bs-toggle="modal" data-bs-target="#articleModal" data-article-id="${article.id}">
                <img src="${article.image_url}" alt="Article Image" class="card-img-top article-img">
                <div class="card-body">
                    <h2 class="card-title article-title">${truncatedTitle}</h2>
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

document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.textContent;
        currentCategory = category; // Update current category
        filterArticlesByCategory(category);
    });
});

// Initial call to display articles (after JSON file is loaded)