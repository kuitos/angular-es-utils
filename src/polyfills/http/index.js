/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-06-23
 */

import angular from 'angular';

function $httpDecorator($delegate) {

}
$httpDecorator.$inject = ['$delegate'];

export default angular.module('ngUtils.polyfills.http', [])
	.decorator('$http', $httpDecorator)
	.name;
