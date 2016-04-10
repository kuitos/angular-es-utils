/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-07
 */

import test from 'ava';
import Bind from '../Bind';
import Inject from '../Inject';

@Inject('$scope')
class Test {

	constructor() {
		this.name = 'kuitos';
	}

	@Bind
	getName() {
		return this.name;
	}
}

test('bind decorator', t => {

	const test = new Test();
	const getName = test.getName;
	t.is(getName(), 'kuitos');

});

test('inject decorator', t => {
	t.deepEqual(Test.$inject, ['$scope']);
});
