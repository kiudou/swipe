let swipePic = document.querySelector('.swipe__pic');
let swipePicChildNode = swipePic.children;
let arrowLeft = document.querySelector('.swipe__arrow-left');
let arrowRight = document.querySelector('.swipe__arrow-right');
let swipeButton = document.querySelector('.swipe__button');
let swipeButtonChildNode = swipeButton.children;
let curSwipeButton; // 当前视窗的显示图片的按钮
let timePlay; // 时间控制器

// 控制方向
const minus = -1;
const plus = 1;

// 图片数量
const number = swipePicChildNode.length;

// 单个图片的宽度
const singlePicWidth = 200;

// 总的宽度
const swipeWidth = (number + 2) * singlePicWidth;

// 动画过渡时间
const durationTime = 1000;

const setButtonPos = () => {
    index = -(getLeftWidth()/singlePicWidth)%number;

    curSwipeButton.className = 'swipe__button-item';
    swipeButtonChildNode[index].className = 'swipe__button-item_seleted';
    curSwipeButton = swipeButtonChildNode[index];
};

const picMove = (dirction, startPlay) => {
    // 设置轮播过渡时间
    setTransitionDuration(durationTime + 'ms');

    // 计算轮播后的宽度
    let styleLeft = parseInt(swipePic.style.left) + singlePicWidth*dirction;

    // 设置剩余宽度
    setLeftWidth(styleLeft);

    setButtonPos();

    // 在轮播完之后进行位置的切换，不然会影响轮播时候过渡动画效果
    setTimeout(() => {
        setPosition(styleLeft);
        startPlay && startPlay();
    }, durationTime);
};

arrowLeft.onclick = () => {
    // 去除自动轮播
    stopPlay();

    picMove(minus, startPlay);
};

arrowRight.onclick = () => {
    // 去除自动轮播
    stopPlay();

    picMove(plus, startPlay);
};

const autoClick = () => {
    picMove(minus);
};

const actionClick = (index) => {
    curSwipeButton.className = 'swipe__button-item';
    swipeButtonChildNode[index].className = 'swipe__button-item_seleted';
    curSwipeButton = swipeButtonChildNode[index];

    stopPlay();
    setTransitionDuration('0s');
    setLeftWidth(-singlePicWidth*index);
    setPosition(-singlePicWidth*index);
    startPlay();
};

// 设置动画过渡时间
const setTransitionDuration = (duration) => {
    swipePic.style.webkitTransitionDuration = duration;
};

const cloneNode = (elem, index) => {

    //复制节点，放到最后,使得动画过渡效果连续
    let nodeTmp = swipePicChildNode[index].cloneNode(true);
    elem.appendChild(nodeTmp);
};

// 创建点击按钮的节点
const createBottonNode = (elem, index) => {
    let nodeTmp = document.createElement('div');
    nodeTmp.innerText = index + 1;
    nodeTmp.className = 'swipe__button-item';
    nodeTmp.onclick = () => {
        actionClick(index);
    }
    elem.appendChild(nodeTmp);
};

const setLeftWidth = (value) => {
    swipePic.style.left = value + 'px';
};

const getLeftWidth = () => {
    return parseInt(swipePic.style.left);
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
};

const init = () => {

    //创建与轮播图相同数量的位置按钮
    Array.apply(null, {length: number}).map((_, index) => {
        createBottonNode(swipeButton, index);
    })

    swipePic.style.left = '0px';
    curSwipeButton = swipeButtonChildNode[0];
    curSwipeButton.className = 'swipe__button-item_seleted';

    // 原来的节点上，最后增加两个头节点，方便进行轮播
    cloneNode(swipePic, 0);
    cloneNode(swipePic, 1);

    // 自动轮播
    startPlay();
};

function stopPlay() {
    if(timePlay) {
        clearInterval(timePlay);
    }
}

function startPlay() {
    timePlay = setInterval(autoClick, durationTime + 1000);
}

init();