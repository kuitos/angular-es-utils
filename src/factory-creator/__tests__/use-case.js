/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-24
 */

import angular from 'angular';
import Inject from '../../decorators/Inject';
import FactoryCreator from '../index';

@Inject('$rootScope')
class Controller {

	$onInit() {
		this.data = `${this.data.name} ${this._$rootScope.name}`;
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
		this._$rootScope.name = 'kuitos';
	}

}

export default angular
	.module('useCase', [])
	.directive('directive', FactoryCreator.create(Directive))
	.name;
