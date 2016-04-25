/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-12
 */

export default (delay = 300, context) => (target, name, descriptor) => {

	if (!descriptor) {
		throw new Error('can not use Debounce decorator with a constructor!');
	}

	const fn = descriptor.value || target[name];
	let timer = null;

	descriptor.value = function(...args) {

		clearTimeout(timer);

		timer = setTimeout(() => {
			timer = null;
			fn.apply(context || this, args);
		}, delay);
	};

	return descriptor;

};
