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

	it('config init should be correct execute', () => {

		const defaultConfigs = {param: {name: 'kuitos'}};

		function init(configs) {
			configs = {...defaultConfigs, ...configs};
			return configs;
		}

		assert.deepEqual({param: {name: 'xx'}}, init({param: {name: 'xx'}}));
		assert.deepEqual({param: {name: 'kuitos'}, age: 10}, init({age: 10}));
		assert.deepEqual({param: {name: 'kuitos'}}, defaultConfigs);
	});

	it('config reference changed will influence resource value', () => {

		sinon.stub(injector, 'get', () => (...args) => args[2]);

		const resource = genResource(null, null, null, {create: {method: 'PUT'}}, {name: 'kuitos'});
		defaultHttpConfigs.headers.name = 'Kuitos_L';

		assert.equal(resource.get.headers.name, 'Kuitos_L');
		assert.equal(resource.get.method, 'GET');
		assert.equal(resource.get.name, 'kuitos');
		assert.equal(resource.create.headers.name, 'Kuitos_L');
		assert.equal(resource.create.method, 'PUT');
		assert.equal(resource.create.name, 'kuitos');

	});

});
