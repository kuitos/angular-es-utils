'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-03-24
 */

var ANIMATIONEND_EVENT = void 0,
    TRANSITIONEND_EVENT = void 0;

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
var noop = function noop() {};

exports.default = {

	addClass: function addClass(element, className) {
		var doneHook = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
		var autoRemove = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

		element.classList.add(className);
		EVENTS.forEach(function (event) {
			element.addEventListener(event, function () {

				if (autoRemove) {
					element.classList.remove(className);
				}

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