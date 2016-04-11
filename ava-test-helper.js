/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-11
 */
// import test from 'ava';
import jsdom from 'jsdom';

global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.Node = global.window.Node;
