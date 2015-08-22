angular.module('starter').directive('standardTimeMeridian', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      etime: '=etime'
    },
    template: "<strong>{{stime}}</strong>",
    link: function(scope, elem, attrs) {

      scope.stime = epochParser(scope.etime, 'time');

      function prependZero(param) {
        if (String(param).length < 2) {
          return "0" + String(param);
        }
        return param;
      }

      function epochParser(val, opType) {
        if (val === null) {
          return "00:00";
        } else {
          var meridian = ['AM', 'PM'];

          if (opType === 'time') {
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;
            var hoursRes = hours > 12 ? (hours - 12) : hours;

            var currentMeridian = meridian[parseInt(hours / 12)];

            return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
          }
        }
      }

      scope.$watch('etime', function(newValue, oldValue) {
        scope.stime = epochParser(scope.etime, 'time');
      });

    }
  };
})

.controller('OrderFormController', function($scope, $stateParams, FlavorService, $localStorage) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // $scope.cakeSelections = [{}.{}];
  $scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60), //Optional
    step: 15, //Optional
    format: 12, //Optional
    titleLabel: '12-hour Format', //Optional
    setLabel: 'Set', //Optional
    closeLabel: 'Close', //Optional
    setButtonType: 'button-positive', //Optional
    closeButtonType: 'button-stable', //Optional
    callback: function(val) { //Mandatory
      timePickerCallback(val);
    }
  };

function timePickerCallback(val) {
  if (typeof (val) === 'undefined') {
    console.log('Time not selected');
  } else {
    var selectedTime = new Date(val * 1000);
    $scope.timePickerObject.inputEpochTime = val;
    console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
  }
}

  $scope.cakeText = 'Cake'
  $scope.cakeFlavors = [{
    id: 1,
    text: 'White',
    checked: false,
    icon: false
  }, {
    id: 2,
    text: 'Chocolate',
    checked: false,
    icon: false
  }, {
    id: 3,
    text: 'Fudge Crunch',
    checked: false,
    icon: false
  }]

  $scope.flavors = $localStorage.allFlavors;
  $scope.flavorText = 'Flavors'
  $scope.val = {
    single: null,
    multiple: null
  };
  $scope.contactData = {
    first_name: $stateParams.first_name,
    last_name: $stateParams.last_name,
    phone_number: $stateParams.phone_number
  };



});