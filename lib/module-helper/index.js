/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-17
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _default = (function () {
	function _default() {
		_classCallCheck(this, _default);
	}

	_createClass(_default, [{
		key: 'getModule',
		value: function getModule(moduleName, deps) {

			try {
				return _angular2['default'].module(moduleName);
			} catch (e) {
				return _angular2['default'].module(moduleName, deps);
			}
		}
	}]);

	return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];