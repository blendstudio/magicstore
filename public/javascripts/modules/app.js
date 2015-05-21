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
    .state('cards', {
       url: '/cards',
      templateUrl: '/states/cards.jade'
    });
  }]);

})();
