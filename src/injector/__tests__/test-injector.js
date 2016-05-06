/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-27
 */
import angular from 'angular';
import {assert} from 'chai';

import injector from '../index';

describe('injector', () => {

	it('should equal to $injector service', angular.mock.inject($injector => {
		const div = document.createElement('div');
		div.innerHTML = '<div>0<div>00</div><div>01<div>010</div><div ng-app>011</div></div></div>';
		angular.bootstrap(div);
		assert.isTrue(angular.equals(injector, $injector));
	}));

});

