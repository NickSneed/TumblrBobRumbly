const scrollToTopButton = document.getElementById('to-top');

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
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}

// Initialize
function init() {
    if (scrollToTopButton) {
        // Event listener for button click
        scrollToTopButton.addEventListener('click', scrollToTop);

        // Show button when scrolled down
        window.addEventListener('scroll', () => {
            setToTopDisplay();
        });

        // Set initial display
        setToTopDisplay()
    }
}

export default init;