angular.module('starter')

.controller('MainController', function($scope,$state,$ionicHistory) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //
 $scope.addOrder = function(){
 	$state.go('nav.contact-form')
 }

 $scope.goBack = function(){
 	console.log('going back');
 	$ionicHistory.goBack();
 }

});
