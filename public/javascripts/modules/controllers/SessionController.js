(function() {

  angular.module('store').controller('SessionController', ['$scope', '$http', function($scope, $http) {
    
    $scope.account = {};
    
    $scope.$on('account signed in', function(event, account) {
      $scope.account = account;
    });
    
  }]);
  
})();