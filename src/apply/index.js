/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-07-25
 */

import injector from '../injector';

export default () => {

	const $rootScope = injector.get('$rootScope');

	if (!$rootScope.$$phase) {
		$rootScope.$digest();
	}

};
