/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-11
 */

import injector from '../injector';

export let apiPrefix = '';

export default (url, cache, params, additionalActions) => {

	// 默认cache为defaultRestCache
	// 自定义配置(配合$http interceptor) saveStatus:该操作将维护一个保存状态
	const DEFAULT_ACTIONS = {
		// 查询，结果为对象
		'get': {method: 'GET', cache},
		// 查询，结果为数组
		'query': {method: 'GET', isArray: true, cache},
		// 保存(新增)
		'save': {method: 'POST', cache},
		// 修改(全量)
		'update': {method: 'PUT', cache},
		// 修改(部分)
		'patch': {method: 'PATCH', cache},
		// 逻辑删除
		'remove': {method: 'DELETE', cache},
		// 物理删除
		'delete': {method: 'DELETE', cache}
	};

	return injector.get('$resource')(apiPrefix + url, params, Object.assign({}, DEFAULT_ACTIONS, additionalActions));
};
