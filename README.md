# drag

A lightweight "hold and drag" library. No dependencies, vanilla js.

![](https://github.com/mystroken/drag/raw/master/screenshot.gif)

[➝ See advanced demo]([https://mzy8p5n678.codesandbox.io/](https://mzy8p5n678.codesandbox.io/)

### Getting started

```npm install @mystroken/drag``` and start using the **hold and drag** system.

```javascript
let currentX = 0;
let currentY = 0;
const slidable = document.querySelector('#slidable');
const container = document.querySelector('#container');

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

// Use the cursor position to slide the container.
const move = () => {
  slidable.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
  requestAnimationFrame(move);
};
requestAnimationFrame(move);
```
