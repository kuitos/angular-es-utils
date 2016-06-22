## rs-generator

### How To Use

```js
import genResource, {setApiPrefix, setCommonConfigs} from 'angular-es-utils/rs-generator';
import dynamicExport from 'angular-es-utils/dynamic-export';

// 设置rest api前缀
setApiPrefix('/rest/1.0');

const COMMON_CONFIGS = {
	headers: {
		'Content-Type': 'application/json'
	},
	interceptors: []
};

// 设置请求通用配置
setCommonConfigs(COMMON_CONFIGS);

// 直接基于es6 export
dynamicExport(exports, 'User', () => genResource('/users/:userId', false, {userId: 1}, 
	{authenticate: {method: 'GET'}},
	{headers: {'X-AUTH-NAME': 'xxxx'}}
));

// 使用angular service
export default angular.module('services', [])
	.factory('User', () => genResource('/users/:userId', false, {userId: 1}))
	.name;
```

### API 


* genResource

	`import genResource from 'angular-es-utils/rs-generator';`

	genResource(url, cache, params, additionalActions, additionalHttpConfigs)

	API参数用法更$resource服务一致，具体参见 [$resource](https://docs.angularjs.org/api/ngResource/service/$resource)

* setApiPrefix & setCommonConfigs
	`import {setApiPrefix, setCommonConfigs} from 'angular-es-utils/rs-generator';`

	// 设置使用genResource生成的请求前缀  
setApiPrefix(apiPrefix)

	// 设置使用genResource生成的请求通用配置，参考 [$http.config](https://docs.angularjs.org/api/ng/service/$http#usage)  
setCommonConfigs(commonConfigs)


