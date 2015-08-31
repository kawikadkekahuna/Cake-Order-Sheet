'use strict';

angular.module('starter')
  .service('OrderService', ['$http', OrderService])
  .service('FlavorService',['$http', FlavorService])
  .service('CakeService',['$http', CakeService])
  .service('TimeService',['$http', TimeService])
  .service('StatusService',['$http', StatusService])

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

function TimeService($http){
  this.parseUTC = function(utc){
    utc = utc.toDateString()
    return utc;
  }
}

function StatusService($http){

  this.options = [{
    status:'status-not-built',
    name:'Not-Built'
   },{
    status:'status-built',
    name:'Built'
   },{
    status:'status-frosted',
    name:'Frosted'
   },{
    status:'status-completed',
    name:'Complete'
   }];

  this.getOptions = function(){
    return this.options;
  }

  this.updateStatus = function(id,name){
    return $http.post(SERVER +'/api/order_routes/update_status',{
      id:id,
      name:name
    });
  }
}