(function() {
  
  angular.module('store').controller('HomeController', ['$scope', '$rootScope', '$http', 'MessageService', function($scope, $rootScope, $http, messages) {

    $scope.account = {};

    $scope.signIn = function() {
    };

    $scope.register = function() {
      if ($scope.account.password !== $scope.account.passwordConfirmation) {
        messages.queue('A senha informada e sua confirmação de senha não são iguais.');
        $rootScope.$broadcast('queue message');
      }
      
    };

  }]);
  
})();
