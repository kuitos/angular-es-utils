/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-07
 */

import useCase, {Service} from './use-case';
import Bind from '../Bind';
import {assert} from 'chai';
import Inject from '../Inject';

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

		it('static props of Constructor should be same with original target', () => {
			assert.equal(Service.getStaticName(), 'kuitos');
		});

		it('class constructor should also hold the injected service which had bound to this when instantiate', angular.mock.inject(($controller, $rootScope) => {
			const user = {name: 'kuitos'};

			@Inject('$rootScope', 'user')
			class InnerController {
				constructor() {
					assert.equal(this._$rootScope, $rootScope);
					// assert.equal(this._user, user);
				}

				getUser() {
					return this._user;
				}
			}

			const controller = $controller(InnerController, {$rootScope, user});
			assert.equal(controller._$rootScope, $rootScope);
			// assert.equal(controller.getUser(), user);
			// assert.notEqual(InnerController.prototype._user, user);
		}));

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

		it('function should always share the same instance', () => {
			const service = new Service('kuitos');
			const getName1 = service.getName;
			const getName2 = service.getName;
			const get2AppendedName = service.getName2;
			assert.equal(getName1, getName2);
			assert.equal(get2AppendedName(), 'kuitos2');
		});

		it('reassign should also worked well', () => {
			const service = new Service('kuitos');
			const original = service.getName;
			service.getName = () => {
				return original() + '6666';
			};
			const getName = service.getName;
			assert.equal(getName(), 'kuitos6666');
		});

		it('worked well although use decorator without @ symbol like compiled after webpack', () => {

			const descriptors = [
				{
					key: 'fn1',
					value: function() {
						return 1;
					}
				},
				{
					key: 'fn2',
					value: function() {
						return 2;
					}
				}
			];

			function Klass() {
			}

			descriptors.forEach(descriptor => {
				const target = Klass.prototype;
				const name = descriptor.key;
				Object.defineProperty(target, name, Bind(target, name, descriptor));
			});

			const instance = new Klass();

			assert.notEqual(instance.fn1, instance.fn2);
			assert.equal(instance.fn1(), 1);
			assert.equal(instance.fn2(), 2);
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

	// describe('debounce', () => {
	//
	// 	it('service recipe: method only run once in 1000 milliseconds', done => {
	// 		const now = Date.now();
	// 		while (Date.now() - now < 1000) {
	//
	// 			serviceInstance.switcher(() => {
	// 				assert.equal(serviceInstance.age, 1);
	// 				done();
	// 			});
	// 		}
	// 	});
	// });

});
