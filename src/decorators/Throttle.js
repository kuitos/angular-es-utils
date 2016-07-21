/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-12
 */

export default (delay = 10, context) => (target, name, descriptor) => {

	if (!descriptor) {
		throw new Error('can not use Throttle decorator with a constructor!');
	}

	const fn = descriptor.value || target[name];

	let recent;

	descriptor.value = function (...args) {

		const now = Date.now();

		if (!recent || (now - recent > delay)) {
			fn.apply(context || this, args);
			recent = now;
		}
	};

	return descriptor;
};
