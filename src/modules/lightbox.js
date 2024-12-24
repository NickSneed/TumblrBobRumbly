/*
function lightbox() {
    $('body').on('click', '.show-lightbox', function (e) {
        e.preventDefault();
        var imgArr = [],
            x = $(this).index() + 1,
            p = $(this).parent();
        $("img", p).each(function (index) {
            var img = $(this);
            imgArr.push({
                height: img.data('height'),
                width: img.data('width'),
                low_res: img.attr('src'),
                high_res: img.data('hirez')
            });
        });
        
        if (typeof Tumblr.Lightbox !== "undefined") {
            Tumblr.Lightbox.init(imgArr, x);
        } else {
            if ($("body").hasClass("page-index")) {
                window.location = p.attr("href");
            }
        }
    });
}*/