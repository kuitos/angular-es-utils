/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-29
 */

export default class {

	static create(Constructor) {

		function factory(...args) {

			let instance = new Constructor(...args);

			Object.getOwnPropertyNames(Constructor.prototype).forEach(prop => {

				// 绑定实例到构造函数的每个方法下
				if (prop !== 'constructor' && typeof Constructor.prototype[prop] === 'function') {
					instance[prop] = instance[prop].bind(instance);
				}

			});

			return instance;
		}

		factory.$inject = Constructor.$inject || [];

		return factory;

	}

}
