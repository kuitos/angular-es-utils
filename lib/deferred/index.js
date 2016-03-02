/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-03-02
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deferred = (function () {
	function Deferred() {
		var _this = this;

		_classCallCheck(this, Deferred);

		this.promise = new Promise(function (resolve, reject) {
			_this._resolve = resolve;
			_this._reject = reject;
		});
	}

	_createClass(Deferred, [{
		key: "resolve",
		value: function resolve(value) {
			this._resolve.call(this.promise, value);
		}
	}, {
		key: "reject",
		value: function reject(value) {
			this._reject.call(this.promise, value);
		}
	}]);

	return Deferred;
})();

exports["default"] = Deferred;
module.exports = exports["default"];