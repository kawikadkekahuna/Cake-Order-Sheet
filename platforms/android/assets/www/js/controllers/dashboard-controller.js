angular.module('starter').controller('DashController', function ($scope, $ionicPlatform, $ionicBackdrop, $ionicHistory, $state, $localStorage, $ionicPopup, $timeout, OrderService, OrderDetailService, StatusService) {
  ionic.Platform.ready(function () {
    /*Deletes current local storage and grabs fresh data*/
    delete ($localStorage.allOrders);
    delete ($localStorage.orderDetails);

    OrderService.getAllOrders().then(function (orders) {
      $localStorage.allOrders = orders.data;
      $scope.allOrders = orders.data;
    });

    OrderDetailService.getAllDetails().then(function(orderDetails){
      $localStorage.orderDetails = orderDetails.data;
      console.log($localStorage.orderDetails);
    })

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

  });

  $scope.$on('$ionicView.enter', function (e) {
    $ionicHistory.clearHistory();
    /*$scope.gate is to fix android rendering issues with $ionicPopup*/
    $scope.gate = true;
  });

  $scope.editOptions = StatusService.getOptions();


  $scope.showOrder = function(event, order_number) {
    if ($scope.gate) {
      $state.go('nav.single', {
        order_number: order_number
      });
    }
  }

  $scope.completeOrder = function(id) {
    OrderService.completeOrder(id).then(function (order) {
      var order = $localStorage.allOrders.filter(function (element) {
        return element.id == id
      })[0];
      order.completed = true;
    });
  }

  $scope.showEditStatus = function(event, id) {
    $scope.gate = false;
    $scope.editId = id;
    statusPopup = $ionicPopup.show({
      templateUrl: 'templates/nav-edit-cake-status.html',
      title: 'Cake Status?',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }]
    })

    $scope.updateStatus = function(id, name) {

      StatusService.updateStatus(id, name).then(function (res) {
        var order = $scope.allOrders.filter(function (element) {
          return element.id === id
        })[0];
        order.cake_status = name;
        statusPopup.close();
        $scope.gate = true;
      });
    }

  };

  $scope.showLegend = function() {
    statusPopup.close();
    var legendPopup = $ionicPopup.show({
      templateUrl: 'templates/nav-legend.html',
      title: 'Legend',
      scope: $scope,
      buttons: [{
        text: 'Cancel',
        onTap: function(e) {
          /*Hacky way to nest $ionicPopups.  Without removing popupcontainer, 
          ionicbackdrop does not nicely remove the preexisting popup */
          e.stopPropagation();
          e.preventDefault();
          $ionicBackdrop.release();
          legendPopup.close();
          jQuery('.popup-container').remove();
        }
      }]
    });
  }


});