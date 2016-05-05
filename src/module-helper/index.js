/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-17
 */

import angular from 'angular';

export default {

	get(moduleName, deps) {

		try {
			return angular.module(moduleName);
		} catch (e) {
			return angular.module(moduleName, deps);
		}

	}

};
