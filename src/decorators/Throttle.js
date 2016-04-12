/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-12
 */

export default (delay = 10) => (target, name, descriptor) => {

	if (!descriptor) {
		throw new Error('can not use Throttle decorator with a constructor!');
	}

	delete descriptor.value;
	delete descriptor.writable;

	const fn = target[name];
	let recent;

	descriptor.set = value => {
		target[name] = value;
	};

	descriptor.get = function() {

		return (...args) => {
			const now = Date.now();

			if (!recent || (now - recent > delay)) {
				fn.apply(this, args);
				recent = now;
			}
		};
	};

	return descriptor;
};
