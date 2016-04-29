/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-07
 */

import useCase, { Service } from './use-case';
import {assert} from 'chai';

describe('decorators', () => {

	let $injector, serviceInstance, controllerInstance, componentController, $scope, bindings;

	beforeEach(angular.mock.module(useCase));
	beforeEach(angular.mock.inject((_$injector_, _$controller_, _$rootScope_, $componentController) => {
		$injector = _$injector_;
		$scope = _$rootScope_.$new();
		componentController = $componentController('component', {$scope}, bindings = {data: {name: 'component'}});
		serviceInstance = $injector.get('Service');
		controllerInstance = _$controller_('Controller', {$scope});
	}));

	describe('inject', () => {

		it('Service Recipe: external service should be members of instance which start with underscore', () => {
			assert.equal(serviceInstance._$q, $injector.get('$q'));
			assert.equal(serviceInstance.getQ(), $injector.get('$q'));
		});

		it('Controller Recipe: external service should be members of instance which start with underscore', () => {
			assert.equal(controllerInstance._$scope, $scope);
		});

		it('Component Recipe: external service should be members of instance which start with underscore', () => {
			assert.equal(componentController._$scope, $scope);
		});

		it('Component Controller Recipe: bindings data should be bind to controller instance', () => {
			assert.equal(componentController.data, bindings.data);
			assert.equal(componentController._$scope.$ctrl.data, bindings.data);
			assert.equal(componentController.recipe, 'componentController');
		});

	});

	describe('bind', () => {

		it('Service Recipe: this pointer always equal service instance', () => {
			const getName = serviceInstance.getName;
			assert.equal(getName(), serviceInstance.name);
		});

		it('Component Controller Recipe: this pointer always equal component controller instance', () => {
			const getRecipe = componentController.getRecipe;
			assert.equal(getRecipe(), componentController.recipe);
		});

		it('this pointer should not obstruct each instance', () => {
			const service1GetName = new Service('l').getName;
			const service2GetName = new Service('k').getName;
			assert.notEqual(service1GetName(), service2GetName());
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
