(function() {
  
  angular.module('store').controller('MessagesController', ['$scope', '$http', 'MessageService', function($scope, $http, messages) {
      
      $scope.message = null;
      
      $scope.close = function() {
        $scope.message = null;
      };
      
      $scope.$on('queue message', function(event, args) {
        if (!$scope.message) {
          $scope.message = messages.dequeue();
        }
      });
      
  }]);
  
})();