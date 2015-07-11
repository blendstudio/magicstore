(function() {

  angular.module('store').controller('ProductsController', ['$scope', '$http', '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll) {

    $scope.selected = {};
    $scope.sort = {};

    $scope.showAdvancedOptions = false;

    $scope.random = false;
    $scope.getAvaibleOnly = true;

    // pagination variables
    $scope.items = 10;
    $scope.page = 1;
    $scope.lastPage = 1;

    $scope.query = '';

    $scope.setProductsCollection = function(data, skip, limit) {
      $scope.products = data.products;
      $scope.count = data.count;
      $scope.page = 1 + skip / limit;
      $scope.lastPage = Math.ceil($scope.count / limit);

      // clear selected items, sort methods
      $scope.selected = {};
      $scope.sort = {};

      _.forEach($scope.products, function(product) {
        if (product.stock.length) {
          $scope.setSelectedProdutcItem(product);

          product.stock = _.chain(product.stock)
                           .sortByAll(['discount', 'quantity'], _.values)
                           .value()
                           .reverse();
        }
      });
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
          $scope.setProductsCollection(data, skip, $scope.items);
          $location.hash('product-list-top');
          $anchorScroll();
          $location.hash('');
        });
    };

    $scope.paginate = function(operation) {
      switch (operation) {
        case '+':
          if ($scope.page < $scope.lastPage)
            $scope.page++;
          break;

        case '-':
          if ($scope.page > 1)
            $scope.page--;
          break;

        case 'first':
          $scope.page = 1;
          break;

        case 'last':
          $scope.page = $scope.lastPage;
          break;
      }

      $scope.search($scope.query);
    }

    // retrieve data
    $scope.search('');

    $scope.sortStock = function(product, field) {

      product.stock = _.sortBy(product.stock, field);

      if (!$scope.sort[product.searchName + product.id]) {
        $scope.sort[product.searchName + product.id] = {};
      }

      switch ($scope.sort[product.searchName + product.id][field]) {

        case 'asc':
          $scope.sort[product.searchName + product.id][field] = 'desc';
          break;

        case 'desc':
          $scope.sort[product.searchName + product.id][field] = 'asc';
          break;

        default:
          // clear sort for product for others fields
          $scope.sort[product.searchName + product.id] = {};
          $scope.sort[product.searchName + product.id][field] = 'asc';
          break;
      }

      if ($scope.sort[product.searchName + product.id][field] === 'desc') {
        product.stock = product.stock.reverse();
      }
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

      // if no items are avaible, return one
      if (!items.length) {
        item = $scope.selected[product.searchName + product.id] = product.stock[0];
        return item;
      }

      itemsWithDiscount = _.filter(items, function(item) {
        return item.discount > 0;
      });

      // select discounted item
      if (itemsWithDiscount.length) {
        item = $scope.selected[product.searchName + product.id] = itemsWithDiscount[0];
        return item;
      }

      // return an avaible item
      item = $scope.selected[product.searchName + product.id] = items[0];
      return $scope.selected[product.searchName + product.id] = items[0];
    };

    $scope.isSelected = function(product, item) {
      if ($scope.selected[product.searchName + product.id] === item) {
        return true;
      }

      return false;
    };

    $scope.getDisplayMode = function() {
      if ($scope.item === 1) {
        return 'show-one';
      }

      return '';
    };

    $scope.hasDiscount = function(product) {
      var item = $scope.selected[product.searchName + product.id];

      if (item && item.discount) {
        return true;
      }

      return false;
    };

  }]);

})();
