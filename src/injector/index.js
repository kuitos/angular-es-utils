/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-25
 */

import angular from 'angular';

import dynamicExport from '../dynamic-export';

/**
 * 获取应用的injector,默认查询被ng-app标记的节点,否则从document.body开始找
 * @param rootElement
 */
export function getInjector(rootElement = (document.querySelector('[ng-app]') || document.body)) {

	const injector = angular.element(rootElement).injector();

	if (injector) {
		return injector;
	} else {

		const childNodes = rootElement.childNodes;

		for (let i = 0; i < childNodes.length; i++) {

			const injector = getInjector(childNodes[i]);

			if (injector) {
				return injector;
			}
		}
	}

	return null;
}

// make commonjs have the same behavior with es6 module
let injector = null;
export default injector;
dynamicExport(exports, 'default', () => injector || (injector = getInjector()));
