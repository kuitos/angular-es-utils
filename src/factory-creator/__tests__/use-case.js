/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-24
 */

import angular from 'angular';
import Inject from '../../decorators/Inject';
import FactoryCreator from '../index';

let data;

@Inject('$rootScope')
class Controller {

	$onInit() {
		this._$rootScope.name = 'controller';
	}

	set data(value) {
		data = value;
		return value;
	}

	get data() {
		return `${data.name} ${this._$rootScope.name}`;
	}

}

@Inject('$rootScope')
class Directive {

	constructor() {
		this.restrict = 'EA';
		this.scope = {};
		this.template = '<span ng-bind="$vm.data"></span>';
		this.controller = Controller;
		this.controllerAs = '$vm';
		this.bindToController = {
			data: '='
		};
	}

	link() {
		this._$rootScope.name = 'rootScope';
	}

}

export default angular
	.module('useCase', [])
	.directive('directive', FactoryCreator.create(Directive))
	.name;
