angular.module('starter')

.controller('DashController', function($scope, $ionicPlatform, $ionicHistory, $state, $localStorage, OrderService, FlavorService, CakeService) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	//
	ionic.Platform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		OrderService.getAllOrders().then(function(orders) {
			$localStorage.allOrders = orders.data;
			$scope.upcomingOrders = orders.data;
		});

		FlavorService.getAllFlavors().then(function(iceCreamFlavors) {
			$localStorage.iceCreamFlavors = iceCreamFlavors.data;
		});
		CakeService.getAllFlavors().then(function(cakeFlavors) {
			$localStorage.cakeFlavors = cakeFlavors.data;
		});
		CakeService.getAllSizes().then(function(cakeSizes) {
			$localStorage.cakeSizes = cakeSizes.data;
		})

		$localStorage.createOrder = {};
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
f		}
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