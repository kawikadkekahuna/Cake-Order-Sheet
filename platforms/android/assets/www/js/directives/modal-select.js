angular.module('starter')
  .directive('modalSelect', function($ionicModal) {
    return {
      restrict: 'E',
      templateUrl: 'templates/order-form-select-template.html',
      controller: 'OrderFormController as modalSelect',
      require: 'ngModel',
      scope: {
        'items': '=',
        'multiSelect': '=',
      },
      link: function(scope, element, attrs, ngModel) {

        console.log(scope.items);
        scope.headerText = attrs.headertext;
        $ionicModal.fromTemplateUrl('templates/order-form-select-modal.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.modal = modal;
        });

        scope.openModal = function() {
          scope.modal.show();
        };
        scope.closeModal = function() {
          scope.modal.hide();
        };

        scope.select = function() {
          if (attrs.multiselect) {
            console.log('true');
            scope.multiSelect();
          } else {
            scope.closeModal();
          }
        }

        scope.attachToModel = function(item) {
          console.log('item', item);
          ngModel.$setViewValue(item.text);
          scope.headerText = item.text;
          scope.closeModal();
        }

        scope.multiSelect = function() {
          var icecreamFlavors = '';
          jQuery.each(scope.items, function(index, item) {
            if (item.checked) {
              icecreamFlavors += (item.text + ' ,');
              scope.attachToModel({
                text: icecreamFlavors
              });
              scope.closeModal();
            };
          });

        }
      }
    }
  });