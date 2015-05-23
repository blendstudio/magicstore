(function() {

  angular.module('store').controller('CardsController', ['$scope', '$http', '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll) {
    
    var data = {};
    
    $scope.selected = {};
    
    $scope.random = false;
    
    // pagination
    $scope.items = 10;
    $scope.page = 1;
    $scope.lastPage = 1;
    
    $scope.query = '';
    
    $scope.setSelectedCardItem = function(card, item) {
      $scope.selected[card.searchName + card.id] = item;
    };
    
    $scope.setCardsCollection = function(data, skip, limit) {
      $scope.cards = data.cards;
      $scope.count = data.count;
      $scope.page = 1 + skip / limit;
      $scope.lastPage = Math.ceil($scope.count / limit);
      
      for (var i = 0; i < $scope.cards.length; i++) {
        if ($scope.cards[i].stock.length) {
          for (var j = 0; j < $scope.cards[i].stock.length; j++) {
            if ($scope.cards[i].stock[j].quantity > 0) {
              $scope.setSelectedCardItem($scope.cards[i], $scope.cards[i].stock[j]);
              break;
            }
          }
        }
      }
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
          $location.hash('product-list-top');
          $anchorScroll();
        });
    };
    
    // retrieve data
    $scope.search('', ($scope.page - 1) * $scope.items, $scope.items, $scope.random);
    
  }]);
  
})();
