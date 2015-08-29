angular.module('starter')

.controller('DashController', function($scope, $ionicHistory,$state, $localStorage, OrderService, FlavorService, CakeService) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	//
	ionic.Platform.ready(function(){
		var date = new Date();
		var numberOfDaysToAdd = 6;
		$scope.upcomingOrders = $localStorage.allOrders;
		date.setDate(date.getDate() + numberOfDaysToAdd);
		$scope.date = date.getTime().toString();
		
	});

	$scope.$on('$ionicView.enter', function(e) {
		$ionicHistory.clearHistory();
	});



	$scope.showOrder = function(order_number) {
		$state.go('nav.single', {
			order_number: order_number
		});
	}



});