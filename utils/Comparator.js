export default class Comparator {
    /**
     * Constructor.
     * @param {function(a:*, b:*)} [compareFunction]
     */

    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    /**
     * Default comparison function.
     * @param {(string|number)} a
     * @param {(string|number)} b
     * @return {number}
     */
    static defaultCompareFunction(a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }

    /**
     * Checks if two values are equal.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    equal(a, b) {
        return this.compare(a, b) === 0;
    }

    /**
     * checks if variable a is less than variable b.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThan(a, b) {
        return this.compare(a, b) < 0;
    }

    /**
     * checks if variable a is greater than variable b.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThan(a, b) {
        return this.compare(a, b) > 0;
    }

    /**
     * Checks if variable a is less than or equal to variable b.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThanOrEqual(a, b) {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    /**
     * Checks if variable a is greater than or equal to variable b.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThanOrEqual(a, b) {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * Reverses the comparison.
     * @return {Comparator}
     */
    reverse() {
        const compare = this.compare;
        this.compare = (a, b) => compare(b, a);
        return this;
    }
}