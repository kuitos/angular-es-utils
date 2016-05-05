/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-29
 */

export default {

	create(Constructor) {

		function factory(...args) {

			let instance = new Constructor(...args);

			const prototype = Object.getPrototypeOf(instance);

			Object.getOwnPropertyNames(prototype).forEach(prop => {

				// 绑定实例到构造函数的每个方法下
				let fn = prototype[prop];
				if (prop !== 'constructor' && typeof fn === 'function') {
					prototype[prop] = fn.bind(instance);
				}

			});

			return instance;
		}

		factory.$inject = Constructor.$inject || [];

		return factory;
	}

};
