// Go back to the previous page
function goBack(event) {
    event.preventDefault();
    history.back();
}

// Check if page is a post
function isPagePost() {
    return document.body.classList.contains('page-permalink');
}

// Initialize
function init() {

    // Check if page is a post
    if (!isPagePost()) {
        return;
    }
    
    // Init back button
    const backButtonEl = document.querySelector('.js-back-button');
    if (backButtonEl) {
        backButtonEl.addEventListener('click', goBack);
    }
}

export default init;