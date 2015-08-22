angular.module('starter')

.controller('ContactFormController', function($scope,$state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //

  $scope.init = function(){

  }

  $scope.next = function(contactData){
    console.log('first',contactData.first_name);
    console.log('last',contactData.last_name);
    console.log('phone',contactData.phone_number);
    var contactInfo =  {
      first_name: contactData.first_name,
      last_name: contactData.last_name,
      phone_number: contactData.phone_number
    };

    $state.go('nav.order-form',contactInfo);
  }

});

