/* global Tumblr */

function attachListeners() {
    const lightboxBtnEls = document.querySelectorAll('.js-show-lightbox');

    // Add a click listener to each element
    lightboxBtnEls.forEach(lightboxBtnEl => {

        // If already initialized, return
        if (lightboxBtnEl.dataset.lightbox === 'initialized') {
            return;
        }

        // Add click event listener
        lightboxBtnEl.addEventListener('click', (event) => {

            event.preventDefault();

            const btnEl = event.currentTarget;
            const children = Array.from(btnEl.children);
            const x = children.indexOf(event.target);
            const imgArr = [];
            const images = btnEl.querySelectorAll('img');

            // Build array of images
            images.forEach(img => {
                if (img?.dataset) {
                    const { height, width, hirez } = img.dataset;
                    imgArr.push({
                        height,
                        width,
                        low_res: img.getAttribute('src'),
                        high_res: hirez
                    });
                }
            });

            // Open Tumblr lightbox
            if (typeof Tumblr !== "undefined" && typeof Tumblr.Lightbox !== "undefined") {
                Tumblr.Lightbox.init(imgArr, x);
            }
        });

        lightboxBtnEl.setAttribute('data-lightbox', 'initialized');
    });
}

function mutationInit() {
    // Add a MutationObserver to the #posts element
    const postsEl = document.querySelector('.js-posts');
    const observer = new MutationObserver((mutationsList) => {

        // Attach listener to each new element
        for (let mutation of mutationsList) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    attachListeners(node);
                }
            });
        }
    });

    // Configuration of the observer:
    const config = {
        childList: true,
        subtree: true
    };

    // Start observing the target node for configured mutations
    observer.observe(postsEl, config);
}

function init() {
    attachListeners();
    mutationInit();
}

export default init;