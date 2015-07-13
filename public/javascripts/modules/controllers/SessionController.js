(function() {

  angular.module('store').controller('SessionController', ['SessionService', '$scope', '$rootScope', '$http', '$state', '$cookies', function(SessionService, $scope, $rootScope, $http, $state, $cookies) {

    $scope.sid    = $cookies.sid;

    $scope.isSignedIn = function() {
      if ($scope.email) {
        return true;
      }
      return false;
    };

    $scope.$on('user signed in', function(event, profile) {
      var session = SessionService.getSession();
      SessionService.setProfile(session._id, profile);

      SessionService.log();

      var profile = SessionService.getProfile();
      $scope.email = profile.email;
      $scope.username = profile.username;
      $scope.avatar = profile.avatar;

      $state.go('products');
    });

    $scope.$on('$stateChangeSuccess', function() {

      // create session
      if (!$scope.sid) {
        SessionService.create().then(function (data) {
          SessionService.setSession(data);
          $scope.sid = $cookies.sid = data._id;
        });
      }

      // redirect to default page if signed in
      if ($state.current.name === 'home' && $scope.isSignedIn()) {
        // TODO: change to real one
        $state.go('products');
      }
    });

    // TODO: to service
    $scope.navigate = function(path) {
      if ($state.current.name !== path) {
        $state.go(path);
      }
    };

    $scope.signOut = function() {

      // clear session
      $scope.sid = null;
      delete $cookies.sid;

      $scope.email = null;
      $scope.username = null;
      $scope.avatar = null;

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
