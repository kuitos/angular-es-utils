/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-12
 */
import injector from '../injector';

export default (delay = 300, context, invokeApply) => (target, name, descriptor) => {

	if (!descriptor) {
		throw new Error('can not use Debounce decorator with a constructor!');
	}

	const fn = descriptor.value || target[name];
	let pendingDebounce = null;
	const $timeout = injector.get('$timeout');

	descriptor.value = function(...args) {

		$timeout.cancel(pendingDebounce);

		pendingDebounce = $timeout(() => {
			pendingDebounce = null;
			fn.apply(context || this, args);
		}, delay, invokeApply);
	};

	return descriptor;

};
