/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-07
 */

import test from 'ava';
import Bind from '../Bind';
import Inject from '../Inject';
import Throttle from '../Throttle';
import Debounce from '../Debounce';

@Inject('$scope', '$q')
class Test {

	constructor() {
		this.name = 'kuitos';
		this.age = 0;
	}

	@Bind
	getName() {
		return this.name;
	}

	@Throttle(100)
	resize() {
		this.age++;
	}

	@Debounce(100)
	switcher(cb) {
		this.age++;
		cb();
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

test('throttle decorator', t => {

	const test = new Test();

	let now = Date.now();
	while (Date.now() - now < 1000) {
		test.resize();
	}

	t.is(test.age, 10);
});

test.cb('debounce decorator', t => {

	const test = new Test();

	let now = Date.now();
	while (Date.now() - now < 1000) {
		test.switcher(() => {
			t.is(test.age, 1);
			t.end();
		});
	}

});
