(function() {
  
  angular.module('store').controller('HomeController', ['$scope', '$http', function($scope, $http) {

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
