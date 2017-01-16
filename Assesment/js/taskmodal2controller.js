/* Controller Intialization */

angular.module('TaskApp')
    .controller('taskModal2Ctrl', ['TaskService', 'taskFactory', '$uibModalInstance',
        function(TaskService, taskFactory, $uibModalInstance) {
            /*Scope object for controller */
            var secondmodaldata = {};
            /*Declaring a object for storing data */
            secondmodaldata.newobject = {};
            /*Service for getting jsons */
            TaskService.getjson('jsons/l_ChargeAmountBasis.json').then(function(data) {
                secondmodaldata.chargeAmountBasisdetails = data.result;
                console.log(secondmodaldata.chargeAmountBasisdetails);
            });

            TaskService.getjson('jsons/l_GrowthType.json').then(function(data) {
                secondmodaldata.growthType = data.result;
                console.log(secondmodaldata.growthType);
            });

            secondmodaldata.fixed = true;
            secondmodaldata.percent = false;
            /*Getting data into scope object*/
            secondmodaldata.GrowthData = function(data) {
                secondmodaldata.newobject.Growthdata = data;
                if (data == 'Percent') {
                    secondmodaldata.fixed = false;
                    secondmodaldata.percent = true;
                }
                if (data == 'Fixed') {
                    secondmodaldata.fixed = true;
                    secondmodaldata.percent = false;
                }
            }

            secondmodaldata.chargeamountData = function(data) {
                secondmodaldata.newobject.chargeamountbasis = data;
                console.log(data);
            }

            secondmodaldata.close = function() {
                secondmodaldata.newobject = {};
            }

            secondmodaldata.Details = [];
            console.log(secondmodaldata.Details);

            /*Save function for storing data */
            secondmodaldata.save = function() {
                var flag = false;
                secondmodaldata.isChecked = false;
                secondmodaldata.Data = {};
                secondmodaldata.Data = taskFactory.getInfo('info-1');
                console.log(secondmodaldata.Data);
                secondmodaldata.newobject.paymentinfo = secondmodaldata.Data.paymentinfo;
                secondmodaldata.newobject.details = [];
                secondmodaldata.newobject.details.push(taskFactory.getInfo('info-1'));
                if (secondmodaldata.Details.indexOf(secondmodaldata.newobject) == -1) {
                    secondmodaldata.Details.push(secondmodaldata.newobject);
                }
                taskFactory.displayInfo(secondmodaldata.Details);
                //vm.DaTa = taskFactory.displayInfo();
                console.log(secondmodaldata.Details);
                $uibModalInstance.close();
                return secondmodaldata.Details;
            }

            return secondmodaldata;
        }
    ]);
