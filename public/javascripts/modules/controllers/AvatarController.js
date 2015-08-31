(function() {

  angular.module('store').controller('AvatarController',
    ['$http', '$window', '$rootScope', '$scope',
    function($http, $window, $rootScope, $scope) {

    $scope.modal = false;

    $scope.$on('show avatar edit modal', function() {
      $scope.modal = true;
    });

    $scope.closeModal = function() {
      $scope.refresh();
      $scope.modal = false;
    };

    $scope.refresh  = function() {
      $window.location.reload();
    };

  }]);

})();
