# FactoryCreator 迁移指南

目前 `FactoryCreator.create` API 已不推荐使用,预计在 **后面两个版本之后** 废弃,建议已在使用的项目及时迁移。方法参照以下几个example：

## case 1 配合 `module.directive` 使用的

### 原写法(指令未注入使用外部服务)

Directive.js

```js
import Controller from './Controller';

export default class Direcitve {
	
	constructor() {
		this.restrict = 'A';
		this.controller = Controller;
	}
		
	// ....
}
```

index.js

```js
import Directive from './Directive';
import { FactoryCreator } from 'angular-es-utils';

export angular
    .module('directive', [])
    .directive('ccDirective', FactoryCreator.create(Directive))
    .name;
```
### 迁移后写法
index.js

```js
import controller from './Controller';

const ddo = {
	restrict: 'A',
	controller
};

export angular
	.module('directive', [])
	.directive('ccDirecrive', () => ddo)
	.name;
```

### 原写法(指令注入了外部服务)

Directive.js

```js
import Controller from './Controller';

@Inject('$compile')
export default class Direcitve {
	
	constructor() {
		this.restrict = 'A';
		this.controller = Controller;
	}
	
	link() {
		this._$compile();
		// ...
	}
}
```

### 迁移后写法

```js
import Controller from './Controller';
import injector from 'angular-es-utils/injector';

export default class Direcitve {
	
	constructor() {
		this.restrict = 'A';
		this.controller = Controller;
	}
	
	link() {
		const $compile = injector.get('$compile');
		$compile();
		// ...
	}
}
```

## case 2 配合 `module.filter`/`module.factory` 使用的

filter 跟 factory 可以改造成 es6 module export出去，不需要定义成 filter/factory。filter/factory 中使用依赖注入的服务可以通过 `injector.get` 的方式获取。

