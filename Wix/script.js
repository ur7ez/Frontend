/*
 * Each Color Rect is a link <a>.
 * You need to make these links clickable,
 * each link should color its own container (parent element with class name ‘.container’)
 * into the color from data-color attribute.

 * Link ".animate-all" should animate color switching of each container, from left to right
 * with time interval of 2 seconds.
 */

// jQuery is used herewith to only simplify selection of a upper parent element with class '.container'.
// Of course it might be omitted

let animateContainer = (event) => {
    let curElem = event.target;
    if (curElem.tagName === 'A') {
        let parent = $(curElem).parents('.container')[0];
        parent.style.backgroundColor = curElem.dataset.color;
    }
};

let animateAll = () => {
    $('.wrapper').toggleClass('anime');
};

$('.wrapper').on('click', animateContainer);
$('.animate-all').on('click', animateAll);