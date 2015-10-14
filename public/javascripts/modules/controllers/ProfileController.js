(function() {

  angular.module('store').controller('ProfileController',
  ['SessionService', '$rootScope', '$scope', '$http', '$location', '$anchorScroll', '$cookies',
  function(SessionService, $rootScope, $scope, $http, $location, $anchorScroll, $cookies) {

    $scope.sid = $cookies.get('sid');

    // load profile to scope to show username and avatar on view
    var loadProfileToScope = function() {
      SessionService.loadProfile($scope.sid).then(function (response) {
        console.log(response);
        if (response) {
          // set signed in flag to true
          $scope.signedIn = true;

          // load profile information to scope
          $scope.email = response.values[0].email;
          $scope.username = response.values[0].username;
          $scope.avatar = response.values[0].avatar;

          console.log($scope.username);
        }
      });
    };

    loadProfileToScope();

    // show modal
    $scope.showModal = function(modal) {
      switch (modal) {
        case 'UserForm':
          $rootScope.$broadcast('show user form modal');
          break;
        case 'EditAvatar':
          $rootScope.$broadcast('show avatar edit modal');
          break;
      }
    };

  }]);

})();
