'use strict';

angular.module('starter')
  .service('OrderService', ['$http', OrderService])



function OrderService($http){

  this.getAllOrders = function(){
    return $http.get(SERVER+'/api/order_routes/');
  }

  this.updateOrders = function(){
    return $http.get(SERVER+'/api/order_routes/');
  }

  this.completeOrder = function(id){
  	console.log('id',id);
  	return $http.post(SERVER+'/api/order_routes/complete',{
  		id:id
  	});
  }

}
