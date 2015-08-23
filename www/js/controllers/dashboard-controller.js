angular.module('starter')

.controller('DashController', function($scope, OrderService,FlavorService,CakeService, $localStorage) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	$scope.init = function() {
		delete($localStorage);
		OrderService.getAllOrders().then(function(orders) {
			$localStorage.allOrders = orders.data;
		});

		FlavorService.getAllFlavors().then(function(iceCreamFlavors){
			$localStorage.iceCreamFlavors = iceCreamFlavors.data;
		});
		CakeService.getAllFlavors().then(function(cakeFlavors){
			$localStorage.cakeFlavors = cakeFlavors.data;
		});
		CakeService.getAllSizes().then(function(cakeSizes){
			$localStorage.cakeSizes = cakeSizes.data;
		})

		$localStorage.createOrder = {};
	}


});