angular.module('starter')
  .directive('modalSelect',function(){
    return{
      restrict:'E',
      require:'ngModel',
      templateUrl:'templates/order-form-select-template.html',
      scope:{
        'icecream-flavors':'=',
        'cake-flavors':'=',
        'cake-sizes':'=',
        'preset-messages':'=',
        'message-colors':'=',
      },
      link:function(scope,element,attrs,ngModel){

      }
    }
  })
  .directive('standardTimeMeridian', function($localStorage) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        etime: '=etime'
      },
      template: "<strong>{{stime}}</strong>",
      link: function(scope, elem, attrs) {

        scope.stime = epochParser(scope.etime, 'time');

        function prependZero(param) {
          if (String(param).length < 2) {
            return "0" + String(param);
          }
          return param;
        }

        function epochParser(val, opType) {
          if (val === null) {
            return "00:00";
          } else {
            var meridian = ['AM', 'PM'];

            if (opType === 'time') {
              var hours = parseInt(val / 3600);
              var minutes = (val / 60) % 60;
              var hoursRes = hours > 12 ? (hours - 12) : hours;

              var currentMeridian = meridian[parseInt(hours / 12)];
              $localStorage.createOrder.pickupTime = (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
              return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
            }
          }
        }

        scope.$watch('etime', function(newValue, oldValue) {
          scope.stime = epochParser(scope.etime, 'time');
        });

      }
    };
  })

.controller('OrderFormController', function($scope, $ionicPlatform, $state, OrderService, $stateParams, FlavorService, TimeService, $localStorage, CakeService) {

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
    }
  };

  function timePickerCallback(val) {
    if (typeof(val) === 'undefined') {
      return;
    }
    $scope.timePickerObject.inputEpochTime = val;
    $scope.pickup_time = val;
  }

  $scope.formFieldData = {
    cakeFlavorText: 'Cake Flavors',
    cakeFlavors: $localStorage.cakeFlavors,
    cakeSizeText: 'Cake Size',
    cakeSizes: $localStorage.cakeSizes,
    flavorText: 'Icecream Flavors',
    flavors: $localStorage.iceCreamFlavors,
    presetMessageText:'Preset Messages',
    presetMessage: $localStorage.presetMessages,
    messageColorText:'Message Color',
    messageColor: $localStorage.messageColors
  };



  $scope.order = {
    quantity: 1,
    pickup_date: new Date(),
    order_processed_text:'Online',
    paid_status_text:'Not-Paid'
  };

  $scope.renameOrderProcessed = function(){
    if($scope.order.order_processed){
      $scope.order.order_processed_text = 'In Store'
    }else{
      $scope.order.order_processed_text = 'Online'
    }
  }

  $scope.renamePaidStatus = function(){
    if($scope.order.paid_status){
      $scope.order.paid_status_text = 'Paid'
    }else{
      $scope.order.paid_status_text = 'Not-Paid'
    }
  }



  $scope.createOrder = function(orderData) {
    // console.log('orderData',orderData);
    // orderData.icecream_flavor = $localStorage.createOrder.iceCreamFlavors;
    // orderData.cake_flavor = $localStorage.createOrder.cakeFlavor;
    // orderData.cake_size = $localStorage.createOrder.cakeSize;
    // orderData.first_name = $stateParams.first_name;
    // orderData.last_name = $stateParams.last_name;
    // orderData.phone_number = $stateParams.phone_number;
    // orderData.pickup_time = $localStorage.createOrder.pickupTime;
    // orderData.pickup_date = $scope.pickup_date;
    // orderData.order_processed = $scope.order.order_processed_text;
    // orderData.message_color = $localStorage.createOrder.message_color;
    // orderData.message = $localStorage.createOrder.message +' '+ orderData.cake_message;
    console.log('orderData',orderData);

    OrderService.placeOrder(orderData).then(function(res) {
      OrderService.getAllOrders().then(function(orders) {
        $localStorage.allOrders = orders.data;
        $localStorage.createOrder = {};
        $state.go('nav.orders')
      });
    })
  }


});