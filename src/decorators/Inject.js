/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-11
 */

// 需要过滤的构造函数的属性
const propBlacklist = ['name', 'prototype', 'length'];
/**
 * angular依赖注入器
 */
export default (...dependencies) => (target, name, descriptor) => {

	if (descriptor) {
		throw new Error('can not use Inject decorator with a non-constructor!');
	}

	const OriginalConstructor = target;

	class Constructor {

		constructor(...args) {

			/* ----------------- 以下这一段恶心的代码都是为了兼容function跟class定义controller这两种情况 ------------------------ */
			/* ----------------- 因为class定义的Constructor有时候需要直接访问this中以绑定的数据(fn.apply(instance, locals)) ------------------------ */

			// 存在通过 fn.apply(instance, locals) 的方式调用的情况,所以这里直接将依赖的服务拷贝到this里(服务已下划线作为前缀)
			dependencies.forEach((dependency, i) => this[`_${dependency}`] = args[i]);
			// 将构造器初始化时就需要访问的数据挂载到prototype上,这样即使通过new方式实例化也能在constructor里的this也具备完整信息
			Object.assign(OriginalConstructor.prototype, this);

			const instance = new OriginalConstructor(...args);

			// 初始化完毕需要从prototype上删除挂载的属性,因为有一些注入的局部服务对于每一个实例而言是隔离的,如果改变prototype会出现混乱
			Object.keys(this).forEach(prop => {
				// prototype上不可枚举的属性不能删除(比如方法/accessor等)
				if (OriginalConstructor.prototype.propertyIsEnumerable(prop)) {
					delete OriginalConstructor.prototype[prop];
				}
			});

			// 将this上的信息绑定到实例上
			Object.assign(instance, this);

			return instance;
		}
	}

	// 将原始构造函数的属性复制到新的Constructor中,包括prototype
	// 因为通过static class property语法定义的静态方法是不可枚举的,所以这里不能用Object.keys API来筛选.
	Object.getOwnPropertyNames(target).forEach(prop => {
		if (propBlacklist.indexOf(prop) === -1) {
			Constructor[prop] = target[prop];
		}
	});
	Constructor.$inject = dependencies;

	return Constructor;
};
