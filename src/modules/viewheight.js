
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
function updateViewHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function init() {
    updateViewHeight();

    // Update the --vh value when the window is resized
    window.addEventListener('resize', () => {
        updateViewHeight();
    });
}

export default init;
