(function() {

  angular.module('store').controller('SessionController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
    
    $scope.email = $cookies.email;
    
    $scope.$on('account signed in', function(event, account) {
      $scope.email = $cookies.email = account.email;
    });
    
    $scope.isSignedIn = function() {
      if ($cookies.email) {
        return true;
      }
      return false;
    };
    
  }]);
  
})();