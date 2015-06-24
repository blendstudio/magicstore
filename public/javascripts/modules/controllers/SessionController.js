(function() {

  angular.module('store').controller('SessionController', ['$scope', '$rootScope', '$http', '$state', '$cookies', function($scope, $rootScope, $http, $state, $cookies) {

    $scope.avatar = $cookies.avatar;
    $scope.email = $cookies.email;
    $scope.username = $cookies.username;

    $scope.isSignedIn = function() {
      if ($cookies.email) {
        return true;
      }
      return false;
    };

    $scope.$on('user signed in', function(event, profile) {
      $scope.avatar = $cookies.avatar = profile.avatar;
      $scope.email = $cookies.email = profile.email;
      $scope.username = $cookies.username = profile.username;
      $state.go('products');
    });

    // redirect to default page if signed in
    $scope.$on('$stateChangeSuccess', function() {
      if ($state.current.name === 'home' && $scope.isSignedIn()) {
        // TODO: change to real one
        $state.go('products');
      }
    });

    $scope.navigate = function(path) {
      if ($state.current.name !== path) {
        $state.go(path);
      }
    };

    $scope.signOut = function() {

      // clear session
      $scope.avatar = null;
      $scope.email = null;
      $scope.username = null;
      delete $cookies.avatar;
      delete $cookies.email;
      delete $cookies.username;

      // redirect to home
      $state.go('home');

    };

    $scope.showModal = function(modal) {
      switch (modal) {
        case 'UserForm':
          $rootScope.$broadcast('show user form modal');
          break;
        case 'ShoppingCart':
          $rootScope.$broadcast('show shopping cart modal');
          break;
      }
    };

  }]);

})();
