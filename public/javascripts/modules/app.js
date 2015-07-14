(function() {

  var app = angular.module('store', ['ui.router', 'ngCookies', 'ngMessages', 'angular-md5']);

  app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {

    // unknown urls go to /
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/states/home.jade'
    })
    .state('products', {
       url: '/produtos',
      templateUrl: '/states/products.jade'
    })
    .state('profile', {
       url: '/perfil',
      templateUrl: '/states/profile.jade'
    })
    .state('shopping cart', {
       url: '/carrinho',
      templateUrl: '/states/cart.jade'
    })
    .state('administration', {
       url: '/admin',
      templateUrl: '/states/admin.jade'
    });

  }]);

})();
