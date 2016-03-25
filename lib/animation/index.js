/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-03-24
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ANIMATIONEND_EVENT = undefined,
    TRANSITIONEND_EVENT = undefined;

if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
	ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';
} else {
	ANIMATIONEND_EVENT = 'animationend';
}

if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
	TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';
} else {
	TRANSITIONEND_EVENT = 'transitionend';
}

var EVENTS = [ANIMATIONEND_EVENT, TRANSITIONEND_EVENT].join(' ').split(' ');

exports['default'] = {

	addClass: function addClass(element, className, doneHook) {
		element.classList.add(className);
		EVENTS.forEach(function (event) {
			element.addEventListener(event, function () {
				element.classList.remove(className);
				doneHook();
			}, false);
		});
	},

	removeClass: function removeClass(element, className, doneHook) {
		element.classList.remove(className);
		EVENTS.forEach(function (event) {
			element.addEventListener(event, doneHook, false);
		});
	}

};
module.exports = exports['default'];