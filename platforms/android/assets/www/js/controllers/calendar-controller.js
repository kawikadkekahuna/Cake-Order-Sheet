angular.module('starter')

.controller('CalendarController', function($scope,$ionicHistory) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

	$scope.$on('$ionicView.enter', function(e) {
		$ionicHistory.clearHistory();
	});
	

});
