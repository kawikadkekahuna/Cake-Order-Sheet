'use strict';

angular.module('starter')
  .service('OrderService', ['$http', OrderService])
  .service('FlavorService', ['$http', FlavorService])
  .service('CakeService', ['$http', CakeService])
  .service('TimeService', ['$http', TimeService])
  .service('StatusService', ['$http', StatusService])
  .service('CalendarService', ['$http', '$localStorage', CalendarService])

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

  this.placeOrder = function(request) {
    return $http.post(SERVER + '/api/order_routes/place_order', {
      orderData: request
    });
  }

  this.getMessageColors = function() {
    return $http.get(SERVER + '/api/order_routes/message_colors');
  }

  this.getPresetMessages = function() {
    return $http.get(SERVER + '/api/order_routes/preset_messages');
  }
}

function FlavorService($http) {

  this.getAllFlavors = function() {
    return $http.get(SERVER + '/api/icecream_routes/get_flavors')
  }

}


function CakeService($http) {

  this.getAllFlavors = function() {
    return $http.get(SERVER + '/api/cake_routes/get_flavors');
  }

  this.getAllSizes = function() {
    return $http.get(SERVER + '/api/cake_routes/get_sizes');

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

function CalendarService($http,$localStorage) {

  this.getMonthlyEvents = function() {
    var events = [];
    $localStorage.allOrders.forEach(function(order) {
      var date = new Date(parseInt(order.pickup_date));
      var month = date.getMonth();
      var day = date.getDate();
      var year = date.getFullYear();

      console.log('test',date.toISOString());

      events.push({
        title: order.first_name,
        start: date.toISOString()
      })
    })
    return events;
  }

  this.addEvent = function() {

  }
}