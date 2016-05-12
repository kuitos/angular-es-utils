/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-12
 */

/**
 * dynamic export,make the commonjs export has the same behaviour with es module
 * @param exportsRef exports reference
 * @param prop
 * @param getter
 */
export default (exportsRef, prop, getter) => {

	Object.defineProperty(exportsRef, prop, {
		get() {
			return getter.apply(this);
		}
	});

};
