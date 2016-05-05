/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-04
 */

import injector from '../injector';
import angular from 'angular';

let topics = {};

export default {

	/**
	 * 订阅消息
	 * @param topic 订阅消息名
	 * @param listener 消息发布时触发的回调
	 * @param scope 订阅行为发生所在的scope，用于在scope销毁时作解绑操作
	 * @returns {Function} 取消订阅的反注册函数
	 */
	subscribe: (topic, listener, scope) => {

		let topicListeners = topics[topic] = topics[topic] || [];

		// 可清除指定监听器，如果不传则清除对应topic全部监听器
		function unSubscribe(listener) {

			var listenerIndex;

			if (!listener) {
				// 清空
				topicListeners.length = 0;
			} else {

				listenerIndex = topicListeners.indexOf(listener);
				if (~listenerIndex) {
					topicListeners.splice(listenerIndex, 1);
				}
			}
		}

		if (scope && (scope.constructor === injector.get('$rootScope').constructor)) {
			// scope销毁时同步移除对应订阅行为
			scope.$on('$destroy', unSubscribe.bind(null, listener));
		}

		topicListeners.push(listener);

		return unSubscribe;
	},

	/**
	 * 发布消息，支持链式调用
	 */
	publish: (...args) => {

		const topic = args[0];
		const listeners = topics[topic] || [];

		listeners.forEach(listener => {

			if (angular.isFunction(listener)) {
				listener.apply(null, args.slice(1));
			} else {
				console.error('中介者发布 %s 消息失败，注册的listener不是函数类型！', topic);
			}
		});

		return this;
	}
};
