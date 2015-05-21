(function() {

  angular.module('store').controller('SessionController', ['$scope', '$http', '$location', '$state', '$cookies', function($scope, $http, $location, $state, $cookies) {
    
    $scope.email = $cookies.email;
    
    $scope.isSignedIn = function() {
      if ($cookies.email) {
        return true;
      }
      return false;
    };
    
    $scope.$on('account signed in', function(event, account) {
      $scope.email = $cookies.email = account.email;
      $location.path('cards');
    });
    
    // redirect to default page if signed in
    $scope.$on('$stateChangeSuccess', function() {
      if ($state.current.name === 'home' && $scope.isSignedIn()) {
        // TODO: change to real one
        $location.path('cards');
      }
    });
    
    $scope.toHome = function() {
      if ($state.current.name !== 'home') {
        $location.path('home');
      }
    };
    
    $scope.signOut = function() {
      
      // clear session
      $scope.email = null;
      delete $cookies.email;
      
      // redirect to home
      $location.path('home');
      
    };
    
  }]);
  
})();