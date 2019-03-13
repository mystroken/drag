'use strict';

//  Options
//    listener
//    multiplier

function Drag(options) {

	this._event = {
		X: 0,
    Y: 0,
    cursorDown: false,
		initialX: 0, // The X position of the cursor on start.
		initialY: 0, // The Y position of cursor on start.
		originalEvent: null
  };

  this.initialized = false;
  this.curDown = false; // True if cursor is down.
  this.numListeners = 0;
  this.listeners = [];
  this.listener = options.listener || window;
  this.multiplier = options.multiplier || 1;

  // Detect interaction type.
  this.hasMouseEvent = 'onmousedown' in document;
  this.hasTouchEvent = 'ontouchstart' in document;
	this.hasTouchWinEvent = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
  this.hasPointerEvent = !!window.navigator.msPointerEnabled;
  this.isTouch = this.hasTouchEvent || this.hasTouchWinEvent || this.hasPointerEvent;
  this.msTouchAction = null;

  // Context binding.
  this._onDragStart = this._onDragStart.bind(this);
  this._onDrag = this._onDrag.bind(this);
  this._onDragEnd = this._onDragEnd.bind(this);
  this._onMouseLeave = this._onMouseLeave.bind(this);
  this._notify = this._notify.bind(this);

}

Drag.prototype.on = function(f) {
  if(!this.initialized) this._addListeners();
  this.listeners.push(f);
  this.numListeners = this.listeners.length;
};

Drag.prototype.off = function(f) {
  this.listeners.splice(f, 1);
  this.numListeners = this.listeners.length;
  if(this.numListeners <= 0) this._removeListeners();
};

Drag.prototype._notify = function(e) {
  var _e = (this.isTouch && e.targetTouches) ? e.targetTouches[0] : e;

  this._event.X = (_e.pageX - this._event.initialX) * this.multiplier;
  this._event.Y = (_e.pageY - this._event.initialY) * this.multiplier;
  this._event.originalEvent = e;
  this._event.cursorDown = this.curDown;

  this._event.initialX = _e.pageX;
  this._event.initialY = _e.pageY;

  for(var i = 0; i < this.numListeners; i++) {
    this.listeners[i](this._event);
  }
};

// Event Listeners.
Drag.prototype._onDrag = function(e) {
  if(this.curDown){
    e.preventDefault();
    this._notify(e);
  }
};

Drag.prototype._onDragStart = function(e) {
  var _e = (this.isTouch && e.targetTouches) ? e.targetTouches[0] : e;
  this._event.initialX = _e.pageX;
  this._event.initialY = _e.pageY;

  this.curDown = true;
  //this._notify(e);
};

Drag.prototype._onDragEnd = function(e) {
  this.curDown = false;
  //this._notify(e);
};

Drag.prototype._onMouseLeave = function(e) {
  this._onDragEnd(e);
};

Drag.prototype._addListeners = function() {

  if (this.hasMouseEvent) {
    this.listener.addEventListener('mouseleave', this._onMouseLeave);
    this.listener.addEventListener('mouseup', this._onDragEnd);
    this.listener.addEventListener('mousedown', this._onDragStart);
    this.listener.addEventListener('mousemove', this._onDrag);
  }

  if (this.hasTouchEvent) {
    this.listener.addEventListener('touchmove', this._onDrag);
    this.listener.addEventListener('touchend', this._onDragEnd);
    this.listener.addEventListener('touchstart', this._onDragStart);
  }

  if (this.hasPointerEvent && this.hasTouchWinEvent) {
    this.msTouchAction = this.listener.style.msTouchAction;
    this.listener.style.msTouchAction = "none";

    this.listener.addEventListener('MSPointerMove', this._onDrag);
    this.listener.addEventListener('MSPointerUp', this._onDragEnd);
    this.listener.addEventListener('MSPointerDown', this._onDragStart);
  }

};

Drag.prototype._removeListeners = function() {

  if (this.hasMouseEvent) {
    this.listener.removeEventListener('mouseleave', this._onMouseLeave);
    this.listener.removeEventListener('mouseup', this._onDragEnd);
    this.listener.removeEventListener('mousedown', this._onDragStart);
    this.listener.removeEventListener('mousemove', this._onDrag);
  }

  if (this.hasTouchEvent) {
    this.listener.removeEventListener('touchmove', this._onDrag);
    this.listener.removeEventListener('touchend', this._onDragEnd);
    this.listener.removeEventListener('touchstart', this._onDragStart);
  }

  if (this.hasPointerEvent && this.hasTouchWinEvent) {
    if (this.msTouchAction) this.listener.style.msTouchAction = this.msTouchAction;

    this.listener.removeEventListener('MSPointerMove', this._onDrag);
    this.listener.removeEventListener('MSPointerUp', this._onDragEnd);
    this.listener.removeEventListener('MSPointerDown', this._onDragStart);
  }

};

module.exports = Drag;
