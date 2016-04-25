## decorators

* Inject
	
	将指定的ng服务(包括自定义服务)注入到构造器中(Service、Controller、Filter等)，同时绑定到this对象上，格式为 `this._serviceName`
	
	```js
	@Inject('$q')
	class Service {
		getQ() {
			return this._$q;
		}
	}
	```
* Bind
	
	使用装饰器的方式实现`Function.prototype.bind`
	
	```js
	class Service {
		
		constructor(name) {
			this.name = name;
		}
	
		@Bind
		getName() {
			return this.name;
		}
	}
	
	const service = new Service('kuitos');
	const getName = service.getName;
	console.log(getName()); // kuitos
	```

* Debounce

	`@Debounce(delay, context || this)`
	
	```js
	class Service {
		
		@Debounce(100)
		resize() {
			
			// debounce
		}
	}
	
	```
* Throttle

	`@Throttle(delay, context || this)`

	```js
	class Service {
		
		@Throttle(100)
		switchButton() {
			// throttle
		}
	}
	
	```