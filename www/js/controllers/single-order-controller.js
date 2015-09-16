angular.module('starter')

.controller('SingleOrderController', function($scope, $state, $localStorage, $stateParams,$ionicHistory) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:


	$scope.$on('$ionicView.enter', function(e) {
		$scope.orderData = $localStorage.allOrders.filter(function(element, index, array) {
			return element.id === $stateParams.order_number;
		})[0];
		if($scope.orderData.paid_status){
			$scope.paid_status_text = "Paid"
		}else{
			$scope.paid_status_text = "Not Paid"
		}
		console.log($scope.orderData);
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