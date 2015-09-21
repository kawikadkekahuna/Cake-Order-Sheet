angular.module('starter')

.controller('OrdersController', function($scope, $state, $ionicHistory, $localStorage, $ionicPopup, $timeout, $ionicBackdrop, OrderService, StatusService) {
	$scope.$on('$ionicView.enter', function(e) {
		$ionicHistory.clearHistory();
	});


	$scope.editOptions = StatusService.getOptions();
	$scope.allOrders = $localStorage.allOrders;

	$scope.showOrder = function(order_number) {
		$state.go('nav.single', {
			order_number: order_number
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
			delete($localStorage.allOrders);
			$localStorage.allOrders = orders.data;
			$scope.allOrders = $localStorage.allOrders
			$scope.$broadcast('scroll.refreshComplete');
		})
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

	$scope.showLegend = function() {
		statusPopup.close();
		var legendPopup = $ionicPopup.show({
			templateUrl: 'templates/nav-legend.html',
			title: 'Legend',
			scope: $scope,
			buttons: [{
				text: 'Cancel',
				onTap: function(e) {
					/*Hacky way to nest $ionicPopups.  Without removing popupcontainer, 
					ionicbackdrop does not nicely remove the preexisting popup */
					e.stopPropagation();
					e.preventDefault();
					$ionicBackdrop.release();
					legendPopup.close();
					jQuery('.popup-container').remove();
				}
			}]
		});
	}

});