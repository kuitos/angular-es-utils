/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-11
 */

import 'angular-resource';

import injector from '../injector';

let apiPrefix = '';
let commonConfigs = {};

export function setApiPrefix(prefix) {
	apiPrefix = prefix;
}

export function setCommonConfigs(cc) {
	commonConfigs = cc;
}

export default (url, cache, params, additionalActions, additionalHttpConfigs = {}) => {

	additionalHttpConfigs = {...commonConfigs, ...additionalHttpConfigs};

	// 默认cache为defaultRestCache
	// 自定义配置(配合$http interceptor)
	const DEFAULT_ACTIONS = {
		// 查询，结果为对象
		'get': {method: 'GET', cache, ...additionalHttpConfigs},
		// 查询，结果为数组
		'query': {method: 'GET', isArray: true, cache, ...additionalHttpConfigs},
		// 保存(新增)
		'save': {method: 'POST', cache, ...additionalHttpConfigs},
		// 修改(全量)
		'update': {method: 'PUT', cache, ...additionalHttpConfigs},
		// 修改(部分)
		'patch': {method: 'PATCH', cache, ...additionalHttpConfigs},
		// 逻辑删除
		'remove': {method: 'DELETE', cache, ...additionalHttpConfigs},
		// 物理删除
		'delete': {method: 'DELETE', cache, ...additionalHttpConfigs}
	};

	return injector.get('$resource')(apiPrefix + url, params, Object.assign({}, DEFAULT_ACTIONS, additionalActions));
};
