/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-13
 */

import useCase from './use-case';
import {assert}  from 'chai';

describe('factory creator', () => {

	let $compile, $rootScope;

	beforeEach(angular.mock.module(useCase));
	beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	describe('transform directive constructor into factory', () => {

		const scope = $rootScope.$new();
		Object.assign(scope, {data: {name: 'kuitos'}});
		const directive = $compile('<directive data="data"></directive>')(scope);

		$rootScope.$digest();
		
		it('name of $rootScope won\'t be changed before directive linked', () => {
			assert.include(directive.html(), 'kuitos undefined');
		});

		it('name of $rootScope will be changed after directive linked', done => {
			$rootScope.$$postDigest(() => {
				assert.include(directive.html(), 'kuitos kuitoss');
				done();
			});
		});

	});

});
