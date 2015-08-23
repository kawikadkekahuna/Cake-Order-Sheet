angular.module('starter')

.controller('DashController', function($scope, OrderService,FlavorService, $localStorage) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	$scope.init = function() {
		OrderService.getAllOrders().then(function(orders) {
			delete($localStorage.allOrders);
			$localStorage.allOrders = orders.data;
			alert('orders set');
		});

		FlavorService.getAllFlavors().then(function(flavors){
			delete($localStorage.allFlavors);
			$localStorage.allFlavors = flavors.data;
			alert('flavors set');
			alert($localStorage.allFlavors);
		})
		$localStorage.createOrder = {};
	}


});