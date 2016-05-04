/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-04
 */

import {assert} from 'chai';
import angular from 'angular';
import {Mediator} from '../index';
import injector, {_assignInjector} from '../../injector';

describe('mediator', () => {

	// init injector
	const div = document.createElement('div');
	div.innerHTML = '<div>0<div>00</div><div>01<div>010</div><div ng-app>011</div></div></div>';
	document.body.appendChild(div);
	angular.bootstrap(div);
	_assignInjector();

	const $scope = injector.get('$rootScope').$new(true);

	Mediator.subscribe('test', (...args) => {
		assert.deepEqual(args, [10, 100, 1000]);
	}, $scope);

	it('publish correctly', () => {
		Mediator.publish('test', 10, 100, 1000);
	});

	it('subscribe will be removed automatically when scope destroyed', () => {
		$scope.$destroy();
		Mediator.publish('test', 1, 2, 3);
	});

});
