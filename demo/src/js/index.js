import Drag from '@mystroken/drag';
require('../sass/index.scss');

const slider = document.querySelector('.slider');
const container = document.querySelector('.slider__items');

let vWidth = window.innerWidth;
let mWidth = container.getBoundingClientRect().width;


const cursor = slider.querySelector('.cursor');
let cursorWidth = 0;
let cursorHeight = 0;

const cursorPos = {
  currentX: 0,
  currentY: 0,
  targetX: 0,
  targetY: 0
};

const cursorScale = {
  current: 1,
  target: 1
};


const ease = .09;
let target = 0, current = 0, rAF = null;


const options = {
  listener: slider,
  multiplier: 2
};
const drag = new Drag(options);
drag.on(calc);
//drag.onMove(calc);
//drag.onStart();
//drag.onEnd();

slider.addEventListener('mouseenter', () => {
  cursor.classList.add('is-visible');
});

slider.addEventListener('mouseleave', () => {
  cursor.classList.remove('is-visible');
  // Cancel the animation frame
  cursorScale.target = 1;
  cursor.classList.remove('is-pressed');
});

slider.addEventListener('mousemove', (e) => {
  cursorPos.targetX = e.pageX - (cursorWidth/2);
  cursorPos.targetY = e.pageY - (cursorHeight/2);
});

slider.addEventListener('mousedown', () => {
  cursorScale.target = .35;
  cursor.classList.add('is-pressed');
});

slider.addEventListener('mouseup', () => {
  cursorScale.target = 1;
  cursor.classList.remove('is-pressed');
});


function calc(event) {
  target += event.X;
  clampTarget();
  if (rAF === null) requestAnimationFrame(moveSlider);
}

function moveCursor() {
  // Compute the current position.
  cursorPos.currentX += (cursorPos.targetX - cursorPos.currentX) * .09;
  cursorPos.currentY += (cursorPos.targetY - cursorPos.currentY) * .09;
  // Compute the current scale.
  cursorScale.current += (cursorScale.target - cursorScale.current) * .06;
  // Move the cursor.
  cursor.style.transform = `translate3d(${cursorPos.currentX.toFixed(2)}px, ${cursorPos.currentY.toFixed(2)}px, 0px) scale(${cursorScale.current.toFixed(2)})`;
  requestAnimationFrame(moveCursor);
}
requestAnimationFrame(moveCursor);

function moveSlider() {
  const offset = (target - current);
  current += offset * ease;

  // Move the slider content container.
  container.style.transform = `translate3d(${current.toFixed(2)}px,0,0)`;

  // Stop the loop if there is no move to do.
  rAF = (offset.toFixed(2) == 0.00) ? null : requestAnimationFrame(moveSlider);
};

const clampTarget = function() {
  const max = mWidth - vWidth;
  target = Math.min(0, Math.max(target, -1 * max));
};

const onResize = () => {
  // Cursor
  cursorWidth = cursor.getBoundingClientRect().width;
  cursorHeight = cursor.getBoundingClientRect().height;
  // Items
  vWidth = window.innerWidth;
  mWidth = container.getBoundingClientRect().width;
  clampTarget();
  rAF = requestAnimationFrame(moveSlider);
};
window.addEventListener('resize', onResize);

onResize();