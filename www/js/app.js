// SERVER ='http://localhost:3000';
// SERVER = 'http://192.168.29.205:3000';
SERVER = 'http://192.168.1.117:3000';
/*Mobile HotSpot IP*/
// SERVER = 'http://192.168.29.127:3000';

angular.module('starter', ['ionic', 'ngStorage','ionic-timepicker','ionic-datepicker','ui.calendar','ui.bootstrap'])

.run(function($ionicPlatform, $ionicHistory, $localStorage, FlavorService, OrderService, CakeService) {
  $ionicPlatform.registerBackButtonAction(function(event) {
    event.stopPropagation();
    $ionicHistory.goBack();
  }, 100);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $provide) {

  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
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
    params:{
      orderData:null
    },
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
      order_number: null
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

  $urlRouterProvider.otherwise('/nav/order-form');

});