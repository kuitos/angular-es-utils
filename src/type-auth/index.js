/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-06-07
 */

const msie = window.document.documentMode;
const toString = Object.prototype.toString;

export function isClass(func) {
	// IE 9-11 do not support classes and IE9 leaks with the code below.
	if (msie <= 11) {
		return false;
	}
	// Workaround for MS Edge.
	// Check https://connect.microsoft.com/IE/Feedback/Details/2211653
	return typeof func === 'function' && /^(?:class\s|constructor\()/.test(Function.prototype.toString.call(func));
}

export function isNumber() {
	return typeof value === 'number';
}

export function isRegExp(value) {
	return toString.call(value) === '[object RegExp]';
}

export function isObject(value) {
	return toString.call(value) === '[object Object]';
}

export function isArray(value) {
	return toString.call(value) === '[object Array]';
}

export function isString(value) {
	return typeof value === 'string';
}

export function isFunction(value) {
	return typeof value === 'function';
}

export function isPromiseLike(obj) {
	return !!obj && typeof obj.then === 'function';
}

export function isElement(node) {
	return !!(node &&
	(node.nodeName || (node.prop && node.attr && node.find)));  // We have an on and find method part of jQuery API.
}

export function isDefined(value) {
	return typeof value !== 'undefined';
}
