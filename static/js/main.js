/*jslint regexp: false, plusplus: true */
/*global $,Tumblr,stopload:true*/

var BobMod = (function () {

    "use strict";

    var isMobile = {
            Windows: function () {
                return (/IEMobile/i).test(navigator.userAgent);
            },
            Android: function () {
                return (/Android/i).test(navigator.userAgent);
            },
            BlackBerry: function () {
                return (/BlackBerry/i).test(navigator.userAgent);
            },
            iOS: function () {
                return (/iPhone|iPad|iPod/i).test(navigator.userAgent);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
            }
        };
    
    function youtubeVideoFix() {
        if ($('.tmblr-embed.tmblr-full > iframe').length > 0) {
            $('.tmblr-embed.tmblr-full > iframe').height($('iframe#youtube_iframe').width() * 0.5625);
        }
    }

    function photoLayout() {
        $('.photo-set-wrapper').each(function (index) {
            if ($(this).data('isloaded') === false) {
                var that = $(this),
                    layout = that.data('setlayout').toString(),
                    row,
                    i,
                    x,
                    elIndex = 0,
                    per;

                for (i = 0; i < layout.length; i++) {
                    row = Number(layout.charAt(i));
                    for (x = 0; x < row; x++) {
                        per = 100 / row;
                        $(".photo-wrapper", that).eq(elIndex).css("width", per + "%");
                        if (x === 0) {
                            $(".photo-wrapper", that).eq(elIndex).css("clear", "left");
                            $(".photo-wrapper", that).eq(elIndex).css("padding-left", 0);
                        }
                        if (x === row - 1) {
                            $(".photo-wrapper", that).eq(elIndex).css("padding-right", 0);
                        }
                        elIndex++;
                    }
                }
            }
            $(this).data('isloaded', true);
        });
    }

    function toTop() {
        $("#to-top").click(function (e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 500);
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('#to-top').fadeIn();
            } else {
                $('#to-top').fadeOut();
            }
        });
    }

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
    }

    function tileLayout() {

        $(window).scroll(function () {
            $('.down-arrow').fadeOut(500);
        });

        $('.post').css('opacity', 1);

        $('#posts').imagesLoaded(function () {
            $('#posts').masonry({
                percentPosition: true,
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer',
                itemSelector: '.post',
                //isFitWidth: true,
                //columnWidth: 400,
                transitionDuration: 0
            });
            $('#posts').infinitescroll('resume');
            $('#loading').css('display', 'none');
        });

        $('#posts').infinitescroll({
            navSelector: '#page-nav', // selector for the paged navigation 
            nextSelector: '#page-nav #next-button', // selector for the NEXT link (to page 2)
            itemSelector: '.post', // selector for all items you'll retrieve
            bufferPx: 8000,
            extraScrollPx: 8000,
            state: {
                isPaused: true
            },
            loading: {
                finishedMsg: 'Finished.',
                img: 'http://static.tumblr.com/g82vxpi/zuro0o7xd/loading.gif',
                msg: null,
                msgText: ''
            }
        }, function (newElements) {
            photoLayout();
            youtubeVideoFix();
            // hide new items while they are loading
            var $newElems = $(newElements).css({
                opacity: 0
            });
            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function () {
                // show elems now they're ready								
                $newElems.css({
                    opacity: 0
                });
                stopload = false;
                $('#posts').masonry('appended', $newElems, true);
            });
        });
    }
    
    function init() {
        lightbox();
        photoLayout();
        toTop();
        youtubeVideoFix();
        $(window).resize(function () {
            youtubeVideoFix();
        });
    }

    $(function () {
        init();
    });

    return {
        tileLayout: tileLayout
    };
}());