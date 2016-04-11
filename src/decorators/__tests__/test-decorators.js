/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-07
 */

import test from 'ava';
import Bind from '../Bind';
import Inject from '../Inject';

@Inject('$scope', '$q')
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

	const ctrl = new (Function.prototype.bind.apply(Test, [null, {name: '$scope'}, {name: '$q'}]))();

	t.deepEqual(Test.$inject, ['$scope', '$q']);
	t.is(ctrl._$scope.name, '$scope');
	t.is(ctrl._$q.name, '$q');
	t.is(ctrl.name, 'kuitos');

});
