# drag

A lightweight "hold and drag" library. No dependencies, vanilla js.

![](https://github.com/mystroken/drag/raw/master/screenshot.gif)

### Getting started

```npm install @mystroken/drag``` and start using the **hold and drag** system.

```javascript
const options = {
  listener: document.getElementById('container'),
  multiplier: 2
};

const drag = new Drag(options);
drag.on(event => {
    const currentX = event.x;
    const currentY = event.y;
});
```
