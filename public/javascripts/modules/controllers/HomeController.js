(function() {
  
  angular.module('store').controller('HomeController', ['$scope', '$rootScope', '$http', 'md5', 'MessageService', function($scope, $rootScope, $http, md5, messages) {

    $scope.account = {};
    
    $scope.signIn = function(account) {
      
      // encrypt password
      var hash = md5.createHash(account.password);
      
      $http.get('/api/accounts', {
          cache: false,
          params: {
            search: { 
              email: account.email,
              password: hash, 
            }
          }
      }).
        success(function(data, status, headers, config) {
          console.log(data);
        }).
        error(function(data, status, headers, config) {
          // TODO: error messages
        });
        
    };

    $scope.register = function(account) {
      
      // encrypt password
      var hash = md5.createHash(account.password);
      
      console.log(hash);

      var json = {
        action: 'register',
        account: {
          email: account.email,
          password: hash,
          passwordConfirmation: hash,
        },
      };
      
      $http.post('/api/accounts', json).
        success(function(data, status, headers, config) {
          // TODO: sign in          
        }).
        error(function(data, status, headers, config) {
          // TODO: error messages
        });
        
    };

  }]);
  
})();
