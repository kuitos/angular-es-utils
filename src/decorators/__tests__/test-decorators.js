/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-07
 */

import useCase from './use-case';
import {assert} from 'chai';

describe('decorators', () => {

	let $injector, $scope, serviceInstance;

	beforeEach(angular.mock.module(useCase));
	beforeEach(angular.mock.inject((_$injector_, $rootScope) => {
		$injector = _$injector_;
		$scope = $rootScope.$new();
		serviceInstance = $injector.get('Service');
	}));

	describe('inject', () => {

		it('service recipe: external service into Service constructor', () => {
			assert.equal(serviceInstance._$q, $injector.get('$q'));
		});

	});

	describe('bind', () => {

		it('service recipe: this pointer always equal service instance', () => {
			const getName = serviceInstance.getName;
			assert.equal(getName(), 'kuitos');
		});

	});

	describe('throttle', () => {

		it('service recipe: method only run once per 100 milliseconds', () => {
			const now = Date.now();
			while (Date.now() - now < 1000) {
				serviceInstance.resize();
			}
			assert.equal(serviceInstance.age, 10);
		});

	});

	describe('debounce', () => {

		it('service recipe: method only run once in 1000 milliseconds', done => {
			const now = Date.now();
			while (Date.now() - now < 1000) {

				serviceInstance.switcher(() => {
					assert.equal(serviceInstance.age, 1);
					done();
				});
			}
		});
	});

});
