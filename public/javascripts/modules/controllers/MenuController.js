(function() {

  angular.module('store').controller('MenuController',
    ['SessionService', '$cookies', '$location', '$scope', '$sessionStorage', '$state',
    function(SessionService, $cookies, $location, $scope, $sessionStorage, $state) {

    $scope.admin        = false;
    $scope.$storage     = $sessionStorage;
    $scope.selectedMenu = undefined;

    if (!$scope.$storage.menu) {
      $scope.$storage.menu = 'nav';
    }

    // load profile
    $scope.loadProfile = function() {
      SessionService.loadProfile($cookies.sid).then(function(response) {
        if (response && response.count === 1) {
          var profile = response.values[0];

          if (profile.types && profile.types.includes('admin')) {
            $scope.admin = true;
          }
        }
      });
    };

    $scope.activateMenu = function(menu) {
      $scope.$storage.menu = menu;

      if (!$scope.selectedMenu || $scope.selectedMenu !== 'active') {
        $scope.selectedMenu = 'active';
      } else {
        $scope.selectedMenu = undefined;
      }
    };

    $scope.navigate = function(state, params) {
      if (state && params) {
        $state.go(state, params);
      } else if (state) {
        $state.go(state);
      } else {
        $state.go('home');
      }
    };

    // events
    $scope.$on('user signed in', function(event, profile) {
      $scope.loadProfile();
    });

    $scope.$on('user signed out', function(event) {
      $scope.admin = false;
      $scope.$storage.menu = 'nav';
    });

    $scope.loadProfile();

  }]);
})();
