angular.module('starter')

.controller('CompletedController', function($scope, $localStorage, $state, OrderService, $ionicHistory, $cacheFactory) {

	$scope.$on('$ionicView.enter', function(e) {
		$ionicHistory.clearHistory();
	});

	$scope.completedOrders = $localStorage.allOrders;

	$scope.showOrder = function(order_number) {
		$state.go('nav.single', {
			order_number: order_number
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