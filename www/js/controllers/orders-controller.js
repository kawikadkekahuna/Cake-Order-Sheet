angular.module('starter')

.controller('OrdersController', function($scope, OrderService, $state,$ionicHistory, $localStorage, OrderService) {
	var CURRENT_STATE = 'nav.orders';

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	$scope.$on('$ionicView.enter', function(e) {
		$ionicHistory.clearHistory();
	});


	$scope.upcomingOrders = $localStorage.allOrders;

	$scope.showOrder = function(order_number) {
		$state.go('nav.single', {
			order_number: order_number,
			previous_view: CURRENT_STATE
		});
	}

	$scope.updateOrders = function() {
		OrderService.getAllOrders().then(function(orders) {
			delete($localStorage.allOrders);
			console.log('orders.data',orders.data);
			$localStorage.allOrders = orders.data;
		});
	}

	$scope.completeOrder = function(id) {
		OrderService.completeOrder(id).then(function(order) {
			var order = $localStorage.allOrders.filter(function(element) {
				return element.id == id
			})[0];
			order.completed = true;
		});
	}

	$scope.doRefresh = function() {
		OrderService.getAllOrders().then(function(orders) {
			$localStorage.allOrders = orders.data;
			$scope.upcomingOrders = $localStorage.allOrders
			$scope.$broadcast('scroll.refreshComplete');
		})
	}

});