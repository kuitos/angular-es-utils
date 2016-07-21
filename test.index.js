/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-21
 */

import 'angular';
import 'angular-mocks';

// init injector
const div = document.createElement('div');
div.innerHTML = '<div>0<div>00</div><div>01<div>010</div><div ng-app>011</div></div></div>';
document.body.appendChild(div);
angular.bootstrap(div);

const context = require.context('./src', true, /\/__tests__\/test-.*\.js$/);
context.keys().forEach(context);
