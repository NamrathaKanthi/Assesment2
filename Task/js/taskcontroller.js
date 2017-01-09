(function() {
    'use strict';
    angular
        .module('TaskApp', ['ngMessages']);
})();

(function() {
    'use strict';
    angular
        .module('TaskApp')
        .controller('taskCtrl', ['$scope', 'TaskService', 'taskFactory', function($scope, TaskService, taskFactory) {
            $scope.isEdited = false;
            var currentModel = '';
            TaskService.getjson('./jsons/c_frequecyType.json').then(function(data) {
                $scope.frequencydetails = data;
                $scope.dropDownListData = [];
                $scope.frequencydetails.map(function(val, key) {
                    var splitedArray = val.path.split('\\');
                    $scope.dropDownListData.push(splitedArray[splitedArray.length - 1]);
                })
                console.log($scope.dropDownListData);
            });
            TaskService.getjson('jsons/c_paymentType.json').then(function(data) {
                $scope.paymentdetails = data;
                $scope.Paymentdetails = [];
                $scope.paymentdetails.map(function(val, key) {
                    var spiltArray = val.path.split('\\');
                    $scope.Paymentdetails.push(spiltArray[spiltArray.length - 1]);
                })

                console.log($scope.paymentdetails);
            });

            TaskService.getjson('jsons/l_AccountingType.json').then(function(data) {
                $scope.accountdetails = data.result;
                console.log($scope.accountdetails);
            });

            TaskService.getjson('jsons/l_PaymentDueOn.json').then(function(data) {
                $scope.paymentdueondetails = data.result;
                console.log($scope.paymentdueondetails);
            });
            TaskService.getjson('jsons/l_PaymentTiming.json').then(function(data) {
                $scope.paymentTimingdetails = data.result;
                console.log($scope.paymentTimingdetails);
            });
            TaskService.getjson('jsons/l_ChargeAmountBasis.json').then(function(data) {
                $scope.chargeAmountBasisdetails = data.result;
                console.log($scope.chargeAmountBasisdetails);
            });

            TaskService.getjson('jsons/l_GrowthType.json').then(function(data) {
                $scope.growthType = data.result;
                console.log($scope.growthType);
            });

            TaskService.getjson('jsons/l_PaymentDueDay.json').then(function(data) {
                $scope.paymentDueDay = data.result;
                console.log($scope.paymentDueDay);
            });

            $scope.showingtable = function(index) {
                $scope.showtable = index;
            }
            $scope.accountData = function(data) {
                    $scope.newobject.accountfeildtext = data;
                }
                $scope.display = true;
                $scope.paymentduedaY = true;
                $scope.paymentdueOn = true;
            $scope.frequency = function(data) {
                $scope.newobject.frequency = data;
                console.log(data);
                if(data == 'Other'){
                    $scope.paymentduedaY = false;
                    $scope.paymentdueOn = false;
                }
                if((data == 'Annually')||(data == 'Semi-Annually') ||(data == 'Quarterly')){
                    $scope.paymentduedaY = true;
                    $scope.paymentdueOn = false;
                }

                if((data == 'Monthly')){
                    $scope.paymentdueOn = false;  
                    //$scope.display = false;
                    $scope.paymentduedaY = true;
                }

                }
            $scope.paymentTimmingData = function(data) {
                $scope.newobject.paymentfieldtext = data;
            }
            $scope.PaymentData = function(data) {
                $scope.newobject.paymentinfo = data;
            }
            $scope.paymentDueData = function(data) {
                $scope.newobject.paymentdueday = data;
            }
                $scope.fixed = true;
                $scope.percent = false;
            $scope.GrowthData = function(data) {
                $scope.newobject.Growthdata = data;
                if(data == 'Percent'){
                    $scope.fixed = false;
                    $scope.percent = true;
                }
                if(data == 'Fixed'){
                    $scope.fixed = true;
                    $scope.percent = false;
                }
            }
            $scope.PayamentDueOn = function(data) {
                $scope.newobject.PaymentDueon = data;
            }

            $scope.chargeamountData = function(data) {
                $scope.newobject.chargeamountbasis = data;
                console.log(data);
            }
            $scope.fnEdit = function(obj) {
                $scope.isEdited = true;
                $scope.newobject = obj;
            }

            $scope.fnDiscardChanges = function() {
                $scope.newobject = {};
                $("#discardModel").modal('hide');
                $('#' + currentModel).modal('hide');
            }

            $scope.fnclosemodal = function(currentModelId, fromModel) {
                currentModel = currentModelId;
                if ($scope.isEdited) {
                    $("#discardModel").modal('show');
                } else {
                    if (fromModel == "secondmodal") {
                        $scope.open = false;
                    }
                    $("#" + currentModel).modal('hide');
                }
            }

            $scope.isChecked = false;
            $scope.fnValidationCheck = function() {
                $scope.isChecked = true;
                return true
            }

            $scope.show = function() {
                $scope.Firstmodal = taskFactory.updateInfo('info-1', {
                    paymentinfo: $scope.newobject.paymentinfo,
                    Accounttype: $scope.newobject.accountfeildtext,
                    frequency: $scope.newobject.frequency,
                    periodStartdate: $scope.newobject.date,
                    paymenttiming: $scope.newobject.paymentfieldtext,
                    paymentdueon: $scope.newobject.PaymentDueon,
                    paymentdueday: $scope.newobject.paymentdueday
                });
                $scope.Secondmodal = taskFactory.updateInfo('info-2',{
                    growthdata: $scope.newobject.Growthdata,
                    chargeamountbasis: $scope.newobject.chargeamountbasis
                });
                $scope.open = true;
                $("#myModal").modal('hide');
                $("#myModal1").modal('show');
            }

            $scope.close = function() {
                $scope.open = false;
                $("#myModal").modal('show');
                $scope.newobject = {};
            }
            $scope.Details = [];
            $scope.save = function() {
                var flag = false;
                $scope.isChecked = false;
                $scope.open = false;
                $("#myModal1").modal('hide');
                $("#myModal").modal('hide');
                $scope.newobject.details = [];
                $scope.newobject.details.push(taskFactory.getInfo('info-1'));
                // $scope.newobject.details.push(taskFactory.getInfo('info-2'))
                if ($scope.Details.indexOf($scope.newobject) == -1) {
                    $scope.Details.push($scope.newobject);
                }
            }

            $scope.deletedata = function(deleteIndex) {
                $scope.newobject = {};
                $scope.Details.splice(deleteIndex, 1)
            }


        }]);
})();
