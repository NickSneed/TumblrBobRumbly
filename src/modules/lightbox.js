/* global Tumblr */

function attachListener() {
    // Get all elements with the class "my-class"
    const lightboxBtnEls = document.querySelectorAll('.show-lightbox');

    // Add a click listener to each element
    lightboxBtnEls.forEach(lightboxBtnEl => {

        // If already initialized, return
        if (lightboxBtnEl.dataset.lightbox === 'initialized') {
            return;
        }

        // Add click event listener
        lightboxBtnEl.addEventListener('click', (event) => {

            event.preventDefault();
            
            var btnEl = event.currentTarget;
            var children = Array.from(btnEl.children);
            var x = children.indexOf(event.target);
            var imgArr = [];
            var images = btnEl.querySelectorAll('img');

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
            }
        });
        
        lightboxBtnEl.setAttribute('data-lightbox', 'initialized');
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