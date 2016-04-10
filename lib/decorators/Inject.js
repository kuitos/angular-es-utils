"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-11
 */

/**
 * angular依赖注入器
 */

exports.default = function () {
	for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
		dependencies[_key] = arguments[_key];
	}

	return function (target, key, descriptor) {

		// 修饰的如果是类的方法
		if (descriptor) {
			var fn = descriptor.value;
			fn.$inject = dependencies;
		} else {
			target.$inject = dependencies;
		}
	};
};