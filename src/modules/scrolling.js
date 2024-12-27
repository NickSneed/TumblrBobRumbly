const scrollToTopButton = document.querySelector('.js-to-top');
const scrollDownButton = document.querySelector('.js-scroll-down');
const postsElement = document.querySelector('.js-posts');


// Smooth scrolling down
function scrollDown() {
    postsElement.scrollIntoView({
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
    if (window.scrollY > 500) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
}

// Initialize
function init() {
    if (scrollToTopButton) {
        // Event listeners for button clicks
        scrollToTopButton.addEventListener('click', scrollToTop);
        scrollDownButton.addEventListener('click', scrollDown);

        // Show button when scrolled down
        window.addEventListener('scroll', () => {
            setToTopDisplay();
        });

        // Set initial display
        setToTopDisplay()
    }
}

export default init;