angular.module('starter')

.controller('OrderFormController', function($scope,$stateParams,FlavorService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.contactData = {
    first_name:$stateParams.first_name,
    last_name:$stateParams.last_name,
    phone_number:$stateParams.phone_number
  };

  $scope.init = function() {
    FlavorService.getAllFlavors().then(function(res){
      $scope.flavors = res;
      console.log('res',res);
    })
  }



});

