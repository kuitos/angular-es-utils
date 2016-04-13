'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-12
 */

exports.default = function () {
	var delay = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
	return function (target, name, descriptor) {

		if (!descriptor) {
			throw new Error('can not use Throttle decorator with a constructor!');
		}

		var fn = descriptor.value || target[name];

		var recent = void 0;

		descriptor.value = function () {

			var now = Date.now();

			if (!recent || now - recent > delay) {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				fn.apply(this, args);
				recent = now;
			}
		};

		return descriptor;
	};
};