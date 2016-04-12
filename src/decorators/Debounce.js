/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-12
 */

export default (delay = 300) => (target, name, descriptor) => {

	if (!descriptor) {
		throw new Error('can not use Debounce decorator with a constructor!');
	}

	delete descriptor.value;
	delete descriptor.writable;

	const fn = target[name];
	let timer = null;

	descriptor.set = value => {
		target[name] = value;
	};

	descriptor.get = function() {

		return (...args) => {
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				timer = null;
				fn.apply(this, args);
			}, delay);
		};
	};

	return descriptor;

};
