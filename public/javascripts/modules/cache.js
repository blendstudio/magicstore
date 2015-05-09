(function() {
  
  var module = angular.module('cache', []);
  
  module.factory('cache', ['$http', '$cacheFactory', function($http, $cacheFactory) {
    var cache = $cacheFactory('cards');
    
    cache.cards = function() {
        return cache.get('cards');
    };
    
    return cache;
  }]);
  
})();