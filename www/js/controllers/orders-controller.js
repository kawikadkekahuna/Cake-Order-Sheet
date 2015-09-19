angular.module('starter')

.controller('OrdersController', function($scope, $state, $ionicHistory, $localStorage,  $ionicPopup, $timeout,$ionicBackdrop, OrderService,StatusService,OrderService) {
	var CURRENT_STATE = 'nav.orders';

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:

	ionic.Platform.ready(function() {
		$scope.$on('$ionicView.enter', function(e) {
			$ionicHistory.clearHistory();
			$scope.editOptions = StatusService.getOptions();
		
		});

		$scope.upcomingOrders = $localStorage.allOrders;
		console.log($scope.upcomingOrders);		
		$scope.showOrder = function(order_number) {
			$state.go('nav.single', {
				order_number: order_number,
				previous_view: CURRENT_STATE
			});
		}

		$scope.updateOrders = function() {
			OrderService.getAllOrders().then(function(orders) {
				delete($localStorage.allOrders);
				console.log('orders.data', orders.data);
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
	//

});