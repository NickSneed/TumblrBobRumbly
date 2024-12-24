const Masonry = require('masonry-layout');
const InfiniteScroll = require('infinite-scroll');
const imagesLoaded = require('imagesloaded');

function init() {
    // Define Masonry grid
    let msnry = new Masonry('#posts', {
        itemSelector: '.post',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        percentPosition: true,
        stagger: 30,
        visibleStyle: { transform: 'translateY(0)', opacity: 1 },
        hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
    });

    // Make imagesLoaded available for InfiniteScroll
    InfiniteScroll.imagesLoaded = imagesLoaded;

    // Initialzing InfiniteScroll
    let infScroll = new InfiniteScroll('#posts', {
        path: '#next-button',
        outlayer: msnry,
        status: '.page-load-status',
        history: false,
        prefill: true,
        append: '.post'
    });

    // Trigger layout after initial images load
    imagesLoaded(document.querySelector('#posts'), function (instance) {
        console.log('all images are loaded');
        msnry.layout();
    });

}

export default init;