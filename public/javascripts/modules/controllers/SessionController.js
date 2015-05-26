(function() {

  angular.module('store').controller('SessionController', ['$scope', '$http', '$state', '$cookies', function($scope, $http, $state, $cookies) {

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
      $state.go('cards');
    });

    // redirect to default page if signed in
    $scope.$on('$stateChangeSuccess', function() {
      if ($state.current.name === 'home' && $scope.isSignedIn()) {
        // TODO: change to real one
        $state.go('cards');
      }
    });

    $scope.toHome = function() {
      if ($state.current.name !== 'home') {
        $state.go('home');
      }
    };

    $scope.signOut = function() {

      // clear session
      $scope.email = null;
      delete $cookies.email;

      // redirect to home
      $state.go('home');

    };

  }]);

})();
