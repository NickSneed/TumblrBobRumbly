// Smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Add smooth animation
    });
}

function init() {
    // Example usage with a button
    const scrollToTopButton = document.getElementById('to-top');

    scrollToTopButton.addEventListener('click', scrollToTop);

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', scrollToTop);

        // Show button when scrolled 500px down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopButton.style.display = 'block';
            } else {
                scrollToTopButton.style.display = 'none';
            }
        });

        // Initially hide the button
        scrollToTopButton.style.display = 'none';
    }
}

export default init;