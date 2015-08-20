'use strict';

angular.module('starter')
  .service('OrderService', ['$http', OrderService])



function OrderService($http){

  this.getAllOrders = function(){
    return $http.get('/api/cake_orders/all');
  }

}
