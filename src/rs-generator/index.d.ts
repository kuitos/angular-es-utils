import 'angular-resource';
export declare function setApiPrefix(prefix: any): void;
export declare let COMMON_HEADERS: {
	'Cache-Control': string;
	'X-Requested-With': string;
};
export declare let defaultHttpConfigs: {
	headers: {};
	interceptor: {};
};
declare var _default: <T>(url: string, cache?: any, params?: Object, additionalActions?: Object, additionalHttpConfigs?: Object, options?: Object) => T;
export default _default;
