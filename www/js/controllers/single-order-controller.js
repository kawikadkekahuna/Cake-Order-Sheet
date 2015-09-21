angular.module('starter')

.controller('SingleOrderController', function($scope, $state, $localStorage, $stateParams,$ionicHistory) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:

	$scope.$on('$ionicView.enter', function(e) {
		console.log($localStorage.allOrders);
		$scope.orderData = $localStorage.allOrders.filter(function(element, index, array) {
			return element.id === $stateParams.order_number;
		})[0];
		console.log($scope.orderData);
		if($scope.orderData.order_paid){
			$scope.order_paid_text = "Paid"
		}else{
			$scope.order_paid_text = "Not Paid"
		}
	});

	$scope.return = function() {
		$ionicHistory.goBack()
	}

	$scope.editOrder = function(){
		console.log('click');
		$state.go('nav.edit-order',{
			orderData:$scope.orderData
		});
	}

});