/* Intialization of child first controller */

(function() {
    'use strict';
    angular
        .module('TaskApp')
        .controller('taskModal1Ctrl', ['TaskService', 'taskFactory', '$uibModal',
            function(TaskService, taskFactory, $uibModal) {
                /* scope object intialization for child controller */
                var firstmodal = {};

                /* Intilazing new object for data storing in controller */
                firstmodal.newobject = {};

                /* Function for editing in table rows */
                var EditData = taskFactory.setEditInfo();
                if (EditData != "") {
                    firstmodal.newobject = EditData;
                    console.log(firstmodal.newobject);
                }

                /* Jsons calling using service */

                TaskService.getjson('./jsons/c_frequecyType.json').then(function(data) {
                    console.log("123");
                    firstmodal.frequencydetails = data;
                    firstmodal.dropDownListData = [];
                    firstmodal.frequencydetails.map(function(val, key) {
                        var splitedArray = val.path.split('\\');
                        firstmodal.dropDownListData.push(splitedArray[splitedArray.length - 1]);
                    });
                    console.log(firstmodal.dropDownListData);
                });
                TaskService.getjson('jsons/c_paymentType.json').then(function(data) {
                    firstmodal.paymentdetails = data;
                    firstmodal.Paymentdetails = [];
                    firstmodal.paymentdetails.map(function(val, key) {
                        var spiltArray = val.path.split('\\');
                        firstmodal.Paymentdetails.push(spiltArray[spiltArray.length - 1]);
                    });

                    //console.log(firstmodal.paymentdetails);
                });

                TaskService.getjson('jsons/l_AccountingType.json').then(function(data) {
                    firstmodal.accountdetails = data.result;
                    //console.log(firstmodal.accountdetails);
                });

                TaskService.getjson('jsons/l_PaymentDueOn.json').then(function(data) {
                    firstmodal.paymentdueondetails = data.result;
                    //console.log(firstmodal.paymentdueondetails);
                });
                TaskService.getjson('jsons/l_PaymentTiming.json').then(function(data) {
                    firstmodal.paymentTimingdetails = data.result;
                    //console.log(firstmodal.paymentTimingdetails);
                });

                TaskService.getjson('jsons/l_PaymentDueDay.json').then(function(data) {
                    firstmodal.paymentDueDay = data.result;
                    //console.log(firstmodal.paymentDueDay);
                });

                /* Getting data into scope object */

                firstmodal.accountData = function(data) {
                    firstmodal.newobject.accountfeildtext = data;
                }
                firstmodal.display = true;
                firstmodal.paymentduedaY = true;
                firstmodal.paymentdueOn = true;
                firstmodal.frequency = function(data) {
                    firstmodal.newobject.frequency = data;
                    //console.log(data);
                    if (data == 'Other') {
                        firstmodal.paymentduedaY = false;
                        firstmodal.paymentdueOn = false;
                    }
                    if ((data == 'Annually') || (data == 'Semi-Annually') || (data == 'Quarterly')) {
                        firstmodal.paymentduedaY = true;
                        firstmodal.paymentdueOn = false;
                    }

                    if ((data == 'Monthly')) {
                        firstmodal.paymentdueOn = false;
                        //$scope.display = false;
                        firstmodal.paymentduedaY = true;
                    }

                }
                firstmodal.paymentTimmingData = function(data) {
                    firstmodal.newobject.paymentfieldtext = data;
                }
                firstmodal.PaymentData = function(data) {
                    firstmodal.newobject.paymentinfo = data;
                }
                firstmodal.paymentDueData = function(data) {
                    firstmodal.newobject.paymentdueday = data;
                }


                firstmodal.PayamentDueOn = function(data) {
                    firstmodal.newobject.PaymentDueon = data;
                }

                /* Save button functionality for first modal */

                firstmodal.Details = [];
                firstmodal.show = function() {
                    firstmodal.Firstmodal = taskFactory.updateInfo('info-1', {
                        paymentinfo: firstmodal.newobject.paymentinfo,
                        Accounttype: firstmodal.newobject.accountfeildtext,
                        frequency: firstmodal.newobject.frequency,
                        periodStartdate: firstmodal.newobject.date,
                        paymenttiming: firstmodal.newobject.paymentfieldtext,
                        paymentdueon: firstmodal.newobject.PaymentDueon,
                        paymentdueday: firstmodal.newobject.paymentdueday
                    });

                    var instance = $uibModal.open({
                        templateUrl: 'html/secondmodal.html',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        controller: 'taskModal2Ctrl',
                        controllerAs: 'tsM2'

                    });
                }

                /* Close modal functionality */

                firstmodal.fnclosemodal = function(currentModelId, fromModel) {
                    currentModel = currentModelId;
                    if (firstmodal.isEdited) {
                        $("#discardModel").modal('show');
                    } else {
                        if (fromModel == "secondmodal") {
                            firstmodal.open = false;
                        }
                        $("#" + currentModel).modal('hide');
                    }
                }

                /* Validation check for fileds*/

                firstmodal.isChecked = false;
                firstmodal.fnValidationCheck = function() {
                    firstmodal.isChecked = true;
                    return true
                }

                return firstmodal;
            }
        ]);

})();
