/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-04
 */
import { assert } from 'chai';
import EventBus from '../index';

describe('event-bus', () => {

	EventBus.on('test', (...args) => {
		assert.deepEqual(args, [10, 100, 1000]);
	});

	EventBus.once('once', (...args) => {
		assert.deepEqual(args, [10, 100, 1000]);
	});

	it('dispatch correctly', () => {
		EventBus.dispatch('test', 10, 100, 1000);
	});

	it('once on', () => {
		EventBus.dispatch('once', 10, 100, 1000);
		assert.equal(EventBus.getListeners('once'), 0);
	});

	it('off', () => {

		EventBus.off('test');

		const off = EventBus.on('test', (...args) => {
			assert.equal(args[0], 1);
		});

		EventBus.dispatch('test', 1);

		off();

		assert.equal(EventBus.getListeners('test'), 0);

	});

	it('off listener in listener itself', () => {

		EventBus.off('test');

		let test = 0;
		let off = null;

		off = EventBus.on('test', () => {
			off();
		});

		EventBus.on('test', () => {
			test = 1;
		});

		EventBus.dispatch('test');

		off();

		assert.equal(test, 1);
	});

	it('off listener in another listener', () => {

		EventBus.off('test');

		let test = 0;
		let off = null;

		EventBus.on('test', () => {
			off();
		});

		off = EventBus.on('test', () => {
			test = 1;
		});

		EventBus.dispatch('test');

		off();

		assert.equal(test, 0);
	});

	it('listener queue should execute well after off action', () => {

		let called = false;
		const msg1 = 'k';
		const off1 = EventBus.on('off1', msg => assert.equal(msg, msg1));
		EventBus.on('off1', msg => {
			called = true;
			assert.equal(msg, msg1);
		});
		off1();
		EventBus.dispatch('off1', msg1);
		assert.isTrue(called);

	});

});
