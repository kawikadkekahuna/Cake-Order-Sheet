angular.module('starter')

.controller('OrderFormController', function($scope, $stateParams, FlavorService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.contactData = {
    first_name: $stateParams.first_name,
    last_name: $stateParams.last_name,
    phone_number: $stateParams.phone_number
  };
  
  $scope.countries = [
    {id: 1, text: 'USA', checked: false, icon: null}, 
    {id: 2, text: 'France', checked: false, icon: 'https://www.zeendoc.com/wp-content/themes/zeendoc/img/french_flag_small.jpg'}, 
    {id : 3, text: 'Japan3', checked: true, icon: null}, 
    {id : 4, text: 'Japan4', checked: true, icon: null}, 
    {id : 5, text: 'Japan5', checked: true, icon: null}, 
    {id : 6, text: 'Japan6', checked: true, icon: null}, 
    {id : 7, text: 'Japan7', checked: true, icon: null}, 
    {id : 8, text: 'Japan8', checked: true, icon: null}, 
    {id : 9, text: 'Japan9', checked: true, icon: null}, 
    {id : 10, text: 'Japan10', checked: true, icon: null}, 
    {id : 11, text: 'Japan11', checked: true, icon: null}, 
    {id : 12, text: 'Japan12', checked: true, icon: null}];
  
  $scope.countries_text_single = 'Choose country';
  $scope.countries_text_multiple = 'Choose countries';
  $scope.val =  {single: null, multiple: null};


});