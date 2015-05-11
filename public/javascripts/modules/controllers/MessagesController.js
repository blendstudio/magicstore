(function() {
  
  angular.module('store').controller('MessagesController', ['$scope', '$http', 'MessageService', function($scope, $http, messages) {
      
      $scope.messages = messages;
      $scope.message = null;
      
      $scope.close = function() {
        $scope.message = null;
      };
      
      $scope.next = function() {
        $scope.message = messages.dequeue();
      };
      
      $scope.$on('queue message', function(event, args) {
        if (!$scope.message) {
          $scope.next();
        }
      });
      
  }]);
  
})();