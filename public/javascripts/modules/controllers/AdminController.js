(function() {

  angular.module('store').controller('AdminController',
    ['SessionService', '$cookies', '$scope', '$state',
    function(SessionService, $cookies, $scope, $state) {

    var isSignedProfileAdmin = function() {
      // load profile from session id stored in cookie
      var promise = SessionService.loadProfile($cookies.get('sid')).then(function (response) {
        // if there is no response, or no profile that is an admin, false
        if (!response) {
          return false;
        }
        else if (!(response.values[0].types && response.values[0].types.includes('admin'))) {
          return false;
        }
        return true;
      });

      return promise;
    };

    // redirect user if he is not an admin
    var checkPermission = function() {
      isSignedProfileAdmin().then(function(value) {
        if (!value) {
          $state.go('home');
        }
      });
    };

    // redirect user if he is not an admin
    checkPermission();

  }]);
})();
