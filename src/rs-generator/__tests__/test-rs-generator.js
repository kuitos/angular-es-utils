/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-06-21
 */

import {assert} from 'chai';

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

});
