(function() {

  angular.module('store').controller('AdminController',
    ['SessionService', '$cookies', '$scope', '$state',
    function(SessionService, $cookies, $scope, $state) {

    var isSignedProfileAdmin = function() {
      if ($cookies.sid) {
        // load profile from session id stored in cookie
        SessionService.loadProfile($cookies.sid).then(function (response) {
          // if there is no response, or no profile that is an admin, false
          if (!response) {
            return false;
          }
          else if (!(response.profiles[0].types
              && response.profiles[0].types.contains('admin'))) {
            return false;
          }
          return true;
        });
        // if service fails to run, false
        return false;
      }

      // if no cookie, no session, no profile
      return false;
    };

    // redirect user if he is not an admin
    var checkPermission = function() {
      if (!isSignedProfileAdmin()) {
        $state.go('home');
      }
    };

    // redirect user if he is not an admin
    checkPermission();

  }]);
})();
