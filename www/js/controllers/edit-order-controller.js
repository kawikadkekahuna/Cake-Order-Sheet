angular.module('starter')
  .directive('editCakeOrder', [
    '$ionicModal',
    '$localStorage',
    '$stateParams',
    function($ionicModal, $localStorage,$stateParams) {
      console.log('$stateParams',$stateParams);
      return {

        /* Only use as <fancy-select> tag */
        restrict: 'E',

        /* Our template */
        templateUrl: 'templates/flavor-select.html',

        /* Attributes to set */
        scope: {

          'flavors': '=',

          'items': '=',
          /* Items list is mandatory */
          'text': '=',
          /* Displayed text is mandatory */
          'value': '=',
          /* Selected value binding is mandatory */
          'callback': '&'
        },

        link: function(scope, element, attrs) {

          /* Default values */
          scope.multiSelect = attrs.multiSelect === 'true' ? true : false;
          scope.allowEmpty = attrs.allowEmpty === 'false' ? false : true;

          /* Header used in ion-header-bar */
          scope.headerText = attrs.headerText || '';

          /* Text displayed on label */
          // scope.text          = attrs.text || '';
          scope.defaultText = scope.text || '';

          /* Notes in the right side of the label */
          scope.noteText = attrs.noteText || '';
          scope.noteImg = attrs.noteImg || '';
          scope.noteImgClass = attrs.noteImgClass || '';

          /* Optionnal callback function */
          // scope.callback = attrs.callback || null;

          /* Instanciate ionic modal view and set params */

          /* Some additionnal notes here : 
           * 
           * In previous version of the directive,
           * we were using attrs.parentSelector
           * to open the modal box within a selector. 
           * 
           * This is handy in particular when opening
           * the "fancy select" from the right pane of
           * a side view. 
           * 
           * But the problem is that I had to edit ionic.bundle.js
           * and the modal component each time ionic team
           * make an update of the FW.
           * 
           * Also, seems that animations do not work 
           * anymore.
           * 
           */
          $ionicModal.fromTemplateUrl(
            'templates/select-flavors.html', {
              'scope': scope
            }
          ).then(function(modal) {
            scope.modal = modal;
          });

          /* Validate selection from header bar */
          scope.validate = function(event) {
            // Construct selected values and selected text
            if (scope.multiSelect == true) {

              // Clear values
              scope.value = '';
              scope.text = '';

              // Loop on items
              jQuery.each(scope.items, function(index, item) {
                if (item.checked) {
                  scope.value = scope.value + item.id + ';';
                  scope.text = scope.text + item.text + ', ';
                }
              });

              // Remove trailing comma
              scope.value = scope.value.substr(0, scope.value.length - 1);
              scope.text = scope.text.substr(0, scope.text.length - 2);
              $localStorage.createOrder.iceCreamFlavors = scope.text;
            }

            // Select first value if not nullable
            if (typeof scope.value == 'undefined' || scope.value == '' || scope.value == null) {
              if (scope.allowEmpty == false) {
                scope.value = scope.items[0].id;
                scope.text = scope.items[0].text;

                // Check for multi select
                scope.items[0].checked = true;
              } else {
                scope.text = scope.defaultText;
              }
            }

            // Hide modal
            scope.hideItems();

            // Execute callback function
            if (typeof scope.callback == 'function') {
              scope.callback(scope.value);
            }
          }

          /* Show list */
          scope.showItems = function(event) {
            event.preventDefault();
            scope.modal.show();
          }

          /* Hide list */
          scope.hideItems = function() {
            scope.modal.hide();
          }

          /* Destroy modal */
          scope.$on('$destroy', function() {
            scope.modal.remove();
          });

          /* Validate single with data */
          scope.validateSingle = function(item) {

            // Set selected text
            scope.text = item.text;

            // Set selected value
            scope.value = item.id;
            // Hide items
            scope.hideItems();

            // Execute callback function
            if (typeof scope.callback == 'function') {
              scope.callback(scope.value);
            }
          }
          scope.setCakeFlavor = function(flavor) {
            scope.text = flavor.text;
            scope.value = flavor.id;
            $localStorage.createOrder.cakeFlavor = flavor.text;
            scope.hideItems();
          }

          scope.setCakeSize = function(size) {
            scope.text = size.text;
            scope.value = size.id;
            $localStorage.createOrder.cakeSize = size.text;
            scope.hideItems();
          }
        }
      };
    }
  ])

.controller('EditOrderController', function($scope, $localStorage, $stateParams) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //
  $scope.formFieldData = {
    cakeFlavorText: $stateParams.orderData.cake_flavor,
    cakeFlavors: $localStorage.cakeFlavors,
    cakeSizeText: $stateParams.orderData.size,
    cakeSizes: $localStorage.cakeSizes,
    flavorText: $stateParams.orderData.icecream_flavors,
    flavors: $localStorage.iceCreamFlavors,

  };

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

  $scope.datepickerObject = {
    titleLabel: 'Title', //Optional
    todayLabel: 'Today', //Optional
    closeLabel: 'Close', //Optional
    setLabel: 'Set', //Optional
    errorMsgLabel: 'Please select time.', //Optional
    setButtonType: 'button-assertive', //Optional
    inputDate: new Date(), //Optional
    mondayFirst: true, //Optional
    templateType: 'popup', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: new Date(2012, 8, 2), //Optional
    to: new Date(2018, 8, 25), //Optional
    callback: function(val) { //Mandatory
      datePickerCallback(val);
    }
  };

  var datePickerCallback = function(val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      $scope.datepickerObject.inputDate = val;
      $scope.pickup_date = val;
    }
  };

  function timePickerCallback(val) {
    if (typeof(val) === 'undefined') {
      return;
    }
    $scope.timePickerObject.inputEpochTime = val;
  }

  $scope.order = $stateParams.orderData;

});