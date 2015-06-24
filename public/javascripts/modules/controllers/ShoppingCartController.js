(function() {

  angular.module('store').controller('ShoppingCartController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    $scope.modal = false;

    $scope.$on('show shopping cart modal', function() {
      $scope.modal = true;
    });

    $scope.closeModal = function() {
      $scope.modal = false;
    };

  }]);

})();
