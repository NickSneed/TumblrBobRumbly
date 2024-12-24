const Masonry = require('masonry-layout');
const InfiniteScroll = require('infinite-scroll');
const imagesLoaded = require('imagesloaded');

function init() {
    let msnry = new Masonry('#posts', {
        itemSelector: '.post',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        percentPosition: true,
        stagger: 30,
        // nicer reveal transition
        visibleStyle: { transform: 'translateY(0)', opacity: 1 },
        hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
    });

    // make imagesLoaded available for InfiniteScroll
    InfiniteScroll.imagesLoaded = imagesLoaded;

    let infScroll = new InfiniteScroll('#posts', {
        path: '#next-button',
        outlayer: msnry,
        status: '.page-load-status',
        history: false,
        prefill: true,
        append: '.post'
    });
}

export default init;