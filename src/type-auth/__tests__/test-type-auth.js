import { assert } from 'chai';

import { isObject, isArray, isPromiseLike, isRegExp } from '../index';

describe('type-auth', () => {

	it('isObject', () => {
		assert.isTrue(isObject({}));
		assert.isTrue(isObject([]));
	});

	it('isArray', () => {
		assert.isTrue(isArray([]));
		assert.isNotTrue(isArray({}));
	});

	it('isPromiseLike', () => {
		const obj = {
			then: () => {
			}
		};
		assert.isTrue(isPromiseLike(obj));
		assert.isTrue(isPromiseLike(new Promise((resolve, reject) => {
		})));
		assert.isNotTrue(isPromiseLike({}));
		assert.isNotTrue(isPromiseLike([]));
	});

	it('isRegExp', () => {
		assert.isTrue(isRegExp(/ui/g));
		assert.isNotTrue(isRegExp('/ui/g'));
	});
});
