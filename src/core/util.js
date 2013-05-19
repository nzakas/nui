/**
 * NUI general utilities
 * @class util
 * @static
 * @namespace nui
 */
/*global nui*/
nui.util = {

    /**
     * Converts any array-like object into an actual array.
     * @param {Any[]} any array-like object
     * @return {Array} An actual array.
     */
    toArray: function(items) {
        return Array.prototype.slice.call(items);
    },

    bind: function(method, thisValue) {
        return function() {
            return method.apply(thisValue, arguments);
        };
    },

    forEach: function(items, method) {
        for (var i=0, len=items.length; i < len; i++) {
            method(items[i], i, items);
        }
    },

    /**
     * Basic string formatting using %s and %d.
     * @param {String} text The text to format.
     * @param {Any} value* The values to replace in the text.
     * @return {String} The resulting string.
     */
    format: function(text) {
        var args    = arguments,
            i       = 1;

        return text.replace(/%[sd]/g, function() {
            return args[i++];
        });
    }

};
