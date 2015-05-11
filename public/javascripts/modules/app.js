(function() {
  
  var app = angular.module('store', []);

  app.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    
    var data = {};
    
    $scope.random = false;
    
    // pagination
    $scope.items = 6  ;
    $scope.page = 1;
    $scope.lastPage = 1;
    
    $scope.query = '';
    
    $scope.setCardsCollection = function(data, skip, limit) {
      $scope.cards = data.cards;
      $scope.count = data.count;
      $scope.page = 1 + skip / limit;
      $scope.lastPage = Math.ceil($scope.count / limit);
    };
    
    // search bar
    $scope.search = function(query, skip, limit, random) {
      $http.get('/api/cards', {
          cache: true,
          params: {
            random: random,
            search: query,
            skip: skip,
            limit: limit,
          },
      }).success(function(data) {
          $scope.setCardsCollection(data, skip, limit);
        });
    };
    
    // retrieve data
    $scope.search('', ($scope.page - 1) * $scope.items, $scope.items, $scope.random);
    
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

//skip: ($scope.page - 1) * $scope.items,