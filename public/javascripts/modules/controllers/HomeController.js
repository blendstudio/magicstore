(function() {
  
  angular.module('store').controller('HomeController', ['$scope', '$rootScope', '$http', '$location', 'md5', function($scope, $rootScope, $http, $location, md5) {

    $scope.account = {};
    
    $scope.signIn = function(account) {
      
      // encrypt password
      account.password = md5.createHash(account.password);
      
      $http.get('/api/accounts', {
          cache: false,
          params: {
            search: account
          }
      }).
        success(function(data, status, headers, config) {
          if (data.count > 0) {
            $rootScope.$broadcast('account signed in', { email: account.email });
          }
        }).
        error(function(data, status, headers, config) {
          // TODO: error messages
        });
        
    };

    $scope.register = function(account) {
      
      // encrypt password
      account.password = account.passwordConfirmation = md5.createHash(account.password);

      var json = {
        action: 'register',
        account: account,
      };
      
      $http.post('/api/accounts', json).
        success(function(data, status, headers, config) {
          $scope.signIn(account);
        }).
        error(function(data, status, headers, config) {
          // TODO: error messages
        });
        
    };

  }]);
  
})();
