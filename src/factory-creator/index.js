/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-29
 */

const FUNCTION_PRIVATE_PROPS = ['apply', 'arguments', 'bind', 'call', 'caller', 'constructor', 'Symbol'];

export default {

	create(Constructor) {

		console.warn('该方法在下一版本即将废弃,请尽快使用别的替代解决方案!');

		function factory(...args) {

			let instance = new Constructor(...args);

			const prototype = Object.getPrototypeOf(instance);

			Object.getOwnPropertyNames(prototype).forEach(prop => {

				// 只处理非私有方法
				if (FUNCTION_PRIVATE_PROPS.indexOf(prop) === -1) {
					// 绑定实例到构造函数的每个方法下
					let fn = prototype[prop];
					if (typeof fn === 'function') {
						prototype[prop] = fn.bind(instance);
					}
				}

			});

			return instance;
		}

		factory.$inject = Constructor.$inject || [];

		return factory;
	}

};
