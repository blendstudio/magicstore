(function() {

  angular.module('store').controller('ProfileController', ['$scope', '$http', '$location', '$anchorScroll', '$cookies', function($scope, $http, $location, $anchorScroll, $cookies) {

    $scope.selected = {};

    $scope.showAdvancedOptions = false;

    $scope.random = false;
    $scope.getAvaibleOnly = true;

    // pagination variables
    $scope.items = 1;
    $scope.page = 1;
    $scope.lastPage = 1;

    $scope.query = '';

    $scope.setCardsCollection = function(data, skip, limit) {
      $scope.cards = data.cards;
      $scope.count = data.count;
      $scope.page = 1 + skip / limit;
      $scope.lastPage = Math.ceil($scope.count / limit);

      // clear selected items
      $scope.selected = {};
    };

    $scope.search = function(query) {

      var search = {};

      if ($scope.getAvaibleOnly) {
        search = {
          stock: { $elemMatch: { quantity: { $gt: 0 } } }
        };
      }

      if (query) {
        search.name = query;
      }

      var skip = ($scope.page - 1) * $scope.items;

      $http.get('/api/cards', {
          cache: true,
          params: {
            random: $scope.random,
            search: search,
            skip: skip,
            limit: $scope.items,
          },
      }).success(function(data) {
          $scope.setCardsCollection(data, skip, $scope.items);
          $location.hash('product-list-top');
          $anchorScroll();
          $location.hash('');
        });
    };

    // retrieve data
    $scope.search('');

    $scope.getDisplayMode = function() {
      if ($scope.item === 1) {
        return 'show-one';
      }

      return '';
    };

    $scope.hasSelectedProdutcItemDiscount = function(product) {
      var item = $scope.selected[product.searchName + product.id];

      if (item && item.discount) {
        return true;
      }

      return false;
    };

    // returns the selected item
    $scope.setSelectedProdutcItem = function(product, item) {

      // if an item as given, set it selected
      if (item) {
        return $scope.selected[product.searchName + product.id] = item;
      }

      var items = [];
      var itemsWithDiscount = [];

      // sort avaible items by discount
      items = _.sortBy(product.stock, 'discount').reverse();
      items = _.filter(items, function(item) {
        return item.quantity > 0;
      });

      if (!items.length) {
        return null;
      }

      itemsWithDiscount = _.filter(items, function(item) {
        return item.discount > 0;
      });

      // select discounted item
      if (itemsWithDiscount.length) {
        return $scope.selected[product.searchName + product.id] = itemsWithDiscount[0];
      }

      // return an avaible item
      return $scope.selected[product.searchName + product.id] = items[0];
    };

    $scope.isProdutcAvaible = function(product) {
      if ($scope.selected[product.searchName + product.id]) {
        return $scope.selected[product.searchName + product.id];
      }

      if (product && product.stock.length > 0) {
        return $scope.setSelectedProdutcItem(product, null);
      }

      return false;
    };

    $scope.isSelected = function(product, item) {
      if ($scope.selected[product.searchName + product.id] === item) {
        return true;
      }

      return false;
    };

  }]);

})();
