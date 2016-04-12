'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	return function (target, name, descriptor) {

		if (descriptor) {
			throw new Error('can not use Inject decorator with a non-constructor!');
		}

		var Constructor = function Constructor() {
			_classCallCheck(this, Constructor);

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			// 将依赖服务挂载在原始构造函数的prototype上(不是直接绑定到this上,节省空间)
			args.forEach(function (arg, i) {
				return target.prototype['_' + dependencies[i]] = arg;
			});
			// 使用原始构造函数实例化
			return new (Function.prototype.bind.apply(target, [null].concat(args)))();
		};

		Constructor.$inject = dependencies;

		return Constructor;
	};
};