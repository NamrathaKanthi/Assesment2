/* Intialization of App*/

(function() {
    'use strict';
    angular
        .module('TaskApp', ['ui.bootstrap']);
})();
/* Intialization of main controller */
(function() {
    'use strict';
    angular
        .module('TaskApp')
        .controller('taskCtrl', ['TaskService', 'taskFactory', '$uibModal',
            function(TaskService, taskFactory, $uibModal) {
                /* Declaring a scope object for controller */
                var vm = {};
                /* Defining a object for storing data from controller */
                vm.newobject = {};
                vm.isEdited = false;


                /* Showing a Grouping table */
                vm.showingtable = function(index) {
                    vm.showtable = index;
                    console.log("hello");
                }

                /* Opening a modal using ui bootstrap */
                vm.openModal = function() {
                    var instance = $uibModal.open({
                        templateUrl: 'html/firstmodal.html',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        controller: 'taskModal1Ctrl',
                        controllerAs: 'tsM1'
                    });

                };

                /* Getting data from child controllers to main controller using factory */
                vm.DaTa = taskFactory.dataArray;
                console.log(vm.DaTa);

                /* Function for edit data in table rows */

                vm.fnEdit = function(obj) {
                    vm.isEdited = true;
                    vm.newobject = obj;
                    taskFactory.getEditInfo(obj);
                    vm.openModal();
                    console.log(obj);
                }

                // vm.fnDiscardChanges = function() {
                //     vm.newobject = {};
                //     $("#discardModel").modal('hide');
                //     $('#' + currentModel).modal('hide');
                // }

                /* Function for deleting data in table rows*/

                vm.deletedata = function(deleteIndex) {
                    vm.newobject = {};
                    vm.DaTa.splice(deleteIndex, 1);
                }
                return vm;
            }
        ]);
})();
