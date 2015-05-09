(function() {
  
  var app = angular.module('store', []);

  app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    
    var data = {};
    
    // pagination
    $scope.items = 10;
    $scope.page = 1;
    $scope.lastPage = 1;
    
    // retrieve data
    $http.get('/api/cards', { cache: true })
      .success(function(data) {
        $scope.cardsdb = data;
        $scope.setCardsCollection();
      });
    
    $scope.chunks = function(data, n) {
      return _.chunk(data, n);
    };
    
    $scope.setCardsCollection = function() {
      $scope.cards = $scope.chunks($scope.cardsdb, $scope.items);
      $scope.lastPage = $scope.cards.length;
    };
    
    // search bar
    $scope.search = function(query) {
      if (!query) {
        $scope.setCardsCollection();
      } else {
        
      }
    };
    
  }]);


  app.controller('LoginController', ['$scope', '$http', function($scope, $http) {

    $scope.user = {};

    this.signIn = function() {
      console.log($scope.user);
      $scope.user = {};
    };

    this.register = function() {
      console.log($scope.user);
      $scope.user = {};
    };

  }]);

})();
