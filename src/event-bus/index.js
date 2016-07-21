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
	 * @returns {Function} 取消订阅的反注册函数
	 */
	on: function (topic, listener) {

		let topicListeners = topics[topic] = topics[topic] || [];
		topicListeners.push(listener);

		return this.off.bind(this, topic, listener);
	},

	once: function (topic, listener) {

		const onceListener = (...args) => {
			this.off(topic, onceListener);
			listener.apply(null, args);
		};

		return this.on(topic, onceListener);
	},

	/**
	 * 移除注册信息
	 * @param topic 消息名
	 * @param listener  移除的注册函数,不传则移除全部注册
	 */
	off: function (topic, listener) {

		let topicListeners = topics[topic];

		if (listener) {

			const listenerIndex = topicListeners.indexOf(listener);
			if (~listenerIndex) {
				topicListeners.splice(listenerIndex, 1);
			}

		} else {
			// 清空
			topicListeners.length = 0;
		}

		return this;
	},

	/**
	 * 发布消息，支持链式调用
	 */
	dispatch: function (...args) {

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
	},

	getListeners: function (topic) {
		return topics[topic] || [];
	}
};
