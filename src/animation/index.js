/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-03-24
 */

let ANIMATIONEND_EVENT, TRANSITIONEND_EVENT;

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

const EVENTS = [ANIMATIONEND_EVENT, TRANSITIONEND_EVENT].join(' ').split(' ');
const noop = () => {};

export default {

	addClass: (element, className, doneHook = noop, autoRemove = false) => {
		EVENTS.forEach(event => {
			element.addEventListener(event, () => {

				if (autoRemove) {
					element.classList.remove(className);
				}

				doneHook();
			}, false);
		});

		element.classList.add(className);
	},

	removeClass: (element, className, doneHook) => {
		EVENTS.forEach(event => {
			element.addEventListener(event, doneHook, false);
		});

		element.classList.remove(className);
	}

};
