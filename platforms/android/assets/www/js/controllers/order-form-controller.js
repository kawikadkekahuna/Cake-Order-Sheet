angular.module('starter')
.controller('OrderFormController', function($scope, $ionicPlatform, $state, $stateParams, TimeService, $localStorage, OrderService, StatusService) {

  $scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60), //Optional
    step: 15, //Optional
    format: 12, //Optional
    titleLabel: '12-hour Format', //Optional
    setLabel: 'Set', //Optional
    closeLabel: 'Close', //Optional
    setButtonType: 'button-positive', //Optional
    closeButtonType: 'button-stable', //Optional
    callback: function(val) { //Mandatory
      timePickerCallback(val);
    }
  };

  $scope.datepickerObject = {
    titleLabel: 'Title', //Optional
    todayLabel: 'Today', //Optional
    closeLabel: 'Close', //Optional
    setLabel: 'Set', //Optional
    errorMsgLabel: 'Please select time.', //Optional
    setButtonType: 'button-assertive', //Optional
    inputDate: new Date(), //Optional
    mondayFirst: true, //Optional
    templateType: 'popup', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: new Date(2012, 8, 2), //Optional
    to: new Date(2018, 8, 25), //Optional
    callback: function(val) { //Mandatory
      datePickerCallback(val);
    }
  };

  var datePickerCallback = function(val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      $scope.datepickerObject.inputDate = val;
      $scope.pickup_date = new Date(val).getTime().toString();
      $scope.order.pickup_date = $scope.pickup_date;
    }
  };

  function timePickerCallback(val) {
    if (typeof(val) === 'undefined') {
      return;
    }
    $scope.timePickerObject.inputEpochTime = val;
  }

  $scope.formFieldData = {
    cakeFlavorText: 'Cake Flavors',
    cakeFlavors: $localStorage.orderDetails[3],
    cakeSizeText: 'Cake Size',
    cakeSizes: $localStorage.orderDetails[4],
    quantityText: '1',
    quantity: $localStorage.orderDetails[5],
    icecreamFlavorText: 'Icecream Flavors',
    icecreamFlavors: $localStorage.orderDetails[2],
    presetMessageText: 'Preset Messages',
    presetMessages: $localStorage.orderDetails[1],
    messageColorText: 'Message Color',
    messageColors: $localStorage.orderDetails[0]
  };



  $scope.order = {
    quantity: 1,
    pickup_date: 'Select Date',
    pickup_time_text: 'Select Time',
    order_processed_text: 'Online',
    paid_status_text: 'Not-Paid'
  };


  $scope.renameOrderProcessed = function() {
    if ($scope.order.order_processed) {
      $scope.order.order_processed_text = 'In Store'
    } else {
      $scope.order.order_processed_text = 'Online'
    }
  }

  $scope.renamePaidStatus = function() {
    if ($scope.order.paid_status) {
      $scope.order.paid_status_text = 'Paid'
    } else {
      $scope.order.paid_status_text = 'Not-Paid'
    }
  }



  $scope.createOrder = function(orderData) {
    /*ionic-datepicker is in another js file. unable to add ng-model.  hacky way */
    orderData.pickup_date = $scope.pickup_date;
    orderData.message += ' ' +orderData.cake_message;
    orderData.first_name = $stateParams.first_name;
    orderData.last_name = $stateParams.last_name;
    orderData.phone_number = $stateParams.phone_number;
    orderData = JSON.stringify(orderData);
    OrderService.placeOrder(orderData).then(function(res) {
      OrderService.getAllOrders().then(function(orders) {
        $localStorage.allOrders = orders.data;
        console.log('bai');
        $state.go('nav.orders');
      });
    });
  }


});