let swipePic = document.querySelector('.swipe__pic');
let arrowLeft = document.querySelector('.swipe__arrow-left');
let arrowRight = document.querySelector('.swipe__arrow-right');

arrowLeft.onclick = () => {
    let styleLeft = parseInt(swipePic.style.left) - 200;
    swipePic.style.left = (styleLeft <= -800 ? styleLeft + 800 : styleLeft) + 'px';
}

arrowRight.onclick = () => {
    let styleLeft = parseInt(swipePic.style.left) + 200;
    swipePic.style.left = (styleLeft > 0 ? styleLeft - 800 : styleLeft) + 'px';
}
