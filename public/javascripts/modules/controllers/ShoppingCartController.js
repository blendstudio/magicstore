(function() {

  angular.module('store').controller('ShoppingCartController',
    ['$http', '$rootScope', '$scope',
    function($http, $rootScope, $scope) {

    $scope.modal = false;

    $scope.$on('show shopping cart modal', function() {
      $scope.modal = true;
    });

    $scope.closeModal = function() {
      $scope.modal = false;
    };

  }]);

})();
