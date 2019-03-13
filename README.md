# :left_right_arrow: :surfer: drag

A lightweight "hold and drag" utility. No dependencies, vanilla js.

![](https://github.com/mystroken/drag/raw/master/screenshot.gif)

➝ [See the online demo (Advanced example)](https://mzy8p5n678.codesandbox.io/)

## Usage

```npm install @mystroken/drag``` and start using the **hold and drag** system.

```javascript
import Drag from '@mystroken/drag';

// Elements to listen/move.
const slidable = document.querySelector('#slidable');
const container = document.querySelector('#container');

// Where to store the drag position.
let currentX = 0;
let currentY = 0;

// Initialize the library.
const options = {
  listener: container,
  multiplier: 2
};
const drag = new Drag(options);

// Store the cursor position on move.
drag.on(event => {
  currentX = event.x;
  currentY = event.y;
});

// Use the cursor position to slide the slidable element.
const move = () => {
  slidable.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
  requestAnimationFrame(move);
};
requestAnimationFrame(move);
```
