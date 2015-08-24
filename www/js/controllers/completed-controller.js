angular.module('starter')

.controller('CompletedController', function($scope, $localStorage, $state, OrderService,$ionicHistory) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	$scope.$on('$ionicView.enter', function(e) {
		$ionicHistory.clearHistory();
	});

	var CURRENT_STATE = 'nav.completed';
	$scope.$on('$ionicView.enter', function(e) {
		$scope.completedOrders = $localStorage.allOrders.filter(function(element) {
			return element.completed == true;
		});
	});

	$scope.showOrder = function(order_number) {
		$state.go('nav.single', {
			order_number: order_number,
			previous_view: CURRENT_STATE
		});
	}

	$scope.incompleteOrder = function(id) {

		OrderService.incompleteOrder(id).then(function(order) {
			var order = $localStorage.allOrders.filter(function(element) {
				return element.id == id
			})[0];
			order.completed = false;
		});

	}


});