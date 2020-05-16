# :surfer: drag


[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/mystroken/drag/issues)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=A%20lightweight%20utility%20to%20do%20%22hold%20and%20drag%22.&url=https://github.com/mystroken/drag&via=mystroken&hashtags=holdanddrag,slider,drag,js,creativecoding,developers)

<blockquote>
A lightweight JavaScript "hold and drag" utility. Vanilla JS - No dependencies.
<br>
Its size is ~619 B (minified and compressed).
</blockquote>

![](https://github.com/mystroken/drag/raw/master/screenshot.gif)

➝ [See the online demo (Advanced example)](https://mystroken.github.io/drag/)

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
  currentX = event.X;
  currentY = event.Y;
});

// Use the cursor position to slide the slidable element.
requestAnimationFrame(move);
function move() {
  slidable.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
  requestAnimationFrame(move);
}
```
