angular.module('starter')

.controller('CalendarController', function($scope, $ionicHistory, uiCalendarConfig, CalendarService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var date = new Date();
  var year = date.getFullYear();
  var day = date.getDate();
  var month = date.getMonth();

  ionic.Platform.ready(function() {

    $scope.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        header: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    }
  });

  $scope.eventSources = [{
    events: CalendarService.getMonthlyEvents(),
    color: 'yellow', // an option!
    textColor: 'black' // an option!

  }];

  console.log('$scope.eventSources',$scope.eventSources);

  $scope.$on('$ionicView.enter', function(e) {
    $ionicHistory.clearHistory();

  });
});