(function() {

  angular.module('store').controller('SessionController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
    
    $scope.account = $cookies.account;
    
    $scope.$on('account signed in', function(event, account) {
      $scope.account = $cookies.account = account.email;
    });
    
    $scope.isSignedIn = function() {
      if ($cookies.account) {
        return true;
      }
      
      return false;
    };
    
  }]);
  
})();