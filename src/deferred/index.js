/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-03-02
 */

export default class Deferred {

	constructor() {

		this.promise = new Promise((resolve, reject) => {

			this._resolve = resolve;
			this._reject = reject;

		});

	}

	resolve(value) {
		this._resolve.call(this.promise, value);
	}

	reject(value) {
		this._reject.call(this.promise, value);
	}

}
