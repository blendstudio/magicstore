(function() {

  angular.module('store').controller('SessionController', ['$scope', '$http', '$location', '$state', '$cookies', function($scope, $http, $location, $state, $cookies) {
    
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
    
    // redirect to default page if signed in
    $scope.$on('$stateChangeSuccess', function() {
      if ($state.current.name === 'home' && $scope.isSignedIn()) {
        // TODO: change to real one
        $location.path('cards');
      }
    });
    
  }]);
  
})();