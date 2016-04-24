/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-13
 */

import useCase from './use-case';
import {assert} from 'chai';

describe('factory creator', () => {

	let $compile, $rootScope, directive;

	beforeEach(angular.mock.module(useCase));
	beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		const scope = $rootScope.$new();
		Object.assign(scope, {data: {name: 'kuitos'}});
		directive = $compile('<directive data="data"></directive>')(scope);

	}));

	describe('transform directive constructor into factory', () => {

		it('controller $onInit should run before link function', () => {
			$rootScope.$digest();
			assert.include(directive.html(), 'kuitos rootScope');
		});

	});

});
