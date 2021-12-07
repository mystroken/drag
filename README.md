# :surfer: drag


![npm bundle size](https://img.shields.io/bundlephobia/minzip/@mystroken/drag)
![npm](https://img.shields.io/npm/dw/@mystroken/drag)
![npm](https://img.shields.io/npm/v/@mystroken/drag)
![GitHub last commit](https://img.shields.io/github/last-commit/mystroken/drag)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/mystroken/drag/issues)
![GitHub stars](https://img.shields.io/github/stars/mystroken/drag?style=social)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=A%20lightweight%20utility%20to%20do%20%22hold%20and%20drag%22.&url=https://github.com/mystroken/drag&via=mystroken&hashtags=holdanddrag,slider,drag,js,creativecoding,developers)

<blockquote>
A lightweight JavaScript "hold and drag" utility. Vanilla JS - No dependencies.<br>
Its size is ~867 Bytes (minified and compressed).
</blockquote>

![](https://github.com/mystroken/drag/raw/master/screenshot.gif)

➝ [See the online demo (Advanced example)](https://mystroken.github.io/drag/) | [Demo Source Code](https://github.com/mystroken/drag/tree/master/demo):fire::fire:

<br>
<br>

# Usage

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

<br>
<br>

# Options

### listener

Determines the DOM element on which to apply the hold and drag feature.

| Default    | Type        |
|:---------- |:----------- |
| `window`   | DOM Element |

### multiplier

Set a speed multiplier for the movement (the normal speed is 1).

| Default | Type  |
|:------- |:----- |
| `1`     | `int` |

<br>
<br>

# Methods

### on(callback)
Subscribes a callback function to listen any "hold and drag" operation.

```javascript
drag.on(function(event) {
  // Start consuming the event data.
  currentX = event.X;
  currentY = event.Y;
});
```

| Argument  | Type      | Params                                                                           | Required |
|:--------- |:--------- | -------------------------------------------------------------------------------- | -------- |
| callback | `Function` | An event object giving the current X & Y positions of the mouse on the container | Yes      |


### off(callback)
Unsubscribes the callback function from listening operations.

| Argument  | Type      | Params                                                                           | Required |
|:--------- |:--------- | -------------------------------------------------------------------------------- | -------- |
| callback | `Function` | An event object giving the current X & Y positions of the mouse on the container | Yes      |
