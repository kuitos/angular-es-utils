/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-21
 */

import 'angular';
import 'angular-mocks';

// init injector
document.body.setAttribute('ng-app', '');
angular.bootstrap(document.body);

const context = require.context('../src', true, /\/__tests__\/test-.*\.js$/);
context.keys().forEach(context);

// require all `src/**/index.js`
const appContext = require.context('../src', true, /[a-z\-]+\/[A-Za-z]+\.js$/);
appContext.keys().forEach(appContext);
