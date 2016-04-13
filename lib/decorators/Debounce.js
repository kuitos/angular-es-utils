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
	var delay = arguments.length <= 0 || arguments[0] === undefined ? 300 : arguments[0];
	return function (target, name, descriptor) {

		if (!descriptor) {
			throw new Error('can not use Debounce decorator with a constructor!');
		}

		var fn = descriptor.value || target[name];
		var timer = null;

		descriptor.value = function () {
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			clearTimeout(timer);

			timer = setTimeout(function () {
				timer = null;
				fn.apply(_this, args);
			}, delay);
		};

		return descriptor;
	};
};