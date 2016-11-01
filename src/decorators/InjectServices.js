/**
 * InjectServices 对于非 controller 的 class 进行依赖注入
 * */
import injector from '../injector';

export const InjectServices = (...dependencies) => target => {
	dependencies.forEach(dependency => {
		target.prototype[`_${dependency}`] = injector.get(dependency);
	});
};
