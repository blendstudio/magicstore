(function() {

  var app = angular.module('store', ['angular-md5', 'ngCookies', 'ngStorage', 'ui-notification', 'ui.router']);

  app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider

    /*
     * home
     */
    .state('home', {
      url: '/',
      templateUrl: '/states/home.jade'
    })

    /*
     * products
     */
    .state('products', {
      url: '/produtos',
      templateUrl: '/states/products.jade'
    })

    .state('products.mtg', {
      url: '/mtg',
      templateUrl: '/states/products.jade'
    })
    .state('products.mtg.item', {
      url: '/:item',
      templateUrl: '/states/products.jade'
    })

    .state('products.accessories', {
      url: '/acessorios',
      templateUrl: '/states/products.jade'
    })
    .state('products.accessories.item', {
      url: '/:item',
      templateUrl: '/states/products.jade'
    })
    .state('products.accessories.category', {
      url: '/:category',
      templateUrl: '/states/products.jade'
    })
    .state('products.accessories.category.item', {
      url: '/:item',
      templateUrl: '/states/products.jade'
    })

    .state('products.others', {
      url: '/:link',
      templateUrl: '/states/products.jade'
    })

    /*
     * contact
     */
    .state('contact', {
      url: '/contato',
      templateUrl: '/states/contact.jade'
    })

    /*
     * profile
     */
    .state('profile', {
      url: '/perfil',
      templateUrl: '/states/profile.jade'
    })

    /*
     * administration
     */
    .state('administration', {
      url: '/admin',
      templateUrl: '/states/admin.jade'
    })
    .state('administration.start', {
      url: '/start',
      templateUrl: '/states/admin.jade'
    })
    .state('administration.resources', {
      url: '/:resource',
      templateUrl: '/states/admin.jade'
    })
    .state('administration.resources.option', {
      url: '/:option',
      templateUrl: '/states/admin.jade'
    })

    ;

    // unknown states go to home
    $urlRouterProvider.otherwise('/');

  }]);

})();
