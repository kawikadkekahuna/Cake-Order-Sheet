SERVER = 'http://192.168.1.117:3000';
// SERVER ='http://localhost:3000';
/*Mobile HotSpot IP*/
// SERVER = 'http://192.168.43.172:3000';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ionic-timepicker'])

.run(function($ionicPlatform, $ionicHistory, $localStorage, FlavorService, OrderService, CakeService) {
  $ionicPlatform.registerBackButtonAction(function(event) {
    event.stopPropagation();
    alert('propagation stopped');
    $ionicHistory.goBack();
  }, 100);
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    OrderService.getAllOrders().then(function(orders) {
      $localStorage.allOrders = orders.data;
    });

    FlavorService.getAllFlavors().then(function(iceCreamFlavors) {
      $localStorage.iceCreamFlavors = iceCreamFlavors.data;
    });
    CakeService.getAllFlavors().then(function(cakeFlavors) {
      $localStorage.cakeFlavors = cakeFlavors.data;
    });
    CakeService.getAllSizes().then(function(cakeSizes) {
      $localStorage.cakeSizes = cakeSizes.data;
    })

    $localStorage.createOrder = {};
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $provide) {
  //improves android functionality
  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }
  $provide.decorator('$state', function($delegate, $stateParams) {
    $delegate.forceReload = function() {
      return $delegate.go($delegate.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
    };
    return $delegate;
  });
  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the navs directive


    .state('nav', {
    url: '/nav',
    abstract: true,
    templateUrl: 'templates/navigation-bar.html',
    controller: 'MainController'
  })

  .state('nav.dash', {
    url: '/dash',
    views: {
      'nav-dash': {
        templateUrl: 'templates/nav-dash.html',
        controller: 'DashController'
      }
    }
  })

  .state('nav.completed', {
    url: '/completed',
    views: {
      'nav-completed': {
        templateUrl: 'templates/nav-completed.html',
        controller: 'CompletedController'
      }
    }
  })

  .state('nav.orders', {
    url: '/orders',
    views: {
      'nav-orders': {
        templateUrl: 'templates/nav-orders.html',
        controller: 'OrdersController'
      }
    }
  })

  .state('nav.edit-order', {
    url: '/edit-order',
    views: {
      'nav-orders': {
        templateUrl: 'templates/nav-edit-order.html',
        controller: 'EditOrderController'
      }
    }
  })

  .state('nav.order-form', {
    url: '/order-form',
    cache: false,
    params: {
      first_name: null,
      last_name: null,
      phone_number: null
    },
    views: {
      'nav-orders': {
        templateUrl: 'templates/nav-order-form.html',
        controller: 'OrderFormController'
      }
    }
  })

  .state('nav.contact-form', {
    url: '/contact-form',
    cache: false,
    views: {
      'nav-orders': {
        templateUrl: 'templates/nav-contact-form.html',
        controller: 'ContactFormController'
      }
    }
  })

  .state('nav.select-flavors', {
    url: '/select-flavors',
    cache: false,
    views: {
      'nav-orders': {
        templateUrl: 'templates/select-flavors.html',
        controller: 'SelectFlavorsController'
      }
    }
  })

  .state('nav.single', {
    url: '/single',
    params: {
      order_number: null,
      previous_view: null
    },
    views: {
      'nav-orders': {
        templateUrl: 'templates/single-order.html',
        controller: 'SingleOrderController'
      }
    }
  })

  .state('nav.calendar', {
    url: '/calendar',
    views: {
      'nav-calendar': {
        templateUrl: 'templates/nav-calendar.html',
        controller: 'CalendarController'
      }
    }
  });

  $urlRouterProvider.otherwise('/nav/dash');

});