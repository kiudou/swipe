let swipePic = document.querySelector('.swipe__pic');
let swipePicChildNode = swipePic.children;
let arrowLeft = document.querySelector('.swipe__arrow-left');
let arrowRight = document.querySelector('.swipe__arrow-right');

arrowLeft.onclick = () => {
    setTransitionDuration(durationTime + 'ms');

    let styleLeft = parseInt(swipePic.style.left) - singlePicWidth;

    setLeftWidth(styleLeft);

    // 在轮播完之后进行位置的切换，不然会影响时候轮播时候过渡动画时间
    setTimeout(() => setPosition(styleLeft), durationTime);

}

arrowRight.onclick = () => {
    setTransitionDuration(durationTime + 'ms');

    let styleLeft = parseInt(swipePic.style.left) + singlePicWidth;

    setLeftWidth(styleLeft);

    setTimeout(() => setPosition(styleLeft), durationTime);
}

// 图片数量
const number = 4

// 单个图片的宽度
const singlePicWidth = 200;

// 总的宽度
const swipeWidth = (number + 2) * singlePicWidth;

//动画过渡时间
const durationTime = 1000;

// 设置过渡动画时间
const setTransitionDuration = (duration) => {
    swipePic.style.webkitTransitionDuration = duration;
}

const cloneNode = (elem, index) => {

    //复制节点，放到最后
    nodeTmp = swipePicChildNode[index].cloneNode(true);
    elem.appendChild(nodeTmp);
}

const setLeftWidth = (value) => {
    swipePic.style.left = value + 'px';
}

// 方便无缝轮播
const setPosition = (currrentPosition) => {
    if (currrentPosition == (singlePicWidth - swipeWidth)) {
        setTransitionDuration('0s');
        setLeftWidth(-singlePicWidth);
    }

    if(currrentPosition == 0) {
        setTransitionDuration('0s');
        setLeftWidth(2*singlePicWidth - swipeWidth);
    }
    return;
}

const init = () => {
    swipePic.style.left = '0px';

    // 原来的节点上，最后增加两个头节点，方便进行轮播
    cloneNode(swipePic, 0);
    cloneNode(swipePic, 1);

    // 自动轮播
    setInterval(() => arrowLeft.onclick(), durationTime + 1000);
}

init();