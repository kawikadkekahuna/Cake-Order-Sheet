'use strict';

angular.module('starter')
  .service('OrderService', ['$http', OrderService])
  .service('FlavorService',['$http',FlavorService])


function OrderService($http) {

  this.getAllOrders = function() {
    return $http.get(SERVER + '/api/order_routes/');
  }

  this.updateOrders = function() {
    return $http.get(SERVER + '/api/order_routes/');
  }

  this.completeOrder = function(id) {
    return $http.post(SERVER + '/api/order_routes/complete', {
      id: id
    });
  }

  this.incompleteOrder = function(id) {
    return $http.post(SERVER + '/api/order_routes/incomplete', {
      id: id
    });

  }

}

function FlavorService($http){

  this.getAllFlavors = function(){
    return $http.get(SERVER + '/api/flavor_routes/')
  }

}