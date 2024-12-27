import Masonry from "masonry-layout";
import InfiniteScroll from "infinite-scroll";
import imagesLoaded from "imagesloaded";

const postsSel = '.js-posts';
const postSel = '.js-post';
const gridSizerSel = '.js-grid-sizer';
const gutterSizerSel = '.js-gutter-sizer';
const pageLoadStatusSel = '.js-page-load-status';

// Check page is index
function isPageIndex() {
    return document.body.classList.contains('page-index');
}

function init() {
    // Check for index page
    if (! isPageIndex()) {
        return;
    }

    // Define Masonry grid
    const masonryOptions = {
        itemSelector: postSel,
        columnWidth: gridSizerSel,
        gutter: gutterSizerSel,
        percentPosition: true,
        stagger: 30,
        visibleStyle: { transform: 'translateY(0)', opacity: 1 },
        hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
    };
    let msnry = new Masonry(postsSel, masonryOptions);

    // Make imagesLoaded available for InfiniteScroll
    InfiniteScroll.imagesLoaded = imagesLoaded;

    // Initializing InfiniteScroll
    const infiniteScrollOptions = {
        path: '#next-button',
        outlayer: msnry,
        status: pageLoadStatusSel,
        history: false,
        prefill: true,
        append: postSel
    };
    new InfiniteScroll(postsSel, infiniteScrollOptions);

    // Trigger layout after initial images load
    imagesLoaded(document.querySelector(postsSel), function () {
        msnry.layout();
    });

    // Trigger layout after the document loads
    document.addEventListener('DOMContentLoaded', function() {
        msnry.layout();
    });

}

export default init;