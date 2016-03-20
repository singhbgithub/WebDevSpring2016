(function() {
    'use strict';

    /* Add a node module w/out dependencies */
    module.exports = function() {
        var util = {};
        /**
         * Determines if the passed in object is 'numeric'.
         * @param {object} n - is this a number?
         * @returns {boolean}
         */
        util.isNumeric = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        // Array Remove - By John Resig (MIT Licensed)
        util.remove = function(arr, from, to) {
            var rest = arr.slice((to || from) + 1 || arr.length);
            arr.length = from < 0 ? arr.length + from : from;
            return arr.push.apply(arr, rest);
        };

        return util;
    };
})();
