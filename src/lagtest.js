/*global $*/

var yPos = 0,
    aniDir = 1,
    aniSpeed = 5,
    cursorEl = $('#cursor'),
    resultsEl = $('#results'),
    timingIntStart = false,
    timeLag = 0,
    results = [];

    /*
var fps,
    delta,
    lastCalledTime;
    */

function animation() {
    /*
    if(!lastCalledTime) {
         lastCalledTime = Date.now();
         fps = 0;
      }
      delta = (Date.now() - lastCalledTime)/1000;
      lastCalledTime = Date.now();
      fps = 1 / delta;
    console.log(fps);
    */

    yPos = yPos + (aniDir * aniSpeed);
    cursorEl.css('transform', "translate3d(0px, " + yPos + "px, 0px)");
    if (yPos > 550 && aniDir === 1) {
        aniDir = -1;
        timingIntStart = false;
        timeLag = 0;
    }
    if (yPos < 0 && aniDir === -1) {
        aniDir = 1;
        timingIntStart = false;
        timeLag = 0;
    }
    if (yPos === 275) {
        cursorEl.css('border-color', "#ff0000");
        setTimeout(function () {
            cursorEl.css('border-color', "#fff")
        }, 100);
        timingIntStart = true;
    }
    if (timingIntStart) {
        timeLag++;
    }
    requestAnimationFrame(animation);
}
requestAnimationFrame(animation);

$(document).keypress(function (e) {
    if (e.which == 32) {
        if (results.length === 0) {
            resultsEl.html('');
        }
        if (timingIntStart) {
            if (results.length < 9) {
                resultsEl.append(timeLag + '<br>');
                results.push(timeLag);
            } else {
                var total = 0,
                    i,
                    avg,
                    m;

                results.push(timeLag);
                resultsEl.append(timeLag + '<br>');

                for (i = 0; i < results.length; i++) {
                    total += results[i];
                }
                avg = total / results.length;
                avg = Math.round(avg * 100) / 100;
                m = Math.round(((avg / 60) * 1000) * 100) / 100;

                resultsEl.append('average: ' + avg + '<br>');
                resultsEl.append('average: ' + m + 'milliseconds');

                results = [];
            }
        }
    }
});