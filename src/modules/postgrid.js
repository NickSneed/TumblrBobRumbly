import Masonry from "masonry-layout";
import InfiniteScroll from "infinite-scroll";
import imagesLoaded from "imagesloaded";

const postsSelector = '.js-posts';
const postSelector = '.js-post';

function init() {
    // Define Masonry grid
    let msnry = new Masonry(postsSelector, {
        itemSelector: postSelector,
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        percentPosition: true,
        stagger: 30,
        visibleStyle: { transform: 'translateY(0)', opacity: 1 },
        hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
    });

    // Make imagesLoaded available for InfiniteScroll
    InfiniteScroll.imagesLoaded = imagesLoaded;

    // Initializing InfiniteScroll
    new InfiniteScroll(postsSelector, {
        path: '#next-button',
        outlayer: msnry,
        status: '.page-load-status',
        history: false,
        prefill: true,
        append: postSelector
    });

    // Trigger layout after initial images load
    imagesLoaded(document.querySelector(postsSelector), function () {
        msnry.layout();
    });

}

export default init;