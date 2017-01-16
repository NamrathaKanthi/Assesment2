(function(){
 'use strict';
 angular
 .module('TaskApp')
 .service('TaskService',function($http,$q){
 	var Value ={};
  this.getjson=function(url){
  var info=$q.defer();
  $http.get(url).then(function(data){
   info.resolve(data.data);
  },function(){

  })
  // .error(info.reject);
  return info.promise;  
 }
 //this.Value ={};
 // this.setData=function(data){
 // 	Value = data;
 // 	console.log(Value);
 // 	//return Value;
 // }
 // this.getData = function(){
 	
 // 	console.log(Value);
 // 	return Value;
 // }
 });
})();