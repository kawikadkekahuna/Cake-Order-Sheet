angular.module('starter')
  .directive('modalSelect', function($ionicModal) {
    return {
      restrict: 'E',
      templateUrl: 'templates/order-form-select-template.html',
      controller: 'OrderFormController as modalSelect',
      require:'ngModel',
      scope: {
        'items': '=',
        'multiSelect': '=',
      },
      link: function(scope, element, attrs, ngModel) {

        scope.headerText = attrs.headertext;  
        $ionicModal.fromTemplateUrl('templates/order-form-select-modal.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.modal = modal; 
        });

        scope.openModal = function() {
          scope.modal.show();
        };
        scope.closeModal = function() {
          scope.modal.hide();
        };
        scope.select = function() {
          if (attrs.multiselect) {
            scope.multiSelect();
          }else{
            scope.closeModal();
          }
        }

        scope.attachToModel = function(item){
          console.log('item',item);
          ngModel.$setViewValue(item.text);
          scope.headerText = item.text;
          scope.closeModal();          
        }

        scope.multiSelect = function() {
          var icecreamFlavors = '';
          jQuery.each(scope.items, function(index, item) {
            if (item.checked) {
              icecreamFlavors += (item.text + ' ,');
              scope.closeModal();
            };
            scope.attachToModel({text:icecreamFlavors});
          })

        }
      }
    }
  })
  .directive('standardTimeMeridian', function($localStorage) {
    return {
      restrict: 'AE',
      replace: true,
      require: 'ngModel',
      scope: {
        etime: '=etime'
      },
      template: "<strong>{{stime}}</strong>",
      link: function(scope, elem, attrs,ngModel) {

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
              ngModel.$setViewValue(prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian)
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
    cakeFlavors: $localStorage.cakeFlavors,
    cakeSizeText: 'Cake Size',
    cakeSizes: $localStorage.cakeSizes,
    quantityText: '1',
    quantity: $localStorage.quantityAmount,
    flavorText: 'Icecream Flavors',
    flavors: $localStorage.iceCreamFlavors,
    presetMessageText: 'Preset Messages',
    presetMessages: $localStorage.presetMessages,
    messageColorText: 'Message Color',
    messageColors: $localStorage.messageColors
  };



  $scope.order = {
    quantity: 1,
    pickup_date: 'Select Date',
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
    console.log(orderData);
    OrderService.placeOrder(orderData).then(function(res) {
      console.log(res.data.cake_status);
      OrderService.getAllOrders().then(function(orders) {
        console.log(orders);
        $localStorage.allOrders = orders.data;
        $localStorage.createOrder = {};
        $state.go('nav.order-by-day')
      });
    })
  }


});