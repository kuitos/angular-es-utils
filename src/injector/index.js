/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-25
 */

import angular from 'angular';

let injector = null;

export function ready(fn) {

	var fired = false;

	function trigger() {
		if (fired) return;
		fired = true;
		fn();
	}

	// check if document is already loaded
	if (window.document.readyState === 'complete') {
		window.setTimeout(trigger, 0);
	} else {
		window.addEventListener('DOMContentLoaded', trigger); // works for modern browsers and IE9
		// we can not use jqLite since we are not done loading and jQuery could be loaded later.
		// jshint -W064
		window.addEventListener('load', trigger); // fallback to window.onload for others
		// jshint +W064
	}

}

export function getInjectorGetter() {

	return function getInjector(rootElement = (document.querySelector('[ng-app]') || document.body)) {

		const injector = angular.element(rootElement).injector();

		if (injector) {
			return injector;
		} else {

			const childNodes = rootElement.childNodes;

			for (let i = 0; i < childNodes.length; i++) {

				const injector = getInjector(childNodes[i]);

				if (injector) {
					return injector;
				}
			}
		}

		return null;
	};
}

ready(getInjectorGetter());

export default injector;
