/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-25
 */

import angular from 'angular';

let injector = null;

const bootstrap = angular.bootstrap;

// rewrite angular bootstrap method to assign our injector
angular.bootstrap = (...args) => {
	injector = bootstrap(...args);
	return injector;
};

// make commonjs have the same behavior with es6 module
Object.defineProperty(exports, 'default', {
	set(value) {
		injector = value;
	},
	get() {
		return injector;
	}
});

export default injector;
