(function() {

  angular.module('store').controller('SessionController',
    ['SessionService', '$cookies', '$http', '$rootScope', '$scope', '$state',
    function(SessionService, $cookies, $http, $rootScope, $scope, $state) {

    // controller states
    $scope.signedIn = false;
    $scope.sid      = $cookies.get('sid');

    // load profile to scope to show username and avatar on view
    var loadProfileToScope = function() {
      SessionService.loadProfile($scope.sid).then(function (response) {
        if (response) {
          // set signed in flag to true
          $scope.signedIn = true;

          // load profile information to scope
          $scope.email = response.values[0].email;
          $scope.username = response.values[0].username;
          $scope.avatar = response.values[0].avatar;
        }
      });
    };


    $scope.isSignedIn = function() {
      return $scope.signedIn;
    };

    // create new session
    var createSession = function() {
      if (!$scope.sid) {
        SessionService.create().then(function (data) {
          $scope.sid = data._id;
          $cookies.put('sid', data._id);
        });
      }
    };

    // close session
    $scope.closeSession = function() {
      // clear session
      $scope.sid = null;
      $cookies.remove('sid');

      // clear profile information
      $scope.email = null;
      $scope.username = null;
      $scope.avatar = null;

      // set signed in flag to false
      $scope.signedIn = false;

      // notify app that user signed out
      $rootScope.$broadcast('user signed out');

      // create new anonymous session
      createSession();

      // redirect to home
      $state.go('home');
    };

    // navigate to path
    $scope.navigate = function(path) {
      if ($state.current.name !== path) {
        $state.go(path);
      }
    };

    // show modal
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

    /*
     * Events
     */

    $scope.$on('user signed in', function(event, profile) {
      // create new session if none
      if (!$scope.sid) {
        createSession();
      }

      // link profile to current session and load it to scope
      SessionService.linkProfileToSession($scope.sid, profile).then(function (response) {
        loadProfileToScope();
      });

      $state.go('home');
    });

    // change state on spa
    $scope.$on('$stateChangeSuccess', function() {
      // create new session if none
      if (!$scope.sid) {
        createSession();
      }

      // if there was a session, load profile to scope
      else {
        loadProfileToScope();
      }
    });

  }]);
})();
