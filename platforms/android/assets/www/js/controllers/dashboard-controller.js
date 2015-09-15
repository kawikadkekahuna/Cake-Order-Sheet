angular.module('starter')

.controller('DashController', function($scope, $ionicPlatform, $ionicHistory, $state, $localStorage, $ionicPopup, $timeout, OrderService, FlavorService, CakeService, StatusService) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	//
	ionic.Platform.ready(function() {
		var statusPopup;
		var legendPopup;

		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		OrderService.getAllOrders().then(function(orders) {
			$localStorage.allOrders = orders.data;
			$scope.upcomingOrders = orders.data;
		});

		OrderService.getMessageColors().then(function(colors) {
			$localStorage.messageColors = colors.data;
		});

		OrderService.getPresetMessages().then(function(messages) {
			$localStorage.presetMessages = messages.data;
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

		$localStorage.quantityAmount = [{
			text: '1',
			checked: false,
			icon: false
		}, {
			text: '2',
			checked: false,
			icon: false
		}, {
			text: '3',
			checked: false,
			icon: false
		}, ];
		$localStorage.createOrder = {};
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
			f
		}
		$scope.editOptions = StatusService.getOptions();

	});

	$scope.$on('$ionicView.enter', function(e) {
		$ionicHistory.clearHistory();
		/*$scope.gate is to fix android rendering issues with $ionicPopup*/
		$scope.gate = true;
	});



	$scope.showOrder = function(event, order_number) {
		if ($scope.gate) {
			$state.go('nav.single', {
				order_number: order_number
			});
		}
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

			StatusService.updateStatus(id, name).then(function(res) {
				var order = $scope.upcomingOrders.filter(function(element) {
					return element.id === id
				})[0];
				order.cake_status = name;
				statusPopup.close();
				$scope.gate = true;
			});
		}

	};

	$scope.showLegend = function(){
		statusPopup.close();
		legendPopup = $ionicPopup.show({
			templateUrl:'templates/nav-legend.html',
			title:'Legend',
			scope:$scope,
			buttons:[{
				text:'Cancel'
			}]
		});	
	}


});