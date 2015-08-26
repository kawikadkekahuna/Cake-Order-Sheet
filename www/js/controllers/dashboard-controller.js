angular.module('starter')

.controller('DashController', function($scope, $ionicHistory, OrderService, FlavorService, CakeService, $localStorage) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	//
	
	$scope.upcomingOrders = $localStorage.allOrders;
	
	$scope.now = Date.now();

	
	$scope.$on('$ionicView.enter', function(e) {
		$ionicHistory.clearHistory();
	});

	$scope.showOrders = function(){

	}



});