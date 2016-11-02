/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-06-21
 */

import angualr from 'angular';
import ngResource from 'angular-resource';

import { assert } from 'chai';
import sinon from 'sinon';

import injector from '../../injector';
import genResource, { defaultHttpConfigs } from '../index';

defaultHttpConfigs.headers.name = 'Kuitos_L';
const resource = genResource('/users', false, {userId: 'kuitos'}, {
	create: {
		method: 'PUT',
		name: 'create',
		headers: {name: 'lk', age: 20}
	}
}, {
	name: 'kuitos',
	headers: {id: 100}
});

describe('resource generator', () => {

	let sandbox = null;

	beforeEach(() => {
		angular.module('mock', [ngResource]).run($injector => angular.element(document.body).data('$injector', $injector));
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('config reference changed will influence resource value', () => {

		const response = {
			success: true,
			msg: 'wtf'
		};

		let $httpBackend = null;

		angular.module('mock').config($httpProvider => $httpProvider.interceptors.push(() => ({

			response(response) {

				const config = response.config;
				if (config.method === 'GET') {
					assert.equal(config.headers.name, 'Kuitos_L');
					assert.equal(config.headers.age, undefined);
					assert.equal(config.headers['Cache-Control'], 'no-cache');
					assert.equal(config.name, 'kuitos');
					assert.equal(config.headers.id, 100);

				}

				if (config.method === 'PUT') {
					assert.equal(config.headers.name, 'lk');
					assert.equal(config.headers['Cache-Control'], 'no-cache');
					assert.equal(config.headers.age, 20);
					assert.equal(config.headers.id, 100);
					assert.equal(config.method, 'PUT');
					assert.equal(config.name, 'create');
				}

				return response;
			}

		})));

		angular.mock.module('mock');

		angualr.mock.inject((_$httpBackend_, $resource) => {

			$httpBackend = _$httpBackend_;

			sandbox.stub(injector, 'get', service => service === '$resource' ? $resource : {});

			$httpBackend.whenGET('/users?userId=kuitos').respond(200, response);
			$httpBackend.whenPUT('/users?userId=kuitos').respond(200, response);

		});

		resource.get().$promise.then(res => {
			assert.equal(response.success, res.success);
			assert.equal(response.msg, res.msg);
		});

		$httpBackend.flush();

	});

});
