'use strict';

angular.module('starter')
  .service('OrderService', ['$http', OrderService])
  .service('FlavorService',['$http', FlavorService])
  .service('CakeService',['$http', CakeService])


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

  this.placeOrder = function(request){
    return $http.post(SERVER + '/api/order_routes/place_order',{
      orderData : request
    });
  }
}

function FlavorService($http){

  this.getAllFlavors = function(){
    return $http.get(SERVER + '/api/icecream_routes/get_flavors')
  }

}


function CakeService($http){

  this.getAllFlavors = function(){
    return $http.get(SERVER+'/api/cake_routes/get_flavors');
  }

  this.getAllSizes = function(){
    return $http.get(SERVER+'/api/cake_routes/get_sizes');

  }

}

