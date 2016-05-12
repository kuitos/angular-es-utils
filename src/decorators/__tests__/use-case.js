/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-21
 */

import Bind from '../Bind';
import Inject from '../Inject';
import Throttle from '../Throttle';
import Debounce from '../Debounce';

@Inject('$q')
export class Service {

	constructor(name = 'kuitos') {
		this.name = name;
		this.age = 0;
	}

	static getStaticName() {
		return 'kuitos';
	}

	getQ() {
		return this._$q;
	}

	@Bind
	getName() {
		return this.name;
	}

	@Bind
	getName2() {
		return this.name + '2';
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

@Inject('$scope')
class Controller {

	constructor() {
		this.recipe = 'componentController';
	}

	@Bind
	getRecipe() {
		return this.recipe;
	}

}

class Component {

	constructor() {
		this.controller = Controller;
		this.bindings = {
			data: '='
		};
	}
}

export default angular
	.module('decorators', [])
	.service('Service', Service)
	.controller('Controller', Controller)
	.component('component', new Component())
	.name;
