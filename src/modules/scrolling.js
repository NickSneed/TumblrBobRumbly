const scrollToTopButtonEls = document.querySelectorAll('.js-to-top');
const scrollDownButtonEl = document.querySelector('.js-scroll-down');
const toTopButtonEl = document.querySelector('.js-to-top-arrow');
const postsEl = document.querySelector('.js-posts');

// Smooth scrolling down
function scrollDown() {
    postsEl.scrollIntoView({
        behavior: 'smooth'
    });
}

// Smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Set the display of the button
function setToTopDisplay() {
    if (window.scrollY > 200) {
        toTopButtonEl.classList.add('show');
    } else {
        toTopButtonEl.classList.remove('show');
    }
}

// Initialize
function init() {

    // Init to top buttons
    if (scrollToTopButtonEls) {
        scrollToTopButtonEls.forEach(button => {
            button.addEventListener('click', scrollToTop);
        });

        // Show button when scrolled down
        window.addEventListener('scroll', () => {
            setToTopDisplay();
        });

        // Set initial display
        setToTopDisplay()
    }
    
    // Init scroll down button
    if (scrollDownButtonEl) {
        scrollDownButtonEl.addEventListener('click', scrollDown);
    }
}

export default init;