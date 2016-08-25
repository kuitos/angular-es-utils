## angular-es-utils

[![Build Status](https://img.shields.io/travis/kuitos/angular-es-utils.svg?style=flat)](https://travis-ci.org/kuitos/angular-es-utils)
[![npm version](https://img.shields.io/npm/v/angular-es-utils.svg?style=flat)](https://www.npmjs.com/package/angular-es-utils)
[![npm downloads](https://img.shields.io/npm/dt/angular-es-utils.svg?style=flat)](https://www.npmjs.com/package/angular-es-utils)
[![coverage](https://img.shields.io/codecov/c/github/kuitos/angular-es-utils.svg?style=flat)](https://codecov.io/gh/kuitos/angular-es-utils)

The es6 version of [angular utils](https://github.com/kuitos/angular-utils)     

How To Use

```shell
npm i angular-es-utils -D
```

```js
import {Inject} from 'angular-es-utils';
```

#### 工具列表
* animation  
	动画操作帮助类

	```js
	import {Animation} from 'angular-es-utils';
	import Animation from 'angular-es-utils/animation';
	```

* apply  
	替代`$scope.$apply()`
	
	```js
	import apply from 'angular-es-utils/apply';
	
	...
	apply();
	```


* decorators  
	装饰器
	[decorators usage](https://github.com/kuitos/angular-es-utils/blob/master/src%2Fdecorators%2FREADME.md)

* deferred
* factory-creator
	
	##### Deprecated [迁移指南](src/factory-creator/README.md)

	将Class转换成factory，供directive语法使用
	
	```js
	.directive('editor', FactoryCreator.create(Editor))
	```

* injector  
	在angular环境之外获取ng-app的注入器
	
	```js
	import injector from 'angular-es-utils/injector';
	let scope = injector.get('$rootScope').$new();
	```
	
* EventBus
	事件总线，环境无关的 订阅／发布 模型

	```js
	import EventBus from 'angular-es-utils/event-bus';
    // 订阅消息
    const deregister = EventBus.on('grid:click', (num1,num2,num3) => console.log(num1, num2, num3));
    // 发布消息
    EventBus.dispatch('grid:click', 1, 2, 3);
    // 解除订阅
    deregister();
	```

* module-helper
	
	```js
	import ModuleHelper from 'angular-es-utils/module-helper';
	let module = ModuleHelper.get('app');
	```
	