/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-04-06
 */

/**
 * bind装饰器,用于处理function bind不适用的场景
 */
export default (target, name, descriptor) => {

	if (!descriptor) {
		throw new Error('can not use Bind decorator with a constructor!');
	}

	const fn = descriptor.value || target[name];
	// use function name(or fn string if not support Function.name) as identifier which can ensure every function uniquely after wrapped
	const fnName = `__${fn.name || fn}Fn`;

	// 定义访问器属性的同时不能定义value跟writable
	// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
	delete descriptor.value;
	delete descriptor.writable;

	descriptor.set = function(value) {
		this[fnName] = value;
	};

	descriptor.get = function() {
		return this[fnName] || (this[fnName] = fn.bind(this));
	};

	return descriptor;
};
