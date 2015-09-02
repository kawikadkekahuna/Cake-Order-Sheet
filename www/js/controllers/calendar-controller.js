angular.module('starter')

.controller('CalendarController', function($scope,$ionicHistory,uiCalendarConfig,$compile) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  ionic.Platform.ready(function(){
      $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }}
  });
  
  $scope.eventSource = [];

  // $scope.$on('$ionicView.enter', function(e) {
  //   $ionicHistory.clearHistory();
  // });
  

});
