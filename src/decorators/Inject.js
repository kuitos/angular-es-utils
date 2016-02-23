/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-11
 */

/**
 * angular依赖注入器
 */
export default (...dependencies) => (target, key, descriptor) => {

	// 修饰的如果是类的方法
	if (descriptor) {
		const fn = descriptor.value;
		fn.$inject = dependencies;
	} else {
		target.$inject = dependencies;
	}

};
