/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-04
 */

import angular from 'angular';

let topics = {};

/**
 * 事件总线。用于解决各模块间无法通过 $scope.$emit $scope.$on 等方式实现通信的问题(例如兄弟模块间通信)
 */
export default {

	/**
	 * 订阅消息
	 * @param topic 订阅消息名
	 * @param listener 消息发布时触发的回调
	 * @param scope 订阅行为发生所在的scope，用于在scope销毁时作解绑操作
	 * @returns {Function} 取消订阅的反注册函数
	 */
	on: (topic, listener, scope) => {

		let topicListeners = topics[topic] = topics[topic] || [];

		// 可清除指定监听器，如果不传则清除对应topic全部监听器
		function deregister(listener) {

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

		if (scope && (scope.constructor === scope.$root.constructor)) {
			// scope销毁时同步移除对应订阅行为
			scope.$on('$destroy', deregister.bind(null, listener));
		}

		topicListeners.push(listener);

		return deregister;
	},

	/**
	 * 发布消息，支持链式调用
	 */
	dispatch: (...args) => {

		const topic = args[0];
		const listeners = topics[topic] || [];

		listeners.forEach(listener => {

			if (angular.isFunction(listener)) {
				listener.apply(null, args.slice(1));
			} else {
				console.error('事件总线分发 %s 消息失败，注册的listener不是函数类型！', topic);
			}
		});

		return this;
	}
};
