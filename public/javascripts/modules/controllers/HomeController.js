(function() {
  
  angular.module('store').controller('HomeController', ['$scope', '$http', function($scope, $http) {

    $scope.account = {};

    $scope.signIn = function() {
      console.log($scope.account);
    };

    $scope.register = function() {
      console.log($scope.account);
    };

  }]);
  
})();
