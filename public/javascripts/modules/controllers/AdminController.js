(function() {

  angular.module('store').controller('AdminController', ['SessionService', '$cookies', '$scope', '$state', function(SessionService, $cookies, $scope, $state) {

    var validateProfile = function() {
      if ($cookies.sid) {
        SessionService.loadProfile($cookies.sid).then(function (response) {
          if (!response || !(response.profiles[0].types && response.profiles[0].types.contains('admin'))) {
            $state.go('home');
          }
        });
      }
    };

    validateProfile();

  }]);

})();
