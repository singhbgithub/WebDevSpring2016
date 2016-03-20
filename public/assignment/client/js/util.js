(function() {
    'use strict';
    // Array Remove - By John Resig (MIT Licensed)
    Array.remove = function(arr, from, to) {
        var rest = arr.slice((to || from) + 1 || arr.length);
        arr.length = from < 0 ? arr.length + from : from;
        return arr.push.apply(arr, rest);
    };
})();