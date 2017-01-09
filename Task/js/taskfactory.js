(function() {
    'use strict';
    angular
        .module('TaskApp')
        .factory('taskFactory', function() {
            var factory = {};
            return {
                updateInfo: function(key, value) {
                    factory[key] = value;
                    console.log("123");
                    console.log(factory);
                },
                getInfo: function(key) {
                    console.log(factory[key]);
                    return factory[key];
                }
            };
        });
})();
