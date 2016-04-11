/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-11
 */

/**
 * angular依赖注入器
 */
export default (...dependencies) => target => {

	class Constructor {

		constructor(...args) {
			// 将依赖服务挂载在原始构造函数的prototype上(不是直接绑定到this上,节省空间)
			dependencies.forEach((dep, i) => target.prototype[`_${dep}`] = args[i]);
			// 使用原始构造函数实例化
			return new target(...args);
		}
	}

	Constructor.$inject = dependencies;

	return Constructor;
};
