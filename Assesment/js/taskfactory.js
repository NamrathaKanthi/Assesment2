/* Intialization of factory */

(function() {
    'use strict';
    angular
        .module('TaskApp')
        .factory('taskFactory', function() {
            /* Declaring a factory object */
            var factory = {};
            /* Declaring a factory array for storing data in factory */
            factory.dataArray = [];

            /*Updating data method */
            factory.updateInfo = function(key, value) {
                factory[key] = value;
                console.log("123");
                console.log(factory);
            }

            /* Getting data method */
            factory.getInfo = function(key) {
                console.log(factory[key]);
                return factory[key];
            }

            /*Displaying data in main controller */

            factory.displayInfo = function(data) {
                if (data) {
                    var arrayDetails = angular.copy(data);
                    console.log(data);
                    for (var i = 0; i < arrayDetails.length; i++) {
                        factory.dataArray.push(arrayDetails[i]);
                    }
                    console.log(factory.dataArray);
                }

                //return factory.dataArray;
            }

            /*Editing data method */

            var editData = {};
            factory.getEditInfo = function(data) {
                var editData = data;
                console.log(editData);

            }

            /*Setting data method */

            factory.setEditInfo = function() {
                console.log(editData);
                return editData;
            }
            return factory;
        });
})();
