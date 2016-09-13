/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-06-21
 */

import {assert} from 'chai';
import sinon from 'sinon';

import injector from '../../injector';
import genResource, {defaultHttpConfigs} from '../index';

describe('resource generator', () => {

	it('config reference changed will influence resource value', () => {

		sinon.stub(injector, 'get', () => (...args) => args[2]);

		defaultHttpConfigs.headers.name = 'Kuitos_L';

		const resource = genResource(null, null, null, {
			create: {
				method: 'PUT',
				name: 'create',
				headers: {name: 'lk', age: 20}
			}
		}, {
			name: 'kuitos',
			headers: {id: 100}
		});

		assert.equal(resource.get.headers.name, 'Kuitos_L');
		assert.equal(resource.get.headers.age, undefined);
		assert.equal(resource.get.headers['Cache-Control'], 'no-cache');
		assert.equal(resource.get.name, 'kuitos');
		assert.equal(resource.get.headers.id, 100);
		assert.equal(resource.get.method, 'GET');

		assert.equal(resource.create.headers.name, 'lk');
		assert.equal(resource.create.headers['Cache-Control'], 'no-cache');
		assert.equal(resource.create.headers.age, 20);
		assert.equal(resource.create.headers.id, 100);
		assert.equal(resource.create.method, 'PUT');
		assert.equal(resource.create.name, 'create');

		sinon.restore();
	});

});
