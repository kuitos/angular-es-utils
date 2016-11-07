## rs-generator
基于$resource封装的resource生成器

### How To Use

```js
import injector from 'angular-es-utils/injector';
import genResource, {setApiPrefix, defaultHttpConfigs} from 'angular-es-utils/rs-generator';
import dynamicExport from 'angular-es-utils/dynamic-export';

// 设置rest api前缀
setApiPrefix('/rest/1.0');

// 设置请求通用配置
defaultHttpConfigs.headers = { 
	'Content-Type': 'application/json',
	'X-ID': () => window.localStorage.getItem('X-ID')
};

// 由于$http api的限制，只能设置response/responseError拦截逻辑
defaultHttpConfigs.interceptor = {
	response: response => {},
	responseError: rejection => {
		if(rejection.status === 401){
			injector.get('$location').url('/login');
		}
	}
};

/* ----------------- 导出resource方案 ----------------- */
// 方案1: 直接es6 export, 只有嵌入portal的子系统可以直接export
export const User = genResource('/users/:userId', false, {userId: 1}, 
	{authenticate: {method: 'GET'}},
	{headers: {'X-AUTH-NAME': 'xxxx'}}
);

// DEPRECATED!!
// 2.x版本已废弃,genResource 自身已具备 lazy export 能力，所以直接使用方案 1 即可
// 方案2: lazy export
dynamicExport(exports, 'User', () => genResource('/users/:userId', false, {userId: 1}, 
	{authenticate: {method: 'GET'}},
	{headers: {'X-AUTH-NAME': 'xxxx'}}
));

// DEPRECATED!!
// 还不如方案2
// 方案3: 使用angular service
export default angular.module('module.services', [])
	.factory('User', () => genResource('/users/:userId', false, {userId: 1}))
	.name;
```

### API 


* genResource

	`import genResource from 'angular-es-utils/rs-generator';`

	genResource(url, cache, params, additionalActions, additionalHttpConfigs)

	API参数用法更$resource服务一致，具体参见 [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)

* setApiPrefix
	`import {setApiPrefix} from 'angular-es-utils/rs-generator';`

	// 设置使用genResource生成的请求前缀  
	setApiPrefix(apiPrefix)

* defaultHttpConfigs  
	// 设置使用genResource生成的请求通用配置，参考 [$resource usage actions](https://docs.angularjs.org/api/ngResource/service/$resource)  
	
	```js
	defaultHttpConfigs.headers = {xx:xxx};  
	defaultHttpConfigs.interceptor = xxxxx;
	```
	


