/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-06-21
 */

import {assert} from 'chai';
import {defaultHttpConfigs} from '../index';

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

		function genResource(additionalActions = {}, additionalHttpConfigs = {}) {

			additionalHttpConfigs = {...defaultHttpConfigs, ...additionalHttpConfigs};
			// 将默认配置复制到新添加的action里
			Object.keys(additionalActions).forEach(action => {
				additionalActions[action] = Object.assign(additionalHttpConfigs, additionalActions[action]);
			});
			const DEFAULT_ACTIONS = {
				// 查询，结果为对象
				'get': {method: 'GET', ...additionalHttpConfigs}
			};

			return {...DEFAULT_ACTIONS, ...additionalActions};
		}

		const resource = genResource({create: {method: 'PUT'}}, {name: 'kuitos'});
		defaultHttpConfigs.headers.name = 'Kuitos_L';

		assert.equal(resource.get.headers.name, 'Kuitos_L');
		assert.equal(resource.create.headers.name, 'Kuitos_L');
		assert.equal(resource.create.name, 'kuitos');

	});

});
