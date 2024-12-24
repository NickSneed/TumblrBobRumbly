/* global Tumblr */

function attachListener() {
    // Get all elements with the class "my-class"
    const elements = document.querySelectorAll('.show-lightbox');

    // Add a click listener to each element
    elements.forEach(element => {
        element.addEventListener('click', (event) => {

            event.preventDefault();
            
            var p = event.currentTarget;

            var children = Array.from(p.children);
            var x = children.indexOf(event.target);
            var imgArr = [];
            var images = p.querySelectorAll('img');

            // Build array of images
            images.forEach(img => {
                if (img && img.dataset) {
                    imgArr.push({
                        height: img.dataset.height,
                        width: img.dataset.width,
                        low_res: img.getAttribute('src'),
                        high_res: img.dataset.hirez
                    });
                }
            });

            // Open Tumblr lightbox
            if (typeof Tumblr.Lightbox !== "undefined") {
                Tumblr.Lightbox.init(imgArr, x);
            } else {
                if (document.body.classList.contains('page-index')) {
                    window.location = p.getAttribute('href');
                }
            }
        });
    });
}

function init() {

    attachListener();

    // Add a MutationObserver to the #posts element
    const postsElement = document.querySelector('#posts');
    const observer = new MutationObserver((mutationsList) => {

        // Attach listener to each new element
        for (let mutation of mutationsList) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    attachListener(node);
                }
            });
        }
    });

    // Configuration of the observer:
    const config = { childList: true, subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(postsElement, config);
}

export default init;