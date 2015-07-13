(function() {

  angular.module('store').controller('SessionController', ['SessionService', '$scope', '$rootScope', '$http', '$state', '$cookies', function(SessionService, $scope, $rootScope, $http, $state, $cookies) {

    $scope.sid = $cookies.sid;

    var createSession = function() {
      if (!$scope.sid) {
        SessionService.create().then(function (data) {
          $scope.sid = data._id;
          $cookies.sid = data._id;
        });
      }
    };

    $scope.isSignedIn = function() {
      if ($scope.email) {
        return true;
      }
      return false;
    };

    $scope.$on('user signed in', function(event, profile) {
      createSession();

      SessionService.createProfile($scope.sid, profile);

      var profile = SessionService.getProfile();
      $scope.email = profile.email;
      $scope.username = profile.username;
      $scope.avatar = profile.avatar;

      $state.go('products');
    });

    $scope.$on('$stateChangeSuccess', function() {
      createSession();

      // $scope.loadProfile();
      SessionService.loadProfile($scope.sid).then(function (response) {
        if (response) {
          $scope.email = response.profiles[0].email;
          $scope.username = response.profiles[0].username;
          $scope.avatar = response.profiles[0].avatar;
        }
      });

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
      delete $cookies['sid'];

      $scope.email = null;
      $scope.username = null;
      $scope.avatar = null;

      createSession();

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
