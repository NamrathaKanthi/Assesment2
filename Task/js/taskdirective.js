(function() {
    'use strict';
    angular
        .module('TaskApp')
        .directive('firstmodel', function() {
            return {
                restrict: "E",
                templateUrl: "html/firstmodal.html",
                controller: function() {
                    function init() {
                        $('#dateRangePicker')
                            .datepicker({
                                format: 'mm/dd/yyyy',
                            })
                    };
                    init();
                }
            };
        });
})();

(function() {
    'use strict';
    angular
        .module('TaskApp')
        .directive('secondmodel', function() {
            return {
                restrict: "E",
                // scope: {},
                templateUrl: "html/secondmodal.html"
            };
        });

})();