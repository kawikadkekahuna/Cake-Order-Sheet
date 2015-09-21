'use strict';

angular.module('starter')
  .service('OrderService', ['$http', OrderService])
  .service('OrderDetailService',['$http',OrderDetailService])
  .service('TimeService', ['$http', TimeService])
  .service('StatusService', ['$http', StatusService])
  .service('CalendarService', ['$http', '$localStorage', CalendarService])

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = this.getDate().toString();
  return yyyy  +'-'+ (mm[1] ? mm : "0" + mm[0]) +'-'+ (dd[1] ? dd : "0" + dd[0]); // padding
};

function OrderService($http) {

  this.getAllOrders = function() {
    return $http.get(SERVER + '/api/order_routes/all_orders',{cache:true});
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

  this.placeOrder = function(request) {
    return $http.post(SERVER + '/api/order_routes/place_order', {
      orderData: request
    });
  }

}


function OrderDetailService($http){

  this.getAllDetails = function (){
    return $http.get(SERVER + '/api/order_detail/all');
  }
}

function TimeService($http) {
  this.parseUTC = function(utc) {
    utc = utc.toDateString()
    return utc;
  }
}

function StatusService($http) {

  this.options = [{
    status: 'status-not-built',
    name: 'Not-Built'
  }, {
    status: 'status-built',
    name: 'Built'
  }, {
    status: 'status-frosted',
    name: 'Frosted'
  }, {
    status: 'status-completed',
    name: 'Complete'
  }];

  this.getOptions = function() {
    return this.options;
  }

  this.updateStatus = function(id, name) {
    return $http.post(SERVER + '/api/order_routes/update_status', {
      id: id,
      name: name
    });
  }
}

function CalendarService($http, $localStorage) {

  this.getMonthlyEvents = function() {
    var events = [];
    
    // $localStorage.allOrders.forEach(function(order) {
    //   if (order.pickup_date) {
    //     var date = new Date(parseInt(order.pickup_date));
    //     events.push({
    //       title: order.pickup_time,
    //       start: date.yyyymmdd()
    //     })

    //   }
    // })
    return events;
  }

  this.addEvent = function() {

  }
}