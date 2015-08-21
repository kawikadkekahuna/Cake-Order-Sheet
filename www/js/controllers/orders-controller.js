angular.module('starter')

.controller('OrdersController', function($scope, OrderService, $state, $localStorage) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	//
	//
	
	OrderService.getAllOrders().then(function(orders) {
		delete($localStorage.allOrders);
		$localStorage.allOrders = orders.data;
	});

	$scope.upcomingOrders = $localStorage.allOrders;

	$scope.showOrder = function(order_number) {
		$state.go('nav.single',{
			order_number: order_number
		});
	}

});