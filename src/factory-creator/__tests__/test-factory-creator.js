/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-13
 */

import test from 'ava';
import Inject from '../../decorators/Inject';
import FactoryCreator from '../index';

@Inject('$scope')
class Test {

	constructor() {
		this.name = 'kuitos';
	}

	getScope() {
		return this._$scope;
	}

	getName() {
		return this.name;
	}

}

test('factory creator should bind this to function', t => {

	const testFactory = FactoryCreator.create(Test);

	const test = testFactory({name: 'scope'});

	const getScope = test.getScope;
	const getName = test.getName;

	t.is(getName(), 'kuitos');
	t.is(getScope().name, 'scope');

});
