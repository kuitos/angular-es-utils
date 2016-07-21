/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-07-06
 */

import injector from '../injector';

export default (delay = 0, invokeApply = false) => (target, name, descriptor) => {

	if (!descriptor) {
		throw new Error('can not use Delay decorator with a constructor!');
	}

	const fn = descriptor.value || target[name];
	let $timeout = null;

	descriptor.value = function (...args) {

		// lazy init
		$timeout = $timeout || injector.get('$timeout');
		$timeout(() => {
			fn.apply(this, args);
		}, delay, invokeApply);
	};

	return descriptor;
};

