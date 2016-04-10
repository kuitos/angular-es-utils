'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-29
 */

var _default = function () {
	function _default() {
		_classCallCheck(this, _default);
	}

	_createClass(_default, null, [{
		key: 'create',
		value: function create(Constructor) {

			function factory() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				var instance = new (Function.prototype.bind.apply(Constructor, [null].concat(args)))();

				Object.getOwnPropertyNames(Constructor.prototype).forEach(function (prop) {

					// 绑定实例到构造函数的每个方法下
					if (prop !== 'constructor' && typeof Constructor.prototype[prop] === 'function') {
						instance[prop] = instance[prop].bind(instance);
					}
				});

				return instance;
			}

			factory.$inject = Constructor.$inject || [];

			return factory;
		}
	}]);

	return _default;
}();

exports.default = _default;